/* ==========================================================================
   P&C CAPITAL PARTNERS — Application Logic, Navigation, Sitemap & Bilingual (KO/EN)
   (Reference: https://midasasset.com/ — '공지 & 공시' excluded per requirements)
   ========================================================================== */

let currentLang = 'ko'; // 'ko' | 'en'
let currentCategory = null;
let currentPageId = null;

/* ==========================================================================
   1. MENU HIERARCHY (Bilingual KO & EN)
   ========================================================================== */
const MENU_DATA = [
  {
    id: 'esg',
    title: { ko: 'ESG', en: 'ESG' },
    enTitle: 'ESG / P&C CAPITAL PARTNERS',
    bannerDesc: {
      ko: '지속가능한 미래와 장기적 기업가치 제고를 위한 책임투자',
      en: 'Responsible investment for a sustainable future and long-term corporate value enhancement'
    },
    items: [
      { id: 'esg-intro', title: { ko: 'ESG 소개', en: 'ESG Overview' } }
    ]
  },
  {
    id: 'about',
    title: { ko: '회사소개', en: 'About Us' },
    enTitle: 'about P&C CAPITAL PARTNERS',
    bannerDesc: {
      ko: '원칙과 신뢰를 바탕으로 고객의 자산을 지키는 파트너',
      en: 'Your trusted investment partner safeguarding client assets with principle and integrity'
    },
    items: [
      { id: 'about-pnc', title: { ko: 'P&C 소개', en: 'About P&C' } },
      { id: 'about-exec', title: { ko: '임원진 소개', en: 'Leadership' } },
      { id: 'about-managers', title: { ko: '주요운용인력', en: 'Portfolio Managers' } },
      { id: 'about-aum', title: { ko: '운용규모', en: 'Assets Under Management' } }
    ]
  },
  {
    id: 'info',
    title: { ko: '투자정보', en: 'Investment Info' },
    enTitle: 'P&C CAPITAL philosophy',
    bannerDesc: {
      ko: '흔들리지 않는 운용철학과 체계적인 리스크 관리 프로세스',
      en: 'Unwavering investment philosophy and disciplined risk management process'
    },
    items: [
      { id: 'info-philosophy', title: { ko: '운용철학', en: 'Philosophy' } },
      { id: 'info-process', title: { ko: '운용프로세스', en: 'Investment Process' } },
      { id: 'info-guide', title: { ko: '투자가이드', en: 'Investment Guide' } }
    ]
  },
  {
    id: 'products',
    title: { ko: '투자상품', en: 'Products' },
    enTitle: 'P&C CAPITAL products',
    bannerDesc: {
      ko: '고객의 생애주기와 투자목적에 부합하는 최적의 포트폴리오 솔루션',
      en: 'Optimal portfolio solutions tailored to your lifecycle and financial goals'
    },
    items: [
      { id: 'prod-flagship', title: { ko: '대표상품', en: 'Flagship Funds' } },
      { id: 'prod-fundmap', title: { ko: '펀드맵', en: 'Fund Map' } },
      { id: 'prod-pension', title: { ko: '연금저축펀드', en: 'Pension Savings' } },
      { id: 'prod-retirement', title: { ko: '퇴직연금펀드', en: 'Retirement Pension' } },
      { id: 'prod-realestate', title: { ko: '부동산펀드', en: 'Real Estate Funds' } }
    ]
  }
];

/* Special standalone Sitemap category definition (not listed in GNB drawer, accessed via top '사이트맵' utility) */
const SITEMAP_CATEGORY = {
  id: 'sitemap-cat',
  title: { ko: '사이트맵', en: 'Sitemap' },
  enTitle: 'SITEMAP / P&C CAPITAL PARTNERS',
  bannerDesc: {
    ko: 'P&C 캐피탈 파트너스의 전체 메뉴 구조를 한눈에 확인하실 수 있습니다.',
    en: 'Explore the complete directory and service structure of P&C Capital Partners.'
  },
  items: [
    { id: 'sitemap', title: { ko: '사이트맵', en: 'Sitemap' } }
  ]
};

/* ==========================================================================
   2. UI CHROME TRANSLATIONS (Header, Main Hero, Lower Band, Pre-footer, Footer)
   ========================================================================== */
const UI_TEXT = {
  ko: {
    docTitle: 'P&C CAPITAL PARTNERS | 피앤씨캐피탈파트너스',
    searchLabel: '검색',
    searchPlaceholder: '검색어를 입력하세요',
    fundTodayLabel: '오늘 본 펀드',
    fundLayerTitle: '오늘 본 펀드 (0)',
    fundLayerEmpty: '오늘 본 펀드가 없습니다.',
    sitemapLabel: '사이트맵',
    currentLangLabel: 'KOREAN',
    targetLangOption: 'ENGLISH',
    menuLabel: 'MENU',
    heroTitleHtml: '원칙을 지키는 투자,<br /><strong>고객의 미래</strong>를 함께 설계합니다.',
    heroDescText: '일관된 운용철학과 깊이 있는 리서치로 흔들림 없는 장기 가치를 만들어 갑니다.',
    tile1Title: '운용철학',
    tile1Desc: '변화무쌍한 투자시장에서의 일관된 경영철학.<br />바로 고객의 이익입니다.',
    tile2Title: 'ESG',
    tile2Desc: 'P&C 캐피탈 파트너스의<br />ESG 철학과 비전.',
    tile3Title: '대표상품',
    tile3Desc: 'P&C 캐피탈 파트너스의<br />베스트셀러를 소개합니다.',
    tile4Title: '주식형펀드',
    tile4Desc: '소수의 펀드로<br />오랜 기간 투자합니다.',
    tile5Title: 'ETF',
    tile5Desc: 'ETF도 액티브 ETF로.<br />차별화된 초과수익을 추구합니다.',
    tile6Title: '해외펀드',
    tile6Desc: '투자의 시야를 넓힙니다.<br />글로벌 리더와 함께 성장합니다.',
    bbs1Badge: '대표상품',
    bbs1Title: 'P&C 책임투자 · 액티브 가치 · 글로벌 리더스 성장주 핵심 라인업 안내',
    bbs2Badge: '운용현황',
    bbs2Title: 'P&C 캐피탈 파트너스 총 운용자산(AUM) 28조 9,296억 원 달성',
    metric1Label: '총 운용규모(AUM)',
    metric1Val: '289,296 억 원',
    metric2Label: '주식형 비중',
    metric3Label: '채권형 비중',
    metric4Label: '혼합 및 대체투자',
    preFooterHtml: `
      <h4>투자 전에 확인하세요!</h4>
      <ul>
        <li>집합투자증권을 취득하시기 전에 투자대상, 보수·수수료 및 환매방법 등에 관하여 (간이)투자설명서를 반드시 읽어보시기 바랍니다.</li>
        <li>집합투자기구는 자산가치 변동 및 환율 변동 등에 따라 투자원금의 손실(0~100%)이 발생할 수 있으며, 그 손실은 투자자에게 귀속됩니다.</li>
        <li>금융투자상품은 예금자보호법에 따라 예금보험공사가 보호하지 않습니다.</li>
        <li>과거의 운용실적이 미래의 수익률을 보장하는 것은 아닙니다.</li>
      </ul>
    `,
    footerHtml: `
      <div class="linkArea">
        <a href="#esg-intro" data-page="esg-intro">스튜어드십코드</a>
        <span class="sep">|</span>
        <a href="#info-guide" data-page="info-guide">보호금융상품등록부</a>
        <span class="sep">|</span>
        <a href="https://www.fss.or.kr" target="_blank" rel="noopener">금융감독원</a>
        <span class="sep">|</span>
        <a href="https://www.kofia.or.kr" target="_blank" rel="noopener">금융투자협회</a>
        <span class="sep">|</span>
        <a href="https://www.fsc.go.kr" target="_blank" rel="noopener">금융위원회</a>
        <span class="sep">|</span>
        <a href="#about-pnc" data-page="about-pnc">찾아오시는길</a>
        <span class="sep">|</span>
        <a href="#about-pnc" data-page="about-pnc">신용정보활용체제</a>
        <span class="sep">|</span>
        <a href="#about-pnc" data-page="about-pnc" class="bold">개인정보처리방침</a>
      </div>
      <div class="otherLink">
        <a href="https://www.fss.or.kr" target="_blank" rel="noopener">불법사금융피해신고센터 (전화상담 및 신고 1332)</a>
        <span class="sep">|</span>
        <a href="#info-guide" data-page="info-guide">금융사기예방을 위한 유의사항</a>
        <span class="sep">|</span>
        <a href="#info-guide" data-page="info-guide">금융고객 안전수칙</a>
        <span class="sep">|</span>
        <a href="#info-guide" data-page="info-guide">개인정보 유출관련 필수체크사항 10가지</a>
      </div>
      <div class="footerAddress">
        (우)03175 서울특별시 종로구 경희궁길 20 &nbsp;|&nbsp; T. 02.3787.3500 &nbsp;|&nbsp; Copyright &copy; 2026 P&amp;C CAPITAL PARTNERS All rights are reserved.
      </div>
    `
  },
  en: {
    docTitle: 'P&C CAPITAL PARTNERS | Asset Management',
    searchLabel: 'Search',
    searchPlaceholder: 'Search funds...',
    fundTodayLabel: 'Viewed Funds',
    fundLayerTitle: 'Recently Viewed Funds (0)',
    fundLayerEmpty: 'No recently viewed funds.',
    sitemapLabel: 'SITEMAP',
    currentLangLabel: 'ENGLISH',
    targetLangOption: 'KOREAN',
    menuLabel: 'MENU',
    heroTitleHtml: 'Principle-Driven Investment,<br />Designing <strong>Your Future</strong> Together.',
    heroDescText: 'Building enduring long-term value through consistent investment philosophy and in-depth research.',
    tile1Title: 'Philosophy',
    tile1Desc: 'Consistent principle in an ever-changing market:<br />Putting our clients’ interests first.',
    tile2Title: 'ESG',
    tile2Desc: 'ESG stewardship, philosophy,<br />and vision at P&C Capital Partners.',
    tile3Title: 'Flagship Funds',
    tile3Desc: 'Discover our proven best-selling<br />investment funds.',
    tile4Title: 'Equity Funds',
    tile4Desc: 'Long-term conviction investing<br />through a focused lineup of funds.',
    tile5Title: 'Active ETF',
    tile5Desc: 'ETFs managed actively.<br />Pursuing differentiated alpha.',
    tile6Title: 'Global Funds',
    tile6Desc: 'Broadening investment horizons.<br />Growing alongside global leaders.',
    bbs1Badge: 'FLAGSHIP',
    bbs1Title: 'P&C Responsible ESG · Active Value · Global Leaders Growth Core Lineup',
    bbs2Badge: 'AUM STATUS',
    bbs2Title: 'P&C Capital Partners Reaches KRW 28.93 Trillion in Assets Under Management',
    metric1Label: 'Total AUM',
    metric1Val: 'KRW 28.93T',
    metric2Label: 'Equities',
    metric3Label: 'Fixed Income',
    metric4Label: 'Multi-Asset & Alt',
    preFooterHtml: `
      <h4>Important Investment Disclosures</h4>
      <ul>
        <li>Before investing, please read the Fund Prospectus carefully regarding investment objectives, fees, charges, and redemption terms.</li>
        <li>Collective investment schemes are subject to market and currency fluctuations and may result in a loss of principal (0–100%) borne by the investor.</li>
        <li>Financial investment products are not protected by the Korea Deposit Insurance Corporation under the Depositor Protection Act.</li>
        <li>Past performance does not guarantee future returns.</li>
      </ul>
    `,
    footerHtml: `
      <div class="linkArea">
        <a href="#esg-intro" data-page="esg-intro">Stewardship Code</a>
        <span class="sep">|</span>
        <a href="#info-guide" data-page="info-guide">Protected Financial Products</a>
        <span class="sep">|</span>
        <a href="https://www.fss.or.kr" target="_blank" rel="noopener">Financial Supervisory Service</a>
        <span class="sep">|</span>
        <a href="https://www.kofia.or.kr" target="_blank" rel="noopener">KOFIA</a>
        <span class="sep">|</span>
        <a href="https://www.fsc.go.kr" target="_blank" rel="noopener">Financial Services Commission</a>
        <span class="sep">|</span>
        <a href="#about-pnc" data-page="about-pnc">Contact &amp; Location</a>
        <span class="sep">|</span>
        <a href="#about-pnc" data-page="about-pnc">Credit Information Policy</a>
        <span class="sep">|</span>
        <a href="#about-pnc" data-page="about-pnc" class="bold">Privacy Policy</a>
      </div>
      <div class="otherLink">
        <a href="https://www.fss.or.kr" target="_blank" rel="noopener">Illegal Private Finance Report Center (Call 1332)</a>
        <span class="sep">|</span>
        <a href="#info-guide" data-page="info-guide">Financial Fraud Prevention Notice</a>
        <span class="sep">|</span>
        <a href="#info-guide" data-page="info-guide">Financial Security Guidelines</a>
        <span class="sep">|</span>
        <a href="#info-guide" data-page="info-guide">10 Essential Data Protection Checkpoints</a>
      </div>
      <div class="footerAddress">
        20 Gyeonghuigung-gil, Jongno-gu, Seoul 03175, Korea &nbsp;|&nbsp; T. +82.2.3787.3500 &nbsp;|&nbsp; Copyright &copy; 2026 P&amp;C CAPITAL PARTNERS All rights are reserved.
      </div>
    `
  }
};

