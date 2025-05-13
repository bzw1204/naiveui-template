import type { ICustomFormula } from 'formula'

export const customFormula: ICustomFormula[] = [
  {
    title: '常用符号',
    expression: '\\pm {\\color{dodgerblue} \\in} \\\\ {\\\color{dodgerblue} \\times} \\cap',
    list: [
      {
        title: '二元运算符',
        items: [
          '+',
          '-',
          '\\pm',
          '\\mp',
          '\\times',
          '\\div',
          '\\ast',
          '\\cdot',
          '\\cap',
          '\\cup',
          '\\aleph',
          '\\Re',
          '\\top',
          '\\bot',
          '\\infty',
          '\\partial',
          '\\forall',
          '\\exists',
          '\\neg',
          '\\because',
          '\\therefore',
          '\\varnothing',
          '\\frac{b}{a}',
          '\\circ',
          '\\bullet',
          '\\prime',
          '\\triangle',
          '\\angle',
          '\\surd',
          '\\barwedge',
          '\\veebar',
          '\\odot',
          '\\oplus',
          '\\otimes',
          '\\oslash',
          '\\circledcirc',
          '\\boxdot',
          '\\bigtriangledown',
          '\\dagger',
          '\\diamond',
          '\\star',
          '\\triangleleft',
          '\\triangleright'
        ]
      },
      {
        title: '二元关系符',
        items: ['=', '\\leq', '\\geq', '\\prec', '\\succ', '\\preceq', '\\succeq', '\\ll', '\\gg', '\\equiv', '\\sim', '\\simeq', '\\asymp', '\\approx', '\\ne', '\\subset', '\\supset', '\\subseteq', '\\supseteq', '\\nsubseteq', '\\nsupseteq', '\\in', '\\ni', '\\notin']
      },
      {
        title: '箭头',
        items: [
          '\\leftarrow',
          '\\rightarrow',
          '\\leftrightarrow',
          '\\Leftarrow',
          '\\Rightarrow',
          '\\Leftrightarrow',
          '\\uparrow',
          '\\downarrow',
          '\\updownarrow',
          '\\Uparrow',
          '\\Downarrow',
          '\\Updownarrow'
        ]
      },
      {
        title: '其他',
        items: [
          '\\because',
          '\\therefore',
          '\\dots',
          '\\cdots',
          '\\vdots',
          '\\ddots',
          '\\infty'
        ]
      }

    ]
  },
  {
    title: '希腊字母',
    size: 16,
    expression: '{\\color{dodgerblue} \\alpha} \\beta \\\\ \\gamma {\\color{dodgerblue} \\delta}',
    list: [
      {
        title: '小写希腊字母',
        items: [
          '\\alpha',
          '\\beta',
          '\\gamma',
          '\\delta',
          '\\epsilon',
          '\\zeta',
          '\\eta',
          '\\theta',
          '\\iota',
          '\\kappa',
          '\\lambda',
          '\\mu',
          '\\nu',
          '\\xi',
          '\\omicron',
          '\\pi',
          '\\rho',
          '\\sigma',
          '\\tau',
          '\\phi',
          '\\chi',
          '\\psi',
          '\\omega'
        ]
      },
      {
        title: '大写希腊字母',
        items: [
          '\\mathrm{A}',
          '\\mathrm{B}',
          '\\Gamma',
          '\\Delta',
          '\\mathrm{E}',
          '\\mathrm{Z}',
          '\\mathrm{H}',
          '\\Theta',
          '\\mathrm{I}',
          '\\mathrm{K}',
          '\\Lambda',
          '\\mathrm{M}',
          '\\mathrm{N}',
          '\\Xi',
          '\\mathrm{O}',
          '\\Pi',
          '\\mathrm{P}',
          '\\Sigma',
          '\\mathrm{T}',
          '\\Upsilon',
          '\\Phi',
          '\\mathrm{X}',
          '\\Psi',
          '\\Omega'
        ]
      },
      {
        title: '斜体希腊字母',
        items: [
          '\\varepsilon',
          '\\vartheta',
          '\\varpi',
          '\\varrho',
          '\\varsigma',
          '\\varphi',
          '\\Gamma',
          '\\Delta',
          '\\Theta',
          '\\Lambda',
          '\\Xi',
          '\\Pi',
          '\\Sigma',
          '\\Upsilon',
          '\\Phi',
          '\\Psi',
          '\\Omega'
        ]
      },
      {
        title: '其他',
        items: [
          '\\nabla',
          '\\imath',
          '\\jmath',
          '\\ell',
          '\\hbar',
          '\\hslash',
          '\\partial',
          '\\Im',
          '\\wp',
          '\\Game',
          '\\Finv',
          '\\eth',
          '\\aleph',
          '\\beth',
          '\\gimel',
          '\\daleth',
          '\\digamma'
        ]
      }
    ]
  },
  {
    title: '指数角标',
    size: 16,
    expression: '\\sqrt{{\\color{dodgerblue} x^{n}}}',
    list: [
      {
        title: '指数及上下标',
        items: [
          'x^{n}',
          'x_{n}',
          'x_{a}^{b}',
          '_{a}^{b}x',
          '{37}^{\circ}',
          '\\exp'
        ]
      },
      {
        title: '根式',
        items: [
          '\\sqrt{x}',
          '\\sqrt[n]{x}'
        ]
      },
      {
        title: '对数',
        items: [
          '\\log_{a}{b}',
          '\\lg_{a}{b}',
          '\\ln_{a}{b}'
        ]
      },
      {
        title: '重音及上下括号、箭头',
        items: [
          '\\bar{a}',
          '\\acute{a}',
          '\\check{a}',
          '\\grave{a}',
          '\\hat{a}',
          '\\tilde{a}',
          '\\vec{a}',
          '\\not{a}',
          '\\widetilde{abc}',
          '\\widehat{abc}',
          '\\overbrace{abc}',
          '\\underbrace{abc}',
          '\\overline{abc}',
          '\\underline{abc}',
          '\\overset{a}{abc}',
          '\\underset{a}{abc}',
          '\\overleftarrow{abc}',
          '\\overrightarrow{abc}',
          '\\overleftrightarrow{abc}',
          '\\underleftarrow{abc}',
          '\\underrightarrow{abc}',
          '\\underleftrightarrow{abc}',
          '\\xleftarrow[abc]{a}',
          '\\xrightarrow[abc]{a}'
        ]
      }
    ]
  },
  {
    title: '分数微分',
    size: 20,
    expression: '\\frac{\\mathrm{d}{\\color{dodgerblue} y}}{\\mathrm{d}{\\color{dodgerblue} x}}',
    list: [
      {
        title: '分数',
        items: []
      },
      {
        title: '微分',
        items: []
      },
      {
        title: '导数',
        items: []
      },
      {
        title: '模运算',
        items: []
      }
    ]
  },
  {
    title: '积分',
    size: 20,
    expression: '\\oint_{{\\color{dodgerblue} a} }^{{\\color{dodgerblue} b}}',
    list: [
      {
        title: '积分',
        items: []
      }
    ]
  },
  {
    title: '极限三角',
    size: 20,
    expression: '\\displaystyle{\\lim_{{\\color{dodgerblue} x \\to \\infty}}}',
    list: [
      {
        title: '极限',
        items: []
      },
      {
        title: '三角函数',
        items: []
      },
      {
        title: '界限',
        items: []
      }
    ]
  },

  {
    title: '集合',
    size: 16,
    expression: '\\displaystyle \\sum_{{\\color{dodgerblue} i=0}}^{{\\color{dodgerblue} n}}',
    list: [
      {
        title: '求和/乘积/余积',
        items: []
      },
      {
        title: '并集/交集/析取/合取',
        items: []
      }
    ]
  },
  {
    title: '括号矩阵',
    size: 16,
    expression: '\\left \\{\\binom{\\color{dodgerblue} n}{\\color{dodgerblue} r} \\right \\}',
    list: [
      {
        title: '括号',
        items: []
      },
      {
        title: '可变大小定界符',
        items: []
      },
      {
        title: '数组及矩阵',
        items: []
      }
    ]
  },
  {
    title: '字体',
    size: 16,
    flexCol: true,
    expression: '{\\color{dodgerblue} \\mathbb{A}}\\mathit{A} \\\\  \\mathfrak{A}{\\color{dodgerblue} \\mathrm{A}}',
    list: [
      {
        title: '字体',
        items: []
      },
      {
        title: '大小',
        items: [
          '{\\tiny abc巨小tiny}',
          '{\\scriptsize abc超小scriptsize}',
          '{\\small abc小small}',
          '{\\normalsize abc正常normal}',
          '{\\large abc大large}',
          '{\\Large abc超大Large}',
          '{\\LARGE abc特大LARGE}',
          '{\\huge abc巨大huge}',
          '{\\Huge abc巨无霸Huge}'
        ]
      }
    ]
  }
]
