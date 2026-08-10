# Company Brain — Azure Target Architecture & Solution Intent

## Enterprise architecture (source)

ACCENTURE · INTERNAL                                                                           DRAFT — PENDING SECURITY VALIDATION




ENTERPRISE             ARCHITECTURE         HANDOUT




The Company Brain,
translated for enterprise.
From a self-hosted proof of concept to a governed architecture on Microsoft
infrastructure — the products to request, the identity and SSO
prerequisites, and the decisions to close before we build.




                                      MICROSOFT ENTRA ID · TRUST BOUNDARY



                                              M365 Connector
                                             READS · DELEGATED
           Claude                                                                 Graph API                          SharePoint
          MCP CLIENT                                                              MANAGED ID
                                                                                                                     GOVERNED STORE

                                                                                                                      NO NEW COPY
                                              MCP Brain Server
                                            AZURE CONTAINER APPS




FIG. 0 — SAME ARCHITECTURE AS THE PROTOTYPE, RELOCATED INSIDE THE ENTRA ID TRUST BOUNDARY. THE STORE NEVER CHANGES.




SUBJECT                                      AUDIENCE                                          STATUS

Knowledge "brain" exposed to Claude          Security architecture · Platform ·                Proposal for review — all cloud, data &
via MCP                                      Client-data protection                            ingress choices require validation




COMPANY BRAIN · ENTERPRISE ARCHITECTURE                              ACCENTURE · INTERNAL — DRAFT                                     PAGE 1 / 6
01        Executive summary                                                                                         THE THESIS



We have a working proof of concept: a knowledge brain exposed to Claude through a custom remote MCP
server, self-hosted on a Hetzner VPS and reached over a Tailscale tunnel.

The proposed enterprise version keeps the same architecture but relocates it onto governed Microsoft infrastructure
and, critically, introduces no new store of client data. The brain reads from and writes to SharePoint — already
governed — via Microsoft Graph, while a custom MCP server on Azure provides the orchestration, skills, and agent
logic. Identity-based access through Microsoft Entra ID replaces the network-tunnel security model.


     GUIDING PRINCIPLE

     Do not create a new copy of client data anywhere. Every product and pattern below is chosen to honour this. It
     is what keeps the project out of full storage due-diligence while still delivering a write-capable, self-improving
     brain.



02        Current state — what we have today                                                                         PROTOTYPE




 ELEMENT                                PROTOTYPE IMPLEMENTATION


 Brain logic                            Custom remote MCP server — same architecture as directory connectors (Salesforce,
                                        Slack), but self-hosted and unverified

 Compute                                Hetzner VPS — a single self-managed box

 Data store                             Folder / knowledge structure on the same VPS

 Access path                            Tailscale (WireGuard mesh VPN) tunnel

 Security model                         Network boundary — "on the mesh = trusted"

 Auth                                   Configured on the box; the network boundary does most of the work

 Scope                                  Single user, built on a personal subscription prior to beta access



     HONEST ASSESSMENT

     Excellent as a concept proof; not the production shape. The security model is a network boundary, data and
     compute share one self-managed box, and there is no per-user access partitioning. Keep it alive only as a
     demonstration artifact for internal buy-in — no further hardening.



03        Target state                                                                                 ENTERPRISE ARCHITECTURE



Two layers, both org-provisioned, both inside the Microsoft / Entra ID trust boundary.




COMPANY BRAIN · ENTERPRISE ARCHITECTURE                          ACCENTURE · INTERNAL — DRAFT                       PAGE 2 / 6
  LAYER                                                           WHAT IT IS & WHY IT IS CLEAN


  Read-federation layer                                           Anthropic-hosted. Reaches SharePoint / OneDrive / Outlook / Teams via Graph
  Microsoft 365 connector for Claude                              using per-user delegated permissions. Retrieves on demand, caches nothing —
                                                                  data never leaves the tenant — and respects existing SharePoint permissions
                                                                  and DLP. Provisioned by a Claude org Owner plus Entra admin consent; no
                                                                  shadow-IT possible.

  Write / orchestration layer                                     Our brain logic on Azure Container Apps. Holds the skills/agents and the
  Custom MCP server on Azure                                      "create-a-project, apply-best-practices" behaviour. Authenticates via Entra ID,
                                                                  reaches data via Managed Identity, and writes curated artifacts into partitioned
                                                                  SharePoint locations via Graph — not into any new store.



                                                                                     Claude
                                                                        MCP CLIENT · ORG-PROVISIONED




         MICROSOFT ENTRA ID · TRUST BOUNDARY

                      READ FEDERATION                                                                                           WRITE · ORCHESTRATION


                                  M365 Connector for Claude                                                         Custom MCP Connector
                                    ANTHROPIC-HOSTED · PER-USER                                                        UNVERIFIED · OWNER-ADDED




                                                                                                                       MCP Brain Server
                                                                                                             AZURE CONTAINER APPS · SKILLS · AGENTS
                                                     DELEGATED

                                                                                                MANAGED ID




                                                                         Microsoft Graph API                                            SharePoint
                                                                          SHARED ACCESS LAYER                                 PARTITIONED BY CLIENT / SENSITIVITY


                                                                                                                                           NO NEW STORE




