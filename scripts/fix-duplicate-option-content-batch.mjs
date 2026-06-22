import fs from 'node:fs';

const patchesByFile = {
  'questions/accountancy/AC01.json': {
    AC01Q106: {
      options: [
        'Ravi gains 1/10, Soni sacrifices 1/10, Tanu unchanged',
        'Ravi sacrifices 1/10, Soni gains 1/10, Tanu unchanged',
        'Ravi gains 1/10, Soni sacrifices 1/10, Tanu gains 1/10',
        'Ravi gains 1/10, Soni unchanged, Tanu sacrifices 1/10'
      ]
    }
  },
  'questions/accountancy/AC02.json': {
    AC02Q85: {
      options: [
        'Transfer ₹20,000; each gets ₹23,333',
        'Transfer ₹50,000; each gets ₹13,333',
        'Transfer ₹10,000; each gets ₹26,667',
        'Transfer ₹30,000; each gets ₹20,000'
      ]
    },
    AC02Q106: {
      options: ['₹82,000', '₹62,000', '₹58,000', '₹78,000'],
      correct: 0,
      explanation: "B's credits are interest on capital ₹24,000, salary ₹18,000, and share of divisible profit = ₹1,20,000 x 2/6 = ₹40,000. Total credited to B = ₹24,000 + ₹18,000 + ₹40,000 = ₹82,000. Option A is correct."
    },
    AC02Q166: {
      options: [
        'A=Rs.44,000; B=Rs.36,000',
        'A=Rs.40,000; B=Rs.40,000',
        'A=Rs.39,200; B=Rs.40,800',
        'A=Rs.36,800; B=Rs.43,200'
      ]
    }
  },
  'questions/accountancy/AC03.json': {
    ACO3Q96: {
      options: [
        '₹45,000 + ₹18,000 = ₹63,000',
        '₹54,000 + ₹36,000 = ₹90,000',
        '₹36,000 + ₹27,000 = ₹63,000',
        "A's profit = ₹72,000 under new ratio for 6 months"
      ],
      correct: 0,
      explanation: "Profit accrues evenly. For Apr-Sep, profit = ₹1,80,000 x 6/12 = ₹90,000 and A's old-ratio share = 5/10 x ₹90,000 = ₹45,000. For Oct-Mar, profit = ₹90,000 and A's new-ratio share = 2/10 x ₹90,000 = ₹18,000. Total = ₹63,000. Option A is correct."
    },
    ACO3Q180: {
      options: [
        '₹80,000 + ₹40,000 + ₹8,000 = ₹1,28,000',
        '₹80,000 + ₹40,000 = ₹1,20,000',
        '₹80,000 + ₹32,000 + ₹8,000 = ₹1,20,000',
        '₹1,18,000 (capital + goodwill, less revaluation loss)'
      ],
      correct: 0,
      explanation: "B's share of revaluation profit = 4/10 x ₹20,000 = ₹8,000. Adjusted capital before goodwill = ₹80,000 + ₹8,000 = ₹88,000. Add B's goodwill share ₹40,000. Amount payable to B = ₹1,28,000. Option A is correct."
    }
  },
  'questions/accountancy/AC09.json': {
    AC09Q154: {
      options: ['₹8,40,000', '₹7,00,000', '₹6,00,000', '₹7,40,000'],
      correct: 0,
      explanation: "Initial shareholders' funds = share capital ₹5,00,000 + reserves ₹2,00,000 = ₹7,00,000. New issue increases share capital by ₹1,00,000 and securities premium by ₹40,000. New shareholders' funds = ₹7,00,000 + ₹1,40,000 = ₹8,40,000. Option A is correct."
    },
    AC09Q189: {
      options: ['₹1,01,00,000', '₹85,00,000', '₹96,00,000', '₹1,00,00,000'],
      correct: 0,
      explanation: "Equity share capital = ₹80,00,000 and preference share capital = ₹5,00,000, so total share capital = ₹85,00,000. Securities premium reserve = ₹16,00,000. Total shareholders' funds = ₹85,00,000 + ₹16,00,000 = ₹1,01,00,000. Option A is correct."
    }
  },
  'questions/accountancy/AC10.json': {
    AC10Q149: {
      options: [
        '2,000 allotted; excess ₹48,000; net allotment ₹62,000',
        '2,000 allotted; excess ₹40,000; net allotment ₹70,000',
        '2,500 allotted; excess ₹27,000; net allotment ₹110,500',
        '2,000 allotted; excess ₹24,000; net allotment ₹86,000'
      ]
    }
  },
  'questions/accountancy/AC11.json': {
    AC11Q121: {
      options: ['₹32,000', '₹25,000', '₹51,000', '₹7,000'],
      correct: 0,
      explanation: 'Forfeited amount = 1,000 x ₹7 = ₹7,000. Since the shares are reissued at ₹11, there is no reissue discount and the full forfeited amount is transferred to Capital Reserve. New Capital Reserve = existing ₹25,000 + ₹7,000 = ₹32,000. Option A is correct.'
    }
  },
  'questions/accountancy/AC13.json': {
    AC13Q27: {
      options: ['₹25,00,000', '₹24,50,000', '₹24,00,000', '₹23,50,000'],
      correct: 1,
      explanation: "Net sales = sales ₹25,00,000 - sales returns ₹1,00,000 = ₹24,00,000. Scrap sales of ₹50,000 is operating revenue. Revenue from Operations = ₹24,00,000 + ₹50,000 = ₹24,50,000. Interest and dividend are other income. Option B is correct."
    },
    AC13Q47: {
      options: ['₹37,50,000', '₹37,00,000', '₹36,50,000', '₹35,50,000'],
      correct: 0,
      explanation: 'Share capital = equity ₹20,00,000 + preference ₹5,00,000 = ₹25,00,000. Reserves and surplus = securities premium ₹3,00,000 + revaluation reserve ₹2,00,000 + general reserve ₹4,00,000 + surplus ₹3,50,000 = ₹12,50,000. Shareholders funds = ₹25,00,000 + ₹12,50,000 = ₹37,50,000. Option A is correct.'
    },
    AC13Q84: {
      options: [
        'Gross Block ₹38,00,000; Accumulated Dep. ₹10,45,000; Net Block ₹27,55,000',
        'Gross Block ₹35,00,000; Accumulated Dep. ₹10,45,000; Net Block ₹24,55,000',
        'Gross Block ₹38,00,000; Accumulated Dep. ₹10,00,000; Net Block ₹28,00,000',
        'Gross Block ₹38,00,000; Accumulated Dep. ₹9,45,000; Net Block ₹28,55,000'
      ],
      correct: 0
    },
    AC13Q143: {
      options: [
        'Net Profit ₹12,00,000; Finance Costs ₹0',
        'Net Profit ₹12,00,000; Finance Costs ₹20,00,000',
        'Net Profit ₹12,00,000; Finance Costs ₹12,00,000',
        'Net Profit ₹10,00,000; Finance Costs ₹2,00,000'
      ],
      correct: 0
    }
  },
  'questions/accountancy/AC14.json': {
    AC14Q122: {
      options: ['₹30,000', '₹3,000', '₹3,00,000', '₹60,000'],
      correct: 0,
      explanation: 'Other Income = 1% of Net Revenue. Therefore Other Income = 1% x ₹30,00,000 = ₹30,000. Option A is correct.'
    }
  },
  'questions/economics/EC01.json': {
    EC01Q78: {
      options: [
        '36X + 48Y = 720; Y-intercept = 15',
        '36X + 48Y = 720; Y-intercept = 20',
        '48X + 36Y = 720; Y-intercept = 20',
        '36X + 48Y = 720; Y-intercept = 12'
      ],
      correct: 0
    },
    EC01Q104: {
      options: ['Px = ₹25, Py = ₹40', 'Px = ₹40, Py = ₹25', 'Px = ₹20, Py = ₹50', 'Px = ₹20, Py = ₹40'],
      correct: 0
    },
    EC01Q108: {
      options: ['20 cups', '10 cups', '30 cups', '15 cups'],
      correct: 0
    },
    EC01Q114: {
      options: ['Area increases by 89.06%', 'Area increases by 37.5%', 'Area increases by 72.25%', 'Area increases by 100%'],
      correct: 0,
      explanation: 'Original X-intercept = ₹4,000/₹80 = 50 and Y-intercept = ₹4,000/₹100 = 40, so original area = 1/2 x 50 x 40 = 1,000. New income = ₹4,400, new Px = ₹64, and new Py = ₹80. New intercepts are 68.75 and 55, so new area = 1/2 x 68.75 x 55 = 1,890.625. Increase = (1,890.625 - 1,000)/1,000 x 100 = 89.06%. Option A is correct.'
    },
    EC01Q128: {
      options: ['MUy=50, λ=2', 'MUy=100, λ=2', 'MUy=50, λ=4', 'MUy=200, λ=4'],
      correct: 0
    },
    EC01Q151: {
      options: ['MUy(A)=180; MUy(B)=180', 'MUy(A)=120; MUy(B)=180', 'MUy(A)=90; MUy(B)=120', 'MUy(A)=180; MUy(B)=240'],
      correct: 0
    }
  },
  'questions/economics/EC03.json': {
    EC03Q33: {
      options: ['₹486', '₹336', '₹456', '₹516']
    },
    EC03Q60: {
      options: [
        'Q=9, P=44, TR=396, TC=172, Profit=224',
        'Q=8, P=48, TR=384, TC=164, Profit=220',
        'Q=18, P=8, TR=144, TC=244, Profit=−100',
        'Q=6, P=56, TR=336, TC=148, Profit=188'
      ]
    }
  },
  'questions/economics/EC04.json': {
    EC04Q11: {
      options: ['P = ₹50, Q = 250', 'P = ₹40, Q = 220', 'P = ₹55, Q = 225', 'P = ₹45, Q = 235'],
      correct: 0
    },
    EC04Q112: {
      options: [
        'PC: Q=40, P=₹20; Monopoly: Q=20, P=₹60',
        'PC: Q=40, P=₹20; Monopoly: Q=25, P=₹50',
        'PC: Q=30, P=₹40; Monopoly: Q=20, P=₹60',
        'PC: Q=50, P=₹20; Monopoly: Q=20, P=₹60'
      ],
      correct: 0
    }
  },
  'questions/economics/EC06.json': {
    EC06Q113: {
      options: ['₹10,200 cr', '₹9,200 cr', '₹9,700 cr', '₹10,500 cr'],
      correct: 0
    }
  },
  'questions/economics/EC09.json': {
    EC09Q119: {
      options: ['₹40 crore', '₹240 crore', '₹60 crore', '₹160 crore'],
      correct: 0
    },
    EC09Q136: {
      options: [
        'MPC=0.6; S=-200+0.4Y; K=2.5; Y=₹1,500 crore',
        'MPC=0.6; S=-200+0.4Y; K=2.5; Y=₹2,000 crore',
        'MPC=0.5; S=-200+0.5Y; K=2; Y=₹1,200 crore',
        'MPC=0.6; S=-100+0.4Y; K=2.5; Y=₹1,250 crore'
      ],
      correct: 0
    },
    EC09Q172: {
      options: [
        'C=500, S=100, APC=0.833, APS=0.167',
        'C=500, S=100, APC=0.75, APS=0.25',
        'C=450, S=150, APC=0.75, APS=0.25',
        'C=550, S=50, APC=0.917, APS=0.083'
      ],
      correct: 0
    },
    EC09Q178: {
      options: ['MPS = 0.4; MPC = 0.6', 'MPS = 0.3; MPC = 0.7', 'MPS = 0.5; MPC = 0.5', 'MPS = 0.2; MPC = 0.8'],
      correct: 0
    }
  },
  'questions/economics/EC10.json': {
    EC10Q98: {
      options: ['(i) ₹1,800 crore; (ii) 3.6%', '(i) ₹2,200 crore; (ii) 4.4%', '(i) ₹3,000 crore; (ii) 6%', '(i) ₹1,800 crore; (ii) 2.4%'],
      correct: 0
    },
    EC10Q127: {
      options: [
        'Direct = ₹9,500; Indirect = ₹11,500; Total = ₹21,000 crore',
        'Direct = ₹11,500; Indirect = ₹9,500; Total = ₹21,000 crore',
        'Direct = ₹8,000; Indirect = ₹13,000; Total = ₹21,000 crore',
        'Direct = ₹9,500; Indirect = ₹9,500; Total = ₹19,000 crore'
      ],
      correct: 0
    }
  },
  'questions/economics/EC12.json': {
    EC12Q123: {
      options: [
        '1965: ₹400 profit; 1975: ₹1,500 profit — Green Revolution raised profit 3.75 times',
        '1965: ₹400 profit; 1975: ₹1,200 profit',
        '1965: ₹800 profit; 1975: ₹1,500 profit',
        '1965: ₹1,200 profit; 1975: ₹3,000 profit'
      ]
    }
  },
  'questions/economics/EC13.json': {
    EC13Q09: {
      options: ['₹17,000 crore', '₹15,000 crore', '₹42,000 crore', '₹25,000 crore'],
      correct: 0
    }
  },
  'questions/economics/EC14.json': {
    EC14Q94: {
      options: ['Dependents: 40 crore; Total: 90 crore', 'Dependents: 30 crore; Total: 80 crore', 'Dependents: 50 crore; Total: 100 crore', 'Dependents: 62.5 crore; Total: 112.5 crore'],
      correct: 0
    }
  },
  'questions/economics/EC15.json': {
    EC15Q143: {
      options: [
        'India: 0.0044/yr, Pakistan: 0.0021/yr, Bangladesh: 0.0081/yr — Bangladesh fastest',
        'India: 0.0034/yr, Pakistan: 0.0021/yr, Bangladesh: 0.0061/yr — Bangladesh fastest',
        'India: 0.0050/yr, Pakistan: 0.0025/yr, Bangladesh: 0.0075/yr — Bangladesh fastest',
        'India: 0.0044/yr, Pakistan: 0.0030/yr, Bangladesh: 0.0081/yr — Bangladesh fastest'
      ]
    }
  },
  'questions/general-test/GT-S7.json': {
    'GT-S7Q145': {
      options: ['13.2 pp', '14.4 pp', '15.0 pp', '16.6 pp'],
      correct: 1
    },
    'GT-S7Q153': {
      options: ['2,200 crore', '219 crore', '220 crore', '222 crore'],
      correct: 0,
      explanation: 'Finance outgo = 20,000 x ₹15 lakh = ₹3,00,000 lakh = ₹3,000 crore. HR outgo = 10,000 x ₹8 lakh = ₹80,000 lakh = ₹800 crore. Difference = ₹3,000 crore - ₹800 crore = ₹2,200 crore. Option A is correct.'
    }
  }
};

let totalChanged = 0;
for (const [file, patches] of Object.entries(patchesByFile)) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  let changed = 0;

  for (const question of data.questions) {
    const patch = patches[question.id];
    if (!patch) continue;

    if (Object.hasOwn(patch, 'correct') && question.correct !== patch.correct && !Object.hasOwn(question, 'correct_content_review_original')) {
      question.correct_content_review_original = question.correct;
    }

    Object.assign(question, patch);
    changed += 1;
  }

  if (changed !== Object.keys(patches).length) {
    throw new Error(`${file}: expected ${Object.keys(patches).length} patches but applied ${changed}`);
  }

  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
  totalChanged += changed;
  console.log(`Patched ${changed} questions in ${file}`);
}

console.log(`Patched ${totalChanged} duplicate-option questions`);
