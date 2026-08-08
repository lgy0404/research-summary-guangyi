---
theme: frankfurt
title: Research Foundation | Guangyi Liu
author: Guangyi Liu
date: 2026.06.25
layout: cover
class: frankfurt-cover
colorSchema: light
infoLine: true
topNavigation: true
info: |
  English Slidev deck summarizing Guangyi Liu's pre-PhD research foundation in mobile GUI agents.
drawings:
  persist: false
transition: slide-left
mdc: true
---
<div class="hero-grid">
  <div class="cover-copy">
    <p class="eyebrow">Research foundation before PhD</p>
    <h1>From Phone GUI Agents to Memory-Centric Mobile Automation</h1>
    <p class="subtitle">A coherent line of work on surveying, learning, benchmarking, adapting, and building long-horizon mobile GUI agents.</p>
    <div class="cover-meta">
      <span>Guangyi Liu</span>
      <span>Advisor onboarding deck</span>
      <span>2026.06.25</span>
    </div>
  </div>
  <div class="cover-visual">
    <img src="./assets/papers/memgui-agent-teaser.png" />
  </div>
</div>

---
section: Overview
---

# A One-Slide Snapshot

<div class="split">
  <div>
    <p class="lead">My work has centered on one question: how can large multimodal models become reliable agents that operate real mobile interfaces?</p>
    <div class="pillar-list">
      <div><b>Survey and positioning</b><span>Map the fast-moving phone GUI agent field.</span></div>
      <div><b>Few-shot personalization</b><span>Use human demonstrations to bridge long-tail app scenarios.</span></div>
      <div><b>Memory benchmark</b><span>Turn short-term and long-term memory into measurable capabilities.</span></div>
      <div><b>Annotation-free adaptation</b><span>Improve GUI policies from self-collected interaction feedback.</span></div>
      <div><b>End-to-end long-horizon agent</b><span>Make context management a first-class action in the policy.</span></div>
    </div>
  </div>
  <div class="fact-board">
    <div><span class="big">5</span><span>papers / submissions</span></div>
    <div><span class="big">4</span><span>systems or datasets</span></div>
    <div><span class="big">11+</span><span>agents evaluated in memory settings</span></div>
    <div><span class="big">2,956</span><span>MemGUI-3K trajectories</span></div>
  </div>
</div>

---

# Research Arc

<div class="arc">
  <div class="arc-item survey">
    <span>01</span>
    <b>Understand the field</b>
    <p>Survey the methods, datasets, and open problems of LLM-powered phone GUI agents.</p>
  </div>
  <div class="arc-item learn">
    <span>02</span>
    <b>Learn from examples</b>
    <p>Few-shot demonstrations help agents adapt to unseen mobile apps and user-specific tasks.</p>
  </div>
  <div class="arc-item bench">
    <span>03</span>
    <b>Measure memory</b>
    <p>MemGUI-Bench exposes the gap between short-horizon UI control and long-horizon memory.</p>
  </div>
  <div class="arc-item forge">
    <span>04</span>
    <b>Adapt without labels</b>
    <p>MobileForge converts self-generated tasks, rollout feedback, and hints into policy updates.</p>
  </div>
  <div class="arc-item agent">
    <span>05</span>
    <b>Build memory into the policy</b>
    <p>MemGUI-Agent manages context proactively through Context-as-Action.</p>
  </div>
</div>

<p class="bottom-note">The through-line is progressively reducing the distance between user intent, mobile UI dynamics, and reliable autonomous action.</p>

---
layout: intro
section: Survey
---

# 01. Surveying the Field

<p class="section-subtitle">LLM-Powered GUI Agents in Phone Automation: Surveying Progress and Prospects</p>

---

# Why Phone GUI Agents Matter

