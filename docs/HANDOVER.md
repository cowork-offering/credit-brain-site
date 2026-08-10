# Handover: Commercial Credit Brain Case-Study Site

**From:** Archy (Connectry brain, Archy box) · **To:** Banksy (Credit Brain team brain)
**Date:** 2026-08-10 · **Status:** permanent handover; this repo is now the source of truth.

This is the complete brain-dump of everything Archy knew about this project. After this
document, nothing about the site should live only in Archy's memory.

---

## 1. What this is and where it came from

Built 2026-06-15 through 2026-06-18 on the Archy box, served at
`bot.connectry.io/preview/` from a folder historically named after the client bank.
That name is scrubbed under programme policy and must never reappear in content; old
Archy memory refers to this project by that folder alias, which is your pointer if you
ever need to search Archy-era notes.

It is the case-study/showcase page for the Commercial Credit Brain: the enterprise brain
pattern (shared memory, curated knowledge, per-user identity, resident agent) applied to
commercial lending. Accenture-branded throughout; the client bank is deliberately never
named. Founders appear as Accenture handoff contacts only (fabian.goetzens@accenture.com
for architecture, noland.smith@accenture.com for delivery).

Canonical lifecycle used everywhere on the page and in the KB: the **six-stage Accenture
Commercial Credit Blueprint** — Prospecting (Salesforce), Sales (nCino), Credit Analysis
(Boom + Credit Memo), Approval, Offering & Set-up (core banking), Servicing & Monitoring
(Early Warning). Older nine-stage material is stale; if you find any, it predates
2026-06-17.

## 2. The page itself

- `index.html` (~262KB): everything in one file. Hero is a Three.js (0.160, via
  jsdelivr CDN import-map) particle system. `?view=functional` renders the functional
  blueprint (Phase-1 built stage = Credit Analysis = Boom + Credit Memo).
- Fonts from Google Fonts. `silk.jpg` is the background texture. Founder photos are used
  in the handoff section.
- The `sk-*` strings in the page (`sk-composite`, `sk-image`, `sk-rating`) are CSS class
  names, not keys. There are no secrets in this repo; that has been verified.

## 3. Provenance of the visuals (settles the "was the DNA from Higgsfield?" question)

**No Higgsfield anywhere on this page.** The DNA double-helix hero is a hand-written
Three.js particle system: 76,000 particles sampling a parametric B-DNA form (two backbone
rails plus base-pair rungs), evolved from the original torus-knot/orbit hero by changing
only the sampled form, keeping material and density. The study files are in `dev/`:

- `dev/hero-orbit-original.html` — the original rotating hero (torus knot).
- `dev/hero-dna-test.html` — the DNA form study that became the hero direction.
- `dev/spec-dna.html`, `dev/spec-*.html`, `dev/journey-*` — concept explorations for the
  spec/blueprint and journey sections.

Higgsfield WAS used on two sibling projects, which is the likely source of the mix-up:
the commercial-banking roadshow/summit site (cinematic video plates) and the brain intro
video. Neither ships in this repo.

`dev/brain.jpg` is a static brain render used during early explorations. An 11MB
`brain.glb` 3D model also existed in the source folder but is referenced by nothing and
was left out of the repo (it remains on the Archy box if ever wanted).

## 4. The voice/chat advisor ("Enterprise Brain Advisor")

The page embeds a fully custom widget, `brain-widget.js` (v14, page-only), speaking to an
ElevenLabs ConvAI agent. This was one of the genuinely novel builds on this project.

**Agent identity**
- Agent id `agent_9801kv9gvk5qeh695hq96rrjr99x`, voice Bella `hpp4J3VqNfWAUOO0d1Us`,
  model `eleven_turbo_v2` (English ConvAI must be turbo_v2, not v2_5), LLM gpt-4o at
  temperature 0.2, RAG embedder `e5_mistral_7b_instruct`.
- System prompt (6,563 chars) is `docs/voice-agent/_agent/system-prompt.md` and matches
  the live agent. Core framing: Commercial Credit Brain is the PROTAGONIST, the 5-layer
  enterprise brain is the BACKBONE (never the headline). Layered easy-teaching rule:
  real answer, then "in plain terms" analogy, then a "think of it like" connect.
- **Hard identity constraint:** Accenture-only. Both the client bank AND Connectry are
  scrubbed to zero in every KB doc. The agent must never name a client bank; the story is
  "a reusable pattern, not tied to a named institution."

