import fs from 'node:fs/promises';
import path from 'node:path';

const repo = process.env.CUET_REPO || 'C:\\Users\\thisi\\Documents\\New project\\CUETAce';
const outDir = path.join(repo, 'research', 'cuet-inventory');
const lastVerified = '2026-07-14';

const urls = {
  ntaDu: 'https://cuet.nta.nic.in/university-of-delhi/',
  ntaBhu: 'https://cuet.nta.nic.in/banaras-hindu-university/',
  ntaAu: 'https://cuet.nta.nic.in/university-of-allahabad/',
  ntaIpu: 'https://cuet.nta.nic.in/guru-gobind-singh-indraprastha-university/',
  duBulletin: 'https://admission.uod.ac.in/userfiles/downloads/2025/07032025_UG-BOI_compressed-1.pdf',
  duCsas: 'https://admission.uod.ac.in/2025/userfiles/downloads/18062025_CSAS-UG_compressed.pdf',
  duCutoff: 'https://admission.uod.ac.in/2025/userfiles/downloads/2025/19072025_CutOff_UG_Round_One.pdf',
  bhuBulletin: 'https://www.bhu.ac.in/Images/files/UG%20Bulletin%202025.pdf',
  auBulletin: 'https://allduniv.ac.in/upload/file_collection/UG%20Information%20Bulletin_2026.pdf',
  auAdmissions: 'https://allduniv.ac.in/p/694/ug-admissions-2025',
  ipuAddendum: 'https://ipu.admissions.nic.in/document/addendum-to-admission-brochure-for-bachelors-programme-2025-26-with-respect-to-chapter-1-3-admissions-through-the-merit-of-cuet-academic-session-2025-2026-dated-17-03-2025/',
  ipuSchedule: 'https://ipu.admissions.nic.in/schedule-notices/'
};

const source = (url, documentTitle, pageOrSection, admissionYear, verificationStatus = 'verified', note = null) => ({
  url, documentTitle, pageOrSection, admissionYear, lastVerified, verificationStatus, ...(note ? { note } : {})
});

const empty = (status = 'unavailable', note = null) => ({ status, ...(note ? { note } : {}) });

function record({ id, institution, institutionType, city, collegeOrCampus, programme, level = 'UG', classXIIEligibility, cuetSubjectRequirements, categoryQuota = empty('unavailable', 'No programme-specific quota document was captured in this audit.'), counsellingRoute, seats = empty(), historicalCutoffs = empty(), sources, verificationStatus = 'incomplete', notes = [] }) {
  return {
    recordType: 'programme',
    id,
    institution: { id: institution.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), name: institution, ntaType: institutionType },
    collegeOrCampus: collegeOrCampus ? { id: collegeOrCampus.id, name: collegeOrCampus.name, city: collegeOrCampus.city || city, nameStatus: collegeOrCampus.nameStatus || 'official-or-source-label' } : null,
    programme: { id, name: programme, level, admissionYear: sources.map(s => s.admissionYear).find(Boolean) || null },
    classXIIEligibility,
    cuetSubjectRequirements,
    categoryQuota,
    counsellingRoute,
    seats,
    historicalCutoffs,
    sources,
    verificationStatus,
    notes
  };
}

const commonDuClassXII = {
  qualification: 'Class XII/equivalent from a single recognised board.',
  stream: ['Commerce', 'Science', 'Humanities', 'Any'],
  requiredSubjects: [],
  minimumMarks: null,
  ageRule: null,
  status: 'incomplete',
  note: 'The audited DU bulletin pages establish the common rule; the exact programme-specific Class XII minimum marks were not located for this record.'
};

const duCsas = { name: 'DU CSAS (UG)', status: 'verified', sourceSection: 'CSAS UG 2025, pp. 6-9' };

