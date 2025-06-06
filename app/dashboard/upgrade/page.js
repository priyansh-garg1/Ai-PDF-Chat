"use client";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

function Upgrade() {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      priceLabel: "",
      features: [
        "Upload up to 5 PDFs",
        "Response time: Up to 5 seconds",
        "Basic AI answers",
        "Email support",
        "Help center access",
      ],
      borderClass: "border-gray-200",
      bgClass: "bg-white",
      textClass: "text-indigo-600",
      buttonTextClass: "text-indigo-600",
    },
    {
      name: "Medium",
      price: "₹149",
      priceLabel: "/month",
      features: [
        "Upload up to 20 PDFs",
        "Response time: Up to 3 seconds",
        "Accurate AI answers",
        "Priority support",
        "Email support",
        "Help center access",
      ],
      borderClass: "border-indigo-600",
      bgClass: "bg-indigo-600",
      textClass: "text-white",
      buttonTextClass: "text-white",
    },
    {
      name: "Pro",
      price: "₹299",
      priceLabel: "/month",
      features: [
        "Upload up to 50 PDFs",
        "Response time: Under 1 second",
        "Most precise AI answers",
        "Priority phone support",
        "Email support",
        "Help center access",
      ],
      borderClass: "border-indigo-600",
      bgClass: "bg-indigo-600",
      textClass: "text-white",
      buttonTextClass: "text-white",
    },
  ];

  return (
    <div className="max-w-screen-xl px-4 ">
      <h2 className="text-lg font-semibold text-center pb-5">Currently in development, please wait.</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`flex flex-col rounded-2xl border ${plan.borderClass} shadow-md divide-y divide-gray-200`}
          >
            <div className={`p-6 sm:px-8 ${plan.bgClass} rounded-t-2xl`}>
              <h2 className={`text-lg font-semibold ${plan.textClass}`}>
                {plan.name} <span className="sr-only">Plan</span>
              </h2>
              <p
                className={`mt-2 ${plan.textClass === "text-white" ? "text-indigo-200" : "text-gray-700"}`}
              >
                {plan.name} AI PDF features plan.
              </p>
              <p
                className={`mt-4 flex items-baseline gap-x-2 ${plan.textClass}`}
              >
                <span className="text-4xl font-extrabold">{plan.price}</span>
                <span className="text-sm font-medium">{plan.priceLabel}</span>
              </p>
              <Link href="/dashboard">
                <button
                  className={`mt-6 w-full rounded-md border px-6 py-3 text-center text-sm font-semibold focus:outline-none focus:ring-4 ${
                    plan.bgClass === "bg-white"
                      ? `border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:ring-indigo-300`
                      : `border-indigo-600 bg-white text-indigo-600  focus:ring-indigo-400`
                  }`}
                >
                  Get Started
                </button>
              </Link>
            </div>
            <div className="p-6 sm:px-8">
              <p
                className={`text-lg font-semibold ${plan.textClass === "text-white" ? "text-indigo-100" : "text-gray-900"}`}
              >
                What's included:
              </p>
              <ul
                className={`mt-4 space-y-3 ${plan.textClass === "text-white" ? "text-indigo-200" : "text-gray-700"}`}
              >
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${
                        plan.textClass === "text-white"
                          ? "text-indigo-300"
                          : "text-indigo-600"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Upgrade;
