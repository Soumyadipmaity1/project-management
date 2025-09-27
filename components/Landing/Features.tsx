import React from 'react';
import { CheckCircle, Users, Calendar, BarChart3, Zap, Shield } from 'lucide-react';

const features = [
	{
		icon: CheckCircle,
		title: 'Smart Task Management',
		description:
			'Intelligent task prioritization and automated scheduling for maximum efficiency.'
	},
	{
		icon: Users,
		title: 'Team Collaboration',
		description:
			'Real-time collaboration tools that keep everyone connected and productive.'
	},
	{
		icon: Calendar,
		title: 'Timeline Tracking',
		description:
			'Visual project timelines with milestone tracking and deadline management.'
	},
	{
		icon: BarChart3,
		title: 'Progress Analytics',
		description:
			'Comprehensive insights to track progress and identify bottlenecks.'
	},
	{
		icon: Zap,
		title: 'Workflow Automation',
		description:
			'Automate repetitive tasks and workflows to focus on what matters most.'
	},
	{
		icon: Shield,
		title: 'Secure & Reliable',
		description:
			'Enterprise-grade security with encrypted data and reliable performance.'
	}
];

export default function Features() {
	return (
		<section id="features" className="py-20 bg-gray-900">
			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold text-white mb-4">
						Powerful Features for Modern Teams
					</h2>
					<p className="text-xl text-gray-400 max-w-2xl mx-auto">
						Everything you need to manage projects efficiently and scale your
						team's productivity.
					</p>
				</div>

				{/* Features Grid */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
					{features.map((feature, index) => (
						<div
							key={index}
							className="group p-6 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-indigo-500/30 hover:bg-gray-800/70 transition-all duration-300"
						>
							<div className="w-12 h-12 rounded-lg bg-indigo-500/10 border border-indigo-500/20 p-3 mb-4 group-hover:bg-indigo-500/20 transition-all duration-300">
								<feature.icon className="w-6 h-6 text-indigo-400" />
							</div>

							<h3 className="text-xl font-semibold text-white mb-3">
								{feature.title}
							</h3>

							<p className="text-gray-400 leading-relaxed">
								{feature.description}
							</p>
						</div>
					))}
				</div>

				{/* CTA Section */}
				<div className="text-center">
					<div className="bg-gradient-to-r from-indigo-600/20 to-blue-600/20 border border-indigo-500/30 rounded-2xl p-8">
						<h3 className="text-2xl font-bold text-white mb-4">
							Ready to Transform Your Workflow?
						</h3>
						<p className="text-gray-400 mb-6 max-w-md mx-auto">
							Join thousands of teams already using WorkPilot to deliver
							exceptional results.
						</p>
						<button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-indigo-500/25">
							Get Started Today
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}