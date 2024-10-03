"use client";

import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";

export default function ChoosePlan() {
    
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
            price: "$9.99",
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
            price: "$19.99",
            description: "For professionals only",
            features: [
                "30 Blog Posts",
                "Custom Analytics",
                "24/7 Support",
                "10 Authors",
            ],
        },
    ];

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
                    {plans.map((plan, index) => (
                        <Card
                            key={plan.name}
                            className={`${
                                index === 1
                                    ? "bg-[#0e4f4f] text-white"
                                    : "bg-white dark:bg-gray-800"
                            } rounded`}
                        >
                            <CardHeader className="flex flex-col items-start pb-0">
                                <h2 className="text-lg font-semibold">
                                    {plan.name}
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {plan.description}
                                </p>
                                <p className="text-4xl font-bold mt-2">
                                    {plan.price}

                                    {index !== 0 && (
                                        <span className="text-lg font-normal">
                                            /month
                                        </span>
                                    )}
                                </p>
                            </CardHeader>
                            <CardBody>
                                <ul className="space-y-2">
                                    {plan.features.map((feature, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center"
                                        >
                                            <svg
                                                className={`w-4 h-4 mr-2 ${
                                                    index === 1
                                                        ? "text-teal-300"
                                                        : "text-[#0e4f4f] dark:text-teal-300"
                                                }`}
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    className={`w-full mt-4 rounded ${
                                        index === 1
                                            ? "bg-white text-[#0e4f4f] hover:bg-gray-100"
                                            : "bg-[#0e4f4f] text-white hover:bg-[#0c3e3e] dark:bg-teal-600 dark:hover:bg-teal-700"
                                    }`}
                                    isDisabled={index === 0}
                                >
                                    {index === 0
                                        ? "Get Started"
                                        : "Choose Plan"}
                                </Button>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}
