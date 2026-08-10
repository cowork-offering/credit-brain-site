# Data ownership and the grading chain

Who computes what in the credit data architecture, and why the boundaries sit where they do.

## The ownership chain
- The spreading vendor owns the raw spread: normalized income-statement, balance-sheet, and cash-flow line items keyed by account code. It does not calculate ratios.
- The bank's consumer layer, the spreading connector, owns the standard credit ratios, computed on read from the spread. Because a ratio is a deterministic function of the spread, one implementation feeds every consumer and no stored copy can drift. The only place a ratio is persisted is the immutable memo record, for point-in-time provenance.
- The internal rating system owns the risk rating, the probability of default, and the covenant grades. It consumes ratios and never re-derives them.
- The loan-origination system owns loan terms and covenant thresholds. The threshold numbers live there.

The chain reads: raw line item from the spreading engine, standard ratio from the bank's consumer layer, rating and grade from the rating system, threshold from the loan-origination system.

## Grading is a cross-source join
The spreading engine surfaces neutral numbers, with no pass, watch, or breach and no hardcoded thresholds. Grading happens when those ratios are joined with the loan-origination thresholds, in the Experience MCP, producing bands: pass, watch when within ten percent of the trigger, and breach.

## The model never does the math
The model never computes a ratio or a grade. Deterministic math lives in code inside the connectors, for correctness and for auditable provenance under model-risk guidance (SR 11-7). The model orchestrates: it decides which tool to call and how to present the result, and it does not bus large structured data between tools.

## The spreading engine as a headless intelligence platform
A modern spreading vendor is more than a data source; it is building an intelligence platform, with driver analysis, profit and gain-fade, portfolio benchmarking, anomaly detection, and portfolio-wide question answering. MCP is how that intelligence goes headless: instead of living only inside the vendor's own interface, it becomes intelligence any experience can call. There are three layers: data (the raw spread) from the vendor, intelligence (drivers, benchmarks, portfolio questions) from the vendor, and experience (the bank's branding, widgets, the covenant join, orchestration) owned by Accenture and the customer. The client composes all three. It is the same shape as the broader pattern where a foundation provider ships roughly the reusable thirty percent and the systems integrator ships the bank-specific seventy percent that makes it deployable.