<div class="image-two-col">
  <div>
    <p class="lead">Traditional automation is brittle: scripts fail under app updates, dynamic layouts, and ambiguous user intent.</p>
    <div class="callout">
      <b>Key shift</b>
      <p>LLM-powered phone agents combine natural language understanding, multimodal perception, reasoning, and executable UI actions.</p>
    </div>
    <ul class="clean-list">
      <li>From static scripts to adaptive perception-action loops.</li>
      <li>From single-step UI grounding to task-level mobile workflows.</li>
      <li>From benchmark demos to privacy, reliability, and on-device deployment questions.</li>
    </ul>
  </div>
  <div class="image-panel">
    <img src="./assets/papers/survey-llm-vs-agent.png" />
    <p>Conversational LLMs answer. GUI agents perceive, decide, and act.</p>
  </div>
</div>

---

# A Technical Map for the Area

<div class="image-two-col wide-image">
  <div class="image-panel">
    <img src="./assets/papers/survey-framework.png" />
  </div>
  <div>
    <div class="mini-grid">
      <div><b>Frameworks</b><span>Single-agent, multi-agent, plan-then-act, perception-brain-action pipelines.</span></div>
      <div><b>Models</b><span>Prompting, SFT, RL, multimodal grounding, task-specific action heads.</span></div>
      <div><b>Data and evaluation</b><span>GUI traces, screenshots, UI trees, online task success, robustness metrics.</span></div>
      <div><b>Open problems</b><span>Long-horizon planning, memory, security, efficiency, personalization.</span></div>
    </div>
  </div>
</div>

---

# What the Survey Contributed to My Research Base

<div class="timeline-slide">
  <img src="./assets/papers/survey-milestones.png" />
  <div class="side-summary">
    <h3>Research value</h3>
    <p>The survey gave me a structured vocabulary for later work: framework design, data design, evaluation, training, and deployment constraints.</p>
    <div class="three-points">
      <span>Field taxonomy</span>
      <span>Dataset and benchmark gaps</span>
      <span>Future directions: memory, user adaptation, safety</span>
    </div>
  </div>
</div>

---
layout: intro
section: LearnAct
---

# 02. Few-Shot Demonstration Learning

<p class="section-subtitle">LearnAct: Few-Shot Mobile GUI Agent with a Unified Demonstration Benchmark</p>

---

# Core Problem: The Personalization Gap

<div class="image-two-col">
  <div>
    <p class="lead">Mobile apps and user workflows are too diverse for a single pretraining or fine-tuning corpus to cover.</p>
    <div class="problem-solution">
      <div>
        <b>Problem</b>
        <p>Agents fail in long-tail apps, personalized settings, and unseen task variants.</p>
      </div>
      <div>
        <b>Idea</b>
        <p>Let the agent learn from a few human demonstrations and retrieve task-relevant procedural knowledge.</p>
      </div>
    </div>
    <div class="metric-row">
      <div><b>2,252</b><span>offline tasks</span></div>
      <div><b>101</b><span>online tasks</span></div>
      <div><b>3</b><span>agent modules</span></div>
    </div>
  </div>
  <div class="image-panel">
    <img src="./assets/papers/learnact-teaser.png" />
  </div>
</div>

---

# LearnAct: Extract, Retrieve, Execute

<div class="full-image-with-caption">
  <img src="./assets/papers/learnact-pipeline.png" />
  <div class="caption-strip">
    <span><b>DemoParser</b> turns trajectories into reusable knowledge.</span>
    <span><b>KnowSeeker</b> retrieves relevant knowledge for the current task.</span>
    <span><b>ActExecutor</b> executes with task, screen, and retrieved demonstrations.</span>
  </div>
</div>

---

# Results: A Few Examples Can Move the Needle

