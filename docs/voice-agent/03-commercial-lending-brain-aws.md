# Commercial Lending Brain on AWS — High Level Solution Intent

ACCELERATOR · BANKING                                                                          CASE STUDY 2




HIGH    LEVEL     SOLUTION         INTENT




Commercial Credit
Management.
An end-to-end commercial credit brain on AWS. Flagship client: a large regulated US lender.
Proven there, it becomes a reusable Accenture asset for every other lender.




SUBJECT                              ESTATE                              STATUS

The intended target architecture     Amazon Bedrock, AgentCore,          Solution intent. Two MCP servers
and approach for a regulated         Snowflake and Cortex, Bedrock       built and running; the full topology
commercial credit brain, before      Guardrails. Roughly 30,000 users.   is the proposed build.
detailed design




HIGH LEVEL SOLUTION INTENT · COMMERCIAL CREDIT MANAGEMENT                 2026 · ACCELERATOR BY ACCENTURE
HLSI · COMMERCIAL CREDIT MANAGEMENT                                                                     CASE STUDY 2



01     Solution intent                                                                         EXECUTIVE SUMMARY



Accenture builds one brain across the entire commercial credit lifecycle, not a point tool for a single
task. a flagship lender is the lighthouse client. Proven on a flagship lender's estate, the same brain becomes a reusable
Accenture asset that every other lender can adopt.

The intent is deliberately broad. The brain spans the whole of commercial credit, from origination through
spreading, rating, underwriting, approval, documentation, servicing, monitoring, and workout, with one
governed orchestrator beneath every function rather than a separate tool bolted onto each. It is built for a
regulated lender from the first line: roughly 30,000 users, per-user entitlements, a complete audit trail, and
policy checks on every decision the model touches.

The approach is to start narrow and grow agent by agent. The first agent, the credit memo, is already built
and running. It earns its place by being useful on day one and by proving the substrate everything else
reuses. Each subsequent agent, beginning with Early Warning monitoring, costs a fraction of the first,
because it inherits the same data foundation, the same guardrails, and the same governed connections. One
narrow win compounds into a full commercial credit brain.

That is what makes this an asset, not a one-off. The lifecycle, the ontology, the governance pattern, and the
credit memo agent itself are not bank-specific accidents; they are the shape of commercial lending at any
bank. the bank is where the pattern is proven and hardened. After that, the work to stand it up at the next lender
is configuration over a known asset, not a new build.

  THE ASSET THESIS

  This document describes the brain as it is intended for the flagship lender. The same brain, with the same lifecycle spine
  and governance, is the reusable Accenture banking asset. Flagship first, then repeatable. the flagship lender gets a credit
  brain built to its estate; Accenture gets reusable commercial-credit IP it can take to the next regulated lender.



  HOW TO READ THIS DOCUMENT

  Section 02 sets the business context. Section 03 states the brain pattern. Section 04 is the target AWS
  architecture, with the topology and the credit lifecycle. Section 05 covers the two use cases. Section 06 is how
  the brain learns and governs itself. Section 07 is the delivery approach and phasing. Section 08 is the non-
  functional intent. Section 09 is assumptions, dependencies, and risks. Section 10 is the honest status and the
  next step. Section 11 is the team.




ACCELERATOR BY ACCENTURE. ARCHITECTURE ARTIFACT, NOT A VENDOR PRODUCT.                           01 / SOLUTION INTENT
HLSI · COMMERCIAL CREDIT MANAGEMENT                                                                  CASE STUDY 2



02     Business context and drivers                             THE MODEL IS RENTED; THE BRAIN IS OWNED



Frontier models are becoming a commodity. Every lender can rent the same capable model. The
compounding differentiator is the institution's own credit knowledge: its lending policy, its precedent,
and the lessons it captures on every decision. The model is rented. The brain is owned.

A capable model is necessary but not sufficient. Claude answers questions; it does not, on its own, hold a
bank's covenant ontology, reach its systems of record under the right officer's entitlements, draft a credit
memo against current lending policy, or leave an audit trail a regulator will accept. Those capabilities live in
the layers assembled around the model. That assembly, inside a controlled trust boundary, is the brain, and it
is the part a competitor cannot rent.

