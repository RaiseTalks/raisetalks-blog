import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

type FeatureType = 'enhancement' | 'new-feature' | 'bug-fix' | 'integration' | 'other';
type Priority = 'low' | 'medium' | 'high' | 'critical';

interface FormData {
  name: string;
  email: string;
  featureType: FeatureType;
  priority: Priority;
  description: string;
  useCase: string;
}

export default function FeatureRequest() {
  const { siteConfig } = useDocusaurusContext();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    featureType: 'enhancement',
    priority: 'medium',
    description: '',
    useCase: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [charCount, setCharCount] = useState(0);
  const maxChars = 2000;

  // Load draft from localStorage
  useEffect(() => {
    const savedDraft = localStorage.getItem('featureRequestDraft');
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setFormData(parsed);
        setCharCount(parsed.description?.length || 0);
      } catch (e) {
        console.error('Failed to load draft:', e);
      }
    }
  }, []);

  // Auto-save draft to localStorage
  useEffect(() => {
    if (formData.email || formData.description) {
      localStorage.setItem('featureRequestDraft', JSON.stringify(formData));
    }
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'description') {
      if (value.length <= maxChars) {
        setFormData(prev => ({ ...prev, [name]: value }));
        setCharCount(value.length);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = (): boolean => {
    if (!formData.email || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }

    if (!formData.description || formData.description.trim().length < 10) {
      setErrorMessage('Please provide a detailed description (at least 10 characters)');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // Get Supabase config from Docusaurus customFields with fallback
      const SUPABASE_URL = (siteConfig.customFields?.SUPABASE_URL as string) || 'https://wzmlpdetrelxzunebnox.supabase.co';
      const SUPABASE_ANON_KEY = (siteConfig.customFields?.SUPABASE_ANON_KEY as string) || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6bWxwZGV0cmVseHp1bmVibm94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0NjMxNDksImV4cCI6MjA2MDAzOTE0OX0.-9StrWLSgULqZr_tW8vnqVqts8tVtwJKzEDx2gaBzGc';

      // Send to Supabase Edge Function
      const response = await fetch(`${SUPABASE_URL}/functions/v1/feature-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit feature request');
      }

      const result = await response.json();

      setStatus('success');

      // Clear form and localStorage
      setFormData({
        name: '',
        email: '',
        featureType: 'enhancement',
        priority: 'medium',
        description: '',
        useCase: '',
      });
      setCharCount(0);
      localStorage.removeItem('featureRequestDraft');

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);

    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Failed to submit your request. Please try again or contact support.');
    }
  };

  const featureTypeOptions = [
    { value: 'enhancement', label: 'Enhancement' },
    { value: 'new-feature', label: 'New Feature' },
    { value: 'bug-fix', label: 'Bug Fix' },
    { value: 'integration', label: 'Integration' },
    { value: 'other', label: 'Other' },
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' },
  ];

  return (
    <Layout
      title="Feature Request"
      description="Submit your feature requests and help shape the future of RaiseTalks">

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
        }
        
        .confetti-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
          z-index: 9999;
        }
        
        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 10px;
          background: linear-gradient(45deg, var(--raisetalks-blue-primary), var(--raisetalks-blue-primary));
          animation: confetti 3s ease-out forwards;
        }
      `}</style>

      {/* Hero Section */}
      <section className="cleanHeroSection">
        <div className="cleanHeroContainer">
          <h1 className="cleanHeroTitle">
            <span className="cleanHeroTitleAccent">Help Us Build Better</span>
          </h1>
          <p className="cleanHeroDescription">
            Your ideas matter. Tell us what features would make your fundraising journey smoother.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-gray-200">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field (Optional) */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Name <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--raisetalks-blue-primary)] focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--raisetalks-blue-primary)] focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Feature Type and Priority Grid */}
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Feature Type */}
                  <div>
                    <label htmlFor="featureType" className="block text-sm font-semibold text-gray-700 mb-2">
                      Feature Type
                    </label>
                    <select
                      id="featureType"
                      name="featureType"
                      value={formData.featureType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--raisetalks-blue-primary)] focus:border-transparent transition-all cursor-pointer"
                    >
                      {featureTypeOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Priority */}
                  <div>
                    <label htmlFor="priority" className="block text-sm font-semibold text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--raisetalks-blue-primary)] focus:border-transparent transition-all cursor-pointer"
                    >
                      {priorityOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description Field */}
                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--raisetalks-blue-primary)] focus:border-transparent transition-all resize-none"
                    placeholder="Describe the feature you'd like to see. Be as specific as possible..."
                  />
                  <div className="mt-2 text-sm text-gray-500 text-right">
                    {charCount} / {maxChars} characters
                  </div>
                </div>

                {/* Use Case Field */}
                <div>
                  <label htmlFor="useCase" className="block text-sm font-semibold text-gray-700 mb-2">
                    Use Case <span className="text-gray-400">(optional)</span>
                  </label>
                  <textarea
                    id="useCase"
                    name="useCase"
                    value={formData.useCase}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--raisetalks-blue-primary)] focus:border-transparent transition-all resize-none"
                    placeholder="How would this feature help your fundraising process?"
                  />
                </div>

                {/* Status Messages */}
                {status === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 font-medium">
                      {errorMessage || 'Something went wrong. Please try again.'}
                    </p>
                  </div>
                )}

                {status === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 font-medium">
                      Thank you! Your feature request has been submitted successfully.
                    </p>
                    <p className="text-green-600 text-sm mt-1">
                      We'll review it and get back to you soon.
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={`w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-white transition-all ${status === 'loading'
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[var(--raisetalks-blue-primary)] to-[var(--raisetalks-blue-primary)] hover:shadow-xl'
                      }`}
                  >
                    {status === 'loading' ? 'Submitting...' : 'Submit Feature Request'}
                  </button>

                  {formData.description && (
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          name: '',
                          email: '',
                          featureType: 'enhancement',
                          priority: 'medium',
                          description: '',
                          useCase: '',
                        });
                        setCharCount(0);
                        localStorage.removeItem('featureRequestDraft');
                      }}
                      className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                    >
                      Clear Draft
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Additional Info */}
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">
                Have a bug to report? Email us directly at{' '}
                <a href="mailto:support@raisetalks.ai" className="text-[var(--raisetalks-blue-primary)] hover:underline">
                  support@raisetalks.ai
                </a>
              </p>
              <p className="text-sm text-gray-500">
                Your feedback helps us build the best fundraising platform for startups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Confetti Effect for Success */}
      {status === 'success' && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                backgroundColor: ['var(--raisetalks-blue-primary)', 'var(--raisetalks-blue-primary)', '#4ade80', '#fbbf24', '#f87171'][Math.floor(Math.random() * 5)],
              }}
            />
          ))}
        </div>
      )}
    </Layout>
  );
}