FIG. 1 — TARGET DATA FLOW. READS STAY ON-DEMAND INSIDE THE TENANT; WRITES PASS A CURATION GATE INTO PARTITIONED SHAREPOINT.
NO NEW STORE OF CLIENT DATA.


04         Architecture translation                                                                                                               COMPONENT BY COMPONENT




                             PROTOTYPE                                                                                                   ENTERPRISE



          Hetzner VPS                                                                                               Azure Container Apps



          Tailscale tunnel                                                                                          Entra ID auth + ingress controls



          Box credentials / SSH                                                                                     Managed Identity



          Knowledge folder on box                                                                                   SharePoint via Graph



          Manual log watching                                                                                       Application Insights



FIG. 2 — EACH PROTOTYPE ELEMENT HAS A DIRECT ENTERPRISE COUNTERPART. SECURITY MOVES FROM THE NETWORK LAYER TO THE IDENTITY
LAYER.

Compute. Container Apps is preferred over Azure Functions for the brain server: it is a long-running, stateful service holding connections
and orchestrating skills/agents. Functions (serverless, parts in preview) suits simpler stateless tools. Website. The existing site can also run
on Azure — as a separate Container App with its own ingress, or on Azure Static Web Apps if it is a static frontend — kept isolated from the
client-data-touching MCP server.




COMPANY BRAIN · ENTERPRISE ARCHITECTURE                                                    ACCENTURE · INTERNAL — DRAFT                                             PAGE 3 / 6
05       Products & services to request                                                                               PROCUREMENT




 #      PRODUCT / SERVICE             ROLE                                                            NOTE


 1      Azure Container Apps          Host the MCP brain server (and optionally the website)          Confirm enabled in
                                                                                                      tenant

 2      M365 connector for            Read-federation over SharePoint / Teams / OneDrive /            Org-provisioned; Entra
        Claude                        Outlook                                                         consent

 3      SharePoint (via Graph)        The writable store                                               NOTHING NEW TO PROCURE



 4      Microsoft Entra ID            Identity & SSO for users and services                           See §6

 5      Managed Identity              Server-to-data auth without secrets                             Azure feature, not a
                                                                                                      purchase

 6      Application Insights          Logging / audit / observability                                 Required for review


 7      Azure Static Web Apps         Cleaner home for a static website                               Only if the site is static
         OPTIONAL


 8      Azure API Center              Internal governed catalog of MCP servers                        Useful at rollout scale
         OPTIONAL



 9      Claude Team / Enterprise      The Claude side; Owner role to provision connectors             Identify who holds
                                                                                                      Owner



     DELIBERATELY NOT ON THIS LIST

     Any new storage product (Blob, dedicated database, etc.). Introducing one creates a new copy of client data
     and triggers the due-diligence we are avoiding.



06       Identity & SSO prerequisites                                                                                         ACCESS




 ITEM                            WHAT'S NEEDED                                                            OWNER


 User SSO into Claude            SAML / SSO federation with Accenture's Entra ID; MFA &                   IdP / security
                                 conditional access

 M365 connector consent          Entra global admin grants admin consent to the two M365-MCP              Entra global admin +
                                 Entra apps (server + client); permissions are delegated, so Claude       Claude Owner
                                 only ever sees what the signed-in user can access

 Brain server → data auth        Managed Identity for the Container App; scoped Graph write-back          Platform + security
                                 permissions (least privilege)

 Claude org provisioning         Identify the Claude Owner / Primary Owner — only they can add               INTERNAL — TBD
                                 the connector org-wide; users then connect individually

 Token lifecycle                 Confirm Entra token lifetime / refresh policy (defaults: access          Security
                                 tokens ~60–90 min auto-refreshed; refresh tokens expire after 90
                                 days inactivity)




COMPANY BRAIN · ENTERPRISE ARCHITECTURE                           ACCENTURE · INTERNAL — DRAFT                          PAGE 4 / 6
07        Open decisions & gates                                                                                                             CLOSE BEFORE BUILDING



Hard gates, not formalities. Three of these can stop the design entirely.

 #      DECISION                                           QUESTION TO RESOLVE                                                                     TYPE


 1      Data classification                                What classification will the brain hold? Client-confidential material                     GATE
                                                           dominates every other decision.

 2      Storage approach                                   Is "reuse SharePoint via Graph, no new store" accepted as the                             GATE
                                                           storage model?


 3      Network ingress                                    Is public MCP ingress from Anthropic's cloud permitted, or must we                        GATE
                                                           IP-allowlist Anthropic's addresses?

 4      Write model                                        Automatic write-back, or curated promotion? Likely cannot be fully                        DECISION
                                                           automatic at Accenture.


 5      Claude org Owner                                   Who holds it?                                                                             DECISION




     ON "COVERED UNDER OUR AGREEMENT"

     An Azure enterprise agreement covers the commercial right to use Azure. It does not by itself authorize placing a
     given client's data into a given service — that is governed by per-client MSAs / DPAs, residency obligations, and
     data-classification policy, which operate on a different axis.

     "We already store this in SharePoint" does not transitively approve a new copy elsewhere. This is precisely why
     the no-new-store approach matters.