Why this matters now, for a commercial lender
Commercial credit decisions are slow, knowledge-intensive, and unevenly captured. A seasoned credit officer
carries precedent in their head; when they retire, it leaves with them. Spreading, rating, and memo drafting
consume senior time that could go to judgment. And every regulator expects the institution to show, for any
decision, exactly what informed it. A brain addresses all three at once: it puts the institution's accumulated
knowledge in front of every officer, it does the assembly work so people spend their time deciding, and it
leaves a complete, auditable trail of why.


   THE DRIVERS, STATED PLAINLY

   Speed and consistency in credit decisions. Capture of institutional knowledge so it compounds instead
   of walking out the door. A defensible audit trail on every decision a regulator can inspect. And a
   foundation that grows cheaper per use case as it spans the lifecycle. The bank that owns its brain
   compounds an advantage no rented model can level.


The strategic consequence follows directly. If the model is a commodity and the brain is the moat, then the
institution should invest in the brain: the tools, the skills, the ontology, the governed data, and the learning
loop that makes every decision sharpen the next. That is the work this solution intent describes.




ACCELERATOR BY ACCENTURE. ARCHITECTURE ARTIFACT, NOT A VENDOR PRODUCT.                       02 / BUSINESS CONTEXT
HLSI · COMMERCIAL CREDIT MANAGEMENT                                                                   CASE STUDY 2



03     Solution overview                                               READ DIRECT, ACT THROUGH THE BRAIN



The brain is a custom MCP server that holds the bank's knowledge, memory, skills, governance, and
per-user access. Each officer connects to it through one connector. Claude Cowork is the harness.
The doctrine is simple: read direct, act through the brain. Start narrow with the credit memo, proven,
and grow agent by agent along the lifecycle.

The brain is not an abstraction. It is software you build and run: a custom MCP orchestrator that sits between
Claude and every system of record beneath it. It holds the skills, the memory, the project context, the
governance gates, and the per-user access, and it exposes all of it to Claude through a single connector.
Claude connects to the brain, not to the individual tool servers. The brain reaches each tool server as an MCP
client, on the user's behalf, so one audited surface fronts every system of record.


  THE DOCTRINE · READ DIRECT, ACT THROUGH THE BRAIN

  Reads may federate directly through turnkey, per-user-delegated connectors: managed MCP servers
  reaching Snowflake and nCino under the officer's own entitlements. Everything that acts goes through the
  brain: orchestration, writes, agents, and memory. The read path inherits existing permissions and adds no new
  risk. The write path is where new risk enters, so the write path is the path that gets the brain, the audit, and
  the gate.


Why the brain hop wins for a regulated lender
Routing through the brain buys four things a direct-to-tool design cannot: one connector and one
authentication per user; central audit and governance on every tool call; per-user credential brokering, so the
brain acts as the user and never as a more-privileged deputy; and shared memory, context, and skills across
every agent and use case. The cost is a single additional hop, negligible against inference, and the brain
becomes critical infrastructure that the managed runtime keeps highly available.


  START NARROW, GROW ALONG THE LIFECYCLE

  The first agent assembles a commercial credit memo with a human in the loop. It is built and running today.
  Once that foundation exists, each new agent reuses the same data foundation, guardrails, and governed
  connections, so the second and twentieth agents are cheap. Early Warning monitoring is next. Over time the
  same brain grows to span roughly 25 systems of record mapped to lending domains. Expansion is
  configuration over an agent registry, not a new build each time.




ACCELERATOR BY ACCENTURE. ARCHITECTURE ARTIFACT, NOT A VENDOR PRODUCT.                       03 / SOLUTION OVERVIEW
HLSI · COMMERCIAL CREDIT MANAGEMENT                                                                                                CASE STUDY 2



04       Target architecture: the AWS estate                                                                        HIGH LEVEL TOPOLOGY



