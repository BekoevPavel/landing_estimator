import { motion } from "motion/react";
import { testimonials } from "../data/testimonials";
import { VIEWPORT_ONCE } from "../../../constants/animations";

export function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-4xl md:text-5xl">What Users Say About EstimateFast</h2>
          <p className="text-xl text-muted-foreground">Real stories from developers and teams</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ delay: index * 0.1 }}
              className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-8"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-primary">⭐</span>
                ))}
              </div>
              <p className="mb-6 text-muted-foreground italic">"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-white">{testimonial.name[0]}</span>
                </div>
                <div>
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

