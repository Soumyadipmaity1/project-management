import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';
export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold">WP</span>
              </div>
              <span className="text-2xl font-bold text-white">WorkPilot</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Empowering teams to navigate projects with intelligence, collaboration, and efficiency.
            </p>
            <div className="flex space-x-4">
              <Twitter className="w-5 h-5 text-gray-400 hover:text-indigo-400 cursor-pointer transition-colors duration-200" />
              <Github className="w-5 h-5 text-gray-400 hover:text-indigo-400 cursor-pointer transition-colors duration-200" />
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-indigo-400 cursor-pointer transition-colors duration-200" />
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <div className="space-y-2">
              <a href="#features" className="block text-gray-400 hover:text-white transition-colors duration-200">Features</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200">Pricing</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200">Integrations</a>
            </div>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200">About</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200">Contact</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200">Careers</a>
            </div>
          </div>
        </div>

        <hr className="border-gray-800 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 WorkPilot. All rights reserved. Designed for Modern Teams.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="#" className="text-gray-500 hover:text-white transition-colors duration-200">Privacy Policy</Link>
            <Link href="#" className="text-gray-500 hover:text-white transition-colors duration-200">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}