const duRecords = [
  record({
    id: 'du-srcc-bcom-hons-2025', institution: 'University of Delhi', institutionType: 'Central University', city: 'Delhi',
    collegeOrCampus: { id: 'du-srcc', name: 'Shri Ram College of Commerce', city: 'Delhi' }, programme: 'B.Com. (Hons.)',
    classXIIEligibility: commonDuClassXII,
    cuetSubjectRequirements: { alternatives: [
      ['Any one Section I language', 'Mathematics/Applied Mathematics', 'Any two Section II subjects, at least one from B1'],
      ['Any one Section I language', 'Accountancy/Book Keeping', 'Any two Section II subjects, at least one from B1']
    ], paperCodes: [], status: 'verified', sourceSection: 'NTA DU programme table, B.Com (Hons.) row' },
    counsellingRoute: duCsas,
    seats: empty('unavailable', 'The audited DU bulletin does not provide the SRCC B.Com (Hons.) seat row in the extracted evidence set; do not reuse the Geography seat table.'),
    historicalCutoffs: { status: 'verified', metric: 'minimum allocation score', historicalGuidanceOnly: true, observations: [
      { year: 2025, round: '1', category: 'UR', score: 917.4305733 }, { year: 2025, round: '1', category: 'OBC', score: 849.420209 },
      { year: 2025, round: '1', category: 'SC', score: 792.4889146 }, { year: 2025, round: '1', category: 'ST', score: 747.5161822 },
      { year: 2025, round: '1', category: 'EWS', score: 874.1215703 }, { year: 2025, round: '1', category: 'PwBD', score: 726.8842867 }
    ], sourceSection: 'DU UG Round One allocation/minimum score PDF, p. 67' },
    sources: [
      source(urls.ntaDu, 'University of Delhi | CUET UG programme information', 'Programme(s) Information, B.Com (Hons.) row', 2025),
      source(urls.duBulletin, 'UG Bulletin of Information 2025, University of Delhi', 'pp. 10-11; common eligibility and programme framework', 2025),
      source(urls.duCsas, 'CSAS UG 2025, University of Delhi', 'pp. 6-9; single-window CSAS route', 2025),
      source(urls.duCutoff, 'UG Round One allocation/minimum scores 2025, University of Delhi', 'p. 67; SRCC B.Com (Hons.)', 2025)
    ], verificationStatus: 'incomplete', notes: ['Historical scores are guidance only and are not guaranteed admission.', 'Class XII eligibility and CUET requirements are intentionally separate fields.']
  }),
  record({
    id: 'du-miranda-ba-hons-english-2025', institution: 'University of Delhi', institutionType: 'Central University', city: 'Delhi',
    collegeOrCampus: { id: 'du-miranda-house', name: 'Miranda House', city: 'Delhi' }, programme: 'B.A. (Hons.) English',
    classXIIEligibility: commonDuClassXII,
    cuetSubjectRequirements: { alternatives: [['English', 'Any two Section II B1 subjects', 'One B1 or B2 subject']], paperCodes: [], status: 'verified', sourceSection: 'NTA DU programme table, B.A. (Hons.) English row; DU UG Bulletin 2025 p. 21' },
    counsellingRoute: duCsas,
    seats: { status: 'verified', seatType: 'programme/category seat table', byCategory: { UR: 3, OBC: 3, SC: 2, ST: 1, EWS: 1, Sikh: 0, Christian: 0, PwBD: 0, CW: 0, KM: 0 }, sourceSection: 'DU UG Bulletin 2025, p. 21; Miranda House row' },
    historicalCutoffs: { status: 'verified', metric: 'minimum allocation score', historicalGuidanceOnly: true, observations: [
      { year: 2025, round: '1', category: 'UR', score: 863.0249541 }, { year: 2025, round: '1', category: 'OBC', score: 765.66332 },
      { year: 2025, round: '1', category: 'SC', score: 718.4189497 }, { year: 2025, round: '1', category: 'ST', score: 681.5788386 },
      { year: 2025, round: '1', category: 'EWS', score: 781.1165183 }, { year: 2025, round: '1', category: 'PwBD', score: 447.316504 }
    ], sourceSection: 'DU UG Round One allocation/minimum score PDF, p. 48' },
    sources: [
      source(urls.ntaDu, 'University of Delhi | CUET UG programme information', 'Programme(s) Information, B.A. (Hons.) English row', 2025),
      source(urls.duBulletin, 'UG Bulletin of Information 2025, University of Delhi', 'p. 21; English programme and Miranda House seat row', 2025),
      source(urls.duCsas, 'CSAS UG 2025, University of Delhi', 'pp. 6-9', 2025),
      source(urls.duCutoff, 'UG Round One allocation/minimum scores 2025, University of Delhi', 'p. 48; Miranda House B.A. (Hons.) English', 2025)
    ], verificationStatus: 'verified', notes: ['Historical scores are guidance only and are not guaranteed admission.']
  }),
  record({
    id: 'du-miranda-bsc-hons-physics-2025', institution: 'University of Delhi', institutionType: 'Central University', city: 'Delhi',
    collegeOrCampus: { id: 'du-miranda-house', name: 'Miranda House', city: 'Delhi' }, programme: 'B.Sc. (Hons.) Physics',
    classXIIEligibility: { qualification: 'Class XII/equivalent; exact stream and minimum marks not captured in the audited record.', stream: ['Science'], requiredSubjects: ['Physics', 'Chemistry', 'Mathematics/Applied Mathematics'], minimumMarks: null, ageRule: null, status: 'incomplete' },
    cuetSubjectRequirements: { alternatives: [['Physics', 'Chemistry', 'Mathematics/Applied Mathematics']], paperCodes: [], minimumLanguageScore: '30% in one List A language', status: 'verified', sourceSection: 'NTA DU programme table, B.Sc. (Hons.) Physics row' },
    counsellingRoute: duCsas,
    seats: empty('unavailable', 'College/programme seat row not extracted in the audited evidence set.'),
    historicalCutoffs: { status: 'verified', metric: 'minimum allocation score', historicalGuidanceOnly: true, observations: [
      { year: 2025, round: '1', category: 'UR', score: 503.6651358 }, { year: 2025, round: '1', category: 'OBC', score: 407.0818242 },
      { year: 2025, round: '1', category: 'SC', score: 284.1408949 }, { year: 2025, round: '1', category: 'ST', score: 176.453626 },
      { year: 2025, round: '1', category: 'EWS', score: 419.6118956 }, { year: 2025, round: '1', category: 'PwBD', score: 154.8742435 }
    ], sourceSection: 'DU UG Round One allocation/minimum score PDF, p. 49' },
    sources: [
      source(urls.ntaDu, 'University of Delhi | CUET UG programme information', 'Programme(s) Information, B.Sc. (Hons.) Physics row', 2025),
      source(urls.duCsas, 'CSAS UG 2025, University of Delhi', 'pp. 6-9', 2025),
      source(urls.duCutoff, 'UG Round One allocation/minimum scores 2025, University of Delhi', 'p. 49; Miranda House B.Sc. (Hons.) Physics', 2025)
    ], verificationStatus: 'incomplete', notes: ['Historical scores are guidance only and are not guaranteed admission.']
  })
];

