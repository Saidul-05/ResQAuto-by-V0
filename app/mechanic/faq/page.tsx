import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function MechanicFaqPage() {
  const faqs = [
    {
      question: "What qualifications do I need to become a RoadRescue mechanic?",
      answer:
        "We require our mechanics to have at least 1 year of professional experience in automotive repair or roadside assistance. Certifications such as ASE are preferred but not required. You'll need to pass our background check and have a valid driver's license.",
    },
    {
      question: "How much can I earn as a RoadRescue mechanic?",
      answer:
        "Earnings vary based on your location, availability, and the number of jobs you complete. Our mechanics typically earn between $25-$50 per hour, with opportunities for bonuses during high-demand periods.",
    },
    {
      question: "What equipment do I need to provide?",
      answer:
        "You'll need to have your own basic tools and equipment for common roadside services like jump starts, tire changes, and minor repairs. For specialized services, additional equipment may be required.",
    },
    {
      question: "How does the job assignment process work?",
      answer:
        "When a customer requests service in your area, you'll receive a notification through our app. You can choose to accept or decline the job based on your availability. Once accepted, you'll get the customer's location and details about their issue.",
    },
    {
      question: "How often will I get paid?",
      answer:
        "We process payments weekly. All earnings from the previous week are deposited directly to your bank account every Friday.",
    },
    {
      question: "Do I need my own insurance?",
      answer:
        "Yes, you'll need to maintain your own commercial auto insurance and liability insurance. We provide additional coverage while you're actively working on RoadRescue jobs.",
    },
    {
      question: "Can I work part-time or set my own hours?",
      answer:
        "You have complete flexibility to set your own schedule. You can work full-time, part-time, weekends only, or whenever it suits you. Simply toggle your availability in the app.",
    },
    {
      question: "What areas can I service?",
      answer:
        "When you sign up, you'll set your primary service area. You can adjust this at any time, and you can also temporarily expand your service area when needed.",
    },
    {
      question: "How long does the application process take?",
      answer:
        "The typical application process takes 1-2 weeks, including background checks and verification of credentials. Once approved, you can start accepting jobs immediately.",
    },
    {
      question: "What support does RoadRescue provide to mechanics?",
      answer:
        "We provide 24/7 support for any issues you encounter on the job. We also offer training resources, professional development opportunities, and regular feedback to help you improve your service quality.",
    },
  ]

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Mechanic FAQs</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Find answers to common questions about becoming a RoadRescue mechanic.
        </p>
      </div>

      <div className="max-w-3xl mx-auto mb-12">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="text-center">
        <p className="mb-6">Ready to join our team of professional mechanics?</p>
        <Button asChild size="lg">
          <Link href="/auth/register?role=mechanic">Apply Now</Link>
        </Button>
      </div>
    </div>
  )
}
