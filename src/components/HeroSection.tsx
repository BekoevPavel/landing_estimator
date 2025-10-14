import React from "react";
import { motion } from "motion/react";
import { Sparkles, Users, Zap } from "lucide-react";
import { Button } from "./ui/button";

interface HeroSectionProps {
  onStart: () => void;
  key?: string;
}

export default function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">AI-Powered Project Estimation</span>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6 text-5xl md:text-7xl tracking-tight bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent"
        >
          Get your project estimated by a full AI team — in 2 minutes
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12 max-w-2xl mx-auto text-muted-foreground"
        >
          Discover how senior engineers, designers, and PMs would value your idea. Our AI team analyzes your project with near-human accuracy.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <Button
            onClick={onStart}
            size="lg"
            className="px-8 py-6 rounded-2xl bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
          >
            Start the Test
            <Zap className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full" />
            No signup needed
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full" />
            Takes 60 seconds
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full" />
            AI-powered accuracy
          </div>
        </motion.div>

        {/* Visual Team Representation */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-24 flex items-center justify-center gap-4"
        >
          <div className="relative">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 backdrop-blur-sm border border-border flex items-center justify-center"
                style={{
                  left: `${i * 40}px`,
                  zIndex: 5 - i,
                }}
              >
                <Users className="w-5 h-5 text-primary" />
              </motion.div>
            ))}
          </div>
          <div className="ml-52 text-left">
            <p className="text-sm text-muted-foreground">
              Meet your AI team
            </p>
            <p className="text-xs text-muted-foreground/60">
              5 expert AI agents ready to estimate
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