const bhuRecords = [
  record({
    id: 'bhu-bcom-hons-2025', institution: 'Banaras Hindu University', institutionType: 'Central University', city: 'Varanasi', collegeOrCampus: { id: 'bhu-faculty-commerce', name: 'Faculty of Commerce', city: 'Varanasi' }, programme: 'B.Com. (Hons.) / B.Com. (Hons.)-FMM',
    classXIIEligibility: { qualification: '10+2/equivalent with Commerce, Economics, Mathematics, Computer Science, Finance, Financial Markets Management, or a commerce-related vocational course as one subject; must have passed the concerned subject.', stream: ['Commerce', 'Science', 'Any with specified subject'], requiredSubjects: ['One specified commerce-related subject'], minimumMarks: 50, ageRule: 'Not more than 22 years on 1 July 2025', status: 'verified' },
    cuetSubjectRequirements: { alternatives: [['Accountancy/Book Keeping (301)', 'Business Studies (305)', 'General Aptitude Test (501)']], paperCodes: ['301', '305', '501'], status: 'verified', sourceSection: 'NTA BHU programme table row 4; BHU UG Bulletin 2025 p. 48' },
    counsellingRoute: { name: 'CAP-UG', status: 'verified', sourceSection: 'BHU UG Bulletin 2025, pp. 11-12' },
    seats: { status: 'verified', seatTypes: {
      regular: { 'FMC': 286, 'MMV': null, 'RGSC': null, 'AMPG': 96, 'DAVPG': 227, 'VKM': 100, 'VCW': 96 },
      paid: { 'FMC': 43, 'MMV': null, 'RGSC': 114, 'AMPG': 14, 'DAVPG': 34, 'VKM': 15, 'VCW': 14 },
      'B.Com (Hons)-FMM special fee': { 'FMC': 62, 'MMV': null, 'RGSC': 62, 'AMPG': null, 'DAVPG': null, 'VKM': null, 'VCW': null }
    }, sourceSection: 'BHU UG Bulletin 2025, p. 48; seat table labels are preserved exactly as printed.' },
    historicalCutoffs: empty('unavailable', 'An official BHU historical cutoff PDF was not re-verified in this audit; no score is inserted here.'),
    sources: [source(urls.ntaBhu, 'Banaras Hindu University | CUET UG programme information', 'Programme(s) Information, B.Com row', 2025), source(urls.bhuBulletin, 'UG Bulletin 2025, Banaras Hindu University', 'pp. 11-12 and 48', 2025)],
    verificationStatus: 'verified', notes: ['Seat-table labels FMC/MMV/RGSC/AMPG/DAVPG/VKM/VCW are kept as printed; expansion must be checked against the full bulletin before display.', 'Historical cutoff intentionally unavailable.']
  }),
  record({
    id: 'bhu-ba-social-sciences-2025', institution: 'Banaras Hindu University', institutionType: 'Central University', city: 'Varanasi', collegeOrCampus: { id: 'bhu-faculty-social-sciences', name: 'Faculty of Social Sciences', city: 'Varanasi' }, programme: 'B.A. in Economics/Geography/History/Political Science/Psychology/Sociology',
    classXIIEligibility: { qualification: '10+2/equivalent.', stream: ['Any'], requiredSubjects: [], minimumMarks: 50, ageRule: 'Not more than 22 years on 1 July 2025; Economics major/minor requires Mathematics at high school.', status: 'verified' },
    cuetSubjectRequirements: { alternatives: [['English (101) or Hindi (102)', 'General Aptitude Test (501)']], paperCodes: ['101/102', '501'], status: 'verified', sourceSection: 'BHU UG Bulletin 2025, p. 57' },
    counsellingRoute: { name: 'CAP-UG', status: 'verified', sourceSection: 'BHU UG Bulletin 2025, pp. 11-12' },
    seats: empty('unavailable', 'The social-sciences seat table was not extracted into this first audited release.'),
    historicalCutoffs: empty('unavailable', 'No official historical cutoff score was re-verified in this audit.'),
    sources: [source(urls.ntaBhu, 'Banaras Hindu University | CUET UG programme information', 'Programme(s) Information, B.A. (Hons.) Social Sciences row', 2025), source(urls.bhuBulletin, 'UG Bulletin 2025, Banaras Hindu University', 'pp. 11-12 and 57', 2025)],
    verificationStatus: 'verified'
  })
];

