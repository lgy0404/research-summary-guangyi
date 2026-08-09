const pptxgen = require('pptxgenjs');

const OUT = '/Users/liuguangyi05/code/personal-info-guangyi/research-summary-guangyi/interview-slides/pdf';
const PROFILE = '/Users/liuguangyi05/code/personal-info-guangyi/Guangyi-CV-latex/images/profile.jpeg';
const REF = '/Users/liuguangyi05/code/personal-info-guangyi/reference/arxiv_sources';
const ASSETS = {
  survey: `${REF}/extracted/2504.19838/figures/phone_agent_framework.drawio.png`,
  learnact: `${REF}/extracted/2504.13805/images/learnact-pipline.drawio.png`,
  bench: `${REF}/extracted/2602.06075/images/memgui-overview/memgui-overall.drawio.png`,
  forge: `${REF}/extracted/2606.19930/images/mobileforge-overview/mobileforge-overview.drawio.png`,
  agent: `${REF}/extracted/2606.19926/images/contexact/contextact-framework.drawio.png`,
};
const PAPERS = {
  survey: `${REF}/pdf/survey.pdf`,
  learnact: `${REF}/pdf/learnact.pdf`,
  bench: `${REF}/pdf/memgui-bench.pdf`,
  forge: `${REF}/pdf/mobileforge.pdf`,
  agent: `${REF}/pdf/memgui-agent.pdf`,
};

const W = 13.333;
const H = 7.5;
const TOTAL = 32;
const C = {
  blue: '1D5961',
  navy: '17272B',
  royal: '356F75',
  cyan: '6B9F9B',
  orange: 'B37A2C',
  coral: '9B5360',
  ink: '182326',
  body: '384649',
  muted: '748082',
  line: 'D8D3C7',
  pale: 'F7F4ED',
  warm: 'EEE5D4',
  white: 'FFFDF8',
  green: '527B69',
};
const shadow = { type: 'outer', color: '000000', opacity: 0.06, blur: 1, angle: 45, distance: 0.5 };

function addText(slide, text, x, y, w, h, size, color = C.ink, bold = false, extra = {}) {
  slide.addText(text, {
    x, y, w, h, fontFace: extra.fontFace, fontSize: size, color, bold,
    margin: extra.margin ?? 0, breakLine: false, valign: extra.valign || 'mid',
    align: extra.align || 'left', fit: 'shrink', paraSpaceAfterPt: extra.paraSpaceAfterPt || 0,
    isTextBox: true, ...extra,
  });
}

function addCard(slide, x, y, w, h, fill = C.white, line = C.line, radius = 0.08) {
  slide.addShape(slide._pptx.ShapeType.rect, {
    x, y, w, h,
    fill: { color: fill }, line: { color: line, width: 0.8 },
  });
}

function addTop(slide, title, font, kicker = '') {
  slide.addShape(slide._pptx.ShapeType.rect, { x: 0.52, y: 0.19, w: 0.36, h: 0.045, fill: { color: C.orange }, line: { color: C.orange } });
  if (kicker) addText(slide, kicker.toUpperCase(), 0.98, 0.11, 2.1, 0.18, 7.8, C.blue, true, { fontFace: font, charSpacing: 1.5 });
  addText(slide, title, 0.52, 0.36, 12.15, 0.48, 23.5, C.ink, true, { fontFace: font });
  slide.addShape(slide._pptx.ShapeType.line, { x: 0.52, y: 0.93, w: 12.28, h: 0, line: { color: C.line, width: 0.9 } });
}

function addSource(slide, text, font) {
  addText(slide, text, 0.35, 6.92, 11.9, 0.17, 7.3, C.muted, false, { fontFace: font });
}

function addNotes(slide, summary, sources) {
  if (typeof slide.addNotes === 'function') {
    slide.addNotes(`${summary}\n\n[Sources]\n${sources.map(s => `- ${s}`).join('\n')}`);
  }
}

function addPill(slide, text, x, y, w, fill, color, font, size = 10) {
  slide.addShape(slide._pptx.ShapeType.rect, { x, y, w, h: 0.32, fill: { color: fill }, line: { color: fill } });
  addText(slide, text, x + 0.08, y + 0.02, w - 0.16, 0.25, size, color, true, { fontFace: font, align: 'center' });
}

function addMetric(slide, value, label, x, y, w, h, accent, font, sub = '') {
  addCard(slide, x, y, w, h, C.white, C.line);
  slide.addShape(slide._pptx.ShapeType.rect, { x, y, w: 0.08, h, fill: { color: accent }, line: { color: accent } });
  addText(slide, value, x + 0.22, y + 0.18, w - 0.36, 0.45, 23, accent, true, { fontFace: font });
  addText(slide, label, x + 0.22, y + 0.68, w - 0.36, 0.38, 11.5, C.body, true, { fontFace: font });
  if (sub) addText(slide, sub, x + 0.22, y + h - 0.42, w - 0.36, 0.26, 8.5, C.muted, false, { fontFace: font });
}

function addBulletList(slide, items, x, y, w, h, font, size = 15.5, color = C.body) {
  const runs = [];
  items.forEach((item, i) => {
    runs.push({ text: item, options: { bullet: { indent: size }, breakLine: i < items.length - 1 } });
  });
  slide.addText(runs, {
    x, y, w, h, fontFace: font, fontSize: size, color, margin: 0.08,
    breakLine: false, valign: 'top', fit: 'shrink', paraSpaceAfterPt: 10,
  });
}

function addImageContain(slide, path, box, aspect, pad = 0.08) {
  const x = box.x + pad, y = box.y + pad, w = box.w - 2 * pad, h = box.h - 2 * pad;
  let iw = w, ih = w / aspect;
  if (ih > h) { ih = h; iw = h * aspect; }
  slide.addImage({ path, x: x + (w - iw) / 2, y: y + (h - ih) / 2, w: iw, h: ih });
}

function addMaster(pptx, lang, font) {
  const author = lang === 'zh' ? '刘广益' : 'Guangyi Liu';
  const center = lang === 'zh' ? '通用数字智能体' : 'Universal Digital Agents';
  pptx.defineSlideMaster({
    title: `MASTER_${lang}`,
    background: { color: C.pale },
    objects: [
      { rect: { x: 0.5, y: 7.08, w: 12.32, h: 0.018, fill: { color: C.blue }, line: { color: C.blue } } },
      { text: { text: author, options: { x: 0.5, y: 7.22, w: 2.5, h: 0.13, fontFace: font, fontSize: 7.5, color: C.muted, margin: 0 } } },
      { text: { text: center, options: { x: 4.55, y: 7.22, w: 4.18, h: 0.13, fontFace: font, fontSize: 7.4, color: C.muted, align: 'center', margin: 0 } } },
      { text: { text: `/${TOTAL}`, options: { x: 12.64, y: 7.21, w: 0.32, h: 0.15, fontFace: font, fontSize: 7.8, color: C.ink, margin: 0 } } },
    ],
    slideNumber: { x: 12.27, y: 7.21, w: 0.37, h: 0.15, fontFace: font, fontSize: 7.8, color: C.ink, align: 'right', margin: 0 },
  });
}

function addCover(pptx, d, font) {
  const s = pptx.addSlide(`MASTER_${d.lang}`);
  s.background = { color: C.pale };
  const display = d.lang === 'zh' ? 'Songti SC' : 'Georgia';
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.2, h: 7.08, fill: { color: C.blue }, line: { color: C.blue } });
  addText(s, d.coverSubtitle.toUpperCase(), 0.78, 0.62, 5.8, 0.24, 9, C.blue, true, { fontFace: font, charSpacing: 1.5 });
  addText(s, d.coverTitle, 0.78, 1.18, 8.05, 1.78, d.lang === 'zh' ? 31 : 30, C.ink, false, { fontFace: display, valign: 'top' });
  s.addShape(pptx.ShapeType.line, { x: 0.78, y: 3.18, w: 7.85, h: 0, line: { color: C.orange, width: 1.4 } });
  addText(s, d.name, 0.8, 3.48, 3.0, 0.48, 22, C.ink, true, { fontFace: display });
  addText(s, d.role, 0.8, 3.98, 5.2, 0.32, 11.5, C.muted, false, { fontFace: font });
  d.coverPills.forEach((p, i) => {
    addText(s, p.toUpperCase(), 0.82 + i * 2.15, 4.58, 1.9, 0.25, 8.5, i === 2 ? C.orange : C.blue, true, { fontFace: font, charSpacing: 0.8 });
    s.addShape(pptx.ShapeType.line, { x: 0.82 + i * 2.15, y: 4.91, w: 1.55, h: 0, line: { color: i === 2 ? C.orange : C.cyan, width: 1 } });
  });
  addText(s, d.coverLine, 0.8, 5.34, 7.9, 0.56, 17.5, C.ink, true, { fontFace: font });
  addText(s, d.coverFoot, 0.8, 6.0, 7.8, 0.35, 10.5, C.muted, false, { fontFace: font });
  s.addShape(pptx.ShapeType.rect, { x: 9.55, y: 0.86, w: 2.7, h: 4.7, fill: { color: C.white }, line: { color: C.line, width: 0.9 } });
  s.addImage({ path: PROFILE, x: 9.91, y: 1.22, w: 1.98, h: 2.02 });
  addText(s, d.name, 9.82, 3.64, 2.16, 0.42, 18, C.ink, true, { fontFace: display, align: 'center' });
  addText(s, d.role, 9.78, 4.12, 2.25, 0.52, 9.2, C.muted, false, { fontFace: font, align: 'center' });
  s.addShape(pptx.ShapeType.line, { x: 10.38, y: 4.92, w: 1.05, h: 0, line: { color: C.orange, width: 1.2 } });
  addNotes(s, d.notes.cover, [
    '/Users/liuguangyi05/code/personal-info-guangyi/Guangyi-CV-latex/main.tex',
    '/Users/liuguangyi05/code/personal-info-guangyi/lgy0404.github.io',
  ]);
}

