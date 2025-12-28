"use client";
import Link from "next/link";
import React from "react";
import { Check } from "lucide-react";

function Upgrade() {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      priceLabel: "forever",
      description: "For trying out the tool",
      features: [
        "5 PDFs",
        "Standard response time",
        "Basic note-taking",
        "Email support",
      ],
      cta: "Current plan",
      highlighted: false,
      disabled: true,
    },
    {
      name: "Medium",
      price: "₹149",
      priceLabel: "/month",
      description: "For regular use",
      features: [
        "20 PDFs",
        "Faster responses",
        "Full note-taking features",
        "Priority email support",
        "Search across all documents",
      ],
      cta: "Upgrade to Medium",
      highlighted: true,
      disabled: false,
    },
    {
      name: "Pro",
      price: "₹299",
      priceLabel: "/month",
      description: "For heavy users",
      features: [
        "50 PDFs",
        "Fastest responses",
        "Advanced AI features",
        "Priority phone support",
        "Search across all documents",
        "Export notes & highlights",
      ],
      cta: "Upgrade to Pro",
      highlighted: false,
      disabled: false,
    },
  ];

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Plans</h1>
        <p className="text-sm text-gray-600">
          Choose a plan that fits your needs. Cancel anytime.
        </p>
      </div>

      {/* Development notice */}
      <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-900">
          <span className="font-medium">Note:</span> Payment integration is currently in development. 
          Plans will be available soon.
        </p>
      </div>

      {/* Plans grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-white rounded-lg border-2 transition-all ${
              plan.highlighted
                ? "border-gray-900 shadow-lg"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                {plan.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{plan.description}</p>

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-gray-900">
                  {plan.price}
                </span>
                <span className="text-sm text-gray-600">{plan.priceLabel}</span>
              </div>

              {/* CTA */}
              <button
                disabled={plan.disabled}
                className={`mt-6 w-full py-2.5 px-4 text-sm font-medium rounded-lg transition-colors ${
                  plan.highlighted
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : plan.disabled
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-50"
                }`}
              >
                {plan.cta}
              </button>
            </div>

            {/* Features */}
            <div className="p-6">
              <p className="text-xs font-medium text-gray-700 uppercase tracking-wide mb-4">
                What's included
              </p>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      size={16}
                      className="text-gray-900 flex-shrink-0 mt-0.5"
                    />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ / Additional info */}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-base font-semibold text-gray-900 mb-4">
          Common questions
        </h3>
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-medium text-gray-900 mb-1">
              Can I change plans later?
            </p>
            <p className="text-gray-600 leading-relaxed">
              Yes. Upgrade or downgrade anytime. Changes take effect immediately.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-900 mb-1">
              What happens to my files if I downgrade?
            </p>
            <p className="text-gray-600 leading-relaxed">
              Your files stay safe. If you exceed the limit, you won't be able to upload more until you upgrade again or delete some files.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-900 mb-1">
              Is my data secure?
            </p>
            <p className="text-gray-600 leading-relaxed">
              Yes. All files are encrypted and stored securely. We never train models on your data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upgrade;