<div class="results-layout">
  <div class="metric-card hot">
    <span class="metric">19.3% -> 51.7%</span>
    <b>Gemini-1.5-Pro offline accuracy</b>
    <p>One demonstration produced a 198.9% relative gain.</p>
  </div>
  <div class="metric-card cool">
    <span class="metric">18.1% -> 32.8%</span>
    <b>UI-TARS-7B-SFT online success</b>
    <p>LearnAct nearly reached GPT-4o with a much smaller open model.</p>
  </div>
  <div class="metric-card green">
    <span class="metric">+14.7 pp</span>
    <b>End-to-end task success gain</b>
    <p>Demonstration learning transfers from offline step quality to online interaction.</p>
  </div>
</div>

<div class="takeaway">
  <b>Takeaway:</b> Personalization can be framed as knowledge extraction and retrieval, not only as more model scaling.
</div>

---

# What LearnAct Taught Me

<div class="two-by-two">
  <div>
    <b>Data design</b>
    <p>A benchmark must separate offline step matching from online task completion to reveal what demonstrations really teach.</p>
  </div>
  <div>
    <b>Agent decomposition</b>
    <p>Specialized sub-agents can make knowledge more explicit, interpretable, and reusable.</p>
  </div>
  <div>
    <b>Retrieval matters</b>
    <p>Relevant examples are not just prompt context; they become procedural scaffolding.</p>
  </div>
  <div>
    <b>Open issue</b>
    <p>Demonstrations help adaptation, but they do not yet solve memory-intensive long-horizon reliability.</p>
  </div>
</div>

<div class="image-panel compact-right">
  <img src="./assets/papers/learnact-similarity.png" />
</div>

---
layout: intro
section: MemGUI-Bench
---

# 03. Benchmarking Memory

<p class="section-subtitle">MemGUI-Bench: Benchmarking Memory of Mobile GUI Agents in Dynamic Environments</p>

---

# Core Problem: Existing Benchmarks Under-Test Memory

<div class="image-two-col">
  <div>
    <p class="lead">Mobile tasks often require carrying facts across screens, apps, and attempts, but prior benchmarks contain only a small fraction of memory-intensive tasks.</p>
    <div class="metric-row">
      <div><b>128</b><span>tasks</span></div>
      <div><b>26</b><span>apps</span></div>
      <div><b>89.8%</b><span>memory-challenging tasks</span></div>
    </div>
    <ul class="clean-list">
      <li>Short-term memory: retain and use facts during one task.</li>
      <li>Long-term memory: improve across multiple attempts or sessions.</li>
      <li>Evaluation protocol: pass@1 and pass@k reveal different capabilities.</li>
    </ul>
  </div>
  <div class="image-panel">
    <img src="./assets/papers/memgui-bench-overview.png" />
  </div>
</div>

---

# MemGUI-Bench as an Evaluation Substrate

<div class="image-two-col wide-image">
  <div class="image-panel">
    <img src="./assets/papers/memgui-benchmark-comparison.png" />
  </div>
  <div>
    <div class="mini-grid">
      <div><b>Task construction</b><span>Cross-temporal and cross-spatial information retention.</span></div>
      <div><b>Agent coverage</b><span>11 systems spanning agentic workflows and end-to-end models.</span></div>
      <div><b>Metrics</b><span>Success rate, information retention, memory-task proficiency, forgetting.</span></div>
      <div><b>Goal</b><span>Expose what standard UI automation benchmarks hide.</span></div>
    </div>
  </div>
</div>

---

# MemGUI-Eval: Progressive Scrutiny

<div class="full-image-with-caption tall">
  <img src="./assets/papers/memgui-eval-pipeline.png" />
  <div class="caption-strip">
    <span>Stage 1: low-cost final-screen triage.</span>
    <span>Stage 2: semantic trajectory analysis.</span>
    <span>Stage 3: targeted visual evidence retrieval.</span>
  </div>
</div>

---

# Main Findings

