"use client"

import Link from "next/link"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Loader2, Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      })

      // Reset form
      const form = e.target as HTMLFormElement
      form.reset()
    }, 1500)
  }

  return (
    <div className="container py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Contact Us</h1>
        <p className="mt-4 text-muted-foreground text-lg">
          Have questions or feedback? We're here to help. Reach out to our team through any of the channels below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto p-3 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Phone className="h-7 w-7 text-primary" />
            </div>
            <CardTitle>Call Us</CardTitle>
            <CardDescription>Speak directly with our team</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="font-bold text-lg">General Inquiries</p>
            <p className="text-muted-foreground">1-800-ROADHELP</p>
            <p className="font-bold text-lg mt-3">Customer Support</p>
            <p className="text-muted-foreground">1-888-555-HELP</p>
          </CardContent>
          <CardFooter className="text-center text-muted-foreground text-sm">Available 24/7/365</CardFooter>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto p-3 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Mail className="h-7 w-7 text-primary" />
            </div>
            <CardTitle>Email Us</CardTitle>
            <CardDescription>Get a response within 24 hours</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="font-bold text-lg">Customer Support</p>
            <p className="text-muted-foreground">support@roadrescue.com</p>
            <p className="font-bold text-lg mt-3">Business Inquiries</p>
            <p className="text-muted-foreground">info@roadrescue.com</p>
          </CardContent>
          <CardFooter className="text-center text-muted-foreground text-sm">
            We respond to all emails within 24 hours
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto p-3 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <MapPin className="h-7 w-7 text-primary" />
            </div>
            <CardTitle>Visit Us</CardTitle>
            <CardDescription>Our headquarters location</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="font-bold text-lg">Main Office</p>
            <p className="text-muted-foreground">
              123 Rescue Drive
              <br />
              Austin, TX 78701
            </p>
            <p className="text-muted-foreground mt-1">
              Monday - Friday: 9am - 5pm
              <br />
              Saturday: 10am - 2pm
            </p>
          </CardContent>
          <CardFooter className="text-center">
            <Button variant="outline" className="w-full" asChild>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                Get Directions
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Send a Message</CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="(123) 456-7890" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select>
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="support">Customer Support</SelectItem>
                    <SelectItem value="membership">Membership Questions</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                    <SelectItem value="careers">Careers</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="How can we help you?" className="min-h-[150px]" required />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-bold mb-1">How do I request roadside assistance?</h3>
                <p className="text-muted-foreground text-sm">
                  You can request assistance through our mobile app, website, or by calling our 24/7 emergency line at
                  1-800-ROADHELP.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-1">What are your service hours?</h3>
                <p className="text-muted-foreground text-sm">
                  Our roadside assistance services are available 24 hours a day, 7 days a week, 365 days a year.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-1">How long does it take for help to arrive?</h3>
                <p className="text-muted-foreground text-sm">
                  Our average response time is 15-30 minutes, depending on your location and current demand.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-1">Do I need to be with my vehicle when help arrives?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, for security reasons, you or an authorized person needs to be present with the vehicle when our
                  technician arrives.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/faqs">View All FAQs</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Connect With Us</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    Twitter
                  </a>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
