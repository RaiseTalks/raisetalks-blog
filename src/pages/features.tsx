import React from 'react';
import Layout from '@theme/Layout';

export default function Features() {
  return (
    <Layout
      title="Features"
      description="Discover the powerful features of RaiseTalks AI-powered due diligence platform">
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for comprehensive due diligence and business intelligence
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="group relative overflow-hidden rounded-xl border border-gray-200 p-8 hover:border-[#0174e1] transition-all">
              <div className="mb-4 w-12 h-12 bg-[#0174e1] rounded-lg flex items-center justify-center text-white text-xl font-bold">
                AI
              </div>
              <h3 className="text-2xl font-semibold mb-3">AI Analysis</h3>
              <p className="text-gray-600">
                Advanced AI algorithms analyze data patterns and provide actionable insights
              </p>
            </div>
            
            <div className="group relative overflow-hidden rounded-xl border border-gray-200 p-8 hover:border-[#0174e1] transition-all">
              <div className="mb-4 w-12 h-12 bg-[#0174e1] rounded-lg flex items-center justify-center text-white text-xl">
                📊
              </div>
              <h3 className="text-2xl font-semibold mb-3">Real-time Data</h3>
              <p className="text-gray-600">
                Access up-to-date information from multiple sources in real-time
              </p>
            </div>
            
            <div className="group relative overflow-hidden rounded-xl border border-gray-200 p-8 hover:border-[#0174e1] transition-all">
              <div className="mb-4 w-12 h-12 bg-[#0174e1] rounded-lg flex items-center justify-center text-white text-xl">
                🔒
              </div>
              <h3 className="text-2xl font-semibold mb-3">Secure Platform</h3>
              <p className="text-gray-600">
                Enterprise-grade security to protect your sensitive business data
              </p>
            </div>
            
            <div className="group relative overflow-hidden rounded-xl border border-gray-200 p-8 hover:border-[#0174e1] transition-all">
              <div className="mb-4 w-12 h-12 bg-[#0174e1] rounded-lg flex items-center justify-center text-white text-xl">
                📈
              </div>
              <h3 className="text-2xl font-semibold mb-3">Risk Assessment</h3>
              <p className="text-gray-600">
                Comprehensive risk analysis and scoring for informed decisions
              </p>
            </div>
            
            <div className="group relative overflow-hidden rounded-xl border border-gray-200 p-8 hover:border-[#0174e1] transition-all">
              <div className="mb-4 w-12 h-12 bg-[#0174e1] rounded-lg flex items-center justify-center text-white text-xl">
                🤝
              </div>
              <h3 className="text-2xl font-semibold mb-3">Collaboration</h3>
              <p className="text-gray-600">
                Team collaboration tools for shared insights and decision-making
              </p>
            </div>
            
            <div className="group relative overflow-hidden rounded-xl border border-gray-200 p-8 hover:border-[#0174e1] transition-all">
              <div className="mb-4 w-12 h-12 bg-[#0174e1] rounded-lg flex items-center justify-center text-white text-xl">
                📱
              </div>
              <h3 className="text-2xl font-semibold mb-3">Mobile Ready</h3>
              <p className="text-gray-600">
                Access your due diligence reports anywhere, anytime
              </p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}