const auBaNames = [
  'B.A.-ARABIC ENGLISH LANG. MED. HISTORY', 'B.A.-POLITICAL SCIENCE PSYCHOLOGY ANC. HISTORY', 'B.A.-PSYCHOLOGY DEFENCE STD. ENGLISH LANG.', 'B.A.-SANSKRIT ANC. HISTORY POLITICAL SCIENCE', 'B.A.-SANSKRIT HINDI ECONOMICS', 'B.A.-SANSKRIT ENGLISH LIT. POLITICAL SCIENCE', 'B.A.-SANSKRIT HINDI ANC. HISTORY', 'B.A.-POLITICAL SCIENCE GEOGRAPHY ANTHROPOLOGY', 'B.A.-SANSKRIT ENGLISH LIT. PHILOSOPHY', 'B.A.-POLITICAL SCIENCE GEOGRAPHY ANC. HISTORY', 'B.A.-HINDI ANC. HISTORY EDUCATION', 'B.A.-POLITICAL SCIENCE DEFENCE STD. ANTHROPOLOGY', 'B.A.-PHILOSOPHY ANC. HISTORY POLITICAL SCIENCE', 'B.A.-SANSKRIT HINDI EDUCATION', 'B.A.-GEOGRAPHY DEFENCE STD. PHILOSOPHY', 'B.A.-GEOGRAPHY PSYCHOLOGY ENGLISH LIT.', 'B.A.-GEOGRAPHY DEFENCE STD. ENGLISH LIT.', 'B.A.-GEOGRAPHY DEFENCE STD. ENGLISH LANG.', 'B.A.-GEOGRAPHY DEFENCE STD. ANC. HISTORY', 'B.A.-ENGLISH LIT. PHILOSOPHY POLITICAL SCIENCE', 'B.A.-POLITICAL SCIENCE DEFENCE STD. PHILOSOPHY', 'B.A.-SANSKRIT HINDI MED. HISTORY', 'B.A.-SITAR HINDI MED. HISTORY', 'B.A.-SANSKRIT PHILOSOPHY ANC. HISTORY', 'B.A.-VOCAL SANSKRIT HINDI', 'B.A.-VOCAL SANSKRIT EDUCATION', 'B.A.-VOCAL ENGLISH LIT. ECONOMICS', 'B.A.-VOCAL ENGLISH LANG. EDUCATION', 'B.A.-VOCAL ANC. HISTORY EDUCATION', 'B.A.-VOCAL SANSKRIT EDUCATION', 'B.A.-URDU MED. HISTORY ECONOMICS', 'B.A.-URDU ENGLISH LIT. MED. HISTORY', 'B.A.-URDU ENGLISH LIT. ANC. HISTORY', 'B.A.-TABLA SANSKRIT HINDI', 'B.A.-SANSKRIT HINDI PHILOSOPHY', 'B.A.-TABLA SANSKRIT ENGLISH LIT.', 'B.A.-TABLA ANC. HISTORY EDUCATION', 'B.A.-SOCIOLOGY EDUCATION MED. HISTORY', 'B.A.-SOCIOLOGY PHILOSOPHY ANC. HISTORY', 'B.A.-SOCIOLOGY PSYCHOLOGY GEOGRAPHY', 'B.A.-SOCIOLOGY ECONOMICS POL. SCIENCE', 'B.A.-SITAR SANSKRIT POLITICAL SCIENCE'
];