/* ==========================================================================
   3. DEDICATED SITEMAP GENERATOR (#sitemap)
   ========================================================================== */
function buildSitemapContent(lang) {
  const isEn = lang === 'en';
  const colsHtml = MENU_DATA.map((cat, idx) => {
    const numStr = String(idx + 1).padStart(2, '0');
    const itemsHtml = cat.items.map(it => `
      <li>
        <a href="#${it.id}" data-page="${it.id}">
          <span>${it.title[lang]}</span>
          <span class="arrow">→</span>
        </a>
      </li>
    `).join('');

    return `
      <div class="sitemapCol">
        <div class="sitemapColHeader">
          <div>
            <span class="smNum">CATEGORY ${numStr}</span>
            <h3>${cat.title[lang]}</h3>
          </div>
        </div>
        <ul class="sitemapList">
          ${itemsHtml}
        </ul>
      </div>
    `;
  }).join('');

  return `
    <div class="subPageHeader">
      <span class="enLabel">SITEMAP DIRECTORY</span>
      <h2>${isEn ? 'Sitemap' : '사이트맵'}</h2>
    </div>
    <div class="subPullQuote">
      <p>${isEn ? '“Complete Menu & Service Directory of P&C Capital Partners”' : '“P&C 캐피탈 파트너스의 전체 메뉴 및 서비스 안내”'}</p>
      <span>${isEn ? 'Click any menu item below to navigate directly to the desired section.' : '원하시는 메뉴를 클릭하시면 해당 페이지로 바로 이동합니다.'}</span>
    </div>
    <div class="sitemapGrid">
      ${colsHtml}
    </div>
  `;
}

/* ==========================================================================
   4. BILINGUAL SUB-PAGE CONTENTS (KO & EN)
   ========================================================================== */
