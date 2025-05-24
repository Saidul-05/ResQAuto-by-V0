import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

const faqCategories = [
  {
    id: "general",
    label: "General",
    faqs: [
      {
        question: "What is RoadRescue?",
        answer:
          "RoadRescue is a nationwide roadside assistance service provider that helps motorists with emergencies such as flat tires, dead batteries, lockouts, and towing. We offer 24/7 service with fast response times and professional technicians.",
      },
      {
        question: "How do I request roadside assistance?",
        answer:
          "You can request assistance through our mobile app, website, or by calling our 24/7 emergency hotline. Members can also use our SMS service by texting 'HELP' to our service number.",
      },
      {
        question: "Do I need to be a member to use your services?",
        answer:
          "No, we provide services to both members and non-members. However, members enjoy benefits such as priority service, discounted or free services depending on their membership plan, and additional perks.",
      },
      {
        question: "What areas do you service?",
        answer:
          "RoadRescue provides nationwide coverage across all 50 states. Our network of service providers ensures we can reach you wherever you are, though response times may vary in remote locations.",
      },
      {
        question: "How quickly can I expect help to arrive?",
        answer:
          "Our average response time is 15-30 minutes in urban and suburban areas. Response times may be longer in rural or remote locations or during severe weather conditions. Premium members receive priority dispatch.",
      },
    ],
  },
  {
    id: "membership",
    label: "Membership",
    faqs: [
      {
        question: "What membership plans do you offer?",
        answer:
          "We offer three main membership plans: Basic, Premium, and Family. Each plan provides different levels of coverage and benefits to suit various needs and budgets.",
      },
      {
        question: "What's included in the Basic membership?",
        answer:
          "Basic membership includes 24/7 roadside assistance, flat tire service, battery jump start, lockout service, 5 miles of free towing, and fuel delivery (cost of fuel extra). It covers a single vehicle.",
      },
      {
        question: "What's included in the Premium membership?",
        answer:
          "Premium membership includes everything in Basic, plus 25 miles of free towing, winching service, free fuel delivery, trip interruption benefits, and rental car discounts. It covers a single vehicle.",
      },
      {
        question: "What's included in the Family membership?",
        answer:
          "Family membership includes everything in Premium, plus coverage for up to 4 vehicles, 50 miles of free towing, extended trip interruption benefits, hotel discounts, and identity theft protection.",
      },
      {
        question: "How do I cancel my membership?",
        answer:
          "You can cancel your membership by logging into your account on our website, contacting our customer service team, or sending a written request. Refunds are prorated based on the unused portion of your membership term.",
      },
    ],
  },
  {
    id: "services",
    label: "Services",
    faqs: [
      {
        question: "What should I do if I have a flat tire?",
        answer:
          "If you have a flat tire, pull over to a safe location away from traffic. Request assistance through our app, website, or by calling our emergency hotline. Our technician will either change your tire with your spare or tow your vehicle to a repair facility if needed.",
      },
      {
        question: "What if my car won't start?",
        answer:
          "If your car won't start, it could be due to a dead battery, starter issues, or other mechanical problems. Request assistance, and our technician will diagnose the issue. We can provide jump starts, battery testing, and towing services if needed.",
      },
      {
        question: "What do I do if I'm locked out of my vehicle?",
        answer:
          "If you're locked out, request lockout assistance through our app, website, or emergency hotline. Our technicians use specialized tools to safely unlock your vehicle without causing damage. Please have your ID ready to verify vehicle ownership.",
      },
      {
        question: "How does the towing service work?",
        answer:
          "When you request a tow, we'll dispatch a tow truck to your location. The driver will secure your vehicle and transport it to your preferred destination within your plan's mileage limit. Additional mileage fees apply beyond your plan's coverage.",
      },
      {
        question: "What if I run out of gas?",
        answer:
          "If you run out of fuel, request fuel delivery service. Our technician will bring enough fuel to get you to the nearest gas station. Basic members pay for the cost of fuel, while Premium and Family members receive the fuel at no additional cost.",
      },
    ],
  },
  {
    id: "billing",
    label: "Billing",
    faqs: [
      {
        question: "How does billing work for memberships?",
        answer:
          "Memberships are billed either monthly or annually, depending on your preference. Annual memberships offer a discount compared to monthly billing. We accept all major credit cards and can set up automatic renewals for your convenience.",
      },
      {
        question: "What if I need service but I'm not a member?",
        answer:
          "Non-members can use our services on a pay-per-use basis. We accept credit cards, debit cards, and digital payment methods. The cost depends on the specific service needed and your location.",
      },
      {
        question: "Are there any hidden fees?",
        answer:
          "We pride ourselves on transparent pricing. Your membership covers the services outlined in your plan. Additional fees may apply for services beyond your plan's coverage, such as extended towing distances or specialized equipment needs.",
      },
      {
        question: "Can I get a refund if I'm not satisfied?",
        answer:
          "We offer a 30-day satisfaction guarantee for new members. If you're not satisfied with our service within the first 30 days, you can request a full refund. After 30 days, refunds are prorated based on the unused portion of your membership.",
      },
      {
        question: "Do you offer discounts for multiple vehicles?",
        answer:
          "Yes, our Family plan covers up to 4 vehicles at a discounted rate compared to individual memberships. We also offer special rates for businesses with multiple vehicles and fleet services.",
      },
    ],
  },
  {
    id: "technical",
    label: "Technical",
    faqs: [
      {
        question: "How do I update my vehicle information?",
        answer:
          "You can update your vehicle information by logging into your account on our website or mobile app. Navigate to the 'My Vehicles' section and select 'Edit' or 'Add Vehicle' to make changes or additions.",
      },
      {
        question: "What if the app isn't working?",
        answer:
          "If you're experiencing issues with our app, try closing and reopening it, or check for updates. You can always request service through our website or by calling our emergency hotline if the app is unavailable.",
      },
      {
        question: "How accurate is the ETA shown in the app?",
        answer:
          "Our ETAs are calculated based on real-time traffic conditions and the availability of nearby service providers. While we strive for accuracy, ETAs are estimates and may change due to unforeseen circumstances like traffic or weather conditions.",
      },
      {
        question: "Can I track my technician's location?",
        answer:
          "Yes, once a technician is dispatched to your location, you can track their real-time location through our mobile app. This feature helps you know exactly when help will arrive.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Yes, we use industry-standard encryption and security protocols to protect your payment information. We are PCI compliant and never store complete credit card information on our servers.",
      },
    ],
  },
]

export default function FAQsPage() {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground">
          Find answers to common questions about our roadside assistance services and membership plans.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
            {faqCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {faqCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <Accordion type="single" collapsible className="w-full">
                {category.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12 p-6 bg-muted rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-4">Still have questions?</h3>
          <p className="mb-6">
            Our customer support team is available 24/7 to assist you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/support">Visit Support Center</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
