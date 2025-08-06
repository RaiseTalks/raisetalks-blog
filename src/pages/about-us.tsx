import React from 'react';
import Layout from '@theme/Layout';

export default function AboutUs(): JSX.Element {
  return (
    <Layout
      title="About Us"
      description="Learn about RaiseTalks and our mission to streamline due diligence with AI-powered insights">
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 font-['Raleway']">
              About RaiseTalks
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              We're revolutionizing due diligence with AI-powered insights that help 
              businesses make smarter decisions faster.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h2 className="text-2xl font-semibold text-[#0174e1] mb-4">Our Mission</h2>
                <p className="text-gray-600">
                  To democratize access to professional-grade due diligence tools, 
                  empowering businesses of all sizes to make informed decisions.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h2 className="text-2xl font-semibold text-[#0174e1] mb-4">Our Vision</h2>
                <p className="text-gray-600">
                  A world where every business decision is backed by comprehensive, 
                  AI-driven insights and analysis.
                </p>
              </div>
            </div>
            
            <div className="mt-12 p-8 bg-gradient-to-r from-[#0174e1] to-[#0182f8] rounded-xl text-white">
              <h3 className="text-3xl font-bold mb-4">Why Choose RaiseTalks?</h3>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>AI-powered analysis for faster decisions</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Comprehensive due diligence reports</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Expert insights at your fingertips</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}