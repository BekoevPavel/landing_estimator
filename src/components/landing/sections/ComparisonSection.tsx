import { motion } from "motion/react";
import { X, ArrowRight } from "lucide-react";
import { Button } from "../../ui/button";
import { comparison } from "../data/comparison";
import { VIEWPORT_ONCE } from "../../../constants/animations";

interface ComparisonSectionProps {
  onStartTest: () => void;
}

export function ComparisonSection({ onStartTest }: ComparisonSectionProps) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-4xl md:text-5xl">
            Why ChatGPT and Manual Estimates Don't Work
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Traditional methods fail because they lack specialization and depth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {comparison.map((item, index) => (
            <motion.div
              key={item.method}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT_ONCE}
              className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2">{item.method}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Problem:</strong> {item.problem}
                  </p>
                  <p className="text-sm text-destructive">
                    <strong>Result:</strong> {item.result}
                  </p>
                </div>
                <X className="w-5 h-5 text-destructive flex-shrink-0" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          className="mt-12 text-center"
        >
          <Button
            onClick={onStartTest}
            size="lg"
            className="px-8 py-6 rounded-2xl bg-gradient-to-r from-primary to-accent"
          >
            Try Multi-Agent Estimation
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

