# The enterprise brain concept (deep)


Accenture Reinvention Brain: Architecture, Build Status & Rollout 

 REINVENTION BRAIN 

 ACCENTURE TASKFORCE 

 Confidential 
 7 June 2026

 Accenture Reinvention Brain: Architecture, Build Status & Rollout 
 A secure, multi-tenant AI brain for AI-augmented software delivery. Salesforce-first, built to generalize across the full SDLC. The Phase 1 foundation is built and running. Prepared for the Accenture taskforce by Fabian Goetzens and Noland Smith. 

 Contents 
 
 01 Executive summary 
 ● Build status (7 Jun 2026) 
 02 What we are building 
 03 Decided scope 
 04 Architecture overview 
 05 The three-tier model 
 06 Group and access control 
 07 Identity and authentication 
 08 Data governance and compliance 
 09 Self-healing and learning 
 10 Surfaces 
 11 Access rights (RBAC) 
 12 User onboarding 
 13 Skills and promotion policy 
 14 Security model 
 15 Phased rollout 
 16 Hosting and migration 
 17 What we defer 
 18 Open decisions and next steps 

 01  Executive summary 
 The Accenture Reinvention Brain is a secure, multi-tenant AI system that reproduces the self-healing and continuous-learning brain pattern proven in production, but for many users instead of one. The first vertical is Salesforce delivery; the real target is an AI-augmented brain for the full software delivery lifecycle (requirements, design, build, test, deploy, maintain), built to generalize across practices. As of 7 June 2026 the Phase 1 foundation is built and running as a proof of concept on a dedicated server, the next section is the live status. 
 We start with a maximum of 10 users in week one and scale carefully toward 70 to 80 users within three months. The pilot runs on a single Hetzner server in Germany, with a clean migration path to a Mac mini or AWS once Accenture confirms the target environment. 
 
 The one sentence version 
 Each user gets a private brain; practice groups (Salesforce, Workday, SAP, Palantir) give shared, access-controlled knowledge; a curated company layer sits on top. One orchestrator runs the whole thing, so the self-healing and learning machinery scales to 80 people without 80 copies of the infrastructure.
 
 Two principles shaped the build, and both are now implemented: isolation is enforced at the data-query layer rather than trusted to application code, and the one genuine external dependency, the Anthropic data-processing posture, is being confirmed before any real client data touches the system. The pilot runs on synthetic data until then. 

 ● Build status — what is live today (7 June 2026) 
 The Phase 1 foundation is built and running on the dedicated server. Everything below is deployed and verified. The brain already retrieves the correct, access-scoped context for each user; the only piece not yet switched on is the model's answer generation (see Pending). 
 
 Capability 
 
 Dedicated server, hardened (key-only SSH, firewall), Docker toolchain live 
 Four-service stack on one origin: Postgres control plane, Python worker (vector store + retriever), Bun orchestrator (API), nginx hub (React) live 
 Three-tier access model; 11 practice groups seeded (Salesforce populated first, Palantir hidden) live 
 Access-set retriever with pre-filter; cross-group and cross-tenant isolation proven by automated tests and live checks live 
 Magic-link sign-in and sessions live 
 RBAC: Owner, Admin (full access everywhere incl. every personal folder), Moderator, Member; disable / delete users (delete also wipes that user's personal folder and vectors) live 
 Files workspace: per-practice sub-folders (Delivery Standards, Accelerators, Runbooks, Templates, Reference); upload for members, delete for moderators; in-app preview of text, images and PDFs; admins can browse any user's folder live 
 Onboarding: "Add user" pop-up with a per-practice Member / Moderator toggle; mints an invite link; fully audited live 
 Append-only audit log on every action live 
 Accenture-branded portal: cinematic login (official logo, subtle backdrop, restrained accent), full-width aligned header, and the Ask / Knowledge / Files / Access / Admin surfaces live 
 Transferability: infrastructure-as-code, one-command backup and restore, dedicated project accounts, runtime-independent (never calls back to any other system) live 

 Pending (next up) 
 
 Item 
 
 Live model answers. Ask already retrieves the correct, scoped sources; the answer text is stubbed until the sanctioned Anthropic service credential is set, after which it becomes real retrieval-augmented answering. needs key 
 Per-user OAuth to Salesforce and other tools (designed; wiring next) next 
 Self-healing / learning fan-out workers (designed; not yet running) next 
 Pilot ingress (Tailscale or Cloudflare). Currently reachable by the builders over an SSH tunnel only. next 
 Data-processing / DPA confirmation. The pilot stays on synthetic data until this lands. action 

 02  What we are building 
 Today's brain is a single collective intelligence. Everything it learns pools into one memory, and it heals and improves itself through roughly forty background processes: health checks every five minutes, self-healing every thirty, a learning engine that graduates corrections into durable rules, weekly memory consolidation, semantic recall over a vector store, a knowledge graph, and an event bus that keeps parallel sessions coherent. 
 An enterprise brain for 80 people inverts one instinct. A single shared memory is exactly what we cannot have, because one user's private or client-confidential work must never surface in another user's context. The engineering challenge is not the chat surface. It is reproducing the self-healing and learning machinery while guaranteeing tenant and practice isolation. That is what this briefing addresses. 

 03  Decided scope 
 
 Decision Choice 
 
 Memory topology Three tiers: private per-user, practice group, curated company. Groups are the access-control primitive. 
 Domain Full AI-augmented SDLC. Salesforce-first, not Salesforce-only. Designed to generalize. 
 Group membership Multiple and flat for the pilot (a user can be in several groups). Nesting deferred. 
 Group confidentiality Confidential by default, with a per-group open flag and a request-to-unlock workflow. 
 Pilot authentication Simple magic-link / invite gate now. Entra (Azure AD) SSO and a Teams bot later. 
 Identity to tools Per-user SSO and OAuth. The brain acts as the user and inherits their permissions. 
 Model and data path Existing Anthropic enterprise subscription now. Swappable for Bedrock EU or an Accenture channel later. 
 Hosting and network Single Hetzner box plus Cloudflare Tunnel (no domain needed, zero open inbound ports). 

 04  Architecture overview 
 The core principle is one orchestrator, namespaced storage . The naive approach of one container per user would mean 80 self-healing crons, 80 vector-store processes, and 80 watchdogs: a maintenance liability, not a product. Instead a single orchestrator runs every background job once and fans out across tenants. Process count stays constant; only data grows. 
 /brain/tenants/{user_id}/ private lancedb/ events.jsonl sessions/ graph.json
/brain/groups/{group_id}/ practice lancedb/ events.jsonl promoted/ (salesforce, workday, sap, palantir, ...)
/brain/shared/ company lancedb/ promoted/ skills/
/brain/system/ audit.log (append-only) group-registry.json 

 Centralized (one instance) 
 Cron scheduler, model proxy (rate limiting and per-user cost attribution), authentication, access-set assembly, audit log, promotion gate, the company and group vector collections, watchdog, and the semantic daemon. 

 Per-tenant (namespaced data) 
 Each user's private vector collection, event bus, session state, and knowledge subgraph. Data is separated by namespace, not by separate running processes. 

 Two abstraction seams built on day one 
 A StorageBackend interface backs the vector store with S3-compatible object storage (Hetzner Object Storage now, AWS S3 later by changing one environment variable). A ModelBackend interface keeps the model provider swappable. We build the seams now and the alternative adapters only when needed, which is what keeps the later migration a redeploy rather than a rewrite. 

 05  The three-tier model 
 Every stored item carries a single-value scope: personal , group:{id} , or company . A user sees the union of their own private items, the groups they belong to, and the company layer. 
 
 Tier Who sees it Example content 
 
 Personal Just the user Their sessions, preferences, drafts, client-specific notes, anything unvalidated. 
 Group Members of that practice Reusable Salesforce conventions in the Salesforce group; SAP integration patterns in the SAP group. 
 Company Everyone Domain-agnostic standards: test strategy, security review discipline, deploy hygiene, incident runbooks. 

 We pre-seed the full group list now and leave Workday, SAP, and Palantir as empty folders, populating Salesforce first. Adding a new practice later is creating a group, not re-architecting the system. 

 06  Group and access control 
 Groups double as the knowledge partition and the confidentiality boundary, which mirrors how Accenture is actually organized (practices and client engagements). The retriever, the single component every search passes through, enforces an access-set filter computed by the orchestrator at request time. The caller never builds or modifies it. 
 return rows where scope == 'company'
 OR scope == 'group:{id}' for id in caller.groups
 OR group.open_to grants the caller
 OR (scope == 'personal' AND tenant_id == caller) 
 Each group carries three controls 
 
 Control Values Purpose 
 
 visibility discoverable / hidden Hidden groups are invisible to non-members. For deal teams or sensitive clients where even the group name is confidential. 
 open_to members_only / company / public An enum, not a yes/no. Default members_only. Lets a general group be readable company-wide without losing precision. 
 open_expiry required if opened An open grant must expire or be re-confirmed. A group opened at engagement kickoff cannot stay open forever by accident. 

 For confidential groups, a request-to-unlock workflow lets a user request access; an admin or group owner approves, and the membership change is logged. The request only ever exposes a discoverable group's name and description, never its contents. This workflow is Phase 2; in the pilot, admins assign groups directly at onboarding. 
 
 Why this passes a confidentiality review 
 Confidential-by-default is trivial to defend ("locked unless explicitly opened"). The opposite posture ("open unless someone remembered to lock it") is how leaks happen. Isolation is enforced at the query layer, so it cannot be bypassed by application code.

 07  Identity and authentication 
 Every user brings their own enterprise identity to the tools they use (Claude, Salesforce, and others as needed), exactly as the founders operate today. The brain brokers each user's tokens and acts as that user. 
 
 Inherited permissions. When the brain queries Salesforce for a user, it uses that user's session, so it sees only what they are allowed to see. The brain can never become a data-exfiltration superuser. This is a strong statement to make in a security review. 
 Attributable. Every downstream action appears under the real user in that tool's own audit log. 
 No credential sprawl. Per-user OAuth refresh tokens are stored encrypted inside each user's namespace. There is no shared master credential. 

 The catch that SSO hides: the autonomous layer needs its own credential 
 Interactive calls (a person chatting) run on that user's enterprise Anthropic seat. But the self-healing and learning processes run with no human present and cannot borrow a personal seat. They need a separate sanctioned service account provisioned under the Accenture enterprise agreement. This is a specific action item, not a detail.
 
 Two layers stay distinct. The hub login (who you are to the brain) is a magic link for the pilot and can become Entra SSO later. The downstream connections (what the brain can do as you) are per-user OAuth from day one. 

 08  Data governance and compliance 
 "We sign in with our enterprise license, so EU rules are covered" is partly true and worth unpacking, because a security review will probe exactly these distinctions. 
 
 Question Status 
 
 Permission to use Claude in the EU Covered Not in question. 
 Lawful processing (the DPA) Likely covered Anthropic enterprise terms generally include no training on your data, a GDPR Article 28 data-processing agreement, and standard contractual clauses. This holds if the brain routes through Accenture's enterprise agreement. 
 Data residency (processing inside the EU) Verify Separate from the DPA and engagement-dependent. Confirm Anthropic's EU options, or use Bedrock EU where a client demands in-region processing. 
 What the brain itself stores Our obligation Memories, embeddings, and transcripts live on our Hetzner box and may contain client data. Retention, access, and erasure are ours to govern regardless of any Anthropic agreement. 

 Action before any real client data or demo 
 (1) Ensure both interactive and service-account traffic route under the Accenture enterprise agreement, not personal keys. (2) Confirm DPA scope and residency posture with whoever owns the Anthropic relationship. (3) Run the pilot on synthetic or non-sensitive data until this is confirmed. This is the longest-lead item, so it should start now in parallel with the build.

 09  Self-healing and learning, made multi-tenant 
 The brain's roughly forty background components map cleanly onto "one centralized worker that fans out over tenant and group data." 
 
 Capability today Multi-tenant form 
 
 Health checks, self-heal, watchdog Centralized, iterates active sessions once per cycle. 
 Learning engine, correction and feedback graduation Centralized worker, batches each tenant's events in sequence. 
 Memory consolidation Centralized. Pilot uses recency weighting; full decay math deferred. 
 Semantic recall (vector store) One daemon, namespaced collections, every query through the access-set retriever. 
 Knowledge graph Per-tenant subgraph, centralized worker. No graph database for the pilot. 
 Event bus and shared context Per-tenant and per-group buses plus a system-wide append-only audit log. 
 Backups, snapshots, offsite copy Centralized and tenant-aware. 
 Untrusted-content fencing Retained. This is the filtering layer, applied per tenant and on promotion. 

 10  Surfaces 
 
 Surface Role When 
 
 Hub page Primary surface. Brain status, chat, knowledge search scoped to the user's groups, skills catalog, health, and the admin "Add user" action. Served over Cloudflare Tunnel. Pilot 
 IDE (Claude Code) Users sign in with their own Anthropic seat; brain context is wired to their access-set. This is the "works in any IDE" path. Pilot 
 Cowork Connect as a seat that operates the brain. Documented in the pilot, full integration as a fast follow. Phase 2 
 MS Teams bot Deferred. Requires an Entra app registration, so it pairs naturally with the SSO milestone. Phase 3 

 11  Access rights (RBAC) 
 
 Role Can do 
 
 Owner (Fabian, Noland) Full control: manage admins, model and billing config, promotion authority, kill switch, full audit. 
 Admin Add and remove members, assign groups, grant capability flags, approve access requests and promotions, scoped audit. 
 Group owner Phase 2 Approve access requests and group-scoped promotions for their own group. 
 Member Full private brain, read their groups and the company layer, use skills, propose promotions. 

 Capability flags (MCP server access, Cowork, network egress) are per-user and admin-granted, on a least-privilege basis. Nothing is enabled broadly by default, which keeps a tight answer to "what can this user's brain reach." 

 12  User onboarding (the button) 
 
 An admin opens the hub, clicks Add user , and enters name, Accenture email, role, and a multi-select group picker (Salesforce, Workday, SAP, Palantir). 
 The system provisions the user's namespace, attaches the selected groups, and seeds company and group skills. 
 A single-use, expiring magic link is generated and sent. 
 The user clicks through to a lightweight access setup (Entra SSO later) and lands on the hub. 
 On first run they connect their own accounts by SSO and OAuth (Anthropic, Salesforce, and tools relevant to their groups). Tokens are stored encrypted in their namespace. 
 An immutable audit entry records who added whom, when, under whose authority, and to which groups. 
 
 Deprovisioning archives the namespace per retention policy, revokes the link and sessions, and writes an audit entry. 

 13  Skills and promotion policy 
 This answers "what becomes a shared skill and what stays personal." Promotion is an explicit, confirmed, logged, one-way move into exactly one scope. 

 Stays personal 
 
 Client or account-specific content 
 Preferences and drafts 
 Secrets and personal data 
 One-off context 
 Unvalidated single-occurrence learnings 

 Eligible to promote 
 
 To a group: reusable patterns specific to a practice (Salesforce conventions, SAP integration patterns) 
 To company: domain-agnostic standards (test strategy, security review, deploy hygiene, incident runbooks) 
 Validated three times or human-confirmed, client-agnostic, no secrets 

 Gate mechanics (pilot) 
 An admin runs the promotion from the command line. A static sanitizer strips instruction-pattern strings and injection vectors before merge (an AI reviewing the content is not sufficient). A human approves, the item merges into exactly one scope, and an audit entry is written. Demotion requires elevated privilege and is also logged. 

 14  Security model 
 
 Risk Mitigation 
 
 Cross-tenant or cross-group bleed via semantic search Mandatory access-set pre-filter through one retriever. Physically separate collections per group for production. 
 Cache bleed (one user's cached result served to another) Cache key includes a hash of the caller's full access-set, never query text alone. 
 Prompt injection through the promotion gate Human approval plus a static sanitizer. Single-value scope. Never an AI-only review. 
 Group existence is itself confidential Hidden groups are invisible to non-members; the request flow exposes only discoverable group names. 
 Membership changes untracked Immutable log of every change: who, when, under whose authority. 
 An open group never re-locks Opening a group requires an expiry or a re-confirmation gate. 
 Network exposure Cloudflare Tunnel means zero open inbound ports. Egress is allow-listed to the model API and approved connectors. 

 15  Phased rollout 
 
 Phase Users Scope 
 
 0. Approve done 0 Plan approved, product named, dedicated box provisioned. Data-processing conversation still open. 
 1. Foundation mostly done up to 10 Live: orchestrator + namespaced storage + access-set retriever (isolation proven), hub, magic-link auth, Add-user modal with group picker, files workspace with sub-folders + preview, RBAC + user management, audit log. Remaining: wire the live model (Anthropic key), self-heal/learning fan-out, pilot ingress. Synthetic data only. 
 2. Harden weeks 2 to 6 ~30 Request-to-unlock workflow, group owners, promotion gate, per-user capability flags, per-seat cost attribution, monitoring, backup and restore drill. Decide on physical per-group collections for production. 
 3. Enterprise months 2 to 3 70 to 80 Entra SSO, Teams bot, Bedrock EU adapter if chosen, group nesting, promotion UI, validated migration readiness. 

 16  Hosting and migration 
 The pilot runs on a single Hetzner server in Germany. With no domain owned, a Cloudflare Tunnel provides TLS and a stable hub URL with zero open inbound ports, which is both faster to stand up than managing certificates and more secure than exposing the box directly. 
 Migration to AWS later is a redeploy, not a rewrite, provided we hold the day-one discipline: object storage behind the StorageBackend interface (Hetzner Object Storage now, AWS S3 later), Docker Compose now and ECS Fargate later from the same images, and the tunnel swapping to a load balancer with one DNS change. The model provider sits behind ModelBackend for the same reason. 
 Designed for full handover. The system can be transferred in its entirety to another owner, with no personal dependencies left behind. Everything is infrastructure-as-code plus portable data on a one-command backup and restore, using dedicated project accounts throughout, and the running system never calls back to any external brain or personal infrastructure. Handover is either an account transfer of the running box or a clean redeploy on the new owner's infrastructure from the repository and a data bundle. 

 17  What we deliberately defer 
 Discipline about scope is what keeps the pilot shippable in a week. We build the seams now and the following only when usage justifies them: 
 deferred MS Teams bot   deferred graph database   deferred full memory-decay math   deferred group nesting   deferred request-to-unlock UI   deferred promotion UI   deferred Bedrock adapter 

 18  Open decisions and next steps 
 
 # Decision needed Owner 
 
 1 Product name (hub and any client-facing material) Fabian / Noland 
 2 Data-processing route and timeline. The critical-path item; real data waits on this. Whoever owns the Anthropic relationship 
 3 Tunnel choice: Cloudflare (public hub URL) or Tailscale (private, Accenture network only) Fabian / Noland 
 4 Confirm synthetic-data-only for the pilot until item 2 lands Fabian / Noland 
 5 Initial group list to pre-seed beyond Salesforce Fabian / Noland 
 6 Noland technical review, and an advisor review of the commercial framing before the taskforce presentation Noland 

 Recommended immediate sequence 
 Lock the product name, open the data-processing conversation in parallel (longest lead), and on the go-ahead begin Phase 1 with the storage layer and the access-set retriever, since everything else sits on that foundation.

Contents 
 
 01 Executive summary 
 ● Build status (7 Jun 2026) 
 02 What we are building 
 03 Decided scope 
 04 Architecture overview 
 05 The three-tier model 
 06 Group and access control 
 07 Identity and authentication 
 08 Data governance and compliance 
 09 Self-healing and learning 
 10 Surfaces 
 11 Access rights (RBAC) 
 12 User onboarding 
 13 Skills and promotion policy 
 14 Security model 
 15 Phased rollout 
 16 Hosting and migration 
 17 What we defer 
 18 Open decisions and next steps 

 01  Executive summary 
 The Accenture Reinvention Brain is a secure, multi-tenant AI system that reproduces the self-healing and continuous-learning brain pattern proven in production, but for many users instead of one. The first vertical is Salesforce delivery; the real target is an AI-augmented brain for the full software delivery lifecycle (requirements, design, build, test, deploy, maintain), built to generalize across practices. As of 7 June 2026 the Phase 1 foundation is built and running as a proof of concept on a dedicated server, the next section is the live status. 
 We start with a maximum of 10 users in week one and scale carefully toward 70 to 80 users within three months. The pilot runs on a single Hetzner server in Germany, with a clean migration path to a Mac mini or AWS once Accenture confirms the target environment. 
 
 The one sentence version 
 Each user gets a private brain; practice groups (Salesforce, Workday, SAP, Palantir) give shared, access-controlled knowledge; a curated company layer sits on top. One orchestrator runs the whole thing, so the self-healing and learning machinery scales to 80 people without 80 copies of the infrastructure.
 
 Two principles shaped the build, and both are now implemented: isolation is enforced at the data-query layer rather than trusted to application code, and the one genuine external dependency, the Anthropic data-processing posture, is being confirmed before any real client data touches the system. The pilot runs on synthetic data until then. 

 ● Build status — what is live today (7 June 2026) 
 The Phase 1 foundation is built and running on the dedicated server. Everything below is deployed and verified. The brain already retrieves the correct, access-scoped context for each user; the only piece not yet switched on is the model's answer generation (see Pending). 
 
 Capability 
 
 Dedicated server, hardened (key-only SSH, firewall), Docker toolchain live 
 Four-service stack on one origin: Postgres control plane, Python worker (vector store + retriever), Bun orchestrator (API), nginx hub (React) live 
 Three-tier access model; 11 practice groups seeded (Salesforce populated first, Palantir hidden) live 
 Access-set retriever with pre-filter; cross-group and cross-tenant isolation proven by automated tests and live checks live 
 Magic-link sign-in and sessions live 
 RBAC: Owner, Admin (full access everywhere incl. every personal folder), Moderator, Member; disable / delete users (delete also wipes that user's personal folder and vectors) live 
 Files workspace: per-practice sub-folders (Delivery Standards, Accelerators, Runbooks, Templates, Reference); upload for members, delete for moderators; in-app preview of text, images and PDFs; admins can browse any user's folder live 
 Onboarding: "Add user" pop-up with a per-practice Member / Moderator toggle; mints an invite link; fully audited live 
 Append-only audit log on every action live 
 Accenture-branded portal: cinematic login (official logo, subtle backdrop, restrained accent), full-width aligned header, and the Ask / Knowledge / Files / Access / Admin surfaces live 
 Transferability: infrastructure-as-code, one-command backup and restore, dedicated project accounts, runtime-independent (never calls back to any other system) live 

 Pending (next up) 
 
 Item 
 
 Live model answers. Ask already retrieves the correct, scoped sources; the answer text is stubbed until the sanctioned Anthropic service credential is set, after which it becomes real retrieval-augmented answering. needs key 
 Per-user OAuth to Salesforce and other tools (designed; wiring next) next 
 Self-healing / learning fan-out workers (designed; not yet running) next 
 Pilot ingress (Tailscale or Cloudflare). Currently reachable by the builders over an SSH tunnel only. next 
 Data-processing / DPA confirmation. The pilot stays on synthetic data until this lands. action 

 02  What we are building 
 Today's brain is a single collective intelligence. Everything it learns pools into one memory, and it heals and improves itself through roughly forty background processes: health checks every five minutes, self-healing every thirty, a learning engine that graduates corrections into durable rules, weekly memory consolidation, semantic recall over a vector store, a knowledge graph, and an event bus that keeps parallel sessions coherent. 
 An enterprise brain for 80 people inverts one instinct. A single shared memory is exactly what we cannot have, because one user's private or client-confidential work must never surface in another user's context. The engineering challenge is not the chat surface. It is reproducing the self-healing and learning machinery while guaranteeing tenant and practice isolation. That is what this briefing addresses. 

 03  Decided scope 
 
 Decision Choice 
 
 Memory topology Three tiers: private per-user, practice group, curated company. Groups are the access-control primitive. 
 Domain Full AI-augmented SDLC. Salesforce-first, not Salesforce-only. Designed to generalize. 
 Group membership Multiple and flat for the pilot (a user can be in several groups). Nesting deferred. 
 Group confidentiality Confidential by default, with a per-group open flag and a request-to-unlock workflow. 
 Pilot authentication Simple magic-link / invite gate now. Entra (Azure AD) SSO and a Teams bot later. 
 Identity to tools Per-user SSO and OAuth. The brain acts as the user and inherits their permissions. 
 Model and data path Existing Anthropic enterprise subscription now. Swappable for Bedrock EU or an Accenture channel later. 
 Hosting and network Single Hetzner box plus Cloudflare Tunnel (no domain needed, zero open inbound ports). 

 04  Architecture overview 
 The core principle is one orchestrator, namespaced storage . The naive approach of one container per user would mean 80 self-healing crons, 80 vector-store processes, and 80 watchdogs: a maintenance liability, not a product. Instead a single orchestrator runs every background job once and fans out across tenants. Process count stays constant; only data grows. 
 /brain/tenants/{user_id}/ private lancedb/ events.jsonl sessions/ graph.json
/brain/groups/{group_id}/ practice lancedb/ events.jsonl promoted/ (salesforce, workday, sap, palantir, ...)
/brain/shared/ company lancedb/ promoted/ skills/
/brain/system/ audit.log (append-only) group-registry.json 

 Centralized (one instance) 
 Cron scheduler, model proxy (rate limiting and per-user cost attribution), authentication, access-set assembly, audit log, promotion gate, the company and group vector collections, watchdog, and the semantic daemon. 

 Per-tenant (namespaced data) 
 Each user's private vector collection, event bus, session state, and knowledge subgraph. Data is separated by namespace, not by separate running processes. 

 Two abstraction seams built on day one 
 A StorageBackend interface backs the vector store with S3-compatible object storage (Hetzner Object Storage now, AWS S3 later by changing one environment variable). A ModelBackend interface keeps the model provider swappable. We build the seams now and the alternative adapters only when needed, which is what keeps the later migration a redeploy rather than a rewrite. 

 05  The three-tier model 
 Every stored item carries a single-value scope: personal , group:{id} , or company . A user sees the union of their own private items, the groups they belong to, and the company layer. 
 
 Tier Who sees it Example content 
 
 Personal Just the user Their sessions, preferences, drafts, client-specific notes, anything unvalidated. 
 Group Members of that practice Reusable Salesforce conventions in the Salesforce group; SAP integration patterns in the SAP group. 
 Company Everyone Domain-agnostic standards: test strategy, security review discipline, deploy hygiene, incident runbooks. 

 We pre-seed the full group list now and leave Workday, SAP, and Palantir as empty folders, populating Salesforce first. Adding a new practice later is creating a group, not re-architecting the system. 

 06  Group and access control 
 Groups double as the knowledge partition and the confidentiality boundary, which mirrors how Accenture is actually organized (practices and client engagements). The retriever, the single component every search passes through, enforces an access-set filter computed by the orchestrator at request time. The caller never builds or modifies it. 
 return rows where scope == 'company'
 OR scope == 'group:{id}' for id in caller.groups
 OR group.open_to grants the caller
 OR (scope == 'personal' AND tenant_id == caller) 
 Each group carries three controls 
 
 Control Values Purpose 
 
 visibility discoverable / hidden Hidden groups are invisible to non-members. For deal teams or sensitive clients where even the group name is confidential. 
 open_to members_only / company / public An enum, not a yes/no. Default members_only. Lets a general group be readable company-wide without losing precision. 
 open_expiry required if opened An open grant must expire or be re-confirmed. A group opened at engagement kickoff cannot stay open forever by accident. 

 For confidential groups, a request-to-unlock workflow lets a user request access; an admin or group owner approves, and the membership change is logged. The request only ever exposes a discoverable group's name and description, never its contents. This workflow is Phase 2; in the pilot, admins assign groups directly at onboarding. 
 
 Why this passes a confidentiality review 
 Confidential-by-default is trivial to defend ("locked unless explicitly opened"). The opposite posture ("open unless someone remembered to lock it") is how leaks happen. Isolation is enforced at the query layer, so it cannot be bypassed by application code.

 07  Identity and authentication 
 Every user brings their own enterprise identity to the tools they use (Claude, Salesforce, and others as needed), exactly as the founders operate today. The brain brokers each user's tokens and acts as that user. 
 
 Inherited permissions. When the brain queries Salesforce for a user, it uses that user's session, so it sees only what they are allowed to see. The brain can never become a data-exfiltration superuser. This is a strong statement to make in a security review. 
 Attributable. Every downstream action appears under the real user in that tool's own audit log. 
 No credential sprawl. Per-user OAuth refresh tokens are stored encrypted inside each user's namespace. There is no shared master credential. 

 The catch that SSO hides: the autonomous layer needs its own credential 
 Interactive calls (a person chatting) run on that user's enterprise Anthropic seat. But the self-healing and learning processes run with no human present and cannot borrow a personal seat. They need a separate sanctioned service account provisioned under the Accenture enterprise agreement. This is a specific action item, not a detail.
 
 Two layers stay distinct. The hub login (who you are to the brain) is a magic link for the pilot and can become Entra SSO later. The downstream connections (what the brain can do as you) are per-user OAuth from day one. 

 08  Data governance and compliance 
 "We sign in with our enterprise license, so EU rules are covered" is partly true and worth unpacking, because a security review will probe exactly these distinctions. 
 
 Question Status 
 
 Permission to use Claude in the EU Covered Not in question. 
 Lawful processing (the DPA) Likely covered Anthropic enterprise terms generally include no training on your data, a GDPR Article 28 data-processing agreement, and standard contractual clauses. This holds if the brain routes through Accenture's enterprise agreement. 
 Data residency (processing inside the EU) Verify Separate from the DPA and engagement-dependent. Confirm Anthropic's EU options, or use Bedrock EU where a client demands in-region processing. 
 What the brain itself stores Our obligation Memories, embeddings, and transcripts live on our Hetzner box and may contain client data. Retention, access, and erasure are ours to govern regardless of any Anthropic agreement. 

 Action before any real client data or demo 
 (1) Ensure both interactive and service-account traffic route under the Accenture enterprise agreement, not personal keys. (2) Confirm DPA scope and residency posture with whoever owns the Anthropic relationship. (3) Run the pilot on synthetic or non-sensitive data until this is confirmed. This is the longest-lead item, so it should start now in parallel with the build.

 09  Self-healing and learning, made multi-tenant 
 The brain's roughly forty background components map cleanly onto "one centralized worker that fans out over tenant and group data." 
 
 Capability today Multi-tenant form 
 
 Health checks, self-heal, watchdog Centralized, iterates active sessions once per cycle. 
 Learning engine, correction and feedback graduation Centralized worker, batches each tenant's events in sequence. 
 Memory consolidation Centralized. Pilot uses recency weighting; full decay math deferred. 
 Semantic recall (vector store) One daemon, namespaced collections, every query through the access-set retriever. 
 Knowledge graph Per-tenant subgraph, centralized worker. No graph database for the pilot. 
 Event bus and shared context Per-tenant and per-group buses plus a system-wide append-only audit log. 
 Backups, snapshots, offsite copy Centralized and tenant-aware. 
 Untrusted-content fencing Retained. This is the filtering layer, applied per tenant and on promotion. 

 10  Surfaces 
 
 Surface Role When 
 
 Hub page Primary surface. Brain status, chat, knowledge search scoped to the user's groups, skills catalog, health, and the admin "Add user" action. Served over Cloudflare Tunnel. Pilot 
 IDE (Claude Code) Users sign in with their own Anthropic seat; brain context is wired to their access-set. This is the "works in any IDE" path. Pilot 
 Cowork Connect as a seat that operates the brain. Documented in the pilot, full integration as a fast follow. Phase 2 
 MS Teams bot Deferred. Requires an Entra app registration, so it pairs naturally with the SSO milestone. Phase 3 

 11  Access rights (RBAC) 
 
 Role Can do 
 
 Owner (Fabian, Noland) Full control: manage admins, model and billing config, promotion authority, kill switch, full audit. 
 Admin Add and remove members, assign groups, grant capability flags, approve access requests and promotions, scoped audit. 
 Group owner Phase 2 Approve access requests and group-scoped promotions for their own group. 
 Member Full private brain, read their groups and the company layer, use skills, propose promotions. 

 Capability flags (MCP server access, Cowork, network egress) are per-user and admin-granted, on a least-privilege basis. Nothing is enabled broadly by default, which keeps a tight answer to "what can this user's brain reach." 

 12  User onboarding (the button) 
 
 An admin opens the hub, clicks Add user , and enters name, Accenture email, role, and a multi-select group picker (Salesforce, Workday, SAP, Palantir). 
 The system provisions the user's namespace, attaches the selected groups, and seeds company and group skills. 
 A single-use, expiring magic link is generated and sent. 
 The user clicks through to a lightweight access setup (Entra SSO later) and lands on the hub. 
 On first run they connect their own accounts by SSO and OAuth (Anthropic, Salesforce, and tools relevant to their groups). Tokens are stored encrypted in their namespace. 
 An immutable audit entry records who added whom, when, under whose authority, and to which groups. 
 
 Deprovisioning archives the namespace per retention policy, revokes the link and sessions, and writes an audit entry. 

 13  Skills and promotion policy 
 This answers "what becomes a shared skill and what stays personal." Promotion is an explicit, confirmed, logged, one-way move into exactly one scope. 

 Stays personal 
 
 Client or account-specific content 
 Preferences and drafts 
 Secrets and personal data 
 One-off context 
 Unvalidated single-occurrence learnings 

 Eligible to promote 
 
 To a group: reusable patterns specific to a practice (Salesforce conventions, SAP integration patterns) 
 To company: domain-agnostic standards (test strategy, security review, deploy hygiene, incident runbooks) 
 Validated three times or human-confirmed, client-agnostic, no secrets 

 Gate mechanics (pilot) 
 An admin runs the promotion from the command line. A static sanitizer strips instruction-pattern strings and injection vectors before merge (an AI reviewing the content is not sufficient). A human approves, the item merges into exactly one scope, and an audit entry is written. Demotion requires elevated privilege and is also logged. 

 14  Security model 
 
 Risk Mitigation 
 
 Cross-tenant or cross-group bleed via semantic search Mandatory access-set pre-filter through one retriever. Physically separate collections per group for production. 
 Cache bleed (one user's cached result served to another) Cache key includes a hash of the caller's full access-set, never query text alone. 
 Prompt injection through the promotion gate Human approval plus a static sanitizer. Single-value scope. Never an AI-only review. 
 Group existence is itself confidential Hidden groups are invisible to non-members; the request flow exposes only discoverable group names. 
 Membership changes untracked Immutable log of every change: who, when, under whose authority. 
 An open group never re-locks Opening a group requires an expiry or a re-confirmation gate. 
 Network exposure Cloudflare Tunnel means zero open inbound ports. Egress is allow-listed to the model API and approved connectors. 

 15  Phased rollout 
 
 Phase Users Scope 
 
 0. Approve done 0 Plan approved, product named, dedicated box provisioned. Data-processing conversation still open. 
 1. Foundation mostly done up to 10 Live: orchestrator + namespaced storage + access-set retriever (isolation proven), hub, magic-link auth, Add-user modal with group picker, files workspace with sub-folders + preview, RBAC + user management, audit log. Remaining: wire the live model (Anthropic key), self-heal/learning fan-out, pilot ingress. Synthetic data only. 
 2. Harden weeks 2 to 6 ~30 Request-to-unlock workflow, group owners, promotion gate, per-user capability flags, per-seat cost attribution, monitoring, backup and restore drill. Decide on physical per-group collections for production. 
 3. Enterprise months 2 to 3 70 to 80 Entra SSO, Teams bot, Bedrock EU adapter if chosen, group nesting, promotion UI, validated migration readiness. 

 16  Hosting and migration 
 The pilot runs on a single Hetzner server in Germany. With no domain owned, a Cloudflare Tunnel provides TLS and a stable hub URL with zero open inbound ports, which is both faster to stand up than managing certificates and more secure than exposing the box directly. 
 Migration to AWS later is a redeploy, not a rewrite, provided we hold the day-one discipline: object storage behind the StorageBackend interface (Hetzner Object Storage now, AWS S3 later), Docker Compose now and ECS Fargate later from the same images, and the tunnel swapping to a load balancer with one DNS change. The model provider sits behind ModelBackend for the same reason. 
 Designed for full handover. The system can be transferred in its entirety to another owner, with no personal dependencies left behind. Everything is infrastructure-as-code plus portable data on a one-command backup and restore, using dedicated project accounts throughout, and the running system never calls back to any external brain or personal infrastructure. Handover is either an account transfer of the running box or a clean redeploy on the new owner's infrastructure from the repository and a data bundle. 

 17  What we deliberately defer 
 Discipline about scope is what keeps the pilot shippable in a week. We build the seams now and the following only when usage justifies them: 
 deferred MS Teams bot   deferred graph database   deferred full memory-decay math   deferred group nesting   deferred request-to-unlock UI   deferred promotion UI   deferred Bedrock adapter 

 18  Open decisions and next steps 
 
 # Decision needed Owner 
 
 1 Product name (hub and any client-facing material) Fabian / Noland 
 2 Data-processing route and timeline. The critical-path item; real data waits on this. Whoever owns the Anthropic relationship 
 3 Tunnel choice: Cloudflare (public hub URL) or Tailscale (private, Accenture network only) Fabian / Noland 
 4 Confirm synthetic-data-only for the pilot until item 2 lands Fabian / Noland 
 5 Initial group list to pre-seed beyond Salesforce Fabian / Noland 
 6 Noland technical review, and an advisor review of the commercial framing before the taskforce presentation Noland 

 Recommended immediate sequence 
 Lock the product name, open the data-processing conversation in parallel (longest lead), and on the go-ahead begin Phase 1 with the storage layer and the access-set retriever, since everything else sits on that foundation.
