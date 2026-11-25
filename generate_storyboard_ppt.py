# -*- coding: utf-8 -*-
"""
P&C CAPITAL PARTNERS — 웹사이트 화면설계서 (UI/UX Storyboard & Wireframe Specification)
16:9 Widescreen Professional PPTX Generator
"""

import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

# Color Palette Constants
C_MAROON = RGBColor(0x63, 0x1C, 0x2A)       # #631c2a Deep Maroon
C_CRIMSON = RGBColor(0x9E, 0x12, 0x27)      # #9e1227 Brand Crimson
C_CHARCOAL = RGBColor(0x22, 0x23, 0x26)     # #222326 Dark Charcoal
C_DARK_BG = RGBColor(0x16, 0x17, 0x1A)      # #16171a Deep Dark Header/Cover
C_GOLD = RGBColor(0xFF, 0xB9, 0x32)         # #ffb932 Accent Gold
C_GOLD_DARK = RGBColor(0xC8, 0x8A, 0x14)    # #c88a14 Darker Gold for white bg
C_CREAM = RGBColor(0xFB, 0xFA, 0xF6)        # #fbfaf6 Warm Cream
C_CREAM_BORDER = RGBColor(0xE3, 0xDC, 0xCD) # #e3dccd Cream Border
C_LIGHT_GRAY = RGBColor(0xF3, 0xF4, 0xF6)   # #f3f4f6 Box Gray
C_BORDER_GRAY = RGBColor(0xD8, 0xDC, 0xE2)  # #d8dce2 Wireframe Border
C_TEXT_DARK = RGBColor(0x22, 0x22, 0x22)    # #222222 Primary Text
C_TEXT_MUTED = RGBColor(0x66, 0x66, 0x66)   # #666666 Secondary Text
C_WHITE = RGBColor(0xFF, 0xFF, 0xFF)        # #ffffff White

FONT_KR = "맑은 고딕"

def set_font(run, size_pt, bold=False, color=C_TEXT_DARK, font_name=FONT_KR):
    run.font.name = font_name
    run.font.size = Pt(size_pt)
    run.font.bold = bold
    run.font.color.rgb = color

def add_rect(slide, left, top, width, height, fill_color=None, border_color=None, border_pt=1):
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, width, height)
    if fill_color is not None:
        shape.fill.solid()
        shape.fill.fore_color.rgb = fill_color
    else:
        shape.fill.background()
    if border_color is not None:
        shape.line.color.rgb = border_color
        shape.line.width = Pt(border_pt)
    else:
        shape.line.fill.background()
    return shape

def add_round_rect(slide, left, top, width, height, fill_color=None, border_color=None, border_pt=1):
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    if fill_color is not None:
        shape.fill.solid()
        shape.fill.fore_color.rgb = fill_color
    else:
        shape.fill.background()
    if border_color is not None:
        shape.line.color.rgb = border_color
        shape.line.width = Pt(border_pt)
    else:
        shape.line.fill.background()
    return shape

def add_badge(slide, left, top, number_str, fill_color=C_CRIMSON, text_color=C_WHITE, size=0.28):
    oval = slide.shapes.add_shape(MSO_SHAPE.OVAL, Inches(left), Inches(top), Inches(size), Inches(size))
    oval.fill.solid()
    oval.fill.fore_color.rgb = fill_color
    oval.line.color.rgb = C_WHITE
    oval.line.width = Pt(1)
    tf = oval.text_frame
    tf.word_wrap = False
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    run = p.add_run()
    run.text = str(number_str)
    set_font(run, 10, bold=True, color=text_color)
    return oval

def add_text_box(slide, left, top, width, height, text, size_pt=11, bold=False, color=C_TEXT_DARK, align=PP_ALIGN.LEFT, valign=MSO_ANCHOR.TOP):
    tb = slide.shapes.add_textbox(Inches(left), Inches(top), Inches(width), Inches(height))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.vertical_anchor = valign
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = Pt(2)
    lines = text.split("\n")
    for idx, line in enumerate(lines):
        p = tf.paragraphs[0] if idx == 0 else tf.add_paragraph()
        p.alignment = align
        p.space_after = Pt(3)
        run = p.add_run()
        run.text = line
        set_font(run, size_pt, bold=bold, color=color)
    return tb

def apply_master_chrome(slide, screen_id, title_kr, nav_path, page_num, total_pages=10):
    """Applies standard UI/UX Storyboard Top Header Bar and Bottom Footer Bar"""
    # Top Header Bar
    add_rect(slide, Inches(0), Inches(0), Inches(13.333), Inches(0.85), fill_color=C_DARK_BG)
    add_rect(slide, Inches(0), Inches(0.85), Inches(13.333), Inches(0.04), fill_color=C_GOLD)

    # Screen ID Pill
    pill = add_round_rect(slide, Inches(0.4), Inches(0.2), Inches(1.45), Inches(0.44), fill_color=C_MAROON, border_color=C_GOLD, border_pt=1)
    tf = pill.text_frame
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = screen_id
    set_font(r, 11, bold=True, color=C_GOLD)

    # Screen Title
    add_text_box(slide, 2.0, 0.16, 6.8, 0.5, title_kr, size_pt=18, bold=True, color=C_WHITE, valign=MSO_ANCHOR.MIDDLE)

    # Right Meta Table in Header
    add_text_box(slide, 8.8, 0.15, 4.1, 0.26, f"경로 : {nav_path}", size_pt=10, bold=False, color=C_GOLD, align=PP_ALIGN.RIGHT)
    add_text_box(slide, 8.8, 0.42, 4.1, 0.26, "P&C CAPITAL PARTNERS 웹사이트 화면설계서 v1.0", size_pt=9.5, bold=False, color=RGBColor(0xBB, 0xBB, 0xBB), align=PP_ALIGN.RIGHT)

    # Bottom Footer Bar
    add_rect(slide, Inches(0), Inches(7.15), Inches(13.333), Inches(0.35), fill_color=C_CHARCOAL)
    add_text_box(slide, 0.4, 7.18, 7.0, 0.25, "CONFIDENTIAL  |  P&C CAPITAL PARTNERS UI/UX STORYBOARD SPECIFICATION", size_pt=8.5, color=RGBColor(0xAA, 0xAA, 0xAA))
    add_text_box(slide, 10.5, 7.18, 2.4, 0.25, f"Page {page_num} / {total_pages}", size_pt=9, bold=True, color=C_GOLD, align=PP_ALIGN.RIGHT)

def add_spec_table(slide, left, top, width, rows_data, col_widths):
    """Adds a clean Functional Specification Table on the right panel of storyboard slides"""
    num_rows = len(rows_data)
    num_cols = len(col_widths)
    table_shape = slide.shapes.add_table(num_rows, num_cols, Inches(left), Inches(top), Inches(width), Inches(0.38 * num_rows))
    table = table_shape.table

    for c_idx, w in enumerate(col_widths):
        table.columns[c_idx].width = Inches(w)

    for r_idx, row in enumerate(rows_data):
        is_header = (r_idx == 0)
        for c_idx, val in enumerate(row):
            cell = table.cell(r_idx, c_idx)
            cell.vertical_anchor = MSO_ANCHOR.MIDDLE
            cell.fill.solid()
            if is_header:
                cell.fill.fore_color.rgb = C_MAROON
            elif r_idx % 2 == 1:
                cell.fill.fore_color.rgb = C_WHITE
            else:
                cell.fill.fore_color.rgb = C_CREAM

            tf = cell.text_frame
            tf.word_wrap = True
            tf.margin_left = Pt(5)
            tf.margin_right = Pt(5)
            tf.margin_top = Pt(3)
            tf.margin_bottom = Pt(3)
            p = tf.paragraphs[0]
            p.alignment = PP_ALIGN.CENTER if (is_header or c_idx == 0) else PP_ALIGN.LEFT
            run = p.add_run()
            run.text = str(val)
            if is_header:
                set_font(run, 9.5, bold=True, color=C_GOLD if c_idx == 0 else C_WHITE)
            else:
                set_font(run, 9, bold=(c_idx <= 1), color=C_CRIMSON if c_idx == 0 else C_TEXT_DARK)
    return table_shape


