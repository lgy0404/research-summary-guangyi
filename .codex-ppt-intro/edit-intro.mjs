import fs from "node:fs/promises";
import { FileBlob, PresentationFile } from "@oai/artifact-tool";

const SOURCE = "/Users/liuguangyi05/code/personal-info-guangyi/research-summary-guangyi/interview-slides/pdf/GuangyiLiu-ZJU-codex.pptx";
const OUTPUT = "/Users/liuguangyi05/code/personal-info-guangyi/research-summary-guangyi/.codex-ppt-intro/GuangyiLiu-ZJU-intro.artifact.pptx";
const PROFILE = "/Users/liuguangyi05/code/personal-info-guangyi/Guangyi-CV-latex/images/profile.jpeg";
const RENDER_DIR = "/Users/liuguangyi05/code/personal-info-guangyi/research-summary-guangyi/.codex-ppt-intro/artifact-render";

function findShape(slide, name) {
  const shape = slide.shapes.items.find((item) => item.name === name);
  if (!shape) throw new Error(`Missing shape ${name} on slide ${slide.slideNumber}`);
  return shape;
}

function setText(slide, name, value) {
  findShape(slide, name).text = value;
}

function setTextStyle(slide, name, fontSize) {
  findShape(slide, name).text.style = { typeface: "Arial", fontSize };
}

function setNotes(slide, body, sources) {
  slide.speakerNotes.textFrame.setText([
    body,
    "",
    "[Sources]",
    ...sources.map((source) => `- ${source}`),
  ].join("\n"));
  slide.speakerNotes.setVisible(true);
}

async function writeBlob(path, blob) {
  await fs.writeFile(path, new Uint8Array(await blob.arrayBuffer()));
}

