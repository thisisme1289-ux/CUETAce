import fs from 'node:fs/promises';
import path from 'node:path';
import { SpreadsheetFile, Workbook } from '@oai/artifact-tool';

const repo = process.env.CUET_REPO || 'C:\\Users\\thisi\\Documents\\New project\\CUETAce';
const outDir = path.join(repo, 'research', 'cuet-inventory');
const lastVerified = '2026-07-14';
const urls = {
  ntaList: 'https://cuet.nta.nic.in/participating-universities/',
  ntaDu: 'https://cuet.nta.nic.in/university-of-delhi/',
  ntaBhu: 'https://cuet.nta.nic.in/banaras-hindu-university/',
  ntaAu: 'https://cuet.nta.nic.in/university-of-allahabad/',
  ntaIpu: 'https://cuet.nta.nic.in/guru-gobind-singh-indraprastha-university/',
  duSeat: 'https://admission.uod.ac.in/userfiles/downloads/03-07-2026-UGSeatMatrix2026.pdf',
  duCsas: 'https://admission.uod.ac.in/userfiles/downloads/UG-CSAS_26062026.pdf',
  duColleges: 'https://www.du.ac.in/?page=colleges-at-du',
  duBulletin: 'https://admission.uod.ac.in/userfiles/downloads/2025/07032025_UG-BOI_compressed-1.pdf',
  duCutoff: 'https://admission.uod.ac.in/2025/userfiles/downloads/2025/19072025_CutOff_UG_Round_One.pdf',
  bhuBulletin: 'https://www.bhu.ac.in/Images/files/UG%20Bulletin%202025.pdf',
  auBulletin: 'https://allduniv.ac.in/upload/file_collection/UG%20Information%20Bulletin_2026.pdf',
  auAdmissions: 'https://allduniv.ac.in/p/694/ug-admissions-2025',
  auDirectory: 'https://allduniv.ac.in/administration/telephone-directory',
  auSelfDisclosure: 'https://allduniv.ac.in/upload/file_collection/Public%20Self%20Disclosure%20UoA.pdf',
  auAnnualReport: 'https://www.allduniv.ac.in/upload/Annual_Report/Annual-Report-2021-22-English.pdf',
  ipuCh13: 'https://ipu.ac.in/adm2026/adm2026br/br280126ugprg/ch13.pdf',
  ipuBrochure: 'https://ipu.ac.in/adm2026/adm2026undergraduate.php',
  ipuSchedule: 'https://ipu.admissions.nic.in/schedule-notices/'
};

const src = (url, documentTitle, pageOrSection, admissionYear, verificationStatus = 'verified', note = null) => ({ url, documentTitle, pageOrSection, admissionYear, lastVerified, verificationStatus, ...(note ? { note } : {}) });
const unavailable = (note = 'Not located in the audited official documents; no inference made.') => ({ status: 'unavailable', note });
const incomplete = (note) => ({ status: 'incomplete', note });
const slug = (value) => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const json = (value) => value == null ? '' : JSON.stringify(value, null, 0);
const normalizeSource = (value) => ({ ...value, pageOrSection: value.pageOrSection || (value.page ? `PDF p. ${value.page}` : 'Section/page unavailable in extracted evidence'), admissionYear: value.admissionYear ?? null, lastVerified: value.lastVerified || lastVerified, verificationStatus: value.verificationStatus || 'incomplete' });
const collegeTypeFor = (entityType, explicit) => explicit || (entityType === 'affiliated college' ? 'affiliated' : entityType === 'affiliated institute' ? 'institute' : entityType === 'faculty/location' ? 'faculty' : entityType === 'campus' || entityType === 'college/campus' ? 'campus' : entityType === 'college' ? 'college' : entityType || 'institution-level only');

function makeRecord({ recordType = 'collegeProgramme', parent, parentType, college = null, programme = null, admissionYear, eligibility, cuet, quota, seats, counselling, cutoffs, sources, verificationStatus, notes = [] }) {
  return {
    recordType,
    id: slug([parent, college?.officialName, programme?.name, admissionYear].filter(Boolean).join('-')),
    admissionYear: admissionYear ?? null,
    parentInstitution: { id: slug(parent), name: parent, ntaType: parentType || null },
    collegeOrCampus: college ? { ...college, collegeType: collegeTypeFor(college.entityType, college.collegeType), affiliationStatus: college.affiliationStatus || (college.entityType === 'college' ? 'not stated in the audited source' : undefined) } : null,
    programme,
    classXIIEligibility: eligibility,
    cuetSubjectRequirements: cuet,
    categoryQuota: quota,
    seats,
    counsellingRoute: counselling,
    historicalCutoffs: cutoffs,
    sources: (sources || []).map(normalizeSource),
    verificationStatus,
    notes
  };
}

const commonDuEligibility = incomplete('DU seat matrix does not reproduce Class XII rules per row. The 2025 bulletin was audited for the common framework, but programme-specific 2026 minimum marks were not transcribed here.');
const commonDuCuet = incomplete('DU seat matrix does not reproduce CUET subject combinations. Cross-reference the current DU programme-specific bulletin before using this row for prediction.');
const duCounselling = { name: 'DU CSAS-UG 2026', status: 'verified', note: 'Single-window allocation route for DU undergraduate programmes.', source: src(urls.duCsas, 'UG CSAS 2026, University of Delhi', 'General Information / CSAS-UG 2026 route', 2026) };
const noQuota = unavailable('The audited source gives no programme-specific category/quota rule in this row.');

const duHistorical = (collegeName, programme) => {
  if (collegeName === 'Shri Ram College of Commerce' && programme === 'B.Com. (Hons.)') return {
    status: 'verified', historicalGuidanceOnly: true, metric: 'Round 1 minimum allocation score', year: 2025,
    observations: { UR: 917.4305733, OBC: 849.420209, SC: 792.4889146, ST: 747.5161822, EWS: 874.1215703, PwBD: 726.8842867 },
    source: src(urls.duCutoff, 'UG Round One allocation/minimum scores 2025, University of Delhi', 'p. 67; Shri Ram College of Commerce B.Com. (Hons.)', 2025, 'verified', 'Historical guidance only; not guaranteed admission.')
  };
  if ((collegeName === 'Miranda House' || collegeName === 'Miranda House (W)') && programme === 'B.A. (Hons.) English') return {
    status: 'verified', historicalGuidanceOnly: true, metric: 'Round 1 minimum allocation score', year: 2025,
    observations: { UR: 863.0249541, OBC: 765.66332, SC: 718.4189497, ST: 681.5788386, EWS: 781.1165183, PwBD: 447.316504 },
    source: src(urls.duCutoff, 'UG Round One allocation/minimum scores 2025, University of Delhi', 'p. 48; Miranda House B.A. (Hons.) English', 2025, 'verified', 'Historical guidance only; not guaranteed admission.')
  };
  return unavailable('No historical closing-score observation was transcribed for this college/programme row.');
};

function normalizeDuName(name) {
  return name.replace(/\s+/g, ' ').replace('P. G . D . A .V. C o l l e g e', 'P.G.D.A.V. College').replace('Sri Venketeswara', 'Sri Venkateswara').replace('Swami Shardhanand', 'Swami Shraddhanand').trim();
}

