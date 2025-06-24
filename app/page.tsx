'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { BabyIcon } from '@/components/icons/BabyIcon'
import { ChatIcon } from '@/components/icons/ChatIcon'
import { SendIcon } from '@/components/icons/SendIcon'

export default function Home() {
  const [sampleMessage, setSampleMessage] = useState('')

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <BabyIcon size={32} className="text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Baby Name Advisor</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Find the Perfect Name for Your Baby
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get personalized baby name suggestions powered by AI. Share your preferences, family
            traditions, and cultural background to discover meaningful names that resonate with your
            family.
          </p>
          <Button size="lg" className="mr-4">
            Start Your Search
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card
            title="Personalized Suggestions"
            subtitle="Get names tailored to your preferences"
            padding="lg"
            shadow="sm"
            className="text-center"
          >
            <BabyIcon size={48} className="text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">
              Our AI considers your cultural background, family traditions, and personal preferences
              to suggest names that feel perfect for your family.
            </p>
          </Card>

          <Card
            title="Meaningful Origins"
            subtitle="Discover the story behind each name"
            padding="lg"
            shadow="sm"
            className="text-center"
          >
            <ChatIcon size={48} className="text-green-600 mx-auto mb-4" />
            <p className="text-gray-600">
              Learn about name meanings, cultural significance, and historical context to make an
              informed choice that carries special meaning.
            </p>
          </Card>

          <Card
            title="Interactive Chat"
            subtitle="Refine your search through conversation"
            padding="lg"
            shadow="sm"
            className="text-center"
          >
            <SendIcon size={48} className="text-purple-600 mx-auto mb-4" />
            <p className="text-gray-600">
              Chat with our AI to explore options, ask questions, and narrow down your choices
              through natural conversation.
            </p>
          </Card>
        </div>

        {/* Chat Preview */}
        <Card
          title="Chat Preview"
          subtitle="See how our AI advisor works"
          padding="lg"
          shadow="md"
          className="max-w-2xl mx-auto"
        >
          {/* Sample Chat Messages */}
          <div className="space-y-4 mb-6">
            <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
              <p className="text-sm text-gray-800">
                Hi! I&apos;m looking for baby names that work well in both English and Spanish.
              </p>
            </div>
            <div className="bg-blue-600 text-white rounded-lg p-3 max-w-xs ml-auto">
              <p className="text-sm">
                That&apos;s wonderful! I&apos;d love to help you find bilingual names. Are you
                looking for boy names, girl names, or both?
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
              <p className="text-sm text-gray-800">
                Both, please! We want names that are easy to pronounce in both languages.
              </p>
            </div>
          </div>

          {/* Sample Input */}
          <div className="flex space-x-2">
            <Input
              placeholder="Try asking about baby names..."
              value={sampleMessage}
              onChange={setSampleMessage}
              className="flex-1"
            />
            <Button variant="primary" className="px-3" disabled={!sampleMessage.trim()}>
              <SendIcon size={20} />
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-2">
            This is a preview. Start your search to begin chatting with our AI advisor.
          </p>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card
            padding="lg"
            shadow="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white max-w-2xl mx-auto"
          >
            <h3 className="text-2xl font-bold mb-4">Ready to Find Your Baby&apos;s Name?</h3>
            <p className="text-blue-100 mb-6">
              Join thousands of parents who have found the perfect name with our AI advisor.
            </p>
            <Button variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-gray-50">
              Get Started Now
            </Button>
          </Card>
        </div>
      </div>
    </main>
  )
}
