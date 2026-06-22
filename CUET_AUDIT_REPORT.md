# CUET Question Bank Audit Report

Generated: 2026-06-09

## Official NTA 2026 Basis

Sources checked:

- CUET (UG) 2026 Information Bulletin: https://cuet.nta.nic.in/information-bulletin/
- CUET (UG) 2026 Syllabus page: https://cuet.nta.nic.in/cuetug-2026-syllabus/
- Subject syllabus PDFs for English 101, Accountancy 301, Business Studies 305, Economics 309, and General Aptitude Test 501.

Important NTA constraints for the site/question bank:

- Mode: Computer Based Test (CBT).
- Pattern: objective Multiple Choice Questions.
- Test paper size: 50 compulsory questions per test paper.
- Duration: 60 minutes per test paper.
- Marking: +5 for correct, -1 for incorrect.
- Repo subjects mapped to NTA 2026 codes:
  - English: 101
  - Accountancy / Book-Keeping: 301
  - Business Studies: 305
  - Economics / Business Economics: 309
  - General Aptitude Test: 501

## Work Completed

- Added `scripts/audit-cuet-content.mjs`.
  - Audits NTA code alignment, MCQ shape, chapter coverage, answer/explanation conflicts, duplicate options, thin explanations, and broken/ambiguous explanation text.
  - Writes `cuet-content-audit.json`.
- Added `scripts/apply-high-confidence-cuet-fixes.mjs`.
  - Applies only high-confidence fixes where the explanation explicitly says `Answer: Option X`, `correct answer is option X`, or `Option X is correct`.
  - Preserves the previous answer index as `correct_content_audit_original`.
- Corrected 15 Economics files from subject code `302` to NTA code `309`.
- Corrected 194 high-confidence answer indexes based on explicit explanation text.
- Repaired 3 malformed MCQs in `questions/2025-questions.json` so they now have four options and honest explanations.
- Reviewed and repaired 70 Accountancy chapter-one questions in `questions/accountancy/AC01.json` where the explanation computed an answer missing from the option set, the stored answer index did not match the worked solution, or the explanation contained misleading ambiguity.
  - Previous values are preserved as `correct_content_review_original` where the answer index changed.
- Reviewed and repaired 20 Accountancy share-capital questions in `questions/accountancy/AC11.json`.
  - Fixed incorrect answer indexes, option sets missing the computed answer, invalid reissue wording, and explanations that said `closest option`, `wait`, or similar audit-warning language.
  - Previous values are preserved as `correct_content_review_original` where the answer index changed.
- Reviewed and repaired a second batch of 22 Accountancy share-capital questions in `questions/accountancy/AC11.json`.
  - Standardized forfeited-share treatment for received securities premium, corrected reissue discount/capital reserve calculations, removed duplicate options, and repaired option sets missing the computed result.
  - Previous values are preserved as `correct_content_review_original` where the answer index changed.
- Reviewed and repaired 25 Accountancy accounting-ratios questions in `questions/accountancy/AC15.json`.
  - Fixed ratio calculations, wrong answer indexes, answer options missing the exact computed value, and ambiguous `closest option`/`none match` explanations.
  - Previous values are preserved as `correct_content_review_original` where the answer index changed.
- Reviewed and repaired a second batch of 20 Accountancy accounting-ratios questions in `questions/accountancy/AC15.json`.
  - Corrected current/quick ratio, turnover, GP/NP/operating ratio, ROCE, debt-equity, interest coverage, operating cycle, and option sets that used rounded or inconsistent distractors.
  - Previous values are preserved as `correct_content_review_original` where the answer index changed.
- Reviewed and repaired 19 Accountancy dissolution/realisation questions in `questions/accountancy/AC08.json`.
  - Fixed Realisation Account profit/loss calculations, partner share allocations, final capital balances, missing exact computed options, and wrong answer indexes.
  - Previous values are preserved as `correct_content_review_original` where the answer index changed.
- Reviewed and repaired a second batch of 18 Accountancy dissolution/realisation questions in `questions/accountancy/AC08.json`.
  - Corrected Realisation Account loss/profit calculations, capital settlements, loan-inclusive payments, creditor/payment balancing figures, and questions whose supplied data was internally inconsistent.
  - Previous values are preserved as `correct_content_review_original` where the answer index changed.
- Reviewed and repaired 24 General Test quantitative/reasoning questions in `questions/general-test/GT-S6.json`.
  - Fixed age, ratio, percentage, time-speed-distance, compound-interest, Venn diagram, partnership, work-time, and series questions where exact computed answers were missing from options or the stored answer pointed to a rounded/nearest distractor.
  - Previous values are preserved as `correct_content_review_original` where the answer index changed.
