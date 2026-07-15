import fs from 'node:fs/promises';
import path from 'node:path';

const repo = process.env.CUET_REPO || 'C:\\Users\\thisi\\Documents\\New project\\CUETAce';
const researchDir = path.join(repo, 'research', 'cuet-inventory');
const output = path.join(repo, 'assets', 'data', 'predictor-catalogue.js');

const subjects = [
  { id: 'English', label: 'English', type: 'language' },
  { id: 'Hindi', label: 'Hindi', type: 'language' },
  { id: 'Accountancy', label: 'Accountancy / Book Keeping', type: 'domain' },
  { id: 'Business Studies', label: 'Business Studies', type: 'domain' },
  { id: 'Economics', label: 'Economics / Business Economics', type: 'domain' },
  { id: 'Mathematics', label: 'Mathematics / Applied Mathematics', type: 'domain' },
  { id: 'Computer Science', label: 'Computer Science / Informatics Practices', type: 'domain' },
  { id: 'General Test', label: 'General Aptitude Test', type: 'general' }
];

const paperMap = new Map([
  ['english', 'English'], ['hindi', 'Hindi'], ['accountancy/book keeping', 'Accountancy'], ['accountancy', 'Accountancy'],
  ['business studies', 'Business Studies'], ['economics/business economics', 'Economics'], ['economics', 'Economics'],
  ['mathematics/applied mathematics', 'Mathematics'], ['mathematics', 'Mathematics'],
  ['computer science/informatics practices', 'Computer Science'], ['computer science', 'Computer Science'],
  ['general aptitude test', 'General Test'], ['general test', 'General Test']
]);

function paperId(value) {
  const withoutCode = String(value || '').replace(/\s*\(\d+\)\s*$/, '').trim().toLowerCase();
  return paperMap.get(withoutCode) || String(value || '').replace(/\s*\(\d+\)\s*$/, '').trim();
}