<div class="findings">
  <div class="finding-block">
    <b>Capability gap</b>
    <p>Agents show 4-10x gaps on memory-intensive tasks compared with easier UI control settings.</p>
  </div>
  <div class="finding-block">
    <b>Memory helps</b>
    <p>Long-context brings +18.8 pp; long-term memory brings +21.9 pp in controlled studies.</p>
  </div>
  <div class="finding-block">
    <b>Cross-app hurts</b>
    <p>Cross-app complexity causes 16-40 pp degradation.</p>
  </div>
  <div class="finding-block">
    <b>Failures are structured</b>
    <p>Five memory-related failure modes point directly to future agent design.</p>
  </div>
</div>

<div class="image-panel heatmap">
  <img src="./assets/papers/memgui-failure-heatmap.svg" />
</div>

---

# Why This Changed My Research Direction

<div class="bridge">
  <div class="bridge-left">
    <h2>Memory is not a prompt detail.</h2>
    <p>It is a capability that needs task design, metrics, evaluator design, and architectural support.</p>
  </div>
  <div class="bridge-right">
    <div><b>Before MemGUI-Bench</b><span>Measure whether agents can finish tasks.</span></div>
    <div><b>After MemGUI-Bench</b><span>Measure what they remembered, forgot, compressed, transferred, and learned.</span></div>
  </div>
</div>

---
layout: intro
section: MobileForge
---

# 04. Annotation-Free Adaptation

<p class="section-subtitle">MobileForge: Annotation-Free Adaptation for Mobile GUI Agents with Hierarchical Feedback-Guided Policy Optimization</p>

---

# Core Problem: Adaptation Data Is Expensive and Stale

<div class="image-two-col">
  <div>
    <p class="lead">Real mobile apps change constantly. Human-written tasks, demonstrations, and reward labels are costly and become stale quickly.</p>
    <div class="problem-solution">
      <div>
        <b>Bottleneck 1</b>
        <p>No unified substrate connecting app exploration, curriculum mining, rollout execution, and evaluation.</p>
      </div>
      <div>
        <b>Bottleneck 2</b>
        <p>Isolated rollouts with sparse rewards do not give reliable long-horizon credit assignment.</p>
      </div>
    </div>
  </div>
  <div class="image-panel">
    <img src="./assets/papers/mobileforge-teaser.png" />
  </div>
</div>

---

# MobileGym: Ground Tasks in Real App Interaction

<div class="full-image-with-caption">
  <img src="./assets/papers/mobileforge-mobilegym.png" />
  <div class="caption-strip">
    <span>Explore target apps.</span>
    <span>Mine executable curriculum tasks.</span>
    <span>Evaluate rollouts with outcome, process, and hint feedback.</span>
  </div>
</div>

---

# MobileForge System Loop

<div class="image-two-col wide-image">
  <div class="image-panel">
    <img src="./assets/papers/mobileforge-overview.png" />
  </div>
  <div>
    <p class="lead">The system creates its own adaptation loop without human task labels.</p>
    <div class="mini-grid">
      <div><b>Explore</b><span>Collect reachable screens and UI functions.</span></div>
      <div><b>Curriculum</b><span>Generate app-grounded tasks.</span></div>
      <div><b>Rollout</b><span>Run multiple attempts with evolving hints.</span></div>
      <div><b>Optimize</b><span>Select reasonable steps and train with GRPO.</span></div>
    </div>
  </div>
</div>

---

# HiFPO: Turn Feedback into Policy Updates

<div class="full-image-with-caption">
  <img src="./assets/papers/mobileforge-hifpo.png" />
  <div class="caption-strip">
    <span>Multi-attempt feedback is accumulated as hints.</span>
    <span>Mastered tasks are filtered out.</span>
    <span>Useful local steps are converted into hint-contextualized GRPO data.</span>
  </div>
</div>

---

# MobileForge Results

