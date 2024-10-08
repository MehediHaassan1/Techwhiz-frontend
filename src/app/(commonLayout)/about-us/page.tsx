import React from "react";
import { Card, CardBody, Avatar, Button, Divider } from "@nextui-org/react";
import {
  BookOpen,
  Users,
  Zap,
  ChevronRight,
  Feather,
  Globe,
  TrendingUp,
} from "lucide-react";

const blogCategories = [
  { name: "Tech Trends", icon: <TrendingUp className="w-6 h-6" /> },
  { name: "Digital Culture", icon: <Globe className="w-6 h-6" /> },
  { name: "Creative Writing", icon: <Feather className="w-6 h-6" /> },
];

const teamMembers = [
  {
    name: "Jane Doe",
    role: "Chief Editor",
    avatar: "/placeholder.svg?height=128&width=128",
  },
  {
    name: "John Smith",
    role: "Tech Correspondent",
    avatar: "/placeholder.svg?height=128&width=128",
  },
  {
    name: "Alice Johnson",
    role: "Culture Critic",
    avatar: "/placeholder.svg?height=128&width=128",
  },
];

const stats = [
  {
    label: "Monthly Readers",
    value: "500K+",
    icon: <Users className="w-6 h-6" />,
  },
  {
    label: "Articles Published",
    value: "1000+",
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    label: "Avg. Read Time",
    value: "7 min",
    icon: <Zap className="w-6 h-6" />,
  },
];

export default function AboutUsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-blue-600">
          Illuminating Ideas
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Where curiosity meets insight, and every scroll sparks a new
          perspective.
        </p>
      </header>

      <section className="mb-20">
        <Card className="bg-white/30 backdrop-blur-md shadow-xl">
          <CardBody className="p-8">
            <h2 className="text-3xl font-semibold mb-6 text-center">
              Our Narrative
            </h2>
            <p className="text-lg text-gray-300 mb-4 italic">
              &quot;We don&apos;t just write stories; we craft conversations
              that resonate across the digital landscape.&quot;
            </p>
            <p className="text-lg text-gray-300 mb-4">
              At ThoughtCanvas, we&apos;re passionate about exploring the
              intricate tapestry of modern life through the lens of technology,
              culture, and creativity. Our mission is to illuminate the ideas
              shaping our world, fostering a community of curious minds and
              lifelong learners.
            </p>
            <p className="text-lg text-gray-300">
              From dissecting the latest tech trends to unraveling the nuances
              of digital culture, our articles serve as bridges between complex
              concepts and everyday understanding. We believe in the power of
              well-crafted narratives to inspire, educate, and spark meaningful
              dialogues that transcend the boundaries of our screens.
            </p>
          </CardBody>
        </Card>
      </section>

      <section className="mb-20">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Our Content Pillars
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogCategories?.map((category, index) => (
            <Card
              key={index}
              className="bg-white/50 backdrop-blur-md hover:shadow-lg transition-shadow duration-300"
            >
              <CardBody className="flex flex-col items-center p-6">
                <div className="text-amber-500 mb-4">{category?.icon}</div>
                <h3 className="text-xl font-semibold">{category?.name}</h3>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          The Minds Behind the Words
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers?.map((member, index) => (
            <Card
              key={index}
              className="bg-white/50 backdrop-blur-md hover:shadow-lg transition-shadow duration-300"
            >
              <CardBody className="flex flex-col items-center p-6">
                <Avatar
                  className="w-32 h-32 text-large mb-4"
                  src={member?.avatar}
                />
                <h3 className="text-xl font-semibold">{member?.name}</h3>
                <p className="text-amber-600 font-medium">{member?.role}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-3xl font-semibold mb-8 text-center">Our Reach</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats?.map((stat, index) => (
            <Card
              key={index}
              className="bg-white/50 backdrop-blur-md hover:shadow-lg transition-shadow duration-300"
            >
              <CardBody className="flex flex-col items-center p-6">
                <div className="text-blue-600 mb-2">{stat?.icon}</div>
                <p className="text-4xl font-bold mb-2">{stat?.value}</p>
                <p className="text-gray-600 text-center">{stat?.label}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center bg-gradient-to-r from-amber-500 to-blue-600 text-white py-12 rounded-lg shadow-xl">
        <h2 className="text-3xl font-semibold mb-6">
          Join Our Community of Thinkers
        </h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Be part of a growing network of curious minds. Subscribe to our
          newsletter for weekly curated content that challenges, inspires, and
          enlightens.
        </p>
        <Button
          color="warning"
          endContent={<ChevronRight className="ml-2" />}
          size="lg"
        >
          Expand Your Horizons
        </Button>
      </section>

      <Divider className="my-12" />

      <footer className="text-center text-gray-600">
        <p>© 2023 ThoughtCanvas. All rights reserved.</p>
      </footer>
    </div>
  );
}