const PAGE_CONTENTS = {
  ko: {
    'esg-intro': `
      <div class="subPageHeader">
        <span class="enLabel">ESG STEWARDSHIP</span>
        <h2>ESG 소개</h2>
      </div>
      <div class="subPullQuote">
        <p>“투자를 통해 더 나은 세상을 그리겠습니다.”</p>
        <span>P&C 캐피탈 파트너스는 재무적 성과와 비재무적 ESG 요소를 통합 분석하여 장기적이고 지속가능한 수익을 추구합니다.</span>
      </div>
      <div class="esgPillars">
        <div class="esgCard">
          <div class="esgCircle">E</div>
          <h3>Environment (환경)</h3>
          <p>기후변화 대응, 탄소배출 저감, 친환경 에너지 전환 및 자원 순환 등 기업의 환경적 지속가능성을 심층 평가합니다.</p>
        </div>
        <div class="esgCard">
          <div class="esgCircle">S</div>
          <h3>Social (사회적 책임)</h3>
          <p>인권 존중, 산업안전, 공정한 공급망 관리, 고객 정보보호 및 지역사회 상생 등 사회적 가치 창출 역량을 점검합니다.</p>
        </div>
        <div class="esgCard">
          <div class="esgCircle">G</div>
          <h3>Governance (지배구조)</h3>
          <p>이사회 독립성, 주주권익 보호, 투명한 배당정책 및 윤리경영 체계를 분석하여 주주가치 훼손 리스크를 선제적으로 관리합니다.</p>
        </div>
      </div>
      <div class="creamBox">
        <h3>ESG 운용위원회 및 스튜어드십 코드 이행</h3>
        <p>P&C 캐피탈 파트너스는 리서치본부와 운용본부의 핵심 인력으로 구성된 <strong>ESG 운용위원회</strong>를 상설 운영하고 있습니다. 자체 ESG 평가 모델과 외부 전문기관 데이터를 결합하여 투자 대상 기업의 ESG 등급을 산출하고, 적극적인 주주관여(Engagement)와 의결권 행사를 통해 수탁자 책임을 충실히 이행합니다.</p>
      </div>
    `,

    'about-pnc': `
      <div class="subPageHeader">
        <span class="enLabel">CORPORATE OVERVIEW</span>
        <h2>P&C CAPITAL PARTNERS</h2>
      </div>
      <div class="subPullQuote">
        <p>“고객의 이익을 최우선으로 생각하는 독립 종합자산운용 파트너”</p>
        <span>설립 이래 일관된 투자원칙과 리서치 중심의 운용으로 매년 흔들림 없는 성과를 이어오고 있습니다.</span>
      </div>
      <div class="creamBox">
        <h3>기본과 원칙에 충실한 투자 파트너</h3>
        <p>P&C 캐피탈 파트너스는 단기적인 시장 유행에 흔들리지 않고, 기업의 본질적 가치와 장기 성장성에 집중하는 정통 가치·성장 투자 하우스입니다.</p>
        <p>독립적인 의사결정 구조와 철저한 리스크 관리 시스템을 바탕으로 주식, 채권, 대체투자 및 연금 자산에 이르기까지 기관과 개인 투자자 모두에게 신뢰받는 최적의 자산관리 솔루션을 제공합니다.</p>
      </div>
      <table class="dataTable">
        <tbody>
          <tr>
            <th>회사명</th>
            <td>피앤씨캐피탈파트너스 주식회사 (P&C CAPITAL PARTNERS Co., Ltd.)</td>
          </tr>
          <tr>
            <th>주요 사업영역</th>
            <td>집합투자업(주식·채권·혼합·대체투자), 투자일임업, 투자자문업</td>
          </tr>
          <tr>
            <th>운용자산 규모(AUM)</th>
            <td>총 28조 9,296억 원 (주식형 49.72%, 채권형 43.59%, 혼합 및 대체투자 6.69%)</td>
          </tr>
          <tr>
            <th>핵심 경쟁력</th>
            <td>자체 심층 리서치 시스템, 소수 핵심 펀드 중심의 장기 책임운용, 독립적 리스크 관리 체계</td>
          </tr>
        </tbody>
      </table>
    `,

    'about-exec': `
      <div class="subPageHeader">
        <span class="enLabel">LEADERSHIP</span>
        <h2>임원진 소개</h2>
      </div>
      <div class="subPullQuote">
        <p>“풍부한 자본시장 경험과 전문성을 갖춘 리더십”</p>
        <span>투명한 지배구조와 합리적 의사결정으로 고객 자산의 안정적 성장을 이끕니다.</span>
      </div>
      <div class="execGrid">
        <div class="execCard">
          <span class="execRole">대표이사 / 회장</span>
          <h3>신 진 호</h3>
          <ul>
            <li>서울대학교 경영학 학사 / 석사</li>
            <li>P&C 캐피탈 파트너스 총괄 대표이사</li>
            <li>전) 주요 기관투자자 자산운용 총괄 본부장</li>
            <li>자본시장 리서치 및 포트폴리오 운용 경력 28년</li>
          </ul>
        </div>
        <div class="execCard">
          <span class="execRole">대표이사 / 사장</span>
          <h3>신 정 희</h3>
          <ul>
            <li>연세대학교 경제학 학사 / MBA</li>
            <li>P&C 캐피탈 파트너스 운용총괄 대표이사(CIO)</li>
            <li>전) 글로벌 에쿼티 & 채권운용 본부장</li>
            <li>연기금 및 기관 일임자산 운용 총괄 경력 25년</li>
          </ul>
        </div>
        <div class="execCard">
          <span class="execRole">전무이사 / 부문대표</span>
          <h3>백 송 호</h3>
          <ul>
            <li>고려대학교 경영학 학사</li>
            <li>전략투자 / 마케팅 및 리스크관리 부문 담당대표</li>
            <li>전) 대체투자 및 글로벌 홀세일 총괄 상무</li>
            <li>기관 마케팅 및 상품전략 기획 경력 22년</li>
          </ul>
        </div>
      </div>
    `,

    'about-managers': `
      <div class="subPageHeader">
        <span class="enLabel">PORTFOLIO MANAGERS</span>
        <h2>주요운용인력</h2>
      </div>
      <div class="subPullQuote">
        <p>“팀 어프로치와 장기 근속에 기반한 검증된 운용 전문가 그룹”</p>
        <span>매니저 개인의 독단을 배제하고 리서치와 운용의 유기적 협업으로 초과수익을 창출합니다.</span>
      </div>
      <table class="dataTable">
        <thead>
          <tr>
            <th>성명 / 직책</th>
            <th>담당 부문</th>
            <th>주요 약력 및 대표 운용펀드</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>오 남 훈 (본부장)</th>
            <td>주식운용 1본부</td>
            <td>서울대 경제학과 / 주식운용 경력 20년 / P&C 책임투자 증권펀드, P&C 액티브 가치 펀드 책임운용</td>
          </tr>
          <tr>
            <th>김 현 중 (본부장)</th>
            <td>주식운용 2본부</td>
            <td>연세대 경영학과 / 주식·배당주 운용 18년 / P&C 블루칩 배당 인컴 펀드, P&C 거북이 펀드 운용</td>
          </tr>
          <tr>
            <th>이 천 주 (본부장)</th>
            <td>채권운용본부</td>
            <td>고려대 통계학과 / 채권 및 크레딧 운용 19년 / P&C 우량채권 펀드, P&C 하이일드 공모주 알파 운용</td>
          </tr>
          <tr>
            <th>기 민 수 (팀장)</th>
            <td>글로벌운용본부</td>
            <td>시카고대 경제학 / 글로벌 증권 운용 15년 / P&C 아시아 리더스 성장주, P&C 글로벌 리더스 성장주 운용</td>
          </tr>
          <tr>
            <th>김 찬 교 (팀장)</th>
            <td>연금·TDF운용팀</td>
            <td>성균관대 경영학과 / 자산배분 및 연금 운용 14년 / P&C 기본 TDF 시리즈 및 퇴직연금 펀드 운용</td>
          </tr>
        </tbody>
      </table>
    `,

    'about-aum': `
      <div class="subPageHeader">
        <span class="enLabel">ASSETS UNDER MANAGEMENT</span>
        <h2>운용규모</h2>
      </div>
      <div class="subPullQuote">
        <p>“총 운용자산(AUM) 28조 9,296억 원”</p>
        <span>주식과 채권의 균형 잡힌 포트폴리오와 탄탄한 재무건전성을 유지하고 있습니다.</span>
      </div>
      <table class="dataTable">
        <thead>
          <tr>
            <th>자산군 구분</th>
            <th>운용규모 (단위: 억 원)</th>
            <th>비중 (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>주식형 (Equity)</th>
            <td>143,838 억 원</td>
            <td>49.72%</td>
          </tr>
          <tr>
            <th>채권형 (Fixed Income)</th>
            <td>126,104 억 원</td>
            <td>43.59%</td>
          </tr>
          <tr>
            <th>혼합채권 / 혼합자산</th>
            <td>11,196 억 원</td>
            <td>3.87%</td>
          </tr>
          <tr>
            <th>부동산 및 대체투자</th>
            <td>4,310 억 원</td>
            <td>1.49%</td>
          </tr>
          <tr>
            <th>재간접 / 파생형 기타</th>
            <td>3,848 억 원</td>
            <td>1.33%</td>
          </tr>
        </tbody>
      </table>
      <div class="creamBox">
        <h3>재무안정성 및 연속 흑자 경영</h3>
        <p>P&C 캐피탈 파트너스는 창립 이래 단 한 해의 적자도 없이 견고한 흑자 기조를 이어가고 있으며, 업계 최고 수준의 자기자본비율과 유동성을 바탕으로 시장 위기 상황에서도 흔들림 없는 운용 인프라를 유지하고 있습니다.</p>
      </div>
    `,

    'info-philosophy': `
      <div class="subPageHeader">
        <span class="enLabel">INVESTMENT PHILOSOPHY</span>
        <h2>운용철학</h2>
      </div>
      <div class="subPullQuote">
        <p>“변화무쌍한 투자시장에서의 일관된 경영철학, 바로 고객의 이익입니다.”</p>
        <span>P&C 캐피탈 파트너스가 지키는 5가지 핵심 운용 원칙입니다.</span>
      </div>
      <div class="philosophyGrid">
        <div class="philItem">
          <div class="philNum">01</div>
          <div class="philBody">
            <h4>기본에 충실한 운용</h4>
            <p>기업의 내재가치와 현금흐름, 산업 경쟁력에 대한 철저한 펀더멘털 분석을 바탕으로 투자합니다.</p>
          </div>
        </div>
        <div class="philItem">
          <div class="philNum">02</div>
          <div class="philBody">
            <h4>원칙을 중시하는 운용</h4>
            <p>단기 시황이나 테마에 편승하지 않고 사전에 정립된 투자 프로세스와 컴플라이언스 기준을 엄격히 준수합니다.</p>
          </div>
        </div>
        <div class="philItem">
          <div class="philNum">03</div>
          <div class="philBody">
            <h4>유형별 소수펀드의 장기운용</h4>
            <p>무분별한 펀드 양산을 지양하고, 핵심 대표 펀드에 운용 역량을 집중하여 장기 복리 수익률을 극대화합니다.</p>
          </div>
        </div>
        <div class="philItem">
          <div class="philNum">04</div>
          <div class="philBody">
            <h4>합리적 의사결정 (Team Approach)</h4>
            <p>스타 매니저 1인에 의존하지 않고 애널리스트와 포트폴리오 매니저 간의 집단지성을 통해 투자 오류를 최소화합니다.</p>
          </div>
        </div>
        <div class="philItem" style="grid-column: 1 / -1;">
          <div class="philNum">05</div>
          <div class="philBody">
            <h4>철저한 위험관리</h4>
            <p>수익 추구에 앞서 하방 리스크를 선제적으로 통제하며, 독립된 리스크관리실이 포트폴리오 변동성과 한도를 실시간 모니터링합니다.</p>
          </div>
        </div>
      </div>
    `,

    'info-process': `
      <div class="subPageHeader">
        <span class="enLabel">INVESTMENT PROCESS</span>
        <h2>운용프로세스</h2>
      </div>
      <div class="subPullQuote">
        <p>“Bottom-Up 리서치와 Top-Down 거시분석의 정교한 결합”</p>
        <span>4단계 검증 시스템을 거쳐 최적의 실제 포트폴리오를 구축합니다.</span>
      </div>
      <div class="esgPillars">
        <div class="esgCard">
          <div class="esgCircle">01</div>
          <h3>투자 유니버스 구성</h3>
          <p>재무 안정성, 유동성, ESG 등급 및 산업 내 경쟁력을 기준으로 1차 투자 적격 종목군(Universe)을 엄선합니다.</p>
        </div>
        <div class="esgCard">
          <div class="esgCircle">02</div>
          <h3>모델 포트폴리오(MP)</h3>
          <p>섹터 애널리스트의 기업 탐방과 밸류에이션 모델을 종합하여 투자위원회에서 핵심 모델 포트폴리오를 확정합니다.</p>
        </div>
        <div class="esgCard">
          <div class="esgCircle">03</div>
          <h3>실제 포트폴리오 & 위험관리</h3>
          <p>각 펀드의 투자목적과 약관에 맞춰 실제 포트폴리오를 구성하고 성과분석 및 리스크 한도를 상시 점검합니다.</p>
        </div>
      </div>
    `,

    'info-guide': `
      <div class="subPageHeader">
        <span class="enLabel">INVESTMENT GUIDE</span>
        <h2>투자가이드</h2>
      </div>
      <div class="subPullQuote">
        <p>“성공적인 자산관리를 위한 올바른 펀드 투자 길잡이”</p>
        <span>투자 목적과 위험 감내 수준에 맞는 합리적인 펀드 선택 기준을 안내합니다.</span>
      </div>
      <table class="dataTable">
        <thead>
          <tr>
            <th>펀드 유형</th>
            <th>투자 대상 및 특징</th>
            <th>적합한 투자자</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>주식형 펀드</th>
            <td>자산의 60% 이상을 국내외 우량 주식에 투자하여 자본차익과 배당수익 추구</td>
            <td>중장기 고수익을 추구하며 시장 변동성을 감내할 수 있는 적극투자형 고객</td>
          </tr>
          <tr>
            <th>채권형 펀드</th>
            <td>국공채 및 우량 회사채에 투자하여 안정적인 이자수익과 자본차익 확보</td>
            <td>원금 변동성을 낮추고 시중금리 이상의 안정적 수익을 원하는 안정추구형 고객</td>
          </tr>
          <tr>
            <th>혼합형 / TDF</th>
            <td>주식과 채권 비중을 탄력적으로 조절하거나 은퇴 시점에 맞춰 자동 자산배분</td>
            <td>장기 연금자산 증식과 리스크 분산을 동시에 추구하는 균형투자형 고객</td>
          </tr>
        </tbody>
      </table>
    `,

    'prod-flagship': `
      <div class="subPageHeader">
        <span class="enLabel">FLAGSHIP FUNDS</span>
        <h2>대표상품</h2>
      </div>
      <div class="subPullQuote">
        <p>“P&C 캐피탈 파트너스의 검증된 베스트셀러 라인업”</p>
        <span>오랜 운용 레코드와 일관된 철학으로 시장의 신뢰를 받는 9대 대표 펀드입니다.</span>
      </div>
      <div class="productGrid">
        <div class="productCard">
          <div>
            <span class="productTag">국내주식 · ESG</span>
            <h3>P&C 책임투자 증권펀드</h3>
            <p>우수한 재무성과와 지속가능한 ESG 경쟁력을 겸비한 대한민국 대표 우량기업에 장기 투자합니다.</p>
          </div>
          <span class="productMore">자세히 보기 +</span>
        </div>
        <div class="productCard">
          <div>
            <span class="productTag">국내주식 · 액티브</span>
            <h3>P&C 액티브 가치 증권펀드</h3>
            <p>내재가치 대비 저평가된 가치주와 구조적 성장이 기대되는 핵심 우량주를 발굴하여 초과수익을 추구합니다.</p>
          </div>
          <span class="productMore">자세히 보기 +</span>
        </div>
        <div class="productCard">
          <div>
            <span class="productTag">국내주식 · 중위험</span>
            <h3>P&C 거북이 증권펀드</h3>
            <p>시장 등락에 흔들리지 않고 꾸준한 배당과 롱숏·커버드콜 전략을 결합하여 안정적인 복리 수익을 추구합니다.</p>
          </div>
          <span class="productMore">자세히 보기 +</span>
        </div>
        <div class="productCard">
          <div>
            <span class="productTag">해외주식 · 아시아</span>
            <h3>P&C 아시아 리더스 성장주</h3>
            <p>높은 경제성장률을 기록하는 아시아 주요국 내 독보적 시장 지배력을 보유한 선도 기업에 집중 투자합니다.</p>
          </div>
          <span class="productMore">자세히 보기 +</span>
        </div>
        <div class="productCard">
          <div>
            <span class="productTag">해외주식 · 글로벌</span>
            <h3>P&C 글로벌 리더스 성장주</h3>
            <p>글로벌 기술 혁신과 소비 트렌드를 주도하는 세계 일류 기업에 분산 투자하여 장기 자본차익을 추구합니다.</p>
          </div>
          <span class="productMore">자세히 보기 +</span>
        </div>
        <div class="productCard">
          <div>
            <span class="productTag">해외주식 · 인컴</span>
            <h3>P&C 글로벌 배당 인컴</h3>
            <p>선진국 고배당 우량주와 글로벌 리츠에 투자하여 정기적인 현금흐름과 안정적 자산 증식을 동시에 달성합니다.</p>
          </div>
          <span class="productMore">자세히 보기 +</span>
        </div>
        <div class="productCard">
          <div>
            <span class="productTag">연금 · 자산배분</span>
            <h3>P&C 기본 TDF 시리즈</h3>
            <p>투자자의 은퇴 목표 시점(Target Date)에 맞춰 글로벌 위험자산과 안전자산 비중을 생애주기별로 자동 리밸런싱합니다.</p>
          </div>
          <span class="productMore">자세히 보기 +</span>
        </div>
        <div class="productCard">
          <div>
            <span class="productTag">국내채권 · 우량채</span>
            <h3>P&C 우량채권 증권펀드</h3>
            <p>국공채 및 신용등급 A- 이상의 우량 회사채를 중심으로 듀레이션과 일드커브 전략을 활용해 안정적 수익을 확보합니다.</p>
          </div>
          <span class="productMore">자세히 보기 +</span>
        </div>
        <div class="productCard">
          <div>
            <span class="productTag">채권혼합 · 공모주</span>
            <h3>P&C 하이일드 공모주 알파</h3>
            <p>우량 하이일드 채권의 높은 이자수익을 기반으로 유망 공모주 우선배정 혜택을 결합하여 플러스 알파 수익을 추구합니다.</p>
          </div>
          <span class="productMore">자세히 보기 +</span>
        </div>
      </div>
    `,

    'prod-fundmap': `
      <div class="subPageHeader">
        <span class="enLabel">FUND LINEUP & MAP</span>
        <h2>펀드맵</h2>
      </div>
      <div class="subPullQuote">
        <p>“투자유형별 · 스타일별 · 목적별 한눈에 보는 P&C 펀드 라인업”</p>
        <span>고객의 투자성향에 맞춰 국내외 주식형부터 채권, 액티브 ETF, 연금까지 체계적으로 분류되어 있습니다.</span>
      </div>
      <table class="dataTable">
        <thead>
          <tr>
            <th>투자유형</th>
            <th>투자스타일</th>
            <th>대표 운용 상품</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>국내 주식형</th>
            <td>대형 성장 / 가치 / 배당 / ESG</td>
            <td>P&C 책임투자 증권펀드, P&C 액티브 가치 펀드, P&C 블루칩 배당 펀드</td>
          </tr>
          <tr>
            <th>액티브 ETF</th>
            <td>국내외 핵심 성장 테마 & 코어 액티브</td>
            <td>P&C 코리아 액티브 ETF, P&C 글로벌 테크 리더스 액티브 ETF</td>
          </tr>
          <tr>
            <th>해외 주식형</th>
            <td>글로벌 그로스 / 아시아 리더스 / 글로벌 인컴</td>
            <td>P&C 글로벌 리더스 성장주, P&C 아시아 리더스 성장주, P&C 글로벌 배당 인컴</td>
          </tr>
          <tr>
            <th>채권 및 혼합형</th>
            <td>국공채 / 우량 크레딧 / 공모주 하이일드</td>
            <td>P&C 우량채권 증권펀드, P&C 단기국공채 펀드, P&C 하이일드 공모주 알파</td>
          </tr>
          <tr>
            <th>연금 & TDF</th>
            <td>생애주기 자산배분 (2030~2055)</td>
            <td>P&C 기본 TDF 2035 / 2040 / 2045 / 2050 증권투자신탁</td>
          </tr>
        </tbody>
      </table>
    `,

    'prod-pension': `
      <div class="subPageHeader">
        <span class="enLabel">PENSION SAVINGS FUND</span>
        <h2>연금저축펀드</h2>
      </div>
      <div class="subPullQuote">
        <p>“세액공제 혜택과 장기 복리 투자를 동시에 누리는 노후 준비의 핵심”</p>
        <span>연간 납입액에 대한 세제 혜택과 과세이연 효과로 든든한 은퇴 자산을 설계하세요.</span>
      </div>
      <div class="esgPillars">
        <div class="esgCard">
          <div class="esgCircle">01</div>
          <h3>세액공제 혜택</h3>
          <p>연간 납입한도 내에서 세법이 정한 세액공제 혜택을 제공하여 매년 연말정산 시 실질적인 절세 효과를 누릴 수 있습니다.</p>
        </div>
        <div class="esgCard">
          <div class="esgCircle">02</div>
          <h3>과세이연 및 복리효과</h3>
          <p>운용 기간 중 발생하는 배당 및 매매차익에 대해 연금 수령 시점까지 과세가 이연되어 재투자 복리 효과가 극대화됩니다.</p>
        </div>
        <div class="esgCard">
          <div class="esgCircle">03</div>
          <h3>자유로운 포트폴리오 전환</h3>
          <p>시장 상황에 따라 주식형, 채권형, 글로벌 펀드 및 TDF 간 자유로운 리밸런싱이 가능합니다.</p>
        </div>
      </div>
    `,

    'prod-retirement': `
      <div class="subPageHeader">
        <span class="enLabel">RETIREMENT PENSION</span>
        <h2>퇴직연금펀드</h2>
      </div>
      <div class="subPullQuote">
        <p>“오랜 기간 검증된 장기 수익률과 철저한 하방 위험 관리”</p>
        <span>DB·DC·IRP 계좌에 최적화된 안정적이고 지속가능한 퇴직연금 솔루션을 제공합니다.</span>
      </div>
      <div class="creamBox">
        <h3>P&C 퇴직연금 운용의 차별점</h3>
        <p>퇴직연금은 단기 수익률보다 10년 이상의 장기 안정성이 무엇보다 중요합니다. P&C 캐피탈 파트너스는 변동성을 낮춘 인컴형 자산과 검증된 우량 자산의 정교한 배분을 통해 은퇴 시점까지 안정적인 자산 증식을 지원합니다.</p>
      </div>
      <table class="dataTable">
        <thead>
          <tr>
            <th>제도 구분</th>
            <th>운용 주체</th>
            <th>추천 P&C 퇴직연금 라인업</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>확정급여형 (DB)</th>
            <td>기업 (법인 자금 운용)</td>
            <td>P&C 퇴직연금 우량채권 펀드, P&C 퇴직연금 채권혼합 40 펀드</td>
          </tr>
          <tr>
            <th>확정기여형 (DC) / IRP</th>
            <td>근로자 및 개인 가입자</td>
            <td>P&C 기본 TDF 시리즈, P&C 퇴직연금 배당인컴 펀드, P&C 글로벌 리더스 연금펀드</td>
          </tr>
        </tbody>
      </table>
    `,

    'prod-realestate': `
      <div class="subPageHeader">
        <span class="enLabel">REAL ESTATE & ALTERNATIVES</span>
        <h2>부동산펀드</h2>
      </div>
      <div class="subPullQuote">
        <p>“우량 실물자산 발굴과 선제적 리스크 관리를 통한 대체투자 솔루션”</p>
        <span>오피스, 물류센터, 인프라 등 안정적인 임대수익과 자본차익이 기대되는 핵심 자산에 투자합니다.</span>
      </div>
      <div class="philosophyGrid">
        <div class="philItem">
          <div class="philNum">A</div>
          <div class="philBody">
            <h4>Core & Core-Plus 우량 자산 선별</h4>
            <p>주요 업무지구(CBD, GBD, YBD) 내 프라임 오피스 및 우량 임차인이 확보된 핵심 상업용 부동산에 집중 투자합니다.</p>
          </div>
        </div>
        <div class="philItem">
          <div class="philNum">B</div>
          <div class="philBody">
            <h4>Value-Add 가치 제고 전략</h4>
            <p>리모델링, 임차 구조 개선 및 적극적인 자산관리(PM/FM)를 통해 보유 부동산의 임대수익과 매각가치를 동시에 높입니다.</p>
          </div>
        </div>
      </div>
    `
  },

  /* ----------------------------------------------------------------------
     ENGLISH (EN) SUB-PAGE CONTENTS
     ---------------------------------------------------------------------- */
  en: {
    'esg-intro': `
      <div class="subPageHeader">
        <span class="enLabel">ESG STEWARDSHIP</span>
        <h2>ESG Overview</h2>
      </div>
      <div class="subPullQuote">
        <p>“Shaping a Better World Through Responsible Investment.”</p>
        <span>P&C Capital Partners integrates financial performance with non-financial ESG factors to deliver sustainable long-term returns.</span>
      </div>
      <div class="esgPillars">
        <div class="esgCard">
          <div class="esgCircle">E</div>
          <h3>Environment</h3>
          <p>We evaluate environmental sustainability including climate action, carbon footprint reduction, clean energy transition, and resource circularity.</p>
        </div>
        <div class="esgCard">
          <div class="esgCircle">S</div>
          <h3>Social Responsibility</h3>
          <p>We assess social value creation across human rights, workplace safety, fair supply chain management, data privacy, and community engagement.</p>
        </div>
        <div class="esgCard">
          <div class="esgCircle">G</div>
          <h3>Corporate Governance</h3>
          <p>We analyze board independence, shareholder rights protection, transparent dividend policies, and ethical governance to mitigate downside risks.</p>
        </div>
      </div>
      <div class="creamBox">
        <h3>ESG Investment Committee &amp; Stewardship Code</h3>
        <p>P&C Capital Partners operates a standing <strong>ESG Investment Committee</strong> comprising senior research analysts and portfolio managers. By combining proprietary ESG scoring models with external research, we actively engage with investee companies and exercise voting rights responsibly.</p>
      </div>
    `,

    'about-pnc': `
      <div class="subPageHeader">
        <span class="enLabel">CORPORATE OVERVIEW</span>
        <h2>P&C CAPITAL PARTNERS</h2>
      </div>
      <div class="subPullQuote">
        <p>“An Independent Comprehensive Asset Manager Putting Client Interests First”</p>
        <span>Since inception, we have delivered consistent performance through disciplined investment principles and research-driven management.</span>
      </div>
      <div class="creamBox">
        <h3>Your Trusted Partner Rooted in Fundamentals</h3>
        <p>Unmoved by short-term market fads, P&C Capital Partners focuses on intrinsic corporate value and structural long-term growth.</p>
        <p>Backed by an independent decision-making structure and rigorous risk management, we provide optimal portfolio solutions across equities, fixed income, alternatives, and pension assets for both institutional and retail investors.</p>
      </div>
      <table class="dataTable">
        <tbody>
          <tr>
            <th>Company Name</th>
            <td>P&C CAPITAL PARTNERS Co., Ltd.</td>
          </tr>
          <tr>
            <th>Core Business Areas</th>
            <td>Collective Investment Management (Equities, Fixed Income, Multi-Asset, Alternatives), Discretionary &amp; Advisory Services</td>
          </tr>
          <tr>
            <th>Assets Under Management</th>
            <td>KRW 28.93 Trillion (Equities 49.72%, Fixed Income 43.59%, Multi-Asset &amp; Alternatives 6.69%)</td>
          </tr>
          <tr>
            <th>Competitive Edge</th>
            <td>In-house fundamental research, long-term conviction management of flagship funds, and independent risk control</td>
          </tr>
        </tbody>
      </table>
    `,

    'about-exec': `
      <div class="subPageHeader">
        <span class="enLabel">LEADERSHIP</span>
        <h2>Executive Leadership</h2>
      </div>
      <div class="subPullQuote">
        <p>“Seasoned Leadership with Deep Capital Market Expertise”</p>
        <span>Guiding the steady growth of client assets through transparent governance and rational decision-making.</span>
      </div>
      <div class="execGrid">
        <div class="execCard">
          <span class="execRole">Chairman &amp; Co-CEO</span>
          <h3>Jinho Shin</h3>
          <ul>
            <li>B.A. &amp; M.S. in Business Administration, Seoul National University</li>
            <li>Chairman &amp; Co-CEO, P&C Capital Partners</li>
            <li>Former Head of Institutional Asset Management</li>
            <li>28+ years in capital market research and portfolio management</li>
          </ul>
        </div>
        <div class="execCard">
          <span class="execRole">President &amp; CIO</span>
          <h3>Junghee Shin</h3>
          <ul>
            <li>B.A. in Economics &amp; MBA, Yonsei University</li>
            <li>President &amp; Chief Investment Officer (CIO), P&C Capital Partners</li>
            <li>Former Managing Director of Global Equity &amp; Fixed Income</li>
            <li>25+ years managing national pension and institutional mandates</li>
          </ul>
        </div>
        <div class="execCard">
          <span class="execRole">Executive Managing Director</span>
          <h3>Songho Baek</h3>
          <ul>
            <li>B.A. in Business Administration, Korea University</li>
            <li>Head of Strategic Investment, Marketing &amp; Risk Management</li>
            <li>Former Director of Alternative Investments &amp; Global Wholesale</li>
            <li>22+ years in institutional marketing and product strategy</li>
          </ul>
        </div>
      </div>
    `,

    'about-managers': `
      <div class="subPageHeader">
        <span class="enLabel">PORTFOLIO MANAGERS</span>
        <h2>Portfolio Managers</h2>
      </div>
      <div class="subPullQuote">
        <p>“Proven Investment Specialists Built on Team Approach &amp; Long Tenure”</p>
        <span>Generating sustainable alpha through organic collaboration between in-house research and portfolio management divisions.</span>
      </div>
      <table class="dataTable">
        <thead>
          <tr>
            <th>Name / Title</th>
            <th>Division</th>
            <th>Background &amp; Flagship Funds Managed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Namhoon Oh (Head)</th>
            <td>Equity Division 1</td>
            <td>B.A. in Economics, SNU / 20 yrs experience / Lead Manager of P&C Responsible ESG Fund &amp; Active Value Fund</td>
          </tr>
          <tr>
            <th>Hyunjung Kim (Head)</th>
            <td>Equity Division 2</td>
            <td>B.A. in Business, Yonsei Univ. / 18 yrs experience / Lead Manager of P&C Bluechip Dividend &amp; Turtle Fund</td>
          </tr>
          <tr>
            <th>Chunju Lee (Head)</th>
            <td>Fixed Income Division</td>
            <td>B.A. in Statistics, Korea Univ. / 19 yrs experience / Lead Manager of P&C Prime Bond &amp; High-Yield IPO Alpha</td>
          </tr>
          <tr>
            <th>Minsu Ki (Director)</th>
            <td>Global Equity Team</td>
            <td>B.A. in Economics, Univ. of Chicago / 15 yrs experience / Lead Manager of P&C Asia Leaders &amp; Global Leaders Growth</td>
          </tr>
          <tr>
            <th>Chankyo Kim (Director)</th>
            <td>Pension &amp; TDF Team</td>
            <td>B.A. in Business, SKKU / 14 yrs experience / Lead Manager of P&C Core TDF Series &amp; Retirement Pension Funds</td>
          </tr>
        </tbody>
      </table>
    `,

    'about-aum': `
      <div class="subPageHeader">
        <span class="enLabel">ASSETS UNDER MANAGEMENT</span>
        <h2>Assets Under Management</h2>
      </div>
      <div class="subPullQuote">
        <p>“Total AUM of KRW 28.93 Trillion (289,296 Billion KRW)”</p>
        <span>Maintaining a well-balanced portfolio across equities and fixed income alongside rock-solid financial soundness.</span>
      </div>
      <table class="dataTable">
        <thead>
          <tr>
            <th>Asset Class</th>
            <th>AUM (in KRW 100M)</th>
            <th>Share (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Equities</th>
            <td>143,838 (KRW 14.38T)</td>
            <td>49.72%</td>
          </tr>
          <tr>
            <th>Fixed Income</th>
            <td>126,104 (KRW 12.61T)</td>
            <td>43.59%</td>
          </tr>
          <tr>
            <th>Balanced / Multi-Asset</th>
            <td>11,196 (KRW 1.12T)</td>
            <td>3.87%</td>
          </tr>
          <tr>
            <th>Real Estate &amp; Alternatives</th>
            <td>4,310 (KRW 0.43T)</td>
            <td>1.49%</td>
          </tr>
          <tr>
            <th>Fund of Funds / Derivatives</th>
            <td>3,848 (KRW 0.38T)</td>
            <td>1.33%</td>
          </tr>
        </tbody>
      </table>
      <div class="creamBox">
        <h3>Financial Stability &amp; Consecutive Profitable Track Record</h3>
        <p>Since its founding, P&C Capital Partners has maintained an unbroken streak of annual profitability. Supported by industry-leading capital adequacy and liquidity, we uphold resilient investment infrastructure across all market cycles.</p>
      </div>
    `,

    'info-philosophy': `
      <div class="subPageHeader">
        <span class="enLabel">INVESTMENT PHILOSOPHY</span>
        <h2>Investment Philosophy</h2>
      </div>
      <div class="subPullQuote">
        <p>“Consistent Principle in an Ever-Changing Market: Our Clients’ Interests.”</p>
        <span>The five core investment pillars upheld by P&C Capital Partners.</span>
      </div>
      <div class="philosophyGrid">
        <div class="philItem">
          <div class="philNum">01</div>
          <div class="philBody">
            <h4>Fundamental-Driven Investing</h4>
            <p>We invest based on rigorous fundamental analysis of intrinsic corporate value, cash flow generation, and industry competitiveness.</p>
          </div>
        </div>
        <div class="philItem">
          <div class="philNum">02</div>
          <div class="philBody">
            <h4>Principle-Centered Discipline</h4>
            <p>Rather than chasing short-term market themes, we strictly adhere to our established investment processes and compliance standards.</p>
          </div>
        </div>
        <div class="philItem">
          <div class="philNum">03</div>
          <div class="philBody">
            <h4>Long-Term Focus on Core Flagship Funds</h4>
            <p>We avoid indiscriminate fund proliferation and concentrate our research capacity on core flagship funds to maximize long-term compounding.</p>
          </div>
        </div>
        <div class="philItem">
          <div class="philNum">04</div>
          <div class="philBody">
            <h4>Rational Team-Based Decision Making</h4>
            <p>We minimize investment errors through collective intelligence between sector analysts and portfolio managers rather than relying on a single star manager.</p>
          </div>
        </div>
        <div class="philItem" style="grid-column: 1 / -1;">
          <div class="philNum">05</div>
          <div class="philBody">
            <h4>Proactive Risk Management</h4>
            <p>Prioritizing downside protection before return generation, our independent Risk Management Division monitors portfolio volatility and exposure limits in real time.</p>
          </div>
        </div>
      </div>
    `,

    'info-process': `
      <div class="subPageHeader">
        <span class="enLabel">INVESTMENT PROCESS</span>
        <h2>Investment Process</h2>
      </div>
      <div class="subPullQuote">
        <p>“Seamless Integration of Bottom-Up Research and Top-Down Macro Analysis”</p>
        <span>Constructing optimal portfolios through our disciplined verification framework.</span>
      </div>
      <div class="esgPillars">
        <div class="esgCard">
          <div class="esgCircle">01</div>
          <h3>Investment Universe</h3>
          <p>Screening the primary eligible universe based on financial soundness, liquidity, ESG ratings, and competitive moat.</p>
        </div>
        <div class="esgCard">
          <div class="esgCircle">02</div>
          <h3>Model Portfolio (MP)</h3>
          <p>Synthesizing on-site company visits and valuation models by sector analysts to finalize the core Model Portfolio via the Investment Committee.</p>
        </div>
        <div class="esgCard">
          <div class="esgCircle">03</div>
          <h3>Actual Portfolio &amp; Risk Control</h3>
          <p>Constructing actual fund portfolios tailored to mandate guidelines while continuously monitoring performance attribution and risk limits.</p>
        </div>
      </div>
    `,

    'info-guide': `
      <div class="subPageHeader">
        <span class="enLabel">INVESTMENT GUIDE</span>
        <h2>Investment Guide</h2>
      </div>
      <div class="subPullQuote">
        <p>“A Practical Compass for Successful Wealth Management”</p>
        <span>Select the right fund structure aligned with your investment horizon and risk tolerance.</span>
      </div>
      <table class="dataTable">
        <thead>
          <tr>
            <th>Fund Category</th>
            <th>Investment Target &amp; Characteristics</th>
            <th>Suitable Investor Profile</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Equity Funds</th>
            <td>Invests 60%+ in quality domestic and global equities to capture capital appreciation and dividend growth</td>
            <td>Growth-oriented investors seeking medium-to-long-term capital gains who can tolerate market volatility</td>
          </tr>
          <tr>
            <th>Fixed Income Funds</th>
            <td>Invests in sovereign and investment-grade corporate bonds for stable interest income and capital preservation</td>
            <td>Stability-seeking investors aiming for returns above benchmark deposit rates with lower volatility</td>
          </tr>
          <tr>
            <th>Multi-Asset / TDF</th>
            <td>Dynamically allocates across equities and bonds or automatically rebalances along your retirement glidepath</td>
            <td>Balanced investors pursuing long-term pension growth and systematic risk diversification</td>
          </tr>
        </tbody>
      </table>
    `,

    'prod-flagship': `
      <div class="subPageHeader">
        <span class="enLabel">FLAGSHIP FUNDS</span>
        <h2>Flagship Funds</h2>
      </div>
      <div class="subPullQuote">
        <p>“Proven Best-Selling Fund Lineup of P&C Capital Partners”</p>
        <span>Our nine representative flagship funds trusted by investors for their long-term track record and consistent philosophy.</span>
      </div>
      <div class="productGrid">
        <div class="productCard">
          <div>
            <span class="productTag">Domestic Equity · ESG</span>
            <h3>P&C Responsible ESG Fund</h3>
            <p>Long-term investment in leading Korean companies combining superior financial performance with sustainable ESG competitiveness.</p>
          </div>
          <span class="productMore">Learn More +</span>
        </div>
        <div class="productCard">
          <div>
            <span class="productTag">Domestic Equity · Active</span>
            <h3>P&C Active Value Fund</h3>
            <p>Generating excess returns by discovering undervalued quality companies and structural growth leaders.</p>
          </div>
          <span class="productMore">Learn More +</span>
        </div>
        <div class="productCard">
          <div>
            <span class="productTag">Domestic Equity · Medium Risk</span>
            <h3>P&C Turtle Long-Short Fund</h3>
            <p>Pursuing steady compounding returns across market cycles by combining dividend income with long-short and covered-call strategies.</p>
          </div>
          <span class="productMore">Learn More +</span>
        </div>
        <div class="productCard">
          <div>
            <span class="productTag">Global Equity · Asia</span>
            <h3>P&C Asia Leaders Growth</h3>
            <p>Focused investment in dominant industry leaders across high-growth Asian economies.</p>
          </div>
          <span class="productMore">Learn More +</span>
        </div>
        <div class="productCard">
          <div>
            <span class="productTag">Global Equity · Worldwide</span>
            <h3>P&C Global Leaders Growth</h3>
            <p>Diversified investment in world-class enterprises driving global technological innovation and consumer trends.</p>
          </div>
          <span class="productMore">Learn More +</span>
        </div>
        <div class="productCard">
          <div>
            <span class="productTag">Global Equity · Income</span>
            <h3>P&C Global Dividend Income</h3>
            <p>Investing in developed-market high-dividend equities and global REITs for regular cash flow and capital growth.</p>
          </div>
          <span class="productMore">Learn More +</span>
        </div>
        <div class="productCard">
          <div>
            <span class="productTag">Pension · Lifecycle</span>
            <h3>P&C Core TDF Series</h3>
            <p>Automatically rebalances global growth and defensive assets along a customized glidepath toward your target retirement year.</p>
          </div>
          <span class="productMore">Learn More +</span>
        </div>
        <div class="productCard">
          <div>
            <span class="productTag">Fixed Income · Investment Grade</span>
            <h3>P&C Prime Bond Fund</h3>
            <p>Securing stable income through sovereign bonds and A- or higher corporate credits utilizing duration and yield-curve strategies.</p>
          </div>
          <span class="productMore">Learn More +</span>
        </div>
        <div class="productCard">
          <div>
            <span class="productTag">Multi-Asset · IPO Alpha</span>
            <h3>P&C High-Yield IPO Alpha</h3>
            <p>Combining high coupon income from quality high-yield bonds with priority allocation benefits in promising IPOs.</p>
          </div>
          <span class="productMore">Learn More +</span>
        </div>
      </div>
    `,

    'prod-fundmap': `
      <div class="subPageHeader">
        <span class="enLabel">FUND LINEUP & MAP</span>
        <h2>Fund Map</h2>
      </div>
      <div class="subPullQuote">
        <p>“Comprehensive Overview of P&C Funds by Asset Class, Style &amp; Objective”</p>
        <span>Systematically organized from domestic and global equities to fixed income, active ETFs, and lifecycle pensions.</span>
      </div>
      <table class="dataTable">
        <thead>
          <tr>
            <th>Asset Class</th>
            <th>Investment Style</th>
            <th>Representative Funds</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Domestic Equities</th>
            <td>Large-Cap Growth / Value / Dividend / ESG</td>
            <td>P&C Responsible ESG Fund, P&C Active Value Fund, P&C Bluechip Dividend Fund</td>
          </tr>
          <tr>
            <th>Active ETFs</th>
            <td>Core Active &amp; Structural Growth Themes</td>
            <td>P&C Korea Active ETF, P&C Global Tech Leaders Active ETF</td>
          </tr>
          <tr>
            <th>Global Equities</th>
            <td>Global Growth / Asia Leaders / Global Income</td>
            <td>P&C Global Leaders Growth, P&C Asia Leaders Growth, P&C Global Dividend Income</td>
          </tr>
          <tr>
            <th>Fixed Income &amp; Hybrid</th>
            <td>Sovereign / Prime Credit / High-Yield IPO</td>
            <td>P&C Prime Bond Fund, P&C Short-Term Treasury Fund, P&C High-Yield IPO Alpha</td>
          </tr>
          <tr>
            <th>Pension &amp; TDF</th>
            <td>Lifecycle Asset Allocation (2030–2055)</td>
            <td>P&C Core TDF 2035 / 2040 / 2045 / 2050 Series</td>
          </tr>
        </tbody>
      </table>
    `,

    'prod-pension': `
      <div class="subPageHeader">
        <span class="enLabel">PENSION SAVINGS FUND</span>
        <h2>Pension Savings Funds</h2>
      </div>
      <div class="subPullQuote">
        <p>“The Cornerstone of Retirement Planning: Tax Credits &amp; Long-Term Compounding”</p>
        <span>Build a resilient retirement nest egg through annual tax deductions and tax-deferred compounding.</span>
      </div>
      <div class="esgPillars">
        <div class="esgCard">
          <div class="esgCircle">01</div>
          <h3>Annual Tax Credit Benefits</h3>
          <p>Enjoy statutory tax credit benefits on eligible annual contributions, delivering tangible tax savings each year.</p>
        </div>
        <div class="esgCard">
          <div class="esgCircle">02</div>
          <h3>Tax Deferral &amp; Compounding</h3>
          <p>Taxes on dividends and capital gains are deferred until pension withdrawal, maximizing the power of reinvested compounding.</p>
        </div>
        <div class="esgCard">
          <div class="esgCircle">03</div>
          <h3>Flexible Portfolio Rebalancing</h3>
          <p>Freely rebalance across equity, fixed income, global funds, and TDFs as market conditions evolve.</p>
        </div>
      </div>
    `,

    'prod-retirement': `
      <div class="subPageHeader">
        <span class="enLabel">RETIREMENT PENSION</span>
        <h2>Retirement Pension Funds</h2>
      </div>
      <div class="subPullQuote">
        <p>“Proven Long-Term Performance Paired with Rigorous Downside Protection”</p>
        <span>Delivering stable and sustainable retirement solutions optimized for DB, DC, and IRP pension accounts.</span>
      </div>
      <div class="creamBox">
        <h3>The P&C Retirement Pension Advantage</h3>
        <p>In retirement investing, multi-decade stability matters far more than short-term spikes. P&C Capital Partners combines low-volatility income assets with proven global growth leaders to support steady wealth accumulation through retirement.</p>
      </div>
      <table class="dataTable">
        <thead>
          <tr>
            <th>Plan Type</th>
            <th>Decision Maker</th>
            <th>Recommended P&C Pension Lineup</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Defined Benefit (DB)</th>
            <td>Corporate Sponsor</td>
            <td>P&C Retirement Prime Bond Fund, P&C Retirement Bond-Mixed 40 Fund</td>
          </tr>
          <tr>
            <th>Defined Contribution (DC) / IRP</th>
            <td>Individual Plan Participant</td>
            <td>P&C Core TDF Series, P&C Retirement Dividend Income Fund, P&C Global Leaders Pension Fund</td>
          </tr>
        </tbody>
      </table>
    `,

    'prod-realestate': `
      <div class="subPageHeader">
        <span class="enLabel">REAL ESTATE & ALTERNATIVES</span>
        <h2>Real Estate Funds</h2>
      </div>
      <div class="subPullQuote">
        <p>“Alternative Investment Solutions Through Prime Real Asset Sourcing &amp; Proactive Risk Control”</p>
        <span>Investing in core commercial offices, logistics hubs, and infrastructure offering stable rental yields and capital appreciation.</span>
      </div>
      <div class="philosophyGrid">
        <div class="philItem">
          <div class="philNum">A</div>
          <div class="philBody">
            <h4>Core &amp; Core-Plus Prime Asset Selection</h4>
            <p>Focused investment in prime commercial office buildings across major business districts (CBD, GBD, YBD) backed by creditworthy anchor tenants.</p>
          </div>
        </div>
        <div class="philItem">
          <div class="philNum">B</div>
          <div class="philBody">
            <h4>Value-Add Enhancement Strategy</h4>
            <p>Elevating both rental yield and exit valuation through strategic remodeling, tenant mix optimization, and active property management (PM/FM).</p>
          </div>
        </div>
      </div>
    `
  }
};

