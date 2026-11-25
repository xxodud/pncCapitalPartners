/* ==========================================================================
   P&C CAPITAL PARTNERS — Application Logic, Navigation & Category Content
   (Reference: https://midasasset.com/ — '공지 & 공시' excluded per requirements)
   ========================================================================== */

const MENU_DATA = [
  {
    id: 'esg',
    title: 'ESG',
    enTitle: 'ESG / P&C CAPITAL PARTNERS',
    bannerDesc: '지속가능한 미래와 장기적 기업가치 제고를 위한 책임투자',
    items: [
      { id: 'esg-intro', title: 'ESG 소개' }
    ]
  },
  {
    id: 'about',
    title: '회사소개',
    enTitle: 'about P&C CAPITAL PARTNERS',
    bannerDesc: '원칙과 신뢰를 바탕으로 고객의 자산을 지키는 파트너',
    items: [
      { id: 'about-pnc', title: 'P&C 소개' },
      { id: 'about-exec', title: '임원진 소개' },
      { id: 'about-managers', title: '주요운용인력' },
      { id: 'about-aum', title: '운용규모' }
    ]
  },
  {
    id: 'info',
    title: '투자정보',
    enTitle: 'P&C CAPITAL philosophy',
    bannerDesc: '흔들리지 않는 운용철학과 체계적인 리스크 관리 프로세스',
    items: [
      { id: 'info-philosophy', title: '운용철학' },
      { id: 'info-process', title: '운용프로세스' },
      { id: 'info-guide', title: '투자가이드' }
    ]
  },
  {
    id: 'products',
    title: '투자상품',
    enTitle: 'P&C CAPITAL products',
    bannerDesc: '고객의 생애주기와 투자목적에 부합하는 최적의 포트폴리오 솔루션',
    items: [
      { id: 'prod-flagship', title: '대표상품' },
      { id: 'prod-fundmap', title: '펀드맵' },
      { id: 'prod-pension', title: '연금저축펀드' },
      { id: 'prod-retirement', title: '퇴직연금펀드' },
      { id: 'prod-realestate', title: '부동산펀드' }
    ]
  }
];

const PAGE_CONTENTS = {
  /* ----------------------------------------------------------------------
     1. ESG -> ESG 소개
     ---------------------------------------------------------------------- */
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

  /* ----------------------------------------------------------------------
     2. 회사소개 -> P&C 소개 / 임원진 소개 / 주요운용인력 / 운용규모
     ---------------------------------------------------------------------- */
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

  /* ----------------------------------------------------------------------
     3. 투자정보 -> 운용철학 / 운용프로세스 / 투자가이드
     ---------------------------------------------------------------------- */
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
        <p> 각 펀드의 투자목적과 약관에 맞춰 실제 포트폴리오를 구성하고 성과분석 및 리스크 한도를 상시 점검합니다.</p>
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

  /* ----------------------------------------------------------------------
     4. 투자상품 -> 대표상품 / 펀드맵 / 연금저축펀드 / 퇴직연금펀드 / 부동산펀드
     ---------------------------------------------------------------------- */
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
};

/* ==========================================================================
   DOM INITIALIZATION & ROUTING
   ========================================================================== */
let currentCategory = null;
let currentPageId = null;

function findMenuLocation(pageId) {
  for (const cat of MENU_DATA) {
    for (const item of cat.items) {
      if (item.id === pageId) {
        return { category: cat, item };
      }
    }
  }
  return null;
}

function renderGnbDrawer() {
  const container = document.getElementById('gnbAccordionContainer');
  if (!container) return;

  container.innerHTML = MENU_DATA.map((cat, idx) => {
    const isActive = currentCategory ? currentCategory.id === cat.id : idx === 0;
    const subItemsHtml = cat.items.map(item => `
      <li>
        <a href="#${item.id}" data-page="${item.id}" class="${currentPageId === item.id ? 'current' : ''}">
          ${item.title}
        </a>
      </li>
    `).join('');

    return `
      <div class="gnbItem ${isActive ? 'active' : ''}" data-cat="${cat.id}">
        <button type="button" class="gnbCategoryBtn">
          <span>${cat.title}</span>
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

function renderSubBreadcrumb() {
  if (!currentCategory || !currentPageId) return;

  const loc = findMenuLocation(currentPageId);
  if (!loc) return;

  // Update 380px top banner text (using the uploaded P&C building image background)
  const bannerCatEn = document.getElementById('bannerCatEn');
  const bannerTitle = document.getElementById('bannerTitle');
  const bannerDesc = document.getElementById('bannerDesc');

  if (bannerCatEn) bannerCatEn.textContent = loc.category.enTitle;
  if (bannerTitle) bannerTitle.textContent = loc.item.title;
  if (bannerDesc) bannerDesc.textContent = loc.category.bannerDesc;

  // Depth 1 Dropdown
  const depth1Label = document.getElementById('navDepth1Label');
  const depth1List = document.getElementById('navDepth1List');
  if (depth1Label) depth1Label.textContent = loc.category.title;
  if (depth1List) {
    depth1List.innerHTML = MENU_DATA.map(cat => `
      <li>
        <a href="#${cat.items[0].id}" data-page="${cat.items[0].id}" class="${cat.id === loc.category.id ? 'active' : ''}">
          ${cat.title}
        </a>
      </li>
    `).join('');
  }

  // Depth 2 Dropdown
  const depth2Label = document.getElementById('navDepth2Label');
  const depth2List = document.getElementById('navDepth2List');
  if (depth2Label) depth2Label.textContent = loc.item.title;
  if (depth2List) {
    depth2List.innerHTML = loc.category.items.map(it => `
      <li>
        <a href="#${it.id}" data-page="${it.id}" class="${it.id === loc.item.id ? 'active' : ''}">
          ${it.title}
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

  const subContents = document.getElementById('subContents');
  if (subContents) {
    subContents.innerHTML = PAGE_CONTENTS[currentPageId] || '';
  }

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

  // Bind all data-page links on main page (6 hero tiles, logo, lower band, etc.)
  document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(el.getAttribute('data-page'));
    });
  });

  // Handle browser back/forward
  window.addEventListener('popstate', () => {
    const hashPage = window.location.hash.replace('#', '');
    if (hashPage && findMenuLocation(hashPage)) {
      navigateTo(hashPage);
    } else {
      navigateTo('home');
    }
  });

  // Initial route check
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash && findMenuLocation(initialHash)) {
    navigateTo(initialHash);
  } else {
    navigateTo('home');
  }
});