08        Phased rollout                                                                                                                       SEQUENCE TO DE-RISK




               P0                                P1                                    P2                                   P3                              P4




           Close gates                   Read-only slice                       Custom server                      Curated write-back                 Skills + scale
            GO / NO-GO                     RISK · LOWEST                          RISK · LOW                          RISK · MEDIUM                   RISK · MEDIUM

                                         M365 connector live                Container Apps + Entra ID             Partitioned + provenance           API Center catalog




        SEQUENCE PRINCIPLE
        De-risk before speed — value ships at P1 with zero new storage; risk rises only as write capability is added under guardrails.


FIG. 3 — PHASE 0 IS A REAL GATE. READ VALUE LANDS FIRST; WRITE CAPABILITY FOLLOWS ONLY BEHIND PARTITIONING AND A CURATION
GATE.


09        Two cross-cutting guardrails                                                                                                             FROM PHASE 3 ON




     PER-CLIENT PARTITIONING + PROVENANCE

     A shared writable pool is where cross-client leakage happens: a learning distilled from Client X material must
     never surface to Client Y-staffed people. Partition the writable SharePoint locations by client / sensitivity and tag
     every entry with provenance. The read connector already enforces per-user permissions; the write path is where
     we add this ourselves.




COMPANY BRAIN · ENTERPRISE ARCHITECTURE                                                  ACCENTURE · INTERNAL — DRAFT                                      PAGE 5 / 6
     CURATION GATE OVER AUTO-WRITE

     An auto-writing brain that is wrong once compounds that error on every later retrieval. Prefer "Claude proposes
     → human or policy promotes" before anything becomes retrievable institutional truth.


10       The architecture in one line                                                                                   ELEVATOR VERSION




     A containerized MCP server on Azure Container Apps, authenticated through Entra ID, reaching and
     writing to partitioned SharePoint via Managed Identity and Graph, with the Microsoft 365 connector
     providing per-user reads — exposed to Claude as an org-provisioned custom connector. No new store of
     client data.


Prepared as a discussion artifact. The decisions in §7 — particularly storage and ingress — and the identity items in §6 are owned by
Accenture's security architecture, client-data-protection, and platform teams, and should be closed before any build begins.




COMPANY BRAIN · ENTERPRISE ARCHITECTURE                               ACCENTURE · INTERNAL — DRAFT                              PAGE 6 / 6


## High Level Solution Intent — Company Brain

ACCELERATOR                                                          CASE STUDY 1 · THE COMPANY BRAIN




HIGH    LEVEL     SOLUTION       INTENT




The Company
Brain.
An enterprise brain accelerator on the Microsoft estate. A reusable
pattern that turns a rented model into an owned, compounding asset,
proven on Accenture's own delivery knowledge.




ARTIFACT                              ESTATE                             STATUS · 2026

High Level Solution Intent. What we   Microsoft 365, Azure, Microsoft    Prototype runs today. The Azure
will build, why, and the target       Entra ID. Claude as the harness.   enterprise translation is designed
architecture, before detailed                                            and in evaluation, not yet live.
design.




THE COMPANY BRAIN · HIGH LEVEL               ACCELERATOR BY ACCENTURE · ARCHITECTURE ARTIFACT, NOT A
SOLUTION INTENT                              VENDOR PRODUCT
THE COMPANY BRAIN · HLSI                                                                             CASE STUDY 1



01     Solution intent                                                                       EXECUTIVE SUMMARY



Accenture will build a reusable brain pattern, proven first on its own delivery and engagement
knowledge, that turns a commodity model into an owned, compounding asset. This document states
the solution at a high level: what will be built, why, and the intended target architecture, before
detailed design begins.

A capable model is necessary but not sufficient. Claude answers questions; it does not, on its own, hold a
practice's methods, reach an engagement's documents under the right person's entitlements, draft against
current policy, or leave an audit trail an enterprise will accept. Those capabilities live in the layers assembled
around the model: the knowledge, the memory, the skills, the governed data, and the per-user access. That
assembly, inside a controlled trust boundary, is the brain.

The intent is deliberately not a one-off build. It is a horizontal accelerator: a single pattern that any
engagement inherits. Proven once on Accenture's own knowledge, the same brain re-platforms onto a
client's estate with the labels changed and the shape held. The asset is the pattern, not a project. Each
engagement starts from a brain that already knows how to learn, govern, and reach systems of record safely.

  WHAT IS BEING BUILT, IN ONE LINE

  A custom MCP brain on the Microsoft estate that holds knowledge, memory, skills, governance, and per-user
  access; reached by people through Claude over a single connector; reading directly through a turnkey
  Microsoft 365 channel and acting through the brain into governed SharePoint, with no new copy of the data
  created anywhere.



  GOVERNING PRINCIPLE

  No new copy of client data. The brain reads and writes through systems that already govern the data:
  SharePoint via Microsoft Graph, in place. There is no shadow store and no shadow vector index. This is the
  decision that keeps the accelerator inside existing data governance rather than triggering a new one.



  HOW TO READ THIS DOCUMENT

  Section 02 sets the business context. Section 03 states the solution. Section 04 is the target architecture on
  the Microsoft estate. Section 05 explains how the brain learns and governs, the compounding moat. Section 06
  is the delivery approach and phasing. Section 07 covers non-functional intent. Section 08 is the assumptions,
  dependencies, gates, and risks. Section 09 is an honest status. Section 10 is the team.