async function main() {
  await fs.mkdir(RENDER_DIR, { recursive: true });
  const presentation = await PresentationFile.importPptx(await FileBlob.load(SOURCE));

  const [cover, snapshot, education, experience, thesis, ownership, arc] = presentation.slides.items;

  setText(cover, "标题 1", "Universal Digital Agents That Learn, Remember, and Act");
  setText(cover, "副标题 2", "Guangyi Liu | Ph.D. Candidate, Zhejiang University\nResearch Internship / Talent Program Interview | Expected Jun 2028");
  setTextStyle(cover, "标题 1", 34);
  setTextStyle(cover, "副标题 2", 20);
  const portrait = cover.images.items[0];
  if (!portrait) throw new Error("Missing cover image");
  const portraitFrame = portrait.frame;
  const portraitGeometry = portrait.geometry;
  const profileBytes = await fs.readFile(PROFILE);
  portrait.replace({
    blob: profileBytes.buffer.slice(profileBytes.byteOffset, profileBytes.byteOffset + profileBytes.byteLength),
    contentType: "image/jpeg",
    alt: "Portrait of Guangyi Liu",
    fit: "cover",
  });
  portrait.frame = portraitFrame;
  portrait.geometry = portraitGeometry;
  setNotes(cover,
    "Open with the long-term research goal: agents that learn, remember, and act reliably in real digital environments.",
    [
      "/Users/liuguangyi05/code/personal-info-guangyi/Guangyi-CV-latex/main.tex",
      "/Users/liuguangyi05/code/personal-info-guangyi/lgy0404.github.io/_pages/about.md",
    ]);

  setText(snapshot, "标题 1", "Candidate Snapshot | Research Focus and Impact");
  setText(snapshot, "内容占位符 2", [
    "Research focus | Universal digital agents and GUI agents",
    "Current role | Ph.D. candidate at ZJU APRIL Lab",
    "Research output | 5 first-author works · ACM MM / ACL / TMLR",
    "Academic impact | 415 citations · 122 first-author citations",
    "Open-source impact | 632 first-author project GitHub stars",
  ]);
  setTextStyle(snapshot, "标题 1", 30);
  setTextStyle(snapshot, "内容占位符 2", 22);
  setNotes(snapshot,
    "Establish the overall profile in forty seconds: a focused research direction, a coherent body of work, and measurable academic and open-source impact. Metrics updated Aug 9, 2026.",
    [
      "/Users/liuguangyi05/code/personal-info-guangyi/Guangyi-CV-latex/main.tex",
      "/Users/liuguangyi05/code/personal-info-guangyi/lgy0404.github.io/_pages/about.md",
    ]);

  setText(education, "标题 3", "Education and Growth");
  setText(education, "文本占位符 4", [
    "2019–2023 | CUMT · B.Eng. in Automation | No. 1/203 · National Scholarship ×2",
    "2023–2025 | Zhejiang University · M.S. | NeSC Group",
    "2025–2028 | Zhejiang University · Ph.D. | APRIL Lab · Expected Jun 2028",
  ]);
  setTextStyle(education, "标题 3", 44);
  setTextStyle(education, "文本占位符 4", 22);
  setNotes(education,
    "Highlight the continuous path from automation and control to universal digital agents, supported by the top undergraduate ranking and two National Scholarships.",
    ["/Users/liuguangyi05/code/personal-info-guangyi/Guangyi-CV-latex/main.tex"]);

  setText(experience, "标题 1", "Industry Research | From Prototypes to Real Systems");
  setText(experience, "内容占位符 2", [
    "vivo AI Lab (Aug 2024–Aug 2025) | PhoneGPT, demonstration learning, online evaluation, and memory benchmarking",
    "Kuaishou (Aug 2025–Jul 2026) | Agent post-training, long-horizon context management, and app defect detection",
    "Research | Formulate questions and validate methods",
    "Engineering | Build environments, data pipelines, and automated evaluation",
    "Application | Connect agent research to real product workflows",
  ]);
  setTextStyle(experience, "标题 1", 30);
  setTextStyle(experience, "内容占位符 2", 22);
  setNotes(experience,
    "The two consecutive industry research experiences demonstrate a closed loop across research, engineering, and application rather than paper-only collaboration.",
    [
      "/Users/liuguangyi05/code/personal-info-guangyi/Guangyi-CV-latex/main.tex",
      "/Users/liuguangyi05/code/personal-info-guangyi/lgy0404.github.io/_pages/about.md",
    ]);

  setText(thesis, "标题 1", "Research Thesis | Continuous Improvement in Real Environments");
  setText(thesis, "文本占位符 8", "Universal Digital Agents");
  setText(thesis, "文本占位符 10", [
    "Learn | Demonstrations, feedback, RL, and post-training",
    "Remember | Context management, experience reuse, and continual adaptation",
    "Evaluate | Online protocols, interpretable metrics, and failure diagnosis",
    "Act | Cross-app tool use and long-horizon execution",
  ]);
  setTextStyle(thesis, "标题 1", 28);
  setTextStyle(thesis, "文本占位符 8", 20);
  setTextStyle(thesis, "文本占位符 10", 22);
  setNotes(thesis,
    "Mobile GUIs are the current proving ground because they combine dynamic interfaces, sparse feedback, hidden state, long-tail workflows, and deployment constraints.",
    [
      "/Users/liuguangyi05/code/personal-info-guangyi/Guangyi-CV-latex/main.tex",
      "/Users/liuguangyi05/code/personal-info-guangyi/research-summary-guangyi/interview-slides/slidev/slides.md",
    ]);

  setText(ownership, "标题 1", "End-to-End Ownership | From Question to System");
  setText(ownership, "内容占位符 2", [
    "Environment | Demonstrations, rollouts, and feedback",
    "Policy | Prompting, SFT, RL, and context actions",
    "Evaluation | Online success, pass@k, and diagnosis",
    "System | Reproducible exploration-to-deployment pipeline",
  ]);
  setText(ownership, "文本框 7", "Find | Measure | Improve");
  setTextStyle(ownership, "标题 1", 30);
  setTextStyle(ownership, "内容占位符 2", 18);
  setTextStyle(ownership, "文本框 7", 18);
  setNotes(ownership,
    "Emphasize ownership of the full research loop: not only algorithms, but also environments, data, evaluation, and reproducible systems.",
    ["/Users/liuguangyi05/code/personal-info-guangyi/research-summary-guangyi/interview-slides/slidev/slides.md"]);

  setText(arc, "标题 3", "Five First-Author Works, One Coherent Research Arc");
  setText(arc, "文本占位符 4", [
    "Survey → LearnAct → MemGUI-Bench → MobileForge → MemGUI-Agent",
    "From field mapping to demonstration learning, memory evaluation, self-improvement, and long-horizon agents",
  ]);
  setTextStyle(arc, "标题 3", 44);
  setTextStyle(arc, "文本占位符 4", 22);
  setNotes(arc,
    "Use this slide as the transition from the candidate overview to the paper-by-paper discussion that follows the same research arc.",
    [
      "/Users/liuguangyi05/code/personal-info-guangyi/Guangyi-CV-latex/main.tex",
      "/Users/liuguangyi05/code/personal-info-guangyi/lgy0404.github.io/_pages/about.md",
    ]);

  while (presentation.slides.count > 7) {
    presentation.slides.getItem(7).delete();
  }

  const master = presentation.masters.items[0];
  const footerTitle = master.shapes.items.find((shape) => shape.id === "5" || shape.name === "矩形 4");
  if (!footerTitle) throw new Error("Missing footer title shape");
  footerTitle.text = "Universal Digital Agents";
  footerTitle.text.style = { typeface: "Arial", fontSize: 12 };

  for (const [index, slide] of presentation.slides.items.entries()) {
    const stem = `slide-${String(index + 1).padStart(2, "0")}`;
    await writeBlob(`${RENDER_DIR}/${stem}.png`, await presentation.export({ slide, format: "png", scale: 1 }));
    const layout = await slide.export({ format: "layout" });
    await fs.writeFile(`${RENDER_DIR}/${stem}.layout.json`, await layout.text());
  }

  await writeBlob(`${RENDER_DIR}/montage.webp`, await presentation.export({ format: "webp", montage: true, scale: 1 }));
  const pptx = await PresentationFile.exportPptx(presentation);
  await pptx.save(OUTPUT);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