const auGenericCuet = { alternatives: [['English or Hindi', 'Any two listed domain subjects', 'General Test (501)']], paperCodes: ['101/102', 'Section II', '501'], status: 'verified', sourceSection: 'NTA University of Allahabad programme table, B.A. rows' };
const auRecords = [
  record({ id: 'au-bcom-2026', institution: 'University of Allahabad', institutionType: 'Central University', city: 'Prayagraj', collegeOrCampus: null, programme: 'B.Com.', classXIIEligibility: { qualification: '10+2/equivalent from a recognised board; official 2026 bulletin identifies Commerce or Science for B.Com.', stream: ['Commerce', 'Science'], requiredSubjects: [], minimumMarks: null, ageRule: null, status: 'incomplete', note: 'Official bulletin PDF was located but not successfully text-verified in this run; no minimum mark is inferred.' }, cuetSubjectRequirements: { alternatives: [], paperCodes: [], status: 'incomplete', note: 'Programme-specific CUET subject combination was not confirmed from the retrievable official 2026 bulletin.' }, counsellingRoute: { name: 'University of Allahabad UG admission process', status: 'incomplete', sourceSection: 'UG Admissions 2025 page; bulletin entry marked to be updated' }, seats: empty(), historicalCutoffs: empty('incomplete', 'Official Commerce merit/cutoff notices are listed on the admissions page, but individual notices were not re-opened and transcribed here.'), sources: [source(urls.auBulletin, 'UG Information Bulletin 2026, University of Allahabad', 'p. 12; official PDF located, text verification incomplete', 2026, 'incomplete'), source(urls.auAdmissions, 'UG Admissions 2025, University of Allahabad', 'Commerce merit/cutoff notice index', 2025, 'incomplete')], verificationStatus: 'incomplete', notes: ['Do not show a cutoff score until the individual official merit notice is extracted.'] }),
  record({ id: 'au-bca-2025', institution: 'University of Allahabad', institutionType: 'Central University', city: 'Prayagraj', collegeOrCampus: null, programme: 'BCA', classXIIEligibility: { qualification: '10+2/equivalent from a recognised board in Science or Commerce; other streams require Mathematics/Statistics/IT/Computer Science/Information Science.', stream: ['Science', 'Commerce', 'Other with specified subject'], requiredSubjects: ['One of Mathematics/Statistics/IT/Computer Science/Information Science where applicable'], minimumMarks: null, ageRule: null, status: 'verified' }, cuetSubjectRequirements: { alternatives: [['English or Hindi', 'Any two of Computer Science/Information Practices, Mathematics, Physics', 'General Test (501)']], paperCodes: ['101/102', '308/319/322', '501'], status: 'verified', sourceSection: 'NTA University of Allahabad programme table, BCA row' }, counsellingRoute: { name: 'University of Allahabad UG admission process', status: 'incomplete', sourceSection: 'University-specific route not transcribed from official bulletin' }, seats: empty(), historicalCutoffs: empty(), sources: [source(urls.ntaAu, 'University of Allahabad | CUET UG programme information', 'Programme(s) Information, BCA row', 2025)], verificationStatus: 'incomplete' }),
  record({ id: 'au-ba-media-studies-2025', institution: 'University of Allahabad', institutionType: 'Central University', city: 'Prayagraj', collegeOrCampus: null, programme: 'B.A. Media Studies', classXIIEligibility: { qualification: '10+2/equivalent.', stream: ['Any'], requiredSubjects: [], minimumMarks: null, ageRule: null, status: 'verified' }, cuetSubjectRequirements: { alternatives: [['English or Hindi', 'Any one listed Section II domain subject', 'General Test (501)']], paperCodes: ['101/102', 'Section II', '501'], status: 'verified', sourceSection: 'NTA University of Allahabad programme table, B.A. Media Studies row' }, counsellingRoute: { name: 'University of Allahabad UG admission process', status: 'incomplete' }, seats: empty(), historicalCutoffs: empty(), sources: [source(urls.ntaAu, 'University of Allahabad | CUET UG programme information', 'Programme(s) Information, B.A. Media Studies row', 2025)], verificationStatus: 'incomplete' })
];

