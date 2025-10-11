import { motion } from "motion/react";
import { Code2, Palette, BarChart3, TrendingUp, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface ResultScreenProps {
  onContinue: () => void;
}

const aiAgents = [
  {
    icon: Code2,
    name: "Engineer AI",
    role: "evaluates complexity",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Palette,
    name: "UX Designer AI",
    role: "maps user flow impact",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: BarChart3,
    name: "Product Manager AI",
    role: "aligns with business goals",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: TrendingUp,
    name: "Analyst AI",
    role: "calculates risk & probability",
    color: "from-orange-500 to-red-500",
  },
];

export default function ResultScreen({ onContinue }: ResultScreenProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center px-6 py-12"
    >
      <div className="w-full max-w-4xl">
        {/* Result Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mb-6"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="mb-4">Your Estimation Style — The Visionary</h1>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            You rely on intuition more than data. Our AI-team analyzed your approach and found optimization points. Your strength is seeing the big picture, but precision could be enhanced with AI-powered analysis.
          </p>
        </motion.div>

        {/* AI Team Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="mb-6 text-center text-muted-foreground">
            AI Experts Who Analyzed Your Profile
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiAgents.map((agent, index) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl blur-xl"
                  style={{
                    background: `linear-gradient(to bottom right, var(--primary), var(--accent))`,
                  }}
                />
                <div className="relative bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center flex-shrink-0`}>
                      <agent.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-1">{agent.name}</h4>
                      <p className="text-sm text-muted-foreground">{agent.role}</p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center"
        >
          <Button
            onClick={onContinue}
            size="lg"
            className="px-8 py-6 rounded-2xl bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
          >
            Get Full Project Estimate
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            See how our complete AI team would estimate your next project
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