async function loadJson(file) { return JSON.parse(await fs.readFile(path.join(outDir, file), 'utf8')); }

function buildDuRecords(extract, officialList = null) {
  const officialNameByKey = new Map((officialList?.records || []).map((row) => [duNameKey(row.officialName), row.officialName]));
  return extract.records.map((row) => {
    const extractedName = normalizeDuName(row.entityName);
    const collegeName = officialNameByKey.get(duNameKey(extractedName)) || extractedName;
    const isCollege = row.entityType === 'college';
    const college = { id: slug(`du-${collegeName}`), officialName: collegeName, entityType: row.entityType, location: 'Delhi', nameStatus: isCollege ? 'verified' : 'institution-level only' };
    return makeRecord({
      parent: 'University of Delhi', parentType: 'Central University', college, admissionYear: 2026,
      programme: { name: row.programme, level: 'UG', admissionYear: 2026 }, eligibility: commonDuEligibility, cuet: commonDuCuet,
      quota: noQuota,
      seats: { status: 'verified', seatType: 'published category seat matrix', byCategory: row.seatCategories, source: row.source },
      counselling: duCounselling, cutoffs: duHistorical(collegeName, row.programme),
      sources: [row.source, src(urls.duColleges, 'Colleges at DU, University of Delhi', 'Official college list; name corroboration', 2026, 'verified'), src(urls.duBulletin, 'UG Bulletin of Information 2025, University of Delhi', 'Common eligibility framework; programme-specific rules not copied into this row', 2025, 'stale')],
      verificationStatus: 'incomplete',
      notes: [isCollege ? 'College name and category seats verified in the official 2026 DU matrix.' : 'Official DU matrix entity retained but not presented as a college.', 'Class XII eligibility and CUET subjects remain separate fields and are intentionally incomplete here.', ...(row.programme === 'B.Com. (Hons.)' && ['Shri Ram College of Commerce', 'Hindu College', 'Hans Raj College', 'Hansraj College', 'Miranda House', 'Miranda House (W)', 'Lady Shri Ram College for Women', 'Lady Shri Ram College for Women (W)'].includes(collegeName) ? ['Priority college row for commerce-level validation.'] : [])]
    });
  });
}

function duNameKey(name) {
  return normalizeDuName(name).toLowerCase().replace(/\(morning\)|\(evening\)|\(w\)|for women|college|the|[^a-z0-9]/g, '');
}

function buildDuOfficialEvidence(officialList, duExtract) {
  const existing = new Set(duExtract.headings.map((h) => duNameKey(h.name)));
  return officialList.records.filter((row) => !existing.has(duNameKey(row.officialName))).map((row) => makeRecord({
    recordType: 'collegeEvidence', parent: 'University of Delhi', parentType: 'Central University', admissionYear: 2026,
    college: { id: slug(`du-official-${row.officialName}`), officialName: row.officialName, entityType: row.section === 'Other Institutions' ? 'institute' : 'college', location: 'Delhi', collegeType: row.section === 'Other Institutions' ? 'institute' : 'college', nameStatus: 'verified', officialListSection: row.section },
    programme: null, eligibility: unavailable('Official DU college-page name is verified, but no programme-specific admission bulletin/seat row was connected in this audit.'), cuet: unavailable('Official DU college-page name is verified; CUET subject requirements were not inferred without a programme row.'), quota: unavailable(), seats: unavailable('No connected CUET UG seat row was located for this official college-page entry.'), counselling: duCounselling, cutoffs: unavailable('No historical cutoff was transcribed for this official college-page entry.'),
    sources: [src(row.sourceUrl, row.documentTitle, row.pageOrSection, row.admissionYear, row.verificationStatus, 'Official DU college register; not evidence that the entry has a CUET UG programme in the audited 2026 seat matrix.')],
    verificationStatus: 'incomplete', notes: ['College name verified in the official DU college page.', 'The absence of a connected programme/seat row is recorded as incomplete, not treated as proof that no programme exists.']
  }));
}

const auColleges = [
  ['Allahabad Degree College', 'co-ed', ['B.A.', 'B.Sc.', 'B.Com.']],
  ['Arya Kanya Girls Degree College', 'girls', ['B.A.', 'B.Com.']],
  ['Chaudhary Mahadev Prasad Degree College', 'co-ed', ['B.A.', 'B.Sc.', 'B.Com.', 'BCA', 'B.A.LL.B.', 'BCA-MCA (Data Science)']],
  ['Ewing Christian College', 'co-ed', ['B.A.', 'B.Sc.', 'B.Com.']],
  ['Hamidia Girls’ Degree College', 'girls', ['B.A.', 'B.Com.']],
  ['Iswar Saran Degree College', 'co-ed', ['B.A.', 'B.Sc.', 'B.A.LL.B.', 'B.Com.', 'B.Voc. (Food Processing)']],
  ['Jagat Taran Girls Degree College', 'girls', ['B.A.', 'B.Com.']],
  ['K. P. Training College', 'co-ed', []],
  ['Rajarshi Tandon Mahila Mahavidyalaya', 'girls', ['B.A.', 'B.Com.']],
  ['Sadanlal Sanwaldas Khanna Girls Degree College', 'girls', ['B.A.', 'B.Sc.', 'B.A.LL.B.', 'B.Com.']],
  ['Shyama Prasad Mukherji Degree College', 'co-ed', ['B.A.', 'B.Sc.', 'B.Com.']]
];
const auEligibility = incomplete('The 2026 bulletin lists the college programme offerings but the programme-specific Class XII minimum marks were not located in the college table.');
const auCuet = incomplete('The parent NTA programme page confirms CUET participation/programmes, but the exact college-programme CUET combination was not published in the audited college table.');
const auCounselling = incomplete('University of Allahabad UG admission/merit route is indicated by the official admissions page; a college-wise 2026 counselling document was not located.');
function buildAuRecords() {
  return auColleges.flatMap(([name, gender, programmes]) => {
    const directorySources = [src(urls.auDirectory, 'Telephone Directory, University of Allahabad', `Principal, Affiliated Colleges; ${name}`, 2026), src(urls.auSelfDisclosure, 'Public Self Disclosure, University of Allahabad', 'p. 1; constituent-college list', 2026), src(urls.auAnnualReport, 'Annual Report 2021-22, University of Allahabad', 'University at a Glance; 11 constituent colleges', 2022, 'stale')];
    if (!programmes.length) return [makeRecord({
      recordType: 'collegeEvidence', parent: 'University of Allahabad', parentType: 'Central University', admissionYear: 2026,
      college: { id: slug(`au-${name}`), officialName: name, entityType: 'affiliated college', location: 'Prayagraj, Uttar Pradesh', gender, nameStatus: 'verified' }, programme: null,
      eligibility: unavailable('College name is verified in official University of Allahabad affiliation sources, but no programme-specific CUET UG admission row was connected in this release.'), cuet: unavailable('No college-specific CUET subject combination was located for this affiliated college in the audited sources.'), quota: noQuota,
      seats: unavailable('No college-wise CUET UG seat matrix was located for this affiliated college.'), counselling: auCounselling, cutoffs: unavailable('No college-programme historical cutoff was transcribed.'),
      sources: directorySources, verificationStatus: 'incomplete', notes: ['Official college affiliation is verified, but this record is evidence-only and is not used for live programme recommendations.']
    })];
    return programmes.map((programme) => makeRecord({
      parent: 'University of Allahabad', parentType: 'Central University', admissionYear: 2026,
      college: { id: slug(`au-${name}`), officialName: name, entityType: 'affiliated college', location: 'Prayagraj, Uttar Pradesh', gender, nameStatus: 'verified' },
      programme: { name: programme, level: 'UG', admissionYear: 2026 }, eligibility: auEligibility, cuet: auCuet, quota: noQuota,
      seats: unavailable('No college-wise seat matrix was located in the audited 2026 bulletin.'), counselling: auCounselling,
      cutoffs: unavailable('Official 2025 commerce merit/cutoff notices are indexed by the admissions page, but a college-programme closing score was not transcribed into this release.'),
      sources: [src(urls.auBulletin, 'UG Information Bulletin 2026, University of Allahabad', 'p. 7; 10-college UG affiliation/programme table', 2026), src(urls.ntaAu, 'University of Allahabad | CUET UG programme information', 'NTA CUET participation/programme page', 2026), src(urls.auAdmissions, 'UG Admissions 2025, University of Allahabad', 'Official commerce admission/merit notice index', 2025, 'stale')],
      verificationStatus: 'incomplete', notes: [`College gender/co-education label: ${gender}.`, 'No course or seat has been inferred beyond the official college table.']
    }));
  });
}