function addSnapshot(pptx, d, font) {
  const s = pptx.addSlide(`MASTER_${d.lang}`); addTop(s, d.snapshotTitle, font, d.snapshotKicker);
  addText(s, d.snapshotLead, 0.62, 1.14, 7.5, 0.62, 20, C.navy, true, { fontFace: font });
  addText(s, d.snapshotSub, 0.64, 1.77, 8.0, 0.38, 11.5, C.muted, false, { fontFace: font });
  const metrics = d.snapshotMetrics;
  metrics.slice(0, 3).forEach((m, i) => addMetric(s, m[0], m[1], 0.65 + i * 4.08, 2.38, 3.72, 1.52, [C.blue, C.cyan, C.orange][i], font, m[2]));
  metrics.slice(3).forEach((m, i) => addMetric(s, m[0], m[1], 2.7 + i * 4.08, 4.3, 3.72, 1.52, [C.coral, C.green][i], font, m[2]));
  addSource(s, d.introSource, font);
  addNotes(s, d.notes.snapshot, ['/Users/liuguangyi05/code/personal-info-guangyi/Guangyi-CV-latex/main.tex']);
}

function addEducation(pptx, d, font) {
  const s = pptx.addSlide(`MASTER_${d.lang}`); addTop(s, d.educationTitle, font, d.educationKicker);
  s.addShape(pptx.ShapeType.line, { x: 1.28, y: 1.62, w: 0, h: 4.45, line: { color: 'BFC7E8', width: 2 } });
  d.education.forEach((e, i) => {
    const y = 1.35 + i * 1.55;
    s.addShape(pptx.ShapeType.ellipse, { x: 1.05, y: y + 0.24, w: 0.46, h: 0.46, fill: { color: i === 2 ? C.orange : C.blue }, line: { color: C.white, width: 2 } });
    addText(s, e.year, 1.78, y, 1.68, 0.36, 15, i === 2 ? C.orange : C.blue, true, { fontFace: font });
    addText(s, e.school, 3.38, y - 0.02, 7.4, 0.44, 20, C.ink, true, { fontFace: font });
    addText(s, e.detail, 3.4, y + 0.48, 7.55, 0.55, 13, C.body, false, { fontFace: font });
  });
  addPill(s, d.educationTag, 9.96, 5.55, 2.22, 'E6F6F7', C.cyan, font, 9.3);
  addSource(s, d.introSource, font);
  addNotes(s, d.notes.education, ['/Users/liuguangyi05/code/personal-info-guangyi/Guangyi-CV-latex/main.tex']);
}

function addIndustry(pptx, d, font) {
  const s = pptx.addSlide(`MASTER_${d.lang}`); addTop(s, d.industryTitle, font, d.industryKicker);
  d.industry.forEach((e, i) => {
    const x = 0.65 + i * 6.07;
    addCard(s, x, 1.32, 5.75, 3.28, i === 0 ? 'F4F6FF' : 'F2FBFA', i === 0 ? 'D5DBFF' : 'CCEDEA');
    addPill(s, e.time, x + 0.3, 1.62, 1.8, i === 0 ? 'E2E6FF' : 'DDF4F1', i === 0 ? C.blue : C.cyan, font, 8.8);
    addText(s, e.company, x + 0.3, 2.08, 4.9, 0.52, 22, C.ink, true, { fontFace: font });
    addBulletList(s, e.bullets, x + 0.32, 2.78, 4.92, 1.42, font, 13.4);
  });
  d.industrySkills.forEach((t, i) => addPill(s, t, 1.28 + i * 3.78, 5.16, 3.22, [C.navy, C.blue, C.orange][i], C.white, font, 10));
  addText(s, d.industryLine, 1.05, 5.78, 11.0, 0.46, 15.5, C.navy, true, { fontFace: font, align: 'center' });
  addSource(s, d.introSource, font);
  addNotes(s, d.notes.industry, ['/Users/liuguangyi05/code/personal-info-guangyi/Guangyi-CV-latex/main.tex']);
}

function addThesis(pptx, d, font) {
  const s = pptx.addSlide(`MASTER_${d.lang}`); addTop(s, d.thesisTitle, font, d.thesisKicker);
  const centers = [[2.2, 2.0], [8.95, 2.0], [2.2, 4.66], [8.95, 4.66]];
  centers.forEach((c, i) => {
    s.addShape(pptx.ShapeType.line, { x: 6.63, y: 3.78, w: c[0] + 0.75 - 6.63, h: c[1] + 0.55 - 3.78, line: { color: 'BAC3E9', width: 2, endArrowType: 'triangle' } });
  });
  s.addShape(pptx.ShapeType.ellipse, { x: 5.0, y: 2.35, w: 3.25, h: 2.85, fill: { color: C.navy }, line: { color: C.navy }, shadow });
  addText(s, d.thesisCenter, 5.35, 3.05, 2.55, 1.05, 21, C.white, true, { fontFace: font, align: 'center' });
  d.thesisItems.forEach((e, i) => {
    const [x, y] = centers[i];
    addCard(s, x, y, 2.78, 1.15, i % 2 === 0 ? C.white : 'F7FAFF', C.line);
    addText(s, e[0], x + 0.2, y + 0.14, 2.35, 0.34, 16, [C.blue, C.cyan, C.orange, C.coral][i], true, { fontFace: font });
    addText(s, e[1], x + 0.2, y + 0.52, 2.35, 0.42, 10.3, C.body, false, { fontFace: font });
  });
  addSource(s, d.introSource, font);
  addNotes(s, d.notes.thesis, ['/Users/liuguangyi05/code/personal-info-guangyi/Guangyi-CV-latex/main.tex']);
}

function addOwnership(pptx, d, font) {
  const s = pptx.addSlide(`MASTER_${d.lang}`); addTop(s, d.ownershipTitle, font, d.ownershipKicker);
  const xs = [0.7, 3.78, 6.86, 9.94];
  for (let i = 0; i < 3; i++) {
    s.addShape(pptx.ShapeType.line, { x: xs[i] + 2.3, y: 3.12, w: 0.76, h: 0, line: { color: 'AAB4DF', width: 2.2, endArrowType: 'triangle' } });
  }
  d.ownershipItems.forEach((e, i) => {
    addCard(s, xs[i], 1.72, 2.45, 2.72, C.white, C.line);
    s.addShape(pptx.ShapeType.ellipse, { x: xs[i] + 0.88, y: 1.98, w: 0.68, h: 0.68, fill: { color: [C.blue, C.cyan, C.orange, C.coral][i] }, line: { color: C.white, width: 1 } });
    addText(s, String(i + 1), xs[i] + 0.88, 2.04, 0.68, 0.42, 15, C.white, true, { fontFace: font, align: 'center' });
    addText(s, e[0], xs[i] + 0.22, 2.86, 2.0, 0.4, 16, C.ink, true, { fontFace: font, align: 'center' });
    addText(s, e[1], xs[i] + 0.22, 3.34, 2.0, 0.76, 10.3, C.body, false, { fontFace: font, align: 'center' });
  });
  addCard(s, 2.45, 5.05, 8.45, 0.84, C.warm, 'EFD9C6');
  addText(s, d.ownershipLine, 2.76, 5.25, 7.8, 0.38, 18, C.orange, true, { fontFace: font, align: 'center' });
  addSource(s, d.introSource, font);
  addNotes(s, d.notes.ownership, ['/Users/liuguangyi05/code/personal-info-guangyi/Guangyi-CV-latex/main.tex']);
}

function addArc(pptx, d, font) {
  const s = pptx.addSlide(`MASTER_${d.lang}`); addTop(s, d.arcTitle, font, d.arcKicker);
  const xs = [0.58, 3.1, 5.62, 8.14, 10.66];
  for (let i = 0; i < 4; i++) s.addShape(pptx.ShapeType.line, { x: xs[i] + 1.93, y: 3.2, w: 0.58, h: 0, line: { color: 'ABB4DC', width: 2.4, endArrowType: 'triangle' } });
  d.arcItems.forEach((e, i) => {
    addCard(s, xs[i], 2.02, 2.0, 2.55, i === 4 ? 'FFF4EA' : C.white, i === 4 ? 'F1C89E' : C.line);
    addPill(s, `0${i + 1}`, xs[i] + 0.64, 2.28, 0.72, i === 4 ? C.orange : C.blue, C.white, font, 9);
    addText(s, e[0], xs[i] + 0.13, 2.86, 1.74, 0.52, 14.5, C.ink, true, { fontFace: font, align: 'center' });
    addText(s, e[1], xs[i] + 0.16, 3.48, 1.68, 0.64, 9.8, C.body, false, { fontFace: font, align: 'center' });
  });
  addText(s, d.arcLine, 1.2, 5.28, 10.92, 0.54, 18, C.navy, true, { fontFace: font, align: 'center' });
  addText(s, d.arcSub, 1.2, 5.86, 10.92, 0.38, 11.2, C.muted, false, { fontFace: font, align: 'center' });
  addSource(s, d.introSource, font);
  addNotes(s, d.notes.arc, ['/Users/liuguangyi05/code/personal-info-guangyi/Guangyi-CV-latex/main.tex', `${REF}/MANIFEST.md`]);
}

function addPaperSection(pptx, d, font, p) {
  const s = pptx.addSlide(`MASTER_${d.lang}`);
  const display = d.lang === 'zh' ? 'Songti SC' : 'Georgia';
  const number = (p.index.match(/\d+/) || ['01'])[0];
  s.background = { color: C.pale };
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 2.28, h: 7.08, fill: { color: C.navy }, line: { color: C.navy } });
  addText(s, number, 0.43, 1.0, 1.4, 1.15, 56, p.accent, false, { fontFace: display });
  addText(s, p.index.toUpperCase(), 0.42, 2.3, 1.42, 0.62, 8.3, C.white, true, { fontFace: font, charSpacing: 1.1 });
  s.addShape(pptx.ShapeType.line, { x: 0.43, y: 3.06, w: 1.34, h: 0, line: { color: p.accent, width: 1 } });
  p.tags.forEach((t, i) => addText(s, t, 0.43, 3.35 + i * 0.42, 1.45, 0.25, 8.3, i === 0 ? p.accent : 'C9D0CD', true, { fontFace: font }));
  addText(s, p.title, 2.78, 1.05, 9.72, 1.52, d.lang === 'zh' ? 26 : 25, C.ink, false, { fontFace: display, valign: 'top' });
  addText(s, p.subtitle, 2.8, 2.75, 9.35, 0.72, 15.5, C.body, false, { fontFace: font });
  s.addShape(pptx.ShapeType.line, { x: 2.8, y: 3.72, w: 8.95, h: 0, line: { color: C.line, width: 1 } });
  addText(s, p.problemLabel, 2.82, 4.08, 1.35, 0.28, 9.5, p.accent, true, { fontFace: font, charSpacing: 0.8 });
  addText(s, p.problem, 4.05, 4.0, 7.65, 0.9, 15.2, C.ink, true, { fontFace: font });
  addText(s, p.citation, 9.72, 6.24, 2.45, 0.28, 8.5, C.muted, false, { fontFace: font, align: 'right' });
  addNotes(s, p.notes, [p.source]);
}

