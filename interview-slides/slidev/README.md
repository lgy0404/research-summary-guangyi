# Research Summary Slides

Version-controlled Slidev presentations for Guangyi Liu's research talks.

## Decks

- `interview-slides/`: English research interview deck for research internships and talent programs.
- Future proposal and dissertation-defense decks can live in sibling directories.

## Usage

```bash
npm install
npm run dev
npm run build
npm run export
```

The source deck is `interview-slides/slides.md`; deck-specific styles and assets are kept beside it.

## Repository Convention

Each presentation lives in its own top-level folder and owns its Markdown, styles, and curated assets. Raw LaTeX projects and large intermediate renderings stay outside this repository; only presentation-ready figures are versioned.

Generated files are written to `interview-slides/dist/` and are intentionally ignored. The current interview deck contains 41 slides and follows this narrative:

1. Candidate profile, industry experience, and research thesis.
2. Survey, LearnAct, MemGUI-Bench, MobileForge, and MemGUI-Agent.
3. Cross-project synthesis, industry-team fit, and forward research agenda.
