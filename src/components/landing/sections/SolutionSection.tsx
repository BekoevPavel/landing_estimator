import { motion } from "motion/react";
import { CheckCircle2, Brain, Workflow, CheckCircle, X } from "lucide-react";
import { Badge } from "../../ui/badge";
import { aiAgents } from "../data/aiAgents";
import { deliverables } from "../data/deliverables";
import { VIEWPORT_ONCE } from "../../../constants/animations";

export function SolutionSection() {
  return (
    <>
      {/* Multi-Agent System */}
      <section id="how-it-works" className="py-24 px-6 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">
              The Solution
            </Badge>
            <h2 className="mb-4 text-4xl md:text-5xl">
              Multi-Agent AI Team Works Like Senior Professionals
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Why is a team better than a single model? Because each agent is an expert in their area. 
              They discuss the project and find risks you might have missed.
            </p>
          </div>

          {/* AI Agents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {aiAgents.map((agent, index) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ delay: index * 0.1 }}
                className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-6 hover:border-primary/50 transition-all group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center mb-4`}>
                  <agent.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="mb-2">{agent.name}</h4>
                <p className="text-sm text-muted-foreground mb-2">{agent.role}</p>
                <p className="text-xs text-muted-foreground/60 italic">"{agent.detail}"</p>
              </motion.div>
            ))}
          </div>

          {/* Process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-3xl p-8 md:p-12"
          >
            <h3 className="mb-8 text-center text-2xl">How the AI Team Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📝</span>
                </div>
                <h4 className="mb-2">You Submit Brief</h4>
                <p className="text-sm text-muted-foreground">2-minute questionnaire</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤖</span>
                </div>
                <h4 className="mb-2">AI Team Analyzes</h4>
                <p className="text-sm text-muted-foreground">8 agents discuss project</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h4 className="mb-2">Report Generated</h4>
                <p className="text-sm text-muted-foreground">Detailed breakdown ready</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✅</span>
                </div>
                <h4 className="mb-2">You Send to Client</h4>
                <p className="text-sm text-muted-foreground">Impress with detail</p>
              </div>
            </div>
          </motion.div>

          {/* What You Get */}
          <div className="mt-16">
            <h3 className="mb-8 text-center text-2xl">What You Receive</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {deliverables.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="mb-4">{item.title}</h4>
                  <ul className="space-y-2">
                    {item.items.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Example */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-4xl md:text-5xl">Compare ChatGPT vs EstimateFast</h2>
            <p className="text-xl text-muted-foreground">See the difference in depth and accuracy</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ChatGPT */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT_ONCE}
              className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Brain className="w-8 h-8 text-muted-foreground" />
                <div>
                  <h3 className="text-xl">ChatGPT</h3>
                  <p className="text-sm text-muted-foreground">Single model response</p>
                </div>
              </div>
              <div className="bg-secondary/50 rounded-xl p-4 mb-4 text-sm">
                <p className="text-muted-foreground mb-2">
                  <strong>User:</strong> "Estimate a food delivery mobile app"
                </p>
                <p>
                  <strong>ChatGPT:</strong> "Such an app will take approximately 4-6 months 
                  with a team of 3-4 people. Cost: $80,000 - $120,000."
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <X className="w-4 h-4" />
                  No backlog
                </div>
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <X className="w-4 h-4" />
                  No risk analysis
                </div>
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <X className="w-4 h-4" />
                  No detailed breakdown
                </div>
              </div>
            </motion.div>

            {/* EstimateFast */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT_ONCE}
              className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Workflow className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl">EstimateFast</h3>
                  <p className="text-sm text-muted-foreground">Multi-agent analysis</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Backlog:</strong> 312 detailed tasks</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Timeline:</strong> 5.5 months by sprints</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Cost:</strong> $95,000 - $115,000 with breakdown</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Risks:</strong> 12 identified with mitigation</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Features:</strong> Auth, payments, tracking, admin panels</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Alternatives:</strong> Multiple approaches analyzed</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-primary/20">
                <p className="text-sm text-center text-primary">
                  See the difference? Try EstimateFast for free
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