for (let i = 0; i < auBaNames.length; i++) {
  const name = auBaNames[i];
  auRecords.push(record({ id: `au-ba-combination-${String(i + 1).padStart(2, '0')}`, institution: 'University of Allahabad', institutionType: 'Central University', city: 'Prayagraj', collegeOrCampus: null, programme: name, classXIIEligibility: { qualification: '10+2/equivalent in Arts, Science or Commerce from a recognised board.', stream: ['Arts', 'Science', 'Commerce'], requiredSubjects: [], minimumMarks: null, ageRule: null, status: 'verified', note: name.includes('GEOGRAPHY') ? 'NTA row adds Geography or Science at Intermediate level.' : name.includes('MUSIC') || name.includes('SITAR') || name.includes('VOCAL') || name.includes('TABLA') ? 'NTA row adds Music at Intermediate level.' : name.includes('URDU') ? 'NTA row adds Urdu at Intermediate level for this combination.' : null }, cuetSubjectRequirements: auGenericCuet, counsellingRoute: { name: 'University of Allahabad UG admission process', status: 'incomplete' }, seats: empty(), historicalCutoffs: empty(), sources: [source(urls.ntaAu, 'University of Allahabad | CUET UG programme information', `Programme(s) Information, B.A. row ${i + 8}`, 2025)], verificationStatus: 'incomplete' }));
}

const ipuRows = [
  ['ipu-bca-2025', 'BCA', ['English (101)', 'Mathematics (319)', 'Computer Science/Information Practices (308)', 'General Test (501)'], 'Pass in 12th with minimum 50% aggregate; pass English and Mathematics or Computer Science/related subject.', 'NTA GGSIPU programme table row 1'],
  ['ipu-ba-economics-2025', '4-Year B.A. Economics', ['English (101)', 'Economics/Business Economics (309)', 'Mathematics/Applied Mathematics (319)'], '50% aggregate in 10+2 from a recognised board with English compulsory.', 'NTA GGSIPU programme table row 4'],
  ['ipu-ba-english-2025', '4-Year B.A. English', ['English (101)', 'General Test (501)'], '50% aggregate in 10+2 from a recognised board with English compulsory.', 'NTA GGSIPU programme table row 5'],
  ['ipu-bsc-environmental-science-2025', 'B.Sc. Environmental Science', ['English (101)', 'Any one listed Section II subject', 'General Test (501)'], '10+2 Science; 50% aggregate for General and 45% for SC/ST.', 'NTA GGSIPU programme table row 6'],
  ['ipu-bcom-hons-2025', '4-Year B.Com. (Hons.)', ['English (101)', 'General Test (501)'], '50% aggregate in 10+2 with pass in five subjects, including one language and four elective subjects.', 'NTA GGSIPU programme table row 19'],
  ['ipu-bhmct-2025', 'BHMCT', ['English (101)', 'General Test (501)', 'Accountancy/Book Keeping (301)'], '50% aggregate in 10+2; pass English.', 'NTA GGSIPU programme table row 20'],
  ['ipu-bba-2025', '4-Year BBA and allied programmes', ['English (101)', 'General Test (501)', 'Business Studies (305)'], '50% aggregate in 10+2; pass English.', 'NTA GGSIPU programme table row 21'],
  ['ipu-bjmc-2025', 'BJMC', ['English (101)', 'General Test (501)', 'Mass Media/Mass Communication (318)'], '50% aggregate in 10+2; pass English.', 'NTA GGSIPU programme table row 18'],
  ['ipu-bsc-y-2025', 'B.Sc. (Y)', ['Physics (322)', 'Chemistry (306)', 'Biology/Biotechnology (304)', 'Mathematics (319)', 'General Test (501)', 'English (101)'], 'Science stream; 50% aggregate in any four subjects including English, pass each subject.', 'NTA GGSIPU programme table row 30'],
  ['ipu-btech-bt-2025', 'B.Tech (BT)', ['Physics (306)', 'Chemistry (322)', 'Mathematics (319)', 'Biology/Biotechnology (304)'], '55% aggregate in Physics, Chemistry and Mathematics/Biology/Biotechnology; pass each subject and English.', 'NTA GGSIPU programme table row 31']
];
const ipuRecords = ipuRows.map(([id, programme, papers, eligibilityText, section]) => record({ id, institution: 'Guru Gobind Singh Indraprastha University', institutionType: 'State University', city: 'Delhi', collegeOrCampus: null, programme, classXIIEligibility: { qualification: eligibilityText, stream: ['Any'], requiredSubjects: [], minimumMarks: eligibilityText.match(/(\d+)%/) ? Number(eligibilityText.match(/(\d+)%/)[1]) : null, ageRule: null, status: 'verified' }, cuetSubjectRequirements: { alternatives: [papers], paperCodes: papers.filter(p => /\(\d+\)/.test(p)).map(p => p.match(/\((\d+)\)/)[1]), status: 'verified', sourceSection: section }, counsellingRoute: { name: 'GGSIPU admission process / CUET merit route', status: 'incomplete', sourceSection: 'GGSIPU CUET addendum and schedule notices' }, seats: empty(), historicalCutoffs: empty(), sources: [source(urls.ntaIpu, 'Guru Gobind Singh Indraprastha University | CUET UG programme information', section, 2025), source(urls.ipuAddendum, 'Addendum to Admission Brochure for Bachelor Programmes 2025-26: admissions through CUET merit', 'CUET merit route', 2025, 'verified'), source(urls.ipuSchedule, 'GGSIPU Schedule Notices', '2025 CUET programme/cutoff notices', 2025, 'verified')], verificationStatus: 'incomplete', notes: ['College-level affiliation, seats, category quota and historical closing scores require the programme-specific GGSIPU brochure/notice and are not inferred here.'] }));

