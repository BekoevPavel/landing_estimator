I've been doing software estimates for 6 years and honestly? Estimations is the worst part of this job

overestimate = client goes with someone cheaper
underestimate = I'm working weekends for free
get it right = nobody notices

anyway here's what I built to stop hating my life

---

so at my agency we had 3-4 people spending entire days on estimates

and we'd STILL miss deadlines by weeks

I thought maybe ChatGPT could help? spent like 6 hours with it and got completely useless numbers. but it made me think... what if I built something that actually worked

---

so I ended up building this weird AI team setup:

- 2 Flutter agents that argue with each other
- 2 backend agents that call out each other's BS
- a risk analyst (basically just pessimistic about everything)
- an orchestrator to stop them from infinite loops

the key is they disagree. one agent alone just says yes to everything

---

how it works:

the AI asks me questions about the project (like actual good questions, not "what's your timeline" bullshit)

I answer honestly

they debate for a bit and spit out estimates

takes about an hour vs the full day we used to spend

---

I tried this with GPT-4 first and it was terrible. kept giving me these fantasy numbers like "build auth system: 5 hours" lol

I switched to Claude Sonnet 4.5 and it actually gets it. understands edge cases, testing time, integration pain

night and day difference

---

anyway if you do estimates regularly this might save you a lot of pain

still building it out, will share updates here as I ship features

follow along if you're curious how it turns out

just stop doing this manually, it's 2025

---

what's the worst estimate you've ever given?

mine was "2 weeks" for something that took 3 months (and I knew it was wrong when I said it)
