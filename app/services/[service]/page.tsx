import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Define the service data
const services = {
  towing: {
    title: "Towing Service",
    description:
      "Professional towing service for all vehicle types. We'll get you to the nearest repair facility or your preferred location.",
    icon: "🚚",
    color: "bg-blue-100 dark:bg-blue-900",
    longDescription:
      "Our professional towing service is designed to safely transport your vehicle when it breaks down or is involved in an accident. Our fleet of tow trucks can handle vehicles of all sizes, from motorcycles to large SUVs and trucks. We offer both local and long-distance towing options to get your vehicle exactly where it needs to go.",
    features: [
      "Available 24/7 for emergency towing",
      "Flatbed towing for damage-free transport",
      "Wheel-lift towing for quick service",
      "Motorcycle towing specialists",
      "Towing for all vehicle types and sizes",
      "GPS-tracked service vehicles for accurate ETAs",
    ],
    faqs: [
      {
        question: "How far can you tow my vehicle?",
        answer:
          "Our standard membership plans include towing up to 5-10 miles depending on your plan. Premium members receive up to 100 miles of towing per service call. Additional mileage is available at preferred member rates.",
      },
      {
        question: "How long will it take for a tow truck to arrive?",
        answer:
          "Our average response time is 30-45 minutes in urban areas and 45-60 minutes in rural areas. During severe weather or high-volume periods, wait times may be longer. Premium members receive priority dispatch.",
      },
      {
        question: "Can you tow my vehicle if I'm not with it?",
        answer:
          "Yes, we can tow an unattended vehicle with proper authorization and documentation. You'll need to provide proof of ownership and sign a release form electronically.",
      },
    ],
  },
  battery: {
    title: "Battery Jump-Start",
    description: "Dead battery? Our technicians will jump-start your vehicle and get you back on the road quickly.",
    icon: "🔋",
    color: "bg-green-100 dark:bg-green-900",
    longDescription:
      "Our battery jump-start service provides a quick solution when your vehicle won't start due to a drained or weak battery. Our trained technicians use professional-grade equipment to safely jump-start your vehicle without damaging its electrical system. We'll also perform a basic battery test to help determine if your battery needs replacement.",
    features: [
      "Professional-grade jump starters and equipment",
      "Basic battery and charging system test",
      "Available 24/7 for emergency assistance",
      "Works with all vehicle types including hybrid vehicles",
      "Technicians trained in modern vehicle electrical systems",
      "Battery replacement service available if needed",
    ],
    faqs: [
      {
        question: "Will jump-starting damage my car's electronics?",
        answer:
          "No, our technicians use professional equipment and follow manufacturer-recommended procedures to safely jump-start your vehicle without damaging sensitive electronics.",
      },
      {
        question: "How do I know if I need a new battery or just a jump-start?",
        answer:
          "Our technicians will perform a basic battery test after jump-starting your vehicle. This will help determine if your battery is holding a charge or needs replacement. We can provide battery replacement service on the spot if needed.",
      },
      {
        question: "Can you jump-start hybrid or electric vehicles?",
        answer:
          "Yes, our technicians are trained to work with hybrid vehicles which may need a jump-start for their 12V systems. For fully electric vehicles, we provide appropriate assistance based on manufacturer guidelines or towing to a charging station if necessary.",
      },
    ],
  },
  tire: {
    title: "Flat Tire Change",
    description:
      "We'll replace your flat tire with your spare tire, or tow your vehicle to the nearest repair facility.",
    icon: "🛞",
    color: "bg-yellow-100 dark:bg-yellow-900",
    longDescription:
      "Our flat tire change service provides quick roadside assistance when you experience a flat tire. Our skilled technicians will safely replace your flat tire with your vehicle's spare tire, allowing you to continue your journey. If your spare tire is unavailable or also damaged, we can arrange towing to the nearest tire repair facility.",
    features: [
      "Professional tire changing equipment",
      "Proper torque application for lug nuts",
      "Basic inspection of other tires",
      "Proper disposal of damaged tire if requested",
      "Available 24/7 for emergency assistance",
      "Service for all passenger vehicles and light trucks",
    ],
    faqs: [
      {
        question: "What if I don't have a spare tire?",
        answer:
          "If you don't have a spare tire, or if your spare is also damaged, we can tow your vehicle to the nearest tire repair facility. Some premium membership plans include mobile tire repair service.",
      },
      {
        question: "Can you repair my flat tire on the spot?",
        answer:
          "Our standard service includes changing your flat tire with your spare. For premium members, we offer mobile tire repair for simple punctures if the tire is otherwise in good condition.",
      },
      {
        question: "What if my lug nuts are stuck or I have wheel locks?",
        answer:
          "Our technicians have specialized tools to handle stuck lug nuts. If you have wheel locks, you'll need to provide the key. If the wheel cannot be removed safely, we'll arrange towing to a service facility.",
      },
    ],
  },
  fuel: {
    title: "Fuel Delivery",
    description: "Run out of gas? We'll deliver fuel to your location so you can reach the nearest gas station.",
    icon: "⛽",
    color: "bg-red-100 dark:bg-red-900",
    longDescription:
      "Our fuel delivery service brings emergency fuel directly to your location when you run out of gas. We deliver enough fuel to get you to the nearest gas station – typically 1-3 gallons depending on your vehicle and distance to the nearest station. We offer regular unleaded, premium unleaded, and diesel fuel options.",
    features: [
      "Emergency fuel delivery (gasoline or diesel)",
      "Available 24/7 for emergency assistance",
      "Delivery to any roadside location",
      "Enough fuel to reach nearest gas station",
      "No markup on fuel costs for premium members",
      "Fuel quality guaranteed",
    ],
    faqs: [
      {
        question: "How much fuel do you deliver?",
        answer:
          "We typically deliver 1-3 gallons of fuel, enough to get you to the nearest gas station. The exact amount depends on your vehicle type and distance to the nearest station.",
      },
      {
        question: "Do you charge for the fuel?",
        answer:
          "Yes, you pay for the cost of the fuel plus a delivery fee. Premium members receive fuel at cost with no delivery fee. The current price will be quoted when you call for service.",
      },
      {
        question: "What if I need diesel fuel?",
        answer:
          "We carry both regular unleaded gasoline and diesel fuel. Please specify which type you need when requesting service.",
      },
    ],
  },
  lockout: {
    title: "Lockout Assistance",
    description: "Locked your keys in your car? Our technicians will help you regain access to your vehicle.",
    icon: "🔑",
    color: "bg-purple-100 dark:bg-purple-900",
    longDescription:
      "Our lockout assistance service helps you regain access to your vehicle when you've locked your keys inside. Our trained technicians use specialized tools and techniques to safely unlock your vehicle without causing damage. We can handle traditional key locks as well as many electronic entry systems.",
    features: [
      "Non-destructive entry techniques",
      "Specialized tools for all vehicle makes and models",
      "Available 24/7 for emergency assistance",
      "Trained and certified technicians",
      "Service for both traditional and electronic locks",
      "ID verification required for security",
    ],
    faqs: [
      {
        question: "Will unlocking my car damage it?",
        answer:
          "Our technicians use specialized tools and non-destructive techniques to unlock your vehicle without causing damage. We're trained to work with various vehicle makes and models.",
      },
      {
        question: "Can you help if I lost my keys completely?",
        answer:
          "If you've lost your keys completely, we can still help you gain access to your vehicle. However, you'll need to arrange for a replacement key. For some premium members, we offer key replacement services.",
      },
      {
        question: "Do you need proof that it's my vehicle?",
        answer:
          "Yes, for security purposes, we require identification and proof of ownership or authorization to access the vehicle. This typically includes a driver's license and vehicle registration.",
      },
    ],
  },
  winching: {
    title: "Winching Service",
    description:
      "If your vehicle is stuck in mud, snow, or a ditch, our winching service will help get you back on the road.",
    icon: "🧵",
    color: "bg-orange-100 dark:bg-orange-900",
    longDescription:
      "Our winching service helps recover vehicles that are stuck in challenging situations such as mud, snow, sand, or ditches. Using powerful winches and professional recovery techniques, our skilled technicians can safely extract your vehicle and get you back on the road. We take care to prevent any additional damage to your vehicle during the recovery process.",
    features: [
      "Professional-grade winching equipment",
      "Trained recovery specialists",
      "Available 24/7 for emergency assistance",
      "Recovery from mud, snow, sand, and ditches",
      "Service for most passenger vehicles and light trucks",
      "Damage-prevention techniques",
    ],
    faqs: [
      {
        question: "How far can your winch reach?",
        answer:
          "Our standard winching equipment can reach up to 100 feet, allowing us to position our service vehicle on stable ground while recovering your vehicle from difficult terrain.",
      },
      {
        question: "What if my vehicle is too stuck for winching?",
        answer:
          "If standard winching cannot safely recover your vehicle, we'll discuss alternative options such as specialized recovery equipment or towing. We always prioritize preventing further damage to your vehicle.",
      },
      {
        question: "Is winching covered in my membership?",
        answer:
          "Basic winching is included in most membership plans if your vehicle is stuck within 10 feet of a paved or regularly maintained road. More complex recoveries may incur additional fees depending on your membership level.",
      },
    ],
  },
}

