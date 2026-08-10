#!/usr/bin/env python3
"""Serve the Cozy AI demo and proxy Cozie requests to OpenAI."""

import json
import os
import urllib.error
import urllib.request
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


HOST = "127.0.0.1"
PORT = int(os.environ.get("COZIE_PORT", "8765"))
PUBLIC_DIRECTORY = Path(__file__).resolve().parent.parent / "public"
OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses"
MAX_REQUEST_BYTES = 32_768
MAX_MESSAGE_CHARACTERS = 1_000

COZIE_INSTRUCTIONS = """You are Cozie, Momcozy's supportive maternal and infant assistant.
Respond warmly, clearly, and concisely. Use the baby's known name, Bonnie, only when relevant.
Do not diagnose or present medical advice as professional care. For urgent symptoms, encourage prompt
contact with a pediatrician, clinician, or local emergency service. Never claim that a log, tool, or
device action occurred unless the application explicitly confirms it. Return plain text only."""


def extract_output_text(payload):
    direct_text = payload.get("output_text")
    if isinstance(direct_text, str) and direct_text.strip():
        return direct_text.strip()

    parts = []
    for output_item in payload.get("output", []):
        if output_item.get("type") != "message":
            continue
        for content_item in output_item.get("content", []):
            if content_item.get("type") == "output_text" and content_item.get("text"):
                parts.append(content_item["text"])
    return "\n".join(parts).strip()


class CozieRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PUBLIC_DIRECTORY), **kwargs)

    def send_json(self, status, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path == "/api/health":
            self.send_json(
                HTTPStatus.OK,
                {
                    "status": "ok",
                    "provider": "openai",
                    "model": os.environ.get("OPENAI_MODEL", "gpt-4.1-mini"),
                    "configured": bool(os.environ.get("OPENAI_API_KEY")),
                },
            )
            return
        super().do_GET()

    def do_POST(self):
        if self.path != "/api/cozie/respond":
            self.send_json(HTTPStatus.NOT_FOUND, {"error": "not_found"})
            return

        content_length = int(self.headers.get("Content-Length", "0"))
        if content_length <= 0 or content_length > MAX_REQUEST_BYTES:
            self.send_json(HTTPStatus.BAD_REQUEST, {"error": "invalid_request_size"})
            return

        try:
            request_payload = json.loads(self.rfile.read(content_length))
        except (UnicodeDecodeError, json.JSONDecodeError):
            self.send_json(HTTPStatus.BAD_REQUEST, {"error": "invalid_json"})
            return

        message = request_payload.get("message")
        if not isinstance(message, str) or not message.strip():
            self.send_json(HTTPStatus.BAD_REQUEST, {"error": "message_required"})
            return

        message = message.strip()
        if len(message) > MAX_MESSAGE_CHARACTERS:
            self.send_json(HTTPStatus.BAD_REQUEST, {"error": "message_too_long"})
            return

        api_key = os.environ.get("OPENAI_API_KEY")
        if not api_key:
            self.send_json(HTTPStatus.SERVICE_UNAVAILABLE, {"error": "provider_not_configured"})
            return

        provider_payload = json.dumps(
            {
                "model": os.environ.get("OPENAI_MODEL", "gpt-4.1-mini"),
                "instructions": COZIE_INSTRUCTIONS,
                "input": message,
                "max_output_tokens": 350,
            }
        ).encode("utf-8")
        provider_request = urllib.request.Request(
            OPENAI_RESPONSES_URL,
            data=provider_payload,
            headers={
                "Authorization": "Bearer {}".format(api_key),
                "Content-Type": "application/json",
            },
            method="POST",
        )

        try:
            with urllib.request.urlopen(provider_request, timeout=30) as response:
                provider_response = json.loads(response.read())
            answer = extract_output_text(provider_response)
            if not answer:
                raise ValueError("Provider returned no output text")
            self.send_json(HTTPStatus.OK, {"answer": answer, "provider": "openai"})
        except urllib.error.HTTPError as error:
            self.log_error("OpenAI returned HTTP %s", error.code)
            self.send_json(HTTPStatus.BAD_GATEWAY, {"error": "provider_error"})
        except (urllib.error.URLError, TimeoutError, ValueError, json.JSONDecodeError) as error:
            self.log_error("OpenAI request failed: %s", error)
            self.send_json(HTTPStatus.BAD_GATEWAY, {"error": "provider_unavailable"})


if __name__ == "__main__":
    server = ThreadingHTTPServer((HOST, PORT), CozieRequestHandler)
    print("Cozie demo: http://{}:{}/demos/04-cozy-ai-assistant.html".format(HOST, PORT))
    print("LLM configured: {}".format("yes" if os.environ.get("OPENAI_API_KEY") else "no (mock fallback)"))
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()