const bhuLocations = [
  ['Faculty in the Main Campus, BHU, Varanasi', 'faculty/location', 'Co-Educational', 'FMC'],
  ['Mahila Mahavidyalaya in the Main Campus, BHU, Varanasi', 'college/campus', 'Only Female', 'MMV'],
  ['Rajiv Gandhi South Campus, Barkachha, Mirzapur', 'campus', 'Co-Educational', 'RGSC'],
  ['Arya Mahila Post Graduate College, Chetganj, Varanasi', 'affiliated college', 'Only Female', 'AMPG'],
  ['DAV Post Graduate College, Ausanganj, Varanasi', 'affiliated college', 'Co-Educational', 'DAVPG'],
  ['Vasant Kanya Mahavidyalaya, Kamachha, Varanasi', 'affiliated college', 'Only Female', 'VKM'],
  ['Vasanta College for Women, Rajghat, Varanasi', 'affiliated college', 'Only Female', 'VCW']
];
const bhuSeats = { FMC: { Regular: 286, Paid: 43, FMM: 62 }, MMV: { Regular: null, Paid: null, FMM: null }, RGSC: { Regular: null, Paid: 114, FMM: 62 }, AMPG: { Regular: 96, Paid: 14, FMM: null }, DAVPG: { Regular: 227, Paid: 34, FMM: null }, VKM: { Regular: 100, Paid: 15, FMM: null }, VCW: { Regular: 96, Paid: 14, FMM: null } };
const bhuEligibility = { qualification: 'Passed 10+2/equivalent with Commerce, Economics, Maths, Computer Science, Finance, Financial Markets Management or related commerce vocational course as one subject; passed the concerned subject.', minimumMarks: 50, ageRule: 'Not more than 22 years on 1 July 2025.', status: 'verified', sourceSection: 'UG Bulletin 2025, printed p. 45 / PDF p. 49' };
const bhuCuet = { alternatives: [['Accountancy/Book Keeping (301)', 'Business Studies (305)', 'General Aptitude Test (501)']], paperCodes: ['301', '305', '501'], status: 'verified', sourceSection: 'UG Bulletin 2025, printed p. 45 / PDF p. 49' };
const bhuCounselling = { name: 'BHU CAP-UG 2025', status: 'verified', source: src(urls.bhuBulletin, 'UG Bulletin 2025, Banaras Hindu University', 'pp. 8–9 / PDF pp. 12–13; Common Allotment Program CAP-UG route', 2025) };
function buildBhuRecords() {
  return bhuLocations.flatMap(([name, entityType, gender, acronym]) => ['Regular', 'Paid', 'FMM'].map((seatType) => {
    const seat = bhuSeats[acronym][seatType];
    const programmeName = seatType === 'FMM' ? 'B.Com. (Hons.)–FMM' : 'B.Com. (Hons.)';
    return makeRecord({
      parent: 'Banaras Hindu University', parentType: 'Central University', admissionYear: 2025,
      college: { id: slug(`bhu-${acronym}`), officialName: name, entityType, location: name.split(',').slice(-2).join(',').trim(), gender, officialLabel: acronym, nameStatus: 'verified' },
      programme: { name: programmeName, level: 'UG', admissionYear: 2025 }, eligibility: bhuEligibility, cuet: bhuCuet, quota: { status: 'partial', note: 'Official seat table distinguishes Regular, Paid and Special Fee/FMM; category-wise reservation split was not included in the audited row.' },
      seats: { status: 'verified', seatType: seatType === 'FMM' ? 'Special Fee' : `${seatType} Seat`, publishedSeatCell: seat == null ? '-' : seat, seatCount: seat, source: src(urls.bhuBulletin, 'UG Bulletin 2025, Banaras Hindu University', 'printed p. 45 / PDF p. 49; B.Com (Hons.) location seat table', 2025) },
      counselling: bhuCounselling, cutoffs: unavailable('No official BHU closing-score PDF was located in this audit.'),
      sources: [src(urls.bhuBulletin, 'UG Bulletin 2025, Banaras Hindu University', 'printed p. 13 / PDF p. 17; location/acronym table', 2025), src(urls.bhuBulletin, 'UG Bulletin 2025, Banaras Hindu University', 'printed p. 45 / PDF p. 49; B.Com eligibility, CUET subjects, seats', 2025), src(urls.ntaBhu, 'Banaras Hindu University | CUET UG programme information', 'NTA CUET participation/programme page', 2025)],
      verificationStatus: 'verified', notes: [seat == null ? 'The official seat table prints “-” for this location/seat type; null is used instead of inventing a seat count.' : 'Seat count transcribed from the official location table.', 'Historical cutoff unavailable; no inference made.']
    });
  }));
}