/* ==========================================================================
   5. HELPER FUNCTIONS & BILINGUAL UI RENDERER
   ========================================================================== */
function findMenuLocation(pageId) {
  if (pageId === 'sitemap') {
    return { category: SITEMAP_CATEGORY, item: SITEMAP_CATEGORY.items[0] };
  }
  for (const cat of MENU_DATA) {
    for (const item of cat.items) {
      if (item.id === pageId) {
        return { category: cat, item };
      }
    }
  }
  return null;
}

function bindDynamicPageLinks(root = document) {
  root.querySelectorAll('[data-page]').forEach(el => {
    if (el.dataset.bound === 'true') return;
    el.dataset.bound = 'true';
    el.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(el.getAttribute('data-page'));
    });
  });
}

function applyLanguageUI() {
  const t = UI_TEXT[currentLang];
  document.documentElement.lang = currentLang;
  document.title = t.docTitle;

  const setTxt = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };
  const setHtml = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = val;
  };

  setTxt('uiSearchLabel', t.searchLabel);
  const schInput = document.getElementById('fundSearchAuto');
  if (schInput) schInput.placeholder = t.searchPlaceholder;

  setTxt('uiFundTodayLabel', t.fundTodayLabel);
  setTxt('uiFundLayerTitle', t.fundLayerTitle);
  setTxt('uiFundLayerEmpty', t.fundLayerEmpty);
  setTxt('uiSitemapLabel', t.sitemapLabel);
  setTxt('currentLangLabel', t.currentLangLabel);
  setTxt('targetLangOption', t.targetLangOption);
  setTxt('uiMenuLabel', t.menuLabel);

  // Main Hero & Tiles
  setHtml('heroTitleHtml', t.heroTitleHtml);
  setTxt('heroDescText', t.heroDescText);
  setTxt('tile1Title', t.tile1Title);
  setHtml('tile1Desc', t.tile1Desc);
  setTxt('tile2Title', t.tile2Title);
  setHtml('tile2Desc', t.tile2Desc);
  setTxt('tile3Title', t.tile3Title);
  setHtml('tile3Desc', t.tile3Desc);
  setTxt('tile4Title', t.tile4Title);
  setHtml('tile4Desc', t.tile4Desc);
  setTxt('tile5Title', t.tile5Title);
  setHtml('tile5Desc', t.tile5Desc);
  setTxt('tile6Title', t.tile6Title);
  setHtml('tile6Desc', t.tile6Desc);

  // Lower 121px Band
  setTxt('bbs1Badge', t.bbs1Badge);
  setTxt('bbs1Title', t.bbs1Title);
  setTxt('bbs2Badge', t.bbs2Badge);
  setTxt('bbs2Title', t.bbs2Title);
  setTxt('metric1Label', t.metric1Label);
  setTxt('metric1Val', t.metric1Val);
  setTxt('metric2Label', t.metric2Label);
  setTxt('metric3Label', t.metric3Label);
  setTxt('metric4Label', t.metric4Label);

  // Pre-footer & Footer
  setHtml('preFooterContainer', t.preFooterHtml);
  setHtml('footerLinksContainer', t.footerHtml);
  bindDynamicPageLinks(document.getElementById('footerLinksContainer'));

  // Re-render GNB Drawer & Current Sub-page if open
  renderGnbDrawer();
  if (currentPageId) {
    renderSubPageContent();
    renderSubBreadcrumb();
  }
}

