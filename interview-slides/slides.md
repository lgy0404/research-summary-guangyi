---
theme: frankfurt
title: Research Interview | Guangyi Liu
author: Guangyi Liu
date: 2026.08.09
layout: cover
class: frankfurt-cover
colorSchema: light
infoLine: true
topNavigation: true
info: |
  English research interview deck on universal digital agents, agent learning, memory, and evaluation.
drawings:
  persist: false
transition: slide-left
mdc: true
---
<div class="hero-grid">
  <div class="cover-copy">
    <p class="eyebrow">Research internship / talent program interview</p>
    <h1>Building Universal Digital Agents That Learn, Remember, and Act</h1>
    <p class="subtitle">Using real GUI environments to study agent learning, self-improvement, memory, and reliable long-horizon autonomy.</p>
    <div class="cover-meta">
      <span>Guangyi Liu (刘广义)</span>
      <span>Ph.D. Candidate, Zhejiang University</span>
      <span>Expected 2028.06</span>
    </div>
  </div>
  <div class="cover-profile-visual">
    <div class="portrait-frame">
      <img src="./assets/profile/guangyi-liu.jpeg" />
    </div>
    <div class="cover-signal">
      <b>Research focus</b>
      <span>Universal Digital Agents</span>
      <span>Agent Learning · Memory · Evaluation</span>
    </div>
  </div>
</div>

---
section: Overview
---

# Candidate Snapshot

<div class="profile-slide">
  <div class="profile-main">
    <div class="identity-row">
      <img src="./assets/profile/guangyi-liu.jpeg" />
      <div>
        <h2>Guangyi Liu <span>(刘广义)</span></h2>
        <p>Ph.D. Candidate in Control Science and Engineering</p>
        <p><b>Zhejiang University · ZJU APRIL Lab</b></p>
      </div>
    </div>
    <p class="profile-thesis">I study the foundations of <b>universal digital agents</b>: systems that understand digital environments, adapt through interaction, and reliably assist people across apps, devices, and software workflows.</p>
    <div class="credential-line"><b>Advisors</b><span>Prof. Yong Liu · Prof. Jiangning Zhang · Dr. Liang Liu</span></div>
    <div class="credential-line"><b>Service</b><span>ICML 2026 Silver Reviewer · Reviewer for ICLR, NeurIPS, ICML, ECCV, ACM MM, EMNLP, TMLR</span></div>
  </div>
  <div class="impact-board">
    <div><span class="big">5</span><span>first-author works</span></div>
    <div><span class="big">415</span><span>Google Scholar citations</span></div>
    <div><span class="big">122</span><span>first-author citations</span></div>
    <div><span class="big">632</span><span>first-author project stars</span></div>
    <p>Metrics updated 2026.08.09</p>
  </div>
</div>

---

# Research Experience: From Prototypes to Real Systems

<div class="experience-layout">
  <div class="experience-card kuaishou">
    <div class="experience-head">
      <img src="./assets/profile/kuaishou-icon.png" />
      <div><h3>Kuaishou Technology</h3><span>Research Intern · Hangzhou · 2025.08–2026.07</span></div>
    </div>
    <p><b>Mentor:</b> Martin Li</p>
    <p>Built research prototypes for agent post-training and long-horizon context management, and contributed to internal GUI-agent systems for app defect detection.</p>
  </div>
  <div class="experience-card vivo">
    <div class="experience-head">
      <img src="./assets/profile/vivo-logo.png" />
      <div><h3>vivo AI Lab</h3><span>Research Intern · Hangzhou · 2024.08–2025.08</span></div>
    </div>
    <p><b>Mentors:</b> Dr. Liang Liu and Prof. Hongsheng Li</p>
    <p>Worked on demonstration learning, online evaluation, and memory-centric benchmarking; contributed to vivo PhoneGPT, a general-purpose phone GUI agent.</p>
  </div>
</div>

<div class="experience-footer">
  <span><b>Research</b> formulate questions and validate ideas</span>
  <span><b>Engineering</b> build environments, data pipelines, and evaluators</span>
  <span><b>Application</b> connect agent research to real product workflows</span>
</div>

---

# My Research Thesis

<div class="thesis-layout">
  <div class="thesis-statement">
    <span>Long-term goal</span>
    <h2>Universal digital agents should improve through interaction while remaining reliable over long horizons.</h2>
    <p>Mobile GUIs are my current proving ground: they expose dynamic interfaces, sparse feedback, hidden state, long-tail workflows, and deployment constraints in one environment.</p>
  </div>
  <div class="thesis-pillars">
    <div><b>Learn</b><span>demonstrations, feedback, RL, post-training</span></div>
    <div><b>Remember</b><span>context control, experience reuse, continual adaptation</span></div>
    <div><b>Evaluate</b><span>online protocols, interpretable metrics, failure diagnosis</span></div>
    <div><b>Act</b><span>grounded tool use across apps and software workflows</span></div>
  </div>