function slug(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function looseNameKey(value) {
  return String(value || '').toLowerCase().replace(/&/g, 'and').replace(/\(morning\)|\(evening\)|\(w\)|for women|college|the|[^a-z0-9]/g, '');
}

function firstSource(record) {
  return record.sources?.find((source) => source?.url) || null;
}

function sourceDetails(record) {
  return (record.sources || []).map((source) => ({
    url: source.url,
    documentTitle: source.documentTitle,
    pageOrSection: source.pageOrSection,
    admissionYear: source.admissionYear ?? null,
    lastVerified: source.lastVerified,
    verificationStatus: source.verificationStatus
  }));
}

const inventory = JSON.parse(await fs.readFile(path.join(researchDir, 'college-inventory.json'), 'utf8'));
const summary = JSON.parse(await fs.readFile(path.join(researchDir, 'college-inventory-summary.json'), 'utf8'));
const registry = JSON.parse(await fs.readFile(path.join(researchDir, 'institution-registry.json'), 'utf8'));
const duOfficialList = JSON.parse(await fs.readFile(path.join(researchDir, 'du-official-college-list-2026.json'), 'utf8'));
const allRecords = inventory.records;
const actionable = allRecords.filter((record) => record.recordType === 'collegeProgramme' && record.collegeOrCampus && record.programme && record.classXIIEligibility?.status === 'verified' && record.cuetSubjectRequirements?.status === 'verified');

const programmes = actionable.map((record) => {
  const source = firstSource(record);
  const alternatives = (record.cuetSubjectRequirements.alternatives || []).map((combo) => combo.map(paperId));
  const historical = record.historicalCutoffs?.status === 'verified'
    ? Object.entries(record.historicalCutoffs.observations || {}).map(([category, score]) => ({ year: record.historicalCutoffs.year, round: record.historicalCutoffs.round || null, category, score, label: `${record.historicalCutoffs.metric || 'Historical closing score'} - guidance only`, source: record.historicalCutoffs.source?.url || source?.url }))
    : [];
  return {
    id: record.id,
    institution: record.parentInstitution.name,
    category: record.parentInstitution.ntaType,
    college: record.collegeOrCampus.officialName,
    collegeType: record.collegeOrCampus.collegeType,
    city: record.collegeOrCampus.location,
    programme: record.programme.name,
    admissionYear: record.admissionYear,
    stream: ['Commerce'],
    classXII: { requiredSubjects: [], anyOfSubjects: [], minAggregate: record.classXIIEligibility.minimumMarks ?? null, note: record.classXIIEligibility.qualification, status: record.classXIIEligibility.status },
    cuet: { alternatives, status: record.cuetSubjectRequirements.status, paperCodes: record.cuetSubjectRequirements.paperCodes || [] },
    score: null,
    historical,
    route: record.counsellingRoute?.name || 'Official counselling route unavailable',
    seats: record.seats,
    quota: record.categoryQuota,
    sources: sourceDetails(record),
    evidence: source?.url || null,
    evidenceLabel: source ? `${source.documentTitle} - ${source.pageOrSection}` : 'Official source metadata unavailable',
    status: 'verified'
  };
});

const coverageMap = new Map();
for (const record of allRecords) {
  const college = record.collegeOrCampus;
  if (!college?.officialName) continue;
  const key = `${record.parentInstitution.name}|${college.officialName}`;
  if (!coverageMap.has(key)) {
    const source = firstSource(record);
    coverageMap.set(key, {
      id: slug(key),
      institution: record.parentInstitution.name,
      category: record.parentInstitution.ntaType,
      college: college.officialName,
      collegeType: college.collegeType,
      entityType: college.entityType,
      city: college.location || 'Location unavailable',
      nameStatus: college.nameStatus || 'incomplete',
      programmeCount: 0,
      verifiedProgrammeCount: 0,
      programmes: [],
      source: source ? { url: source.url, documentTitle: source.documentTitle, pageOrSection: source.pageOrSection, admissionYear: source.admissionYear, lastVerified: source.lastVerified, verificationStatus: source.verificationStatus } : null
    });
  }
  const entry = coverageMap.get(key);
  if (record.programme) {
    entry.programmeCount += 1;
    if (!entry.programmes.includes(record.programme.name)) entry.programmes.push(record.programme.name);
    if (record.verificationStatus === 'verified' && record.classXIIEligibility?.status === 'verified' && record.cuetSubjectRequirements?.status === 'verified') entry.verifiedProgrammeCount += 1;
  }
}

const duExisting = [...coverageMap.values()].filter((entry) => entry.institution === 'University of Delhi');
for (const key of [...coverageMap.keys()]) if (key.startsWith('University of Delhi|')) coverageMap.delete(key);
for (const official of duOfficialList.records) {
  const matched = duExisting.find((entry) => looseNameKey(entry.college) === looseNameKey(official.officialName));
  const officialSource = { url: official.sourceUrl, documentTitle: official.documentTitle, pageOrSection: official.pageOrSection, admissionYear: official.admissionYear, lastVerified: official.lastVerified, verificationStatus: official.verificationStatus };
  const entry = matched ? { ...matched, id: slug(`University of Delhi|${official.officialName}`), college: official.officialName, collegeType: official.section === 'Other Institutions' ? 'institute' : 'college', entityType: official.section === 'Other Institutions' ? 'institute' : 'college', nameStatus: 'verified', source: officialSource } : {
    id: slug(`University of Delhi|${official.officialName}`), institution: 'University of Delhi', category: 'Central University', college: official.officialName, collegeType: official.section === 'Other Institutions' ? 'institute' : 'college', entityType: official.section === 'Other Institutions' ? 'institute' : 'college', city: 'Delhi', nameStatus: 'verified', programmeCount: 0, verifiedProgrammeCount: 0, programmes: [], source: officialSource
  };
  coverageMap.set(`University of Delhi|${official.officialName}`, entry);
}
const collegeCoverage = [...coverageMap.values()].sort((a, b) => `${a.institution}|${a.college}`.localeCompare(`${b.institution}|${b.college}`));

const data = {
  metadata: {
    cycle: 2026,
    verifiedOn: inventory.generatedOn,
    institutionCounts: Object.fromEntries(registry.institutions.reduce((map, institution) => { const type = institution.ntaType || 'Unknown'; const key = type === 'Other Government' ? 'otherGovernment' : type.toLowerCase().replaceAll(' ', ''); map.set(key, (map.get(key) || 0) + 1); return map; }, new Map())),
    institutionTotal: summary.coverage.parentInstitutionsFound,
    catalogueSource: 'https://cuet.nta.nic.in/participating-universities/',
    researchSource: 'https://www.du.ac.in/index.php?page=colleges-at-du',
    inventory: summary.coverage,
    liveRecommendationRows: programmes.length,
    recommendationBoundary: 'Only rows with verified Class XII eligibility and verified CUET subject requirements are used for live recommendations. Other named colleges/programmes remain coverage evidence only.'
  },
  subjects,
  programmes,
  collegeCoverage
};

const banner = `/* Generated from research/cuet-inventory/college-inventory.json on ${inventory.generatedOn}. Do not edit manually; rebuild from the audited research pack. */\n`;
await fs.writeFile(output, `${banner}window.CUET_PREDICTOR_DATA = ${JSON.stringify(data)};\n`, 'utf8');
await fs.writeFile(path.join(researchDir, 'production-integration-report.md'), `# CUETAce production predictor integration\n\nGenerated: ${inventory.generatedOn}\n\n- Live recommendation rows: ${programmes.length}\n- Named college/campus/institute coverage rows: ${collegeCoverage.length}\n- Parent institutions in the audited inventory: ${summary.coverage.parentInstitutionsFound}\n- DU official names: ${summary.coverage.officialDuUniqueNames}\n- Allahabad University official college names: 11\n- BHU B.Com admission locations: 7\n\nThe predictor uses only rows with verified Class XII eligibility and verified CUET subject requirements for live recommendations. Incomplete research remains visible as coverage evidence and is not scored or presented as guaranteed eligibility.\n`);
console.log(JSON.stringify({ output, liveRecommendationRows: programmes.length, collegeCoverageRows: collegeCoverage.length, inventory: summary.coverage }, null, 2));
