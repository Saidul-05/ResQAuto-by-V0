import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Video, BookOpen, Users, Download, ExternalLink } from "lucide-react"

export default function PartnerResourcesPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Partner Resources</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Access tools, guides, and resources to help you succeed as a RoadRescue partner.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {[
          {
            icon: <FileText className="h-8 w-8 text-primary" />,
            title: "Getting Started Guide",
            description: "Everything you need to know to begin your journey as a RoadRescue partner.",
            link: "/resources/getting-started",
          },
          {
            icon: <Video className="h-8 w-8 text-primary" />,
            title: "Training Videos",
            description: "Step-by-step video tutorials on using our platform and providing excellent service.",
            link: "/resources/training-videos",
          },
          {
            icon: <BookOpen className="h-8 w-8 text-primary" />,
            title: "Service Standards",
            description: "Learn about our service quality expectations and best practices.",
            link: "/resources/service-standards",
          },
          {
            icon: <Users className="h-8 w-8 text-primary" />,
            title: "Community Forum",
            description: "Connect with other partners to share experiences and advice.",
            link: "/resources/community",
          },
          {
            icon: <Download className="h-8 w-8 text-primary" />,
            title: "Marketing Materials",
            description: "Downloadable assets to help promote your partnership with RoadRescue.",
            link: "/resources/marketing",
          },
          {
            icon: <ExternalLink className="h-8 w-8 text-primary" />,
            title: "Partner Portal",
            description: "Access your account, manage jobs, and view earnings.",
            link: "/partner-login",
          },
        ].map((resource, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center gap-4">
              {resource.icon}
              <CardTitle>{resource.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{resource.description}</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href={resource.link}>Access Resource</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently Accessed Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>For Mechanics</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li>
                  <Link href="/resources/mechanic-handbook" className="flex items-center hover:text-primary">
                    <FileText className="h-5 w-5 mr-2" />
                    <span>Mechanic Partner Handbook</span>
                  </Link>
                </li>
                <li>
                  <Link href="/resources/tool-guides" className="flex items-center hover:text-primary">
                    <FileText className="h-5 w-5 mr-2" />
                    <span>Tool and Equipment Guides</span>
                  </Link>
                </li>
                <li>
                  <Link href="/resources/technical-bulletins" className="flex items-center hover:text-primary">
                    <FileText className="h-5 w-5 mr-2" />
                    <span>Technical Service Bulletins</span>
                  </Link>
                </li>
                <li>
                  <Link href="/resources/certification-programs" className="flex items-center hover:text-primary">
                    <FileText className="h-5 w-5 mr-2" />
                    <span>Certification Programs</span>
                  </Link>
                </li>
                <li>
                  <Link href="/resources/mechanic-app-guide" className="flex items-center hover:text-primary">
                    <FileText className="h-5 w-5 mr-2" />
                    <span>Mobile App User Guide</span>
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>For Service Providers</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li>
                  <Link href="/resources/provider-handbook" className="flex items-center hover:text-primary">
                    <FileText className="h-5 w-5 mr-2" />
                    <span>Service Provider Handbook</span>
                  </Link>
                </li>
                <li>
                  <Link href="/resources/fleet-management" className="flex items-center hover:text-primary">
                    <FileText className="h-5 w-5 mr-2" />
                    <span>Fleet Management Best Practices</span>
                  </Link>
                </li>
                <li>
                  <Link href="/resources/dispatch-system" className="flex items-center hover:text-primary">
                    <FileText className="h-5 w-5 mr-2" />
                    <span>Dispatch System Guide</span>
                  </Link>
                </li>
                <li>
                  <Link href="/resources/insurance-requirements" className="flex items-center hover:text-primary">
                    <FileText className="h-5 w-5 mr-2" />
                    <span>Insurance Requirements</span>
                  </Link>
                </li>
                <li>
                  <Link href="/resources/provider-portal-guide" className="flex items-center hover:text-primary">
                    <FileText className="h-5 w-5 mr-2" />
                    <span>Provider Portal Guide</span>
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="bg-muted rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Need Additional Support?</h2>
        <p className="text-center mb-6">
          Our partner support team is available 24/7 to assist you with any questions or concerns.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild>
            <Link href="/contact?type=partner">Contact Partner Support</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/resources/faq">View Partner FAQs</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