function toggleLanguage(targetLang) {
  if (targetLang && (targetLang === 'ko' || targetLang === 'en')) {
    currentLang = targetLang;
  } else {
    currentLang = currentLang === 'ko' ? 'en' : 'ko';
  }
  applyLanguageUI();
}

function renderGnbDrawer() {
  const container = document.getElementById('gnbAccordionContainer');
  if (!container) return;

  container.innerHTML = MENU_DATA.map((cat, idx) => {
    const isActive = currentCategory && currentCategory.id === cat.id ? true : (!currentCategory && idx === 0);
    const subItemsHtml = cat.items.map(item => `
      <li>
        <a href="#${item.id}" data-page="${item.id}" class="${currentPageId === item.id ? 'current' : ''}">
          ${item.title[currentLang]}
        </a>
      </li>
    `).join('');

    return `
      <div class="gnbItem ${isActive ? 'active' : ''}" data-cat="${cat.id}">
        <button type="button" class="gnbCategoryBtn">
          <span>${cat.title[currentLang]}</span>
          <span class="accIcon">${isActive ? '−' : '+'}</span>
        </button>
        <ul class="gnbSubList">
          ${subItemsHtml}
        </ul>
      </div>
    `;
  }).join('');

  // Bind single-open accordion toggles
  container.querySelectorAll('.gnbCategoryBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      const parentItem = btn.closest('.gnbItem');
      const wasActive = parentItem.classList.contains('active');

      container.querySelectorAll('.gnbItem').forEach(el => {
        el.classList.remove('active');
        const icon = el.querySelector('.accIcon');
        if (icon) icon.textContent = '+';
      });

      if (!wasActive) {
        parentItem.classList.add('active');
        const icon = parentItem.querySelector('.accIcon');
        if (icon) icon.textContent = '−';
      }
    });
  });

  // Bind submenu page navigation
  container.querySelectorAll('a[data-page]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPage = link.getAttribute('data-page');
      closeGnbDrawer();
      navigateTo(targetPage);
    });
  });
}