Officers work in Claude Cowork. Cowork connects to the brain through one connector. The brain,
hosted in AgentCore Runtime, orchestrates the hosted and managed tool MCPs over Snowflake as the
governed foundation, with Claude served by Bedrock and governed by Bedrock Guardrails. All inside
the the bank's AWS account.
  Build now         Future state        R1 / scale growth path


                                                      Commercial RM · Credit Officer
                                           ~30,000 USERS · CLAUDE COWORK, ONE CONNECTOR


     AWS    THE BANK'S AWS ACCOUNT · IAM / IDENTITY CENTER


                                                  The Brain · custom MCP orchestrator
           AGENTCORE RUNTIME · KNOWLEDGE · MEMORY · SKILLS · GOVERNANCE · PER-USER ACCESS · CENTRAL
                                                                         AUDIT



                       Amazon Bedrock                              NOW         Bedrock Guardrails                       NOW

                       serves Claude · in-account, no-train                    grounding · PII · denied topics · Automated
                                                                               Reasoning



                               TOOLS: THE BRAIN INVOKES THESE AS AN MCP CLIENT, PER USER

                                           We host these. AgentCore Runtime · images in ECR

                                      Boom MCP                       Experience MCP                    AFS MCP
                                   SPREAD · RATIOS            COVENANT · MEMO · WRITEBACK             SERVICING
                                         Built                               Built




                                                   Managed. We connect, we do not host

                                   Salesforce sObject MCP                            Snowflake MCP
                                    NCINO READS / WRITES                 IRIS · DECISION LEDGER · ANALYTICS



     AgentCore Gateway                     R1         AgentCore Identity                     R1       Headless agents                      R1

     under the brain · transport fan-out to           act-as-user passthrough                         scheduled / batch · through the brain
     ~25 systems



                                                          SECURE DATA FOUNDATION


                     Snowflake                                     NOW         Snowflake Cortex Search                       NOW

                     spread · IRIS ratings · decision ledger · audit ·         hybrid vector + keyword RAG · policy &
                     semantic layer                                            precedent · no shadow index


     Amazon Neptune                   FUTURE          Amazon S3                         FUTURE        AgentCore Observability          FUTURE

     knowledge graph · entity resolution              raw document landing zone                       CloudWatch / OpenTelemetry audit



     SYSTEMS OF RECORD. THE BRAIN REACHES THEM THROUGH THE MCP SERVERS · OVER TIME, ROUGHLY 25 SYSTEMS
                                                               MAPPED TO DOMAINS

     nCino (Salesforce)        Snowflake / IRIS          Boom spread API             AFS servicing     CapIQ / IBIS          + 20 more (future)


FIG. 1. THE TARGET SHAPE, INSIDE THE THE BANK'S AWS ACCOUNT. COWORK REACHES THE BRAIN THROUGH ONE
CONNECTOR; THE BRAIN INVOKES EVERY TOOL MCP PER USER WITH CENTRAL AUDIT. TWO MCP SERVERS, BOOM AND
THE MEMO (EXPERIENCE) SERVER, ARE BUILT AND RUNNING. AGENTCORE GATEWAY, IDENTITY, AND HEADLESS
ACCELERATOR BY ACCENTURE. ARCHITECTURE ARTIFACT, NOT A VENDOR PRODUCT.         04 / TARGET ARCHITECTURE
AGENTS ARE THE R1 AND SCALE GROWTH PATH, ADDED BENEATH THE SAME BRAIN, NEVER A COMPETING DESIGN.
HLSI · COMMERCIAL CREDIT MANAGEMENT                                                                               CASE STUDY 2



04        The credit lifecycle, one brain                                             SPINE · BUILT / NEXT / ROADMAP

          beneath it