THE COMPANY BRAIN · HLSI                      ACCELERATOR BY ACCENTURE                       01 / SOLUTION INTENT
THE COMPANY BRAIN · HLSI                                                                               CASE STUDY 1



02     Business context and drivers                              THE MODEL IS RENTED; THE BRAIN IS OWNED



Frontier models are becoming a commodity. Everyone can rent the same capability. The
compounding differentiator is no longer the model. It is the institution's own knowledge: its policies,
its precedents, and the lessons it has paid to learn.

A model rented from a provider is, by design, the same model a competitor rents. Its weights do not carry an
institution's methods, its won-and-lost engagements, or the reason a particular approach failed three years
ago. That knowledge is the asset. When it is captured, governed, and made retrievable, it compounds: every
engagement makes the next one start further ahead. When it stays in people's heads and scattered
documents, it leaks out the door and is re-learned at full cost each time.

The strategic move, then, is to stop treating the model as the differentiator and start treating the brain as the
asset. The model is rented; the brain is owned. The model can be swapped for a better one next year
without losing a thing, because the value lives in the layers around it, not in the weights. That separation is
the entire economic argument for building the brain.

The model, rented                      The brain, owned                       The accelerator
A commodity capability, the same for   Your knowledge, memory, skills, and    The brain built once as a pattern, then
everyone, swappable, with no           governed reach, assembled around       inherited by every engagement. The
memory of your business. Necessary,    the model. Compounds with every        asset is reusable across the practice,
but not a differentiator.              engagement. The differentiator.        not rebuilt each time.


   THE THESIS

   If the model is a commodity, then the only durable advantage is the brain you build around it.
   Accenture builds that brain once, proves it on its own delivery knowledge, and turns it into an
   accelerator every engagement inherits. The frontier model is rented. The brain is owned. The brain is
   the asset.


Why prove it on Accenture's own knowledge first
The accelerator earns its credibility by running on the hardest, most heterogeneous knowledge estate
available: Accenture's own. Practices, industries, clients, and engagements, with real scoping and real access
rules. A pattern that holds there transfers to a client estate with confidence. Proving it internally also means
the first reference is not a slideware claim; it is a system that already runs.




THE COMPANY BRAIN · HLSI                      ACCELERATOR BY ACCENTURE                       02 / BUSINESS CONTEXT
THE COMPANY BRAIN · HLSI                                                                                 CASE STUDY 1



03        Solution overview                                         THE BRAIN, THE CONNECTOR, THE DOCTRINE



The brain is a custom MCP server that holds knowledge, memory, skills, governance, and per-user
access. Each person reaches it through one connector. Claude is the harness. The whole thing runs on
one rule: read direct, act through the brain.

Concretely, the brain is a thing you build and run, not an abstraction. It is a custom MCP orchestrator that sits
between Claude and everything beneath it. It holds the scoped knowledge, the captured memory, the
foundation skills, the project context, the governance gates, and the per-user access brokering, and it
exposes all of it to Claude through a single connector. Claude provides the reasoning and the surface people
already use; the brain provides the institution.


  THE DOCTRINE · READ DIRECT, ACT THROUGH THE BRAIN

  Reads may federate directly through a turnkey, per-user-delegated connector: the Microsoft 365 connector
  for Claude, reaching SharePoint, OneDrive, Outlook, and Teams on demand, nothing cached, existing
  permissions still applied. Everything that acts goes through the brain: orchestration, writes, agents, and
  memory. This one rule is what makes the accelerator a single coherent design rather than a loose bag of
  integrations.


What the brain holds
 EL EME NT                      W HA T I T I S A N D W HY IT MAT TER S


 Knowledge                      Documents, decisions, and precedents, embedded at their true scope (personal,
                                project, client, industry, practice, company). Pointers and snippets inside the
                                governed boundary, never a shadow copy of the source.

 Memory                         Lessons captured from the work, with provenance, semantic retrieval, and
                                Ebbinghaus decay so what gets used survives and what nobody reuses settles out.

 Skills                         Validated practice and company lessons graduated into reusable, versioned skills,
                                rules, and agents in a foundation every engagement inherits.

 Governance                     The curation gate on writes, provenance tags, and the audit trail across capture,
                                promotion, and retrieval. Nothing becomes institutional truth until a human
                                promotes it.

 Per-user access                Credential brokering so each person reaches only what their entitlements already
                                allow. One connector per user; the brain acts as the user into each downstream tool.



  WHY ONE CONNECTOR PER USER, FRONTED BY THE BRAIN

  Claude connects to the brain, not to each tool server. The brain reaches the tools as an MCP client, on the
  user's behalf, with central audit on every call. That gives one authenticated surface in front of every system of
  record, per-user credential brokering that prevents confused-deputy access, and shared memory, context, and
  skills across every agent and use case. The cost is one extra hop, negligible against inference; the gain is the
  governed, compounding centre.




