import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ProviderFaqPage() {
  const faqs = [
    {
      question: "What types of service providers can partner with RoadRescue?",
      answer:
        "We partner with various types of roadside assistance providers, including towing companies, mobile mechanics, locksmith services, and specialized roadside assistance businesses. If you provide any service that helps stranded motorists, we'd love to talk to you.",
    },
    {
      question: "What are the requirements to become a RoadRescue service provider?",
      answer:
        "You must have a legitimate, registered business with proper insurance coverage. Your vehicles and equipment must meet our standards, and your staff must pass background checks. You'll also need to demonstrate reliability and quality service.",
    },
    {
      question: "How does RoadRescue assign jobs to service providers?",
      answer:
        "We use an intelligent dispatching system that considers provider location, availability, capabilities, and customer needs. When a job matches your profile, you'll receive a notification through our provider portal or app.",
    },
    {
      question: "What fees does RoadRescue charge service providers?",
      answer:
        "We operate on a commission-based model, taking a percentage of each completed job. The exact percentage varies based on service type and volume. There are no upfront fees or monthly charges to join our network.",
    },
    {
      question: "How quickly will I get paid for completed jobs?",
      answer:
        "We process payments weekly, with all earnings from the previous week deposited directly to your account every Friday. For high-volume providers, we offer more frequent payment options.",
    },
    {
      question: "Can I still maintain my own direct customers while working with RoadRescue?",
      answer:
        "Our partnership is non-exclusive. You're free to continue serving your existing customers and finding new ones through other channels.",
    },
    {
      question: "What technology do I need to work with RoadRescue?",
      answer:
        "You'll need smartphones or tablets for your drivers/technicians to run our mobile app. We also provide a web-based provider portal for managing your account, viewing job history, and handling payments.",
    },
    {
      question: "How does RoadRescue handle customer complaints?",
      answer:
        "We take customer feedback seriously and work collaboratively with our providers to resolve any issues. We have a fair dispute resolution process that considers both the customer's and provider's perspectives.",
    },
    {
      question: "Can I specify my service area and hours of availability?",
      answer:
        "Yes, you have complete control over your service area and hours of operation. You can update these at any time through our provider portal.",
    },
    {
      question: "What support does RoadRescue offer to service providers?",
      answer:
        "We provide 24/7 operational support, marketing assistance, business development resources, and regular performance feedback. Our goal is to help you grow your business while maintaining high service standards.",
    },
  ]

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Service Provider FAQs</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Find answers to common questions about partnering with RoadRescue as a service provider.
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
        <p className="mb-6">Ready to grow your business with RoadRescue?</p>
        <Button asChild size="lg">
          <Link href="/auth/register?role=provider">Become a Partner</Link>
        </Button>
      </div>
    </div>
  )
}
