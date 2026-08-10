# The website — the brain journey (the live preview page)

This document is the narrative of the preview page a visitor actually sees: the
Commercial Credit Brain, an end-to-end commercial credit lifecycle brain that
runs on a commercial bank's own AWS estate. It is written so the advisor can walk
someone through exactly what is on screen, section by section, in plain language.
The page is an architecture artifact and working prototype, never a shipped
product, and it is framed throughout as an Accelerator built by Accenture.

## The frame — a working prototype, not a product

The headline: "One pattern. A commercial bank's AWS estate. One brain beneath the
whole lending lifecycle. It reasons, retrieves, calls the tools as you, and
sharpens with every decision. Your bank's commercial credit DNA, encoded once and
expressed across the whole estate."

A safe-harbor note sets expectations honestly: this is an architecture artifact, a
way to show how a commercial credit brain could run on a bank's own AWS estate. It
is under active development and research. Some pieces are live and proven, some are
designed and not yet built, and the shape keeps changing as we learn.

- Prototype — it demonstrates the pattern end to end; live and placeholder pieces are marked honestly throughout.
- Active development — built and rebuilt as the design sharpens; expect things to move between visits.
- Forward-looking — anything about future capability is direction and intent, never a commitment or a timeline.
- Built as an Accelerator by Accenture. Not generally available, and not an offer or commitment to deliver any specific capability.

