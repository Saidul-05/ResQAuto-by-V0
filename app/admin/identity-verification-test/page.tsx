"use client"

import { IdentityVerificationTester } from "@/components/emergency/identity-verification-tester"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Phone, MessageSquare, Fingerprint, AlertTriangle, CheckCircle } from "lucide-react"

export default function IdentityVerificationTestPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <Shield className="h-6 w-6 text-blue-500" />
        <h1 className="text-3xl font-bold">Identity Verification Testing</h1>
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <Shield className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-blue-700">
          <strong>Critical Security Testing:</strong> This test validates the complete identity verification process
          used when users respond after emergency services have been contacted. Proper verification prevents false alarm
          cancellations while ensuring legitimate users can cancel unnecessary dispatches.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Lock className="h-5 w-5 text-green-500" />
              <span>Basic Level</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="outline">2 Steps</Badge>
              <span className="text-sm">~2 minutes</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• Personal information</li>
              <li>• Security question</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Phone className="h-5 w-5 text-blue-500" />
              <span>Standard Level</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="outline">4 Steps</Badge>
              <span className="text-sm">~4 minutes</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• Basic verification</li>
              <li>• SMS verification</li>
              <li>• Location confirmation</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <MessageSquare className="h-5 w-5 text-orange-500" />
              <span>Enhanced Level</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="outline">5 Steps</Badge>
              <span className="text-sm">~6 minutes</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• Standard verification</li>
              <li>• Voice pattern matching</li>
              <li>• Enhanced security</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Fingerprint className="h-5 w-5 text-red-500" />
              <span>Maximum Level</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="outline">6 Steps</Badge>
              <span className="text-sm">~8 minutes</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• Enhanced verification</li>
              <li>• Biometric scanning</li>
              <li>• Maximum security</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <IdentityVerificationTester />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <span>Verification Challenges</span>
            </CardTitle>
            <CardDescription>Why identity verification is complex in emergency situations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-semibold text-red-600">Security vs. Speed Balance</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• Emergency situations require quick responses</li>
                <li>• Security verification takes time</li>
                <li>• False alarms waste emergency resources</li>
                <li>• User may be stressed or injured</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-orange-600">Technical Limitations</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• Device may be damaged in accident</li>
                <li>• Network connectivity issues</li>
                <li>• Biometric sensors may not work</li>
                <li>• User may not remember security answers</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-600">Legal and Liability Concerns</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• Liability if emergency dispatch is wrongly cancelled</li>
                <li>• Privacy concerns with biometric data</li>
                <li>• Compliance with emergency service protocols</li>
                <li>• Documentation requirements for legal protection</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Verification Methods</span>
            </CardTitle>
            <CardDescription>Different approaches to identity verification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-semibold">Knowledge-Based Authentication</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• Security questions and answers</li>
                <li>• Personal information verification</li>
                <li>• Account details confirmation</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Possession-Based Authentication</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• SMS verification codes</li>
                <li>• Device-specific tokens</li>
                <li>• App-based authentication</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Inherence-Based Authentication</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• Fingerprint scanning</li>
                <li>• Voice pattern recognition</li>
                <li>• Facial recognition</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Location-Based Verification</h4>
              <ul className="text-sm space-y-1 text-muted-foreground ml-4">
                <li>• GPS coordinate matching</li>
                <li>• Known location verification</li>
                <li>• Movement pattern analysis</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
