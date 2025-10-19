import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { CheckCircle2, Brain, Workflow, CheckCircle, X, BarChart3, Code2, Palette, TrendingUp, FileText, Clock, DollarSign, Shield } from "lucide-react";
import { Badge } from "../../ui/badge";
import { VIEWPORT_ONCE } from "../../../constants/animations";

const AGENT_ICONS = [BarChart3, Code2, Palette, TrendingUp];
const DELIVERABLE_ICONS = [FileText, Clock, DollarSign, Shield];

export function SolutionSection() {
  const { t } = useTranslation();
  
  const agents = t("landing.solution.agents", { returnObjects: true }) as Array<{
    name: string;
    role: string;
    detail: string;
  }>;

  const processSteps = t("landing.solution.process.steps", { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  const deliverables = t("landing.solution.deliverables.items", { returnObjects: true }) as Array<{
    title: string;
    features: string[];
  }>;

  const chatgptCons = t("landing.solution.comparisonExample.chatgpt.cons", { returnObjects: true }) as string[];
  const estimateFastFeatures = t("landing.solution.comparisonExample.estimateFast.features", { returnObjects: true }) as Array<{
    label: string;
    value: string;
  }>;

  const AGENT_COLORS = [
    "from-green-500 to-emerald-500",
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-orange-500 to-red-500",
  ];

  return (
    <>
      {/* Multi-Agent System */}
      <section id="how-it-works" className="py-24 px-6 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">
              {t("landing.solution.badge")}
            </Badge>
            <h2 className="mb-4 text-4xl md:text-5xl">
              {t("landing.solution.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("landing.solution.description")}
            </p>
          </div>

          {/* AI Agents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {agents.map((agent, index) => {
              const Icon = AGENT_ICONS[index];
              const color = AGENT_COLORS[index];
              return (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-6 hover:border-primary/50 transition-all group"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="mb-2">{agent.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{agent.role}</p>
                  <p className="text-xs text-muted-foreground/60 italic">"{agent.detail}"</p>
                </motion.div>
              );
            })}
          </div>

          {/* Process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-3xl p-8 md:p-12"
          >
            <h3 className="mb-8 text-center text-2xl">{t("landing.solution.process.title")}</h3>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {processSteps.map((step, index) => {
                const emojis = ["📝", "❓", "💬", "🔍", "📊"];
                return (
                  <div key={step.title} className="text-center flex-1 min-w-[140px] max-w-[180px]">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">{emojis[index]}</span>
                    </div>
                    <h4 className="mb-2 text-sm font-semibold">{step.title}</h4>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 pt-6 border-t border-primary/20 text-center">
              <p className="text-sm text-muted-foreground">
                {t("landing.solution.process.footer")}
              </p>
            </div>
          </motion.div>

          {/* What You Get */}
          <div className="mt-16">
            <h3 className="mb-8 text-center text-2xl">{t("landing.solution.deliverables.title")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {deliverables.map((item, index) => {
                const Icon = DELIVERABLE_ICONS[index];
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT_ONCE}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-6"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="mb-4">{item.title}</h4>
                    <ul className="space-y-2">
                      {item.features.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Example */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-4xl md:text-5xl">{t("landing.solution.comparisonExample.title")}</h2>
            <p className="text-xl text-muted-foreground">{t("landing.solution.comparisonExample.description")}</p>
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
                  <h3 className="text-xl">{t("landing.solution.comparisonExample.chatgpt.title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("landing.solution.comparisonExample.chatgpt.subtitle")}</p>
                </div>
              </div>
              <div className="bg-secondary/50 rounded-xl p-4 mb-4 text-sm">
                <p className="text-muted-foreground mb-2">
                  <strong>{t("landing.solution.comparisonExample.chatgpt.userPrompt")}</strong> {t("landing.solution.comparisonExample.chatgpt.userQuestion")}
                </p>
                <p>
                  <strong>{t("landing.solution.comparisonExample.chatgpt.response")}</strong> {t("landing.solution.comparisonExample.chatgpt.responseText")}
                </p>
              </div>
              <div className="space-y-2">
                {chatgptCons.map((con) => (
                  <div key={con} className="flex items-center gap-2 text-sm text-destructive">
                    <X className="w-4 h-4" />
                    {con}
                  </div>
                ))}
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
                  <h3 className="text-xl">{t("landing.solution.comparisonExample.estimateFast.title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("landing.solution.comparisonExample.estimateFast.subtitle")}</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                {estimateFastFeatures.map((feature) => (
                  <div key={feature.label} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>{feature.label}</strong> {feature.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-primary/20">
                <p className="text-sm text-center text-primary">
                  {t("landing.solution.comparisonExample.estimateFast.footer")}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
