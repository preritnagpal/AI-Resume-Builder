import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import SummaryForm from '@/components/summary-form';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

export default async function SummaryGeneratorPage() {
  const { isAuthenticated } = getKindeServerSession();
  
  // Redirect to login if not authenticated
  if (!(await isAuthenticated())) {
    redirect('/api/auth/login?post_login_redirect_url=/summary-generator');
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
            Professional Summary Generator
          </h1>
          <p className="text-gray-600 mt-1">
            Create a compelling resume summary tailored to your experience level
          </p>
        </div>

        <SummaryForm />
      </div>
    </div>
  );
}