const records = [...duRecords, ...bhuRecords, ...auRecords, ...ipuRecords];
const csvFields = ['id', 'institution', 'ntaType', 'collegeOrCampus', 'city', 'programme', 'classXIIStatus', 'classXIIStream', 'classXIIRequiredSubjects', 'minimumMarks', 'cuetStatus', 'cuetAlternatives', 'counsellingRoute', 'seatStatus', 'historicalCutoffStatus', 'verificationStatus', 'sourceUrls', 'sourceTitles', 'sourcePagesOrSections', 'admissionYears', 'lastVerified', 'notes'];
const csvEscape = value => `"${String(value ?? '').replace(/"/g, '""')}"`;
const rows = records.map(r => ({ id: r.id, institution: r.institution.name, ntaType: r.institution.ntaType, collegeOrCampus: r.collegeOrCampus?.name || '', city: r.collegeOrCampus?.city || '', programme: r.programme.name, classXIIStatus: r.classXIIEligibility.status, classXIIStream: (r.classXIIEligibility.stream || []).join(' | '), classXIIRequiredSubjects: (r.classXIIEligibility.requiredSubjects || []).join(' | '), minimumMarks: r.classXIIEligibility.minimumMarks ?? '', cuetStatus: r.cuetSubjectRequirements.status, cuetAlternatives: (r.cuetSubjectRequirements.alternatives || []).map(a => a.join(' + ')).join(' OR '), counsellingRoute: r.counsellingRoute?.name || '', seatStatus: r.seats.status, historicalCutoffStatus: r.historicalCutoffs.status, verificationStatus: r.verificationStatus, sourceUrls: r.sources.map(s => s.url).join(' | '), sourceTitles: r.sources.map(s => s.documentTitle).join(' | '), sourcePagesOrSections: r.sources.map(s => s.pageOrSection).join(' | '), admissionYears: [...new Set(r.sources.map(s => s.admissionYear))].join(' | '), lastVerified, notes: r.notes.join(' | ') }));
const csv = [csvFields.join(','), ...rows.map(row => csvFields.map(field => csvEscape(row[field])).join(','))].join('\n') + '\n';