const ggsipuEligibility = { qualification: '10+2 with 50% aggregate, pass in five subjects including one language and four elective subjects.', minimumMarks: 50, status: 'verified', sourceSection: 'NTA GGSIPU B.Com. (Hons.) programme row' };
const ggsipuCuet = { alternatives: [['English (101)', 'General Aptitude Test (501)']], paperCodes: ['101', '501'], status: 'verified', sourceSection: 'NTA GGSIPU B.Com. (Hons.) programme row' };
const ggsipuCounselling = { name: 'GGSIPU admission / CUET merit route', status: 'verified', source: src(urls.ipuSchedule, 'GGSIPU Schedule Notices', 'CUET programme/schedule notices', 2025) };
function buildGgsipuRecords(extract) {
  return extract.records.flatMap((inst) => (inst.programmeRows.length ? inst.programmeRows : [null]).map((row) => {
    if (!row) return makeRecord({
      recordType: 'collegeEvidence', parent: 'Guru Gobind Singh Indraprastha University', parentType: 'State University', admissionYear: 2025,
      college: { id: slug(`ipu-${inst.officialNameExtracted}`), officialName: inst.officialNameExtracted, entityType: 'affiliated institute', location: 'Delhi/NCR or address stated in Chapter 13', nameStatus: inst.needsManualReview ? 'incomplete' : 'verified' }, programme: null,
      eligibility: unavailable('No programme row was safely transcribed from the PDF layout for this named institute.'), cuet: unavailable('No programme row was safely transcribed from the PDF layout for this named institute.'), quota: unavailable(), seats: unavailable('No programme row was safely transcribed from the PDF layout for this named institute.'), counselling: ggsipuCounselling, cutoffs: unavailable('No historical closing-score evidence transcribed.'),
      sources: [src(urls.ipuCh13, 'Chapter 13: List of Programmes Offered in Affiliated Institutes/USS During Academic Session 2025-26', `p. ${inst.sourcePage || 'page unavailable'}; named institute only`, 2025, 'incomplete')], verificationStatus: 'incomplete', notes: ['Named institute retained for coverage, but no programme is claimed until the PDF table is manually reconciled.']
    });
    const isBcom = row.programme.includes('B.Com');
    return makeRecord({
      parent: 'Guru Gobind Singh Indraprastha University', parentType: 'State University', admissionYear: 2025,
      college: { id: slug(`ipu-${inst.officialNameExtracted}`), officialName: inst.officialNameExtracted, entityType: 'affiliated institute', location: 'Delhi/NCR or address stated in Chapter 13', nameStatus: inst.needsManualReview ? 'incomplete' : 'verified' },
      programme: { name: row.programme, duration: row.duration, finalIntake: row.finalIntake, level: 'UG', admissionYear: 2025 },
      eligibility: isBcom ? ggsipuEligibility : incomplete('Institute/programme intake is verified in Chapter 13; programme-specific Class XII eligibility was not transcribed for this row.'),
      cuet: isBcom ? ggsipuCuet : incomplete('Institute/programme intake is verified in Chapter 13; programme-specific CUET subject requirements were not transcribed for this row.'),
      quota: unavailable('Chapter 13 gives final intake, not category/quota allocation.'),
      seats: { status: 'verified', seatType: 'final intake for A.S. 2025-26', finalIntake: row.finalIntake, source: src(urls.ipuCh13, 'Chapter 13: List of Programmes Offered in Affiliated Institutes/USS, GGSIPU', `p. ${inst.sourcePage || 'page unavailable'}; ${inst.officialNameExtracted} / ${row.programme}`, 2025) },
      counselling: ggsipuCounselling, cutoffs: unavailable('No institute/programme historical closing-score evidence was transcribed in this audit.'),
      sources: [src(urls.ipuCh13, 'Chapter 13: List of Programmes Offered in Affiliated Institutes/USS During Academic Session 2025-26', `p. ${inst.sourcePage || 'page unavailable'}; institute/programme/final intake`, 2025, inst.needsManualReview ? 'incomplete' : 'verified'), src(urls.ntaIpu, 'Guru Gobind Singh Indraprastha University | CUET UG programme information', isBcom ? 'B.Com. (Hons.) programme row' : 'NTA parent programme page; not used to infer institute eligibility', 2025, isBcom ? 'verified' : 'incomplete'), src(urls.ipuBrochure, 'GGSIPU Admission Brochure for Bachelor Programmes 2026-27', 'Chapter 13 index and affiliated institute/programme scope', 2025)],
      verificationStatus: inst.needsManualReview ? 'incomplete' : (isBcom ? 'verified' : 'incomplete'), notes: [isBcom ? 'B.Com. eligibility/CUET fields are from the parent GGSIPU CUET programme row and are not assumed for other programmes.' : 'Programme-level intake is verified; missing programme-specific eligibility/subject evidence is explicit.', ...(inst.needsManualReview ? ['PDF text layout requires manual name review before production predictor use.'] : [])]
    });
  }));
}

function buildParentOnlyRecords(registry, coveredParents) {
  return registry.institutions.filter((item) => !coveredParents.has(item.name.toLowerCase())).map((item) => makeRecord({
    recordType: 'institutionLevelOnly', parent: item.name, parentType: item.type, admissionYear: null, college: null, programme: null,
    eligibility: unavailable('College-level official document not yet verified for this participating institution.'), cuet: unavailable('NTA confirms the participating institution; no college-level subject combination is claimed.'), quota: unavailable(), seats: unavailable(), counselling: unavailable(), cutoffs: unavailable(),
    sources: [src(urls.ntaList, 'CUET participating universities, National Testing Agency', item.name, 2026, 'verified', 'NTA participation confirmation only; not treated as a college list.')], verificationStatus: 'incomplete', notes: ['Institution-level only. This row must not be displayed as a college.', 'Missing-document tracker identifies the next official source needed.']
  }));
}

function flattenRows(records) {
  return records.map((r) => [r.recordType, r.parentInstitution.name, r.parentInstitution.ntaType || '', r.collegeOrCampus?.officialName || '', r.collegeOrCampus?.entityType || 'institution-level only', r.collegeOrCampus?.location || '', r.programme?.name || '', r.programme?.duration || '', r.programme?.admissionYear || '', r.classXIIEligibility?.status || '', r.classXIIEligibility?.minimumMarks ?? '', r.classXIIEligibility?.qualification || '', r.cuetSubjectRequirements?.status || '', r.cuetSubjectRequirements?.paperCodes?.join(', ') || '', r.categoryQuota?.status || '', r.seats?.seatCount ?? r.seats?.finalIntake ?? '', r.seats?.seatType || '', r.counsellingRoute?.name || '', r.historicalCutoffs?.status || '', r.verificationStatus, r.sources?.map((s) => s.url).join(' | ') || '', r.sources?.map((s) => `${s.documentTitle} — ${s.pageOrSection}`).join(' | ') || '', r.notes.join(' | ')]);
}
function flattenRowsWithType(records) {
  return records.map((record) => {
    const row = flattenRows([record])[0];
    row.splice(5, 0, record.collegeOrCampus?.collegeType || 'institution-level only');
    return row;
  });
}