<div class="image-two-col results-image">
  <div class="results-layout vertical compact-results">
    <div class="metric-card cool">
      <span class="metric">55.2% -> 67.2%</span>
      <b>Qwen3-VL-8B AndroidWorld Pass@3</b>
      <p>Annotation-free adaptation narrows the gap to GUI-specialized agents.</p>
    </div>
    <div class="metric-card green">
      <span class="metric">69.0% -> 77.6%</span>
      <b>GUI-Owl-1.5-8B AndroidWorld Pass@3</b>
      <p>MobileForge also improves already strong GUI-specialized agents.</p>
    </div>
    <div class="metric-card hot">
      <span class="metric">41.0%</span>
      <b>ForgeOwl-8B MobileWorld GUI-only</b>
      <p>Strongest open-data mobile GUI agent in the evaluation.</p>
    </div>
  </div>
  <div class="image-panel">
    <img src="./assets/papers/mobileforge-main-performance.png" />
  </div>
</div>

---
layout: intro
section: MemGUI-Agent
---

# 05. End-to-End Long-Horizon Agents

<p class="section-subtitle">MemGUI-Agent: An End-to-End Long-Horizon Mobile GUI Agent with Proactive Context Management</p>

---

# Core Problem: ReAct-Style Context Breaks Down

<div class="image-two-col">
  <div>
    <p class="lead">Long-horizon mobile tasks require agents to keep exact facts, track progress, and move information across apps.</p>
    <div class="problem-solution">
      <div>
        <b>Prompt explosion</b>
        <p>Passive history accumulation makes prompts grow with task horizon.</p>
      </div>
      <div>
        <b>Information loss</b>
        <p>Critical prices, names, identifiers, and copied content get diluted or truncated.</p>
      </div>
    </div>
    <div class="takeaway">
      <b>Question:</b> Can the same policy choose UI actions and manage its own working context?
    </div>
  </div>
  <div class="image-panel">
    <img src="./assets/papers/memgui-agent-teaser.png" />
  </div>
</div>

---

# ConAct: Context-as-Action

<div class="full-image-with-caption">
  <img src="./assets/papers/memgui-agent-conact.png" />
  <div class="caption-strip">
    <span>Folded action history stores compressed trajectory summaries.</span>
    <span>Folded UI state stores persistent UI-derived facts.</span>
    <span>Recent step records make future folding and memory writes grounded.</span>
  </div>
</div>

---

# A 5-Part Step Output Protocol

<div class="protocol">
  <div class="protocol-row"><span>1</span><b>&lt;thinking&gt;</b><p>Reason about task progress and the current UI.</p></div>
  <div class="protocol-row"><span>2</span><b>&lt;folding&gt;</b><p>Compress old history into a reusable summary.</p></div>
  <div class="protocol-row"><span>3</span><b>&lt;tool_call&gt;</b><p>Execute a UI action or update memory.</p></div>
  <div class="protocol-row"><span>4</span><b>&lt;ui_observation&gt;</b><p>Record exact visible task-relevant facts.</p></div>
  <div class="protocol-row"><span>5</span><b>&lt;action_intent&gt;</b><p>Describe why the current action was taken.</p></div>
</div>

<div class="takeaway">
  <b>Design principle:</b> context management should be policy-level behavior, not an external summarizer bolted onto the loop.
</div>

---

# MemGUI-3K: Learning Proactive Context Management

<div class="image-two-col">
  <div>
    <p class="lead">MemGUI-3K provides full ConAct annotations so smaller models can learn proactive context management.</p>
    <div class="metric-row">
      <div><b>2,956</b><span>trajectories</span></div>
      <div><b>26</b><span>apps</span></div>
      <div><b>28.8</b><span>average steps</span></div>
    </div>
    <ul class="clean-list">
      <li>Captures long-horizon GUI behavior with memory actions.</li>
      <li>Separates span-level abstraction from step-level distillation.</li>
      <li>Supports supervised training and offline context analysis.</li>
    </ul>
  </div>
  <div class="image-panel">
    <img src="./assets/papers/memgui-agent-dataset.png" />
  </div>
</div>

---

# MemGUI-Agent Results

