/*
 * CUETAce Predictor catalogue.
 *
 * This is deliberately evidence-first. The institution counts are the live
 * NTA 2026 catalogue scope; programme records below are the verified
 * commerce-first pilot records used by the predictor UI. New records should
 * retain an official source and a last-verified date before being promoted to
 * reliable recommendations.
 */
window.CUET_PREDICTOR_DATA = {
  metadata: {
    cycle: 2026,
    verifiedOn: '2026-07-12',
    institutionCounts: {
      central: 49,
      state: 41,
      deemed: 27,
      private: 120,
      otherGovernment: 7
    },
    institutionTotal: 244,
    catalogueSource: 'https://cuet.nta.nic.in/participating-universities/',
    bulletinSource: 'https://cdnbbsr.s3waas.gov.in/s3d1a21da7bca4abff8b0b61b87597de73/uploads/2026/01/202601031633478370.pdf'
  },

  subjects: [
    { id: 'English', label: 'English', type: 'language' },
    { id: 'Hindi', label: 'Hindi', type: 'language' },
    { id: 'Accountancy', label: 'Accountancy / Book Keeping', type: 'domain' },
    { id: 'Business Studies', label: 'Business Studies', type: 'domain' },
    { id: 'Economics', label: 'Economics / Business Economics', type: 'domain' },
    { id: 'Mathematics', label: 'Mathematics / Applied Mathematics', type: 'domain' },
    { id: 'Computer Science', label: 'Computer Science / Informatics Practices', type: 'domain' },
    { id: 'General Test', label: 'General Aptitude Test', type: 'general' }
  ],

  programmes: [
    {
      id: 'du-bcom-hons-aryabhatta',
      institution: 'University of Delhi',
      category: 'Central University',
      college: 'Aryabhatta College',
      city: 'Delhi',
      programme: 'B.Com. (Hons.)',
      stream: ['Commerce', 'Any'],
      classXII: { requiredSubjects: [], anyOfSubjects: ['Accountancy', 'Mathematics'], minAggregate: 0 },
      cuet: {
        alternatives: [
          ['English', 'Mathematics', 'Accountancy', 'Business Studies'],
          ['English', 'Accountancy', 'Business Studies', 'Economics']
        ]
      },
      score: { type: 'DU computed allocation score', max: 1000, sourceScale: 'programme-specific proration' },
      historical: [{ year: 2025, round: '1', category: 'UR', score: 808.249, label: '2025 Round 1 allocation score', source: 'https://admission.uod.ac.in/userfiles/downloads/2025/19072025_CutOff_UG_Round_One.pdf' }],
      route: 'CSAS (UG)',
      evidence: 'https://cdnbbsr.s3waas.gov.in/s3d1a21da7bca4abff8b0b61b87597de73/uploads/2025/12/202512271200063091.pdf',
      evidenceLabel: 'NTA 2026 programme mapping + DU 2025 allocation list',
      status: 'verified'
    },
    {
      id: 'du-bcom-hons-arsd',
      institution: 'University of Delhi',
      category: 'Central University',
      college: 'Atma Ram Sanatan Dharma College',
      city: 'Delhi',
      programme: 'B.Com. (Hons.)',
      stream: ['Commerce', 'Any'],
      classXII: { requiredSubjects: [], anyOfSubjects: ['Accountancy', 'Mathematics'], minAggregate: 0 },
      cuet: {
        alternatives: [
          ['English', 'Mathematics', 'Accountancy', 'Business Studies'],
          ['English', 'Accountancy', 'Business Studies', 'Economics']
        ]
      },
      score: { type: 'DU computed allocation score', max: 1000, sourceScale: 'programme-specific proration' },
      historical: [{ year: 2025, round: '1', category: 'UR', score: 846.371, label: '2025 Round 1 allocation score', source: 'https://admission.uod.ac.in/userfiles/downloads/2025/19072025_CutOff_UG_Round_One.pdf' }],
      route: 'CSAS (UG)',
      evidence: 'https://cdnbbsr.s3waas.gov.in/s3d1a21da7bca4abff8b0b61b87597de73/uploads/2025/12/202512271200063091.pdf',
      evidenceLabel: 'NTA 2026 programme mapping + DU 2025 allocation list',
      status: 'verified'
    },
    {
      id: 'du-bcom-hons-aditi',
      institution: 'University of Delhi',
      category: 'Central University',
      college: 'Aditi Mahavidyalaya',
      city: 'Delhi',
      programme: 'B.Com. (Hons.)',
      stream: ['Commerce', 'Any'],
      classXII: { requiredSubjects: [], anyOfSubjects: ['Accountancy', 'Mathematics'], minAggregate: 0 },
      cuet: {
        alternatives: [
          ['English', 'Mathematics', 'Accountancy', 'Business Studies'],
          ['English', 'Accountancy', 'Business Studies', 'Economics']
        ]
      },
      score: { type: 'DU computed allocation score', max: 1000, sourceScale: 'programme-specific proration' },
      historical: [{ year: 2025, round: '1', category: 'UR', score: 692.947, label: '2025 Round 1 allocation score', source: 'https://admission.uod.ac.in/userfiles/downloads/2025/19072025_CutOff_UG_Round_One.pdf' }],
      route: 'CSAS (UG)',
      evidence: 'https://cdnbbsr.s3waas.gov.in/s3d1a21da7bca4abff8b0b61b87597de73/uploads/2025/12/202512271200063091.pdf',
      evidenceLabel: 'NTA 2026 programme mapping + DU 2025 allocation list',
      status: 'verified'
    },
    {
      id: 'du-bcom',
      institution: 'University of Delhi',
      category: 'Central University',
      college: 'University of Delhi colleges',
      city: 'Delhi',
      programme: 'B.Com.',
      stream: ['Commerce', 'Any'],
      classXII: { requiredSubjects: [], minAggregate: 0 },
      cuet: { alternatives: [['English', 'Accountancy', 'Business Studies', 'Economics'], ['English', 'Accountancy', 'General Test']] },
      score: { type: 'DU computed allocation score', max: 1000, sourceScale: 'programme-specific proration' },
      historical: [],
      route: 'CSAS (UG)',
      evidence: 'https://cdnbbsr.s3waas.gov.in/s3d1a21da7bca4abff8b0b61b87597de73/uploads/2025/12/202512271200063091.pdf',
      evidenceLabel: 'NTA 2026 programme mapping',
      status: 'verified-eligibility'
    },
    {
      id: 'du-bms',
      institution: 'University of Delhi',
      category: 'Central University',
      college: 'University of Delhi colleges',
      city: 'Delhi',
      programme: 'BMS',
      stream: ['Commerce', 'Any'],
      classXII: { requiredSubjects: ['Mathematics'], minAggregate: 0 },
      cuet: { alternatives: [['English', 'Mathematics', 'Business Studies', 'General Test']] },
      score: { type: 'DU computed allocation score', max: 1000, sourceScale: 'programme-specific proration' },
      historical: [],
      route: 'CSAS (UG)',
      evidence: 'https://cdnbbsr.s3waas.gov.in/s3d1a21da7bca4abff8b0b61b87597de73/uploads/2025/12/202512271200063091.pdf',
      evidenceLabel: 'NTA 2026 programme mapping',
      status: 'verified-eligibility'
    },
    {
      id: 'du-bba-fia',
      institution: 'University of Delhi',
      category: 'Central University',
      college: 'University of Delhi colleges',
      city: 'Delhi',
      programme: 'BBA-FIA',
      stream: ['Commerce', 'Any'],
      classXII: { requiredSubjects: [], anyOfSubjects: ['Accountancy', 'Mathematics'], minAggregate: 0 },
      cuet: { alternatives: [['English', 'Mathematics', 'Accountancy', 'Business Studies'], ['English', 'Accountancy', 'Business Studies', 'Economics']] },
      score: { type: 'DU computed allocation score', max: 1000, sourceScale: 'programme-specific proration' },
      historical: [],
      route: 'CSAS (UG)',
      evidence: 'https://cdnbbsr.s3waas.gov.in/s3d1a21da7bca4abff8b0b61b87597de73/uploads/2025/12/202512271200063091.pdf',
      evidenceLabel: 'NTA 2026 programme mapping',
      status: 'verified-eligibility'
    },
    {
      id: 'bhu-bcom-foc',
      institution: 'Banaras Hindu University',
      category: 'Central University',
      college: 'Faculty of Commerce',
      city: 'Varanasi',
      programme: 'B.Com. (Hons.)',
      stream: ['Commerce'],
      classXII: { requiredSubjects: [], minAggregate: 50 },
      cuet: { alternatives: [['Accountancy', 'Business Studies', 'General Test']] },
      score: { type: 'BHU merit score', max: 750, sourceScale: 'BHU counselling score' },
      historical: [{ year: 2025, round: '2', category: 'UR', score: 542.9209726, label: '2025 Round 2 cutoff', source: 'https://api.bhu.edu.in/uploads/bh_ug_cut_off_c3a6cf224a.pdf' }],
      route: 'CAP-UG',
      evidence: 'https://cdnbbsr.s3waas.gov.in/s3d1a21da7bca4abff8b0b61b87597de73/uploads/2025/12/202512271556238922.pdf',
      evidenceLabel: 'NTA 2026 programme mapping + BHU 2025 cutoff',
      status: 'verified'
    },
    {
      id: 'bhu-bcom-vasanta',
      institution: 'Banaras Hindu University',
      category: 'Central University',
      college: 'Vasanta College for Women',
      city: 'Varanasi',
      programme: 'B.Com. (Hons.)',
      stream: ['Commerce'],
      classXII: { requiredSubjects: ['Accountancy'], minAggregate: 50 },
      cuet: { alternatives: [['Accountancy', 'Business Studies', 'General Test']] },
      score: { type: 'BHU merit score', max: 750, sourceScale: 'BHU counselling score' },
      historical: [{ year: 2024, round: '3', category: 'UR', score: 429, label: '2024 Round 3 cutoff', source: 'https://api.bhu.edu.in/uploads/ug_cutoff_round_3_e6f5b42b9b.pdf' }],
      route: 'CAP-UG',
      evidence: 'https://cdnbbsr.s3waas.gov.in/s3d1a21da7bca4abff8b0b61b87597de73/uploads/2025/12/202512271556238922.pdf',
      evidenceLabel: 'NTA 2026 programme mapping + BHU 2024 cutoff',
      status: 'verified'
    },
    {
      id: 'allahabad-bcom',
      institution: 'University of Allahabad',
      category: 'Central University',
      college: 'University of Allahabad and affiliated colleges',
      city: 'Prayagraj',
      programme: 'B.Com.',
      stream: ['Commerce'],
      classXII: { requiredSubjects: [], anyOfSubjects: ['Accountancy', 'Economics', 'Mathematics'], minAggregate: 0 },
      cuet: { alternatives: [['English', 'Accountancy', 'General Test'], ['Hindi', 'Accountancy', 'General Test']] },
      score: { type: 'Allahabad computed merit score', max: 750, sourceScale: 'language + domain + GAT' },
      historical: [
        { year: 2025, round: '1', category: 'UR', score: 457, label: '2025 first merit cutoff', source: 'https://allduniv.ac.in/upload/file_collection/BCom%20Notice_1st.pdf' },
        { year: 2025, round: '15', category: 'UR', score: 402.75, label: '2025 fifteenth merit cutoff floor', source: 'https://allduniv.ac.in/upload/file_collection/BCom%2015th%20List.pdf' }
      ],
      route: 'University registration + counselling',
      evidence: 'https://cdnbbsr.s3waas.gov.in/s3d1a21da7bca4abff8b0b61b87597de73/uploads/2025/12/202512271187610393.pdf',
      evidenceLabel: 'NTA 2026 programme mapping + Allahabad 2025 merit lists',
      status: 'verified'
    },
    {
      id: 'ipu-bcom-hons',
      institution: 'Guru Gobind Singh Indraprastha University',
      category: 'State University',
      college: 'GGSIPU affiliated colleges',
      city: 'Delhi',
      programme: 'Four-year B.Com. (Hons.)',
      stream: ['Commerce'],
      classXII: { requiredSubjects: [], minAggregate: 50 },
      cuet: { alternatives: [['English', 'Accountancy', 'General Test']] },
      score: { type: 'University merit score', max: 750, sourceScale: 'university-specific' },
      historical: [],
      route: 'GGSIPU admission process',
      evidence: 'https://cdnbbsr.s3waas.gov.in/s3d1a21da7bca4abff8b0b61b87597de73/uploads/2025/12/202512282051857860.pdf',
      evidenceLabel: 'NTA 2026 programme mapping',
      status: 'verified-eligibility'
    },
    {
      id: 'rgu-bcom',
      institution: 'Rajiv Gandhi University',
      category: 'Central University',
      college: 'RGU affiliated colleges',
      city: 'Arunachal Pradesh',
      programme: 'Four-year B.Com.',
      stream: ['Commerce'],
      classXII: { requiredSubjects: [], anyOfSubjects: ['Accountancy', 'Economics', 'Mathematics'], minAggregate: 0 },
      cuet: { alternatives: [['Accountancy'], ['Economics'], ['Mathematics']] },
      score: { type: 'NTA score used by university', max: 250, sourceScale: 'single mapped domain paper' },
      historical: [],
      route: 'University admission process',
      evidence: 'https://cdnbbsr.s3waas.gov.in/s3d1a21da7bca4abff8b0b61b87597de73/uploads/2025/12/202512271384198368.pdf',
      evidenceLabel: 'NTA 2026 programme mapping',
      status: 'verified-eligibility'
    },
    {
      id: 'shoolini-bcom-acca',
      institution: 'Shoolini University of Biotechnology and Management Sciences',
      category: 'Private University',
      college: 'Shoolini University campus',
      city: 'Solan',
      programme: 'B.Com. (Hons.) ACCA',
      stream: ['Any'],
      classXII: { requiredSubjects: [], minAggregate: 50 },
      cuet: { alternatives: [['English', 'General Test']] },
      score: { type: 'NTA score used by university', max: 500, sourceScale: 'English + GAT' },
      historical: [],
      route: 'University admission process',
      evidence: 'https://cdnbbsr.s3waas.gov.in/s3d1a21da7bca4abff8b0b61b87597de73/uploads/2025/12/202512281291695554.pdf',
      evidenceLabel: 'NTA 2026 programme mapping',
      status: 'verified-eligibility'
    }
  ]
};