</div>

---

# What I Build End to End

<div class="ownership-grid">
  <div><span>01</span><b>Environment</b><p>Target-app exploration, task execution, resets, and interaction logging.</p></div>
  <div><span>02</span><b>Data</b><p>Human demonstrations, self-collected rollouts, feedback, hints, and memory traces.</p></div>
  <div><span>03</span><b>Policy</b><p>Prompted agents, SFT, reinforcement learning, and context-management actions.</p></div>
  <div><span>04</span><b>Evaluation</b><p>Online task success, pass@k, progressive scrutiny, and failure taxonomies.</p></div>
  <div><span>05</span><b>System</b><p>Reproducible pipelines that connect exploration, learning, evaluation, and deployment.</p></div>
</div>

<div class="takeaway interview-takeaway"><b>My working style:</b> identify a capability bottleneck, build the substrate that makes it measurable, then close the loop with data and policy improvement.</div>

---

# Research Arc: One Question, Five Steps

<div class="arc">
  <div class="arc-item survey">
    <span>01</span>
    <b>Understand the field</b>
    <p>Build a technical map of frameworks, data, evaluation, and open problems.</p>
  </div>
  <div class="arc-item learn">
    <span>02</span>
    <b>Learn from examples</b>
    <p>Use a few human examples to adapt to unseen apps and long-tail workflows.</p>
  </div>
  <div class="arc-item bench">
    <span>03</span>
    <b>Measure memory</b>
    <p>Turn short- and long-term memory into measurable agent capabilities.</p>
  </div>
  <div class="arc-item forge">
    <span>04</span>
    <b>Adapt without labels</b>
    <p>Convert exploration, rollouts, hierarchical feedback, and hints into policy updates.</p>
  </div>
  <div class="arc-item agent">
    <span>05</span>
    <b>Build memory into the policy</b>
    <p>Make proactive context management a learnable part of an end-to-end policy.</p>
  </div>
</div>

<p class="bottom-note">The through-line: move from describing the field to building agents that can adapt, retain experience, and execute reliably.</p>

---
layout: intro
section: Survey
---

# 01. Surveying the Field

<p class="section-subtitle">LLM-Powered GUI Agents in Phone Automation: Surveying Progress and Prospects</p>
<p class="section-meta">TMLR 2025 · 64 citations · 175 GitHub stars</p>

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
<p class="section-meta">ACL 2026 · 40 citations · 48 GitHub stars</p>

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
    <div class="research-question"><b>Research question</b><span>Can a mobile agent convert only a few human trajectories into reusable knowledge for unseen tasks and apps?</span></div>
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
<p class="section-meta">ACM MM 2026 · 17 citations · 48 GitHub stars</p>

---

# Core Problem: Existing Benchmarks Under-Test Memory

<div class="image-two-col">
  <div>
    <p class="lead">Mobile tasks carry facts across screens, apps, and attempts, but prior benchmarks contain few memory-intensive tasks.</p>
    <div class="metric-row">
      <div><b>128</b><span>tasks</span></div>
      <div><b>26</b><span>apps</span></div>
      <div><b>89.8%</b><span>memory-challenging tasks</span></div>
    </div>
    <ul class="clean-list compact-list">
      <li><b>Short-term memory:</b> retain and use facts within one task.</li>
      <li><b>Long-term memory:</b> improve across attempts; pass@1 vs. pass@k separates execution from experience reuse.</li>
    </ul>
    <div class="research-question"><b>Research question</b><span>How can we isolate, measure, and diagnose memory in dynamic mobile environments?</span></div>
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
    <p>Seven failure categories, including five memory-specific modes, turn scores into design targets.</p>
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
<p class="section-meta">Preprint 2026 · 76 GitHub stars · Covered by Synced China</p>

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
    <div class="research-question"><b>Research question</b><span>Can agents ground tasks in target apps, generate fine-grained feedback, and improve from self-collected experience without human annotations?</span></div>
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

# Insight: Evaluation Becomes Part of Learning

<div class="insight-flow">
  <div><span>1</span><b>Explore</b><p>Discover reachable app states and functions.</p></div>
  <div><span>2</span><b>Challenge</b><p>Generate curricula near the current capability frontier.</p></div>
  <div><span>3</span><b>Diagnose</b><p>Combine outcomes, process feedback, and corrective hints.</p></div>
  <div><span>4</span><b>Improve</b><p>Turn useful local decisions into policy updates.</p></div>
</div>

<div class="bridge compact-bridge">
  <div class="bridge-left">
    <h2>A data flywheel needs more than reward.</h2>
    <p>Task generation, rollout evaluation, failure analysis, and policy optimization must share the same grounded environment.</p>
  </div>
  <div class="bridge-right">
    <div><b>Contribution</b><span>MobileGym + HiFPO form an annotation-free adaptation substrate.</span></div>
    <div><b>General insight</b><span>Evaluator design determines what experience an agent can learn from.</span></div>
  </div>