The brain spans the whole commercial credit lifecycle. Each stage is a system of record today; each
becomes an agent on the same brain over time. The honest state is marked at every stage: two stages
are built, one is next, the rest are on the roadmap.


     Originate     Spread         Rate       Underwrite      Approve     Document &      Service        Monitor      Review &
     FACILITY     BOOM MCP        IRIS       CREDIT MEMO     CREDIT         Close          AFS          EARLY        Workout
                                                 MCP        COMMITTEE       NCINO                      WARNING       WORKOUT
     ROADMAP        BUILT        ROADMAP                                                 ROADMAP
                                              FLAGSHIP ·     ROADMAP       ROADMAP                       NEXT         ROADMAP
                                                BUILT




                                           The Brain · one governed orchestrator
                            KNOWLEDGE · MEMORY · SKILLS · GOVERNANCE, SHARED BY EVERY STAGE


FIG. 2. THE COMMERCIAL CREDIT LIFECYCLE, WITH ONE BRAIN BENEATH EVERY STAGE. SPREAD (BOOM MCP) AND
UNDERWRITE (THE CREDIT MEMO MCP, THE FLAGSHIP AGENT) ARE BUILT AND RUNNING. MONITOR (EARLY WARNING)
IS THE NEXT AGENT. THE REMAINING STAGES ARE THE ROADMAP, EACH A SYSTEM OF RECORD TODAY THAT BECOMES
AN AGENT ON THE SAME BRAIN OVER TIME.


What happens on one request
The topology resolves into one repeatable path. An officer asks for a credit memo in Cowork; the brain
assembles it as the user, grounded against the institution's own policy and precedent, governed and audited
end to end.

 1      The officer asks in Cowork. A request to draft or update a credit memo for a borrower.     COWORK · MCP CLIENT



 2      Cowork connects to the brain through one connector. The brain authenticates the officer and adopts their access set
        for the whole request. IAM / IDENTITY CENTER

 3      The brain retrieves context in-boundary: borrower history, lending policy, and lessons from prior memos, via
        Snowflake Cortex Search, no copy leaving the account. SNOWFLAKE · CORTEX


 4      The brain calls the tools as the user: Boom for spreads and ratios, the memo server for covenant grade and section
        drafting, Snowflake and nCino for facility and ledger data. BOOM · MEMO · NCINO


 5      Bedrock serves Claude; Guardrails govern the call: contextual grounding, PII, denied topics, and Automated
        Reasoning against encoded lending policy. BEDROCK GUARDRAILS

 6      The officer reviews and decides. The draft routes through human approval; nothing is final until a credit officer signs
        off, and every step is audited. HUMAN-IN-THE-LOOP




ACCELERATOR BY ACCENTURE. ARCHITECTURE ARTIFACT, NOT A VENDOR PRODUCT.                                  04 / CREDIT LIFECYCLE
HLSI · COMMERCIAL CREDIT MANAGEMENT                                                                            CASE STUDY 2



05     Use cases                                                                      CREDIT MEMO · EARLY WARNING



Two agents on one brain. The first builds the foundation with a human in the loop; the second runs on
top of it, headless, for a fraction of the cost. Both share the same brain substrate.

  UC1 · MVP · BUILT                                             UC2 · R1 · NEXT

  Credit Memo                                                   Early Warning
  A long-running agent assembles a commercial credit            Monitoring agents watch portfolio signals: covenant
  memo. It pulls borrower financials and spreads, facility      breaches, financial deterioration, market and news
  and covenant data, and supporting context from                events. They run scheduled and event-driven, headless,
  Snowflake, drafts the sections of the memo, and routes        with no user at the keyboard, and surface risk indicators
  them through human review and approval.                       and alerts to the relevant officers.

  The brain wraps each call with context retrieved at           Early Warning runs on AgentCore Runtime as scheduled
  drafting time, the borrower's history, current lending        and headless agents on the same brain. It reuses the
  policy, and lessons captured from prior memos, so the         data foundation, the retrieval, and the guardrails the
  draft is grounded in what the institution already knows.      credit memo built, so the agent is mostly new
  The output routes through human approval before               monitoring behaviour over an existing substrate.
  anything is final. Every memo makes the next one
                                                                Controls.
  better: lessons captured on this engagement promote
  into the memory the next draft retrieves from.                   Scheduled and event-driven headless runs
                                                                   Full auditability of why an alert fired
  Controls.
                                                                   The same grounding and policy checks as UC1
     Contextual grounding so claims trace to source data           Alerts routed, not actioned automatically
     PII filtering on every model call
                                                                Every alert carries its reasoning trail, so a reviewer can
     Automated Reasoning against encoded lending policy
                                                                see exactly which signal triggered it and why.
     Human approval gates before anything is final

  The agent drafts; a credit officer decides. The output is a
  starting point that is faster to review, never an
  unreviewed decision.




  SHARED SUBSTRATE

  UC2 is cheaper because UC1 built the foundation. The Snowflake data foundation, the Cortex retrieval, the
  guardrails, the governed connections to nCino and the lending systems, and the audit trail are all in place once
  the credit memo agent ships. Early Warning adds monitoring logic and scheduling on top. The second use case
  is mostly new agent behaviour over an existing brain, which is the entire economic argument for the asset.




