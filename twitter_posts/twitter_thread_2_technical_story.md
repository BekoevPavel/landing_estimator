I built an AI estimation system where agents literally argue with each other

sounds dumb but it works way better than single-agent prompts

thread on the technical setup for anyone interested

---

the problem with using one LLM for estimates: it just agrees with everything

me: "can we do auth in 5 hours?"
AI: "sure!"

no pushback, no reality check

so I made agents that fight each other instead

---

the setup:

- 2 Flutter agents (one optimistic, one pessimistic about UI)
- 2 backend agents (same deal)
- risk analyst that's basically paranoid about everything
- orchestrator running on LangGraph to manage the chaos

each one has different system prompts so they actually disagree

---

here's what a debate looks like:

Agent 1: "auth is 5 hours, just use Firebase"
Agent 2: "we need biometric + JWT + OAuth, that's 20 hours minimum"

orchestrator averages it but weighs based on complexity signals

usually lands around 14 hours which ends up being... actually right?

---

stack:

LangGraph for multi-agent stuff (conditional routing is a lifesaver)
Claude Sonnet 4.5 as the LLM
Postgres for checkpointing state
Next.js frontend + FastAPI backend

the checkpoint thing is critical btw - agents need to remember context between rounds

---

the workflow is basically:

agents ask questions → I answer → they analyze complexity → if it's complex they break it down → then debate → orchestrator merges estimates

whole thing takes ~1 hour vs the full day we used to spend

---

GPT-4 was useless for this btw

kept giving me completely unhinged estimates like "build Instagram clone in 80 hours"

Claude actually understands technical debt, integration complexity, testing overhead... all the stuff that kills timelines

---

the best part is the decomposition

I ask for "authentication" and it breaks it down:
- Firebase integration (8h)
- custom JWT (12h)
- biometric (16h)
- testing (6h)

then you can approve/reject each piece

no more scope creep surprises

---

still figuring out:

- how to train it on your own past projects (RAG maybe?)
- should agents have experience levels that evolve?
- how to handle domain-specific complexity better

if you have ideas reply, I'm kind of making this up as I go

---

still building this, will post updates as I go

or build your own with LangGraph + Claude, the architecture isn't complicated

main thing: make the agents disagree, don't let them groupthink

follow if you want to see how this turns out