</div>

---
layout: intro
section: MemGUI-Agent
---

# 05. End-to-End Long-Horizon Agents

<p class="section-subtitle">MemGUI-Agent: An End-to-End Long-Horizon Mobile GUI Agent with Proactive Context Management</p>
<p class="section-meta">Preprint 2026 · 88 GitHub stars · Covered by QbitAI</p>

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

# Insight: Memory Must Change Future Action

<div class="memory-insight-layout">
  <div class="memory-principle">
    <span>Core principle</span>
    <h2>Useful memory is not stored text. It is information the policy can decide to write, compress, retrieve, and act on.</h2>
  </div>
  <div class="memory-lessons">
    <div><b>Policy ownership</b><p>The agent, not an external heuristic, decides when context should change.</p></div>
    <div><b>Structured supervision</b><p>Step intent and UI facts make context actions trainable and auditable.</p></div>
    <div><b>Transfer</b><p>A memory protocol learned on one benchmark can generalize to new long-horizon tasks.</p></div>
  </div>
</div>

---
layout: intro
section: Synthesis
---

# Synthesis

<p class="section-subtitle">From five projects to a reusable research and engineering stack</p>

---

# A Coherent Technical Stack

<div class="stack-grid">
  <div><span>Survey</span><b>Problem framing</b><p>Taxonomy, trends, capability gaps, and research questions.</p></div>
  <div><span>LearnAct</span><b>Few-shot learning</b><p>Demonstration parsing, retrieval, and action execution.</p></div>
  <div><span>MemGUI-Bench</span><b>Evaluation science</b><p>Memory-centric task design and progressive LLM-as-judge.</p></div>
  <div><span>MobileForge</span><b>Training loop</b><p>Annotation-free task generation, feedback, hints, and GRPO.</p></div>
  <div><span>MemGUI-Agent</span><b>Agent architecture</b><p>Context-as-Action and learned proactive context management.</p></div>
</div>

---

# How I Can Contribute to an Industry Research Team

<div class="two-column-cards">
  <div>
    <h3>Own the full research loop</h3>
    <p>Move from question formulation to environment construction, data generation, model training, evaluation, and analysis.</p>
  </div>
  <div>
    <h3>Build reliable agent infrastructure</h3>
    <p>Develop interaction environments, scalable rollout pipelines, trajectory tooling, and automated evaluators for real applications.</p>
  </div>
  <div>
    <h3>Turn failures into training signals</h3>
    <p>Translate agent errors into benchmarks, feedback, curricula, SFT data, and reinforcement-learning objectives.</p>
  </div>
  <div>
    <h3>Bridge research and deployment</h3>
    <p>Work across research prototypes and real product workflows, with experience at vivo AI Lab and Kuaishou Technology.</p>
  </div>
</div>

<div class="fit-strip"><b>Best fit:</b><span>computer-use agents</span><span>agent post-training</span><span>self-evolving systems</span><span>memory and long-horizon autonomy</span><span>agent evaluation</span></div>

---

# Research Agenda: Beyond Mobile Apps

<div class="agenda">
  <div>
    <b>1. Universal action models</b>
    <p>Transfer perception, reasoning, and tool-use policies across mobile, web, desktop, and hybrid software workflows.</p>
  </div>
  <div>
    <b>2. Verifiable self-evolution</b>
    <p>Use grounded exploration, adaptive curricula, and hierarchical critics so improvement is continuous and measurable.</p>
  </div>
  <div>
    <b>3. Experience-native memory</b>
    <p>Unify working context, episodic experience, skill abstraction, retrieval, and forgetting inside the agent loop.</p>
  </div>
  <div>
    <b>4. Trustworthy digital autonomy</b>
    <p>Treat verification, privacy, controllability, cost, and human oversight as first-order research variables.</p>
  </div>
</div>

<div class="agenda-note">Mobile GUI agents are the starting point, not the boundary: the broader target is reliable agency across the digital world.</div>

---

# Why This Research Direction Matters

<div class="closing">
  <p class="closing-kicker">My research thesis</p>
  <h1>The next useful agents will not only follow instructions. They will learn from interaction, preserve the right experience, and improve safely in the environments where people work.</h1>
  <p>My five first-author projects build toward that goal through problem framing, demonstration learning, memory evaluation, annotation-free post-training, and context-native agent architecture.</p>
  <div class="closing-grid">
    <span>Strong research questions</span>
    <span>End-to-end execution</span>
    <span>Evidence-driven iteration</span>
    <span>Research-to-product experience</span>
  </div>
  <div class="closing-contact"><b>Guangyi Liu</b><span>guangyiliu@zju.edu.cn</span><span>lgy0404.github.io</span></div>
</div>