THE COMPANY BRAIN · HLSI                       ACCELERATOR BY ACCENTURE                       03 / SOLUTION OVERVIEW
THE COMPANY BRAIN · HLSI                                                                                                      CASE STUDY 1



04      Target architecture                                                                      HIGH LEVEL · MICROSOFT ESTATE



People reach the brain through Claude, federated with Microsoft Entra ID. The brain runs on Azure
Container Apps with a managed identity. It reads directly through the Microsoft 365 connector and
acts through Microsoft Graph into partitioned SharePoint, with data read and written in place,
governed by Entra ID and audited in Application Insights.
  Build first      Governed data, in place         Catalog at scale


                                                              People in Claude
                         THE HARNESS · MCP CLIENT · ONE CONNECTOR · FEDERATED WITH ENTRA ID

     MICROSOFT ENTRA ID · TRUST BOUNDARY


                        The Brain · custom MCP orchestrator                                        M365 connector                   READ

          AZURE CONTAINER APPS · MANAGED IDENTITY · KNOWLEDGE ·                                    turnkey read channel · per-user
                                                                                                   delegated · on-demand · no cache · DLP
                MEMORY · SKILLS · GOVERNANCE · PER-USER ACCESS                                     applies


                TOOLS: THE BRAIN INVOKES THESE AS AN MCP CLIENT, PER USER, WITH CENTRAL AUDIT


                                                 Principal tool · the governed estate

                                         Microsoft Graph                                 SharePoint write path
                        DELEGATED READS + MANAGED-IDENTITY WRITES                  CURATED · PROPOSE THEN PROMOTE



                                        EXTENSIBLE TOOL MCPS · PROVEN IN THE PROTOTYPE

                                             Salesforce sObject         Jira       + more, per user



                        GOVERNED DATA FOUNDATION · READ AND WRITTEN IN PLACE, NO NEW COPY


                 SharePoint via Graph                                 IN PLACE        Application Insights
                 governed store · partitioned by client and sensitivity · no new      audit + observability on every call
                 copy


                                         Azure API Center                                       SCALE

                                         versioned skills and tool catalog · added when the estate
                                         grows



FIG. 1. THE TARGET TOPOLOGY ON THE MICROSOFT ESTATE. READS FEDERATE DIRECTLY THROUGH THE M365
CONNECTOR BESIDE THE BRAIN; EVERYTHING THAT ACTS PASSES THROUGH THE BRAIN, WHICH INVOKES GRAPH AND
SHAREPOINT AS ITS PRINCIPAL TOOL PLUS EXTENSIBLE TOOL MCPS, PER USER, INTO PARTITIONED SHAREPOINT.
THE TRUST BOUNDARY IS MICROSOFT ENTRA ID; EVERY CALL IS AUDITED IN APPLICATION INSIGHTS.



  THE TRUST BOUNDARY

  Everything inside the dashed line sits within the Microsoft Entra ID trust boundary. Claude sign-in is federated
  with Entra ID. The M365 connector uses per-user delegated permissions, so a person only ever reaches what
  they already can, with data loss prevention still applied. The brain authenticates with a managed identity, not
  stored secrets, and holds least-privilege Graph scopes. The data store is never duplicated; SharePoint stays
  the system of record, read and written in place.




THE COMPANY BRAIN · HLSI                                ACCELERATOR BY ACCENTURE                                 04 / TARGET ARCHITECTURE
THE COMPANY BRAIN · HLSI                                                                                       CASE STUDY 1



04        One request, end to end                                                    WHAT HAPPENS ON A SINGLE CALL



The topology resolves into a single, auditable path. A person asks a question in Claude; the brain
retrieves in scope, acts as the user into the governed tools, and returns an answer that is grounded
and traceable, with the data never leaving its boundary.

 1     The person asks, in Claude. They use the surface they already have. Sign-in is federated with Entra ID, so
                                                                                                                      ENTRA ID
       the request carries a known identity and a known access set.

 2     Claude reaches the brain over one connector. Not the individual tool servers. The brain is the single
                                                                                                                ONE CONNECTOR
       authenticated surface for everything that acts.


 3     The brain retrieves in scope. It matches knowledge and lessons by meaning, with the caller's
                                                                                                               SEMANTIC INDEX
       access set applied before candidate selection, so retrieval is permission-correct by construction.

 4     The brain invokes the tools, as the user. Direct reads federate through the M365 connector; anything
                                                                                                                 M365 · GRAPH
       that acts goes through the brain into Microsoft Graph, with per-user credential brokering.

 5     The data is read and written in place. SharePoint stays the system of record. Writes are curated,
                                                                                                                    SHAREPOINT
       proposed then promoted; nothing is copied to a shadow store.

 6     The answer returns, governed and logged. The response is grounded in retrieved sources, and the
                                                                                                                 APP INSIGHTS
       whole path, capture, retrieval, and any write, is recorded in Application Insights for audit.


     THE LINE A SECURITY REVIEWER CARES ABOUT

     The scope filter runs before candidates are selected from the index, not as a post-filter on results. A caller
     cannot retrieve, rank, or even see an item outside their access set, because items outside it are never
     candidates in the first place. The brain acts as the user into each tool, so downstream systems see the
     person's own entitlements, never a broad service account. Permission-correctness is a property of how the
     path is built, not a check bolted on afterward.




