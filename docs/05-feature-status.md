# Feature Status

**Status:** Current demo coverage and known production gaps as of 2026-08-11.

## Capability Map

| Capability | Current status | Current implementation or authority |
| --- | --- | --- |
| Privacy consent and activation | Interactive static demo | `public/demos/04-cozy-ai-assistant.html` |
| Conversation shell, composer, and guided prompts | Interactive static demo | `public/demos/04-cozy-ai-assistant.html` |
| Inline voice input | Interactive static demo. The composer switches between text and voice modes in place: microphone starts inline waveform input, pause converts the simulated transcript into editable text, and send during voice mode sends the transcript as a normal text message. No production ASR service is connected. | Static demo plus product requirements |
| Baby profile selection | Interactive static demo. The conversation-header user-plus CTA opens a full-screen selector for existing profiles and an add-baby form. Selection writes the baby's name and age back to the header and persists locally in the browser; no production profile service is connected. | Static demo plus product requirements |
| Forecast states | Interactive static demo; no production prediction service. Default and `?forecast=empty` show the passive learning message inside the expanded `What's coming up next?` dropdown, without a prediction summary, prediction items, or CTA. `?forecast=ready` shows valid mock predictions collapsed to the latest summary. `?forecast=hidden` simulates the Feature Flag being off. | Static demo plus product requirements |
| Chat history and new conversation | Interactive static demo; no production persistence | Static demo plus product requirements |
| Voice Log and lactation-plan flows | Interactive static demo | Static demo and numbered Voice Log demo |
| Citations, feedback, and support escalation | Interactive static demo; no production storage or RAG | Static demo plus product requirements |
| Medical-risk interception | Local demo behavior | Static demo and optional proxy instructions |
| Live general responses | Optional local OpenAI proxy with Mock fallback | `scripts/cozie_llm_server.py` |
| Reusable React feature architecture | Planned | Frontend development plan |
| Production Agent orchestration, tool callbacks, RAG, and forecasting | Not implemented in this workspace | Product requirements and future service contracts |
| Automated unit and end-to-end suites | Planned; not present in package scripts | Frontend development plan |

## Major Open Gaps

- Final privacy statement content and compliance approval.
- Production API schemas, authentication, persistence, and error contracts.
- Agent routing keywords and quick-task status callback contracts.
- Forecast service request, response, confidence, and empty-state contracts.
- Approved FAQ/RAG corpus, citation format, and no-match policy implementation.
- Feedback storage, analytics events, audit logging, and human-handoff integration.
- Production voice transcription and microphone lifecycle integration.
- Migration strategy from the monolithic static Cozy AI demo to maintainable React features.
- Automated accessibility, responsive, interaction, and screenshot regression coverage.

## Status Vocabulary

- **Interactive static demo:** Behavior exists for demonstration but is not evidence of a production backend or durable state.
- **Optional local integration:** Works only when a developer starts and configures the local helper service.
- **Planned:** Described in requirements or planning but absent from the current implementation.
- **Not implemented:** No working implementation exists in this workspace.

## Update This Document When

Update the capability row and open gaps whenever a feature moves between planned, demo, integrated, tested, or production-ready states. Link to the owning implementation or contract without copying its details.