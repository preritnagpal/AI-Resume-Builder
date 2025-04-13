import React from 'react';
import Navbar from '@/components/nav-bar';

export default function AboutPage() {
return (
    <>
        <Navbar />
            <main className="min-h-screen px-6 py-12 bg-white text-gray-800">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-6 text-blue-700">About HireLens</h1>

                <p className="text-lg mb-4">
                <strong>HireLens</strong> is your intelligent partner in crafting job-winning resumes. Built with modern technologies and enhanced by AI, HireLens empowers job seekers to create, analyze, and perfect their resumes with ease.
                </p>

                <p className="text-lg mb-4">
                Whether you're a fresh graduate or a seasoned professional, our platform offers tools like:
                </p>

                <ul className="list-disc list-inside text-lg mb-6 space-y-2">
                    <li><strong>AI-Powered Resume Builder</strong> – Quickly generate polished resumes with professional summaries and bullet points.</li>
                    <li><strong>ATS Resume Scanner</strong> – Score your resume against real job descriptions and see what recruiters see.</li>
                    <li><strong>Bullet Point & Summary Generator</strong> – Craft optimized descriptions that highlight your experience and skills.</li>
                    <li><strong>Real-Time Preview & Templates</strong> – Instantly see how your resume looks, and choose from modern templates.</li>
                </ul>

                <p className="text-lg mb-6">
                    We believe your resume should speak for you – clearly, confidently, and effectively. With HireLens, you get more than a tool; you get an edge.
                </p>

                <p className="text-md text-gray-600">
                    Built with ❤️ using Next.js, React, TypeScript, Tailwind CSS, Vercel Postgres, and Kinde Auth.
                </p>
                </div>
            </main>
    </>
);
}
