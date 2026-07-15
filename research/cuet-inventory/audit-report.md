# CUETAce predictor data audit

Audit date: 2026-07-14

The production catalogue currently stores 244 as an NTA institution total but only a small commerce-first set of programme records. Several records use a placeholder college value such as University of Delhi colleges; that is not a constituent-college inventory.

The required hierarchy is: NTA participating institution -> university/institution -> constituent college/campus -> programme -> Class XII eligibility + CUET subjects + marks + category/quota + counselling + seats + historical evidence.

The current predictor logic matches programme-level stream/subject/minimum-mark rules and sums stored CUET alternatives. It does not yet model constituent colleges, college-specific seat matrices, category-wise allocations, source verification status or different scoring scales. Frontend files were intentionally left unchanged.

NTA top-level institution registry: 244 records. College/campus and programme records in this release: 60 priority records across four institutions.

See missing-documents.csv for the per-institution document gap tracker. No missing eligibility or cutoff value was inferred.