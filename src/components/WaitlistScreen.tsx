import React from "react";
import { motion } from "motion/react";
import { CheckCircle2, MessageCircle, Gift, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function WaitlistScreen() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center px-6 py-12"
    >
      <div className="w-full max-w-2xl text-center">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mb-8"
        >
          <CheckCircle2 className="w-12 h-12 text-white" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-4"
        >
          Your AI-team is preparing
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground mb-12 max-w-lg mx-auto"
        >
          Thank you! Our AI-experts are finalizing your estimation. You're now on the early-access list. We'll notify you as soon as we launch.
        </motion.p>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-6 text-left group hover:border-primary/50 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="mb-2">Join Telegram Updates</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get exclusive behind-the-scenes updates and early feature previews
            </p>
            <Button variant="outline" className="w-full rounded-xl group-hover:border-primary">
              Join Community
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-6 text-left group hover:border-primary/50 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <h3 className="mb-2">Get 30% Off at Launch</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Exclusive early-bird discount for waitlist members
            </p>
            <Button className="w-full rounded-xl bg-gradient-to-r from-primary to-accent">
              Claim Discount
            </Button>
          </motion.div>
        </div>

        {/* Survey Link */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-secondary/50 rounded-xl p-6"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Help us build the perfect AI estimation tool for you
          </p>
          <Input
            type="text"
            placeholder="What feature matters most to you?"
            className="rounded-xl mb-3"
          />
          <Button variant="outline" size="sm" className="rounded-lg">
            Submit Feedback
          </Button>
        </motion.div>

        {/* Email Confirmation */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-sm text-muted-foreground"
        >
          Check your email for confirmation and next steps
        </motion.p>
      </div>
    </motion.section>
  );
}