function renderSubPageContent() {
  const subContents = document.getElementById('subContents');
  if (!subContents || !currentPageId) return;

  if (currentPageId === 'sitemap') {
    subContents.innerHTML = buildSitemapContent(currentLang);
  } else {
    subContents.innerHTML = (PAGE_CONTENTS[currentLang] && PAGE_CONTENTS[currentLang][currentPageId]) || '';
  }
  bindDynamicPageLinks(subContents);
}

function renderSubBreadcrumb() {
  if (!currentCategory || !currentPageId) return;

  const loc = findMenuLocation(currentPageId);
  if (!loc) return;

  // Update 380px top banner text (over the uploaded P&C building image background)
  const bannerCatEn = document.getElementById('bannerCatEn');
  const bannerTitle = document.getElementById('bannerTitle');
  const bannerDesc = document.getElementById('bannerDesc');

  if (bannerCatEn) bannerCatEn.textContent = loc.category.enTitle;
  if (bannerTitle) bannerTitle.textContent = loc.item.title[currentLang];
  if (bannerDesc) bannerDesc.textContent = loc.category.bannerDesc[currentLang];

  // Depth 1 Dropdown (Include 4 main categories + Sitemap if currently on Sitemap)
  const depth1Label = document.getElementById('navDepth1Label');
  const depth1List = document.getElementById('navDepth1List');
  if (depth1Label) depth1Label.textContent = loc.category.title[currentLang];

  const allCats = currentPageId === 'sitemap' ? [...MENU_DATA, SITEMAP_CATEGORY] : MENU_DATA;
  if (depth1List) {
    depth1List.innerHTML = allCats.map(cat => `
      <li>
        <a href="#${cat.items[0].id}" data-page="${cat.items[0].id}" class="${cat.id === loc.category.id ? 'active' : ''}">
          ${cat.title[currentLang]}
        </a>
      </li>
    `).join('');
  }

  // Depth 2 Dropdown
  const depth2Label = document.getElementById('navDepth2Label');
  const depth2List = document.getElementById('navDepth2List');
  if (depth2Label) depth2Label.textContent = loc.item.title[currentLang];
  if (depth2List) {
    depth2List.innerHTML = loc.category.items.map(it => `
      <li>
        <a href="#${it.id}" data-page="${it.id}" class="${it.id === loc.item.id ? 'active' : ''}">
          ${it.title[currentLang]}
        </a>
      </li>
    `).join('');
  }

  // Bind dropdown clicks
  document.querySelectorAll('#navigation a[data-page]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(a.getAttribute('data-page'));
    });
  });
}