- Reviewed and repaired 24 Accountancy partnership-appropriation questions in `questions/accountancy/AC02.json`.
  - Fixed interest on capital/drawings, salary/commission, reserve, guarantee, current account, and appropriation distribution questions where explanations computed a value missing from options or selected a nearest distractor.
  - Previous values are preserved as `correct_content_review_original` where the answer index changed.
- Reviewed and repaired 23 Accountancy dissolution/realisation questions in `questions/accountancy/AC07.json`.
  - Fixed Realisation Account outcomes, final partner settlements, Garner v Murray deficiencies, asset takeovers, unrecorded assets/liabilities, and option sets missing exact computed results.
  - Previous values are preserved as `correct_content_review_original` where the answer index changed.
- Reviewed and repaired 24 Accountancy retirement/goodwill/revaluation questions in `questions/accountancy/AC06.json`.
  - Fixed gaining ratio, goodwill compensation, reserve distribution, revaluation, deceased/retiring partner settlement, executor payments, and option sets missing exact computed results.
  - Previous values are preserved as `correct_content_review_original` where the answer index changed.
- Reviewed and repaired 31 Accountancy share-issue and purchase-consideration questions in `questions/accountancy/AC10.json`.
  - Fixed pro-rata allotment calculations, excess application adjustments, calls-in-arrears/advance interest, securities premium, purchase consideration, goodwill/capital reserve, and option sets missing exact computed answers.
  - Previous values are preserved as `correct_content_review_original` where the answer index changed.
- Reviewed and repaired 30 Accountancy goodwill/valuation and reconstitution questions in `questions/accountancy/AC04.json`.
  - Fixed average-profit, super-profit, capitalisation, hidden-goodwill, gaining/sacrificing-ratio, and retiring-partner goodwill adjustment calculations.
  - Previous values are preserved as `correct_content_review_original` where the answer index changed.
- Reviewed and repaired 28 General Test reasoning questions in `questions/general-test/GT-S8.json`.
  - Fixed coding-decoding, direction sense, ranking, row/box arrangement, blood relation, Venn-style survey, syllogism, and matrix-sum questions with missing exact answers or inconsistent selected options.
  - Previous values are preserved as `correct_content_review_original` where the answer index changed.
- Reviewed and repaired 27 Accountancy admission/reconstitution questions in `questions/accountancy/AC05.json`.
  - Fixed new-ratio, sacrificing-ratio, revaluation, reserves, goodwill premium, hidden goodwill, capital adjustment, and admission-date profit-share calculations.
  - Previous values are preserved as `correct_content_review_original` where the answer index changed.
- Reviewed and repaired 26 Accountancy reconstitution/retirement questions in `questions/accountancy/AC03.json`.
  - Fixed gaining/sacrificing ratio, goodwill compensation, reserve/revaluation, capital adjustment, time-apportioned profit, and partner-capital balance calculations.
  - Previous values are preserved as `correct_content_review_original` where the answer index changed.
- Reviewed and repaired a third batch of 24 Accountancy share-capital forfeiture/reissue questions in `questions/accountancy/AC11.json`.
  - Fixed capital reserve, securities premium, forfeited shares, invalid reissue, pending forfeited-share balance, and final equity-section calculations.
  - Previous values are preserved as `correct_content_review_original` where the answer index changed.
- Reviewed and repaired 24 Economics market-equilibrium questions in `questions/economics/EC05.json`.
  - Fixed equilibrium price/quantity, ceilings/floors, shortage/surplus, tax/subsidy incidence, consumer surplus, elasticity, imports, and welfare calculations.
  - Previous values are preserved as `correct_content_review_original` where the answer index changed.
- Reviewed and repaired 23 Economics supply/equilibrium and firm-behaviour questions in `questions/economics/EC04.json`.
  - Fixed supply elasticity, equilibrium, tax/subsidy, firm profit maximisation, shutdown price, surplus, price ceiling, and market-supply calculations.
  - Previous values are preserved as `correct_content_review_original` where the answer index changed.
- Reviewed and repaired 22 Accountancy financial-statements/Schedule III questions in `questions/accountancy/AC13.json`.
  - Fixed reserves and surplus, profit after tax/EPS, depreciation, current liabilities, shareholders' funds, ratio, and internally inconsistent balance-sheet total questions.
  - Previous values are preserved as `correct_content_review_original` where the answer index changed.
- Reviewed and repaired 22 Economics income-and-employment questions in `questions/economics/EC09.json`.
  - Fixed multiplier, consumption/saving, equilibrium income, fiscal policy, taxation, deflationary-gap, and option-set inconsistencies where exact computed answers were missing.
  - Previous values are preserved as `correct_content_review_original` where the answer index changed.
- Reviewed and repaired 21 Economics consumer-equilibrium/demand questions in `questions/economics/EC02.json`.
  - Fixed utility-maximisation, elasticity, total-expenditure, market-demand, consumer-surplus, and price-ceiling questions where exact computed answers or answer indexes were inconsistent.
  - Previous values are preserved as `correct_content_review_original` where the answer index changed.
