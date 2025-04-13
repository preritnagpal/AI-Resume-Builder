// app/bullet-generator/page.tsx
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import BulletPointForm from '@/components/bullet-points-form';

export default async function BulletPointGeneratorPage() {
  const { isAuthenticated } = getKindeServerSession();
  
  // Redirect to login if not authenticated
  if (!(await isAuthenticated())) {
    redirect('/api/auth/login?post_login_redirect_url=/bullet-generator');
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
            Bullet Point Generator
          </h1>
          <p className="text-gray-600 mt-1">
            Create impactful, job-winning bullet points with AI
          </p>
        </div>

        <BulletPointForm />
      </div>
    </div>
  );
}