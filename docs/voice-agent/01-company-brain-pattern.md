# The Company Brain — Enterprise Digital Brain Pattern (Microsoft/Azure)

# Banking Digital Brain — Full Content Handout

> Extracted from the Figma prototype "Banking Digital Brain" (Accenture). Organized by the 8 left-navigation sections. Diagrams are described in text. Where the prototype uses deep scroll/animated interactions, the substantive content is captured.

---

## NAVIGATION (8 sections)
1. Banking Digital Brain (Home / Overview)
2. Brain in Action
3. Banking Data Foundation
4. Banking Domain Ontologies
5. Specialized Banking Models
6. Banking Agent Ensemble
7. AI Lifecycle Management
8. Industry Pattern Libraries

---

## 1. BANKING DIGITAL BRAIN (Home)

**Hero:** "BANKING DIGITAL BRAIN" — Power your AI FIRST bank.
"It is an integrated solution that emulates human cognition, enabling it to perceive, reason, act, and adaptively learn autonomously across multiple modalities in dynamic environments."

### Intelligent Digital Brain creates value in several ways
"It unlocks trapped data and institutional knowledge to create actionable specialized intelligence, drive agentic automation and transform systems into dynamic, evolving ones."

- **Unlock Trapped Data** — Unlock trapped multi-modal data in different silos and turn them into shared insights.
- **Codify Institutional Knowledge** — Codify all institutional learning – explicit, implicit and tacit – into institutional knowledge.
- **Create Specialized Intelligence** — Turn general intelligence – external and/or internal into specialized intelligence embedded into functions.
- **Drive autonomous workflow** — Drive multi-systems, trusted multi agent automation and orchestration.
- **Continuously learn and adapt** — Convert static, rule-based systems into dynamic, intelligence-based systems that adaptively and continuously learn.

### 01. Turning general into specialized intelligence
"The value of a Banking Digital Brain lies in its ability to replicate human-like cognition in AI systems, transforming general intelligence into unique and specialized intelligence. It dramatically enhances business operations through autonomous, context-aware, and continuously learning capabilities."
"For example, the banking digital brain can automate complex decision-making, enabling systems to operate independently with minimal human intervention, thereby improving efficiency and reducing operational costs."
"It enhances customer experience by continuously learning, understanding, and adapting its responses with context awareness and personalized interactions, which increases satisfaction and engagement. Additionally, it drives innovation by supporting the creation of new intelligent products, services, and business models through its advanced cognitive capabilities."

### Creating a unique system of specialized intelligence
"The Banking Digital Brain harnesses world, client and Accenture's proprietary information to create a client's unique system of specialized intelligence."
Data sources: Internal Org Data · World & Market Data · Accenture Proprietary Data.
Funnel: GENERAL INTELLIGENCE → (Licensing-to-Client Model, Agentic Lessons Learned, General Purpose Intelligence) → SPECIALIZED INTELLIGENCE.

Five intelligence types:
- **01 Task Intelligence** — Interpret objectives, follow protocols, and accomplish assigned tasks while adapting to constraints and goals.
- **02 Multimodal Intelligence** — Perceive, interpret, and respond to human input in natural language or multiple modalities (text, images, audio, etc.).
- **03 Interactional Intelligence** — Actively listen, manage dialogue, and interact intelligently to achieve task success while maximizing user satisfaction.
- **04 Personal Intelligence** — Deeply understand individual's unique traits, preferences, and needs to deliver hyper-personalized engagement.
- **05 Physical Intelligence** — Sense, understand, and interact with the physical world through coordinated perception, movement, and adaptation.

### 02. What are the characteristics of the brain?
"A Banking Digital Brain is an advanced AI system designed to mimic human cognitive functions such as learning, reasoning, memory, contextual understanding, and decision-making. It has four main characteristics - orchestration, reasoning, adaptive learning, and multi-modal processing."
- **Orchestration** — It orchestrates across AI and data systems so they operate in tune with the enterprise.
- **Reasoning** — It reasons by thinking through information to make sense of it and decide what to do next.
- **Adaptive Learning** — It adaptively learns from new data and experiences, getting smarter over time.
- **Multi-modal Processing** — It processes diverse input forms such as text, speech, and images while maintaining deep contextual comprehension.

