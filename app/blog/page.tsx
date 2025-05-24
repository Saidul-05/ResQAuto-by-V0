import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const blogPosts = [
  {
    id: "post1",
    title: "Essential Items to Keep in Your Car for Emergencies",
    excerpt:
      "Being prepared for roadside emergencies can make a stressful situation much more manageable. Here's what you should always have in your vehicle.",
    date: "May 10, 2023",
    readTime: "5 min read",
    category: "Safety Tips",
    image: "/placeholder.svg?height=400&width=600&text=Emergency+Kit",
    author: {
      name: "Michael Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Safety Specialist",
    },
    slug: "essential-items-for-car-emergencies",
  },
  {
    id: "post2",
    title: "How to Change a Flat Tire: Step-by-Step Guide",
    excerpt:
      "Knowing how to change a flat tire is an essential skill for any driver. Follow our comprehensive guide to get back on the road quickly.",
    date: "April 22, 2023",
    readTime: "8 min read",
    category: "DIY Guides",
    image: "/placeholder.svg?height=400&width=600&text=Tire+Change",
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Lead Technician",
    },
    slug: "how-to-change-flat-tire",
  },
  {
    id: "post3",
    title: "Understanding Your Car Battery: Signs It Needs Replacement",
    excerpt:
      "Don't get stranded with a dead battery. Learn to recognize the warning signs that your car battery is nearing the end of its life.",
    date: "March 15, 2023",
    readTime: "6 min read",
    category: "Maintenance",
    image: "/placeholder.svg?height=400&width=600&text=Car+Battery",
    author: {
      name: "David Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Automotive Engineer",
    },
    slug: "car-battery-replacement-signs",
  },
  {
    id: "post4",
    title: "Winter Driving Safety: Preparing Your Vehicle for Cold Weather",
    excerpt:
      "Winter driving presents unique challenges. Here's how to prepare your vehicle to handle snow, ice, and freezing temperatures safely.",
    date: "February 5, 2023",
    readTime: "7 min read",
    category: "Seasonal Tips",
    image: "/placeholder.svg?height=400&width=600&text=Winter+Driving",
    author: {
      name: "Emily Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Safety Coordinator",
    },
    slug: "winter-driving-safety-tips",
  },
  {
    id: "post5",
    title: "The Future of Roadside Assistance: How Technology is Changing the Game",
    excerpt:
      "From GPS tracking to mobile apps and electric vehicle support, discover how technology is revolutionizing roadside assistance services.",
    date: "January 18, 2023",
    readTime: "9 min read",
    category: "Industry Trends",
    image: "/placeholder.svg?height=400&width=600&text=Tech+Innovations",
    author: {
      name: "James Taylor",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Technology Director",
    },
    slug: "future-of-roadside-assistance",
  },
  {
    id: "post6",
    title: "What to Do If You're Locked Out of Your Car",
    excerpt:
      "Being locked out of your car can be frustrating. Learn about the steps you can take and how professional lockout services can help.",
    date: "December 7, 2022",
    readTime: "4 min read",
    category: "Emergency Tips",
    image: "/placeholder.svg?height=400&width=600&text=Car+Lockout",
    author: {
      name: "Lisa Martinez",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Customer Service Manager",
    },
    slug: "what-to-do-locked-out-of-car",
  },
]

export default function BlogPage() {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Road Rescue Blog</h1>
        <p className="text-xl text-muted-foreground">
          Expert advice, tips, and insights to keep you safe and informed on the road.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Card key={post.id} className="flex flex-col overflow-hidden">
            <div className="relative h-48 w-full">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>
            <CardHeader className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{post.category}</Badge>
                <div className="text-xs text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {post.readTime}
                </div>
              </div>
              <CardTitle className="line-clamp-2">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </CardTitle>
              <CardDescription className="line-clamp-3 mt-2">{post.excerpt}</CardDescription>
            </CardHeader>
            <CardFooter className="border-t pt-4">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{post.author.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      {post.date}
                    </p>
                  </div>
                </div>
                <Link href={`/blog/${post.slug}`} className="text-primary hover:underline flex items-center text-sm">
                  Read more <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/blog/categories" className="text-primary hover:underline flex items-center justify-center">
          Browse all categories <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
