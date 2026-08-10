# The brain is cloud-agnostic — the pattern across AWS, Azure, and GCP

The enterprise brain is one pattern with four layers: a model substrate, a tool surface (MCP), a secure data foundation, and a lifecycle-and-governance layer. Only the primitives in each layer change per cloud; the pattern, the ontologies, the data products, and the governance are portable.

## On AWS (the commercial lending brain)
- Model substrate: Amazon Bedrock, Claude inference in-account, no training on data; Bedrock Guardrails as the policy sidecar.
- Tool surface: custom MCP servers hosted in AgentCore Runtime, optional AgentCore Gateway at scale.
- Data foundation: Snowflake plus Snowflake Cortex for RAG; future-state Amazon Neptune (knowledge graph) and S3 (landing zone).

## On Microsoft / Azure (the company brain)
- Model substrate: Claude served through the Azure estate; identity is Entra-bounded with a managed identity for the brain and per-user delegated permissions for reads.
- Tool surface: MCP tool servers, plus the Microsoft 365 connector reaching SharePoint, OneDrive, Outlook, and Teams on demand with no caching and DLP still applied. Promoted skills are cataloged in Azure API Center.
- Data foundation: existing Microsoft systems accessed in place rather than copied into a new store.

## On Google Cloud (how the same pattern maps)
- Model substrate: Claude on Vertex AI, inference in-project.
- Tool surface: MCP servers hosted on Cloud Run or GKE, fronted as managed endpoints.
- Data foundation: BigQuery for structured data with vector search, or a managed vector store, for RAG.

## What is portable vs cloud-specific
Portable: the MCP tool contracts, the domain ontologies and data products, the adaptive-learning loop, and the human-gated governance. Cloud-specific: only the model-serving service, the MCP hosting service, and the data-foundation primitives. Moving cloud means re-pointing the model and re-hosting the servers. There are no rewrites and no tunnels.
