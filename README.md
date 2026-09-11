# Commercial Credit Brain — Case-Study Site

The interactive case-study page for the **Commercial Credit Brain**: an Accenture-branded,
single-page experience explaining the enterprise brain pattern applied to commercial
lending, with a Three.js particle hero, a functional-blueprint view, and an embedded
voice/chat advisor (ElevenLabs ConvAI).

This repo is the **source of truth** for the site as of 2026-08-10. It was moved here from
the Archy box (`preview-site/`) as part of the permanent handover to Banksy, the Credit
Brain programme's team brain.

## Layout

| Path | What |
|---|---|
| `index.html` | The live page. Single file, self-contained logic. `?view=functional` switches to the functional-blueprint view. |
| `gate.js` | Invitation-only gate loaded in every page `<head>`: hides the page until the access phrase is entered (salted SHA-256, phrase not in repo; unlock kept 30d; `?lock` re-locks). Courtesy lock, not a security boundary. |
| `brain-widget.js` | "Enterprise Brain Advisor" voice + chat widget (v14). Custom-built, talks to ElevenLabs ConvAI directly. |
| `accenture-logo.png`, `silk.jpg`, `founder-*.jpg` | Page assets. |
| `docs/HANDOVER.md` | **Read this first.** Everything Archy knew about this project: history, architecture, provenance, operations. |
| `docs/hlsi-commercial-credit-brain.pdf` | Stage 0 High Level Solution Intent (17pp, scrubbed, internal-stakeholder version). |
| `docs/voice-agent/` | The advisor agent's full RAG knowledge base (13 docs), system prompt, agent config, KB doc ids, embed snippet. |
| `dev/` | Design-exploration history: hero particle studies (DNA helix, orbit), spec and journey concepts, functional-blueprint drafts. |
| `tools/artifact-build/` | Builds a fully self-contained, CSP-safe single-file artifact of the page for claude.ai publishing. |

## Serving

Static site, no build step. Any static host works. For GitHub Pages: serve the repo root.

External runtime dependencies: Google Fonts, `cdn.jsdelivr.net` (Three.js 0.160),
`esm.sh` (`@elevenlabs/client`), `api.elevenlabs.io` (voice agent). The artifact build in
`tools/` inlines everything except the ElevenLabs runtime.

## Before flipping this repo or its hosting public

1. The embedded ConvAI agent answers anyone who loads the page. Public hosting means
   public credit burn on the ElevenLabs account. Cap usage or stub the widget first.
2. Programme governance: public exposure of programme material needs founder sign-off
   (shared ownership; see `docs/HANDOVER.md` section 7).
3. Client-name policy: this repo is verified clean. Keep it that way. Never reintroduce
   the name of any client bank; the case study is a reusable pattern, not tied to a
   named institution.

## Contributing

PRs welcome from programme members. The page is deliberately a single `index.html`; keep
it that way unless a real build step earns its place. Test both views (`/` and
`?view=functional`) and the voice widget before merging.
