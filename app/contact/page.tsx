'use client'

import React from "react"

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, MapPin, Phone, Clock } from 'lucide-react'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // In a real app, you would send this data to a backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#F8F8F8] to-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#33382D] mb-4 text-pretty">Contact Us</h1>
          <p className="text-lg text-[#404437]">We'd love to hear from you. Get in touch with us today!</p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-[#F8F8F8]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="border-[#757871]/20 bg-[#33382D]/10 hover:bg-[#33382D]/20 transition-colors">
              <CardContent className="p-6 text-center">
                <Phone className="w-12 h-12 text-[#33382D] mx-auto mb-4" />
                <h3 className="font-bold text-[#33382D] mb-2">Phone</h3>
                <p className="text-sm text-[#404437]">+91-8955040478</p>
                <p className="text-xs text-[#757871] mt-2">Available Mon-Sat, 9AM-6PM</p>
              </CardContent>
            </Card>

            <Card className="border-[#757871]/20 bg-[#33382D]/10 hover:bg-[#33382D]/20 transition-colors">
              <CardContent className="p-6 text-center">
                <Mail className="w-12 h-12 text-[#33382D] mx-auto mb-4" />
                <h3 className="font-bold text-[#33382D] mb-2">Email</h3>
                <p className="text-sm text-[#404437]">amrishaagros@gmail.com</p>
                <p className="text-xs text-[#757871] mt-2">Response within 24 hours</p>
              </CardContent>
            </Card>

            <Card className="border-[#757871]/20 bg-[#33382D]/10 hover:bg-[#33382D]/20 transition-colors">
              <CardContent className="p-6 text-center">
                <MapPin className="w-12 h-12 text-[#33382D] mx-auto mb-4" />
                <h3 className="font-bold text-[#33382D] mb-2">Address</h3>
                <p className="text-sm text-[#404437]">Manufacturing & Sales Office</p>
                <p className="text-xs text-[#757871] mt-2">Bikaner, Rajasthan</p>
              </CardContent>
            </Card>

            <Card className="border-[#757871]/20 bg-[#33382D]/10  hover:bg-[#33382D]/20 transition-colors">
              <CardContent className="p-6 text-center">
                <Clock className="w-12 h-12 text-[#33382D] mx-auto mb-4" />
                <h3 className="font-bold text-[#33382D] mb-2">Hours</h3>
                <p className="text-sm text-[#404437]">Mon - Sat: 9AM - 6PM</p>
                <p className="text-xs text-[#757871] mt-2">Closed on Sundays</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-[#33382D] mb-8">Get in Touch</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#33382D] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#33382D]/50 bg-white text-[#33382D]"
                    placeholder="Your name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#33382D] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#33382D]/50 bg-white text-[#33382D]"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#33382D] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#33382D]/50 bg-white text-[#33382D]"
                      placeholder="+91-XXXXXXXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[#33382D] mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#33382D]/50 bg-white text-[#33382D]"
                  >
                    <option value="">Select a subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="bulk-order">Bulk Order</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#33382D] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#33382D]/50 bg-white text-[#33382D]"
                    placeholder="Your message here..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-[#33382D]/80 hover:bg-[#33382D]">
                  Send Message
                </Button>

                {submitted && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
                    Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </div>
                )}
              </form>
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-8">
              <div className="bg-[#33382D]/20 rounded-lg h-80 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-[#33382D] mx-auto mb-4" />
                  <p className="text-[#33382D] font-medium">Location Map Coming Soon</p>
                </div>
              </div>

              <div className="bg-[#33382D]/20 rounded-lg p-8 border border-amber-100">
                <h3 className="text-xl font-bold text-[#33382D] mb-4">Why Contact Us?</h3>
                <ul className="space-y-3 text-[#33382D]">
                  <li className="flex gap-3">
                    <span className="text-[#33382D] font-bold">✓</span>
                    <span>Product inquiries and recommendations</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#33382D] font-bold">✓</span>
                    <span>Bulk orders and distributor opportunities</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#33382D] font-bold">✓</span>
                    <span>Feedback and customer support</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#33382D] font-bold">✓</span>
                    <span>Partnership and collaboration opportunities</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#33382D] font-bold">✓</span>
                    <span>General inquiries about our company</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-amber-50 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#33382D] mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-amber-100">
              <CardContent className="p-6">
                <h3 className="font-bold text-[#33382D] mb-3">How do I place an order?</h3>
                <p className="text-sm text-amber-700">You can place an order directly through our website or by contacting our sales team via phone or email.</p>
              </CardContent>
            </Card>

            <Card className="border-amber-100">
              <CardContent className="p-6">
                <h3 className="font-bold text-[#33382D] mb-3">Do you offer bulk orders?</h3>
                <p className="text-sm text-amber-700">Yes! We offer special pricing for bulk orders. Contact our sales team for wholesale inquiries.</p>
              </CardContent>
            </Card>

            <Card className="border-amber-100">
              <CardContent className="p-6">
                <h3 className="font-bold text-[#33382D] mb-3">What is your shipping policy?</h3>
                <p className="text-sm text-amber-700">We ship across the country with reliable logistics partners. Delivery typically takes 3-5 business days.</p>
              </CardContent>
            </Card>

            <Card className="border-amber-100">
              <CardContent className="p-6">
                <h3 className="font-bold text-[#33382D] mb-3">Are your products certified organic?</h3>
                <p className="text-sm text-amber-700">Our products are 100% natural and certified. We adhere to all food safety standards and regulations.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
