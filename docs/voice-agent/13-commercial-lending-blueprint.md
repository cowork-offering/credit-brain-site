# The commercial lending blueprint

How loan origination works end to end, the platform layers beneath it, and where the brain plugs in.

## The customer's credit journey
On the page this is the Accenture Commercial Credit Blueprint: the recognized lifecycle of commercial lending in six headline stages, from first lead to a live, monitored facility. The six stages, and the system each leans on, are: (1) Prospecting — Salesforce; (2) Sales — nCino; (3) Credit Analysis — Boom and the Credit Memo; (4) Approval; (5) Offering & Set-up — core banking; and (6) Servicing & Monitoring — Early Warning. When asked about the lifecycle or the blueprint, lead with these six headline stages; they are what the page shows.

Underneath those six, the full origination journey is more granular, and most of its steps can be streamlined and automated. End to end it runs: lead identification and prospecting, then pre-scoring and KYC (these sit under Prospecting); application preparation and onboarding (Sales); credit analysis (Credit Analysis); approval (Approval); final pricing, terms, and documentation, then set-up and drawdown (Offering & Set-up); and account servicing, portfolio monitoring, credit-risk monitoring, and, where needed, collections and recoveries (Servicing & Monitoring). A loan-origination platform provides the product, sales, underwriting, risk, and servicing journeys, with a self-service web portal or app in front for the customer.

## The platform layers
Beneath that journey sit several platform layers:
- Systems of engagement: the CRM platform, the onboarding platform, and the customer portal or app.
- Systems of insight and analytics: the analytical layer over the lending book.
- The loan-origination and credit-risk platform: the core of underwriting and risk.
- The core banking platform.
- Client and partner ecosystems that extend the estate.

## Where the brain plugs in
The enterprise brain sits across these layers as the reasoning tier, reaching each platform through MCP connectors rather than replacing any of them. The clearest on-ramp is underwriting. Financial spreading, the first heavy step of credit analysis, is automated by sending uploaded financial documents to a spreading engine that extracts structured income-statement, balance-sheet, and cash-flow data and returns it for analysis. In the reference build this runs against the loan-origination environment: a document is sent to the spreading engine, the borrower maps to a company and the document to a file, the engine extracts the statements, a person verifies them through an embedded view, and the structured financials flow back into credit analysis. From there the same brain extends agent by agent, underwrite first, then early-warning monitoring, across the rest of the journey, each new agent cheap because the connectors already exist.