THE COMPANY BRAIN · HLSI                       ACCELERATOR BY ACCENTURE                      04 / ONE REQUEST, END TO END
THE COMPANY BRAIN · HLSI                                                                                  CASE STUDY 1



05     How it learns and governs                                                                 THE COMPOUNDING MOAT



The brain compounds through three mechanisms working as one governed loop: memory that is
scoped and provenance-tagged, learning where reuse is the signal, and skill promotion through a
human curation gate into a versioned foundation. Engagement N+1 starts with everything
engagements 1 through N proved.

Memory · scoped, semantic, provenance, decay

Scoped and semantic     Every lesson and document is embedded at its true scope, from personal up to company, and
                        retrieved by meaning rather than keyword, so a related precedent surfaces even when the
                        wording differs. The index holds pointers and snippets inside the governed boundary, never a
                        shadow copy.

Provenance              Every item carries provenance tags, so any retrieved fact traces back to where it came from and
                        why it is trusted. Promoted copies keep lineage to their origin.

Ebbinghaus decay        Unused, unpromoted memories are archived on a decay curve, never silently deleted. What the
                        institution actually relies on stays sharp; what nobody touches settles out, so the memory does
                        not bloat into noise.

Reuse is the signal     Every retrieval that gets used bumps the source's reuse count. Reuse drives ranking, protects
                        proven knowledge against decay, and makes an item eligible for promotion. The institution's
                        behaviour, not a curator's guess, decides what matters.


Skill promotion · propose, human gate, graduate

                               Foundation catalog · versioned skills, rules, agents
                      EVERY ENGAGEMENT INHERITS THIS · CATALOGED IN AZURE API CENTER



                        Validated practice or company lessons become reusable, versioned skills,
  GRADUATE              rules, or agents in the foundation, cataloged in API Center. This is the apex:    HUMAN GATE
                        proven knowledge turns into capability every future engagement starts with.


                           Lessons that hold across clients graduate to the practice, then the company.
  PRACTICE / COMPANY       Each cross-scope move is reviewed by a person; promoted copies keep            HUMAN GATE
                           lineage.


                         Lessons proven on one engagement promote to the client or industry scope
  CLIENT / INDUSTRY                                                                                       HUMAN GATE
                         when they generalise.


                        Capture happens here. People and agents record lessons at the lowest true scope. Reuse can
  PROJECT
                        auto-suggest a promotion, never auto-approve it.

FIG. 2. THE PROMOTION LADDER. LESSONS ARE CAPTURED AT THE PROJECT SCOPE AND GRADUATE UPWARD ONLY
THROUGH A HUMAN CURATION GATE AT EVERY RUNG, THEN GRADUATE INTO THE FOUNDATION CATALOG AS VERSIONED
SKILLS, CATALOGED IN AZURE API CENTER. THIS IS THE COMPOUNDING MOAT: THE BRAIN GETS MEASURABLY
BETTER EVERY ENGAGEMENT.



  WHY A LEARNING SYSTEM IS SAFE TO TRUST

  Every cross-scope promotion is reviewed by a person. Every item carries provenance. Retrieval is permission-
THEcorrect
    COMPANYby BRAIN
              construction.
                    · HLSI The audit trail ACCELERATOR
                                           covers all three
                                                         BY moments
                                                            ACCENTUREthat matter: capture, promotion,
                                                                                     05 / HOW         andAND GOVERNS
                                                                                              IT LEARNS

  retrieval. A learning system is safe precisely because learning is governed, not automatic. That governed loop
  is the moat: it cannot be rented, only built.
THE COMPANY BRAIN · HLSI                                                                                 CASE STUDY 1



06      Delivery approach and phasing                              P1 READS · P2 BRAIN · P3 ACT · P4 SCALE



Four phases, each reusing the one before it. Start with turnkey reads and zero new storage. Stand the
brain up. Route everything that acts through it. Then scale the plumbing. Nothing built earlier is
thrown away.

 P1                              P2                           P3                           P4
 Turnkey reads                   Stand up the brain           Act through the brain        Scale
     Microsoft 365 connector       Brain on Azure Container     Curated write-back via       Versioned skills library
     for Claude                    Apps                         Graph to SharePoint          matures
     Zero new storage, read-       Entra ID auth, managed       Propose then promote;        Azure API Center catalog
     only, day one                 identity                     provenance kept              More tool MCPs, per user
     Per-user delegated,           One connector per user,      Cross-scope leakage          New capability is
     nothing cached                central audit                controls                     configuration, not a fork
     Existing permissions and      Knowledge, memory, and       Agents brokered per user
     DLP apply                     skills land                  Shared context and
     Immediate value, no build     Least-privilege Graph        governance reused
     risk                          scopes

