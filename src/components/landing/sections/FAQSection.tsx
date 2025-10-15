import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion";
import { faqs } from "../data/faqs";

export function FAQSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-4xl md:text-5xl">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground">Everything you need to know</p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl px-6"
            >
              <AccordionTrigger className="hover:no-underline">
                <span className="text-left">{faq.q}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