ACCELERATOR BY ACCENTURE. ARCHITECTURE ARTIFACT, NOT A VENDOR PRODUCT.                                         05 / USE CASES
HLSI · COMMERCIAL CREDIT MANAGEMENT                                                                       CASE STUDY 2



06       How it learns and governs itself                               MEMORY · LEARNING · SKILL PROMOTION



The brain compounds. Every memo captures what worked; reuse is the signal that a lesson is worth
keeping; a governed gate graduates proven lessons into versioned skills and precedent. Memory lives
in the Snowflake decision ledger with provenance and decay. This loop is the moat.

Memory, learning, and the gate

Memory                  Decisions, lessons, and provenance are written to the decision ledger in Snowflake, scoped per
                        borrower, portfolio, and policy. Every item carries provenance, so any retrieved fact traces to
                        where it came from and why it is trusted. Unused, unpromoted memory decays: it is archived,
                        never silently deleted.

Learning                The brain captures what worked on each memo at the lowest true scope. Reuse is the signal:
                        every retrieval that gets used bumps the source's reuse count, which drives ranking and protects
                        proven knowledge against decay. What the institution actually relies on rises; what nobody uses
                        settles out.

Skill promotion         A captured lesson is proposed, then passes a governance gate, a human reviewer or a Bedrock
                        Guardrails and Automated Reasoning policy check, and only then graduates into a versioned skill
                        or precedent every future memo starts with. Promotion is governed, never automatic.



                               Bank-wide policy · versioned skills and precedent
                                        EVERY FUTURE MEMO INHERITS THIS



                        Validated lessons become reusable skills, rules, and precedent.
  GRADUATE              Proven knowledge turns into capability that every future credit        GUARDRAILS + AR GATE
                        decision starts with.


                        Lessons that hold across borrowers promote to the portfolio scope
  THE PORTFOLIO                                                                                HUMAN OR POLICY GATE
                        when they generalise. Promoted copies keep lineage to their origin.


                        Capture happens here. The agent and the officer record what worked at the lowest true scope.
  THIS MEMO
                        Reuse can auto-suggest a promotion, never auto-approve it.

FIG. 3. THE PROMOTION LADDER. LESSONS ARE CAPTURED ON ONE MEMO AND GRADUATE UPWARD ONLY THROUGH A
GOVERNED GATE AT EVERY RUNG, ON AWS THE BEDROCK GUARDRAILS AND AUTOMATED REASONING POLICY CHECK,
THEN GRADUATE INTO BANK-WIDE VERSIONED SKILLS. PROMOTED COPIES KEEP LINEAGE TO THEIR ORIGIN.



  THE COMPOUNDING MOAT

  Memo N+1 starts with everything memos 1 through N proved. The model is rented and identical for every
  bank; this loop is not. The institution's captured precedent, its promoted skills, and its governed memory are
  owned, and they compound with every credit decision. That is the asset a competitor cannot rent or copy.