<div class="image-two-col results-image">
  <div class="results-layout vertical compact-results">
    <div class="metric-card hot">
      <span class="metric">62.5%</span>
      <b>Pass@3 on MemGUI-Bench</b>
      <p>Zero-shot ConAct on Qwen3-VL-235B-Thinking sets the top result in this benchmark.</p>
    </div>
    <div class="metric-card cool">
      <span class="metric">23.4% / 35.9%</span>
      <b>MemGUI-8B-SFT Pass@1 / Pass@3</b>
      <p>Best open-data 8B performance on MemGUI-Bench.</p>
    </div>
    <div class="metric-card green">
      <span class="metric">29.1%</span>
      <b>MobileWorld GUI-only</b>
      <p>ConAct generalizes to out-of-distribution long-horizon tasks.</p>
    </div>
  </div>
  <div class="image-panel">
    <img src="./assets/papers/memgui-agent-main-performance.png" />
  </div>
</div>

---

# Qualitative Evidence: Keeping Facts Alive

<div class="full-image-with-caption no-caption">
  <img src="./assets/papers/memgui-agent-case-study.png" />
</div>

---
layout: intro
section: Synthesis
---

# Synthesis

<p class="section-subtitle">What these works establish as my research foundation</p>

---

# A Coherent Technical Stack

<div class="stack-grid">
  <div><span>Survey</span><b>Problem framing</b><p>Taxonomy, trends, challenges, and future directions.</p></div>
  <div><span>LearnAct</span><b>Few-shot learning</b><p>Demonstration parsing, retrieval, and action execution.</p></div>
  <div><span>MemGUI-Bench</span><b>Evaluation science</b><p>Memory-centric task design and progressive LLM-as-judge.</p></div>
  <div><span>MobileForge</span><b>Training loop</b><p>Annotation-free task generation, feedback, hints, and GRPO.</p></div>
  <div><span>MemGUI-Agent</span><b>Agent architecture</b><p>Context-as-Action and supervised proactive memory management.</p></div>
</div>

---

# What I Can Already Contribute

<div class="two-column-cards">
  <div>
    <h3>Engineering and systems</h3>
    <p>Build mobile GUI interaction environments, automated evaluation pipelines, trajectory renderers, and agent execution loops.</p>
  </div>
  <div>
    <h3>Benchmark design</h3>
    <p>Translate vague capabilities like memory, learning, and robustness into task suites, protocols, and interpretable metrics.</p>
  </div>
  <div>
    <h3>Model training</h3>
    <p>Design SFT and RL-style data pipelines that convert interactive trajectories into usable policy-improvement signals.</p>
  </div>
  <div>
    <h3>Research taste</h3>
    <p>Look for bottlenecks where better evaluation, data, and architecture reinforce each other rather than living separately.</p>
  </div>
</div>

---

# A Natural PhD Research Agenda

<div class="agenda">
  <div>
    <b>1. Continual mobile agents</b>
    <p>Move from one-shot task execution to agents that accumulate stable user and app knowledge over time.</p>
  </div>
  <div>
    <b>2. Verifiable self-improvement</b>
    <p>Combine self-generated tasks, hierarchical critics, and stronger safeguards so adaptation is measurable and reliable.</p>
  </div>
  <div>
    <b>3. Memory-native architectures</b>
    <p>Make compression, retrieval, memorization, and forgetting explicit policy decisions.</p>
  </div>
  <div>
    <b>4. Deployment-aware GUI agents</b>
    <p>Study latency, privacy, device constraints, and safety as first-order research variables.</p>
  </div>
</div>

---

# Closing View

<div class="closing">
  <h1>I see mobile GUI agents as an ideal testbed for grounded, long-horizon AI.</h1>
  <p>They force models to connect language, vision, memory, action, evaluation, and adaptation under real-world constraints.</p>
  <div class="closing-grid">
    <span>Understand the field</span>
    <span>Build the data</span>
    <span>Measure the bottleneck</span>
    <span>Train from interaction</span>
    <span>Put memory inside the policy</span>
  </div>
</div>
