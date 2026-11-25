# -*- coding: utf-8 -*-
"""
Capture every screen of the P&C CAPITAL PARTNERS website using Edge/Chrome via Playwright,
and build a pure-screen PPTX ('화면정의서' - No functional descriptions, only actual screens moved onto slides).
"""

import os
import time
from playwright.sync_api import sync_playwright
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from PIL import Image

SCREENSHOT_DIR = r"c:\Users\gram\Desktop\pnc-capital\screenshots"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

SCREENS = [
    ("01_main_home", "메인 화면 (HOME)", "home", False),
    ("02_main_menu", "메인 화면 — 전체 메뉴 (MENU 오픈)", "home", True),
    ("03_esg_intro", "ESG > ESG 소개", "esg-intro", False),
    ("04_about_pnc", "회사소개 > P&C 소개", "about-pnc", False),
    ("05_about_exec", "회사소개 > 임원진 소개", "about-exec", False),
    ("06_about_managers", "회사소개 > 주요운용인력", "about-managers", False),
    ("07_about_aum", "회사소개 > 운용규모", "about-aum", False),
    ("08_info_philosophy", "투자정보 > 운용철학", "info-philosophy", False),
    ("09_info_process", "투자정보 > 운용프로세스", "info-process", False),
    ("10_info_guide", "투자정보 > 투자가이드", "info-guide", False),
    ("11_prod_flagship", "투자상품 > 대표상품", "prod-flagship", False),
    ("12_prod_fundmap", "투자상품 > 펀드맵", "prod-fundmap", False),
    ("13_prod_pension", "투자상품 > 연금저축펀드", "prod-pension", False),
    ("14_prod_retirement", "투자상품 > 퇴직연금펀드", "prod-retirement", False),
    ("15_prod_realestate", "투자상품 > 부동산펀드", "prod-realestate", False),
]

def capture_all_screens():
    with sync_playwright() as p:
        # Use installed MS Edge or Chrome directly without downloading chromium
        browser = None
        for ch in ["msedge", "chrome"]:
            try:
                browser = p.chromium.launch(channel=ch, headless=True)
                print(f"Launched browser via channel: {ch}")
                break
            except Exception as e:
                print(f"Channel {ch} failed: {e}")
        if browser is None:
            raise RuntimeError("Could not launch msedge or chrome")

        context = browser.new_context(viewport={"width": 1600, "height": 900}, device_scale_factor=1.5)
        page = context.new_page()

        page.goto("http://localhost:8123/", wait_until="networkidle")
        # Wait for Google Fonts & background video frame
        page.wait_for_timeout(1500)
        # Seek video to 2.5s so a vibrant frame is visible
        page.evaluate("""() => {
            const v = document.getElementById('heroBgVideo');
            if (v) { v.currentTime = 2.5; }
        }""")
        page.wait_for_timeout(600)

        captured_files = []

        for file_key, label, route_id, open_menu in SCREENS:
            page.evaluate(f"navigateTo('{route_id}')")
            page.wait_for_timeout(450)

            if open_menu:
                page.evaluate("openGnbDrawer()")
                page.wait_for_timeout(500)
            else:
                page.evaluate("closeGnbDrawer()")
                page.wait_for_timeout(250)

            if route_id == "home":
                # Main screen fits cleanly in 16:9 viewport (1600x900)
                page.set_viewport_size({"width": 1600, "height": 940})
                page.wait_for_timeout(250)
                out_path = os.path.join(SCREENSHOT_DIR, f"{file_key}.png")
                page.screenshot(path=out_path, full_page=True)
            else:
                # For sub-pages, measure exact total height so the entire page (banner + content + footer) is captured without awkward cutoff
                page.set_viewport_size({"width": 1600, "height": 900})
                page.wait_for_timeout(200)
                out_path = os.path.join(SCREENSHOT_DIR, f"{file_key}.png")
                page.screenshot(path=out_path, full_page=True)

            print(f"Captured: {out_path}")
            captured_files.append((file_key, label, out_path))

        browser.close()
        return captured_files


def build_pure_screen_ppt(captured_files):
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    C_DARK = RGBColor(0x14, 0x15, 0x18)
    C_GOLD = RGBColor(0xFF, 0xB9, 0x32)
    C_WHITE = RGBColor(0xFF, 0xFF, 0xFF)
    C_BG_SLIDE = RGBColor(0x1C, 0x1D, 0x21)

    for idx, (file_key, label, img_path) in enumerate(captured_files, start=1):
        slide = prs.slides.add_slide(blank_layout)

        # Clean dark frame background so the webpage screen stands out crisply
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = C_BG_SLIDE
        bg.line.fill.background()

        # Minimalist 0.42-inch top bar with ONLY the screen name & page number (no functional descriptions)
        top_bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(0.42))
        top_bar.fill.solid()
        top_bar.fill.fore_color.rgb = C_DARK
        top_bar.line.fill.background()

        gold_line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0.42), Inches(13.333), Inches(0.02))
        gold_line.fill.solid()
        gold_line.fill.fore_color.rgb = C_GOLD
        gold_line.line.fill.background()

        # Screen Title text (Left)
        tb = slide.shapes.add_textbox(Inches(0.3), Inches(0.05), Inches(10.0), Inches(0.32))
        tf = tb.text_frame
        tf.vertical_anchor = MSO_ANCHOR.MIDDLE
        p = tf.paragraphs[0]
        r = p.add_run()
        r.text = f"P&C CAPITAL PARTNERS  |  {label}"
        r.font.name = "맑은 고딕"
        r.font.size = Pt(11)
        r.font.bold = True
        r.font.color.rgb = C_WHITE

        # Page Number (Right)
        tb_num = slide.shapes.add_textbox(Inches(11.0), Inches(0.05), Inches(2.0), Inches(0.32))
        tf_num = tb_num.text_frame
        tf_num.vertical_anchor = MSO_ANCHOR.MIDDLE
        p_num = tf_num.paragraphs[0]
        p_num.alignment = PP_ALIGN.RIGHT
        r_num = p_num.add_run()
        r_num.text = f"{idx} / {len(captured_files)}"
        r_num.font.name = "맑은 고딕"
        r_num.font.size = Pt(10)
        r_num.font.bold = True
        r_num.font.color.rgb = C_GOLD

        # Calculate optimal fit for the captured screen image in the remaining slide area (13.133" x 6.92")
        avail_x = 0.1
        avail_y = 0.50
        avail_w = 13.133
        avail_h = 6.90

        with Image.open(img_path) as im:
            img_w, img_h = im.size

        aspect = img_w / float(img_h)
        avail_aspect = avail_w / avail_h

        if aspect >= avail_aspect:
            draw_w = avail_w
            draw_h = avail_w / aspect
        else:
            draw_h = avail_h
            draw_w = avail_h * aspect

        draw_x = avail_x + (avail_w - draw_w) / 2.0
        draw_y = avail_y + (avail_h - draw_h) / 2.0

        slide.shapes.add_picture(img_path, Inches(draw_x), Inches(draw_y), width=Inches(draw_w), height=Inches(draw_h))

    out_paths = [
        r"c:\Users\gram\Desktop\pnc-capital\P&C_Capital_Partners_화면정의서.pptx",
        r"c:\Users\gram\Desktop\P&C_Capital_Partners_화면정의서.pptx"
    ]
    for path in out_paths:
        prs.save(path)
        print(f"Saved Pure Screen PPTX: {path} ({os.path.getsize(path)} bytes)")

if __name__ == "__main__":
    files = capture_all_screens()
    build_pure_screen_ppt(files)
