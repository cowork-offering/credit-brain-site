# Component & Software Glossary — what each part does

This is a vendor-accurate explanation of every moving part in the brain stack. The architecture is a reusable pattern; the systems below are illustrative of a real commercial-lending estate.

## The channel and the model
- **Claude Cowork** — the desktop channel and harness (macOS / Windows) people work in. It is itself an MCP client, so it connects to the tool servers directly; a gateway is only added at scale.
- **Amazon Bedrock** — serves the Claude models (Opus / Sonnet) for inference INSIDE the bank's own AWS account, with no training on the bank's data.
- **Bedrock Guardrails** — an optional policy sidecar that wraps every model call for PII, DLP, and denied topics. Governance hardening.

## The tool surface (MCP)
- **MCP (Model Context Protocol)** — the open standard that lets the model connect once to many systems instead of building point-to-point integrations. Transport is streamable-HTTP over HTTPS, authenticated with SigV4 or bearer. No tunnels.
- **AgentCore Runtime** — AWS-managed hosting for the custom MCP servers (container images in ECR). Session-isolated and long-running.
- **AgentCore Gateway** — optional; curates many tools and adds per-user act-as-user when the tool count grows. Not needed for a few servers.
- **AgentCore Identity** — act-as-user entitlement passthrough (a scale/backlog item).

## The hosted MCP servers (custom-built)
- **Boom MCP** — connector to the Boom spreading engine (api.boom.build). Exposes raw, normalized income-statement, balance-sheet, and cash-flow line items keyed by account code. This is the financial-spreading source. Four tools, one shared tool core, stdio plus streamable-HTTP transports.
- **Experience MCP** — the bank-neutral cross-source composition layer and the system-of-record WRITE path. It sits above the generic Salesforce (nCino) and Boom system servers and owns covenant grading, the credit memo, document write-back (nCino DocMan), approval submission, and notification. The bank brand is a swappable config, not code.
- **AFS MCP** — access to the servicing system.

## The credit memo agent (the flagship capability)
- **Credit Memo Agent** — a Cowork plugin that drafts commercial credit memos for C&I borrowers using a multi-agent plus MCP architecture: an orchestrator delegates to specialist subagents that read from the MCP data servers (nCino, Boom, AFS, IRIS, CapIQ / IBIS), and a modular conditionality engine assembles the memo from a declarative module manifest. In the AWS architecture this is the flagship "underwrite" capability, built and running.

## Connected (managed) servers — we connect, we don't host
- **Salesforce sObject MCP** — reads and writes against nCino (loan origination on Salesforce).
- **Snowflake MCP** — structured data: spreads, IRIS ratings, the decision ledger, audit, and the semantic layer / analytics.

## The secure data foundation
- **Snowflake** — the structured data foundation (spread, ratings, decision ledger, audit, semantic layer).
- **Snowflake Cortex** — vector search / RAG over the one prose domain: policy and precedent.
- **Amazon Neptune** (future) — a knowledge graph for cross-system entity resolution across borrower, guarantor, and exposure.
- **Amazon S3** (future) — the raw document landing zone.

## Systems of record (the estate)
nCino (loan origination, on Salesforce), the Boom spreading API, AFS (servicing), IRIS (ratings), and external sources like CapIQ / IBIS. Over time this grows toward roughly 25 systems mapped to domains. Adding the second and twentieth system is cheap because each new server reuses the same connection pattern.
