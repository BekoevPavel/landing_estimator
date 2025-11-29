# Reddit Post: r/programming

**Title:** I built a multi-agent AI system that argues with itself to generate accurate software estimates (24x faster than manual)

---

## Post Body:

**TL;DR:** Spent 6 years hating estimation. Built AI agents that debate each other to produce realistic project timelines. Reduced estimation time from 1 day (4 people) to 1 hour (1 person). Accuracy improved from ~60% to ~94%.

---

## The Problem

I've been in software engineering for 6 years. Estimation has always been the worst part:

- **Overestimate** → lose the client
- **Underestimate** → burn out your team
- **Get it right** → pure luck

At my OutSource company, we'd spend entire days with 3-4 people trying to nail down project scopes. We'd still miss by weeks.

The stress was killing me. Every estimate felt like gambling with my reputation.

---

## The Failed First Attempt

I tried using ChatGPT as a "senior engineer with 10 years experience."

Spent 6 hours prompting, correcting, re-prompting. Got something... mediocre. Not realistic. Not detailed enough.

But I saw potential. What if AI could actually be GOOD at this?

---

## The Solution: Multi-Agent Conflict

Here's what I built:

### Architecture:
- **2 Flutter/Mobile agents** (argue about UI complexity)
- **2 Backend agents** (debate architecture choices)
- **1 Risk analyst** (paranoid guardian, always worst-case)
- **1 Orchestrator** (LangGraph-powered coordinator)

### Tech Stack:
- LangGraph for multi-agent orchestration
- Claude Sonnet 4.5 (tested against GPT-4, Claude wins for software)
- PostgreSQL for state checkpointing
- Next.js + FastAPI for the interface

---

## Why Multiple Agents?

**Single agent:**
"This'll take 5 hours"

**Multi-agent:**
- Agent 1: "5 hours for authentication? Easy."
- Agent 2: "BULLSHIT. You mentioned biometric + JWT + OAuth. That's 20 hours minimum."
- Risk Analyst: "Add 4 hours for edge cases."
- Orchestrator: *analyzes debate* → Final: 14 hours

**Conflict = accuracy.** Just like real code reviews.

---

## The Workflow

1. **Discovery:** AI agents ask domain-specific questions
   - Mobile agent asks about platforms, UI complexity
   - Backend asks about data models, APIs
   - QA asks about test coverage

2. **User answers** (2-3 rounds of Q&A)

3. **Complexity analysis:** AI scores each task (1-10)
   - High complexity? Auto-suggest decomposition

4. **Agent debate:** They argue over estimates
   - Real-time decomposition for complex tasks

5. **Final estimate:** Orchestrator synthesizes the debate

**Time:** ~1 hour
**Old way:** Full day + 3-4 people
**Improvement:** 24x productivity boost

---

## Key Learnings

### Claude Sonnet 4.5 > GPT-4 for estimation
I tested both extensively:

- **GPT-4:** Hallucinates scope, overly optimistic
- **Claude Sonnet 4.5:** Actually understands software complexity, API overhead, testing requirements

Example:
- **GPT-4:** "Build Instagram clone: 80 hours"
- **Claude:** "Authentication alone: 40 hours. Feed algorithm: 60 hours. Image processing: 50 hours. Let's decompose this."

Claude wins. Every time.

### Decomposition is Critical
Complex tasks get auto-flagged for decomposition:

**User input:** "Build authentication"

**AI suggests:**
- Firebase setup (8h)
- Custom JWT implementation (12h)
- Biometric integration (16h)
- Security testing (6h)

This prevents scope creep disasters.

---

## Results

**Before (Manual):**
- 4 people × 1 day = 32 person-hours
- Accuracy: ~60%
- Stress level: 🔥🔥🔥

**After (AI):**
- 1 person × 1 hour = 1 person-hour
- Accuracy: ~94%
- Stress level: ☕️

---

## Open Questions

I'm still iterating on:

1. **Historical learning:** How to train on YOUR past projects?
2. **Agent personalities:** Should agents have "experience levels"?
3. **RAG integration:** Use vector DB for past estimation data?

Would love thoughts from the community.

---

## Try It / Build Your Own

I've shipped this as a product: [link to your tool]

But if you want to build your own:
- Use LangGraph for agent orchestration
- Claude Sonnet 4.5 for the LLM
- Make agents DISAGREE (critical!)
- Implement state checkpointing (for pause/resume)

The code is complex but the ROI is insane.

---

## Why I'm Sharing This

Estimation has been broken for decades. We've normalized:
- Missing deadlines by weeks
- Burning out teams
- Losing clients due to bad scoping

It doesn't have to be this way.

If AI can write code (Copilot), generate images (DALL-E), and pass the bar exam (GPT-4), it can definitely estimate software projects.

Let's stop suffering.

---

**Edit:** Wow, didn't expect this much interest. Answering questions in the comments!

**Edit 2:** For those asking about hallucination: that's why I use MULTIPLE agents that challenge each other. Single agent = hallucination. Multi-agent debate = grounding.