- Reviewed and repaired a second batch of 21 General Test quantitative/reasoning questions in `questions/general-test/GT-S6.json`.
  - Fixed work/time, ages, pipes/cisterns, mixtures, alligation, averages, speed, profit/loss, series, and compound/simple-interest questions with exact-answer or answer-index inconsistencies.
  - Previous values are preserved as `correct_content_review_original` where the answer index changed.
- Reviewed and repaired 20 Business Studies organising questions in `questions/business-studies/BS05.json`.
  - Corrected repeated functional-structure questions whose answer key incorrectly pointed to informal structure and cleaned the generated explanation wording.
  - Previous values are preserved as `correct_content_review_original` where the answer index changed.
- Reviewed and repaired 20 General Test current-affairs/data-interpretation questions in `questions/general-test/GT-S5.json`.
  - Fixed multi-true MCQs, missing exact numerical options, answer-index errors, and ambiguous `closest/intended answer` explanations across sports, climate, exports, schemes, startups, and data-table questions.
  - Previous values are preserved as `correct_content_review_original` where the answer index changed.
- Reviewed and repaired 19 Economics production/cost/revenue questions in `questions/economics/EC03.json`.
  - Fixed monopoly/perfect-competition equilibrium, profit, ATC/AVC, labour hiring, price discrimination, and MC/MR option-set inconsistencies.
  - Previous values are preserved as `correct_content_review_original` where the answer index changed.
- Reviewed and repaired 19 Economics national-income/GDP-deflator questions in `questions/economics/EC07.json`.
  - Fixed GDP/NI conversions, real GDP per capita, GNP/NNP adjustments, expenditure-method reconciliation, deflator, and ranking questions where exact computed answers were missing or mismatched.
  - Previous values are preserved as `correct_content_review_original` where the answer index changed.
- Reviewed and repaired 18 Accountancy share-capital/preference-share questions in `questions/accountancy/AC09.json`.
  - Fixed paid-up capital, pro-rata allotment, calls in arrear/advance, preference arrears, winding-up distributions, CRR, and debt-equity calculations with exact answer options.
  - Previous values are preserved as `correct_content_review_original` where the answer index changed.
- Reviewed and repaired a second batch of 16 Accountancy partnership-appropriation questions in `questions/accountancy/AC02.json`.
  - Fixed interest on drawings/capital, guarantee deficits, salaries, commissions, reserve appropriations, fluctuating capital, and residual profit-sharing questions with exact calculated options.
  - Previous values are preserved as `correct_content_review_original` where the answer index changed.
- Reviewed and repaired a third batch of 16 Accountancy accounting-ratios questions in `questions/accountancy/AC15.json`.
  - Fixed profitability, turnover, operating-cycle, D/E, ICR, EPS, book-value, ROCE, proprietary, current/quick ratio, and comprehensive ratio questions with exact formula-based options.
  - Previous values are preserved as `correct_content_review_original` where the answer index changed.
- Reviewed and repaired 15 General Test economics/current-affairs/data-interpretation questions in `questions/general-test/GT-S4.json`.
  - Fixed CRR/SLR lendable funds, rupee-depreciation import burden, stimulus multiplier, tariff revenue, CRAR, Finance Commission devolution, tax revenue, FDI top-sector share, export incentives, debt sustainability, microfinance repayment-cap, HDI-efficiency, and tax-rebate calculations.
- Reviewed and repaired a second batch of 13 Accountancy dissolution/realisation questions in `questions/accountancy/AC07.json`.
  - Fixed exact Realisation Account profit/loss, reserve and P&L balance distribution, partner asset takeovers, Garner v Murray deficiency allocation, loan/capital settlement, and internally inconsistent final-settlement data.
- Reviewed and repaired a third batch of 13 Accountancy dissolution/realisation questions in `questions/accountancy/AC08.json`.
  - Fixed partner expense-incentive treatment, Realisation Account balancing, partner capital after loss, asset/liability takeover effects, final settlement cash, loan/capital claim verification, and ambiguous deficit scenarios.
- Reviewed and repaired 13 Accountancy debenture-issue questions in `questions/accountancy/AC12.json`.
  - Fixed debenture issue proceeds, premium/discount offsets, first-year discount write-off, accrued interest, purchase-consideration debenture settlement, and Balance Sheet net-entry calculations.
- Reviewed and repaired 13 Accountancy comparative/common-size statement questions in `questions/accountancy/AC14.json`.
  - Fixed accrual salary treatment, common-size Balance Sheet validation, assertion-reason profitability logic, NPAT percentages, EBIT/NPAT change calculations, current-ratio/common-size inventory calculations, and option sets missing exact computed values.
- Reviewed and repaired 13 General Test data-interpretation questions in `questions/general-test/GT-S7.json`.
  - Fixed percentage growth, weighted average, market-share, sector-share, salary outgo, weighted salary, combined-rate, ratio, and nearest/exact option mismatches in graph/table questions.
