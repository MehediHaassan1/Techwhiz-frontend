"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export default function ContactUs() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How can I benefit from your startup?",
      answer:
        "Our startup offers innovative solutions that can streamline your processes and boost productivity.",
    },
    {
      question: "How can I get in touch with customer support?",
      answer:
        "You can reach our customer support team via email, phone, or through the contact form on this page.",
    },
    {
      question: "How do you ensure data security and privacy?",
      answer:
        "We implement state-of-the-art encryption and follow strict data protection protocols to ensure your information is always secure.",
    },
    {
      question: "How do I get started with your offerings?",
      answer:
        "You can start by signing up for a free trial on our website or contacting our sales team for a personalized demo.",
    },
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8">
        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          Connect with Our Team
        </motion.h1>
        <motion.p
          animate={{ opacity: 1 }}
          className="text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          We are here to help and answer any question you might have. We look
          forward to hearing from you.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="bg-card p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: -20 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4">
              Get in Touch with Us
            </h2>
            <form className="space-y-4">
              <Input className="rounded" placeholder="Your Name" type="text" />
              <Input
                className="rounded"
                placeholder="Your Email"
                type="email"
              />
              <Input className="rounded" placeholder="Subject" type="text" />
              <Textarea
                className="rounded"
                placeholder="Your message"
                rows={4}
              />
              <Button className="w-full rounded" type="submit">
                Send Message
              </Button>
            </form>
          </motion.div>

          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="bg-card p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Contact Details</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="mr-2" />
                <span>123 Main St, Anytown, USA</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2" />
                <span>Mon-Fri: 9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2" />
                <span>contact@example.com</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold mt-6 mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <Facebook className="cursor-pointer hover:text-primary" />
              <Twitter className="cursor-pointer hover:text-primary" />
              <Linkedin className="cursor-pointer hover:text-primary" />
              <Instagram className="cursor-pointer hover:text-primary" />
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <button
                  className="flex justify-between items-center w-full p-4 bg-card rounded-lg shadow-md hover:bg-muted"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-semibold">{faq.question}</span>
                  {expandedFaq === index ? <ChevronUp /> : <ChevronDown />}
                </button>
                {expandedFaq === index && (
                  <motion.div
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-4 bg-muted rounded-b-lg"
                    exit={{ opacity: 0, height: 0 }}
                    initial={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
