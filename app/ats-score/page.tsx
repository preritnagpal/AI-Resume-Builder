import Link from 'next/link';
import { ChevronLeft, Upload, FileText, AlertCircle } from 'lucide-react';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import AtsScoreForm from '@/components/ats-score-form';

export default async function AtsScoreTrackerPage() {
  const { isAuthenticated } = getKindeServerSession();
  
  if (!(await isAuthenticated())) {
    redirect('/api/auth/login?post_login_redirect_url=/ats-score-tracker');
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link 
          href="/" 
          className="flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Home
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            ATS Resume Score Tracker
          </h1>
          <p className="text-gray-600 mt-1">
            Upload your resume to get an instant ATS compatibility score and improvement suggestions
          </p>
        </div>

        <AtsScoreForm />
      </div>
    </div>
  );
}