import React from 'react';

function AboutUs() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">About Us</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              The Google Arcade Points Calculator is designed to help Cloud Skills Boost users track their progress 
              and understand their points in the Google Arcade program. Our mission is to provide a transparent 
              and user-friendly way to calculate and monitor points earned through various badges and achievements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What We Do</h2>
            <p className="text-gray-600 mb-4">
              We provide a comprehensive points calculation system that:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Automatically calculates points from your Cloud Skills Boost profile</li>
              <li>Tracks different types of badges (Game, Trivia, Skill)</li>
              <li>Shows progress towards different reward tiers</li>
              <li>Provides detailed breakdown of points earned</li>
              <li>Helps facilitators track their milestone progress</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Team</h2>
            <p className="text-gray-600">
              We are a team of Google Cloud enthusiasts and developers passionate about helping others 
              succeed in their cloud journey. Our tool is developed and maintained by community members 
              who understand the importance of tracking progress and staying motivated in learning programs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-600">
              Have questions or suggestions? We'd love to hear from you! Visit our{' '}
              <a href="/contact" className="text-blue-600 hover:text-blue-800">Contact page</a> to get in touch.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AboutUs; 
