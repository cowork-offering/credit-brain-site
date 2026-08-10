# AWS Reference Architecture — Commercial Lending Brain (diagram + lending blueprint)

## AWS reference architecture (Bedrock + AgentCore + MCP + Snowflake)

AWS Architecture — the bank Commercial Lending Brain 

 AWS Reference Architecture — Commercial Lending Brain 
 Credit Memo Agent on AWS + Anthropic · solid = build now · dashed amber = future state · dotted = backlog 

 Build now (this round) 
 Future state 
 Backlog 
 live data flow 
 future flow 

 Commercial RM · Credit Officer 20k+ users 

 Claude Cowork desktop channel (macOS / Windows) · the harness 

 aws   the bank AWS Account · Region 

 Model substrate 
 
 NOW Amazon Bedrock Claude (Opus / Sonnet) · inference in-account, no-train 
 OPTIONAL Bedrock Guardrails policy sidecar — wraps every model call · PII / DLP (governance round) 

 Tools — MCP servers · Cowork connects directly (it IS an MCP client) 

 OPTIONAL / SCALE AgentCore Gateway not needed for a few servers — add it to curate many tools + per-user act-as-user 

 We HOST these — AgentCore Runtime (managed MCP endpoints · images in ECR) 
 
 Boom MCP spread · ratios 
 AFS MCP servicing 
 Experience MCP covenant grade · memo · writeback 

 Managed — we CONNECT, we don't host 
 
 Salesforce sObject MCP nCino reads / writes 
 Snowflake MCP IRIS · decision ledger · analytics 

 BACKLOG AgentCore Runtime — headless agents scheduled / batch agents (non-Cowork) 
 BACKLOG AgentCore Identity act-as-user entitlement passthrough 

 Transport: streamable-HTTP over HTTPS to managed endpoints (auth: SigV4 / bearer). No tunnel needed — PrivateLink is a future hardening, not a demo requirement. 

 Secure data foundation 
 
 NOW Snowflake structured: spread · IRIS ratings · decision ledger · audit · semantic layer 
 NOW Snowflake Cortex vector / RAG — policy & precedent (the one prose domain) 

 FUTURE Amazon Neptune knowledge graph — cross-system entity resolution (borrower / guarantor / exposure) 
 FUTURE Amazon S3 raw document landing zone 

 Systems of record — feed the MCP servers (over time → ~25 systems, mapped to domains) 
 
 nCino (Salesforce) 
 Snowflake / IRIS 
 Boom spread API 
 AFS servicing 
 CapIQ / IBIS 
 + 20 more (future) 

 Reading it: User → Cowork → Bedrock (brain) → MCP servers → data. Cowork connects to the servers directly (it's an MCP client) — the Gateway is optional , added only at scale for act-as-user. You host 3 custom servers (Boom / AFS / Experience) in AgentCore Runtime ; you connect to the managed Salesforce + Snowflake MCPs. Guardrails is a governance sidecar. Neptune (knowledge graph) + S3 are future-state. The move from today = re-point model to Bedrock + re-host 3 servers into AgentCore — no rewrites, no tunnels.

 AWS reference architecture · Credit Memo Agent · build-now vs future state 
 Accelerator by Accenture — architecture artifact, not a vendor product

## Lending blueprint & app architecture

--- Slide 1 ---
The loan origination process can be difficult and complex, however many steps in this journey can be streamlined and automated, giving you a base from which to innovate and bring new propositions to your customer
BOI
BOI
BOI
A loan origination platform provides the end to end product sales, Underwriting and risk  servicing journeys
Servicing & Monitoring
Offering/ Setup
Approval
Credit Analysis
Sales
Prospecting
Pre-Scoring & KYC
Lead Identification
Application Preparation
Onboarding
Final Pricing & Terms
Documentation
Set-up
Account Servicing
Portfolio Monitoring
Credit Risk Monitoring
Approval
Credit Analysis
Drawdown
Core Credit Activity
Collateral management
Collections & Recoveries
Self-service Web Portal / App
THE CUSTOMERS’ CREDIT JOURNEY
Systems of Engagement
Systems of Insight & Analytics
CRM Platform
Onboarding Platform
Loan Origination & Credit Risk Platform
Core Banking Platform
Loan Origination & Credit Risk Platform
Client & Partner Ecosystems