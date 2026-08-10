# Enterprise Brain Advisor — RAG Knowledge Base

The 13-doc knowledge base behind the page's embedded ElevenLabs ConvAI voice/chat agent,
plus the agent's system prompt and config under `_agent/`.

- Docs 01-13 are the live KB content, in order. Doc 09 mirrors the page narrative;
  doc 13 is the commercial lending blueprint. Both lead with the six-stage lifecycle.
- `_agent/kb-ids.json` maps each doc to its ElevenLabs KB document id.
- `_agent/system-prompt.md` is the live system prompt (Accenture-only identity; never
  names a client bank or the vendor).
- `_agent/embed-snippet.html` shows how the widget mounts on the page.
- KB docs are immutable on ElevenLabs: updates are create-new, re-index, PATCH the agent
  with the FULL prompt object, delete-old. Full operational detail in `../HANDOVER.md`
  section 4.