- Reviewed and repaired 12 Economics balance-of-payments and exchange-rate questions in `questions/economics/EC11.json`.
  - Fixed BOP reserve-sign convention, current-account calculations, rupee conversion, trade-balance change, PPP/REER interpretation, external-debt burden, and option sets missing exact computed values.
- Reviewed and repaired 11 Economics consumer-equilibrium/budget/PPC questions in `questions/economics/EC01.json`.
  - Fixed budget-set boundary cases, MU-per-rupee equilibrium, budget-line intercepts, PPC intercept interpretation, transfer utility gain, and option sets missing exact computed values.
- Reviewed and repaired 11 General Test environment/science data questions in `questions/general-test/GT-S9.json`.
  - Fixed solar/wind power, heat capacity, emission-intensity, renewable-capacity target, community-solar revenue, macronutrient energy, lifecycle CO2, ecological pyramid, and bioremediation calculations.
- Reviewed and repaired 10 Economics rural-development/sustainable-development questions in `questions/economics/EC14.json`.
  - Fixed rural household income, sectoral productivity, mortality/human-capital value, forest-rights income, precautionary principle, groundwater sustainability, BCR, Pigouvian tax revenue, groundwater regulation rationale, and structural-transformation GDP-gain calculations.
- Reviewed and repaired 10 Economics India-China-Pakistan comparative-development questions in `questions/economics/EC15.json`.
  - Fixed per-capita GDP ratios, compound income growth, population projections, debt/GDP compounding, urbanisation, GDP base-effect calculations, income crossover year, education index, poverty reduction, and weighted scorecard calculations.
- Reviewed and repaired 10 English vocabulary/idiom questions in `questions/english/EN-S5.json`.
  - Fixed synonym/antonym answer indexes, completion items, idiom meanings, and explanation wording that falsely triggered ambiguity/mismatch audit rules.
- Reviewed and repaired 9 Economics government-budget/deficit questions in `questions/economics/EC10.json`.
  - Fixed fiscal deficit, primary deficit, revenue deficit, effective revenue deficit, BCR-like target arithmetic, policy change effects, and option sets missing exact budget calculations.
- Reviewed and repaired 9 General Test Indian Geography questions in `questions/general-test/GT-S3.json`.
  - Fixed river/delta clue wording, rice MSP revenue, longitude-based local solar time, crop revenue per hectare, freshwater-per-capita ratio, agricultural water-use efficiency, state-area percentage, wheat yield gain, and water-harvesting storage calculations.
- Reviewed and repaired 8 Economics money-and-banking questions in `questions/economics/EC08.json`.
  - Fixed CRR liquidity release, Quantity Theory price level, deposit-chain money creation, CRR/SLR compliance, mixed fiscal-monetary policy effects, required CRR reduction, Taylor Rule rate calculation, and endogenous-money assertion-reason answer key.
- Reviewed and repaired 7 Accountancy retirement/reconstitution questions in `questions/accountancy/AC06.json`.
  - Fixed retiring-partner loan interest, deceased-partner profit by sales method, final settlement after revaluation/reserve/goodwill, new ratio after retirement, contingent-liability revaluation treatment, and combined settlement for retiring partners.
- Reviewed and repaired 7 Accountancy cash-flow questions in `questions/accountancy/AC16.json`.
  - Fixed plant-purchase cash outflow, indirect operating cash flow, expenses paid from prepaid/outstanding balances, direct-method operating cash flow, tax-adjusted operating cash flow, interest received, and accumulated-depreciation T-account calculations.
- Reviewed and repaired 7 Economics liberalisation/globalisation questions in `questions/economics/EC13.json`.
  - Fixed privatisation fiscal saving, effective rate of protection, trade welfare gains, GM-seed profit change wording, regulatory-capture answer key, tariff-elasticity import response, and logistics-cost export-impact calculations.
- Reviewed and repaired 6 Economics national-income accounting questions in `questions/economics/EC06.json`.
  - Fixed National Income conversion, NDP at factor cost, net-exports GDP calculation, inter-firm value-added chain consistency, expenditure-method GDP, and GDP-deflator/real-growth interpretation.
- Reviewed and repaired 6 General Test Indian Polity questions in `questions/general-test/GT-S1.json`.
  - Fixed quorum wording, NOTA judgment answer key, constitutional-majority matching, Zero Hour answer key, Tenth Schedule judicial-review answer key, and National Emergency special-majority calculation.
- Reviewed and repaired 5 Economics Indian-development questions in `questions/economics/EC12.json`.
  - Fixed Green Revolution revenue comparison, Harrod-Domar aid growth rate, 1966 devaluation exchange-rate wording, PSU breakeven result, and inflation-adjusted plan-expenditure growth.