function navigateTo(pageId) {
  if (!pageId || pageId === 'home') {
    currentCategory = null;
    currentPageId = null;
    document.body.classList.remove('is-sub');
    document.body.classList.add('is-main');
    if (window.location.hash) {
      history.pushState(null, '', window.location.pathname);
    }
    renderGnbDrawer();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const loc = findMenuLocation(pageId);
  if (!loc) return;

  currentCategory = loc.category;
  currentPageId = loc.item.id;

  document.body.classList.remove('is-main');
  document.body.classList.add('is-sub');

  renderSubPageContent();

  if (window.location.hash !== `#${currentPageId}`) {
    history.pushState(null, '', `#${currentPageId}`);
  }

  renderGnbDrawer();
  renderSubBreadcrumb();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openGnbDrawer() {
  document.getElementById('gnbMenuLayer')?.classList.add('open');
  document.getElementById('gnbBackdrop')?.classList.add('open');
}

function closeGnbDrawer() {
  document.getElementById('gnbMenuLayer')?.classList.remove('open');
  document.getElementById('gnbBackdrop')?.classList.remove('open');
}

document.addEventListener('DOMContentLoaded', () => {
  // Menu open/close
  document.getElementById('menuLink')?.addEventListener('click', openGnbDrawer);
  document.getElementById('gnbCloseBtn')?.addEventListener('click', closeGnbDrawer);
  document.getElementById('gnbBackdrop')?.addEventListener('click', closeGnbDrawer);

  // Language Switcher: Clicking either the main language button or dropdown option switches KO <-> EN immediately
  const langSwitcher = document.getElementById('langSwitcher');
  const targetLangOption = document.getElementById('targetLangOption');
  if (langSwitcher) {
    langSwitcher.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleLanguage();
    });
  }
  if (targetLangOption) {
    targetLangOption.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleLanguage();
    });
  }

  // Search box slide animation
  const schArea = document.querySelector('.schArea');
  const schBtn = document.querySelector('.schBtn');
  const schInput = document.getElementById('fundSearchAuto');
  if (schBtn && schArea) {
    schBtn.addEventListener('click', () => {
      schArea.classList.toggle('on');
      if (schArea.classList.contains('on')) {
        schInput?.focus();
      }
    });
  }

  // Today Viewed Funds popover
  const fundTrigger = document.getElementById('fundAreaTrigger');
  const fundLayer = document.getElementById('fundTodayLayer');
  const fundClose = document.getElementById('fundLayerClose');
  if (fundTrigger && fundLayer) {
    fundTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      fundLayer.classList.toggle('open');
    });
    fundClose?.addEventListener('click', (e) => {
      e.stopPropagation();
      fundLayer.classList.remove('open');
    });
    document.addEventListener('click', () => {
      fundLayer.classList.remove('open');
    });
  }

  // Bind all initial data-page links
  bindDynamicPageLinks(document);

  // Handle browser back/forward
  window.addEventListener('popstate', () => {
    const hashPage = window.location.hash.replace('#', '');
    if (hashPage && findMenuLocation(hashPage)) {
      navigateTo(hashPage);
    } else {
      navigateTo('home');
    }
  });

  // Apply initial language & route
  applyLanguageUI();
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash && findMenuLocation(initialHash)) {
    navigateTo(initialHash);
  } else {
    navigateTo('home');
  }
});