What is live versus ahead, in one place (per the page's own status markers): the
proven slice is the credit memo — the Credit Memo agent is built and running, where
Boom spreads the financials and the brain drafts the memo end to end — and Snowflake
with Cortex is live today. Early-warning monitoring is the next step. The AgentCore
Gateway, Amazon S3 and Amazon Neptune are marked Future, and more agents along the
lifecycle are direction and intent, not a commitment or a timeline.

## How to explore the page

Every section can explain itself. Two ways to go deeper anywhere on the page, before
picking a journey:

- Explain section (top right of the screen): on any section, tap "Explain section" and the AI consultant walks through exactly what you are looking at, in plain language.
- AI Brain Consultant (bottom right of the screen): open it anytime to ask anything about the architecture, by chat or by voice. It knows this whole build.

## How a request becomes an answer

"Follow any request through the brain." It might be a credit memo, an early-warning
review, or a policy-breach check — what a banker asks shapes the journey. Whatever
the request, the brain takes the same governed path to the answer. As you scroll,
it assembles in the order work actually flows: people, the brain, the tools, the
governance, the loop. Each layer in turn, then the whole. The visitor chooses a
view: the functional journey or the technical journey.

## The functional journey — the Accenture Commercial Credit Blueprint

The recognized lifecycle of commercial lending, from first lead to a live,
monitored facility. Six stages, end to end. Hover or tap any stage to follow what
happens inside it. The six stages and the system each leans on:

1. Prospecting — Salesforce
2. Sales — nCino
3. Credit Analysis — Boom · Credit Memo
4. Approval
5. Offering & Set-up — Core banking
6. Servicing & Monitoring — Early Warning

The point of this section: technology changes by the quarter, but the craft of
commercial lending does not. Models get replaced and platforms re-platformed, but
how credit is judged, structured and watched endures. A brain is only ever as good
as the foundation beneath it. That foundation is industry expertise, and providing
it is the work — architects, not evangelists.

### No big-bang — a governed rollout

"Start with the memo. Then the whole blueprint." The blueprint does not arrive all
at once. The brain proves itself on the highest-value stage, the credit memo, with
a small cohort. It learns from real work and reaches the next group already
sharper. The same six stages come online in governed phases, and the asset
compounds.

- Phase 1 — Pilot. Who comes on: one credit team, in one region; a handful of bankers, fully supervised. What's live: the proven slice — Boom spreads the financials, the brain drafts the memo, end to end. What it learns: the bank's covenant precedents and house style, captured from the first real memos and promoted into reusable skills. Why start here: prove the value where it is clearest, with zero risk to the rest of the bank. Nothing scales until the pilot earns it.
- Phase 2 — Expand. Who comes on: more teams, more regions; the cohort widens once the pilot's numbers hold. What's live: the stages around the memo come online — approval, offering & set-up, and servicing & monitoring, with early warning watching the book. What it learns: every lesson from the pilot is already baked in; new teams meet a brain that has seen thousands of decisions, not a blank one. Why it compounds: the brain the second wave starts on is sharper than the one the pilot began with; each cohort onboards faster than the last.
- Phase 3 — Estate-wide. Who comes on: every banker, firm-wide; no ceiling, no cutover weekend. What's live: the whole blueprint sits on one brain, from prospecting through to servicing and monitoring. What it learns: what's learned anywhere lifts everyone; the same governed asset is already shaped to serve the next bank. The payoff: the estate arrives on a proven, compounded brain, and it does not stop improving once everyone is on it.

One brain, sharper with every cohort.

### One request, the whole way through

Watch a single request move through the brain, in the order the work actually
flows: your people ask, the brain reasons and reaches into your systems as them, a
human stays in the decision, and every memo makes the next one sharper. The flow is
governed on every call, and assembles as five layers:

- 01 · Brain reasons & orchestrates
- 02 · Model thinks it through
- 03 · Tools reaches your systems
- 04 · Data finds the meaning
- 05 · Records — your source of truth

Each layer is then opened up in its own deep card.

#### The ask — a request enters, as you

A relationship manager opens Cowork and asks for a credit memo. They authenticate
once, and from that moment the brain acts on their behalf, seeing only what they
are allowed to see.

- One sign-on — she works in the tool she already uses; no new login, no IT ticket.
- It acts as her — the brain only ever sees what she is allowed to see.
- No shared accounts — nothing runs on a generic service login; every action is hers.
- One door — she asks in one place, not across ten systems.

The components behind it: users estate-wide (relationship managers and credit
officers); Identity Center SSO · MFA (single sign-on and multi-factor, establishing
who the person is); AgentCore Identity act-as-user (the brain acts as that user on
every call, with their permissions only — no confused deputy); and the Claude
Cowork channel (the desktop harness the user works in, which connects to one thing:
the brain). One identity, one connection per user.

#### The brain — one connection

Claude connects to the brain, not to the tools. The brain is the orchestrator that
holds the knowledge, the memory, the skills and the governance. It is the product.

- Knows the bank — your policy, your precedent, and how this bank actually underwrites.
- Remembers — what it learned on this borrower and this portfolio, in scope.
- One brain, every agent — the same memory and skills across every use case, not silos.
- Owned, not rented — the brain is your asset; the model underneath stays swappable.

The components: the Brain custom MCP server (knowledge, scoped memory, skills,
project context and the governance gates; one connector per user); AgentCore
Runtime as the host (the managed, serverless runtime the brain runs in — scales
across the whole estate and beyond, with session isolation); and per-user brokering
via Identity (the brain holds each user's entitlements and acts strictly within them
on every downstream call). The model is rented; the brain is owned.

#### Think — it reasons, and retrieves by meaning

The brain calls Claude to reason, pulls exactly what matters, and hands the work to
the right specialist.

- Finds the right precedent — by meaning, even when the words are different.
- Sees the whole relationship — borrower, guarantors and exposure in one connected view.
- Picks the right specialist — the credit-memo expert, the risk analyst, on demand.
- No invented numbers — every figure comes from a system of record, never a guess.

The components: Amazon Bedrock as the model (Claude Opus and Sonnet reason in the
bank's own account, with no training on the bank's data); Snowflake Cortex vector
search (retrieval by meaning — policy, precedent and prior memos found by what they
mean, not by filename); Amazon Neptune entity graph (resolves one borrower,
guarantor and exposure across nCino, AFS and Boom into a single view); scoped memory
that decays (what the brain learned here, with provenance, in the user's scope —
stale memory fades so it stays sharp); and specialist agents dispatched (Credit
Memo, Risk Analyst, Early Warning — the brain hands the work to the right one).
Found by meaning, not by filename.

#### Act — it calls the tools, in place

The brain invokes the downstream servers as the user. The data is read where it
lives and never moves.

- Does the real work — pulls the spread, the servicing and the covenants itself.
- Your data stays put — read where it lives, never copied out of the bank.
- Only what she can touch — it acts with her permissions, system by system.
- Writes back, governed — the memo lands in nCino, not in a side document.

The components: AgentCore Gateway for tool fan-out (turns each system into a
governed tool and fans out to roughly twenty-five of them at scale); System MCPs we
host (Boom for the spread, AFS for servicing, Fannie Mae for macro — run alongside
the brain); the Experience MCP for compose and write (the cross-source covenant
grade, the assembled memo, the governed write-back to nCino); Managed MCPs we
connect (Salesforce / nCino and Snowflake, connected, not hosted); and the data
foundation in place (Snowflake and S3 hold the record; the data is read where it
lives and never copied). Called as the user. The data never moves.

#### Govern — governed on every call

Every hop is policy-checked, recorded, and ultimately decided by a person.

- A draft, not a decision — the credit committee always has the final say.
- Policy on every call — screened against the bank's rules automatically, every time.
- On the record — who asked, what was read, what was written; all of it.
- Auditor-ready — the trail is built in, not bolted on afterwards.

The components: Bedrock Guardrails for policy (PII and DLP screening, plus
Automated Reasoning that checks claims against policy on every call); the curation
gate for truth control (nothing wrong becomes institutional truth; lessons are
gated before they are allowed to stick); the audit ledger and observability (who
asked, what was read, what was written — recorded for every decision the brain
takes); and the credit committee, where a human decides (the memo is produced as a
draft, pending review). The agent drafts; humans decide.

#### Learn — every decision sharpens the next

An approved memo teaches the brain, and the lesson lifts every memo after it.

- Each memo teaches the next — corrections become a reusable skill, not a one-off.
- The portfolio gets sharper — a lesson on one deal lifts every future one.
- Grows with you — new agents join across the lending lifecycle over time.
- Compounds — the asset is worth more every quarter it runs.

The components: capture with provenance (the lesson is recorded the moment a
decision lands, tagged with exactly where it came from); gate and promote, governed
(checked at the curation gate, then promoted into a versioned, reusable skill); the
skill ladder (this memo, then the portfolio, then bank-wide policy — the best
lessons graduate); and reuse that grows the brain (the next memo starts smarter,
and new agents join the lifecycle, from credit memo to early warning).

## The backbone — five layers the Commercial Credit Brain is built on

This is the reusable enterprise-brain backbone the Commercial Credit Brain runs on,
the engine underneath it and never a separate product. Before the AWS and credit
specifics, the page shows the bare shape of the thing: five layers that would stand
up on any cloud, which the very next section then wires for credit. The quickest way
to hold all five in plain terms: the brain you own, the model you rent, the hands
that reach each system without moving the data, the place where memory becomes
findable, and the systems of record you already run. The visitor scrolls to assemble
the stack layer by layer, and each layer carries a one-word ownership tag — owned,
rented, foundation, or exists.

- Layer 01 · the crown — Brain & Agent Orchestration. The one layer you own; everything above is rented, everything below already exists. The reasoning core: it decides what to do and in what order, remembers what happened, and captures what was learned. This is the identity layer. Must provide: memory that persists across sessions (working context and long-term, formed here, stored in Layer 04); lessons learned captured then promoted into reusable skills; orchestration of many agents toward one outcome; action guardrails, so it asks before it acts. On AWS: Bedrock AgentCore Runtime hosting a custom MCP orchestrator. On Azure: AI Foundry Agent Service / Semantic Kernel. Any cloud: any runtime that can host your own orchestrator.
- Layer 02 · rented intelligence — Model Substrate. Swappable on purpose; the model is the commodity, the brain is the moat. The language reasoning, on tap — stateless and swappable, rented not owned, changeable per task without touching the brain above. Must provide: frontier reasoning with the right model for each job; no lock-in (models swap underneath the brain); private inference (your data is never trained on); cost and latency control per task. On AWS: Amazon Bedrock (Claude Opus / Sonnet). On Azure: Azure AI Foundry models / Azure OpenAI Service. Any cloud: any governed, private LLM endpoint.
- Layer 03 · the hands — Tools & MCP Servers. Reach everything, move nothing; each system stays exactly where it is. Each connector exposes one system through a typed contract, and the brain reads and acts in place — the data never moves. Must provide: typed tool contracts (one connector per system); least-privilege scoping, acting as the user; read in place (no copy of the data is extracted); every call audited and reversible. On AWS: AgentCore Gateway, Lambda / ECR-hosted MCP servers. On Azure: API Management, Azure Functions-hosted tools. Any cloud: MCP servers fronting your existing APIs.
- Layer 04 · the memory's home — Secure Data Foundation. Where memory becomes findable: meaning and relationships, not just rows. Vectors for meaning, a graph for relationships, governed and lineage-tracked — the durable home of the memory the brain forms above. Must provide: vector search (retrieval by meaning, not keywords); knowledge graph (one identity across many systems); lineage and governance (every answer traceable to source); encryption and entitlement-aware retrieval. On AWS: S3, Snowflake + Cortex (vectors), Neptune (graph). On Azure: ADLS, AI Search (vectors), Cosmos DB Gremlin (graph). Any cloud: a governed lakehouse with vector + graph.
- Layer 05 · the foundation — Systems of Record. The brain reasons over the truth; it never becomes the truth. Your existing core systems, organised by business domain — reasoned over, never replaced, never made into the system of record. Must provide: domain boundaries (Collateral, Loans, Deposits, Counterparties, Limits, Covenants); stable contracts the connectors can rely on; read access without disrupting the running business; authority that stays put. Cloud-agnostic: your core banking, origination, servicing and CRM systems. Representative estate: nCino, Snowflake, Boom, AFS — roughly 25 systems over time.

Across every layer — security, identity, governance, observability. Not a step you
add but a wrapper present in every call, at every layer, from day one. Every call
is authenticated, scoped to the user, logged and traceable; encryption in transit
and at rest; a human in the loop on anything that acts. This is what makes it
enterprise-grade and audit-ready. What it must provide at every layer: identity and
access (the brain acts as the user, never above them); secrets and encryption (in
transit and at rest); a full audit trail (every tool call and decision logged); and
policy and observability (guardrails on actions, every run traced). On AWS: IAM ·
KMS · CloudTrail · Bedrock Guardrails. On Azure: Entra ID · Key Vault · Monitor · AI
Content Safety. Any cloud: your IdP · secrets vault · SIEM · policy engine.

## The specialization — what makes an enterprise brain a commercial credit brain

Everything else can be bought: the architecture is universal, the model is rented,
the connectors are commodity. What no vendor can hand you is judgement — the
industry knowledge, the proven lending patterns, the bank's own policy and the
lessons of every credit decision. That is the DNA, and a commercial credit brain
stands or falls on it. Strip it away and the most powerful architecture is still a
generic engine; encode it, and the same brain reasons like a credit officer.

- The foundation — a universal brain knows nothing about lending. The framework gives it reasoning, memory, tools and governance, all powerful and all generic. Pointed at a loan book it is still a stranger: capable, but with no idea how this bank lends, what it will not finance, or where deals go wrong. What it lacks is not horsepower, it is knowledge. The strand is here; the genes are not.
- The DNA — where it stands or falls. Industry knowledge and proven lending patterns, the bank's policy and risk appetite, the benchmarks and the lessons of every decision. Encoded gene by gene from real deals and the Accenture Commercial Credit Blueprint, never guessed. This is the most crucial layer of the build and the one a competitor cannot copy: remove it and the brain is generic again; encode it, and the same architecture reasons like a credit officer. The framework runs it; the knowledge makes it a credit brain.

The same five layers, wired for credit:

- Layer 01 · the brain — a custom MCP orchestrator hosted in the bank's own account on Bedrock AgentCore Runtime (serverless, session-isolated, scaling across the estate). It plans the work, calls the model and the tools as the user, and writes everything it learns to scoped memory in Layer 04. It ingests bank policy and appetite (credit policy, risk appetite and the Commercial Blueprint, parsed into machine-readable rules and guardrails) and every decision (committee outcomes, industry insights and benchmarks captured as structured lessons, promoted into reusable skills), and it orchestrates the ensemble (Credit Memo, Early-Warning and rating agents toward one outcome, asking before it acts).
- Layer 02 · model substrate — Claude Opus and Sonnet run in-account on Amazon Bedrock, with credit-tuned scoring beside them. Stateless and private: context is retrieved at run time, never baked into weights. It ingests context not weights (the ontology, spread financials and benchmarks retrieved per call, never fine-tuned in); risk-rating and PD / LGD (the Basel-aligned scoring, invoked as governed tools alongside the frontier model); and adaptive learning (outcomes feed back as memory and prompts, so it sharpens without retraining).
- Layer 03 · tools — one typed MCP connector per system, acting as the user, reading and writing in place so the data never leaves the bank. What's wired: origination and CRM (nCino for the deal, Salesforce for the relationship); spreading and servicing (Boom spreads the financials, AFS holds the live book); market and reference data (Snowflake zero-copy, Fannie Mae, GLEIF); least-privilege and audited (every call scoped to the user and logged).
- Layer 04 · data foundation — the credit ontology and knowledge graph turn the bank's data into knowledge: entities resolved, relationships mapped, exposure unified across the whole book. What lives here: credit ontology (borrower, guarantor, facility and covenant, defined once); spread financials (statements normalised into the ratios that drive risk); Risk 360 exposure (one view across credit, market and operational risk); and the knowledge graph (the relationships a generic model could never infer), with Industry / NAICS and the domain ontology.
- Layer 05 · systems of record — the lending estate and its source of truth, always current, read in place by the tools above, never duplicated into the brain. What lives here: the loan book (every facility, drawn and undrawn); collateral and limits (the security taken and the approved headroom); credit files and obligor records (the documented history of every relationship).

Across every layer for the credit brain: one request, governed end to end. A banker
asks for a credit memo; the request runs the whole stack and comes back as a
decision, governed on every layer it touches. Down to fetch (records, then the
ontology, pulled through the tools in place); up to answer (the model reasons, the
brain consolidates the cited memo); governed on each (risk appetite, audit and the
credit committee, every call); back to the brain (the outcome becomes a lesson; the
next memo starts smarter). Illustrative, not exhaustive: any lending estate plugs
into the same five layers.

## The architecture — one brain, the whole estate, inside your account

Every box runs inside the bank's own AWS account and Region. The model is rented
from Bedrock; the brain, the tools and the governance are owned. The harness is
Claude Cowork (an MCP client on macOS and Windows) used by portfolio managers and
credit officers.

- The brain · agent orchestration (Owned) — the brain is a custom MCP server hosted in AgentCore Runtime. It holds memory, skills, project context, governance gates and per-user credential brokering; one connector per user, every tool call brokered and audited here. It orchestrates the agent ensemble: Credit Memo, Early Warning, Spread, Rating, and more across the lifecycle.
- Model substrate — now: Amazon Bedrock (Claude Opus / Sonnet, inference in-account, no training on your data). Optional: Bedrock Guardrails (a policy sidecar wrapping every model call; PII / DLP).
- Tools · MCP servers — optional at scale: AgentCore Gateway (not needed for a few servers; added at scale to curate many tools and pass act-as-user). We host (AgentCore Runtime, images in ECR): Boom MCP (spread · ratios), AFS MCP (servicing), Experience MCP (covenant · memo · writeback). Managed (we connect, we don't host): Salesforce sObject MCP (nCino reads / writes), Snowflake MCP (ratings · decision ledger).
- Secure data foundation — how they relate: Snowflake holds the numbers and the decision ledger; Cortex is its vector layer, searching policy and precedent by meaning with the vectors kept inside Snowflake; Neptune is a separate graph that resolves the same entities (borrower, guarantor, exposure) across all the systems; S3 lands raw documents. The brain draws on all of them; the live systems below are read in place, not copied here. Status markers on the page: Snowflake + Cortex are live today; Amazon S3 (raw document landing zone) and Amazon Neptune (graph) are marked Future.
- Across every layer — Identity & access (Identity Center SSO·MFA, AgentCore Identity act-as-user); Governance (Guardrails, Automated Reasoning, curation gate, ledger); Observability (AgentCore Observability, every run traced); Domains (Collateral · Loans · Deposits · Counterparties · Limits · Covenants — the buckets the ~25 systems map to).
- Systems of record — the live sources, each read in place by its MCP server, never copied, roughly 25 over time, mapped to domains: nCino and Salesforce via the Salesforce MCP; Snowflake via the Snowflake MCP; Boom spread API via the Boom MCP; AFS servicing via the AFS MCP; CapIQ market data via a future MCP; and around twenty more.

The request flows down the stack; knowledge is retrieved by meaning, back up to the brain.

## Under the hood — four mechanisms that make it a brain, not a chatbot

The architecture shows the layers; these four mechanisms are what happens inside
them — how the brain finds knowledge, remembers across sessions, learns, and grows.

- Mechanism 01 · Retrieval, by meaning. It finds the right knowledge, not the right keywords. A question rarely uses the words in the policy, so the brain matches on meaning and resolves the real-world entities behind the deal. Cortex embeds policy and precedent and the query finds the closest, not the same words; Neptune resolves the borrower, guarantor and exposure across systems; both stay inside the data foundation (no copy, no shadow index to drift); every answer is grounded in what was retrieved — cited, never invented.
- Mechanism 02 · Memory, across sessions. It remembers what you did last time: open the same borrower next week and the brain already knows the deal, the decisions and the open questions, so the next session starts where the last one ended. Memory is scoped and typed (this deal, this client, the bank's policy — kept apart); every memory carries provenance (where it came from, and when); unused context decays while what's reused stays sharp; no banker re-explains the relationship to a blank page. Illustrative example shown on the page: "Riverside · $12M revolver — DSCR 1.18x flagged, covenant waiver pending," with group exposure, prior ratings and relationship history as client context, and house covenant thresholds and write-up style as policy context.
- Mechanism 03 · Learning, from real use. It gets sharper with every decision. Every correction, reuse and approval is a signal; the brain learns what works here — the bank's house style — not what works in general. A reused answer is a vote, a correction is a lesson; signals accumulate into a strength score per pattern; it learns the bank's house style, not the internet's; no model retraining, the learning lives in the brain.
- Mechanism 04 · Promotion, lesson to skill. It graduates a good pattern into a reusable skill rather than leaving it a one-off: capture, then propose, then a governed gate, then a versioned skill. A human, or Automated Reasoning, signs off before it graduates; the ladder runs this memo, then the portfolio, then bank-wide policy; every skill is versioned so you can see exactly why it exists.

## One request, end to end — watch a credit memo get made

A relationship manager asks for a memo on a borrower; here is every step the brain
takes, in the open — every call, every source, every check, nothing hidden, all
auditable. This is the illustrative walkthrough on the page (Northwind
Manufacturing):

1. The ask — "Draft the annual review memo for Northwind Manufacturing." In Cowork, authenticated as the relationship manager.
2. Retrieve — the brain pulls the prior memo and the bank's construction-covenant precedent from Cortex by meaning, and resolves Northwind's guarantors and exposure in Neptune.
3. Call the tools — as the RM, it reads the spread from Boom, servicing from AFS, the loan and covenants from nCino. Read in place, never copied out of the bank.
4. Draft — the Credit Memo agent assembles a modular, SR 11-7-shaped memo. Every figure traces back to its source system.
5. Govern — Guardrails screen it, the audit ledger records who read what, and it lands as a DRAFT, pending credit-committee review.
6. Learn — the committee's edits are captured with provenance and promoted into a skill. The next Northwind memo starts smarter.

(The page reserves a placeholder for the bank's real credit-memo and spreading screen captures.)

## Why it gets better — not a tool you use, an asset that compounds

A chatbot forgets you the moment you close it. This remembers, learns how your bank
lends, and hands the best of every banker to the next one — across this deal and
last week, the client relationship, and your bank's policy.

- Memory — it remembers. Open a borrower and it already knows the deal, the decisions, the open questions; no one re-explains the relationship to a blank page. Every deal, client and policy kept in context; the next session starts where the last one ended; weeks of context, on tap.
- Learning — it learns your bank. Every memo you approve or correct teaches it your house style; it gets sharper at how your bank lends, not how the internet does. A reused answer is a vote, a correction is a lesson; it learns your covenants and write-up style; sharper every memo.
- Growth — it grows. A good call does not stay a one-off; it is promoted into a reusable skill, so the next banker inherits the best of the last one. This memo, then the portfolio, then bank-wide; your best people, scaled to everyone; the asset compounds.

## From demo to estate — how you would build it

No big rewrite. Four phases, each one live and useful on its own; the architecture
diagram is the destination, and this is the road to it.

1. Phase 1 · days — Turnkey reads. Point Cowork at Bedrock and the managed MCPs (Snowflake, Salesforce). Zero new infrastructure; the bank sees value on reads in days.
2. Phase 2 · weeks — Stand up the brain. Deploy the custom MCP brain in AgentCore Runtime; memory, skills, project context and per-user credential brokering come online.
3. Phase 3 · the first agent — Act through the brain. Route everything through the brain: governed write-back to nCino, the decision ledger, and the first agent (the Credit Memo) end to end.
4. Phase 4 · the estate — Scale the plumbing. Add the AgentCore Gateway for many tools, headless agents for monitoring, Neptune and S3, and more agents along the lifecycle.

What it takes: Amazon Bedrock (Claude access, in-account, no-train); AgentCore
Runtime · Identity · Gateway; Identity Center / IAM (SSO, MFA, act-as-user);
Snowflake + Cortex (structured + vectors, in place); Bedrock Guardrails (PII / DLP +
Automated Reasoning); and no new data store — read the estate in place.

## Take it further — the close

"Let's build it on your estate. One pattern, your systems, your governance. Start
with one slice — the credit memo — and grow it agent by agent across the lifecycle.
The model is rented. The brain is owned." The visitor is invited to talk to the
architects: Fabian Goetzens (architecture and product) and Noland Smith
(engineering and delivery). The page footer marks it again: an Accelerator by
Accenture, an architecture artifact, not a vendor product.