ACCELERATOR BY ACCENTURE. ARCHITECTURE ARTIFACT, NOT A VENDOR PRODUCT.                               06 / HOW IT LEARNS
HLSI · COMMERCIAL CREDIT MANAGEMENT                                                                            CASE STUDY 2



07       Delivery approach and phasing                                             MVP DIRECT, THEN R1, THEN SCALE



One architecture across time. The brain is the constant; each phase adds reach beneath it, never a
competing design. The move from today is small: re-point the model to Bedrock and re-host three
servers into AgentCore. No rewrites, no tunnels.

 MVP                                        R1                                        Scale
 Direct, then the brain                     Scale the plumbing                        Across the estate
     Today: Cowork direct to the credit-      AgentCore Gateway under the brain         Roughly 25 systems of record
     memo MCP, the honest stepping            for many systems                          mapped to domains
     stone                                    AgentCore Identity for act-as-user        New capability is configuration over
     Re-point the model to Bedrock, in-       passthrough                               the registry
     account                                  Headless Early Warning monitoring         Neptune and S3 for the knowledge
     Re-host the three servers into           agents                                    graph and landing zone
     AgentCore Runtime                        Same brain, more reach beneath it         PrivateLink as transport hardening
     Stand the brain up in front of them,
     one connector per user
     No rewrites of the tool servers

FIG. 4. THE PHASING. MVP ROUTES THE PROVEN CREDIT MEMO THROUGH THE BRAIN ON BEDROCK AND AGENTCORE
WITH NO REWRITES. R1 ADDS THE GATEWAY, ACT-AS-USER, AND HEADLESS EARLY WARNING BENEATH THE SAME
BRAIN. SCALE EXTENDS ACROSS ROUGHLY 25 SYSTEMS, WHERE NEW CAPABILITY IS CONFIGURATION OVER THE AGENT
REGISTRY, NOT A NEW BUILD.



  THE MOVE FROM TODAY, STATED PRECISELY

  Transport is streamable HTTP over HTTPS with SigV4 or bearer auth. No tunnel. The migration is three moves:
  re-point the model to Bedrock, re-host the custom servers into AgentCore Runtime, and stand the brain up in
  front of them so Cowork connects through one connector. The tool servers themselves are not rewritten.
  AgentCore Gateway, AgentCore Identity, and headless agents are added at R1, when many tools and per-user
  act-as-user become the reason to add them, not on day one.



  WHY THE ASSET REPLICATES

  Because expansion is configuration over an agent registry, standing the brain up at the next lender is not a
  fresh build. The lifecycle spine, the ontology, the governance pattern, and the credit memo agent are reused;
  what changes is the bank's data foundation, entitlements, and policy. The flagship lender hardens the asset. Every lender
  after the flagship lender inherits it.




ACCELERATOR BY ACCENTURE. ARCHITECTURE ARTIFACT, NOT A VENDOR PRODUCT.                               07 / DELIVERY APPROACH
HLSI · COMMERCIAL CREDIT MANAGEMENT                                                                        CASE STUDY 2



08      Non-functional intent                                           IDENTITY · DATA · GOVERNANCE · SCALE