FIG. 3. THE FOUR-PHASE DELIVERY. P1 READS THROUGH A TURNKEY CONNECTOR WITH ZERO NEW STORAGE. P2
STANDS THE BRAIN UP ON CONTAINER APPS UNDER ENTRA ID AND MANAGED IDENTITY. P3 ROUTES EVERYTHING THAT
ACTS THROUGH IT, WITH CURATED WRITE-BACK AND LEAKAGE CONTROLS. P4 SCALES THE SKILLS LIBRARY AND THE
API CENTER CATALOG. EACH PHASE REUSES THE ONE BEFORE IT.



  WHY THIS DE-RISKS THE BUILD

  P1 delivers value on day one with no new storage and no new data governance review, because it only reads
  through a connector the estate already trusts. The brain in P2 is a re-platforming of a system that already runs
  as a prototype, not a greenfield design. Write-back in P3 is the only place new risk is introduced, so it is the
  only place that gets the curation gate. The accelerator never asks the institution to take a large step before a
  small one has proven out.



  REUSABLE BY CONSTRUCTION

  These four phases are the accelerator. A new engagement does not re-invent them; it inherits them. P1 and P2
  are largely the same on any Microsoft estate; P3 and P4 add the engagement's own tools and skills. The
  pattern is the deliverable. The project is just an instance of it.




THE COMPANY BRAIN · HLSI                         ACCELERATOR BY ACCENTURE                       06 / DELIVERY APPROACH
THE COMPANY BRAIN · HLSI                                                                                          CASE STUDY 1



07      Non-functional intent                              IDENTITY · RESIDENCY · GOVERNANCE · OBSERVABILITY



The qualities the brain must hold, stated as intent ahead of detailed design. They are not bolt-ons;
each maps to a specific Microsoft primitive and to the no-new-copy principle.

  IDENTITY AND SSO                                                 LEAST PRIVILEGE

  Federated, with MFA and conditional access                       Managed identity, least Graph scopes
  Claude sign-in is federated with Microsoft Entra ID by           The brain authenticates with an Azure managed identity
  SAML or SSO, with multi-factor authentication and                rather than stored secrets, and holds the minimum
  conditional access policies enforced. Every request              Microsoft Graph scopes needed. The M365 connector
  carries a known identity and access set. No separate             uses per-user delegated permissions only. The brain acts
  identity store.                                                  as the user, never a broad service account.



  DATA RESIDENCY                                                   GOVERNANCE

  No new copy, SharePoint in place                                 Curation gate and provenance
  Data is read and written in place through Graph.                 Writes pass a curation gate: propose, then a human or
  SharePoint stays the governed system of record,                  policy promotes. Every item carries provenance tags.
  partitioned by client and sensitivity. There is no shadow        Nothing the brain produces becomes retrievable
  store and no shadow vector index, so residency is                institutional truth until it is promoted. An error written
  whatever the estate already enforces.                            once cannot compound on later retrievals.



  OBSERVABILITY                                                    SCALABILITY

  Application Insights on every call                               Managed runtime, catalog at scale
  Capture, retrieval, and write are logged in Application          Azure Container Apps provides a managed, horizontally
  Insights, so any output can be traced to its inputs and its      scaling runtime for the brain. Azure API Center catalogs
  reasoning. The audit trail is a first-class output of the        versioned skills and tools as the estate grows. New
  architecture, not an afterthought.                               capability is configuration over the registry, not a new
                                                                   build.



  THE PRINCIPLE THAT TIES THEM TOGETHER

  Every non-functional quality above is downstream of one decision: no new copy of client data. Identity,
  residency, and governance stay simple because the brain never becomes a new place where data lives. It
  reaches the systems that already govern the data and acts inside their controls. That is what keeps an
  institutional brain inside existing governance rather than triggering a new review.




THE COMPANY BRAIN · HLSI                          ACCELERATOR BY ACCENTURE                       07 / NON-FUNCTIONAL INTENT
THE COMPANY BRAIN · HLSI                                                                                 CASE STUDY 1



08     Assumptions, dependencies, gates, risks                                              SEVEN GATES TO CLOSE