### 03. What's in the brain?
"Banking Digital Brain is made up of 5 key capabilities building blocks – Banking Data Foundation, Banking Domain Ontologies, Specialized Banking Models, Banking Agent Ensemble and AI Lifecycle Management. It harnesses data from banks' source systems and powering systems of experience & engagement with specialized intelligence."

Architecture (top → bottom, with a FEEDBACK LOOP on the right):
- **BANKING SOURCE SYSTEMS** (top layer)
- **Banking Data Foundation**: Data Accessibility · Data Products · Data Agents
- **Banking Domain Ontologies**: Semantic Layer · Knowledge Representation · Domain Ontologies Engineering
- **Specialized Banking Models**: Model Recipe · Adaptive Learning · Experiential Knowledge Acquisition
- **Banking Agent Ensemble**: Agent Orchestration · Agent Certification · Industry Agents
- **AI Lifecycle Management**: AI Governance/Registry & Lineage · AI Observability/Monitoring & Evaluation · Responsible/Explainable & Compliant AI · AI Lifecycle Automation & Orchestration
- **BANKING EXPERIENCE LAYER** (bottom)


---

## 2. BRAIN IN ACTION — KYC Use Case

Breadcrumb: Banking Digital Brain > KYC
Headline: "Transform KYC through delivering faster reviews, smarter risk decisions, and adaptive, auditable compliance."

"The Digital Brain enables a complete KYC flow — detecting policy changes, generating risk reports, supporting analysts during review, drafting outreach proactively, and learning from every decision to improve over time."

A 5-step flow (each step is Human-led or Agent-led):