await fs.mkdir(outDir, { recursive: true });
await fs.writeFile(path.join(outDir, 'programme-inventory.json'), JSON.stringify({ schemaVersion: '1.0.0', generatedOn: lastVerified, coverage: { institutionCount: 244, institutionCountMeaning: 'Top-level NTA participating institutions; not colleges', programmeRecordCount: records.length, institutionCoverage: ['University of Delhi', 'Banaras Hindu University', 'University of Allahabad', 'Guru Gobind Singh Indraprastha University'], completeCollegeInventory: false }, records }, null, 2));
await fs.writeFile(path.join(outDir, 'programme-inventory.csv'), csv);
await fs.writeFile(path.join(outDir, 'source-verification.json'), JSON.stringify({ generatedOn: lastVerified, sources: [...new Map(records.flatMap(r => r.sources).map(s => [s.url + '|' + s.pageOrSection, s])).values()], rules: ['No missing eligibility or cutoff value is inferred.', 'Class XII eligibility and CUET subject requirements are separate fields.', 'Historical cutoffs are guidance only, never guaranteed admission.', '244 is the NTA institution count; college and campus counts are separate and are not claimed complete.'] }, null, 2));
await fs.writeFile(path.join(outDir, 'test-cases.json'), JSON.stringify({ generatedOn: lastVerified, cases: [
  { name: 'DU SRCC B.Com (Hons.)', recordId: 'du-srcc-bcom-hons-2025', expected: { institution: 'University of Delhi', collegeOrCampus: 'Shri Ram College of Commerce', separateClassXIIAndCuetFields: true, historicalCutoffGuidanceOnly: true, seatStatus: 'unavailable' } },
  { name: 'DU Miranda House B.A. (Hons.) English', recordId: 'du-miranda-ba-hons-english-2025', expected: { seatStatus: 'verified', historicalCutoffGuidanceOnly: true, seatUR: 3, cutoffUR: 863.0249541 } },
  { name: 'BHU B.Com. (Hons.)', recordId: 'bhu-bcom-hons-2025', expected: { minimumMarks: 50, cuetPaperCodes: ['301', '305', '501'], route: 'CAP-UG', seatStatus: 'verified' } },
  { name: 'Allahabad B.Com.', recordId: 'au-bcom-2026', expected: { verificationStatus: 'incomplete', minimumMarks: null, noInventedCutoff: true } }
] }, null, 2));
const registryPayload = JSON.parse(await fs.readFile(path.join(outDir, 'institution-registry.json'), 'utf8'));
const registry = registryPayload.institutions;
for (const item of registry) if (item.name === 'DR. SHAKUNTALA MISMA NATIONAL REHABILITATION UNIVERSITY, LUCKNOW') item.name = 'DR. SHAKUNTALA MISRA NATIONAL REHABILITATION UNIVERSITY, LUCKNOW';
registryPayload.institutions = registry;
await fs.writeFile(path.join(outDir, 'institution-registry.json'), JSON.stringify(registryPayload, null, 2));
const registryCsvPath = path.join(outDir, 'institution-registry.csv');
await fs.writeFile(registryCsvPath, (await fs.readFile(registryCsvPath, 'utf8')).replaceAll('DR. SHAKUNTALA MISMA NATIONAL REHABILITATION UNIVERSITY, LUCKNOW', 'DR. SHAKUNTALA MISRA NATIONAL REHABILITATION UNIVERSITY, LUCKNOW'));
const coveredInstitutions = new Set(records.map(r => r.institution.name));
const missingRows = registry.map(i => ({ institutionId: i.institutionId, institution: i.name, ntaType: i.ntaType, ntaParticipationStatus: i.participationVerification.status, collegeInventoryStatus: coveredInstitutions.has(i.name) ? 'priority-records-only' : 'unavailable', programmeInventoryStatus: coveredInstitutions.has(i.name) ? 'priority-records-only' : 'unavailable', collegeCount: i.collegeCount, programmeCount: i.programmeCount, requiredNextDocuments: 'Official admission bulletin/prospectus; programme mapping; constituent-college/campus list; category seat matrix; counselling route; historical cutoff/allocation notice', lastVerified: i.participationVerification.lastVerified, sourceUrl: i.participationVerification.source.url }));
const missingFields = ['institutionId','institution','ntaType','ntaParticipationStatus','collegeInventoryStatus','programmeInventoryStatus','collegeCount','programmeCount','requiredNextDocuments','lastVerified','sourceUrl'];
await fs.writeFile(path.join(outDir, 'missing-documents.csv'), [missingFields.join(','), ...missingRows.map(row => missingFields.map(field => csvEscape(row[field])).join(','))].join('\n') + '\n');
await fs.writeFile(path.join(outDir, 'README.md'), [
  '# CUET institution and programme research pack',
  '',
  'Generated ' + lastVerified + '. This is a research layer; production predictor code was not modified.',
  '',
  'The NTA participating-universities catalogue contains 244 top-level institution entries for the audited cycle: 49 central, 41 state, 27 deemed, 120 private and 7 other government institutions. This is not a college count.',
  '',
  'Programme records in this release: ' + records.length + '. Priority institutions: University of Delhi, Banaras Hindu University, University of Allahabad and Guru Gobind Singh Indraprastha University.',
  '',
  'Class XII eligibility and CUET subject requirements are independent fields. Missing values are null or marked unavailable/incomplete; no eligibility or cutoff is inferred. Historical scores are guidance only and never guaranteed admission.',
  '',
  'Files: institution-registry.json/csv; programme-inventory.json/csv; source-verification.json; missing-documents.csv; test-cases.json.'
].join('\n'));
await fs.writeFile(path.join(outDir, 'audit-report.md'), [
  '# CUETAce predictor data audit',
  '',
  'Audit date: ' + lastVerified,
  '',
  'The production catalogue currently stores 244 as an NTA institution total but only a small commerce-first set of programme records. Several records use a placeholder college value such as University of Delhi colleges; that is not a constituent-college inventory.',
  '',
  'The required hierarchy is: NTA participating institution -> university/institution -> constituent college/campus -> programme -> Class XII eligibility + CUET subjects + marks + category/quota + counselling + seats + historical evidence.',
  '',
  'The current predictor logic matches programme-level stream/subject/minimum-mark rules and sums stored CUET alternatives. It does not yet model constituent colleges, college-specific seat matrices, category-wise allocations, source verification status or different scoring scales. Frontend files were intentionally left unchanged.',
  '',
  'NTA top-level institution registry: 244 records. College/campus and programme records in this release: ' + records.length + ' priority records across four institutions.',
  '',
  'See missing-documents.csv for the per-institution document gap tracker. No missing eligibility or cutoff value was inferred.'
].join('\n'));
console.log(JSON.stringify({ programmeRecordCount: records.length, repaired: true }, null, 2));