function addPaperMethod(pptx, d, font, p) {
  const s = pptx.addSlide(`MASTER_${d.lang}`); addTop(s, p.methodTitle, font, p.kicker);
  addCard(s, 0.52, 1.18, p.figureBox.w, p.figureBox.h, C.white, C.line);
  addImageContain(s, p.image, { x: 0.52, y: 1.18, w: p.figureBox.w, h: p.figureBox.h }, p.aspect, 0.14);
  addCard(s, p.sideX, 1.28, 12.78 - p.sideX, 4.98, p.sideFill || 'F5F7FF', p.sideLine || 'DCE1F7');
  addText(s, p.sideTitle, p.sideX + 0.28, 1.58, 12.2 - p.sideX, 0.5, 18, p.accent, true, { fontFace: font });
  addBulletList(s, p.bullets, p.sideX + 0.28, 2.18, 12.0 - p.sideX, 2.9, font, p.bulletSize || 13.2);
  addCard(s, p.sideX + 0.28, 5.36, 11.95 - p.sideX, 0.58, C.white, p.accent);
  addText(s, p.methodTakeaway || p.takeaway, p.sideX + 0.46, 5.47, 11.55 - p.sideX, 0.3, 11.6, p.accent, true, { fontFace: font, align: 'center' });
  addSource(s, p.sourceLine, font);
  addNotes(s, p.notes, [p.source]);
}

function addPaperEvidence(pptx, d, font, p) {
  const s = pptx.addSlide(`MASTER_${d.lang}`); addTop(s, p.evidenceTitle, font, p.kicker);
  if (p.lead) {
    addText(s, p.lead, 0.68, 1.12, 12.0, 0.56, 17.5, C.navy, true, { fontFace: font, align: 'center' });
  }
  const y1 = p.lead ? 1.92 : 1.36;
  const metrics = p.metrics;
  if (metrics.length === 4) {
    metrics.forEach((m, i) => addMetric(s, m[0], m[1], 0.65 + i * 3.13, y1, 2.83, 1.58, m[3] || [C.blue, C.cyan, C.orange, C.coral][i], font, m[2] || ''));
  } else if (metrics.length === 3) {
    metrics.forEach((m, i) => addMetric(s, m[0], m[1], 1.25 + i * 4.06, y1, 3.62, 1.66, m[3] || [C.blue, C.cyan, C.orange][i], font, m[2] || ''));
  }
  addCard(s, 0.72, y1 + 2.05, 12.0, 1.45, p.bandFill || 'F5F7FF', p.bandLine || 'DCE1F7');
  addText(s, p.bandTitle, 1.0, y1 + 2.26, 2.0, 0.32, 12.5, p.accent, true, { fontFace: font });
  addText(s, p.bandText, 2.75, y1 + 2.17, 9.5, 0.78, 14.4, C.body, true, { fontFace: font });
  addCard(s, 2.0, y1 + 3.88, 9.34, 0.72, C.warm, 'ECD5C1');
  addText(s, p.evidenceTakeaway || p.takeaway, 2.25, y1 + 4.04, 8.84, 0.36, 15.5, C.orange, true, { fontFace: font, align: 'center' });
  addSource(s, p.sourceLine, font);
  addNotes(s, p.notes, [p.source]);
}

function addPaperDetail(pptx, d, font, p, detail) {
  const s = pptx.addSlide(`MASTER_${d.lang}`); addTop(s, detail.title, font, detail.kicker || p.kicker);
  addText(s, detail.lead, 0.68, 1.08, 12.0, 0.54, 17.2, C.navy, true, { fontFace: font, align: 'center' });
  detail.cards.forEach((card, i) => {
    const x = i % 2 === 0 ? 0.68 : 6.78;
    const y = i < 2 ? 1.82 : 3.66;
    addCard(s, x, y, 5.86, 1.56, i % 2 === 0 ? C.white : 'F7F9FF', C.line);
    s.addShape(pptx.ShapeType.rect, { x, y, w: 0.08, h: 1.56, fill: { color: card[3] || p.accent }, line: { color: card[3] || p.accent } });
    addText(s, card[0], x + 0.24, y + 0.14, 2.18, 0.3, 12.2, card[3] || p.accent, true, { fontFace: font });
    addText(s, card[1], x + 2.26, y + 0.11, 3.28, 0.38, 15.5, C.ink, true, { fontFace: font, align: 'right' });
    addText(s, card[2], x + 0.24, y + 0.57, 5.32, 0.72, 10.8, C.body, false, { fontFace: font, valign: 'top' });
  });
  addCard(s, 0.9, 5.55, 11.55, 0.82, detail.bandFill || 'F5F7FF', detail.bandLine || 'DCE1F7');
  addText(s, detail.bandTitle, 1.14, 5.74, 1.65, 0.34, 11.3, p.accent, true, { fontFace: font });
  addText(s, detail.bandText, 2.62, 5.67, 9.5, 0.46, 12.5, C.body, true, { fontFace: font });
  addSource(s, detail.sourceLine || p.sourceLine, font);
  addNotes(s, detail.notes, [p.source]);
}