**STEP 1 — Regulatory update** (Primary persona: KYC Manager)
Sub-tasks: Detect policy change · Analyze & draft update · Structure & standardize · Review & approve draft · Generate new business rule.
Detailed drill-down (animated stages):
- *Detect & connect* (Data connectors): "As part of a semi-annual KYC policy refresh, thresholds for client risk classification were updated. Through data connectors, the system automatically flags this change for review." (Regulatory Agent detected policy change; Policy update from ffiec.gov: "Risk classification thresholds have been updated" — Know Your Customer.)
- *Analyze & draft* (Agent huddle): "A huddle assembles specialized agents to analyze historical policy updates for context and draft the initial version of the new policy." (Regulatory Agent ✓ detected policy change; Research Agent ✓ analyzed policy updates; Author Agent drafting policy change.)
- *Structure & standardize* (Domain SLM): "The domain SLM trained on regulatory and policy language, transforms the drafted update into a standardized, machine-readable structure. This ensures consistency, compliance, and readiness for immediate propagation across agent workflows." (New policy draft → Risk classification framework: Low risk = Individuals with standard identification (government-issued ID, proof of address); Domestic customers with no adverse media or PEP (Politically Exposed Person) status; Risk Score 0–30. Medium risk = Customers with limited documentation or minor inconsistencies.)
- *Review & approve draft* (Manager: Amanda): "Amanda receives the draft policy change generated from the agents. She reviews the proposed updates in a conversational interface and approves it, which instantly propagates across the knowledge layer." (Nexa Bank · Agent Hub / Know Your Customer. Simulation on last quarter's data predicts: False positives 4.2% reduction; Manual reviews ~380 cases/month; No increase in missed high-risk accounts; Analyst time savings +1.1 hrs/day. Proposed update: Risk Classifier Agent – recalibrate scoring parameter; Review Scheduler Agent – adjust review frequency logic. Linked documentation: Compliance Bulletin 2025-PR-47; Risk Model Simulation Report (v3.2). Drafted solution → Business Rule ID 1234567 v2.0→v3.0; Impacts agents: Risk Classifier, Review Scheduler; Approve/Reject.)

**STEP 2 — Risk report generation** (Primary persona: Agents)
Sub-tasks: Review full customer base · Flag customer · Notify analysts.
"Autonomous agents collaborate asynchronously to reassess customer risk as policies evolve, transforming reviews into an efficient, always-on process."

**STEP 3 — Queue refresh & case review** (Primary persona: KYC Analyst)
Sub-tasks: Review policy impacts · Validate new reports · Learn from analyst decisions.
"Analysts are empowered to focus on applying context, judgment, and accountability to the agent-generated risk reviews."

**STEP 4 — Validation & customer outreach** (Primary persona: KYC Analyst)
Sub-tasks: Populate customer data · Draft outreach request · Approve & send outreach · Log feedback.
"Agents pre-fill profiles with available data and generate customer outreach requests for gaps, while analysts remain in control at key decision points."

**STEP 5 — Insights & feedback** (Primary persona: KYC Manager)
Sub-tasks: Observe and highlight trends · Turn insight into action · Simulate impact · Review & approve updates.
"Analyst decisions are logged as insights, enabling the brain to learn, adapt, and surface trends for strategic oversight, adjustment and smarter models."

---

## 3. BANKING DATA FOUNDATION

Overview: "Banks frequently struggle with data silos. Although data exists, it often remains inaccessible, making integration a significant challenge. A robust data foundation is essential to unlock value from this data. It enables organizations to have unfettered access to and utilization of both structured data (such as databases and spreadsheets) and unstructured data (like documents, emails, and images)."
"The data foundation is the key to solving two distinct challenges. First, it establishes true data accessibility, unlocking core systems of records from their operational silos. Second, it provides the platform to refine that raw, accessible data into high-value, reusable data products."

Three building blocks: Data Accessibility · Data Products · Data Agents.

### 3A. Data Accessibility
"The base layer responsible for unifying a bank's structured & unstructured data." Tabs: Connectors · MCP · Zero Copy.

**Connectors** — "Connectors are APIs that let different systems communicate and share data. Accenture has pre-built connectors to dozens of different data sources to accelerate content acquisition and built-in publishers to most commonly available search engines."
- *File System*: File System (extracts documents from a locally accessible File System path); SMB (extracts documents from remote sharing servers using SMB protocol).
- *Cloud Object Storage*: Amazon S3; Azure Blob Storage; Azure Data Lake; Azure File Storage; Google Cloud Storage.
- *Events, Messaging & Streaming*: Apache Kafka; Azure Event Hub.
- *Relational Databases*: JDBC (SQL); RDB via Snapshots; Database Server.
- *Content Management Systems*: SharePoint 2013; SharePoint 2016; SharePoint 2019; SharePoint Online.
- *Identity Providers*: LDAP Identity; Azure Id. Connector.

**MCP (Model Context Protocol)** — "Traditional integration requires individual connections to multiple data sources whereas MCP centralizes integration through MCP, allowing all models and data sources to connect once, reducing the total number of required integrations. Accenture have containerized and evaluated these open source MCP agents to enable faster, safer integration into client workflows." (All MCP: 857; examples: MySQL Server, Tavily MCP Server, PAELLADOC, Hyperbrowser, Cloud Run Deploy, E2B, Amor Crypto, Notion.)

**Zero Copy** — "Allow seamless connection to various enterprise data sources (ERP systems, applications, etc.) without physically duplicating data. 'Zero copy' means data is accessed and analyzed in place." Examples: SAP Business Data Cloud; Salesforce Data Cloud; Snowflake Zero-Copy; Databricks Zero-Copy. (SAP BDC diagram: BTP Catalog → Replication Flow, Analytic Model, Transformation Flow; Databricks BDC → Unity Catalog → Spark, Notebook; connected via COPY / ZERO COPY / DATA SHARE to AWS/Azure/GCP Databricks (Non-BDC) and Data Lake with multiple Delta Lake Data Products.)

### 3B. Data Products
"Data products are curated, structured outputs created from raw enterprise data, designed to serve specific business needs, making it actionable." Tabs: Conceptual View · Data Products.

**Conceptual View** — FROM "Use Case (UC) Driven Projects" (each use case repeats Analyze → Prepare → Acquire Data from siloed Data Sources) → TO "Data as Product" (Data Product A / Build Product with shared, reusable "Acquire Data — May be Logical and Federated" over Data Sources).

**Data Products** (examples):
- *Sales 360*: "A Sales 360 data product is a unified view that integrates sales data from multiple sources into a single, consistent, sales profile. It consolidates information like leads, customer profiles, product engagement, interactions, marketing and sales performance..." Wheel: Leads & Opportunities · Transactions · Product Engagement · Interaction History · Marketing Analytics · Sales Performance.
- *Risk 360*: "Unified view of an organization's risk exposures by aggregating and analyzing data from multiple risk categories such as credit, market, operational, compliance, and liquidity risk." Wheel: Market Risk · Compliance · Cyber Risk · Operational Risk · Liquidity Risk · Credit Risk.
- *Customer 360*: "A Customer 360 data product is a unified view that integrates customer data from multiple sources into a single, consistent, customer profile... customer identity, digital engagement, financial health, risk/compliance, interactions and value profile..." Wheel: Identity & Profile · Digital Engagement · Financial Health & Goals · Risk & Compliance · Channel Interactions · Financial Value Profile.
- *Compliance 360*: "Integrates data related to regulatory requirements, audit findings, and internal controls to provide a full view of compliance status." (Includes a Wealth Management – Risk Management & Compliance mapping table with columns: Value Chain, Use Case, Consumer Align Data Products, Aggregated Data Products, Source Align Data Product, Source System Name, Source System Type. Use cases include: Behavior Score, Transaction Behavior Profile, Fraud Trigger, Market Risk VaR Forecast, ESG Portfolio Scoring, Basel III Capital Optimization, KYC Entity Resolution.)

### 3C. Data Agents
"Autonomously interact with data to perform tasks such as retrieving information, transforming it, analyzing it, or triggering actions." Tabs: Data Migration · Data Modernization · Data Management.

**Data Migration** — "Seamless migration of data, pipelines, and code across platforms with optimized performance and minimal disruption."
- *Data Engineer (33)*: Lineage Creation (Informatica + SQL), File Loader, Code Parser, Code chunking, Code Search and analysis, Code Review, Code Optimization, STTM Logic Extraction, STTM Generation (Informatica PC), Parameter File Conversion, Code Validation – Reconciliation, Job Orchestrator (and more, 33 total).

**Data Modernization** — "Upgrading legacy systems with modern tech for target data models, STTM, and automated test cases."
- *Data Product Engineer (5)*: Data Product Pipeline Generator, STTM Code Generator, Code Reviewer, Data Mapping / STTM Generator, Data Mapping Reviewer.
- *Data Product Designer (5)*: Conceptual Model Generator, Logical Model Generator, Physical Model Generator, Data Product Identifier, Data Product Designer.
- *Data Test Engineer (5)*: Automated Test Case Generator, Automated Test Script Generator, Automated Test Data Generator, Automated Test Result Validator, Automated Test Script Executor.

**Data Management** — "Ensuring data quality and governance through master data management and profiling."
- *Data Quality Engineer (5/6)*: Data Discoverer, Data Profiler, Data Profile Reviewer, Data Quality Rule Definer, Data Quality Rule Validator, Data Quality Verification Script Generator.
- *Data Governance Migration (13)*: Metadata Enrichment, Business Term Rules Generator, Alation to Collibra, Axon to Collibra, Data Asset Certification, Lookup column identifier, Lookup data standardizer, Lookup data anomalies identifier, Data validation rule generator, De-duplication rule generator, Data management policy generator, MDM Hierarchy and Relationship Generator, MDM Survivorship Rule Generator (Data Model).
- *Data Test Engineer (5)*.


---

## 4. BANKING DOMAIN ONTOLOGIES

Overview: "A strong data foundation is a critical first step, but it's insufficient for scaling AI. To successfully scale, banks must translate data into knowledge by providing both human and AI agents with contextual and business understanding via the use of domain ontologies."
"The semantic layer and knowledge representation graph are ways to implement, represent, and operationalize that ontologies."

Three building blocks: Semantic Layer · Knowledge Representation · Domain Ontologies Engineering.

### 4A. Semantic Layer
"Makes data easy to understand by translating it into familiar business concepts and relationships."
Demo: Same question — "How did the mortgage portfolio perform this quarter compared to last year?" — compared with Semantic Layer Inactive vs Semantic Layer Active. Active path: DETERMINE BUSINESS CONTEXT → found Mortgage Portfolio Performance, found Retail Banking Profitability, found Loan Book Health Metrics.

### 4B. Knowledge Representation
"Organizes entities and their relationships as a connected network, integrating data from various sources for a comprehensive view."
Use Case: Banking Customer Risk Assessment — "Banking Digital Brain powered by Knowledge reveals hidden insights."
- *Risk Assessment – Limited Context*: "KYC status and transactional activity determined through simple document and text retrieval. This assessment does not incorporate complex entity relationships or multi-source data." (Insights: Customer Name → John Doe; KYC Verification Date → August 2025.)
- *Risk Assessment – Advanced Knowledge*: "Enhanced risk profile developed using Knowledge Graph multi-relational reasoning. This analysis synthesizes KYC data, transaction context, entity relationships, and regulatory mandates to surface hidden compliance risks." (Insights: Customer Name → John Doe; KYC Verification Date → August 15, 2025.)
Knowledge Graph – Risk Assessment Insights: John Doe → has → Account; → Credit Score (multi-relational graph).

### 4C. Domain Ontology Engineering
Tabs: Process · Accenture's Ontoforge.

**Process** — Domain Ontology Engineering Process (4 steps):
1. Ontology Design Workshop: Understanding and Structuring a Domain — "A collaborative session to capture domain knowledge, define key concepts, and their associations."
2. Domain Data Reading: Grounding Ontology Design in Real Data — "An essential step to analyze existing datasets, identify patterns, and align real-world data with domain concepts—ensuring the ontology reflects actual usage, relationships, and constraints."
3. Leveraging Standards & Open Ontologies: Aligning with Best Practices — "Exploring and selecting the most relevant domain standards and open ontologies to ensure interoperability, accelerate design, and embed widely accepted best practices into the knowledge model."
4. Capturing Tribal Knowledge & Transformation Rules — "Collecting expert insights and undocumented practices, then formalizing them into transformation rules; bridging the gap between tacit know-how and structured ontological design to enrich the semantic layer."

**Accenture's Ontoforge** — "How does Ontoforge create the domain ontology? Ontoforge is Accenture's IP to accelerate generation, edit, and management of OWL/RDF ontologies by leveraging LLMs and user-provided inputs." [Watch Demo]
Flow (5 stages, with Ontology Aligner Agent and Logic Generator Agent):
- Input Data and User Prompt — "Connects to databases or sample data files to customize the ontology."
- Open Ontologies & W3C Standards — "Reuses open domain or upper-level ontologies."
- Graph Topology and Structure + User Feedback — "Combines open ontologies with new class hierarchies, relationships, and attributes."
- Graph Logic + User Feedback — "Adds inferencing rules and logical axioms to enhance reasoning capabilities."
- Ontology TTL file.
What does Ontoforge create? (Output of Ontologies):
- 01 Reasoning Rules (Inference and Derivations) — "Allow systems to infer new knowledge. Example: 'if X is a supplier and Y buys from X, then Y has a supplier'."
- 02 Logical Rules (Constraints and Axioms) — "Connect taxonomies through advanced relations, cardinality constraints, and first order logic."
- 03 Taxonomies (Hierarchies) — "Organize concepts and vocabularies into structured classifications. Uses is-a relations to model the inheritance between concepts."
- 04 Vocabularies (Concepts and Terms) — "Define the common language. Shared label for entities, attributes, and relationships."

---

## 5. SPECIALIZED BANKING MODELS

Overview: "To unlock true specialized banking intelligence, pre-trained LLMs must be transformed into specialized models through a structured 'Model Recipe.' This process infuses domain-specific knowledge, regulatory compliance, and contextual understanding into the foundation model, enabling it to deliver secure, accurate, and personalized banking experiences that generic LLMs cannot achieve."
"With Experiential Knowledge Acquisition, the system learns implicit, experience-based knowledge that is not formally documented, by observing patterns, behaviors, and context over time."
"Through Adaptive Learning, the system iteratively adjusts behavior through trial-and-error, guided by rewards."

Three building blocks: Model Recipe · Adaptive Learning · Experiential Knowledge Acquisition.

### 5A. Model Recipe
"The process of tailoring pre-trained models using codified enterprise data & knowledge, transforms generic models into specialized, unique models."
Pipeline: Model Selection (Selected Open Source Model) → Pre-Processing [Model Recipe: Persona Customization, Question Answering, Tool Use; Internal Data: Privacy, Cybersecurity, Policies & Procedures, Customer Data, …; Internal Tools] → Data Curation [Pre-Processed Data, Data Understanding & Curation; Tool Usage Analysis, Tool Analysis Dataset; Qualitative evaluation (LLM-Judge), Systematic evaluation (external benchmarks)] → Model (Training/Tuning).

### 5B. Adaptive Learning
"Unlike traditional machine learning's static cycle, Intelligent Digital Brain enables learning to evolve continuously like a living system across three interconnected layers."
- Knowledge Layer (refine what they KNOW) — "Continuously updates facts, context, and relationships." Outcome: ensure institutional intelligence is always current and never goes stale.
- Decision Layer (refine how they ACT) — "Continuously refines choices, strategies, workflows, thresholds." Outcome: enables the system to act dynamically.
- Reasoning Layer (refine how they REASON) — "Continuously customizes and evolves the underlying models and logic." Outcome: drives smarter and more context-aware intelligence.

**Adaptive Learning Framework** — 7-stage loop (Continuous Feedback and Reinforcement Learning with Human in the loop). "This 7-stage loop enables the Intelligent Digital Brain to learn on the fly, adapt in real time through reinforcement learning, and evolve safely with full human alignment and transparency."
1. Sense — "Collect real-time signals from digital and human channels—telemetry, sensor data, user actions, and contextual cues."
2. Interpret — "Analyze incoming signals and patterns extracting actionable insights."
3. Evaluate — "Measure performance, safety, and fairness using agents and human reviewers to distinguish meaningful learning from noise."
4. Learn — "Applies validated learning by updating the Knowledge, Decision and/or Reasoning layer."
5. Deploy — "Roll out changes safely in canary model, compare deltas before full rollout, with continuous KPI monitoring."
6. Reflect — "Learns how to learn by analyzing what worked, refining evaluators, thresholds, and learning speed for the next cycle."
7. Govern — "Log, review, and approve all updates under Responsible AI guardrails, ensuring transparency, compliance, and ethical operation."

### 5C. Experiential Knowledge Acquisition
"Experiential knowledge is the blend of implicit and tacit understanding, rooted in hands-on experience and guided by intuition." Tabs: What it is · Challenges of Capturing · Acquisition Approach · Example.

**What it is — The Enterprise Knowledge:**
- *Explicit* — Definition: "Knowledge that is formalized, codified, and easily communicated through documents, databases, manuals, or digital systems." Examples: business protocols, policies, product specifications, standard operating procedures, training manuals, reports. Characteristics: explicitly captured in a digital form; easily shared and reused across teams.
- *Implicit* — Definition: "Knowledge that is not yet documented but can be articulated or transferred through observation, explanation, or practice. It sits between explicit and tacit knowledge." Examples: best practices shared in meetings, techniques demonstrated during training, undocumented processes used to make decisions. Characteristics: based on human experience; 'patterns' can be identified and explained if asked.
- *Tacit* — Definition: "Deep, experience-based knowledge that is personal, intuitive, and hard to articulate or codify — often gained through years of practice." Examples: a loan officer's intuition about a borrower, a manager's negotiation instincts, a nurse's bedside judgment. Characteristics: rooted deeply in human intuition, instincts, or skills; personal judgement developed over long experience; difficult to express.
The Importance of Experiential Knowledge: Bridges the gap between formal process and real-world execution · Critical to complex decision making · AI agents trained only on explicit knowledge lack experiential insight and struggle with nuance.

**Challenges of Capturing:**
1. Experiential knowledge exists in human brains — Human-driven elicitation is labor intensive and time consuming.
2. Experiential knowledge is context dependent — Human-driven elicitation is difficult to ensure consistency and coverage.
3. Loss of experiential knowledge when experts leave and retire — Need to act NOW and continuously.

**Acquisition Approach — AI-Aided Experiential Knowledge Transfer:** "AI agent serves as a coach to deliver adaptive, hyper-personalized learning to transfer implicit and tacit knowledge and upskill the workforce."
- Integrative Tacit Knowledge Transfer (Structured, goal-driven coaching) — Learn strategic reasoning, prioritization, and pattern recognition. Skills: Decision-making, problem framing, interpersonal judgment, leadership, negotiation. Examples: Leadership, product.
- Situational Tacit Knowledge Transfer (Experienced learning / Learning-by-doing) — Learn how to perform complex tasks efficiently in real-world. Skills: problem solving operational skills, context-sensitive actions. Examples: Operations, engineering.
- Social, Emotional Tacit Knowledge Transfer (Role-play Learning) — Learn how to behave in human interaction. Skills: Human interaction, communication, persuasion, conflict resolution. Examples: Sales, service, management.

**Example — Experience Knowledge Acquisition Example:** "The following illustrates the high-level process where AI works with human to formulate a strategy to engage with inactive customers, where human's experiential knowledge is being captured systematically by AI via reverse prompting." (Step T1: Determine which inactive customer segment to target → continues as a multi-step animated flow.)

---

## 6. BANKING AGENT ENSEMBLE

Overview: "Agents are AI-powered software applications that perform tasks and make decisions autonomously or with minimal human oversight. By employing Reasoning, an Agent works autonomously to determine which tools, data, memory, and knowledge to access, or which other agents to collaborate with. It can orchestrate multi-agent collaboration with other agents both within and across different platforms."
"Furthermore, it can continuously learn and improve its performance through an ongoing, adaptive learning loop. To ensure agents operate as expected, their performance must be evaluated for effectiveness, accuracy, and decision-making quality via an Agent Certification process."

Three building blocks: Agent Orchestration · Agent Certification · Industry Agents.

### 6A. Agent Orchestration
"Multi-agent orchestration across systems refers to the coordination and management of multiple autonomous AI agents—each with specialized functions—working together across various technology platforms or business systems to achieve complex, cross-domain objectives."
Workflow Editor (example: Know Your Customer • Periodic Review; with Add Agent / Publish Workflow):
- Super Agents: Data Request, Risk Evaluator, Identity Validator, QC Monitoring, Periodic Review Validator.
- Fenergo Agents: Screening, Document, Data Sourcing, Significance, Autocompletion.
- Salesforce Agents (additional category).
Example graph: Orchestrator (Periodic Review) → Data Request (Super Agent) → Data Analyst, Compliance, Researcher (Utility Agents); → Periodic Review Validator (Super Agent) → Data Summarizer, Verifier (Utility Agents); Document Agent (Fenergo) → Salesforce (CRM), Fenergo (CLM); Verifier → DocuSign (Document Collection).

### 6B. Agent Certification
"Agent Certification is the process to assess agents' operational readiness measured by security, effectiveness, and functionality & interoperability."
Flow: Data Products (1. Upload Metadata, 2. Source Code, 3. Build Recipe) → certification dimensions (PERFORMANCE, SECURITY, …). PERFORMANCE pipeline: Evaluation Data ("GenAI model generates task specific evaluation data based on Agent Metadata") → Performance Test ("Static Analysis of code provides ground truth tool formatting and output structure. Data is run through the agent (LLMs) and compared to static analysis ground truth.") → Latency Test collector ("Latency data is aggregated and performance is updated. If there is no data, use container startup time on average first.").

### 6C. Industry Agents
"Accenture's pre-built agents that serve as jump-starters to support Banking processes & operations."
Categories: Commercial Credit · B2B Marketing · Sales · Human Resources · B2C Marketing · Agentforce · Source to Pay · Periodic Review for Corporate · Periodic Review for Retail · Identification and Verification · Source of Wealth · Quality Control · (more).
- *Commercial Credit*: 1. Commercial Credit Sales Orchestrator Agent; 2. Commercial Banking Product Recommender (recommending commercial banking product based upon the credit and ESG risk assessment); 3. Business Evaluator Super Agent (expert in managing the process of company profiling and business analysis); 4. Company Profile Agent (providing an overview of company's business); 5. Key Owner Agent (analyzing company's management capability); 6. Production & Sales Evaluator Agent (analyzing company's production and sales efficiency); 7. Products and Services Agent; 8. Client Base Agent (analyzing company's target market/customers); 9. Business Performance Agent.
- *B2B Marketing*: 1. Strategic Advisor Agent ("Built with the intelligence of writing a strategic campaign brief at the caliber of a seasoned marketing expert driving enhanced campaign investment decisions."); 2. Analyst Agent ("Provide insights including program, channel/tactic performance and sales/growth opportunities and impact to inform going forward program planning and performance optimization."); 3. Researcher Agent ("Source and synthesize cultural, client, competitor and company data and insights to support the development of relevant and differentiated marketing strategies."); 4. Critical Thinker Agent ("Analyzes the validity, logic, and potential biases of strategies and decisions, ensuring thorough scrutiny & robustness. Explores alternative solutions and focuses on enhancing strategic decision-making.").


---

## 7. AI LIFECYCLE MANAGEMENT

Overview: "As the use of agentic AI proliferates, and decisions and actions are taken more and more by AI agents, with or without human in the loop, system's security, safety and observability have become more important than ever."

Four building blocks: AI Governance, Registry & Lineage · AI Observability, Monitoring & Evaluation · Responsible, Explainable & Compliant AI · AI Lifecycle Automation & Orchestration.

### 7A. AI Governance, Registry & Lineage
"Maintain a unified governed inventory of all AI models and agents across banking functions." Tabs: Model Registry · Agents Registry.
**Model Registry** entries:
- gpt-4o-diariarize (2025-02-15) — "A cutting-edge speech-to-text solution that delivers reliable and accurate transcripts; now equipped with diarization support aka identifying different speakers through the transcription."
- Personalized Financial Advisory LLM (2025-04-20) — Analyzes customer data to provide tailored financial advice and product recommendations.
- Credit Risk Model (2024-09-15) — Predicts likelihood of borrower default based on data.
- Fraud Detection Model (2025-04-01) — Detects suspicious transactions indicating fraud.
- AML Model (2022-07-30) — Flags unusual patterns for anti-money laundering compliance.
- Customer Segmentation Model (2024-03-20) — Segments customers for targeted marketing.
- Loan Default Prediction (2024-11-05) — Estimates risk of loan default using historical and economic data.
- Financial Forecasting Models (2024-11) — Predicts future financial metrics like prices or revenue.
- Attrition Risk Model (2023-12-12) — Predicts likelihood of customer attrition.

### 7B. AI Observability, Monitoring & Evaluation
"Real-time monitoring and evaluation of AI model and agent performance across banking operations."
Dashboard: filters (Application ID e.g. App4958602Frkt640K, Model Name, Request Type) and KPIs — Prompt Tokens 32K, Completion Tokens 3K, Overall Tokens 35K, Overall Cost 1.135, Date range 2/14/2025–2/23/2025. Charts: Daily Prompt Tokens, Monthly Prompt Tokens, Daily Completion Tokens, Monthly Completion Tokens.

### 7C. Responsible, Explainable & Compliant AI
"Provide transparency, fairness, and compliance assurance for all AI-driven banking decisions."
Metrics dashboard (filter e.g. TDLC + s.gopalakrishnan; date 6/15/2025–8/10/2025): Accountability Metrics (sum of daily average frequency of calls) · Transparency Metrics (sum of daily average sentence count) · Inclusiveness Metrics (sum of daily average female references) · Privacy Metrics (sum of daily total count - email) · Reliability Metrics (sum of daily average hate rate) · Fairness Metrics (sum of daily total count - race).

### 7D. AI Lifecycle Automation & Orchestration
"Govern and automate the lifecycle of banking AI models and agents through compliant, secure CI/CD pipelines."
- Dynamic Model Routing — "Every model has distinct strength and cost profile. Dynamic model routing is therefore required to manage and dynamically switch between different models for optimal performance and cost."
- A One-Stop Shop for Model Decisioning — "Accenture's Model Switchboard enables any user in an organization to compare and choose models and route AI queries to the best-suited foundation models, all while maintaining the necessary governance and controls. It's a truly complete solution, designed to accelerate the gen AI journey and help organizations scale gen AI effectively. Model switchboard offers four key functions." [Watch Demo]

---

## 8. INDUSTRY PATTERN LIBRARIES

Overview: "Industry Pattern Libraries is Accenture's intellectual Properties that provide ready to deploy assets and accelerators tailored to Banking."
"Each represents a configurable capability pattern that speeds delivery, ensures consistency and brings industry-grade solution to our client engagements."

Two building blocks: Overview · Asset Catalog.

### 8A. Overview
**370 Total Banking Assets**, broken down:
- 268 Agents — "AI-powered agents autonomously perform tasks and decisions, working together across banking systems to achieve complex financial outcomes."
- 85 Data — "Banking data products unlock siloed data by automating its discovery, retrieval, and transformation, creating high-value, reusable assets."
- 7 Lifecycle — "Lifecycle tools automate governance, monitoring, and evaluation to ensure banking models and agents run securely."
- 5 Models — "Models deliver secure, personalized AI experiences beyond generic LLMs by leveraging domain-specific data, tailored architectures, and controlled training approaches optimized for business needs."
- 5 Ontology — "Banking ontologies convert data into shared knowledge, giving humans and AI agents consistent understanding."

### 8B. Asset Catalog
"Browse a comprehensive collection of Banking digital assets and cross-industry solutions." (Searchable catalog/grid of the 370 assets across the categories above.)

---

## EXTRACTION NOTES
- This prototype is highly interactive: several sections (Brain in Action KYC drill-downs, Agent Certification, the Knowledge Graph, the Experiential Knowledge "Example", and the Adaptive Learning/Observability dashboards) are animated, scroll-triggered or drag-and-drop builders. The substantive text and structure are captured above; some deep micro-animation frames and the full long catalog grids (e.g., all 268 industry agents, all 857 MCP entries, full Compliance 360 mapping table rows) are very large and only representative samples are listed.
- Brand: Accenture. Globe/sphere motif used per section (each capability has its own colored sphere).