- Reviewed and repaired 4 Business Studies nature/significance of management questions in `questions/business-studies/BS01.json`.
  - Cleaned middle-management, matrix-structure, management-as-art/science, and multinational coordination explanations that were conceptually correct but triggered ambiguity/none-match wording flags.
- Reviewed and repaired 2 General Test modern-history questions in `questions/general-test/GT-S2.json`.
  - Cleaned Constitution-enforcement day-count wording and corrected the Purna Swaraj answer key/explanation.
- Reviewed and repaired 38 duplicate-option questions across Accountancy, Economics, and General Test.
  - Replaced repeated distractors with distinct options and corrected answer keys where the worked explanation proved the repeated option had hidden a wrong key.
- Expanded 8 thin explanations in `questions/2025-questions.json` and `questions/economics/EC09.json`.
  - Added reasoning for 2025 Accountancy sequence/case items and corrected EC09 multiplier/APC answer keys while expanding formula explanations.
- Added `scripts/audit-past-year-readiness.mjs`.
  - Audits extracted previous-year JSON content for answer mapping, four usable options, OCR/page pollution, answer/solution leakage, placeholder options, and weak prompts/options.
  - Writes `past year paper/source-readiness-audit.json`, a strict `past year paper/student-ready-index.json`, expanded file-level manual review queues, and question-level review queues in JSON/CSV.
  - Rewired `npm run pyp:ready-index` to use this strict content audit instead of copying optimistic source-level readiness flags.
  - Added `past year paper/question-review-queue.json` and `past year paper/question-review-queue.csv` so past-year cleanup can proceed one extracted question at a time, with issue tags, prompt previews, option previews, and source file paths.
  - Refined weak-option detection so valid short CUET options such as `by`, `80`, and Roman numerals are not treated as OCR pollution.
  - Relaxed prompt line-count handling for legitimate wrapped case-study passages while keeping page-artifact and answer-leak checks active.
- Added `scripts/audit-past-year-coverage.mjs`.
  - Compares strict-ready past-year questions against the generated subject bank using normalized text similarity.
  - Writes `past year paper/coverage-audit.json`, `past year paper/add-candidate-queue.json`, `past year paper/add-candidate-queue.csv`, and `past year paper/duplicate-review-queue.json`.
  - Keeps unsafe OCR/source-review questions blocked from add-candidate status until they pass the readiness audit.
  - Uses option-overlap context to prevent generic prompts from falsely blocking distinct previous-year questions as duplicates.
- Added `scripts/build-pyp-import-pack.mjs`.
  - Converts strict-ready add candidates into clean import packs with source IDs, source paths, normalized difficulty labels, cleaned explanations, and deterministic chapter/topic suggestions.
  - Writes import packs for 2024-2025 Accountancy, 2023-2024 Economics, 2024 Business Studies, 2025 Business Studies, 2022-2025 English, and 2022-2025 General Test under `past year paper/import-packs/`.
  - Expanded English topic inference for newly promoted vocabulary/preposition, reading-comprehension, and one-word-substitution questions so ready source questions do not remain blocked at the import-pack layer.
  - Added Accountancy PYQ routing for goodwill, financial statements, cash flow, not-for-profit organisations, and computerised accounting supplemental topics.
  - Added Economics PYQ routing for microeconomics, macroeconomics, Indian economy, reforms, development challenges, and open-economy topics.
  - Added General Test PYQ routing for quantitative aptitude, logical reasoning, general awareness, and general aptitude topics.
- Corrected one OCR option artifact in `past year paper/2025/english/json/individual-pdfs/2025-english-may-20-02-solutions.json` from `adjust 6` to `adjust`, supported by the paired clean source and explanation text.
- Corrected high-confidence Accountancy PYQ source issues in 2023/2024 individual PDFs: interest coverage ratio, goodwill average-profit calculation, NPO matching, medicine-consumption explanation, spreadsheet workbook default, and small page-number OCR artifacts.
- Removed two polluted duplicate extraction rows from 2024 Accountancy and 2025 English individual PDFs where a clean row with the same source question ID was already present.
- Promoted `past year paper/2022/english/json/2022-english.json` after repairing the no-space OCR passage for the final reading-comprehension block, moving the cleaned passage into structured `passage` fields, and keeping only actual question stems in `question`.
- Promoted `past year paper/2025/english/json/individual-pdfs/2025-english-04-question-paper.json` after repairing Q10's missing answer, replacing a duplicate sequence distractor, and adding a full para-jumble explanation.
- Promoted `past year paper/2025/english/json/individual-pdfs/2025-english-05-question-paper.json` after repairing Q2 and Q4 missing para-jumble answers, including one OCR-corrupted sequence option.
- Promoted `past year paper/2023/general-test/json/individual-pdfs/2023-general-test-02-question-paper.json` after replacing Q15's solution-leakage/polluted options with the clean railway reservation-charge MCQ from the main 2023 General Test extraction.
- Promoted `past year paper/2025/general-test/json/2025-general-test.json` after repairing shifted/polluted explanations for Q4, Q5, Q10, and Q11; corrected Q4 and Q10 answer keys; and converted Q11 into a proper statement-combination MCQ.
- Promoted `past year paper/2023/general-test/json/2023-general-test.json` after cleaning Q09's dense/malformed fraction prompt and explanation while preserving the verified answer.
- Promoted `past year paper/2022/general-test/json/2022-general-test.json` after repairing Q27's wrong answer key and OCR-heavy stem/explanation, Q31's ordinal option typo, and Q42/Q46 next-question leakage.
- Updated `scripts/build-question-index.mjs`.
  - Past-year entries now use `source-readiness-audit.json` as the authority for `readyForStudentUse`, `needsReview`, answer-mapped counts, and review reasons.
  - This prevents OCR-polluted past-year files from being marked student-ready through the older optimistic import metadata.
  - Adds `pyp-import-pack` entries so curated additions are discoverable without merging them into generated chapter pools prematurely.