function data(lang) {
  const zh = lang === 'zh';
  const introSource = zh ? '来源：个人简历与个人主页，数据截至 2026-08-09' : 'Source: CV and personal homepage; metrics as of 2026-08-09';
  const sourceLine = (id, venue = '') => zh ? `来源：Liu et al., arXiv:${id}${venue ? `；${venue}` : ''}` : `Source: Liu et al., arXiv:${id}${venue ? `; ${venue}` : ''}`;
  const paperSource = id => `${REF}/pdf/${id}`;
  const common = {
    lang,
    coverTitle: zh ? '面向真实环境的通用数字智能体：学习、记忆与行动' : 'Universal Digital Agents That Learn, Remember, and Act',
    coverSubtitle: zh ? '互联网大厂人才计划实习面试' : 'Research Internship / Talent Program Interview',
    name: zh ? '刘广益' : 'Guangyi Liu',
    role: zh ? '浙江大学博士生' : 'Ph.D. Candidate, Zhejiang University',
    coverPills: zh ? ['GUI 智能体', '持续学习', '真实系统'] : ['GUI Agents', 'Continual Learning', 'Real Systems'],
    coverLine: zh ? '从研究问题到可运行系统，再到可验证的持续改进闭环' : 'From research questions to working systems and measurable improvement loops',
    coverFoot: zh ? '预计 2028 年 6 月毕业｜浙江大学 APRIL Lab' : 'Expected Jun 2028 | Zhejiang University APRIL Lab',
    snapshotTitle: zh ? '候选人概览｜研究方向与影响力' : 'Candidate Snapshot | Research Focus and Impact',
    snapshotKicker: zh ? '个人概况' : 'Profile',
    snapshotLead: zh ? '研究愿景：构建能够在真实数字环境中持续学习、记忆并行动的通用智能体' : 'Research vision: universal agents that continuously learn, remember, and act in real digital environments',
    snapshotSub: zh ? '聚焦移动 GUI 智能体、长程任务、记忆评测与强化学习后训练' : 'Mobile GUI agents, long-horizon tasks, memory evaluation, and reinforcement-learning post-training',
    snapshotMetrics: zh ? [
      ['5', '第一作者论文', 'TMLR / ACL / arXiv'], ['415', 'Google Scholar 引用', '学术影响力'], ['122', '第一作者论文引用', '核心工作'], ['632', '第一作者项目 GitHub Stars', '开源影响力'], ['2028.06', '预计毕业时间', '浙江大学博士'],
    ] : [
      ['5', 'First-author works', 'TMLR / ACL / arXiv'], ['415', 'Google Scholar citations', 'Academic impact'], ['122', 'First-author citations', 'Core research'], ['632', 'GitHub stars on first-author projects', 'Open-source impact'], ['Jun 2028', 'Expected graduation', 'Zhejiang University Ph.D.'],
    ],
    educationTitle: zh ? '教育经历与成长路径' : 'Education and Growth', educationKicker: zh ? '教育背景' : 'Education',
    education: zh ? [
      { year: '2019–2023', school: '中国矿业大学｜自动化学士', detail: '综合排名 1/203｜国家奖学金 2 次' },
      { year: '2023–2025', school: '浙江大学｜硕士研究生', detail: 'NeSC Group｜智能控制与智能体研究' },
      { year: '2025–2028', school: '浙江大学｜博士研究生', detail: 'APRIL Lab｜控制科学与工程｜预计 2028 年 6 月毕业' },
    ] : [
      { year: '2019–2023', school: 'CUMT | B.Eng. in Automation', detail: 'No. 1/203 overall | National Scholarship recipient twice' },
      { year: '2023–2025', school: 'Zhejiang University | M.S.', detail: 'NeSC Group | Intelligent control and agent research' },
      { year: '2025–2028', school: 'Zhejiang University | Ph.D.', detail: 'APRIL Lab | Control Science and Engineering | Expected Jun 2028' },
    ],
    educationTag: zh ? '连续攻关真实智能体问题' : 'A continuous agent-research trajectory',
    industryTitle: zh ? '产业研究｜从原型验证走向真实系统' : 'Industry Research | From Prototypes to Real Systems', industryKicker: zh ? '产业经历' : 'Industry',
    industry: zh ? [
      { time: '2024.08–2025.08', company: 'vivo AI Lab', bullets: ['PhoneGPT 与示范学习', '在线评测与记忆能力基准', '连接研究问题与手机真实场景'] },
      { time: '2025.08–2026.07', company: '快手', bullets: ['智能体后训练与强化学习', '长程上下文管理', '移动应用缺陷检测与自动评测'] },
    ] : [
      { time: 'Aug 2024–Aug 2025', company: 'vivo AI Lab', bullets: ['PhoneGPT and demonstration learning', 'Online evaluation and memory benchmarking', 'Connecting research questions to real phone scenarios'] },
      { time: 'Aug 2025–Jul 2026', company: 'Kuaishou', bullets: ['Agent post-training and reinforcement learning', 'Long-horizon context management', 'App defect detection and automated evaluation'] },
    ],
    industrySkills: zh ? ['研究：提出可验证的问题', '工程：搭建数据与评测闭环', '应用：对接真实产品流程'] : ['Research | Testable questions', 'Engineering | Data and eval loops', 'Application | Product workflows'],
    industryLine: zh ? '优势：既能定义研究问题，也能把方法落到环境、数据、训练与评测系统' : 'Strength: defining the research question and carrying it through environment, data, training, and evaluation',
    thesisTitle: zh ? '研究主线｜真实环境中的持续改进' : 'Research Thesis | Continuous Improvement in Real Environments', thesisKicker: zh ? '研究愿景' : 'Thesis',
    thesisCenter: zh ? '通用数字智能体' : 'Universal\nDigital Agents',
    thesisItems: zh ? [['学习', '示范、反馈、强化学习与后训练'], ['记忆', '上下文管理、经验复用与持续适应'], ['评测', '在线协议、可解释指标与失败诊断'], ['行动', '跨应用工具使用与长程执行']] : [['Learn', 'Demonstrations, feedback, RL, and post-training'], ['Remember', 'Context management, reuse, and adaptation'], ['Evaluate', 'Online protocols, metrics, and diagnosis'], ['Act', 'Cross-app tool use and long-horizon execution']],
    ownershipTitle: zh ? '端到端研究能力｜从问题到系统' : 'End-to-End Ownership | From Question to System', ownershipKicker: zh ? '研究能力' : 'Ownership',
    ownershipItems: zh ? [['环境与数据', '探索、示范、轨迹、反馈与记忆数据'], ['策略学习', 'Prompt、SFT、RL 与上下文动作'], ['评测诊断', '在线成功率、pass@k 与失败分析'], ['系统交付', '可复现的训练、评测与部署链路']] : [['Environment & Data', 'Exploration, demonstrations, rollouts, feedback, and memory traces'], ['Policy Learning', 'Prompting, SFT, RL, and context-management actions'], ['Evaluation', 'Online success, pass@k, and failure diagnosis'], ['System Delivery', 'Reproducible training, evaluation, and deployment']],
    ownershipLine: zh ? '发现瓶颈 → 将其量化 → 构建闭环 → 验证可迁移性' : 'Find the bottleneck → make it measurable → close the loop → test transfer',
    arcTitle: zh ? '五篇第一作者工作，一条连贯研究主线' : 'Five First-Author Works, One Coherent Research Arc', arcKicker: zh ? '研究全景' : 'Research Arc',
    arcItems: zh ? [['Survey', '建立领域地图'], ['LearnAct', '从示范中学习'], ['MemGUI-Bench', '评测记忆能力'], ['MobileForge', '无标注持续改进'], ['MemGUI-Agent', '主动上下文管理']] : [['Survey', 'Map the field'], ['LearnAct', 'Learn from demonstrations'], ['MemGUI-Bench', 'Measure memory'], ['MobileForge', 'Improve without labels'], ['MemGUI-Agent', 'Manage context proactively']],
    arcLine: zh ? '领域地图 → 示范学习 → 记忆评测 → 自我改进 → 长程智能体' : 'Field map → demonstration learning → memory evaluation → self-improvement → long-horizon agents',
    arcSub: zh ? '后续按论文顺序展开：问题、方法、证据与研究价值' : 'Next: problem, method, evidence, and research value for each paper',
    introSource,
    notes: {
      cover: zh ? '用一句话建立候选人的研究定位：面向真实环境的通用数字智能体。' : 'Position the candidate in one sentence: universal digital agents for real environments.',
      snapshot: zh ? '强调研究数量、学术影响与开源影响，同时说明数据时间点。' : 'Emphasize research output, academic impact, and open-source impact with the metric date.',
      education: zh ? '突出从自动化与控制到 GUI 智能体研究的连续成长。' : 'Highlight the continuous path from automation and control to GUI-agent research.',
      industry: zh ? '强调研究与工程结合，而不是只罗列实习经历。' : 'Emphasize the research-engineering bridge rather than merely listing internships.',
      thesis: zh ? '用学习、记忆、评测、行动四个维度概括研究愿景。' : 'Summarize the thesis through learning, memory, evaluation, and action.',
      ownership: zh ? '说明能够独立推进环境、数据、算法、评测和系统交付。' : 'Show ownership across environment, data, algorithms, evaluation, and system delivery.',
      arc: zh ? '用五篇工作形成统一叙事，并自然转入逐篇论文介绍。' : 'Unify the five works into one narrative and transition to paper-by-paper discussion.',
    },
  };

  common.papers = [
    {
      index: zh ? '论文 01｜领域地图' : 'PAPER 01 | FIELD MAP', accent: '63D0C2',
      title: 'LLM-Powered GUI Agents in Phone Automation: Surveying Progress and Prospects',
      subtitle: zh ? '系统梳理手机 GUI 智能体的框架、模型、数据、评测与未来方向' : 'A systematic map of frameworks, models, data, evaluation, and future directions for phone GUI agents',
      problemLabel: zh ? '关键问题' : 'CORE QUESTION',
      problem: zh ? '快速增长的研究缺少统一术语与方法框架，难以连接学术进展与工程设计。' : 'A rapidly growing field lacked a shared vocabulary connecting academic progress with practical agent design.',
      tags: zh ? ['TMLR 2025', '综述与分类', '第一作者'] : ['TMLR 2025', 'Survey & Taxonomy', 'First Author'],
      citation: 'arXiv:2504.19838', source: PAPERS.survey, notes: zh ? '介绍领域地图，突出为什么需要统一框架。' : 'Introduce the field map and why a unified framework was needed.',
      methodTitle: zh ? '统一框架｜从用户意图到 GUI 行动' : 'Unified Framework | From User Intent to GUI Action', kicker: zh ? 'Survey 方法' : 'Survey Method',
      image: ASSETS.survey, aspect: 3450 / 2610, figureBox: { w: 7.78, h: 5.45 }, sideX: 8.58, accent: C.cyan,
      sideTitle: zh ? '三层研究地图' : 'A Three-Layer Research Map',
      bullets: zh ? ['智能体框架：单智能体、多智能体、Plan-then-Act', '模型方法：Prompt Engineering 与训练式方法', '资源与评测：数据集、基准、指标与自动评测', '核心逻辑：感知 GUI、理解意图、规划决策、执行行动'] : ['Agent frameworks: single-agent, multi-agent, and plan-then-act', 'Modeling: prompt engineering versus training-based methods', 'Resources: datasets, benchmarks, metrics, and automated evaluation', 'Core loop: perceive the GUI, understand intent, decide, and act'],
      takeaway: zh ? '把分散工作组织为可复用的智能体设计框架' : 'Turn fragmented progress into reusable agent-design guidance',
      sourceLine: sourceLine('2504.19838', 'TMLR 2025'),
      evidenceTitle: zh ? '研究路线图｜走向可部署的手机智能体' : 'Research Roadmap | Toward Deployable Phone Agents',
      lead: zh ? '从静态脚本到自适应智能体，下一阶段瓶颈不只在模型能力' : 'The shift from static scripts to adaptive agents exposes bottlenecks beyond model capability',
      metrics: zh ? [['数据', '覆盖多样性', '长尾应用与真实任务'], ['端侧', '部署效率', '计算、时延与能耗'], ['用户', '个性化适应', '偏好、历史与反馈'], ['安全', '可靠性与隐私', '敏感操作与风险控制']] : [['Data', 'Coverage diversity', 'Long-tail apps and real tasks'], ['On-device', 'Deployment efficiency', 'Compute, latency, and energy'], ['Users', 'Personal adaptation', 'Preferences, history, and feedback'], ['Safety', 'Reliability and privacy', 'Sensitive actions and risk control']],
      bandTitle: zh ? '研究价值' : 'RESEARCH VALUE', bandText: zh ? '建立统一术语、方法分类和评测视角，为后续示范学习、记忆评测和持续改进工作提供坐标系。' : 'A common vocabulary and evaluation lens that anchors later work on demonstration learning, memory, and continual improvement.',
      takeaway: zh ? '先看清领域结构，才能找到真正值得解决的系统瓶颈' : 'A clear field map reveals the system bottlenecks worth solving',
    },
    {
      index: zh ? '论文 02｜示范学习' : 'PAPER 02 | LEARNING FROM DEMOS', accent: 'FFB25B',
      title: 'LearnAct: Few-Shot Mobile GUI Agent with a Unified Demonstration Benchmark',
      subtitle: zh ? '用少量视觉示范提升长尾移动任务的泛化能力' : 'Improving long-tail mobile-task generalization from a few visual demonstrations',
      problemLabel: zh ? '关键问题' : 'CORE QUESTION', problem: zh ? '现有智能体难以泛化到长尾任务，同时缺少统一的少样本示范学习评测基准。' : 'Agents struggle to generalize to long-tail tasks, while the field lacked a unified benchmark for few-shot demonstration learning.',
      tags: zh ? ['ACL 2026', '2,353 个任务', '6 个骨干模型'] : ['ACL 2026', '2,353 Tasks', '6 Backbones'], citation: 'arXiv:2504.13805', source: PAPERS.learnact, notes: zh ? '说明 LearnGUI 与 LearnAct 分别解决评测和方法缺口。' : 'Explain how LearnGUI and LearnAct address the evaluation and method gaps.',
      methodTitle: zh ? 'LearnAct｜将视觉示范转化为可检索知识' : 'LearnAct | Turning Visual Demonstrations into Retrievable Knowledge', kicker: 'LearnAct', image: ASSETS.learnact, aspect: 5330 / 3520, figureBox: { w: 8.52, h: 5.45 }, sideX: 9.32, accent: C.orange, bulletSize: 12.5,
      sideTitle: zh ? '三个模块' : 'Three Modules', bullets: zh ? ['DemoParser：把示范轨迹抽取为结构化知识', 'KnowSeeker：按指令、界面与动作相似度检索支持示范', 'ActExecutor：融合支持示范、截图、历史与记忆执行任务'] : ['DemoParser extracts structured knowledge from demonstrations', 'KnowSeeker retrieves support demos by instruction, UI, and action similarity', 'ActExecutor combines demos, screenshots, history, and memory for execution'],
      takeaway: zh ? '不是复制轨迹，而是抽取、检索并复用示范知识' : 'Do not copy trajectories; extract, retrieve, and reuse demonstration knowledge', sourceLine: sourceLine('2504.13805', 'Findings of ACL 2026'),
      evidenceTitle: zh ? '实验结果｜跨模型稳定提升' : 'Results | Consistent Gains Across Model Families', lead: zh ? 'LearnGUI：2,252 个离线任务 + 101 个在线任务，覆盖 73 个应用' : 'LearnGUI: 2,252 offline tasks + 101 online tasks across 73 applications',
      metrics: zh ? [['38.5→58.9%', 'Gemini-2.5-Pro 离线', '+20.4 个百分点'], ['18.1→32.8%', 'UI-TARS-7B-SFT 在线', '+14.7 pp；相对提升 81.2%'], ['6', '骨干模型', '通用模型与 GUI 专用模型']] : [['38.5→58.9%', 'Gemini-2.5-Pro offline', '+20.4 percentage points'], ['18.1→32.8%', 'UI-TARS-7B-SFT online', '+14.7 pp; +81.2% relative'], ['6', 'Backbone models', 'General-purpose and GUI-specialized']],
      bandTitle: zh ? '核心发现' : 'KEY FINDING', bandText: zh ? '示范学习对通用模型和 GUI 专用模型均有效，说明示范知识可以作为低成本适应长尾任务的通用接口。' : 'Demonstration learning benefits both general-purpose and GUI-specialized models, providing a low-cost interface for long-tail adaptation.',
      takeaway: zh ? '少量高质量示范，可以显著提升真实在线任务泛化' : 'A few high-quality demonstrations can materially improve online generalization',
    },
    {
      index: zh ? '论文 03｜记忆评测' : 'PAPER 03 | MEMORY EVALUATION', accent: 'D998C4', title: 'MemGUI-Bench: Benchmarking Memory of Mobile GUI Agents in Dynamic Environments',
      subtitle: zh ? '系统评测移动 GUI 智能体的短期记忆、长期学习与执行效率' : 'A systematic benchmark for short-term memory, long-term learning, and execution efficiency',
      problemLabel: zh ? '关键问题' : 'CORE QUESTION', problem: zh ? '现有基准只有 5.2–11.8% 的记忆相关任务，也无法评测跨会话学习。' : 'Existing benchmarks contain only 5.2–11.8% memory-related tasks and cannot evaluate cross-session learning.',
      tags: zh ? ['128 个任务', '26 个应用', '11 个智能体'] : ['128 Tasks', '26 Apps', '11 Agents'], citation: 'arXiv:2602.06075', source: PAPERS.bench, notes: zh ? '先说明为什么现有 benchmark 会高估智能体能力。' : 'Explain why standard benchmarks overestimate agent capability.',
      methodTitle: zh ? 'MemGUI-Bench｜记忆分类、任务与评测一体化' : 'MemGUI-Bench | Taxonomy, Tasks, and Evaluation in One System', kicker: 'MemGUI-Bench', image: ASSETS.bench, aspect: 2500 / 1297, figureBox: { w: 8.45, h: 5.45 }, sideX: 9.22, accent: 'B36B9B', bulletSize: 12.3,
      sideTitle: zh ? '评测设计' : 'Evaluation Design', bullets: zh ? ['记忆分类：短期上下文保持 + 长期跨会话学习', '任务：128 个任务、26 个应用，89.8% 需要跨时空记忆', '协议：pass@1 / pass@k，支持多次尝试与经验学习', 'MemGUI-Eval：三级 Progressive Scrutiny + 7 个层级指标'] : ['Taxonomy: short-term retention and long-term cross-session learning', 'Tasks: 128 tasks across 26 apps; 89.8% require cross-temporal or cross-spatial memory', 'Protocol: pass@1 / pass@k for repeated attempts and learning', 'MemGUI-Eval: three-stage Progressive Scrutiny and seven hierarchical metrics'],
      takeaway: zh ? '把“记得住、学得会、执行省”变成可量化指标' : 'Make retention, learning, and execution efficiency measurable', sourceLine: sourceLine('2602.06075'),
      evidenceTitle: zh ? '主要发现｜标准基准掩盖了真实记忆缺口' : 'Findings | Standard Benchmarks Hide the Real Memory Gap', lead: zh ? '对 11 个 SOTA 智能体开展 6 个研究问题驱动的系统评测' : 'Six research questions across eleven state-of-the-art agents',
      metrics: zh ? [['4–10×', '记忆能力缺口', '标准任务与记忆任务差距'], ['−16–40 pp', '跨应用退化', '主要记忆瓶颈'], ['+18.8 pp', '长上下文收益', 'RQ4'], ['+21.9 pp', '长期记忆收益', 'RQ5']] : [['4–10×', 'Memory capability gap', 'Standard vs memory-intensive tasks'], ['−16–40 pp', 'Cross-app degradation', 'Primary memory bottleneck'], ['+18.8 pp', 'Long-context gain', 'RQ4'], ['+21.9 pp', 'Long-term memory gain', 'RQ5']],
      bandTitle: zh ? '失败诊断' : 'FAILURE DIAGNOSIS', bandText: zh ? '识别 5 类失败：部分记忆幻觉、过程记忆幻觉、输出记忆幻觉、知识缺失与意图误解，并形成 5 条设计启示。' : 'Five failure modes: partial, process, and output memory hallucination, knowledge deficiency, and intent misunderstanding, leading to five design implications.',
      takeaway: zh ? '先建立可信评测，才能判断“记忆模块”是否真的有效' : 'A trustworthy benchmark is prerequisite to judging whether memory actually works',
    },
    {
      index: zh ? '论文 04｜无标注适应' : 'PAPER 04 | ANNOTATION-FREE ADAPTATION', accent: '48C5CF', title: 'MobileForge: Annotation-Free Adaptation for Mobile GUI Agents with Hierarchical Feedback-Guided Policy Optimization',
      subtitle: zh ? '在真实目标应用中自动探索、生成课程、评测轨迹并优化策略' : 'Explore target apps, mine curricula, evaluate rollouts, and optimize policies without manual annotations',
      problemLabel: zh ? '关键问题' : 'CORE QUESTION', problem: zh ? '目标应用数量多、更新快，依赖人工任务、示范和奖励标注的适应成本不可扩展。' : 'Target apps are numerous and fast-changing, making adaptation with human tasks, demonstrations, and reward labels unscalable.',
      tags: zh ? ['MobileGym', 'HiFPO', '强化学习后训练'] : ['MobileGym', 'HiFPO', 'RL Post-Training'], citation: 'arXiv:2606.19930', source: PAPERS.forge, notes: zh ? '突出 annotation-free 不是无反馈，而是自动生成层级反馈。' : 'Clarify that annotation-free does not mean feedback-free; feedback is generated automatically.',
      methodTitle: zh ? 'MobileForge｜真实交互驱动的自我改进闭环' : 'MobileForge | A Real-Interaction Self-Improvement Loop', kicker: 'MobileForge', image: ASSETS.forge, aspect: 2650 / 2195, figureBox: { w: 7.42, h: 5.45 }, sideX: 8.22, accent: C.cyan,
      sideTitle: zh ? '两个耦合组件' : 'Two Coupled Components', bullets: zh ? ['MobileGym：目标应用探索、课程挖掘、Rollout 执行与层级评测', '层级反馈：轨迹结果、步骤过程标签与纠错提示', 'HiFPO：多次尝试、任务过滤、正步骤选择', 'Hint-contextualized step-level GRPO：把反馈转成可学习信号'] : ['MobileGym: target-app exploration, curriculum mining, rollout execution, and hierarchical evaluation', 'Hierarchical feedback: outcome labels, process labels, and corrective hints', 'HiFPO: multi-attempt rollouts, task filtering, and positive-step selection', 'Hint-contextualized step-level GRPO converts feedback into learnable signals'],
      takeaway: zh ? '环境自动产数据，反馈自动变成策略改进信号' : 'The environment generates data; hierarchical feedback becomes policy-improvement signal', sourceLine: sourceLine('2606.19930'),
      evidenceTitle: zh ? '实验结果｜自动生成数据也能形成强策略' : 'Results | Automatically Generated Data Can Produce Strong Policies', lead: zh ? '仅使用自动生成的无标注适应数据，在 AndroidWorld 与 MobileWorld 上验证' : 'Validated on AndroidWorld and MobileWorld using only automatically generated adaptation data',
      metrics: zh ? [['67.2%', 'Qwen3-VL-8B Pass@3', 'AndroidWorld；接近闭源数据基座 69.0%'], ['77.6%', 'ForgeOwl-8B Pass@3', 'AndroidWorld'], ['41.0%', 'ForgeOwl-8B 成功率', 'MobileWorld GUI-only']] : [['67.2%', 'Qwen3-VL-8B Pass@3', 'AndroidWorld; near the closed-data base at 69.0%'], ['77.6%', 'ForgeOwl-8B Pass@3', 'AndroidWorld'], ['41.0%', 'ForgeOwl-8B success', 'MobileWorld GUI-only']],
      bandTitle: zh ? '核心结论' : 'KEY RESULT', bandText: zh ? 'MobileForge 同时提升通用模型与 GUI 专用模型，ForgeOwl-8B 成为论文评测中最强的开放数据移动 GUI 智能体。' : 'MobileForge improves both generalist and GUI-specialized models; ForgeOwl-8B is the strongest open-data mobile GUI agent in the paper.',
      takeaway: zh ? '把真实应用变成可以持续产出训练信号的“智能体工厂”' : 'Turn real target apps into a continuously improving agent factory',
    },
    {
      index: zh ? '论文 05｜长程智能体' : 'PAPER 05 | LONG-HORIZON AGENTS', accent: 'E48B7A', title: 'MemGUI-Agent: An End-to-End Long-Horizon Mobile GUI Agent with Proactive Context Management',
      subtitle: zh ? '将上下文管理变成端到端策略中的一等动作' : 'Making context management a first-class action inside an end-to-end policy',
      problemLabel: zh ? '关键问题' : 'CORE QUESTION', problem: zh ? 'ReAct 被动累积历史，长程任务中上下文膨胀、噪声增加，关键跨应用事实被稀释。' : 'ReAct passively accumulates history, causing prompt growth, noise, and dilution of critical cross-app facts on long-horizon tasks.',
      tags: zh ? ['ConAct', 'MemGUI-3K', '8B SFT'] : ['ConAct', 'MemGUI-3K', '8B SFT'], citation: 'arXiv:2606.19926', source: PAPERS.agent, notes: zh ? '从长程性能下降切入，解释为什么上下文管理必须进入策略。' : 'Start from long-horizon degradation and explain why context management must enter the policy.',
      methodTitle: zh ? 'ConAct｜上下文管理即动作' : 'ConAct | Context Management as Action', kicker: 'MemGUI-Agent', image: ASSETS.agent, aspect: 13280 / 4460, figureBox: { w: 9.62, h: 4.35 }, sideX: 10.12, accent: C.coral, bulletSize: 11.7,
      sideTitle: zh ? '单策略联合决策' : 'One Policy, Joint Decisions', bullets: zh ? ['折叠动作历史：压缩完成的子任务', '折叠 UI 状态：持久保存关键界面事实', '最近步骤记录：保留即时观察与意图', '同一次前向同时输出推理、折叠、工具调用、观察与下一步意图'] : ['Folded action history compresses completed sub-tasks', 'Folded UI state preserves critical interface facts', 'Recent step record retains immediate observations and intent', 'One forward pass emits reasoning, folding, tool call, observation, and next intent'],
      takeaway: zh ? '智能体在行动的同时，主动决定“保留什么、压缩什么”' : 'While acting, the agent decides what to preserve and what to compress', sourceLine: sourceLine('2606.19926'),
      evidenceTitle: zh ? '实验结果｜更省上下文，更强长程表现' : 'Results | Lower Context Cost, Stronger Long-Horizon Performance', lead: zh ? 'MemGUI-Agent-235B 零样本 ConAct + MemGUI-8B-SFT 监督学习' : 'Zero-shot ConAct with 235B and supervised MemGUI-8B-SFT',
      metrics: zh ? [['~1.5k', '第 150 步节省输入 Tokens', '相对 ReAct'], ['62.5%', '235B MemGUI-Bench Pass@3', 'Pass@1 = 37.5%'], ['2,956', 'MemGUI-3K 轨迹', '64,430 个 SFT 样本'], ['17.9%', '8B MobileWorld 成功率', '较基座 +8.5 pp']] : [['~1.5k', 'Input tokens saved by step 150', 'Compared with ReAct'], ['62.5%', '235B MemGUI-Bench Pass@3', 'Pass@1 = 37.5%'], ['2,956', 'MemGUI-3K trajectories', '64,430 SFT samples'], ['17.9%', '8B MobileWorld success', '+8.5 pp over backbone']],
      bandTitle: zh ? '可迁移性' : 'TRANSFER', bandText: zh ? '235B 零样本 ConAct 在 MemGUI-Bench 达到新 SOTA；8B 模型在 MemGUI-3K 上学习后，取得最佳开放数据 8B 表现并迁移到 MobileWorld。' : 'Zero-shot 235B ConAct sets a new MemGUI-Bench SOTA; training on MemGUI-3K gives the best open-data 8B result and transfers to MobileWorld.',
      takeaway: zh ? '真正的长程智能体，需要学会在行动过程中管理自己的工作上下文' : 'A long-horizon agent must learn to manage its own working context while acting',
    },
  ];
  const details = [
    {
      methodTakeaway: zh ? '把分散工作组织为可复用的智能体设计框架' : 'Turn fragmented progress into reusable agent-design guidance',
      evidenceTakeaway: zh ? '先看清领域结构，才能找到真正值得解决的系统瓶颈' : 'A clear field map reveals the system bottlenecks worth solving',
      detailBefore: {
        title: zh ? '技术演进｜从固定脚本到自适应智能体' : 'Technical Evolution | From Fixed Scripts to Adaptive Agents', kicker: zh ? 'Survey 背景' : 'Survey Context',
        lead: zh ? '传统自动化在动态界面、长尾任务和自然语言意图面前暴露出三个根本缺口' : 'Traditional automation exposes three fundamental gaps under dynamic interfaces, long-tail tasks, and natural-language intent',
        cards: zh ? [
          ['传统自动化', '固定路径与模板', '依赖预定义脚本、控件定位和规则；界面更新后维护成本高，跨应用迁移能力弱。'],
          ['多模态感知', 'Screenshot / UI Tree / OCR', 'LLM 智能体融合截图、UI 树、OCR 与 Set-of-Marks，将界面理解从坐标匹配升级为语义感知。'],
          ['智能体大脑', '规划、推理与反思', '单智能体、多智能体和 Plan-then-Act 分别在执行效率、模块化和复杂任务分解之间做权衡。'],
          ['行动接口', '触控、工具与 API', '从点击、输入和滑动扩展到工具调用与 API，但复杂手势和动态内容仍要求更细粒度动作空间。'],
        ] : [
          ['Traditional automation', 'Fixed paths and templates', 'Predefined scripts, selectors, and rules are brittle under UI updates, expensive to maintain, and difficult to transfer across apps.'],
          ['Multimodal perception', 'Screenshot / UI Tree / OCR', 'Agents combine screenshots, UI trees, OCR, and Set-of-Marks, moving from coordinate matching to semantic interface understanding.'],
          ['Agent brain', 'Planning, reasoning, reflection', 'Single-agent, multi-agent, and plan-then-act designs trade execution efficiency against modularity and complex-task decomposition.'],
          ['Action interface', 'Touch, tools, and APIs', 'Click, type, and swipe are extending toward tools and APIs, but dynamic content still demands more expressive action spaces.'],
        ],
        bandTitle: zh ? '三个原始痛点' : 'ORIGINAL PAIN POINTS', bandText: zh ? '泛化能力有限、维护成本高、用户意图理解弱，推动手机自动化从脚本系统转向 LLM 智能体。' : 'Limited generality, high maintenance overhead, and weak intent understanding drive the shift from scripts to LLM agents.',
        notes: zh ? '解释为什么 LLM 改变的是手机自动化范式，而不只是替换识别模型。' : 'Explain why LLMs change the automation paradigm rather than merely replacing a perception model.',
      },
      detailAfter: {
        title: zh ? '系统权衡｜研究前沿不只是扩大模型' : 'System Trade-offs | The Frontier Is More Than Scaling Models', kicker: zh ? 'Survey 洞察' : 'Survey Insights',
        lead: zh ? '论文将未来方向组织为一组相互制约的系统问题' : 'The survey reframes future work as a set of coupled system trade-offs',
        cards: zh ? [
          ['框架设计', '速度–记忆–成本三难', '丰富感知和多智能体提高能力，却增加时延、上下文与调用成本；需要按任务复杂度动态分配资源。'],
          ['模型路线', '泛化–专用化缺口', 'Prompt 适配新应用更灵活但上限受基座约束；SFT/RL 性能更强但数据昂贵，应采用混合训练路线。'],
          ['数据与评测', '离线–在线能力鸿沟', '单步视觉定位高分并不等价于多步真实任务成功，需要跨应用组合任务、效率和鲁棒性指标。'],
          ['端侧部署', '大小–时延–性能三难', '轻量模型有低时延和隐私优势，但必须在 UI 变化、系统中断和网络波动下保持鲁棒。'],
        ] : [
          ['Framework design', 'Speed–memory–cost trilemma', 'Richer perception and multi-agent systems raise capability but also latency, context, and API cost; resources should scale with task complexity.'],
          ['Modeling path', 'Generality–specialization gap', 'Prompting adapts easily but inherits the base-model ceiling; SFT/RL is stronger but data-intensive, motivating hybrid training.'],
          ['Data and evaluation', 'Offline–online capability gap', 'Strong single-step grounding does not imply multi-step task success; benchmarks need cross-app composition, efficiency, and robustness.'],
          ['On-device deployment', 'Size–latency–performance trilemma', 'Compact models improve latency and privacy, but must remain robust to UI changes, interruptions, and variable networks.'],
        ],
        bandTitle: zh ? '可信性' : 'TRUSTWORTHINESS', bandText: zh ? '环境注入、数据投毒、隐私泄露与模型偏差要求端到端安全框架、持续监控和隐私保护训练。' : 'Environmental injection, data poisoning, privacy leakage, and model bias require end-to-end defenses, monitoring, and privacy-preserving training.',
        notes: zh ? '强调大厂落地时，性能、成本、端侧、安全和个性化必须一起考虑。' : 'Emphasize that deployment requires jointly optimizing performance, cost, on-device constraints, safety, and personalization.',
      },
    },
    {
      methodTakeaway: zh ? '不是复制轨迹，而是抽取、检索并复用示范知识' : 'Do not copy trajectories; extract, retrieve, and reuse demonstration knowledge',
      evidenceTakeaway: zh ? '少量高质量示范，可以显著提升真实在线任务泛化' : 'A few high-quality demonstrations can materially improve online generalization',
      detailBefore: {
        title: zh ? 'LearnGUI｜可控的少样本示范学习基准' : 'LearnGUI | Controlled Evaluation of Few-Shot Demonstration Learning', kicker: 'LearnAct',
        lead: zh ? '基准同时覆盖离线逐步执行和在线端到端交互，并显式控制示范与查询的相似度' : 'The benchmark covers offline step execution and online end-to-end interaction while controlling demo–query similarity',
        cards: zh ? [
          ['LearnGUI-Offline', '2,252 个任务', '基于 AMEX 重组示范–查询组合，评测步骤类型、步骤完整性、Episode 类型和完整性。'],
          ['LearnGUI-Online', '101 个任务', '在 AndroidWorld 中补充高质量人类示范，直接评测真实交互中的端到端成功率。'],
          ['总体规模', '2,353 指令 / 73 应用', '平均每个任务 13.2 步，覆盖通用模型与 GUI 专用模型的统一动作空间。'],
          ['控制变量', '1 / 2 / 3-shot', '系统改变指令、UI 和动作相似度，区分“示范数量”与“示范相关性”带来的收益。'],
        ] : [
          ['LearnGUI-Offline', '2,252 tasks', 'Reorganizes AMEX into demonstration–query combinations and evaluates step type, step completion, episode type, and episode completion.'],
          ['LearnGUI-Online', '101 tasks', 'Adds high-quality human demonstrations to AndroidWorld and measures end-to-end success under real interaction.'],
          ['Overall scale', '2,353 instructions / 73 apps', 'Tasks average 13.2 steps and share a unified action space for both general-purpose and GUI-specialized agents.'],
          ['Controlled variables', '1 / 2 / 3-shot', 'Systematically varies instruction, UI, and action similarity to separate quantity effects from relevance effects.'],
        ],
        bandTitle: zh ? '统一动作空间' : 'UNIFIED ACTION SPACE', bandText: zh ? 'CLICK、TYPE、SWIPE、BACK、HOME、ENTER 与 TASK_COMPLETE，使离线和在线评测可对齐。' : 'CLICK, TYPE, SWIPE, BACK, HOME, ENTER, and TASK_COMPLETE align offline and online evaluation.',
        notes: zh ? '说明 LearnGUI 不是普通任务集合，而是用于研究示范数量与相似度的受控实验平台。' : 'Explain that LearnGUI is a controlled testbed for demonstration quantity and similarity, not merely another task collection.',
      },
      detailAfter: {
        title: zh ? '组件消融｜生成与检索缺一不可' : 'Component Ablation | Generation and Retrieval Are Complementary', kicker: 'LearnAct',
        lead: zh ? '在 9 个应用上的平均准确率显示，两个模块单独有效，联合效果最强' : 'Average accuracy across nine apps shows that each component helps independently and their combination is strongest',
        cards: zh ? [
          ['Baseline', '19.3%', '不使用 DemoParser 与 KnowSeeker，智能体只能依赖当前指令和视觉状态。'],
          ['仅 KnowSeeker', '40.6%', '检索相关示范可显著提升，但原始轨迹缺少语义化动作描述和显式记忆。'],
          ['仅 DemoParser', '41.6%', '结构化知识提升可解释性与复用，但缺少任务相关检索会引入无关示范。'],
          ['完整 LearnAct', '51.7%', '知识生成与 top-k 语义检索协同，在 Gmail、Booking、Music 等 9 个应用均取得最佳平均结果。'],
        ] : [
          ['Baseline', '19.3%', 'Without DemoParser or KnowSeeker, the agent relies only on the current instruction and visual state.'],
          ['KnowSeeker only', '40.6%', 'Relevant-demo retrieval helps substantially, but raw trajectories lack semantic action descriptions and explicit memory.'],
          ['DemoParser only', '41.6%', 'Structured knowledge improves reuse, but without task-aware retrieval irrelevant demonstrations can enter the context.'],
          ['Full LearnAct', '51.7%', 'Knowledge generation and top-k semantic retrieval combine to deliver the best average over nine applications.'],
        ],
        bandTitle: zh ? 'k-shot 现象' : 'K-SHOT EFFECT', bandText: zh ? 'Gemini-Pro-1.5 的步骤完整准确率由 19.3% 提升到 57.7%（3-shot）；更多示范主要改善完整执行而非仅动作类型判断。' : 'Gemini-Pro-1.5 step-complete accuracy rises from 19.3% to 57.7% at 3-shot; demos improve complete execution more than action-type recognition.',
        notes: zh ? '用消融说明 LearnAct 的关键不是上下文里多放几条轨迹，而是语义化生成与相关检索协同。' : 'Use the ablation to show that LearnAct is not just adding trajectories to context; semantic generation and relevance retrieval must work together.',
      },
    },
    {
      methodTakeaway: zh ? '把“记得住、学得会、执行省”变成可量化指标' : 'Make retention, learning, and execution efficiency measurable',
      evidenceTakeaway: zh ? '先建立可信评测，才能判断“记忆模块”是否真的有效' : 'A trustworthy benchmark is prerequisite to judging whether memory actually works',
      detailBefore: {
        title: zh ? '任务与指标｜同时评测短期记忆和长期学习' : 'Tasks and Metrics | Measuring Short-Term Memory and Long-Term Learning', kicker: 'MemGUI-Bench',
        lead: zh ? '任务设计、快照环境、多次尝试协议和记忆专用指标共同构成完整评测闭环' : 'Task design, snapshot environments, repeated attempts, and memory-specific metrics form one evaluation loop',
        cards: zh ? [
          ['任务规模', '128 任务 / 26 应用', '覆盖 68 个真实场景，平均黄金路径约 36.2 步，并支持最多四应用的信息迁移。'],
          ['记忆密度', '89.8% 记忆任务', '任务要求跨时间保留中间结果，或跨空间、跨应用搬运和重用信息。'],
          ['短期记忆', 'SR / IRR / MTPR', '成功率衡量完成；IRR 衡量正确信息保留；MTPR 比较记忆任务与标准任务的能力比值。'],
          ['长期与效率', 'pass@k / FRR / 成本', '多次尝试衡量从失败中学习，同时记录步骤比、单步时间和单步成本。'],
        ] : [
          ['Task scale', '128 tasks / 26 apps', 'Covers 68 real scenarios, averages about 36.2 golden steps, and supports information transfer across as many as four apps.'],
          ['Memory density', '89.8% memory-intensive', 'Tasks require retaining intermediate results across time or moving and reusing information across screens and apps.'],
          ['Short-term memory', 'SR / IRR / MTPR', 'Success Rate measures completion, IRR measures correct information retention, and MTPR isolates memory-specific proficiency.'],
          ['Learning and efficiency', 'pass@k / FRR / cost', 'Repeated attempts measure learning from failure while step ratio, time per step, and cost per step capture deployability.'],
        ],
        bandTitle: zh ? '镜像任务对' : 'MIRROR TASK PAIRS', bandText: zh ? '128 个任务组成 64 组认知需求相似但具体要求不同的镜像任务，用于区分记住答案与迁移经验。' : 'The 128 tasks form 64 mirror pairs with similar cognitive demands but different requirements, separating answer memorization from experience transfer.',
        notes: zh ? '解释为什么普通 success rate 不足以评测记忆，以及 pass@k 如何刻画跨尝试学习。' : 'Explain why success rate alone is insufficient and how pass@k captures cross-attempt learning.',
      },
      detailAfter: {
        title: zh ? 'Progressive Scrutiny｜低成本且可解释的自动评测' : 'Progressive Scrutiny | Cost-Efficient and Interpretable Evaluation', kicker: 'MemGUI-Eval',
        lead: zh ? '评测器只在证据不足时逐级增加计算，避免对每条长轨迹都做昂贵的全量视觉判断' : 'The evaluator increases compute only when evidence is insufficient, avoiding expensive full visual reasoning for every long trajectory',
        cards: zh ? [
          ['Stage 1', '低成本 Triage', '仅查看末尾截图和原始动作日志；只有任务要求被明确满足时才判成功，其余进入下一阶段。'],
          ['Stage 2', '完整语义分析', '为每一步生成前后变化描述，再由 Semantic Judge 综合指令、动作与状态判断任务完成度。'],
          ['Stage 3', '定向视觉核验', '针对仍不确定的条件检索关键截图，用视觉证据验证具体商品、数值、设置或跨应用信息。'],
          ['失败分类', '5 类记忆失败', '部分记忆幻觉、过程记忆幻觉、输出记忆幻觉、知识缺失和意图误解，用于定位真正瓶颈。'],
        ] : [
          ['Stage 1', 'Cost-effective triage', 'Inspect only terminal screenshots and raw action logs; declare success only when requirements are unambiguous, otherwise escalate.'],
          ['Stage 2', 'Full semantic analysis', 'Generate before–after descriptions for every step, then let a semantic judge combine instruction, actions, and state changes.'],
          ['Stage 3', 'Targeted visual verification', 'Retrieve decisive screenshots for unresolved conditions such as products, values, settings, or cross-app information.'],
          ['Failure taxonomy', 'Five memory failures', 'Partial, process, and output memory hallucination, knowledge deficiency, and intent misunderstanding localize the real bottleneck.'],
        ],
        bandTitle: zh ? '部署启示' : 'DEPLOYMENT INSIGHT', bandText: zh ? '短期记忆是可用智能体的必要条件；长期记忆有益但非必需；Token 预算通常比步骤预算更限制真实部署。' : 'Short-term memory is mandatory, long-term memory is beneficial but optional, and token budgets constrain deployment more than step budgets.',
        notes: zh ? '强调 MemGUI-Eval 的价值不仅是自动判分，还能在成本、证据和失败原因之间取得平衡。' : 'Emphasize that MemGUI-Eval balances evaluation cost, evidence quality, and failure diagnosis rather than only automating a score.',
      },
    },
    {
      methodTakeaway: zh ? '环境自动产数据，反馈自动变成策略改进信号' : 'The environment generates data; hierarchical feedback becomes policy-improvement signal',
      evidenceTakeaway: zh ? '把真实应用变成可以持续产出训练信号的“智能体工厂”' : 'Turn real target apps into a continuously improving agent factory',
      detailBefore: {
        title: zh ? 'MobileGym｜搭建无标注适应底座' : 'MobileGym | Building the Annotation-Free Adaptation Substrate', kicker: 'MobileForge',
        lead: zh ? '“无标注”不是没有监督，而是把目标应用交互自动转化为任务、轨迹和层级反馈' : 'Annotation-free does not mean supervision-free; target-app interaction is automatically converted into tasks, rollouts, and hierarchical feedback',
        cards: zh ? [
          ['目标应用探索', 'Function-aware DFS', '利用应用锚点和截图生成探索目标，深度优先遍历可达页面、控件、动作与状态转移，形成证据池 Z。'],
          ['课程挖掘', 'MobileGym-Curriculum', '检查探索轨迹的连贯性与完成状态，再生成可执行、可验证且难度多样的训练任务。'],
          ['多次 Rollout', 'K 次尝试 + 历史提示', '策略在同一任务上多次执行，后续尝试接收前序失败形成的纠错提示，产生可比较轨迹。'],
          ['层级评测', 'z + l + h', 'MobileGym-Critic 同时输出轨迹结果 z、步骤过程标签 l 和纠错提示 h，而不是只有一个粗粒度奖励。'],
        ] : [
          ['Target-app exploration', 'Function-aware DFS', 'App anchors and screenshots guide goals; depth-first traversal records reachable screens, controls, actions, and transitions into evidence pool Z.'],
          ['Curriculum mining', 'MobileGym-Curriculum', 'Checks trajectory coherence and completion, then generates executable, verifiable tasks with diverse difficulty.'],
          ['Multi-attempt rollout', 'K attempts + prior hints', 'The policy retries the same task, with later attempts receiving corrective hints distilled from prior failures.'],
          ['Hierarchical evaluation', 'z + l + h', 'MobileGym-Critic outputs trajectory outcome z, step-level process labels l, and corrective hint h instead of one coarse reward.'],
        ],
        bandTitle: zh ? '闭环' : 'CLOSED LOOP', bandText: zh ? 'Explore(E) → Curriculum(Z) → Rollout(π, x, η) → Critic(x, τ) → HiFPO(θ, T, τ, F)。' : 'Explore(E) → Curriculum(Z) → Rollout(π, x, η) → Critic(x, τ) → HiFPO(θ, T, τ, F).',
        notes: zh ? '把 MobileGym 讲成一个适应底座：环境、任务、轨迹和反馈都来自真实目标应用。' : 'Present MobileGym as an adaptation substrate where environment, tasks, trajectories, and feedback all come from the real target app.',
      },
      detailAfter: {
        title: zh ? 'HiFPO 消融｜什么因素真正带来提升' : 'HiFPO Ablations | What Actually Drives Improvement', kicker: 'MobileForge',
        lead: zh ? '纠错提示、任务过滤和 hint-contextualized GRPO 分别解决探索、数据质量和优化目标问题' : 'Corrective hints, task filtering, and hint-contextualized GRPO address exploration, data quality, and optimization respectively',
        cards: zh ? [
          ['纠错提示', '52.0% → 77.0%', '在 200 个生成任务上，多次尝试加入提示后总体成功率提升 25.0 pp，Pass@3 提升 23.5 pp。'],
          ['任务过滤', '保留 mixed + hard', '移除全部成功的已掌握任务，保留混合与全失败任务；1,910 样本、167 任务在 MobileWorld 达到 15/117。'],
          ['训练目标', '50.9% Pass@1', '900 任务的 hint-contextualized GRPO 在 AndroidWorld 达到 59/116，高于基座 40.5% 与 no-hint SFT 44.0%。'],
          ['步骤选择', 'Attempt + positive step', '先过滤不可学习或已掌握任务，再从成功尝试和合理步骤中构造带提示上下文的 step-level GRPO 更新。'],
        ] : [
          ['Corrective hints', '52.0% → 77.0%', 'On 200 generated tasks, hints raise overall success by 25.0 pp and Pass@3 by 23.5 pp across repeated attempts.'],
          ['Task filtering', 'Keep mixed + hard', 'Remove mastered all-success tasks while retaining mixed and all-fail tasks; 1,910 samples from 167 tasks yield 15/117 on MobileWorld.'],
          ['Training objective', '50.9% Pass@1', 'With 900 tasks, hint-contextualized GRPO reaches 59/116 on AndroidWorld versus 40.5% base and 44.0% no-hint SFT.'],
          ['Step selection', 'Attempt + positive step', 'Filter unlearnable or mastered tasks, then construct hint-conditioned step-level GRPO updates from successful attempts and reasonable steps.'],
        ],
        bandTitle: zh ? '关键结论' : 'KEY LESSON', bandText: zh ? '自动生成的数据并非越多越好；需要用失败提示提高探索效率，用任务过滤提高数据价值，用步骤级反馈提高信用分配。' : 'More synthetic data is not automatically better: hints improve exploration, filtering improves data value, and step-level feedback improves credit assignment.',
        notes: zh ? '用三个消融说明 MobileForge 的性能来自闭环设计，而不是单纯增加 rollout 数量。' : 'Use the three ablations to show that MobileForge gains come from loop design, not merely more rollouts.',
      },
    },
    {
      methodTakeaway: zh ? '智能体在行动的同时，主动决定“保留什么、压缩什么”' : 'While acting, the agent decides what to preserve and what to compress',
      evidenceTakeaway: zh ? '真正的长程智能体，需要学会在行动过程中管理自己的工作上下文' : 'A long-horizon agent must learn to manage its own working context while acting',
      detailBefore: {
        title: zh ? 'MemGUI-3K｜让小模型学会上下文控制' : 'MemGUI-3K | Teaching Smaller Models to Control Context', kicker: 'MemGUI-Agent',
        lead: zh ? 'ConAct 不只是输出格式：较小模型需要监督学习何时折叠、何时写入记忆、如何描述步骤' : 'ConAct is more than an output format: smaller models must learn when to fold, when to write memory, and how to describe a step',
        cards: zh ? [
          ['动机实验', '协议本身并不够', '零样本 ConAct 只在 Qwen3-VL-235B-Thinking 上产生收益；较小模型和 235B-Instruct 往往退化。'],
          ['教师轨迹', '235B-Thinking + ConAct', '在 MemGUI-Bench 快照环境执行任务，预算为 2.5g+1，并由 Progressive Scrutiny 判定轨迹。'],
          ['轨迹过滤', 'reasonable / unreasonable', '删除恢复循环、重复错误和反作用步骤，只保留成功轨迹中的合理上下文管理行为。'],
          ['训练规模', '2,956 轨迹 / 64,430 样本', '覆盖 26 个应用，训练/测试为 57,951/6,479 步，与 128 个 MemGUI-Bench 评测任务零重叠。'],
        ] : [
          ['Motivation experiment', 'The protocol alone is insufficient', 'Zero-shot ConAct helps only Qwen3-VL-235B-Thinking; smaller models and 235B-Instruct often regress.'],
          ['Teacher rollouts', '235B-Thinking + ConAct', 'Tasks run in the MemGUI-Bench snapshot environment with budget 2.5g+1 and are judged by Progressive Scrutiny.'],
          ['Trajectory filtering', 'reasonable / unreasonable', 'Recovery loops, repeated errors, and counterproductive actions are removed while successful context-control behavior is retained.'],
          ['Training scale', '2,956 trajectories / 64,430 samples', 'Covers 26 apps, splits into 57,951/6,479 train/test steps, and has zero overlap with 128 MemGUI-Bench evaluation tasks.'],
        ],
        bandTitle: zh ? '训练' : 'TRAINING', bandText: zh ? '从 Qwen3-VL-8B-Instruct 出发进行 LoRA SFT，每个样本包含结构化上下文、截图和完整五段式 ConAct 响应。' : 'LoRA SFT starts from Qwen3-VL-8B-Instruct; each sample contains structured context, screenshot, and the full five-part ConAct response.',
        notes: zh ? '突出数据集解决的是“上下文控制决策学习”，而不是普通 GUI 动作模仿。' : 'Emphasize that the dataset teaches context-control decisions rather than ordinary GUI action imitation.',
      },
      detailAfter: {
        title: zh ? '组件消融与失败分析｜三种机制互补' : 'Component Ablation and Failure Analysis | Three Complementary Mechanisms', kicker: 'MemGUI-Agent',
        lead: zh ? '历史折叠控制增长，UI 记忆保存精确信息，自描述步骤为两者提供可复用语义' : 'History folding controls growth, UI memory preserves exact facts, and self-description provides reusable semantics for both',
        cards: zh ? [
          ['仅 UI 记忆', 'Pass@1: 5.0% → 17.5%', '持久状态显著有效，但缺少压缩和步骤语义时，长程上下文仍会累积噪声。'],
          ['仅历史折叠', '22.5% / 32.5%', 'Pass@1 较高但 Pass@3 受限，说明压缩本身无法保证任务关键事实被准确保留。'],
          ['仅自描述步骤', 'Pass@1: 25.0%', '显式 UI observation 与 action intent 改善上下文复用，但仍缺少持久记忆与跨度压缩。'],
          ['完整 ConAct', '40.0% / 62.5%', 'Pass@1/Pass@3 显著高于单组件；总失败由 99 降到 58，过程幻觉 -42%，输出幻觉 -57%。'],
        ] : [
          ['UI memory only', 'Pass@1: 5.0% → 17.5%', 'Persistent state is valuable, but without folding and step semantics long-horizon context still accumulates noise.'],
          ['History folding only', '22.5% / 32.5%', 'Pass@1 improves but Pass@3 remains limited, showing that compression alone cannot preserve critical facts reliably.'],
          ['Self-description only', 'Pass@1: 25.0%', 'Explicit UI observation and action intent improve reuse, but persistent memory and span compression are still absent.'],
          ['Full ConAct', '40.0% / 62.5%', 'Pass@1/Pass@3 exceed every single component; failures fall from 99 to 58, with process −42% and output −57%.'],
        ],
        bandTitle: zh ? '离线能力' : 'OFFLINE SKILLS', bandText: zh ? '8B SFT：动作匹配 29.2%→36.3%，记忆触发 F1 19.9%→48.0%，深度折叠比例 8.8%→26.1%，格式合规 99.9%。' : '8B SFT: action match 29.2%→36.3%, memory trigger F1 19.9%→48.0%, deep-fold ratio 8.8%→26.1%, and format compliance 99.9%.',
        notes: zh ? '用消融说明三个组件解决不同失败源；再用离线指标证明模型学习了何时写记忆和何时深度折叠。' : 'Use ablations to show that components address different failure sources, then use offline metrics to show learned memory timing and deep folding.',
      },
    },
  ];
  common.papers.forEach((p, i) => Object.assign(p, details[i]));
  return common;
}

