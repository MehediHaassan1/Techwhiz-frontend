"use client";

import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/link";

import { useCreatePayment } from "@/src/hooks/payment.hook";
import { useUser } from "@/src/context/user.provider";
import { IPayment, IPlan } from "@/src/types";

const PlanCard = ({ plan, index }: { plan: IPlan; index: number }) => {
  const { mutate: createPayment } = useCreatePayment();
  const { user } = useUser();

  const handleCreatePayment = (plan: IPlan) => {
    const paymentData = {
      packageName: plan?.name,
      packagePrice: plan?.price,
    };

    createPayment(paymentData as IPayment);
  };

  return (
    <div>
      <Card
        key={plan.name}
        className={`${
          index === 1 ? "bg-[#0e4f4f] text-white" : "bg-white dark:bg-gray-800"
        } rounded`}
      >
        <CardHeader className="flex flex-col items-start pb-0">
          <h2 className="text-lg font-semibold">{plan.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {plan.description}
          </p>
          <p className="text-4xl font-bold mt-2">
            {plan.price}

            {index !== 0 && <span className="text-lg font-normal">/month</span>}
          </p>
        </CardHeader>
        <CardBody>
          <ul className="space-y-2">
            {plan?.features?.map((feature, i) => (
              <li key={i} className="flex items-center">
                <svg
                  className={`w-4 h-4 mr-2 ${
                    index === 1
                      ? "text-teal-300"
                      : "text-[#0e4f4f] dark:text-teal-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    clipRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    fillRule="evenodd"
                  />
                </svg>
                {feature}
              </li>
            ))}
          </ul>

          {user ? (
            <Button
              className={`w-full mt-4 rounded ${
                index === 1
                  ? "bg-white text-[#0e4f4f] hover:bg-gray-100"
                  : "bg-[#0e4f4f] text-white hover:bg-[#0c3e3e] dark:bg-teal-600 dark:hover:bg-teal-700"
              }`}
              isDisabled={index === 0}
              onClick={() => handleCreatePayment(plan)}
            >
              {index === 0 ? "Get Started" : "Choose Plan"}
            </Button>
          ) : (
            <Button
              as={Link}
              className={`w-full mt-4 rounded ${
                index === 1
                  ? "bg-white text-[#0e4f4f] hover:bg-gray-100"
                  : "bg-[#0e4f4f] text-white hover:bg-[#0c3e3e] dark:bg-teal-600 dark:hover:bg-teal-700"
              }`}
              href={`/login?redirect=choose-plan`}
            >
              {index === 0 ? "Get Started" : "Choose Plan"}
            </Button>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default PlanCard;
