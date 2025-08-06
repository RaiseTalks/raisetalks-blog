import React from 'react';
import Heading from '@theme/Heading';

export default function PricingCards(): JSX.Element {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Heading as="h2" className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </Heading>
          <p className="text-xl text-gray-600">
            Choose the plan that's right for your business
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#0174e1] to-[#0166ca] mx-auto rounded-full mt-6"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Starter Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold mb-2">Starter</h3>
            <p className="text-gray-600 mb-6">Perfect for small teams</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">$49</span>
              <span className="text-gray-600">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>5 Reports per month</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Basic AI analysis</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Email support</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>1 User seat</span>
              </li>
            </ul>
            <button className="w-full py-3 px-6 border-2 border-[#0174e1] text-[#0174e1] rounded-lg font-semibold hover:bg-[#0174e1] hover:text-white transition-colors">
              Get Started
            </button>
          </div>
          
          {/* Professional Plan */}
          <div className="bg-gradient-to-b from-[#0174e1] to-[#0166ca] rounded-2xl shadow-xl p-8 text-white transform scale-105">
            <div className="bg-white/20 text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
              MOST POPULAR
            </div>
            <h3 className="text-2xl font-bold mb-2">Professional</h3>
            <p className="text-white/90 mb-6">For growing businesses</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">$149</span>
              <span className="text-white/80">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Unlimited Reports</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Advanced AI analysis</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                <span>Priority support</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                <span>5 User seats</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                <span>API access</span>
              </li>
            </ul>
            <button className="w-full py-3 px-6 bg-white text-[#0174e1] rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started
            </button>
          </div>
          
          {/* Enterprise Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
            <p className="text-gray-600 mb-6">For large organizations</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">Custom</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Everything in Pro</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Custom AI models</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Dedicated support</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Unlimited seats</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>SLA guarantee</span>
              </li>
            </ul>
            <button className="w-full py-3 px-6 border-2 border-[#0174e1] text-[#0174e1] rounded-lg font-semibold hover:bg-[#0174e1] hover:text-white transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-600 text-lg mb-4">
            All plans include 14-day free trial. No credit card required.
          </p>
          <p className="text-sm text-gray-500">
            Questions? <a href="#" className="text-[#0174e1] hover:underline">Contact our sales team</a>
          </p>
        </div>
      </div>
    </section>
  );
}