The qualities the brain must hold to run inside a regulated lender, stated at the intent level. Identity
per user, least privilege, no new copy of data, governance on every model call, full observability, and
scale to roughly 30,000 users.
 CO NCE RN                     I NT EN T


 Identity                      AWS IAM and Identity Center for authentication. The brain adopts the caller's access
 per user, act-as-user         set for the whole request and acts as the user. AgentCore Identity carries act-as-user
                               passthrough at scale, so the brain is never a more-privileged deputy.

 Least privilege               Every tool call runs under the officer's own entitlements. The brain holds no standing
                               super-privilege over the systems of record; it brokers, per user, with central audit on
                               every call.

 Data residency                No new store and no shadow vector index. Retrieval is in-boundary over Snowflake with
 no new copy                   Cortex Search. Bedrock inference runs in the bank's account with no training on the
                               bank's data. Every element sits inside the account boundary.

 Governance                    Bedrock Guardrails on every model call: contextual grounding, PII filtering, denied
 the differentiating control   topics, and Automated Reasoning against encoded lending policy, a formal, checkable
                               yes or no against the rules. This is the differentiating control for a regulated lender.

 Observability                 AgentCore Observability via CloudWatch and OpenTelemetry. Every run is traceable
                               from input to reasoning to output, so any decision can be reconstructed for a regulator.

 Scalability                   Roughly 30,000 users. AgentCore Runtime is session-isolated and long-running; agents
                               are switched on progressively from a prioritised backlog as configuration over the
                               registry.

 Transport                     Streamable HTTP over HTTPS, with SigV4 or bearer auth. No tunnel. AWS PrivateLink is
                               future hardening of the transport, not a prerequisite to start.


  THE LINE A SECURITY REVIEWER CARES ABOUT

  Retrieval is permission-correct by construction. Every query carries the caller's access set, and the scope filter
  runs before candidates are selected from the index, not as a post-filter on results. A caller cannot retrieve,
  rank, or even see an item outside their access set, because items outside it are never candidates in the first
  place. The write path, where new risk enters, is the path that gets the brain, the audit, and the curation gate.




ACCELERATOR BY ACCENTURE. ARCHITECTURE ARTIFACT, NOT A VENDOR PRODUCT.                        08 / NON-FUNCTIONAL INTENT
HLSI · COMMERCIAL CREDIT MANAGEMENT                                                                          CASE STUDY 2



09     Assumptions, dependencies, and risks                                                            STATED HONESTLY



A solution intent is only credible if it is honest about what it assumes and what it must guard against.
The constraints below are owned by the institution's security, platform, and risk teams, and should be
settled before detailed design.

Assumptions and dependencies

Bedrock in-account          Claude is served by Amazon Bedrock inside the the bank's AWS account, with no training on the
                            bank's data. This is the model-channel assumption the whole architecture rests on.

No new copy of data         The bank accepts no new store and no shadow vector index as the storage model. Retrieval
                            stays in-boundary over Snowflake and Cortex. This keeps the work inside existing data
                            governance rather than triggering a new one.

Guardrails available        The bank already runs Bedrock Guardrails. The architecture depends on grounding, PII, denied
                            topics, and Automated Reasoning being available and policy-encoded for lending.

Systems of record reachable      nCino, Snowflake and IRIS, Boom, and AFS are reachable over governed MCP transport
                                 under per-user entitlements. The ~25-system map is a future dependency, not a day-
                                 one one.

Landing zone                Compute for the brain is provisioned through the bank's sanctioned landing-zone process,
                            with an approval trail, rather than a self-managed box.


Risks and the controls that hold them

Ungrounded output           A memo could assert what the data does not support. Held by contextual grounding and
                            Automated Reasoning against lending policy, plus a human approval gate before anything is
                            final.

Curation and the gate       An error promoted into memory would compound on every later retrieval. Held by the
                            curation gate: propose, then a human or policy promotes; nothing becomes retrievable truth
                            until it passes the gate.

Versioning and evaluation     A regression in an agent, skill, or prompt could ship silently. Held by versioning of agents,
                              skills, and prompts, with evaluation gates a change must pass before it ships.

Confused deputy             The brain must never act with more privilege than the caller. Held by per-user credential
                            brokering and act-as-user passthrough, with central audit on every call.


  ON THE CLOUD AGREEMENT

  An enterprise cloud agreement covers the right to use the cloud. It does not by itself authorize placing a given
  client's data into a given service. That is governed on a separate axis, by per-client agreements, data-
  protection terms, and classification policy. No new store is the safe path precisely because it avoids creating a
  new copy of client data that would trigger that separate review.




ACCELERATOR BY ACCENTURE. ARCHITECTURE ARTIFACT, NOT A VENDOR PRODUCT.                         09 / ASSUMPTIONS AND RISKS
HLSI · COMMERCIAL CREDIT MANAGEMENT                                                                    CASE STUDY 2



10     Status and next step                                     HONEST · WHAT IS BUILT, WHAT IS PROPOSED