- Strengthened `scripts/validate-question-bank-index.mjs`.
  - Validates indexed source paths by reading the source JSON, checking source question counts, mapped-answer counts, import-pack IDs, source queues, and chapter/topic review counts.
- Rebuilt `question-bank-index.json`.

## Current Audit Status

Baseline structural audit:

- JSON files scanned: 58
- Questions found: 11,430
- Parse errors: 0
- Shape issues: 0
- Missing required fields: 0
- Correct-index issues: 0
- Suspicious keys: 0

Content audit:

- NTA guideline/format issues: 0
- Explicit answer mentions checked: 686
- Remaining answer/explanation conflicts: 3
- Broken or ambiguous explanations requiring subject review: 0
- Duplicate-option flags: 0
- Thin explanations: 0

The remaining 3 answer/explanation conflicts are wording false positives in the audit, not safe automatic fixes:

- `questions/accountancy/AC03.json` `ACO3Q54`
- `questions/accountancy/AC15.json` `AC15Q180`
- `questions/business-studies/BS01.json` `BS01Q108`

Past-year source-readiness audit:

- Extracted past-year JSON files scanned: 111
- Extracted past-year questions scanned: 3,698
- Answer indexes mapped: 1,950
- Strict student-ready files: 50
- Strict student-ready questions: 1,325
- Files needing manual/source review: 61
- Questions in files needing review: 2,373
- Specific extracted questions needing review: 2,102
- Current strict ready files:
  - One strict-ready 2023 Accountancy individual solutions PDF
  - `past year paper/2022/english/json/2022-english.json`
  - `past year paper/2022/general-test/json/2022-general-test.json`
  - `past year paper/2023/economics/json/2023-economics.json`
  - `past year paper/2023/english/json/2023-english.json`
  - `past year paper/2023/general-test/json/2023-general-test.json`
  - One strict-ready 2023 English individual solutions PDF
  - One strict-ready 2023 General Test individual question-paper JSON
  - `past year paper/2023/business-studies/json/2023-business-studies.json`
  - One strict-ready 2024 Accountancy individual solutions PDF
  - Four 2024 Business Studies individual solution PDFs
  - Four strict-ready 2024 Economics individual PDFs
  - `past year paper/2025/business-studies/json/2025-business-studies.json`
  - `past year paper/2025/general-test/json/2025-general-test.json`
  - One strict-ready 2025 Business Studies individual question-paper JSON
  - One strict-ready 2025 Accountancy individual solutions PDF
  - `past year paper/2025/english/json/2025-english.json`
  - Twenty-six strict-ready 2025 English individual PDFs
  - Additional reviewed-but-gated file: `past year paper/2025/english/json/individual-pdfs/2025-english-09-question-paper.json` has 15 of 16 questions reviewed and corrected, but remains gated because Q16 contains a source-level typo (`Absturb`) in the PDF and should not be student-ready without a replacement/official correction.
  - Additional partially reviewed file: `past year paper/2025/accountancy/json/individual-pdfs/2025-accountancy-01-question-paper.json` has 7 of 11 questions reviewed and corrected, but remains gated because Q1, Q3, Q8, and Q11 compute to answers not present in the extracted option set.
- Review reasons by file:
  - Missing or invalid answer mapping: 50 files
  - Weak or polluted option text: 55 files
  - Weak or polluted prompt text: 41 files
  - Page/OCR artifacts: 37 files
  - Placeholder options: 15 files
  - Low source confidence: 1 file
- Question-level issue counts:
  - Missing or invalid answer mapping: 1,748 questions
  - Weak or polluted option text: 256 questions
  - Placeholder option text: 259 questions
  - Weak or polluted prompt text: 132 questions
  - Page/OCR artifacts: 70 questions
  - Low source confidence: 37 questions
  - Answer/solution leakage: 0 questions