function uniqueEntities(records) {
  const map = new Map();
  for (const r of records) if (r.collegeOrCampus?.officialName) map.set(`${r.parentInstitution.name}|${r.collegeOrCampus.officialName}`, { parentInstitution: r.parentInstitution.name, officialName: r.collegeOrCampus.officialName, entityType: r.collegeOrCampus.entityType, collegeType: r.collegeOrCampus.collegeType, location: r.collegeOrCampus.location, nameStatus: r.collegeOrCampus.nameStatus });
  return [...map.values()];
}
function csv(rows) { return rows.map((row) => row.map((v) => { const s = String(v ?? ''); return /[",\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s; }).join(',')).join('\n') + '\n'; }

async function writeJson(name, data) { await fs.writeFile(path.join(outDir, name), JSON.stringify(data, null, 2), 'utf8'); }

async function buildWorkbook(records, entities, parents, sources, missing, tests, summary, duOfficialList, duSeatExtract) {
  const wb = Workbook.create();
  const readme = wb.worksheets.add('Read Me');
  const inventory = wb.worksheets.add('College Inventory');
  const entitySheet = wb.worksheets.add('Entity Register');
  const parentSheet = wb.worksheets.add('Parent Coverage');
  const sourceSheet = wb.worksheets.add('Sources');
  const missingSheet = wb.worksheets.add('Missing Documents');
  const testSheet = wb.worksheets.add('Validation Tests');
  const duOfficialSheet = wb.worksheets.add('DU Official Register');
  for (const s of [readme, inventory, entitySheet, parentSheet, sourceSheet, missingSheet, testSheet, duOfficialSheet]) s.showGridLines = false;
  const title = (sheet, range, value) => { sheet.getRange(range).merge(); sheet.getRange(range.split(':')[0]).values = [[value]]; sheet.getRange(range).format = { fill: '#123B5D', font: { bold: true, color: '#FFFFFF', size: 14 }, horizontalAlignment: 'center', verticalAlignment: 'center' }; };
  const header = (sheet, range) => { sheet.getRange(range).format = { fill: '#DCEAF4', font: { bold: true, color: '#123B5D' }, wrapText: true, borders: { preset: 'all', style: 'thin', color: '#AAB7C4' } }; };
  title(readme, 'A1:H1', 'CUETAce — College-Level CUET Inventory (research release)');
  readme.getRange('A3:B13').values = [
    ['Metric', 'Value'], ['Parent institutions found', null], ['Individual colleges / affiliated institutes found', null], ['Campuses / faculty locations found', null], ['Programme rows found', null], ['Verified rows', null], ['Incomplete rows', null], ['Institution-level-only parents', null], ['Coverage boundary', 'DU, BHU, Allahabad University and GGSIPU college-level evidence; other NTA parents remain explicitly institution-level only until official college documents are verified.'], ['Official DU college-page names', null], ['Last verified', lastVerified]
  ];
  header(readme, 'A3:B3');
  readme.getRange('B4').formulas = [[`=COUNTA('Parent Coverage'!A4:A${parents.length + 3})`]];
  readme.getRange('B5').formulas = [[`=COUNTIF('Entity Register'!C4:C${entities.length + 3},"college")+COUNTIF('Entity Register'!C4:C${entities.length + 3},"affiliated college")+COUNTIF('Entity Register'!C4:C${entities.length + 3},"affiliated institute")`]];
  readme.getRange('B6').formulas = [[`=COUNTIF('Entity Register'!C4:C${entities.length + 3},"campus")+COUNTIF('Entity Register'!C4:C${entities.length + 3},"faculty/location")+COUNTIF('Entity Register'!C4:C${entities.length + 3},"college/campus")`]];
  readme.getRange('B7').formulas = [[`=COUNTA('College Inventory'!H4:H${records.length + 3})`]];
  readme.getRange('B8').formulas = [[`=COUNTIF('College Inventory'!U4:U${records.length + 3},"verified")`]];
  readme.getRange('B9').formulas = [[`=COUNTIF('College Inventory'!U4:U${records.length + 3},"incomplete")`]];
  readme.getRange('B10').formulas = [[`=COUNTIF('College Inventory'!A4:A${records.length + 3},"institutionLevelOnly")`]];
  readme.getRange('B12').formulas = [[`=COUNTA('DU Official Register'!A4:A${duOfficialList.records.length + 3})`]];
  readme.getRange('A15:H18').values = [['Hierarchy', 'Meaning', '', '', '', '', '', ''], ['Institution', 'Parent organisation confirmed by NTA participation list.', '', '', '', '', '', ''], ['College/Campus', 'Actual named college, affiliated institute, campus or explicitly labelled faculty/location from an official university source.', '', '', '', '', '', ''], ['Programme', 'Degree/programme offered at that named college/campus; eligibility, CUET subjects, seats, counselling and historical evidence are separate fields.', '', '', '', '', '', '']];
  readme.getRange('A15:B15').format = { fill: '#E9F1F7', font: { bold: true, color: '#123B5D' } };
  readme.getRange('A16:B18').format.wrapText = true;
  readme.getRange('A3:B18').format.borders = { preset: 'all', style: 'thin', color: '#D5DEE6' };
  readme.getRange('A1:H18').format.verticalAlignment = 'center';
  readme.getRange('A:A').format.columnWidth = 38; readme.getRange('B:B').format.columnWidth = 55; readme.getRange('C:H').format.columnWidth = 16;

  const invHeaders = ['Record type', 'Parent institution', 'NTA institution type', 'College / campus (exact official name)', 'Entity type', 'College type', 'Location', 'Programme / course', 'Duration', 'Admission year', 'Class XII status', 'Class XII minimum marks', 'Class XII eligibility', 'CUET status', 'CUET paper codes', 'Category / quota status', 'Seat value', 'Seat type', 'Counselling route', 'Historical cutoff status', 'Overall verification', 'Official source URL(s)', 'Document title / page / section', 'Notes'];
  title(inventory, 'A1:X1', 'College / campus / programme inventory — evidence rows');
  inventory.getRange('A3:X3').values = [invHeaders]; header(inventory, 'A3:X3'); inventory.getRangeByIndexes(3, 0, records.length, invHeaders.length).values = flattenRowsWithType(records); inventory.getRange(`A3:X${records.length + 3}`).format.borders = { preset: 'all', style: 'thin', color: '#D5DEE6' }; inventory.getRange(`A3:X${records.length + 3}`).format.wrapText = true; inventory.freezePanes.freezeRows(3); inventory.freezePanes.freezeColumns(4); inventory.tables.add(`A3:X${records.length + 3}`, true, 'CollegeInventoryTable');
  [16, 24, 24, 30, 20, 19, 25, 30, 12, 12, 14, 13, 44, 14, 16, 17, 12, 18, 24, 20, 16, 42, 52, 50].forEach((w, i) => inventory.getRangeByIndexes(0, i, 1, 1).format.columnWidth = w);

  title(entitySheet, 'A1:G1', 'Distinct named college / campus / affiliated institute register');
  entitySheet.getRange('A3:G3').values = [['Parent institution', 'Exact official name', 'Entity type', 'College type', 'Location', 'Name status', 'Count basis']]; header(entitySheet, 'A3:G3'); entitySheet.getRangeByIndexes(3, 0, entities.length, 7).values = entities.map((e) => [e.parentInstitution, e.officialName, e.entityType, e.collegeType || '', e.location || '', e.nameStatus || '', 'Distinct official name in audited source']); entitySheet.getRange(`A3:G${entities.length + 3}`).format.borders = { preset: 'all', style: 'thin', color: '#D5DEE6' }; entitySheet.getRange(`A3:G${entities.length + 3}`).format.wrapText = true; entitySheet.freezePanes.freezeRows(3); entitySheet.tables.add(`A3:G${entities.length + 3}`, true, 'EntityRegisterTable');
  entitySheet.getRange('A:A').format.columnWidth = 34; entitySheet.getRange('B:B').format.columnWidth = 52; entitySheet.getRange('C:D').format.columnWidth = 22; entitySheet.getRange('E:E').format.columnWidth = 28; entitySheet.getRange('F:G').format.columnWidth = 24;

  title(parentSheet, 'A1:H1', 'NTA parent institution coverage — not a college list');
  parentSheet.getRange('A3:H3').values = [['Parent institution', 'NTA type', 'College-level status', 'College rows', 'Distinct named entities', 'Programmes', 'Official NTA source', 'Notes']]; header(parentSheet, 'A3:H3'); parentSheet.getRangeByIndexes(3, 0, parents.length, 8).values = parents.map((p) => [p.name, p.type || '', p.collegeStatus, p.collegeRows, p.entityCount, p.programmeRows, urls.ntaList, p.note]); parentSheet.getRange(`A3:H${parents.length + 3}`).format.wrapText = true; parentSheet.getRange(`A3:H${parents.length + 3}`).format.borders = { preset: 'all', style: 'thin', color: '#D5DEE6' }; parentSheet.freezePanes.freezeRows(3); parentSheet.tables.add(`A3:H${parents.length + 3}`, true, 'ParentCoverageTable'); parentSheet.getRange('A:A').format.columnWidth = 38; parentSheet.getRange('B:C').format.columnWidth = 22; parentSheet.getRange('D:F').format.columnWidth = 13; parentSheet.getRange('G:G').format.columnWidth = 42; parentSheet.getRange('H:H').format.columnWidth = 52;

  title(sourceSheet, 'A1:G1', 'Official source and verification register'); sourceSheet.getRange('A3:G3').values = [['Source URL', 'Document title', 'Page / section', 'Admission year', 'Last verified', 'Verification status', 'Use / limitation']]; header(sourceSheet, 'A3:G3'); sourceSheet.getRangeByIndexes(3, 0, sources.length, 7).values = sources.map((s) => [s.url, s.documentTitle, s.pageOrSection, s.admissionYear ?? '', s.lastVerified, s.verificationStatus, s.note || '']); sourceSheet.getRange(`A3:G${sources.length + 3}`).format.wrapText = true; sourceSheet.getRange(`A3:G${sources.length + 3}`).format.borders = { preset: 'all', style: 'thin', color: '#D5DEE6' }; sourceSheet.freezePanes.freezeRows(3); sourceSheet.tables.add(`A3:G${sources.length + 3}`, true, 'SourcesTable'); sourceSheet.getRange('A:A').format.columnWidth = 48; sourceSheet.getRange('B:B').format.columnWidth = 48; sourceSheet.getRange('C:C').format.columnWidth = 42; sourceSheet.getRange('D:F').format.columnWidth = 16; sourceSheet.getRange('G:G').format.columnWidth = 55;

  title(missingSheet, 'A1:F1', 'Missing or unavailable official documents — next research queue'); missingSheet.getRange('A3:F3').values = [['Parent institution', 'Needed document', 'Needed fields', 'Current status', 'Suggested official route', 'Do not infer']]; header(missingSheet, 'A3:F3'); missingSheet.getRangeByIndexes(3, 0, missing.length, 6).values = missing; missingSheet.getRange(`A3:F${missing.length + 3}`).format.wrapText = true; missingSheet.getRange(`A3:F${missing.length + 3}`).format.borders = { preset: 'all', style: 'thin', color: '#D5DEE6' }; missingSheet.freezePanes.freezeRows(3); missingSheet.tables.add(`A3:F${missing.length + 3}`, true, 'MissingDocumentsTable'); missingSheet.getRange('A:A').format.columnWidth = 38; missingSheet.getRange('B:C').format.columnWidth = 38; missingSheet.getRange('D:D').format.columnWidth = 20; missingSheet.getRange('E:F').format.columnWidth = 52;

  title(testSheet, 'A1:H1', 'Validated priority test cases'); testSheet.getRange('A3:H3').values = [['Test case', 'Expected parent', 'Expected college/campus', 'Expected programme', 'Eligibility check', 'CUET check', 'Seat/cutoff check', 'Result']]; header(testSheet, 'A3:H3'); testSheet.getRangeByIndexes(3, 0, tests.length, 8).values = tests; testSheet.getRange(`A3:H${tests.length + 3}`).format.wrapText = true; testSheet.getRange(`A3:H${tests.length + 3}`).format.borders = { preset: 'all', style: 'thin', color: '#D5DEE6' }; testSheet.tables.add(`A3:H${tests.length + 3}`, true, 'ValidationTestsTable'); testSheet.getRange('A:A').format.columnWidth = 24; testSheet.getRange('B:D').format.columnWidth = 34; testSheet.getRange('E:G').format.columnWidth = 48; testSheet.getRange('H:H').format.columnWidth = 12;

  title(duOfficialSheet, 'A1:G1', 'DU official college-page register — 91 unique names'); duOfficialSheet.getRange('A3:G3').values = [['Exact official name', 'Official page section', 'Listed-entry status', 'CUET UG seat-matrix match', 'College/Campus type', 'Source URL', 'Page / section']]; header(duOfficialSheet, 'A3:G3'); const duKeys = new Set(duSeatExtract.headings.map((h) => duNameKey(h.name))); duOfficialSheet.getRangeByIndexes(3, 0, duOfficialList.records.length, 7).values = duOfficialList.records.map((row) => [row.officialName, row.section, 'unique official name', duKeys.has(duNameKey(row.officialName)) ? 'matched to 2026 matrix entity' : 'not matched in audited 2026 matrix', row.section === 'Other Institutions' ? 'institute' : 'college', row.sourceUrl, row.pageOrSection]); duOfficialSheet.getRange(`A3:G${duOfficialList.records.length + 3}`).format.wrapText = true; duOfficialSheet.getRange(`A3:G${duOfficialList.records.length + 3}`).format.borders = { preset: 'all', style: 'thin', color: '#D5DEE6' }; duOfficialSheet.freezePanes.freezeRows(3); duOfficialSheet.tables.add(`A3:G${duOfficialList.records.length + 3}`, true, 'DUOfficialRegisterTable'); duOfficialSheet.getRange('A:A').format.columnWidth = 56; duOfficialSheet.getRange('B:C').format.columnWidth = 22; duOfficialSheet.getRange('D:D').format.columnWidth = 28; duOfficialSheet.getRange('E:E').format.columnWidth = 18; duOfficialSheet.getRange('F:F').format.columnWidth = 48; duOfficialSheet.getRange('G:G').format.columnWidth = 42;

  const preview = await wb.render({ sheetName: 'Read Me', autoCrop: 'all', scale: 1, format: 'png' }); await fs.writeFile(path.join(outDir, 'college-inventory-readme-preview.png'), new Uint8Array(await preview.arrayBuffer()));
  const xlsx = await SpreadsheetFile.exportXlsx(wb); await xlsx.save(path.join(outDir, 'cuet-college-level-inventory.xlsx'));
}

async function main() {
  const [registry, duExtract, ggsipuExtract, duOfficialList] = await Promise.all([loadJson('institution-registry.json'), loadJson('du-seat-matrix-2026-extract.json'), loadJson('ggsipu-affiliated-2025-extract.json'), loadJson('du-official-college-list-2026.json')]);
  const du = buildDuRecords(duExtract, duOfficialList); const duOfficialEvidence = buildDuOfficialEvidence(duOfficialList, duExtract); const au = buildAuRecords(); const bhu = buildBhuRecords(); const ipu = buildGgsipuRecords(ggsipuExtract);
  const coveredParents = new Set(['university of delhi', 'banaras hindu university', 'university of allahabad', 'guru gobind singh indraprastha university']);
  const parentOnly = buildParentOnlyRecords(registry, coveredParents);
  const records = [...du, ...duOfficialEvidence, ...bhu, ...au, ...ipu, ...parentOnly];
  const entities = uniqueEntities(records);
  const sourceMap = new Map(); for (const r of records) for (const s of r.sources || []) sourceMap.set(`${s.url}|${s.pageOrSection}`, s); const sources = [...sourceMap.values()];
  const parentCounts = new Map(); for (const r of records) { const p = r.parentInstitution.name.toLowerCase(); if (!parentCounts.has(p)) parentCounts.set(p, { collegeRows: 0, entityKeys: new Set(), programmeRows: 0 }); const c = parentCounts.get(p); if (r.collegeOrCampus) { c.collegeRows++; c.entityKeys.add(r.collegeOrCampus.officialName); } if (r.programme) c.programmeRows++; }
  const parents = registry.institutions.map((p) => { const c = parentCounts.get(p.name.toLowerCase()) || { collegeRows: 0, entityKeys: new Set(), programmeRows: 0 }; const covered = coveredParents.has(p.name.toLowerCase()); return { name: p.name, type: p.ntaType || p.type, collegeStatus: covered ? 'college-level evidence present' : 'institution-level only', collegeRows: c.collegeRows, entityCount: c.entityKeys.size, programmeRows: c.programmeRows, note: covered ? 'Priority institution covered with official college/campus evidence.' : 'NTA parent listed; college-level source not verified in this release.' }; });
  const missing = parents.filter((p) => p.collegeStatus === 'institution-level only').map((p) => [p.name, 'Official constituent/affiliated college list plus programme-wise admission bulletin/seat matrix', 'Exact college name, campus, programme, Class XII eligibility, CUET subjects, category/quota, seats, counselling route, historical cutoff', 'unavailable / not yet verified', urls.ntaList, 'Do not display NTA parent name as a college; do not infer affiliated colleges or eligibility.']);
  const find = (parent, college, programme) => records.find((r) => r.parentInstitution.name === parent && r.collegeOrCampus?.officialName === college && r.programme?.name === programme);
  const tests = [
    (() => { const r = find('University of Delhi', 'Shri Ram College of Commerce', 'B.Com. (Hons.)'); return ['DU / SRCC B.Com. (Hons.)', 'University of Delhi', 'Shri Ram College of Commerce', 'B.Com. (Hons.)', r?.classXIIEligibility.status, r?.cuetSubjectRequirements.status, `${r?.seats.status}; cutoff ${r?.historicalCutoffs.status} (historical guidance only)`, r ? 'PASS' : 'FAIL']; })(),
    (() => { const r = find('Banaras Hindu University', 'Faculty in the Main Campus, BHU, Varanasi', 'B.Com. (Hons.)'); return ['BHU / FMC B.Com. (Hons.)', 'Banaras Hindu University', 'Faculty in the Main Campus, BHU, Varanasi', 'B.Com. (Hons.)', r?.classXIIEligibility.status, r?.cuetSubjectRequirements.status, `${r?.seats.status}; seat ${r?.seats.seatCount ?? 'published -'}`, r ? 'PASS' : 'FAIL']; })(),
    (() => { const r = find('University of Allahabad', 'Ewing Christian College', 'B.Com.'); return ['Allahabad / Ewing Christian College B.Com.', 'University of Allahabad', 'Ewing Christian College', 'B.Com.', r?.classXIIEligibility.status, r?.cuetSubjectRequirements.status, `${r?.seats.status}; cutoff ${r?.historicalCutoffs.status}`, r ? 'PASS' : 'FAIL']; })(),
    (() => { const r = records.find((x) => x.parentInstitution.name === 'Guru Gobind Singh Indraprastha University' && x.collegeOrCampus?.officialName === 'Delhi School of Professional Studies and Research' && x.programme?.name === 'B.Com. (Hons.)'); return ['GGSIPU / DSPSR B.Com. (Hons.)', 'Guru Gobind Singh Indraprastha University', 'Delhi School of Professional Studies and Research', 'B.Com. (Hons.)', r?.classXIIEligibility.status, r?.cuetSubjectRequirements.status, `${r?.seats.status}; intake ${r?.seats.finalIntake ?? 'unavailable'}`, r ? 'PASS' : 'FAIL']; })()
  ];
  const summary = { generatedOn: lastVerified, coverage: { parentInstitutionsFound: parents.length, individualCollegesOrAffiliatedInstitutesFound: entities.filter((e) => ['college', 'affiliated college', 'affiliated institute'].includes(e.entityType)).length, campusesOrLocationsFound: entities.filter((e) => ['campus', 'faculty/location', 'college/campus'].includes(e.entityType)).length, programmeRowsFound: records.filter((r) => r.programme).length, verifiedRows: records.filter((r) => r.verificationStatus === 'verified').length, incompleteRows: records.filter((r) => r.verificationStatus === 'incomplete').length, institutionLevelOnlyParents: parentOnly.length }, scope: 'College-level verified evidence is currently available for DU, BHU, Allahabad University and GGSIPU; the remaining NTA parents are retained as explicit institution-level-only coverage gaps.' };
  summary.coverage.officialDuListedEntries = duOfficialList.listedEntryCount;
  summary.coverage.officialDuUniqueNames = duOfficialList.uniqueOfficialNameCount;
  summary.coverage.duCuetMatrixNamedEntities = duExtract.headings.length;
  await writeJson('college-inventory.json', { schemaVersion: '2.0.0-college-level', generatedOn: lastVerified, hierarchy: 'Institution → College/Campus → Programme → Eligibility → CUET subjects → Admission evidence', coverage: summary.coverage, records });
  await writeJson('college-inventory-summary.json', summary); await writeJson('college-source-verification.json', sources); await writeJson('college-validation-tests.json', tests);
  await fs.writeFile(path.join(outDir, 'college-inventory.csv'), csv([['recordType', 'parentInstitution', 'ntaInstitutionType', 'collegeOrCampus', 'entityType', 'collegeType', 'location', 'programme', 'duration', 'admissionYear', 'classXIIStatus', 'classXIIMinimumMarks', 'classXIIEligibility', 'cuetStatus', 'cuetPaperCodes', 'categoryQuotaStatus', 'seatValue', 'seatType', 'counsellingRoute', 'historicalCutoffStatus', 'verificationStatus', 'sourceUrls', 'documentTitlesPagesSections', 'notes'], ...flattenRowsWithType(records)]));
  await fs.writeFile(path.join(outDir, 'college-missing-documents.csv'), csv([['parentInstitution', 'neededDocument', 'neededFields', 'currentStatus', 'suggestedOfficialRoute', 'doNotInfer'], ...missing]));
  const auditedFiles = [
    { file: 'institution-registry.json', role: 'NTA parent registry', finding: '244 participating parent institutions; not a college list.' },
    { file: 'programme-inventory.json', role: 'legacy programme pack', finding: '60 programme rows; retained as an audit input, not treated as the complete college inventory.' },
    { file: 'college-inventory.json', role: 'college-level pack', finding: 'Rebuilt with separate parent, college/campus and programme fields.' },
    { file: 'du-seat-matrix-2026-extract.json', role: 'DU programme/seat extract', finding: `${duExtract.headings.length} named matrix entities and ${duExtract.records.length} programme/seat rows.` },
    { file: 'du-official-college-list-2026.json', role: 'DU official name register', finding: `${duOfficialList.listedEntryCount} listed entries and ${duOfficialList.uniqueOfficialNameCount} unique official names.` },
    { file: 'ggsipu-affiliated-2025-extract.json', role: 'GGSIPU Chapter 13 extract', finding: 'Official affiliated-institute/programme extract; serial duplicates are retained as source evidence.' },
    { file: 'college-source-verification.json', role: 'source register', finding: 'Official URL, document title, page/section, admission year and verification metadata.' },
    { file: 'college-missing-documents.csv', role: 'research gap queue', finding: 'Remaining official documents needed for institution-level-only parents.' },
    { file: 'cuet-college-level-inventory.xlsx', role: 'research workbook', finding: 'Hierarchy, entity register, DU register, sources, gaps and validation tests.' }
  ];
  const audit = { generatedOn: lastVerified, beforeRebuild: { parentInstitutions: 244, legacyProgrammeRecords: 60, collegeProgrammeRecords: 1891, verifiedRows: 53, incompleteRows: 2083, institutionLevelOnlyParents: 240 }, findings: ['The NTA participating-universities list confirms parent participation only.', `DU official college page: ${duOfficialList.listedEntryCount} listed entries / ${duOfficialList.uniqueOfficialNameCount} unique official names.`, `DU 2026 CUET UG seat matrix: ${duExtract.headings.length} named matrix entities and ${duExtract.records.length} programme/seat rows; these counts are intentionally separate.`, 'College/campus type is explicit: constituent/college, affiliated, institute, faculty, campus or institution-level only.', 'Class XII eligibility and CUET subject requirements are separate fields.', 'Missing eligibility, quota, seat, counselling or cutoff evidence is marked unavailable/incomplete; no values are inferred.', 'Historical cutoffs are labelled guidance only and are not guaranteed admission.', 'Frontend and production predictor files were not modified.'], files: auditedFiles, frontendModified: false };
  await writeJson('research-pack-audit.json', audit);
  await fs.writeFile(path.join(outDir, 'research-pack-audit.md'), `# CUETAce research-pack audit\n\nGenerated: ${lastVerified}\n\nThis audit records the state of the research pack before the current rebuild and the evidence rules applied during it.\n\n## Before rebuild\n\n- Parent institutions: 244\n- Legacy programme rows: 60\n- College-programme rows: 1,891\n- Verified rows: 53\n- Incomplete rows: 2,083\n- Institution-level-only parents: 240\n\n## Material findings\n\n- The NTA participating-universities page is a parent-participation source, not a college directory.\n- DU now has a separate official register with ${duOfficialList.listedEntryCount} listed entries and ${duOfficialList.uniqueOfficialNameCount} unique official names.\n- The DU 2026 CUET UG matrix is separately reported as ${duExtract.headings.length} named matrix entities and ${duExtract.records.length} programme/seat rows.\n- The rebuilt records keep college/campus type, programme, Class XII eligibility, CUET subject requirements, seats, counselling and historical evidence separate.\n- Unavailable information remains unavailable; no eligibility, seats or cutoffs are inferred.\n- Frontend and production predictor files were not modified.\n\nSee college-audit-report.md, college-source-verification.json, college-missing-documents.csv and the workbook for the evidence register and remaining gaps.\n`);
  await fs.writeFile(path.join(outDir, 'college-audit-report.md'), `# CUETAce college-level inventory audit\n\nGenerated: ${lastVerified}\n\n## Current coverage\n\n- Parent institutions found in the NTA registry: ${summary.coverage.parentInstitutionsFound}\n- Individual colleges / affiliated institutes found: ${summary.coverage.individualCollegesOrAffiliatedInstitutesFound}\n- Campuses / faculty locations found: ${summary.coverage.campusesOrLocationsFound}\n- Programme rows: ${summary.coverage.programmeRowsFound}\n- Verified rows: ${summary.coverage.verifiedRows}\n- Incomplete rows: ${summary.coverage.incompleteRows}\n- Remaining parents marked institution-level only: ${summary.coverage.institutionLevelOnlyParents}\n- DU official register: ${duOfficialList.uniqueOfficialNameCount} unique names; DU CUET UG matrix: ${duExtract.headings.length} named entities\n- Allahabad University: 11 official affiliated/constituent college names are now retained; the 2026 UG bulletin supplied programme rows for 10 of them, while K. P. Training College remains evidence-only.\n- BHU: seven B.Com admission locations are retained; these are not a claim that BHU has seven total colleges.\n\n## Rules applied\n\n1. NTA confirms parent participation only; it is never treated as a college list.\n2. DU's official name register is kept separate from the CUET UG seat matrix.\n3. Allahabad's official college directory/self-disclosure evidence is kept separate from its 2026 UG programme table.\n4. BHU admission locations are kept separate from its affiliated/constituent-college structure.\n5. Class XII eligibility and CUET subject requirements are separate fields.\n6. Missing seats, quotas, counselling documents and cutoffs remain unavailable/incomplete; no values are inferred.\n7. Historical cutoffs are guidance only and are not guaranteed admission.\n\nSee college-source-verification.json, college-missing-documents.csv and the workbook for the evidence register and remaining gaps.\n`);
  await fs.writeFile(path.join(outDir, 'college-README.md'), `# CUETAce college-level research pack\n\nThis pack preserves the hierarchy:\n\n**Institution/University → College/Campus → Programme → Class XII eligibility → CUET subjects → Seats → Counselling → Historical evidence**\n\nNTA is used to confirm participating parent institutions only. A parent institution is never treated as a college. DU’s official college-page register is kept separate from the DU CUET UG seat matrix because an official college name does not, by itself, prove a programme-level CUET seat row.\n\nCurrent priority evidence covers DU, BHU, Allahabad University and GGSIPU. The remaining participating institutions remain explicit institution-level-only gaps until official college/programme documents are verified.\n\nHistorical allocation scores are guidance only and never a guarantee of admission.\n`);
  await buildWorkbook(records, entities, parents, sources, missing, tests, summary, duOfficialList, duExtract);
  console.log(JSON.stringify(summary, null, 2));
}

await main();