A small set of gates, owned by the institution's security and platform teams, should be closed before
any build begins. They are decisions to settle, not formalities. Stated honestly, including where the
answer is the conservative path.
 #   GA TE                         D EC I SI ON TO R ESO LVE


 1   Data classification           What classification will the brain hold? Confidential material dominates every
                                   other decision and sets the bar for everything below.

 2   Storage model                 Is reuse SharePoint, no new store accepted as the storage model? This is the
                                   principle that keeps the work inside existing data governance rather than
                                   triggering a new review.

 3   Network ingress               Is the model-to-tool ingress path permitted as configured (public plus allowlist),
                                   or must transport be private first?

 4   Write model                   Is curated promotion, not automatic write-back, accepted as the write model?
                                   Propose then promote is the safe default.

 5   Cross-client leakage          Are the partitioning and scope controls sufficient to prevent one client's
                                   knowledge surfacing in another's context?

 6   Cost exposure                 Are spend caps and budget controls in place on inference and runtime, so cost
                                   cannot run away unobserved?

 7   Claude org Owner              Who is the named Owner of the Claude organisation, accountable for its
                                   configuration and access?



  ON THE CLOUD AGREEMENT, STATED PLAINLY

  An enterprise cloud agreement covers the right to use the cloud. It does not by itself authorize placing a given
  client's data into a given service. That is governed on a separate axis, by per-client agreements, data
  protection terms, and classification policy. No new store is the safe path precisely because it avoids creating a
  new copy of client data that would trigger that separate review.



  DEPENDENCIES AND ASSUMPTIONS

  The accelerator assumes an existing Microsoft estate with Entra ID, SharePoint, and Microsoft Graph; a Claude
  organisation with an identified Owner; and a sanctioned Azure landing-zone process through which the brain's
  compute is provisioned with an approval trail. It assumes SharePoint remains the system of record and is not
  duplicated. The internal portals and steps of provisioning are out of scope for this artifact; what matters at the
  pattern level is that compute arrives through a governed, audited path rather than a self-managed box.




THE COMPANY BRAIN · HLSI                       ACCELERATOR BY ACCENTURE                          08 / GATES AND RISKS
THE COMPANY BRAIN · HLSI                                                                                          CASE STUDY 1



09       Status and next step                                           HONEST · PROTOTYPE RUNS, AZURE DESIGNED



Stated honestly. A working prototype of the brain runs today. The Microsoft and Azure enterprise
translation is designed and in evaluation. It is not yet live. The recommended next step is a scoped
pilot.

   RUNS TODAY                                                        DESIGNED, IN EVALUATION

   The working prototype                                             The Azure translation
   The brain runs now as a working prototype on a single             The Microsoft and Azure enterprise architecture in this
   self-managed server: the portal plus a Claude Cowork              document, Entra ID, the brain on Container Apps,
   loop. It holds scoped knowledge, projects, and memory             SharePoint via Graph, Application Insights, API Center, is
   under human-gated promotion, with per-user access                 designed and in evaluation. It is a re-platforming of the
   brokering, reached through one connector. The                     running prototype, not a greenfield build. It is not yet
   screenshots on the next page are its real surfaces.               live, and nothing in this artifact claims Azure is running.




The engagement view, running today. Scoped knowledge,              The learning loop in action. A lesson is captured to the
projects, and a timeline under the brain, reached through Claude   engagement scope, searchable there, promotable to the wider
over one connector.                                                practice after reuse and review.
REAL SURFACES OF THE RUNNING PROTOTYPE, CAPTURED IN CLAUDE COWORK. THIS IS THE ONLY EVIDENCE THIS
DOCUMENT CLAIMS; THE AZURE TOPOLOGY IN SECTION 04 IS DESIGNED AND IN EVALUATION, NOT YET LIVE.



   THE NEXT STEP

   A scoped pilot. Stand the brain up on the Microsoft estate against one practice's knowledge, P1 reads then P2
   brain, with the seven gates closed first. Prove the loop, the governance, and the per-user access on real
   knowledge, then grow the skills library and add tools. The accelerator is built to start small and compound; the
   pilot is the smallest honest first step.




THE COMPANY BRAIN · HLSI                          ACCELERATOR BY ACCENTURE                         09 / STATUS AND NEXT STEP
THE COMPANY BRAIN · HLSI                                                                           CASE STUDY 1



10     The team                                                  ARCHITECTURE · ENGINEERING · DELIVERY



The accelerator is an Accenture asset. It is a pattern any engagement inherits, not a one-off proposal.
The people below own its architecture and its delivery, and are the contacts for a scoped pilot.


                Fabian Goetzens                                          Noland Smith
                ARCHITECTURE & PRODUCT                                   ENGINEERING & DELIVERY

                fabian.goetzens@accenture.com                            noland.smith@accenture.com




   IN CLOSING

   The model is rented; the brain is owned. The Company Brain is the accelerator that turns that
   distinction into an asset: a reusable pattern, proven on Accenture's own knowledge, that any
   engagement inherits. It is built to start narrow, prove out on real work, and compound, one governed
   loop, one promoted skill, one connection at a time. That loop is the brain. The brain is the
   differentiator.



A note on this artifact
This is a High Level Solution Intent: a statement of what will be built, why, and the intended target
architecture, before detailed design. It is a pattern and one Microsoft instantiation of it, not a commitment to
a specific implementation. The gates in Section 08, particularly data classification, storage model, and
network ingress, are owned by the institution's security architecture, data-protection, and platform teams,
and should be closed before any build begins. The prototype runs; the Azure translation is designed and in
evaluation, not yet live.




THE COMPANY BRAIN · HLSI                         ACCELERATOR BY ACCENTURE                          10 / THE TEAM