The previous `student-ready-index.json` was too optimistic because it inherited readiness from `import-index.json` without reading each extracted question. It now includes only files that pass the stricter content audit. Rejected files are listed in `manual-review-queue.json` and `manual-review-queue.csv`; individual extracted questions needing one-by-one review are listed in `question-review-queue.json` and `question-review-queue.csv`.

Past-year coverage/addition audit:

- Generated-bank questions compared: 11,430
- Past-year questions considered: 3,698
- Past-year questions currently strict-ready for addition/comparison: 1,325
- Past-year questions blocked until source/OCR review: 2,373
- Ready past-year questions already covered by generated bank: 1
- Ready past-year possible duplicates requiring comparison: 5
- Ready past-year add candidates: 1,319
- Current add candidates come from 2023-2025 Accountancy, 2023-2024 Economics, 2023-2025 Business Studies, 2022-2025 English, strict-ready 2025 English-content PDFs, and 2022-2025 General Test.

Ready-addition import packs:

- Import-pack questions prepared: 1,323
- Schema issues: 0
- Invalid answer indexes: 0
- Thin explanations: 0
- Import-pack chapter/topic review flags: 0
- 2024-2025 Accountancy questions prepared: 108
- 2024-2025 Accountancy chapter suggestions ready: 108
- 2024-2025 Accountancy chapter review needed: 0
- 2024-2025 Accountancy suggested chapter distribution:
  - AC02 Capital & Profit Sharing: 8
  - AC04 Goodwill: 13
  - AC05 Admission of a Partner: 12
  - AC07 Dissolution of Partnership Firm: 8
  - AC11 Forfeiture & Reissue of Shares: 18
  - AC13 Financial Statements: 5
  - AC15 Accounting Ratios: 30
  - AC16 Cash Flow Statement: 4
  - Supplemental PYQ Topic: Not-for-Profit Organisations: 4
  - Supplemental PYQ Topic: Computerised Accounting: 6
- 2023-2024 Economics questions prepared: 238
- 2023-2024 Economics chapter suggestions ready: 238
- 2023-2024 Economics chapter review needed: 0
- 2024 Business Studies questions prepared: 200
- 2024 Business Studies chapter suggestions ready: 200
- 2024 Business Studies chapter review needed: 0
- 2023 Business Studies questions prepared: 50
- 2023 Business Studies chapter suggestions ready: 50
- 2023 Business Studies chapter review needed: 0
- 2023 Business Studies suggested chapter distribution:
  - BS01 Nature and Significance of Management: 2
  - BS02 Principles of Management: 3
  - BS03 Business Environment: 2
  - BS04 Planning: 12
  - BS05 Organising: 4
  - BS06 Staffing: 7
  - BS07 Directing: 5
  - BS08 Controlling: 4
  - BS09 Business Finance: 2
  - BS11 Marketing: 5
  - BS12 Consumer Protection: 3
  - Supplemental PYQ Topic: Entrepreneurship Development: 1
- Business Studies questions prepared: 65
- Business Studies chapter suggestions ready: 65
- Business Studies chapter review needed: 0
- 2025 Business Studies suggested chapter distribution:
  - BS01 Nature and Significance of Management: 11
  - BS02 Principles of Management: 2
  - BS03 Business Environment: 3
  - BS04 Planning: 9
  - BS05 Organising: 3
  - BS06 Staffing: 9
  - BS07 Directing: 9
  - BS08 Controlling: 3
  - BS09 Business Finance: 2
  - BS11 Marketing: 8
  - BS12 Consumer Protection: 3
  - Supplemental PYQ Topic: Entrepreneurship Development: 2
- English questions prepared: 495
- English topic suggestions ready: 495
- English topic review needed: 0
- English topic distribution:
  - Grammar and usage: 232
  - Literary devices: 3
  - Reading comprehension: 33
  - Vocabulary and usage: 176
  - Writing and communication: 48
  - Verbal reasoning: 3
- 2022-2025 General Test questions prepared: 167
- 2022-2025 General Test topic suggestions ready: 167
- 2022-2025 General Test topic review needed: 0
- 2022-2025 General Test topic distribution:
  - Quantitative aptitude: 102
  - Logical reasoning: 18
  - General awareness: 13
  - General aptitude: 34

Question-bank index exposure now matches strict readiness:

- Total question-bank index entries: 175
- Past-year index entries including import packs: 118
- Ready past-year entries including import packs: 57
- Review-only past-year entries: 61
- Raw past-year questions indexed for upload: 5,021
- Import-pack index entries: 7
- Import-pack questions indexed: 1,323
- Ready import-pack index entries: 7
- Import-pack chapter/topic review flags: 0

## Chapter And Question-Pool Notes

Current chapter pools are strong enough for NTA-style mocks:

- Accountancy: 3,230 questions available, plus 2025 nested set.
- Business Studies: 2,400 questions.
- Economics: 3,000 questions.
- English: 1,000 questions.
- General Test: 1,800 questions.