type ServiceParams = {
  params: {
    service: string
  }
}

export function generateMetadata({ params }: ServiceParams): Metadata {
  const service = services[params.service as keyof typeof services]

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found.",
    }
  }

  return {
    title: `${service.title} | Roadside Assistance`,
    description: service.description,
  }
}

export default function ServicePage({ params }: ServiceParams) {
  const serviceId = params.service
  const service = services[serviceId as keyof typeof services]

  if (!service) {
    notFound()
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className={`${service.color} p-6 rounded-lg mb-8 flex items-center gap-4`}>
          <span className="text-5xl">{service.icon}</span>
          <div>
            <h1 className="text-3xl font-bold">{service.title}</h1>
            <p className="text-lg">{service.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">About This Service</h2>
            <p className="text-lg mb-6">{service.longDescription}</p>

            <h3 className="text-xl font-semibold mb-3">Key Features</h3>
            <ul className="list-disc pl-5 mb-8 space-y-2">
              {service.features.map((feature, index) => (
                <li key={index} className="text-base">
                  {feature}
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold mb-3">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible className="mb-8">
              {service.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Need This Service?</h3>
                <div className="space-y-4">
                  <Link href="/service-request" className="w-full">
                    <Button className="w-full">Request Service Now</Button>
                  </Link>
                  <Link href="/emergency" className="w-full">
                    <Button variant="destructive" className="w-full">
                      Emergency SOS
                    </Button>
                  </Link>
                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-medium mb-2">Membership Benefits</h4>
                    <p className="text-sm mb-3">Members receive priority service and reduced rates.</p>
                    <Link href="/membership" className="w-full">
                      <Button variant="outline" className="w-full">
                        View Membership Plans
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6">
              <Image
                src={`/placeholder.svg?height=300&width=400&text=${service.title}`}
                alt={service.title}
                width={400}
                height={300}
                className="rounded-lg w-full"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center border-t pt-8">
          <Link href="/services">
            <Button variant="outline">← All Services</Button>
          </Link>
          <Link href="/service-request">
            <Button>Request This Service →</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
