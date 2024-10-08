import { IPlan } from "@/src/types";

import PlanCard from "./PlanCard";

export default function ChoosePlan() {
  return (
    <div className="min-h-screen dark">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-[#0e4f4f] dark:text-teal-300 mb-4">
          Simple, affordable pricing
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Start blogging for free and upgrade as you grow.
        </p>

        <div className="flex justify-center items-center mb-8">
          <span className="mr-2 text-gray-700 dark:text-gray-300">
            Monthly Subscription
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans?.map((plan, index) => (
            <PlanCard key={index} index={index} plan={plan as IPlan} />
          ))}
        </div>
      </main>
    </div>
  );
}

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for beginners",
    features: [
      "3 Blog Posts",
      "Basic Analytics",
      "Standard Support",
      "1 Author",
    ],
  },
  {
    name: "Basic",
    price: 9.99,
    description: "For serious bloggers",
    features: [
      "10 Blog Posts",
      "Advanced Analytics",
      "Priority Support",
      "3 Authors",
    ],
  },
  {
    name: "Pro",
    price: 19.99,
    description: "For professionals only",
    features: [
      "30 Blog Posts",
      "Custom Analytics",
      "24/7 Support",
      "10 Authors",
    ],
  },
];
