"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Phone, AlertTriangle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Message {
  id: string
  sender: "user" | "operator"
  text: string
  timestamp: Date
}

export function EmergencyChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "operator",
      text: "Hello, this is RoadRescue emergency support. How can I help you today?",
      timestamp: new Date(Date.now() - 60000), // 1 minute ago
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isConnected, setIsConnected] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Simulate operator typing and response
  const simulateOperatorResponse = (userMessage: string) => {
    // Show typing indicator
    setIsTyping(true)

    // Simulate delay
    setTimeout(() => {
      let response = "I understand. A technician will be dispatched to your location shortly."

      // Generate contextual responses based on user message
      if (userMessage.toLowerCase().includes("accident")) {
        response =
          "I'm sorry to hear about the accident. Are there any injuries? Please stay safe and share your location."
      } else if (userMessage.toLowerCase().includes("flat tire") || userMessage.toLowerCase().includes("flat tyre")) {
        response =
          "I understand you have a flat tire. We'll send a technician to help you change it. Are you in a safe location?"
      } else if (userMessage.toLowerCase().includes("battery")) {
        response =
          "Battery issues can be frustrating. We'll send someone to jump-start your vehicle. Is your car in an accessible location?"
      } else if (userMessage.toLowerCase().includes("tow") || userMessage.toLowerCase().includes("towing")) {
        response =
          "We can arrange towing for your vehicle. Please confirm your location and the destination you'd like your vehicle towed to."
      }

      // Add operator message
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "operator",
          text: response,
          timestamp: new Date(),
        },
      ])

      setIsTyping(false)
    }, 2000)
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")

    // Simulate operator response
    simulateOperatorResponse(inputValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Operator" />
              <AvatarFallback>OP</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">Emergency Support</CardTitle>
              <CardDescription className="text-xs flex items-center">
                {isConnected ? (
                  <>
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                    Online
                  </>
                ) : (
                  <>
                    <span className="h-2 w-2 rounded-full bg-red-500 mr-1"></span>
                    Connecting...
                  </>
                )}
              </CardDescription>
            </div>
          </div>
          <Button size="sm" variant="outline" asChild>
            <a href="tel:18007623404">
              <Phone className="h-4 w-4 mr-1" />
              Call
            </a>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto p-4">
        <div className="space-y-4">
          <div className="bg-muted p-3 rounded-md text-sm">
            <AlertTriangle className="h-4 w-4 text-yellow-500 mb-1" />
            <p>This is an emergency chat line. For immediate assistance, call 911.</p>
          </div>

          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <p>{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg px-4 py-2 flex items-center">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 rounded-full bg-foreground/50 animate-bounce"></div>
                  <div
                    className="h-2 w-2 rounded-full bg-foreground/50 animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="h-2 w-2 rounded-full bg-foreground/50 animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-2">
        <div className="flex w-full gap-2">
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
