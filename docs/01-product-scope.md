# Product Scope

**Status:** Current MVP target summary. The detailed PRD remains the authority for exact states and acceptance rules.

## Product Goal

Cozy AI is Momcozy's conversational service entry point across pregnancy, postpartum, and infant care. It brings existing device data, user logs, approved content, tools, and support paths into one continuous experience rather than acting as a standalone general chatbot.

## MVP Capabilities

- First-use privacy consent and activation.
- A global Cozy AI tab with baby context, current conversation, new conversation, and chat history.
- Text input, voice input, streaming responses, stop generation, retry, and session restoration.
- Suggested questions and quick-task chips for Lactation Plan, Voice Log, Baby Sleep Forecast, and IBCLC support.
- Structured task cards for pumping, sleep, and lactation workflows.
- Forecast cold start, collapsed and expanded predictions, low-confidence states, and refresh after new records.
- Citations for approved knowledge, copy, positive feedback, negative-feedback questionnaire, and human handoff.
- Session archiving after 12 hours of inactivity and persistent user facts subject to privacy controls.

## Non-Negotiable Constraints

- Privacy consent starts unchecked; activation remains disabled until consent is granted.
- Cozy AI provides information, not medical advice. The disclaimer remains visible in the conversation experience.
- Medical red flags and emotional crises must use conservative escalation paths rather than ordinary generated advice.
- High-risk answers require approved sources. When retrieval has no reliable match, narrow the answer or offer human support.
- Never claim that a record, device action, or tool submission succeeded without an explicit application confirmation.
- Times use the user's device timezone.
- Unavailable production capabilities must be hidden behind feature flags; placeholders are acceptable only in demo or integration environments.

## Detailed Requirements

Open the [full MVP requirements](../01-product/requirements/MVP%20DEMO.txt) only when exact copy, transition rules, timeouts, state matrices, or acceptance behavior is needed.

The [frontend development plan](../01-product/planning/frontend-development-plan.md) defines a proposed implementation. It is not evidence that its dependencies, routes, APIs, or component structure currently exist.

## Update This Document When

Update this summary when MVP scope, user-visible workflows, safety rules, session policy, or feature availability changes. Keep detailed state tables in the full requirements rather than duplicating them here.