def build_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    img_sub_banner = r"c:\Users\gram\Desktop\pnc-capital\assets\sub_banner_bg.jpg"
    img_live_capture = r"C:\Users\gram\.gemini\antigravity\brain\2a33cdf5-61c4-4ec0-a172-171dc5767c51\browser_evidence\3d609c08-8481-4a4c-a8b6-bb263f63ff53\final_step_14.png"

    # =========================================================================
    # SLIDE 1: 표지 (COVER SLIDE)
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    add_rect(s1, Inches(0), Inches(0), Inches(13.333), Inches(7.5), fill_color=C_DARK_BG)

    # Right side architectural photo preview
    if os.path.exists(img_sub_banner):
        s1.shapes.add_picture(img_sub_banner, Inches(7.3), Inches(0), height=Inches(7.5))
        # Dark overlay over photo border for seamless blend
        overlay = add_rect(s1, Inches(7.3), Inches(0), Inches(1.4), Inches(7.5), fill_color=C_DARK_BG)

    # Gold Accent Lines
    add_rect(s1, Inches(0.8), Inches(1.1), Inches(1.2), Inches(0.06), fill_color=C_GOLD)
    add_text_box(s1, 0.8, 1.3, 6.5, 0.4, "UI / UX STORYBOARD & SCREEN SPECIFICATION", size_pt=12, bold=True, color=C_GOLD)

    add_text_box(s1, 0.8, 1.85, 6.8, 1.5, "P&C CAPITAL PARTNERS\n웹사이트 구축 화면설계서", size_pt=34, bold=True, color=C_WHITE)
    add_text_box(s1, 0.8, 3.35, 6.4, 0.9, "참조 사이트(마이다스에셋자산운용) 레이아웃 완벽 재현 및\n제미나이 배경 비디오 · 커스텀 CI 로고 · 사옥 배너 적용 설계 문서", size_pt=13, color=RGBColor(0xCC, 0xCC, 0xCC))

    # Cover Metadata Card
    meta_box = add_rect(s1, Inches(0.8), Inches(4.55), Inches(6.1), Inches(2.15), fill_color=C_CHARCOAL, border_color=C_GOLD, border_pt=1)
    meta_items = [
        ("프로젝트명", "P&C 캐피탈 파트너스 공식 웹사이트 구축 (선작업 버전)"),
        ("참조 사이트", "https://midasasset.com/ (레이아웃 · 그리드 · 모션 동일 구현)"),
        ("핵심 커스텀", "① 제미나이 생성 메인 배경 비디오  ② P&C 모노그램 CI 로고\n③ 전 카테고리 상단 사옥 배너 적용  ④ '공지&공시' 메뉴 제외"),
        ("문서 버전 / 일자", "v1.0  |  2026. 11. 25")
    ]
    y_cursor = 4.7
    for k, v in meta_items:
        add_text_box(s1, 1.05, y_cursor, 1.5, 0.35, k, size_pt=10, bold=True, color=C_GOLD)
        add_text_box(s1, 2.55, y_cursor, 4.2, 0.45, v, size_pt=10, color=C_WHITE)
        y_cursor += 0.46 if "\n" not in v else 0.58

    # =========================================================================
    # SLIDE 2: 프로젝트 개요 및 핵심 요구사항 반영 명세
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    apply_master_chrome(s2, "OVERVIEW", "프로젝트 개요 및 5대 핵심 요구사항 설계 반영 내역", "Project Overview & Requirements", 2)

    add_text_box(s2, 0.4, 1.05, 12.5, 0.35, "1. 클라이언트 5대 핵심 요구사항 및 기술 구현 매핑", size_pt=14, bold=True, color=C_MAROON)

    req_cards = [
        ("요구사항 01", "참조사이트 동일 레이아웃 구현", "https://midasasset.com/ 기준",
         "• 상단 80px 투명 유틸리티 바 + 우측 슬라이드 드로어\n• 메인 50:50 분할 그리드 및 우측 3×2(6개) 호버 타일\n• 하단 121px 마룬(#631c2a)/차콜(#292a2c) 분할 바\n• 서브 페이지 380px 배너 + 60px 브레드크럼 바 완벽 재현"),
        ("요구사항 02", "메인 백그라운드 동영상 교체", "제미나이 생성 비디오 적용",
         "• 공유 링크(share.gemini.google/ktedWIlecM4d) 최종본 추출\n• 로컬 에셋(assets/main_bg.mp4, 1280×720) 탑재\n• <video autoplay loop muted playsinline> 적용\n• 32% 다크 스크림(em) + 도트 텍스처(i) 오버레이 합성"),
        ("요구사항 03", "첨부 이미지 기반 회사 로고 생성", "P&C CAPITAL PARTNERS CI",
         "• 사옥 외벽 사인물의 P&C 겹침 세리프 모노그램 완벽 재현\n• 골드 앰퍼샌드(&) 포인트 + CAPITAL PARTNERS 워드마크\n• 상단 투명 헤더용 화이트/골드 로고(logo_white.svg)\n• 하단 푸터용 다크 엠블럼 로고(logo_dark.svg) 이원화 적용"),
        ("요구사항 04", "카테고리 상단 배경 이미지 교체", "전 서브 페이지 380px 배너 통합",
         "• 각 카테고리 진입 시 상단 380px 헤더 배경에 첨부 사옥 이미지(assets/sub_banner_bg.jpg) 일괄 적용\n• 좌측 텍스트 가독성 확보를 위한 그라데이션 오버레이\n• 카테고리별 영문 라벨 + 메뉴 타이틀 동적 바인딩"),
        ("요구사항 05", "'공지 & 공시' 메뉴 제외", "핵심 4대 카테고리 체제로 슬림화",
         "• 기존 5개 대분류 중 마지막 '공지 & 공시' 완전 제거\n• ① ESG (1) ② 회사소개 (4) ③ 투자정보 (3) ④ 투자상품 (5)\n  총 4개 대분류 · 13개 세부 콘텐츠 화면으로 완결 구성\n• GNB 드로어 및 서브 브레드크럼 드롭다운 동기화")
    ]

    card_w = 2.38
    gap = 0.15
    start_x = 0.4
    for idx, (tag, title, sub, body) in enumerate(req_cards):
        cx = start_x + idx * (card_w + gap)
        add_rect(s2, Inches(cx), Inches(1.48), Inches(card_w), Inches(3.25), fill_color=C_CREAM, border_color=C_CREAM_BORDER, border_pt=1)
        add_rect(s2, Inches(cx), Inches(1.48), Inches(card_w), Inches(0.42), fill_color=C_MAROON)
        add_text_box(s2, cx + 0.1, 1.54, card_w - 0.2, 0.3, tag, size_pt=10.5, bold=True, color=C_GOLD, align=PP_ALIGN.CENTER)
        add_text_box(s2, cx + 0.12, 2.0, card_w - 0.24, 0.35, title, size_pt=11.5, bold=True, color=C_TEXT_DARK)
        add_text_box(s2, cx + 0.12, 2.32, card_w - 0.24, 0.28, sub, size_pt=9.5, bold=True, color=C_CRIMSON)
        add_rect(s2, Inches(cx + 0.12), Inches(2.64), Inches(card_w - 0.24), Inches(0.015), fill_color=C_CREAM_BORDER)
        add_text_box(s2, cx + 0.12, 2.74, card_w - 0.24, 1.9, body, size_pt=9, color=C_TEXT_DARK)

    # Bottom section: System Architecture & File Structure Table
    add_text_box(s2, 0.4, 4.92, 12.5, 0.32, "2. 프로젝트 파일 구조 및 기술 스택 명세 (c:\\Users\\gram\\Desktop\\pnc-capital)", size_pt=14, bold=True, color=C_MAROON)

    arch_rows = [
        ["파일명 / 경로", "역할 및 구분", "주요 구현 내용 및 설계 포인트"],
        ["index.html", "메인 엔트리 & 뷰 컨테이너", "상단 헤더(#header), GNB 아코디언 드로어(#gnbMenuLayer), 메인 뷰(#mainView), 서브 뷰(#subView), 푸터(#footer) 통합 구조"],
        ["styles.css", "디자인 시스템 & 반응형 스타일", "CSS 변수 기반 컬러 팔레트, 50:50 히어로 그리드, 6개 타일 호버 애니메이션(0.85s 페이드/슬라이드업), 1024px 반응형 브레이크포인트"],
        ["app.js", "SPA 라우팅 & 13개 화면 데이터", "해시(#) 기반 즉시 화면 전환, 4개 대분류 아코디언 제어, 브레드크럼 Depth 1/2 드롭다운 연동, 13개 서브 페이지 콘텐츠 렌더링"],
        ["assets/main_bg.mp4", "메인 배경 동영상 (4.06MB)", "제미나이 생성 1280×720 MP4 비디오 (강남 석양 도심 트래픽 + P&C 캐피탈 파트너스 서류 서명 및 자문 연출 컷)"],
        ["assets/sub_banner_bg.jpg", "서브 상단 배너 이미지 + SVG 로고", "첨부 사옥 외관 이미지(sub_banner_bg.jpg) 및 커스텀 제작 벡터 로고 2종(logo_white.svg, logo_dark.svg)"]
    ]
    add_spec_table(s2, 0.4, 5.28, 12.53, arch_rows, [2.5, 2.4, 7.63])

    # =========================================================================
    # SLIDE 3: 정보구조도 (IA - Information Architecture) & 메뉴 체계
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    apply_master_chrome(s3, "IA-01", "정보구조도 (Information Architecture) 및 전체 메뉴 구조", "Sitemap & Menu Hierarchy", 3)

    add_text_box(s3, 0.4, 1.02, 12.5, 0.35, "■ 전체 메뉴 트리 구조도 (4대 카테고리 · 13개 세부 화면 / '공지 & 공시' 제외 완료)", size_pt=13.5, bold=True, color=C_MAROON)

    # Root Node: HOME
    root = add_round_rect(s3, Inches(5.15), Inches(1.48), Inches(3.0), Inches(0.62), fill_color=C_DARK_BG, border_color=C_GOLD, border_pt=1.5)
    add_text_box(s3, 5.15, 1.54, 3.0, 0.5, "MAIN HOME (#home)\nP&C CAPITAL PARTNERS 메인", size_pt=10.5, bold=True, color=C_GOLD, align=PP_ALIGN.CENTER)

    # Connector line down from Root
    add_rect(s3, Inches(6.64), Inches(2.1), Inches(0.03), Inches(0.28), fill_color=C_MAROON)
    add_rect(s3, Inches(1.75), Inches(2.38), Inches(9.8), Inches(0.03), fill_color=C_MAROON)

    ia_columns = [
        ("01. ESG", "ESG / P&C CAPITAL", "#esg", [
            ("ESG 소개", "#esg-intro", "E·S·G 3대 핵심 영역 및 ESG 운용위원회·스튜어드십 코드")
        ]),
        ("02. 회사소개", "about P&C CAPITAL", "#about", [
            ("P&C 소개", "#about-pnc", "기업 개요, 핵심 경쟁력, 주요 사업영역 요약 테이블"),
            ("임원진 소개", "#about-exec", "신진호 회장, 신정희 사장, 백송호 부문대표 프로필 카드"),
            ("주요운용인력", "#about-managers", "주식·채권·글로벌·연금 본부장 및 팀장 약력/대표펀드"),
            ("운용규모", "#about-aum", "총 AUM 28조 9,296억 원 자산군별 비중 및 재무안정성")
        ]),
        ("03. 투자정보", "P&C philosophy", "#info", [
            ("운용철학", "#info-philosophy", "고객 이익 최우선 5대 핵심 운용 원칙 (2열 그리드)"),
            ("운용프로세스", "#info-process", "Bottom-Up & Top-Down 결합 3단계 포트폴리오 구축"),
            ("투자가이드", "#info-guide", "주식형·채권형·혼합형(TDF) 펀드 유형별 비교 가이드")
        ]),
        ("04. 투자상품", "P&C products", "#products", [
            ("대표상품", "#prod-flagship", "P&C 9대 베스트셀러 대표 펀드 3×3 카드 그리드"),
            ("펀드맵", "#prod-fundmap", "투자유형별·스타일별 전체 펀드 라인업 매트릭스"),
            ("연금저축펀드", "#prod-pension", "세액공제·과세이연·복리효과 3대 연금저축 핵심 혜택"),
            ("퇴직연금펀드", "#prod-retirement", "DB·DC·IRP 제도별 맞춤형 퇴직연금 라인업 안내"),
            ("부동산펀드", "#prod-realestate", "Core & Core-Plus / Value-Add 실물 대체투자 전략")
        ])
    ]

    col_w = 2.88
    col_gap = 0.28
    base_x = 0.45

    for idx, (cat_title, cat_en, cat_hash, sub_list) in enumerate(ia_columns):
        cx = base_x + idx * (col_w + col_gap)
        # Vertical drop line
        add_rect(s3, Inches(cx + col_w / 2), Inches(2.38), Inches(0.03), Inches(0.25), fill_color=C_MAROON)
        # Category Header Box
        add_rect(s3, Inches(cx), Inches(2.63), Inches(col_w), Inches(0.68), fill_color=C_MAROON, border_color=C_GOLD, border_pt=1)
        add_text_box(s3, cx + 0.1, 2.67, col_w - 0.2, 0.3, cat_title, size_pt=12, bold=True, color=C_GOLD, align=PP_ALIGN.CENTER)
        add_text_box(s3, cx + 0.1, 2.97, col_w - 0.2, 0.25, cat_en, size_pt=8.5, color=C_WHITE, align=PP_ALIGN.CENTER)

        # Sub-pages list
        sy = 3.42
        for s_title, s_hash, s_desc in sub_list:
            add_rect(s3, Inches(cx), Inches(sy), Inches(col_w), Inches(0.64), fill_color=C_CREAM, border_color=C_CREAM_BORDER, border_pt=1)
            add_rect(s3, Inches(cx), Inches(sy), Inches(0.08), Inches(0.64), fill_color=C_CRIMSON)
            add_text_box(s3, cx + 0.15, sy + 0.04, col_w - 0.2, 0.24, f"{s_title}  ({s_hash})", size_pt=9.5, bold=True, color=C_TEXT_DARK)
            add_text_box(s3, cx + 0.15, sy + 0.28, col_w - 0.2, 0.32, s_desc, size_pt=8, color=C_TEXT_MUTED)
            sy += 0.70

    # Excluded Notice Banner at bottom left
    add_rect(s3, Inches(0.45), Inches(6.25), Inches(9.2), Inches(0.68), fill_color=C_LIGHT_GRAY, border_color=C_BORDER_GRAY, border_pt=1)
    add_text_box(s3, 0.6, 6.32, 8.9, 0.55,
                 "※ 글로벌 유틸리티 영역 : [검색 (#fundSearchAuto)]  |  [오늘 본 펀드 (0) (#fundTodayLayer)]  |  [사이트맵 (#prod-fundmap 연동)]  |  [언어전환 (KOREAN / ENGLISH)]  |  [MENU (#gnbMenuLayer)]\n※ 제외된 메뉴 (요구사항 #5 반영) : 기존 참조사이트의 5번째 카테고리인 '공지 & 공시 (공지사항, 공시정보, 인재채용)'는 GNB 및 브레드크럼에서 완전 제외 처리됨.",
                 size_pt=8.8, color=C_TEXT_DARK)

    # =========================================================================
    # SLIDE 4: 디자인 시스템 & 브랜드 아이덴티티 (UI-SYS-01)
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    apply_master_chrome(s4, "UI-SYS-01", "디자인 시스템 (Color Palette · Typography · Custom CI · 미디어 에셋)", "Design System & Brand Assets", 4)

    # Left Column: Color Palette & Typography
    add_text_box(s4, 0.4, 1.05, 6.1, 0.32, "1. 컬러 팔레트 (Color System)", size_pt=13, bold=True, color=C_MAROON)

    swatches = [
        (C_GOLD, "Primary Gold", "#FFB932", "로고 앰퍼샌드(&), 활성 메뉴, 배지 강조"),
        (C_MAROON, "Deep Maroon", "#631C2A", "메인 하단 좌측 바, 테이블/탭 헤더, 아이콘 원형 배경"),
        (C_CRIMSON, "Brand Crimson", "#9E1227", "서브 페이지 영문 라벨, 인용구 강조 텍스트, 호버 보더"),
        (C_CHARCOAL, "Dark Charcoal", "#292A2C", "서브 60px 브레드크럼 바, 메인 하단 우측 바, 팝오버 헤더"),
        (C_CREAM, "Warm Cream", "#FBFAF6", "인용구 박스, 콜아웃 카드, 테이블 헤더 및 프리푸터 배경"),
        (RGBColor(0xF0, 0xF0, 0xF0), "Footer Gray", "#F0F0F0", "하단 푸터 배경 및 오늘 본 펀드 레이어 바디 배경")
    ]

    sy = 1.45
    for idx, (rgb, name, hex_code, usage) in enumerate(swatches):
        col_offset = 0.4 if idx < 3 else 3.55
        row_y = sy + (idx % 3) * 0.85
        add_rect(s4, Inches(col_offset), Inches(row_y), Inches(0.75), Inches(0.72), fill_color=rgb, border_color=C_BORDER_GRAY, border_pt=1)
        add_text_box(s4, col_offset + 0.85, row_y + 0.02, 2.2, 0.24, f"{name} ({hex_code})", size_pt=9.5, bold=True, color=C_TEXT_DARK)
        add_text_box(s4, col_offset + 0.85, row_y + 0.27, 2.2, 0.42, usage, size_pt=8.2, color=C_TEXT_MUTED)

    # Typography Box
    add_text_box(s4, 0.4, 4.12, 6.1, 0.32, "2. 타이포그래피 & 그리드 시스템 (Typography & Grid)", size_pt=13, bold=True, color=C_MAROON)
    typo_rows = [
        ["구분", "폰트 패밀리 (Font Family)", "적용 영역 및 크기/굵기 규격"],
        ["영문 세리프 (CI/라벨)", "Cormorant Garamond, Cinzel", "P&C 모노그램 로고(700), 카테고리 영문 헤더 라벨(Letter-spacing 0.22~0.28em)"],
        ["국문 본문/헤딩", "Noto Sans KR (300 / 400 / 500)", "메인 히어로 H1(36px, Light), 타일 H2(22px), 서브 H2(34px), 본문(14~15px)"],
        ["레이아웃 컨테이너", "1200px / 1100px Center Grid", "헤더/푸터/네비게이션 1200px(.headerWarp), 서브 본문 1100px(#subContents)"]
    ]
    add_spec_table(s4, 0.4, 4.48, 6.15, typo_rows, [1.4, 2.0, 2.75])

    # Right Column: Custom Logo & Visual Asset Preview
    add_text_box(s4, 6.85, 1.05, 6.0, 0.32, "3. 커스텀 CI 로고 및 서브 상단 배너 에셋 설계", size_pt=13, bold=True, color=C_MAROON)

    # Dark Logo Preview Card
    add_rect(s4, Inches(6.85), Inches(1.45), Inches(2.9), Inches(1.55), fill_color=C_DARK_BG, border_color=C_GOLD, border_pt=1)
    add_text_box(s4, 7.0, 1.55, 2.6, 0.55, "P&C  |  P&C CAPITAL\n            PARTNERS", size_pt=13, bold=True, color=C_WHITE)
    add_text_box(s4, 7.0, 2.25, 2.6, 0.65, "• 상단 헤더용 (logo_white.svg)\n• P, C 화이트 세리프 + & 골드(#FFB932) 중첩 조형", size_pt=8.5, color=RGBColor(0xCC, 0xCC, 0xCC))

    # Footer Dark Logo Preview Card
    add_rect(s4, Inches(9.95), Inches(1.45), Inches(2.95), Inches(1.55), fill_color=C_CREAM, border_color=C_CREAM_BORDER, border_pt=1)
    add_text_box(s4, 10.1, 1.55, 2.65, 0.55, "P&C\nCAPITAL PARTNERS", size_pt=12.5, bold=True, color=C_TEXT_DARK, align=PP_ALIGN.CENTER)
    add_text_box(s4, 10.1, 2.25, 2.65, 0.65, "• 하단 푸터용 (logo_dark.svg)\n• 사옥 석재 사인물과 동일한 상하 스택형 엠블럼", size_pt=8.5, color=C_TEXT_MUTED)

    # Uploaded Building Image Preview
    add_rect(s4, Inches(6.85), Inches(3.15), Inches(6.05), Inches(3.75), fill_color=C_CREAM, border_color=C_CREAM_BORDER, border_pt=1)
    if os.path.exists(img_sub_banner):
        s4.shapes.add_picture(img_sub_banner, Inches(7.0), Inches(3.3), width=Inches(3.25))
    add_text_box(s4, 10.4, 3.3, 2.35, 3.4,
                 "■ 서브 상단 공통 배경\n(assets/sub_banner_bg.jpg)\n\n• 적용 위치:\n  body.is-sub #header (높이 380px)\n\n• 시각 처리:\n  background-size: cover;\n  background-position: center 38%;\n\n• 가독성 오버레이:\n  좌측 78% → 중앙 45% 다크 그라데이션(::before)을 중첩하여 상단 유틸리티 바와 좌측 서브 타이틀 가독성 확보",
                 size_pt=8.8, color=C_TEXT_DARK)

    # =========================================================================
    # SLIDE 5: 공통 레이아웃 — 상단 헤더 & 우측 GNB 아코디언 드로어 (UI-COM-01)
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    apply_master_chrome(s5, "UI-COM-01", "공통 레이아웃 및 글로벌 네비게이션 (Header · GNB Drawer · Footer)", "Global Navigation & Common Layout", 5)

    # Left Panel: Wireframe Diagram (Width: 6.5 in)
    wf_x, wf_y, wf_w, wf_h = 0.4, 1.05, 6.45, 5.9
    add_rect(s5, Inches(wf_x), Inches(wf_y), Inches(wf_w), Inches(wf_h), fill_color=C_LIGHT_GRAY, border_color=C_BORDER_GRAY, border_pt=1.5)

    # 1. Top Header Bar inside wireframe
    add_rect(s5, Inches(wf_x), Inches(wf_y), Inches(wf_w), Inches(0.65), fill_color=C_DARK_BG)
    add_text_box(s5, wf_x + 0.15, wf_y + 0.14, 1.8, 0.38, "P&C CAPITAL\nPARTNERS", size_pt=8.5, bold=True, color=C_GOLD)
    add_badge(s5, wf_x + 0.05, wf_y + 0.05, "1")

    # Right utilities in header wireframe
    utils = [("검색", 0.7), ("오늘 본 펀드(0)", 1.05), ("사이트맵", 0.65), ("KOREAN", 0.65), ("MENU ≡", 0.75)]
    ux = wf_x + 2.55
    for u_idx, (u_text, u_w) in enumerate(utils):
        u_fill = C_GOLD if u_idx == 4 else C_CHARCOAL
        u_col = C_TEXT_DARK if u_idx == 4 else C_WHITE
        add_rect(s5, Inches(ux), Inches(wf_y + 0.12), Inches(u_w), Inches(0.4), fill_color=u_fill, border_color=C_BORDER_GRAY, border_pt=0.5)
        add_text_box(s5, ux, wf_y + 0.2, u_w, 0.25, u_text, size_pt=7.2, bold=True, color=u_col, align=PP_ALIGN.CENTER)
        ux += u_w + 0.03

    add_badge(s5, wf_x + 2.5, wf_y + 0.02, "2")
    add_badge(s5, wf_x + 3.3, wf_y + 0.02, "3")
    add_badge(s5, wf_x + 5.75, wf_y + 0.02, "4")

    # Popover preview: 오늘 본 펀드 레이어 (#fundTodayLayer)
    add_rect(s5, Inches(wf_x + 1.8), Inches(wf_y + 0.75), Inches(2.25), Inches(1.15), fill_color=C_WHITE, border_color=C_CHARCOAL, border_pt=1)
    add_rect(s5, Inches(wf_x + 1.8), Inches(wf_y + 0.75), Inches(2.25), Inches(0.32), fill_color=C_CHARCOAL)
    add_text_box(s5, wf_x + 1.88, wf_y + 0.78, 2.1, 0.25, "오늘 본 펀드 (0)                 ×", size_pt=8, bold=True, color=C_GOLD)
    add_text_box(s5, wf_x + 1.88, wf_y + 1.22, 2.1, 0.4, "오늘 본 펀드가 없습니다.", size_pt=8, color=C_TEXT_MUTED, align=PP_ALIGN.CENTER)

    # Right Slide-out GNB Accordion Drawer (#gnbMenuLayer, 300px)
    dr_x = wf_x + wf_w - 2.15
    add_rect(s5, Inches(dr_x), Inches(wf_y + 0.65), Inches(2.15), Inches(4.35), fill_color=RGBColor(0x11, 0x11, 0x11), border_color=C_GOLD, border_pt=1)
    add_text_box(s5, dr_x + 0.12, wf_y + 0.75, 1.9, 0.3, "P&C CAPITAL          ×", size_pt=8.5, bold=True, color=C_GOLD)
    add_badge(s5, dr_x - 0.14, wf_y + 0.75, "5")

    acc_data = [
        ("ESG", "−", ["· ESG 소개"], True),
        ("회사소개", "+", ["· P&C 소개 / 임원진 / 운용인력 / 규모"], False),
        ("투자정보", "+", ["· 운용철학 / 프로세스 / 가이드"], False),
        ("투자상품", "+", ["· 대표상품 / 펀드맵 / 연금 / 부동산"], False)
    ]
    ay = wf_y + 1.12
    for a_title, a_icon, a_subs, is_open in acc_data:
        add_rect(s5, Inches(dr_x + 0.08), Inches(ay), Inches(1.98), Inches(0.36), fill_color=C_CHARCOAL)
        add_text_box(s5, dr_x + 0.16, ay + 0.06, 1.8, 0.24, f"{a_title}                               {a_icon}", size_pt=8.5, bold=True, color=C_GOLD if is_open else C_WHITE)
        ay += 0.38
        for sub_line in a_subs:
            add_text_box(s5, dr_x + 0.18, ay, 1.85, 0.28, sub_line, size_pt=7.5, color=C_GOLD if is_open else RGBColor(0xAA, 0xAA, 0xAA))
            ay += 0.32

    add_rect(s5, Inches(dr_x + 0.08), Inches(wf_y + 4.35), Inches(1.98), Inches(0.52), fill_color=C_MAROON)
    add_text_box(s5, dr_x + 0.12, wf_y + 4.4, 1.9, 0.45, "※ '공지 & 공시' 카테고리 제외\n(총 4개 대분류 아코디언만 노출)", size_pt=7.5, bold=True, color=C_GOLD, align=PP_ALIGN.CENTER)

    # Bottom Footer Wireframe inside Left Panel
    add_rect(s5, Inches(wf_x), Inches(wf_y + 5.0), Inches(wf_w), Inches(0.9), fill_color=RGBColor(0xE9, 0xEA, 0xEC), border_color=C_BORDER_GRAY, border_pt=1)
    add_rect(s5, Inches(wf_x + 0.18), Inches(wf_y + 5.18), Inches(0.95), Inches(0.52), fill_color=C_CREAM, border_color=C_BORDER_GRAY, border_pt=1)
    add_text_box(s5, wf_x + 0.18, wf_y + 5.26, 0.95, 0.38, "P&C\nDARK LOGO", size_pt=7, bold=True, color=C_TEXT_DARK, align=PP_ALIGN.CENTER)
    add_text_box(s5, wf_x + 1.25, wf_y + 5.12, 5.0, 0.72,
                 "스튜어드십코드 | 보호금융상품등록부 | 금융감독원 | 금융투자협회 | 금융위원회 | 찾아오시는길 | 개인정보처리방침\n불법사금융피해신고센터(1332) | 금융사기예방 유의사항 | 금융고객 안전수칙 | 개인정보 유출 필수체크 10가지\n(우)03175 서울특별시 종로구 경희궁길 20 | T. 02.3787.3500 | Copyright © 2026 P&C CAPITAL PARTNERS",
                 size_pt=7, color=C_TEXT_MUTED)
    add_badge(s5, wf_x + 0.05, wf_y + 5.05, "6")

    # Right Panel: Functional Specification Table
    add_text_box(s5, 7.05, 1.05, 5.9, 0.3, "■ 화면 구성 및 인터랙션 상세 명세 (UI-COM-01)", size_pt=12.5, bold=True, color=C_MAROON)
    s5_rows = [
        ["번호", "구성요소 (ID/Class)", "동작 및 기능 상세 정의"],
        ["①", "브랜드 로고 (.brand-logo)", "• 첨부 사옥 이미지 기반 P&C 모노그램(& 골드 강조) + 워드마크\n• 클릭 시 메인 홈(#home)으로 즉시 라우팅"],
        ["②", "펀드 검색 (.schArea)", "• [검색] 버튼 클릭 시 .schArea에 .on 클래스 토글\n• 검색 입력창(#fundSearchAuto, 155px)이 우측에서 슬라이드 인(0.5s)"],
        ["③", "오늘 본 펀드 (#fundTodayLayer)", "• 클릭 시 하단에 380px 팝오버 레이어 토글 오픈\n• 다크 차콜 헤더(#292a2c) + 골드 타이틀 + 닫기(×) 버튼 동작"],
        ["④", "유틸리티 & MENU 버튼", "• [사이트맵]: #prod-fundmap 이동 / [KOREAN]: 호버 시 ENGLISH 드롭다운\n• [MENU]: 호버 시 골드 배경 전환, 클릭 시 우측 GNB 드로어 오픈"],
        ["⑤", "우측 GNB 드로어 (#gnbMenuLayer)", "• 우측 300px 슬라이드 인(translate3d, 0.45s) + 반투명 백드롭(#gnbBackdrop)\n• 단일 오픈(Single-Open) 아코디언: 클릭한 대분류만 펼쳐지고 골드(−) 표시\n• 요구사항 #5에 따라 '공지 & 공시' 제외, 4대 카테고리만 렌더링"],
        ["⑥", "공통 푸터 (#footer)", "• 좌측 다크 로고(assets/logo_dark.svg) + 우측 2단 정책/유관기관 링크 바\n• 개인정보처리방침 볼드 강조 및 금융감독원/금투협 외부 링크(새창)"]
    ]
    add_spec_table(s5, 7.05, 1.4, 5.9, s5_rows, [0.55, 1.75, 3.6])

    # =========================================================================
    # SLIDE 6: 메인 화면 설계 (UI-MAIN-01)
    # =========================================================================
    s6 = prs.slides.add_slide(blank_layout)
    apply_master_chrome(s6, "UI-MAIN-01", "메인 화면 상세 설계 (제미나이 배경 비디오 + 50:50 그리드 + 하단 분할 바)", "HOME (Main Landing Page)", 6)

    # Left Wireframe Panel
    add_rect(s6, Inches(wf_x), Inches(wf_y), Inches(wf_w), Inches(wf_h), fill_color=C_DARK_BG, border_color=C_BORDER_GRAY, border_pt=1.5)

    # Top transparent header bar
    add_rect(s6, Inches(wf_x), Inches(wf_y), Inches(wf_w), Inches(0.55), fill_color=RGBColor(0x1E, 0x20, 0x26), border_color=C_BORDER_GRAY, border_pt=0.5)
    add_text_box(s6, wf_x + 0.15, wf_y + 0.14, 6.1, 0.28, "P&C CAPITAL PARTNERS  (Transparent 80px Header)                       검색 | 오늘본펀드 | 사이트맵 | KOREAN | MENU", size_pt=7.5, bold=True, color=C_WHITE)

    # 50:50 Hero Split Area
    hero_y = wf_y + 0.55
    hero_h = 4.3
    half_w = wf_w / 2.0

    # Left 50%: Video Background + Brand Headline
    add_rect(s6, Inches(wf_x), Inches(hero_y), Inches(half_w), Inches(hero_h), fill_color=RGBColor(0x25, 0x28, 0x30), border_color=C_BORDER_GRAY, border_pt=0.75)
    add_badge(s6, wf_x + 0.12, hero_y + 0.12, "1")
    add_text_box(s6, wf_x + 0.2, hero_y + 0.5, half_w - 0.4, 1.1,
                 "[ Full-Screen Video Layer (#player) ]\n• Source: assets/main_bg.mp4 (제미나이 생성 영상)\n• Autoplay / Loop / Muted / Playsinline\n• 32% Dark Scrim (em) + Dot Grid Texture (i)",
                 size_pt=8, color=RGBColor(0xBB, 0xCC, 0xDD))

    # Left bottom brand headline box (.mainSlideBox)
    add_rect(s6, Inches(wf_x + 0.18), Inches(hero_y + 2.55), Inches(half_w - 0.36), Inches(1.55), fill_color=RGBColor(0x18, 0x1A, 0x20), border_color=C_GOLD, border_pt=1)
    add_badge(s6, wf_x + 0.25, hero_y + 2.62, "2")
    add_text_box(s6, wf_x + 0.3, hero_y + 2.9, half_w - 0.55, 1.15,
                 "P&C CAPITAL PARTNERS\n원칙을 지키는 투자,\n고객의 미래를 함께 설계합니다.\n일관된 운용철학과 깊이 있는 리서치로 장기 가치를 만듭니다.",
                 size_pt=8.2, bold=True, color=C_WHITE)

    # Right 50%: 3x2 Interactive Tile Grid (.mainLinks)
    tiles = [
        ("운용철학", "일관된 경영철학, 고객의 이익", "#info-philosophy", True),
        ("ESG", "ESG 철학과 비전", "#esg-intro", False),
        ("대표상품", "베스트셀러 펀드 라인업", "#prod-flagship", False),
        ("주식형펀드", "소수의 펀드로 장기 투자", "#prod-fundmap", False),
        ("ETF", "액티브 ETF로 초과수익 추구", "#prod-fundmap", False),
        ("해외펀드", "글로벌 리더와 함께 성장", "#prod-fundmap", False)
    ]
    tw = half_w / 2.0
    th = hero_h / 3.0
    for t_idx, (t_title, t_desc, t_hash, is_hover_sample) in enumerate(tiles):
        r = t_idx // 2
        c = t_idx % 2
        tx = wf_x + half_w + c * tw
        ty = hero_y + r * th
        t_fill = C_MAROON if is_hover_sample else RGBColor(0x2D, 0x31, 0x3B)
        t_border = C_GOLD if is_hover_sample else C_BORDER_GRAY
        add_rect(s6, Inches(tx), Inches(ty), Inches(tw), Inches(th), fill_color=t_fill, border_color=t_border, border_pt=1 if is_hover_sample else 0.5)
        add_text_box(s6, tx + 0.12, ty + 0.15, tw - 0.24, 0.3, t_title + (" (Hover 상태)" if is_hover_sample else ""), size_pt=9.5, bold=True, color=C_GOLD if is_hover_sample else C_WHITE)
        add_text_box(s6, tx + 0.12, ty + 0.48, tw - 0.24, 0.45, f"{t_desc}\n→ {t_hash}", size_pt=7.5, color=RGBColor(0xDD, 0xDD, 0xDD))
        # '+' button box
        plus_box = add_rect(s6, Inches(tx + 0.12), Inches(ty + th - 0.36), Inches(0.24), Inches(0.24), fill_color=C_GOLD if is_hover_sample else None, border_color=C_GOLD if is_hover_sample else C_WHITE, border_pt=1)
        add_text_box(s6, tx + 0.12, ty + th - 0.36, 0.24, 0.24, "+", size_pt=8.5, bold=True, color=C_TEXT_DARK if is_hover_sample else C_WHITE, align=PP_ALIGN.CENTER)

    add_badge(s6, wf_x + half_w + 0.08, hero_y + 0.08, "3")

    # Lower 121px Split Band (.mainContents)
    band_y = hero_y + hero_h
    band_h = 1.05
    # Left 50% Maroon (.bbsInfo)
    add_rect(s6, Inches(wf_x), Inches(band_y), Inches(half_w), Inches(band_h), fill_color=C_MAROON, border_color=C_BORDER_GRAY, border_pt=0.5)
    add_badge(s6, wf_x + 0.08, band_y + 0.08, "4")
    add_text_box(s6, wf_x + 0.42, band_y + 0.1, half_w - 0.5, 0.4, "[대표상품] P&C 책임투자 · 액티브 가치 핵심 라인업   VIEW MORE +", size_pt=7.5, bold=True, color=C_WHITE)
    add_rect(s6, Inches(wf_x), Inches(band_y + 0.52), Inches(half_w), Inches(0.01), fill_color=C_BORDER_GRAY)
    add_text_box(s6, wf_x + 0.42, band_y + 0.58, half_w - 0.5, 0.4, "[운용현황] 총 운용자산(AUM) 28조 9,296억 원 달성   VIEW MORE +", size_pt=7.5, bold=True, color=C_WHITE)

    # Right 50% Charcoal (.otherInfo)
    add_rect(s6, Inches(wf_x + half_w), Inches(band_y), Inches(half_w), Inches(band_h), fill_color=C_CHARCOAL, border_color=C_BORDER_GRAY, border_pt=0.5)
    add_badge(s6, wf_x + half_w + 0.08, band_y + 0.08, "5")
    add_text_box(s6, wf_x + half_w + 0.42, band_y + 0.1, half_w - 0.5, 0.4, "총 운용규모(AUM): 289,296 억 원   |   주식형 비중: 49.72% ▲ Core Active", size_pt=7.5, bold=True, color=C_GOLD)
    add_rect(s6, Inches(wf_x + half_w), Inches(band_y + 0.52), Inches(half_w), Inches(0.01), fill_color=C_BORDER_GRAY)
    add_text_box(s6, wf_x + half_w + 0.42, band_y + 0.58, half_w - 0.5, 0.4, "채권형 비중: 43.59%              |   혼합 및 대체투자: 6.69% ▲ Balanced", size_pt=7.5, bold=True, color=C_WHITE)

    # Right Panel: Functional Specification Table
    add_text_box(s6, 7.05, 1.05, 5.9, 0.3, "■ 메인 화면 구성 및 모션 상세 명세 (UI-MAIN-01)", size_pt=12.5, bold=True, color=C_MAROON)
    s6_rows = [
        ["번호", "영역명 (Selector)", "레이아웃 규격 및 인터랙션 정의"],
        ["①", "제미나이 배경 비디오\n(#player / #heroBgVideo)", "• 뷰포트 높이 calc(100vh - 121px), 최소 높이 710px 풀스크린 배치\n• 제미나이 생성 비디오(assets/main_bg.mp4) object-fit: cover 자동 반복 재생\n• 상단 32% 블랙 스크림(em) 및 4px 도트 그리드(i) 오버레이로 텍스트 가독성 확보"],
        ["②", "좌측 50% 브랜드 영역\n(.mainSlide / .mainSlideBox)", "• 좌측 50%는 비디오가 시원하게 보이도록 개방하고 하단에 브랜드 슬로건 배치\n• 우측 경계선에 1px solid rgba(255,255,255,0.2) 헤어라인 디바이더 적용"],
        ["③", "우측 50% 6대 핵심 타일\n(.mainLinks / .mainLinkTile)", "• 3행 × 2열 균등 분할 그리드 (운용철학, ESG, 대표상품, 주식형펀드, ETF, 해외펀드)\n• 마우스 호버 시: ① 타일별 고유 그라데이션 배경(i.tileBg) 0.85s 페이드인 & 스케일 안정화\n  ② 텍스트 박스(.tileContent)가 bottom: -36px → 28px로 슬라이드 업\n  ③ 하단 29×29px '+' 버튼이 골드(#ffb932) 배경으로 하이라이트\n• 클릭 시 해당 세부 카테고리 화면으로 즉시 라우팅"],
        ["④", "하단 좌측 하이라이트 바\n(.bbsInfo, 높이 121px)", "• 배경색 Deep Maroon(#631c2a), 60px × 2행 스택 구조\n• 1행 클릭 시 [대표상품(#prod-flagship)], 2행 클릭 시 [운용규모(#about-aum)] 이동"],
        ["⑤", "하단 우측 운용지표 바\n(.otherInfo, 높이 121px)", "• 배경색 Dark Charcoal(#292a2c), 60px × 2행 스택 구조\n• 총 운용규모(289,296억 원) 및 주식형(49.72%)/채권형(43.59%)/대체(6.69%) 핵심 지표 노출"]
    ]
    add_spec_table(s6, 7.05, 1.4, 5.9, s6_rows, [0.55, 1.85, 3.5])

    # =========================================================================
    # SLIDE 7: 서브 페이지 공통 상단 배너 & 브레드크럼 + ESG 화면 (UI-SUB-01)
    # =========================================================================
    s7 = prs.slides.add_slide(blank_layout)
    apply_master_chrome(s7, "UI-SUB-01", "카테고리 공통 상단 구조 (사옥 배너 + 브레드크럼) & ESG 소개 설계", "ESG > ESG 소개 (#esg-intro)", 7)

    # Left Wireframe Panel
    add_rect(s7, Inches(wf_x), Inches(wf_y), Inches(wf_w), Inches(wf_h), fill_color=C_WHITE, border_color=C_BORDER_GRAY, border_pt=1.5)

    # 1. 380px Top Banner with attached building photo
    if os.path.exists(img_sub_banner):
        # Crop/fit banner strip at top of wireframe
        s7.shapes.add_picture(img_sub_banner, Inches(wf_x), Inches(wf_y), width=Inches(wf_w), height=Inches(1.65))
    else:
        add_rect(s7, Inches(wf_x), Inches(wf_y), Inches(wf_w), Inches(1.65), fill_color=C_DARK_BG)

    # Semi-transparent dark caption box over banner image
    add_rect(s7, Inches(wf_x + 0.2), Inches(wf_y + 0.45), Inches(3.9), Inches(1.05), fill_color=RGBColor(0x14, 0x15, 0x19), border_color=C_GOLD, border_pt=0.75)
    add_text_box(s7, wf_x + 0.3, wf_y + 0.5, 3.7, 0.95,
                 "ESG / P&C CAPITAL PARTNERS\nESG 소개\n지속가능한 미래와 장기적 기업가치 제고를 위한 책임투자",
                 size_pt=8, bold=True, color=C_WHITE)
    add_badge(s7, wf_x + 0.08, wf_y + 0.08, "1")

    # 2. 60px Sticky Breadcrumb Bar (#navigation)
    nav_y = wf_y + 1.65
    add_rect(s7, Inches(wf_x), Inches(nav_y), Inches(wf_w), Inches(0.45), fill_color=C_CHARCOAL)
    add_rect(s7, Inches(wf_x + 0.15), Inches(nav_y), Inches(0.55), Inches(0.45), fill_color=C_MAROON)
    add_text_box(s7, wf_x + 0.15, nav_y + 0.1, 0.55, 0.25, "P&C", size_pt=8, bold=True, color=C_GOLD, align=PP_ALIGN.CENTER)
    add_rect(s7, Inches(wf_x + 0.7), Inches(nav_y), Inches(1.4), Inches(0.45), fill_color=C_CHARCOAL, border_color=C_BORDER_GRAY, border_pt=0.5)
    add_text_box(s7, wf_x + 0.8, nav_y + 0.1, 1.2, 0.25, "ESG                ▾", size_pt=8, color=C_WHITE)
    add_rect(s7, Inches(wf_x + 2.1), Inches(nav_y), Inches(1.5), Inches(0.45), fill_color=C_CHARCOAL, border_color=C_BORDER_GRAY, border_pt=0.5)
    add_text_box(s7, wf_x + 2.2, nav_y + 0.1, 1.3, 0.25, "ESG 소개          ▾", size_pt=8, bold=True, color=C_GOLD)
    add_badge(s7, wf_x + 3.7, nav_y + 0.08, "2")

    # 3. Sub Content Area (#subContents)
    add_text_box(s7, wf_x + 0.3, nav_y + 0.55, wf_w - 0.6, 0.45, "ESG STEWARDSHIP\nESG 소개", size_pt=9.5, bold=True, color=C_TEXT_DARK, align=PP_ALIGN.CENTER)
    add_rect(s7, Inches(wf_x + 0.45), Inches(nav_y + 1.05), Inches(wf_w - 0.9), Inches(0.55), fill_color=C_CREAM, border_color=C_CREAM_BORDER, border_pt=1)
    add_text_box(s7, wf_x + 0.5, nav_y + 1.1, wf_w - 1.0, 0.45, "“투자를 통해 더 나은 세상을 그리겠습니다.”\n재무적 성과와 비재무적 ESG 요소를 통합 분석하여 지속가능한 수익을 추구합니다.", size_pt=7.5, bold=True, color=C_CRIMSON, align=PP_ALIGN.CENTER)
    add_badge(s7, wf_x + 0.2, nav_y + 0.95, "3")

    # E / S / G 3 Pillar Cards
    pillars = [("E", "Environment (환경)", "기후변화 대응, 탄소저감,\n친환경 에너지 전환 평가"),
               ("S", "Social (사회적 책임)", "인권 존중, 산업안전,\n공급망 및 지역사회 상생"),
               ("G", "Governance (지배구조)", "이사회 독립성, 주주권익,\n투명한 배당 및 윤리경영")]
    pw = (wf_w - 0.9 - 0.3) / 3.0
    for p_idx, (p_char, p_title, p_desc) in enumerate(pillars):
        px = wf_x + 0.45 + p_idx * (pw + 0.15)
        py = nav_y + 1.72
        add_rect(s7, Inches(px), Inches(py), Inches(pw), Inches(1.22), fill_color=C_WHITE, border_color=C_CREAM_BORDER, border_pt=1)
        oval = s7.shapes.add_shape(MSO_SHAPE.OVAL, Inches(px + pw/2 - 0.18), Inches(py + 0.08), Inches(0.36), Inches(0.36))
        oval.fill.solid()
        oval.fill.fore_color.rgb = C_MAROON
        oval.line.fill.background()
        add_text_box(s7, px + pw/2 - 0.18, py + 0.12, 0.36, 0.28, p_char, size_pt=9, bold=True, color=C_GOLD, align=PP_ALIGN.CENTER)
        add_text_box(s7, px + 0.06, py + 0.48, pw - 0.12, 0.25, p_title, size_pt=7.8, bold=True, color=C_TEXT_DARK, align=PP_ALIGN.CENTER)
        add_text_box(s7, px + 0.06, py + 0.72, pw - 0.12, 0.45, p_desc, size_pt=6.8, color=C_TEXT_MUTED, align=PP_ALIGN.CENTER)
    add_badge(s7, wf_x + 0.2, nav_y + 1.72, "4")

    # ESG Committee Box & Pre-footer Notice
    add_rect(s7, Inches(wf_x + 0.45), Inches(nav_y + 3.04), Inches(wf_w - 0.9), Inches(0.55), fill_color=C_CREAM, border_color=C_CREAM_BORDER, border_pt=1)
    add_text_box(s7, wf_x + 0.55, nav_y + 3.08, wf_w - 1.1, 0.48, "ESG 운용위원회 및 스튜어드십 코드 이행 : 자체 ESG 평가 모델 + 적극적 주주관여(Engagement)", size_pt=7.3, bold=True, color=C_TEXT_DARK)
    add_rect(s7, Inches(wf_x), Inches(nav_y + 3.7), Inches(wf_w), Inches(0.55), fill_color=C_CREAM, border_color=C_CREAM_BORDER, border_pt=1)
    add_text_box(s7, wf_x + 0.2, nav_y + 3.74, wf_w - 0.4, 0.48, "[투자 전에 확인하세요!] 집합투자증권 취득 전 투자설명서 필독 및 원금손실(0~100%) 유의사항 고지", size_pt=7, color=C_CRIMSON)
    add_badge(s7, wf_x + 0.08, nav_y + 3.65, "5")

    # Right Panel: Functional Specification Table
    add_text_box(s7, 7.05, 1.05, 5.9, 0.3, "■ 서브 공통 헤더 & ESG 화면 설계 명세 (UI-SUB-01)", size_pt=12.5, bold=True, color=C_MAROON)
    s7_rows = [
        ["번호", "구성요소 (Selector)", "상세 설계 및 동적 바인딩 규칙"],
        ["①", "카테고리 상단 사옥 배너\n(body.is-sub #header)", "• 높이 380px 고정, 모든 카테고리 진입 시 첨부 사옥 이미지(assets/sub_banner_bg.jpg) 노출\n• 상단 80px 영역에 투명 유틸리티 바(.headerLine) 오버레이 배치\n• 좌측 하단에 카테고리 영문명(#bannerCatEn), 현재 메뉴명(#bannerTitle), 슬로건(#bannerDesc) 동적 출력"],
        ["②", "브레드크럼 네비게이션 바\n(#navigation, 높이 60px)", "• 배경색 Dark Charcoal(#292a2c), 스크롤 시 상단 고정(position: sticky; top: 0)\n• 좌측 마룬(#631c2a) 홈 버튼[P&C] 클릭 시 메인 화면(#home) 복귀\n• Depth 1(대분류 4종) 및 Depth 2(소분류) 호버 시 드롭다운 리스트 노출 및 페이지 즉시 전환"],
        ["③", "서브 타이틀 & 핵심 인용구\n(.subPageHeader / .subPullQuote)", "• 영문 서브라벨(Cinzel 13px, Crimson #9e1227) + 국문 H2 타이틀(34px)\n• 크림 박스(#fbfaf6, 테두리 #e3dccd) 내부에 핵심 철학 슬로건 강조 배치"],
        ["④", "E·S·G 3대 핵심 영역 카드\n(.esgPillars / .esgCard)", "• 3열 그리드(grid-template-columns: repeat(3, 1fr), 간격 28px)\n• 상단 84×84px 마룬 원형 배지(.esgCircle) 내부에 골드 세리프 E, S, G 이니셜 배치\n• 카드 호버 시 translateY(-4px) 부양 모션 및 그림자 효과"],
        ["⑤", "ESG 운용위원회 & 투자유의\n(.creamBox / .preFooterNotice)", "• 하단 크림 콜아웃 박스에 ESG 운용위원회 및 스튜어드십 코드 이행 내역 기술\n• 모든 서브 페이지 하단(푸터 직전)에 법정 필수 투자유의사항 4개 항목 상시 노출"]
    ]
    add_spec_table(s7, 7.05, 1.4, 5.9, s7_rows, [0.55, 1.85, 3.5])

    # =========================================================================
    # SLIDE 8: 회사소개 카테고리 4개 화면 상세 설계 (UI-SUB-02)
    # =========================================================================
    s8 = prs.slides.add_slide(blank_layout)
    apply_master_chrome(s8, "UI-SUB-02", "회사소개 카테고리 화면 설계 (P&C 소개 · 임원진 · 주요운용인력 · 운용규모)", "회사소개 > 4개 하위 화면 (#about-*)", 8)

    # Top-left: Actual Live Rendered Screenshot of #about-pnc
    add_rect(s8, Inches(0.4), Inches(1.05), Inches(6.45), Inches(2.95), fill_color=C_CREAM, border_color=C_BORDER_GRAY, border_pt=1)
    if os.path.exists(img_live_capture):
        s8.shapes.add_picture(img_live_capture, Inches(0.45), Inches(1.1), height=Inches(2.85))
    add_badge(s8, 0.48, 1.12, "A")
    add_text_box(s8, 4.35, 1.15, 2.4, 2.75,
                 "◀ 실제 구현 화면 캡처\n   (#about-pnc : P&C 소개)\n\n• 상단 380px 사옥 배너 이미지\n• 60px 다크 차콜 브레드크럼\n  (P&C | 회사소개 ▾ | P&C 소개 ▾)\n• CORPORATE OVERVIEW 헤딩\n• 인용구 박스 & 기업 개요 테이블",
                 size_pt=8.5, bold=True, color=C_MAROON)

    # Bottom-left: Wireframe Mini-Cards for the other 3 sub-pages in 회사소개
    sub_cards = [
        ("B", "임원진 소개 (#about-exec)", "3열 프로필 카드 (.execGrid)",
         "• 신진호 대표이사/회장 (경력 28년)\n• 신정희 대표이사/사장 (CIO, 25년)\n• 백송호 전무이사/부문대표 (22년)\n• 마룬 직책 배지(.execRole) + 약력 리스트"),
        ("C", "주요운용인력 (#about-managers)", "핵심 매니저 데이터 테이블 (.dataTable)",
         "• 오남훈 본부장 (주식운용 1본부)\n• 김현중 본부장 (주식운용 2본부)\n• 이천주 본부장 (채권운용본부)\n• 기민수 팀장(글로벌) / 김찬교 팀장(연금)"),
        ("D", "운용규모 (#about-aum)", "총 AUM 28조 9,296억 원 포트폴리오",
         "• 주식형: 143,838억 원 (49.72%)\n• 채권형: 126,104억 원 (43.59%)\n• 혼합자산: 11,196억 / 부동산: 4,310억\n• 창립 이래 연속 흑자 경영 콜아웃 박스")
    ]
    sc_w = 2.05
    for idx, (b_char, sc_title, sc_sub, sc_body) in enumerate(sub_cards):
        sx = 0.4 + idx * (sc_w + 0.15)
        add_rect(s8, Inches(sx), Inches(4.15), Inches(sc_w), Inches(2.8), fill_color=C_CREAM, border_color=C_CREAM_BORDER, border_pt=1)
        add_rect(s8, Inches(sx), Inches(4.15), Inches(sc_w), Inches(0.38), fill_color=C_MAROON)
        add_badge(s8, sx + 0.06, 4.19, b_char, fill_color=C_GOLD, text_color=C_TEXT_DARK, size=0.26)
        add_text_box(s8, sx + 0.36, 4.2, sc_w - 0.4, 0.28, sc_title, size_pt=8.2, bold=True, color=C_WHITE)
        add_text_box(s8, sx + 0.1, 4.6, sc_w - 0.2, 0.28, sc_sub, size_pt=8, bold=True, color=C_CRIMSON)
        add_text_box(s8, sx + 0.1, 4.92, sc_w - 0.2, 1.95, sc_body, size_pt=7.8, color=C_TEXT_DARK)

    # Right Panel: Specification Table
    add_text_box(s8, 7.05, 1.05, 5.9, 0.3, "■ 회사소개 카테고리 화면별 상세 명세 (UI-SUB-02)", size_pt=12.5, bold=True, color=C_MAROON)
    s8_rows = [
        ["구분", "화면명 (Route ID)", "UI 컴포넌트 및 콘텐츠 구성 명세"],
        ["A", "P&C 소개\n(#about-pnc)", "• 상단 배너 영문 라벨: about P&C CAPITAL PARTNERS / 타이틀: P&C 소개\n• 기업 철학 콜아웃 박스(.creamBox) + 기업 현황 요약 테이블(.dataTable)\n• 회사명, 주요 사업영역(집합투자·일임·자문), AUM 규모, 핵심 경쟁력 명시"],
        ["B", "임원진 소개\n(#about-exec)", "• 3열 그리드(.execGrid) 기반 경영진 프로필 카드(.execCard)\n• 각 카드 상단에 마룬 배경 직책 태그(.execRole), 성명(H3 22px), 학력 및 주요 경력 불릿 리스트 배치"],
        ["C", "주요운용인력\n(#about-managers)", "• 팀 어프로치 기반 5대 핵심 본부장/팀장 요약 테이블(.dataTable)\n• 컬럼 구성: [성명/직책] | [담당 부문] | [주요 약력 및 대표 운용펀드]\n• 상단 2px 마룬 보더 및 크림색(#fbfaf6) 헤더 셀 스타일 적용"],
        ["D", "운용규모\n(#about-aum)", "• 총 운용자산 28조 9,296억 원의 자산군별 상세 금액(억 원) 및 비중(%) 테이블\n• 하단에 재무안정성 및 창립 이래 무적자 연속 흑자 경영 성과 안내 박스 배치"]
    ]
    add_spec_table(s8, 7.05, 1.4, 5.9, s8_rows, [0.55, 1.65, 3.7])

    # =========================================================================
    # SLIDE 9: 투자정보 카테고리 3개 화면 상세 설계 (UI-SUB-03)
    # =========================================================================
    s9 = prs.slides.add_slide(blank_layout)
    apply_master_chrome(s9, "UI-SUB-03", "투자정보 카테고리 화면 설계 (운용철학 · 운용프로세스 · 투자가이드)", "투자정보 > 3개 하위 화면 (#info-*)", 9)

    # Left Wireframe Panel showing the 3 sub-screens stacked clearly
    add_rect(s9, Inches(wf_x), Inches(wf_y), Inches(wf_w), Inches(wf_h), fill_color=C_LIGHT_GRAY, border_color=C_BORDER_GRAY, border_pt=1.5)

    # Section A: 운용철학 (#info-philosophy)
    add_rect(s9, Inches(wf_x + 0.15), Inches(wf_y + 0.12), Inches(wf_w - 0.3), Inches(2.15), fill_color=C_WHITE, border_color=C_CREAM_BORDER, border_pt=1)
    add_badge(s9, wf_x + 0.22, wf_y + 0.18, "A")
    add_text_box(s9, wf_x + 0.55, wf_y + 0.18, 5.5, 0.28, "운용철학 (#info-philosophy) — 5대 핵심 운용 원칙 (.philosophyGrid)", size_pt=9.5, bold=True, color=C_MAROON)

    phil_boxes = [
        ("01", "기본에 충실한 운용", "내재가치·현금흐름 펀더멘털 분석"),
        ("02", "원칙을 중시하는 운용", "투자 프로세스·컴플라이언스 준수"),
        ("03", "유형별 소수펀드 장기운용", "핵심 대표 펀드 역량 집중·장기 복리"),
        ("04", "합리적 의사결정 (Team)", "애널리스트·매니저 집단지성 협업")
    ]
    for p_idx, (p_num, p_t, p_d) in enumerate(phil_boxes):
        r = p_idx // 2
        c = p_idx % 2
        px = wf_x + 0.3 + c * 2.98
        py = wf_y + 0.52 + r * 0.56
        add_rect(s9, Inches(px), Inches(py), Inches(2.85), Inches(0.5), fill_color=C_CREAM, border_color=C_CREAM_BORDER, border_pt=1)
        add_text_box(s9, px + 0.08, py + 0.06, 2.7, 0.4, f"[{p_num}] {p_t} : {p_d}", size_pt=7.5, bold=True, color=C_TEXT_DARK)

    # 05 Full width bar
    add_rect(s9, Inches(wf_x + 0.3), Inches(wf_y + 1.66), Inches(5.83), Inches(0.48), fill_color=C_CREAM, border_color=C_CRIMSON, border_pt=1)
    add_text_box(s9, wf_x + 0.38, wf_y + 1.74, 5.65, 0.34, "[05] 철저한 위험관리 (Full-Width Card) : 독립된 리스크관리실의 포트폴리오 변동성 및 한도 실시간 통제", size_pt=7.8, bold=True, color=C_CRIMSON)

    # Section B: 운용프로세스 (#info-process)
    add_rect(s9, Inches(wf_x + 0.15), Inches(wf_y + 2.38), Inches(wf_w - 0.3), Inches(1.65), fill_color=C_WHITE, border_color=C_CREAM_BORDER, border_pt=1)
    add_badge(s9, wf_x + 0.22, wf_y + 2.44, "B")
    add_text_box(s9, wf_x + 0.55, wf_y + 2.44, 5.5, 0.28, "운용프로세스 (#info-process) — Bottom-Up & Top-Down 3단계 검증 플로우", size_pt=9.5, bold=True, color=C_MAROON)

    steps = [("STEP 01", "투자 유니버스 구성", "재무안정성·유동성·ESG 등급 1차 선별"),
             ("STEP 02", "모델 포트폴리오(MP)", "기업탐방·밸류에이션 투자위원회 확정"),
             ("STEP 03", "실제 포트폴리오 & 위험관리", "펀드 약관 맞춤 편입 및 리스크 상시 점검")]
    for s_idx, (st_no, st_t, st_d) in enumerate(steps):
        sx = wf_x + 0.3 + s_idx * 1.98
        add_rect(s9, Inches(sx), Inches(wf_y + 2.82), Inches(1.85), Inches(1.05), fill_color=C_CREAM, border_color=C_MAROON, border_pt=1)
        add_text_box(s9, sx + 0.08, wf_y + 2.88, 1.7, 0.24, st_no, size_pt=8, bold=True, color=C_CRIMSON, align=PP_ALIGN.CENTER)
        add_text_box(s9, sx + 0.08, wf_y + 3.12, 1.7, 0.26, st_t, size_pt=8, bold=True, color=C_TEXT_DARK, align=PP_ALIGN.CENTER)
        add_text_box(s9, sx + 0.08, wf_y + 3.4, 1.7, 0.42, st_d, size_pt=7, color=C_TEXT_MUTED, align=PP_ALIGN.CENTER)

    # Section C: 투자가이드 (#info-guide)
    add_rect(s9, Inches(wf_x + 0.15), Inches(wf_y + 4.15), Inches(wf_w - 0.3), Inches(1.62), fill_color=C_WHITE, border_color=C_CREAM_BORDER, border_pt=1)
    add_badge(s9, wf_x + 0.22, wf_y + 4.21, "C")
    add_text_box(s9, wf_x + 0.55, wf_y + 4.21, 5.5, 0.28, "투자가이드 (#info-guide) — 투자성향 및 펀드 유형별 비교 매트릭스", size_pt=9.5, bold=True, color=C_MAROON)
    add_rect(s9, Inches(wf_x + 0.3), Inches(wf_y + 4.55), Inches(5.83), Inches(1.08), fill_color=C_CREAM, border_color=C_CREAM_BORDER, border_pt=1)
    add_text_box(s9, wf_x + 0.4, wf_y + 4.62, 5.6, 0.95,
                 "• 주식형 펀드 : 자산 60% 이상 국내외 우량 주식 투자 (적극투자형 고객)\n• 채권형 펀드 : 국공채 및 우량 회사채 중심 안정적 이자수익 확보 (안정추구형 고객)\n• 혼합형 / TDF : 주식·채권 비중 탄력 조절 및 은퇴 시점 맞춤 자산배분 (균형투자형 고객)",
                 size_pt=7.8, color=C_TEXT_DARK)

    # Right Panel: Specification Table
    add_text_box(s9, 7.05, 1.05, 5.9, 0.3, "■ 투자정보 카테고리 화면별 상세 명세 (UI-SUB-03)", size_pt=12.5, bold=True, color=C_MAROON)
    s9_rows = [
        ["구분", "화면명 (Route ID)", "UI 컴포넌트 및 설계 상세 정의"],
        ["공통", "투자정보 상단 배너", "• 영문 헤더: P&C CAPITAL philosophy\n• 서브 슬로건: 흔들리지 않는 운용철학과 체계적인 리스크 관리 프로세스\n• 상단 380px 배경: 첨부 사옥 이미지(assets/sub_banner_bg.jpg) 동일 적용"],
        ["A", "운용철학\n(#info-philosophy)", "• 2열 카드 그리드(.philosophyGrid) + 5번째 카드 전체 폭(grid-column: 1 / -1) 배치\n• 각 카드 좌측에 54×54px 원형 넘버링 배지(.philNum, 01~05) 및 우측 설명 텍스트 배치\n• 메인 화면 우측 첫 번째 타일[운용철학] 클릭 시 본 화면으로 직접 연결"],
        ["B", "운용프로세스\n(#info-process)", "• Bottom-Up 리서치와 Top-Down 거시분석을 결합한 3단계 포트폴리오 구축 프로세스\n• 01 투자 유니버스 구성 → 02 모델 포트폴리오(MP) → 03 실제 포트폴리오 & 위험관리 3열 카드"],
        ["C", "투자가이드\n(#info-guide)", "• 펀드 유형별(주식형 / 채권형 / 혼합형·TDF) 투자 대상, 특징, 적합한 투자자 비교 테이블\n• 푸터의 [보호금융상품등록부], [금융사기예방 유의사항] 등 안내 링크와 연동"]
    ]
    add_spec_table(s9, 7.05, 1.4, 5.9, s9_rows, [0.55, 1.65, 3.7])

    # =========================================================================
    # SLIDE 10: 투자상품 카테고리 5개 화면 상세 설계 (UI-SUB-04)
    # =========================================================================
    s10 = prs.slides.add_slide(blank_layout)
    apply_master_chrome(s10, "UI-SUB-04", "투자상품 카테고리 화면 설계 (대표상품 · 펀드맵 · 연금저축 · 퇴직연금 · 부동산)", "투자상품 > 5개 하위 화면 (#prod-*)", 10)

    # Left Wireframe Panel
    add_rect(s10, Inches(wf_x), Inches(wf_y), Inches(wf_w), Inches(wf_h), fill_color=C_LIGHT_GRAY, border_color=C_BORDER_GRAY, border_pt=1.5)

    # Section A: 대표상품 3x3 Grid (#prod-flagship)
    add_rect(s10, Inches(wf_x + 0.15), Inches(wf_y + 0.12), Inches(wf_w - 0.3), Inches(3.25), fill_color=C_WHITE, border_color=C_CREAM_BORDER, border_pt=1)
    add_badge(s10, wf_x + 0.22, wf_y + 0.18, "A")
    add_text_box(s10, wf_x + 0.55, wf_y + 0.18, 5.5, 0.28, "대표상품 (#prod-flagship) — 9대 베스트셀러 펀드 3×3 카드 그리드 (.productGrid)", size_pt=9.2, bold=True, color=C_MAROON)

    funds_9 = [
        ("국내주식 · ESG", "P&C 책임투자 증권펀드"),
        ("국내주식 · 액티브", "P&C 액티브 가치 증권펀드"),
        ("국내주식 · 중위험", "P&C 거북이 증권펀드"),
        ("해외주식 · 아시아", "P&C 아시아 리더스 성장주"),
        ("해외주식 · 글로벌", "P&C 글로벌 리더스 성장주"),
        ("해외주식 · 인컴", "P&C 글로벌 배당 인컴"),
        ("연금 · 자산배분", "P&C 기본 TDF 시리즈"),
        ("국내채권 · 우량채", "P&C 우량채권 증권펀드"),
        ("채권혼합 · 공모주", "P&C 하이일드 공모주 알파")
    ]
    fw = 1.88
    fh = 0.82
    for f_idx, (f_tag, f_name) in enumerate(funds_9):
        r = f_idx // 3
        c = f_idx % 3
        fx = wf_x + 0.28 + c * (fw + 0.12)
        fy = wf_y + 0.52 + r * (fh + 0.1)
        add_rect(s10, Inches(fx), Inches(fy), Inches(fw), Inches(fh), fill_color=C_CREAM, border_color=C_CRIMSON if f_idx == 0 else C_CREAM_BORDER, border_pt=1)
        add_text_box(s10, fx + 0.08, fy + 0.05, fw - 0.16, 0.2, f_tag, size_pt=6.8, bold=True, color=C_CRIMSON)
        add_text_box(s10, fx + 0.08, fy + 0.25, fw - 0.16, 0.28, f_name, size_pt=7.5, bold=True, color=C_TEXT_DARK)
        add_text_box(s10, fx + 0.08, fy + 0.54, fw - 0.16, 0.2, "자세히 보기 +", size_pt=6.8, color=C_TEXT_MUTED)

    # Bottom 2x2 grid for remaining 4 screens in 투자상품
    rem_screens = [
        ("B", "펀드맵 (#prod-fundmap)", "5대 투자유형별 라인업 매트릭스 테이블\n(국내주식 / 액티브ETF / 해외주식 / 채권 / TDF)"),
        ("C", "연금저축펀드 (#prod-pension)", "01 세액공제 혜택  |  02 과세이연·복리효과\n03 자유로운 포트폴리오 리밸런싱 (3열 카드)"),
        ("D", "퇴직연금펀드 (#prod-retirement)", "장기 안정성 중심 퇴직연금 운용 차별점 및\n확정급여형(DB) · 확정기여형(DC)/IRP 추천 상품 표"),
        ("E", "부동산펀드 (#prod-realestate)", "우량 실물자산 대체투자 솔루션 2열 그리드\n[A] Core & Core-Plus 선별  |  [B] Value-Add 전략")
    ]
    rw = 2.98
    rh = 1.12
    for r_idx, (r_badge, r_title, r_desc) in enumerate(rem_screens):
        rr = r_idx // 2
        rc = r_idx % 2
        rx = wf_x + 0.15 + rc * (rw + 0.18)
        ry = wf_y + 3.48 + rr * (rh + 0.12)
        add_rect(s10, Inches(rx), Inches(ry), Inches(rw), Inches(rh), fill_color=C_WHITE, border_color=C_CREAM_BORDER, border_pt=1)
        add_badge(s10, rx + 0.08, ry + 0.08, r_badge)
        add_text_box(s10, rx + 0.42, ry + 0.08, rw - 0.5, 0.26, r_title, size_pt=8.5, bold=True, color=C_MAROON)
        add_text_box(s10, rx + 0.12, ry + 0.42, rw - 0.24, 0.65, r_desc, size_pt=7.5, color=C_TEXT_DARK)

    # Right Panel: Specification Table
    add_text_box(s10, 7.05, 1.05, 5.9, 0.3, "■ 투자상품 카테고리 화면별 상세 명세 (UI-SUB-04)", size_pt=12.5, bold=True, color=C_MAROON)
    s10_rows = [
        ["구분", "화면명 (Route ID)", "UI 컴포넌트 및 연결 동선 명세"],
        ["A", "대표상품\n(#prod-flagship)", "• 3열 × 3행 카드 그리드(.productGrid)로 9대 플래그십 펀드 노출\n• 카드 구성: 상단 유형 태그(.productTag) + 펀드명(H3) + 핵심 전략 요약 + [자세히 보기 +]\n• 호버 시 테두리가 크림슨(#9e1227)으로 전환되며 그림자 강조\n• 메인 우측 3번째 타일[대표상품] 및 하단 마룬 바 1행 클릭 시 본 화면으로 연결"],
        ["B", "펀드맵\n(#prod-fundmap)", "• 국내주식형, 액티브 ETF, 해외주식형, 채권/혼합형, 연금/TDF 5대 유형별 스타일 및 대표 상품 매핑 테이블\n• 메인 우측 [주식형펀드], [ETF], [해외펀드] 타일 및 상단 [사이트맵] 클릭 시 연결"],
        ["C", "연금저축펀드\n(#prod-pension)", "• 연금저축계좌의 3대 핵심 혜택(세액공제, 과세이연 복리효과, 자유로운 포트폴리오 전환) 3열 원형 배지 카드(.esgPillars) 구성"],
        ["D", "퇴직연금펀드\n(#prod-retirement)", "• P&C 퇴직연금 운용 차별점 콜아웃 박스(.creamBox) + 제도 구분별(DB형 vs DC/IRP형) 운용 주체 및 추천 라인업 비교 테이블"],
        ["E", "부동산펀드\n(#prod-realestate)", "• 주요 업무지구(CBD·GBD·YBD) 프라임 오피스 중심 [A. Core & Core-Plus] 전략 및 리모델링·임차 개선 중심 [B. Value-Add] 전략 2열 카드"]
    ]
    add_spec_table(s10, 7.05, 1.4, 5.9, s10_rows, [0.55, 1.65, 3.7])

    output_paths = [
        r"c:\Users\gram\Desktop\pnc-capital\P&C_Capital_Partners_화면설계서.pptx",
        r"c:\Users\gram\Desktop\P&C_Capital_Partners_화면설계서.pptx"
    ]
    for path in output_paths:
        prs.save(path)
        print(f"Saved: {path} ({os.path.getsize(path)} bytes)")

if __name__ == "__main__":
    build_presentation()