**Knowledge base**
- 13 docs, all in `docs/voice-agent/`, ids in `docs/voice-agent/_agent/kb-ids.json`.
  Doc 09 is the live-page narrative; doc 13 is the lending blueprint; both lead with the
  six-stage lifecycle (rebuilt/harmonized 2026-06-17 after a 4-critic adversarial pass,
  zero scrub leaks, verified via simulate-conversation).
- RAG cap is 50,000 chars per doc. Doc 02 is ~52KB so its tail is truncated in the index;
  known and accepted.

**Update flow (KB text docs are IMMUTABLE on ElevenLabs)**
1. Create the new doc via API.
2. `POST /v1/convai/knowledge-base/{id}/rag-index` (e5_mistral), poll GET until
   `succeeded`.
3. `PATCH` the agent, swapping old id for new inside
   `conversation_config.agent.prompt.knowledge_base` — send the FULL prompt object,
   otherwise the merge can wipe the system prompt or RAG config.
4. Delete the old doc, update `kb-ids.json`.

Verify changes with `POST /v1/convai/agents/{id}/simulate-conversation` using three
probes: brand-guard (must not name client bank or Connectry), easy-explanation (layered
teaching), lifecycle (must be six-stage). The ElevenLabs MCP can READ agents but cannot
write KB; use REST. The API key lives in the Archy box settings
(`~/.claude/settings.json`, mcpServers.elevenlabs.env) and is NOT in this repo; Banksy
needs its own key or the programme account's.

**Cost exposure:** the agent answers anyone who loads the page. If the site goes public,
cap ConvAI usage or gate/stub the widget first.

## 5. Artifact build (`tools/artifact-build/`)

`build-artifact.mjs` turns `index.html` into a single self-contained, CSP-safe HTML file
(~1.3MB) suitable for publishing as a claude.ai Artifact: inlines images as data URIs,
inlines Three.js, strips external fetches. `qa.mjs` is a Playwright smoke test of the
built artifact. Output path: `/tmp/credit-brain-artifact.html`. Note that claude.ai
artifacts cannot reach `api.elevenlabs.io`, so the voice widget is inert in artifact form
by design.

## 6. Related material that did NOT move into this repo

All on the Archy box unless noted:

- HLSI source + build pipeline: `knowledge/projects/company-brain/commercial-credit-hlsi/`
  (src HTML, build scripts, and the 12-slide deck `commercial-credit-brain-deck.html/pdf`).
  The rendered 17pp PDF IS in this repo at `docs/`.
- Stage progression manifest and objectives docs:
  `knowledge/projects/company-brain/` (`STAGE-PROGRESSION-MANIFEST.md`,
  `commercial-credit-brain-objectives.md`, `enterprise-brain-advisor-internal.md`).
- The voice-agent working folder `/opt/accenture/voice-agent-kb/` (this repo's
  `docs/voice-agent/` is a curated copy; the `_raw/` subfolder was excluded because it
  still contained the client name, and `agent-full-backup.json` / `tts-backup.json` were
  left as box-side backups).
- The MCP fleet the page describes: `/opt/connectry/projects/commercial-credit-reinvented/`
  (6 repos; decomposition doctrine inside), plus org repos `cowork-offering/boom-mcp-py`,
  `credit_brain_mcp`, `credit-memo-reinvented`.
- The sibling AWS-award scrollytelling artifact (3D brain journey, Three.js + GSAP) is a
  DIFFERENT project with its own Archy memory note; do not confuse the two.

## 7. Governance notes

- Client-name policy: verified zero references in this repo (case-insensitive sweep,
  binary-aware, includes the PDF). Programme redaction list also includes two other
  client names; sweep for the full list before any public flip.
- Public exposure of programme material requires founder sign-off; Banksy operates under
  shared programme governance (Fabian is explicitly not sole owner). Repo starts
  internal; the public flip is a separate, gated decision (Clawdy consult + Fabian).
- The page carries Accenture branding and founder photos; that is deliberate for the
  internal audience, but is one more reason the public flip is a decision, not a default.

## 8. Known quirks

- `index.html` is large (262KB) and hand-edited; there is no build step on purpose.
- The widget is v14 of a long iteration; the box kept ~15 timestamped `.bak` snapshots of
  `index.html`, which were intentionally not migrated. Git history takes over that job
  from here.
- Google Fonts + two CDNs are runtime dependencies of the live page (the artifact build
  removes them). If the programme needs a no-CDN deployment, start from the artifact
  builder's inlining logic.