Priority expansion/cleanup areas:

- `questions/accountancy/AC03.json` has 180 questions; most other generated chapters have 200.
- Past-year JSON extraction under `past year paper/.../json` still has many OCR-heavy entries and is not yet clean enough to rely on as polished student-facing content. The strict ready index currently exposes 50 raw past-year files as ready.
- The 1,319 strict-ready Accountancy, Business Studies, Economics, English, and General Test past-year questions are add candidates; 1 additional ready question is already covered by the generated bank, and 5 require duplicate review before adding.
- The generated question-bank JSON now has 0 broken/ambiguous explanation flags, 0 duplicate-option flags, and 0 thin-explanation flags in `cuet-content-audit.json`.
- `questions/accountancy/AC01.json` has been reduced from 70 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/accountancy/AC11.json` has been reduced from 66 flags to 24 flags for the broken/ambiguous explanation audit dimension.
- `questions/accountancy/AC15.json` has been reduced from 61 flags to 16 flags for the broken/ambiguous explanation audit dimension.
- `questions/accountancy/AC08.json` has been reduced from 50 flags to 13 flags for the broken/ambiguous explanation audit dimension.
- `questions/general-test/GT-S6.json` has been reduced from 45 flags to 21 flags for the broken/ambiguous explanation audit dimension.
- `questions/accountancy/AC02.json` has been reduced from 40 flags to 16 flags for the broken/ambiguous explanation audit dimension.
- `questions/accountancy/AC07.json` has been reduced from 36 flags to 13 flags for the broken/ambiguous explanation audit dimension.
- `questions/accountancy/AC06.json` has been reduced from 31 flags to 7 flags for the broken/ambiguous explanation audit dimension.
- `questions/accountancy/AC10.json` has been reduced from 31 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/accountancy/AC04.json` has been reduced from 30 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/general-test/GT-S8.json` has been reduced from 28 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/accountancy/AC05.json` has been reduced from 27 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/accountancy/AC03.json` has been reduced from 26 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/accountancy/AC11.json` has been reduced from 66 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/economics/EC05.json` has been reduced from 24 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/economics/EC04.json` has been reduced from 23 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/accountancy/AC13.json` has been reduced from 22 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/economics/EC09.json` has been reduced from 22 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/economics/EC02.json` has been reduced from 21 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/general-test/GT-S6.json` has been reduced from 45 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/business-studies/BS05.json` has been reduced from 20 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/general-test/GT-S5.json` has been reduced from 20 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/economics/EC03.json` has been reduced from 19 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/economics/EC07.json` has been reduced from 19 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/accountancy/AC09.json` has been reduced from 18 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/accountancy/AC02.json` has been reduced from 40 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/accountancy/AC15.json` has been reduced from 61 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/general-test/GT-S4.json` has been reduced from 15 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/accountancy/AC07.json` has been reduced from 36 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/accountancy/AC08.json` has been reduced from 50 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/accountancy/AC12.json` has been reduced from 13 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/accountancy/AC14.json` has been reduced from 13 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/general-test/GT-S7.json` has been reduced from 13 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/economics/EC11.json` has been reduced from 12 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/economics/EC01.json` has been reduced from 11 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/general-test/GT-S9.json` has been reduced from 11 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/economics/EC14.json` has been reduced from 10 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/economics/EC15.json` has been reduced from 10 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/english/EN-S5.json` has been reduced from 10 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/economics/EC10.json` has been reduced from 9 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/general-test/GT-S3.json` has been reduced from 9 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/economics/EC08.json` has been reduced from 8 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/accountancy/AC06.json` has been reduced from 31 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/accountancy/AC16.json` has been reduced from 7 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/economics/EC13.json` has been reduced from 7 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/economics/EC06.json` has been reduced from 6 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/general-test/GT-S1.json` has been reduced from 6 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/economics/EC12.json` has been reduced from 5 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/business-studies/BS01.json` has been reduced from 4 flags to 0 flags for the broken/ambiguous explanation audit dimension.
- `questions/general-test/GT-S2.json` has been reduced from 2 flags to 0 flags for the broken/ambiguous explanation audit dimension.

## Recommended Next Pass

1. The broken/ambiguous explanation queue is now clear. The remaining content-audit conflicts are the 3 known wording false positives listed above.
2. Optional next cleanup areas:
   - Clean OCR-heavy past-year JSON under `past year paper/.../json` before using those entries as polished student-facing content.
   - Expand `questions/accountancy/AC03.json` from 180 to 200 questions if uniform chapter size is required.
   - Add a source-review workflow for the 2025 nested questions whose original statement labels are missing from OCR extraction.
3. After any further content edits, rerun:

```powershell
node scripts\audit-questions.mjs questions
node scripts\audit-cuet-content.mjs
npm run build:question-index
```
