import { motion } from "motion/react";
import { problems } from "../data/problems";
import { VIEWPORT_ONCE } from "../../../constants/animations";

export function ProblemsSection() {
  return (
    <section className="py-24 px-6 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-4xl md:text-5xl">Why Project Estimation Is Painful</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            You're not alone. Most developers and teams struggle with accurate project estimation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ delay: index * 0.1 }}
              className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-8"
            >
              <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center mb-6">
                <problem.icon className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="mb-2">{problem.title}</h3>
              <div className="text-4xl mb-2 text-primary">{problem.stat}</div>
              <p className="text-sm text-muted-foreground mb-4">{problem.description}</p>
              <blockquote className="text-sm italic border-l-2 border-primary pl-4 text-muted-foreground">
                "{problem.quote}"
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