Stated plainly, with no overclaim. Two MCP servers are built and running today. Routing them through
the brain on the full AWS topology is the proposed build. Early Warning is the next agent. The next
step is a scoped pilot: the credit memo slice through the brain.

  BUILT AND RUNNING                      PROPOSED BUILD                          NEXT AGENT

  The Credit Memo MCP (the flagship      The full AWS topology: the brain in     Early Warning: headless,
  Underwrite agent) and the Boom         AgentCore Runtime in front of the       scheduled portfolio monitoring on
  MCP (Spread, spreads and ratios).      tool servers, served by Bedrock,        the same brain. It reuses the
  Both run today. The working demo       grounded by Cortex, governed by         foundation the credit memo built,
  has Cowork calling the credit-         Guardrails, one connector per user      so it is mostly new monitoring
  memo server directly, with no brain    with central audit. The credit-         behaviour over an existing
  in between, the honest stepping        memo server itself does not             substrate.
  stone.                                 change; the brain comes to front it.



  TODAY'S DEMO STATE, STATED HONESTLY

  The working demo has Cowork calling the credit-memo MCP directly, with no brain in between. That is the
  honest stepping stone, not the target. The target is the brain in the middle: one connector per user, the brain
  brokering every downstream call as an MCP client, and a single audited surface over all of the tool servers.
  Nothing in this document claims the full topology is live. Two servers are built; the topology is the proposed
  build.



  THE NEXT STEP

  A scoped pilot: route the credit memo slice through the brain on the the bank estate. Re-point the model to
  Bedrock, re-host the credit-memo and Boom servers into AgentCore Runtime, and stand the brain up in front
  of them so Cowork connects through one connector with central audit. This is the smallest move that proves
  the target shape end to end, and it reuses what is already built. Prove it on the memo; grow it along the
  lifecycle; replicate it as an Accenture asset for the next lender.



   THE INTENT, IN ONE LINE

   One brain across the whole commercial credit lifecycle, hosted in AgentCore Runtime, reached by
   Cowork through one connector, brokering per-user calls to MCP servers over nCino, Boom, AFS, and
   Snowflake, served by Bedrock, grounded by Cortex, governed by Bedrock Guardrails and Automated
   Reasoning, all inside the the bank's AWS account. Proven on the flagship lender, reusable for every lender. No new copy
   of client data.




ACCELERATOR BY ACCENTURE. ARCHITECTURE ARTIFACT, NOT A VENDOR PRODUCT.                     10 / STATUS AND NEXT STEP
HLSI · COMMERCIAL CREDIT MANAGEMENT                                                                          CASE STUDY 2



11      The team                                                        ARCHITECTURE · ENGINEERING · DELIVERY



The people behind this solution intent. The architecture and product direction, and the engineering
and delivery that has the credit memo and Boom servers built and running today.


                 Fabian Goetzens                                                 Noland Smith
                 ARCHITECTURE & PRODUCT                                          ENGINEERING & DELIVERY

                 fabian.goetzens@accenture.com                                   noland.smith@accenture.com



   TAKE IT FURTHER

   This is a solution intent, prepared for discussion. The natural next move is a scoped pilot on the the bank estate:
   the credit memo slice through the brain, one stack, one slice, grown along the lifecycle. The same brain,
   hardened on the flagship lender, becomes the reusable Accenture asset for the next regulated lender.



Prepared as a high level solution intent. It states, at a high level, what is intended to be built, why, and the target
architecture and approach, before detailed design. The constraints in Section 09, particularly Bedrock in-account, the no-
new-copy storage model, and the Guardrails and Automated Reasoning policy gate, are owned by the institution's security,
platform, and risk teams, and should be settled before detailed design. Two MCP servers are built and running; the full
topology is the proposed build. This document describes a pattern and its intended instantiation; it is not a commitment to a
specific implementation.




ACCELERATOR BY ACCENTURE. ARCHITECTURE ARTIFACT, NOT A VENDOR PRODUCT.                                        11 / THE TEAM