async function build(lang) {
  const d = data(lang);
  const font = lang === 'zh' ? 'Arial Unicode MS' : 'Arial';
  const pptx = new pptxgen();
  pptx._pptx = pptx;
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = lang === 'zh' ? '刘广益' : 'Guangyi Liu';
  pptx.subject = lang === 'zh' ? '互联网大厂人才计划实习面试' : 'Research Internship / Talent Program Interview';
  pptx.title = d.coverTitle;
  pptx.company = 'Zhejiang University';
  pptx.lang = lang === 'zh' ? 'zh-CN' : 'en-US';
  pptx.theme = { headFontFace: font, bodyFontFace: font, lang: pptx.lang };
  pptx.defineLayout({ name: 'WIDE_CUSTOM', width: W, height: H });
  pptx.layout = 'WIDE_CUSTOM';
  addMaster(pptx, lang, font);
  // Make the instance available to helper-created slides.
  const originalAddSlide = pptx.addSlide.bind(pptx);
  pptx.addSlide = (...args) => { const s = originalAddSlide(...args); s._pptx = pptx; return s; };

  addCover(pptx, d, font);
  addSnapshot(pptx, d, font);
  addEducation(pptx, d, font);
  addIndustry(pptx, d, font);
  addThesis(pptx, d, font);
  addOwnership(pptx, d, font);
  addArc(pptx, d, font);
  for (const p of d.papers) {
    addPaperSection(pptx, d, font, p);
    addPaperDetail(pptx, d, font, p, p.detailBefore);
    addPaperMethod(pptx, d, font, p);
    addPaperEvidence(pptx, d, font, p);
    addPaperDetail(pptx, d, font, p, p.detailAfter);
  }
  const suffix = lang === 'zh' ? 'zh' : 'en';
  await pptx.writeFile({ fileName: `${OUT}/GuangyiLiu-ZJU-academic-${suffix}.pptx` });
}

Promise.all([build('en'), build('zh')]).catch(err => {
  console.error(err);
  process.exit(1);
});
