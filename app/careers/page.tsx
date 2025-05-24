import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Clock, DollarSign } from "lucide-react"
import Link from "next/link"

const jobOpenings = [
  {
    id: "job1",
    title: "Roadside Assistance Technician",
    location: "Multiple Locations",
    type: "Full-time",
    salary: "$40,000 - $55,000",
    description: "Join our team of skilled technicians providing emergency roadside assistance to customers in need.",
    requirements: [
      "Valid driver's license with clean driving record",
      "1+ years experience in automotive repair or roadside assistance",
      "Available to work flexible hours including nights and weekends",
      "Strong customer service skills",
    ],
  },
  {
    id: "job2",
    title: "Customer Service Representative",
    location: "Remote",
    type: "Full-time",
    salary: "$35,000 - $45,000",
    description:
      "Handle incoming calls from customers requiring roadside assistance and coordinate with our technicians.",
    requirements: [
      "Previous customer service experience",
      "Excellent communication skills",
      "Ability to remain calm under pressure",
      "Computer proficiency",
    ],
  },
  {
    id: "job3",
    title: "Regional Operations Manager",
    location: "Various Cities",
    type: "Full-time",
    salary: "$65,000 - $85,000",
    description:
      "Oversee roadside assistance operations in your assigned region, managing technicians and ensuring quality service.",
    requirements: [
      "5+ years in operations management, preferably in automotive or service industry",
      "Strong leadership and team management skills",
      "Experience with scheduling and resource allocation",
      "Bachelor's degree in business or related field preferred",
    ],
  },
  {
    id: "job4",
    title: "Marketing Specialist",
    location: "Headquarters - Chicago, IL",
    type: "Full-time",
    salary: "$50,000 - $65,000",
    description: "Develop and implement marketing strategies to grow our membership base and brand awareness.",
    requirements: [
      "3+ years marketing experience",
      "Experience with digital marketing campaigns",
      "Strong analytical skills",
      "Bachelor's degree in Marketing or related field",
    ],
  },
]

export default function CareersPage() {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Join Our Team</h1>
        <p className="text-xl text-muted-foreground">
          Help us provide exceptional roadside assistance services to people in need across the country.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-6">Why Work With Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Competitive Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We offer comprehensive health insurance, 401(k) with company match, paid time off, and employee
                discounts.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Career Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We believe in promoting from within and provide training and development opportunities to help you
                advance.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Work-Life Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <p>We understand the importance of balance and offer flexible scheduling options when possible.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Make a Difference</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Every day, you'll help people in stressful situations get back on the road safely.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Current Openings</h2>
      <div className="space-y-6">
        {jobOpenings.map((job) => (
          <Card key={job.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
              <CardDescription className="flex flex-col sm:flex-row sm:gap-6 text-sm mt-2">
                <span className="flex items-center">
                  <MapPin className="mr-1 h-4 w-4" /> {job.location}
                </span>
                <span className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" /> {job.type}
                </span>
                <span className="flex items-center">
                  <DollarSign className="mr-1 h-4 w-4" /> {job.salary}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{job.description}</p>
              <div className="mb-4">
                <h4 className="font-medium mb-2">Requirements:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
              <Button>Apply Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold mb-4">Don't see a position that fits your skills?</h3>
        <p className="mb-6">
          We're always looking for talented individuals to join our team. Send us your resume and we'll keep it on file
          for future opportunities.
        </p>
        <Button asChild>
          <Link href="/contact?subject=Career Inquiry">Submit Your Resume</Link>
        </Button>
      </div>
    </div>
  )
}
