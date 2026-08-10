# The MCP fleet and the composition strategy

How the connectors are layered, where computation lives, and what is built versus composed.

## The four tiers
The integration is layered, and an MCP client like Claude Cowork sees the union of every connected server's tools at once:
- System MCPs — one per source system, each unlocking a system of record (loan origination, the spreading engine, servicing, the data warehouse).
- Experience MCP — cross-source composition plus bank policy. It joins data across systems, applies the bank's methodology, owns the write-back path, and serves the branded widgets.
- Agent — dynamic reasoning and orchestration (the credit-memo orchestrator and its specialist subagents).
- Channel — Claude Cowork, where people work.

This mirrors the API-led connectivity pattern bank architects already know, system then process then experience layers, used here as an analogy, with one addition classic integration has no equivalent for: the reasoning and agent tier. A bank wants the experience tier mostly for governance, so regulated computations sit behind one deterministic, auditable seam, aligned with model-risk guidance (SR 11-7).

## The composition boundary
A guiding rule decides what work happens where: the model's context is expensive, so push computation to where the data already lives and let only small, decision-relevant results cross any boundary. Score each step on payload size, credential ownership, proprietary-tool value, and orchestration shape, with a two-question test: does the model need to see this intermediate result to decide, and would calling the raw API directly skip vendor logic worth keeping. So financial ratios are computed inside the spreading connector and never enter the model's context; a proprietary rating is produced by calling that proprietary tool rather than reproducing it; a covenant grade is small, so the grade crosses to the agent while the computation stays a deterministic tool.

## Composition, not wrapping
You never wrap or merge a vendor's connector. The client composes many servers at once. A vendor ships a generic data connector; the Experience MCP adds how this bank interprets and presents that data, its ratio methodology, the covenant join, the write-back, and the branded widgets; connect both and the agent orchestrates. The only duplication that matters is exposing the same tool to the agent twice. Never reproduce a vendor's proprietary tool, call it.

## Branding
These are Accenture-built accelerators, not official vendor products, so branding is layered: the bank's experience skin is a swappable config, vendor data carries in-widget attribution for provenance, and an Accelerator-by-Accenture mark sits on every surface. Real vendor identity belongs only on the click-through to the vendor's own app.

## Data layer as connectors
Every external system is modeled as a connector, so the spreading engine and the servicing system appear in the connectors panel right next to the CRM, the loan-origination system, and external data providers. This tells the data-layer-equals-connectors story directly and keeps each integration cleanly owned.
