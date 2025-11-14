'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, User } from 'lucide-react';

export default function Home() {
  const [selectedRole, setSelectedRole] = useState<'staff' | 'care-recipient' | null>(null);
  const router = useRouter();

  const handleContinue = () => {
    if (selectedRole === 'staff') {
      router.push('/auth/login');
    } else if (selectedRole === 'care-recipient') {
      // Will navigate to the care recipient flow later
      router.push('/care-recipient');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col justify-between p-4">
      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-bold text-center mb-12 text-slate-900">
            I want to use this app as:
          </h1>

          {/* Role selection cards */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {/* Staff card */}
            <button
              onClick={() => setSelectedRole('staff')}
              className={`p-6 rounded-xl border-2 transition-all ${
                selectedRole === 'staff'
                  ? 'border-teal-600 bg-teal-50 shadow-md'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col items-center gap-3">
                <Users className="w-12 h-12 text-slate-700" strokeWidth={1.5} />
                <span className="text-lg font-semibold text-slate-900">Staff</span>
              </div>
            </button>

            {/* Care recipient card */}
            <button
              onClick={() => setSelectedRole('care-recipient')}
              className={`p-6 rounded-xl border-2 transition-all ${
                selectedRole === 'care-recipient'
                  ? 'border-teal-600 bg-teal-50 shadow-md'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col items-center gap-3">
                <User className="w-12 h-12 text-slate-700" strokeWidth={1.5} />
                <span className="text-lg font-semibold text-slate-900">Care recipient</span>
              </div>
            </button>
          </div>

          {/* Continue button */}
          <Button
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`w-full py-6 text-lg rounded-full font-semibold transition-all ${
              selectedRole
                ? 'bg-teal-600 hover:bg-teal-700 text-white'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            Continue
          </Button>
        </div>
      </div>

      {/* Footer with terms */}
      <div className="text-center pb-8">
        <p className="text-sm text-slate-600">
          By continuing, you agree to our{' '}
          <a href="#" className="text-teal-600 hover:underline font-semibold">
            Terms of Use
          </a>
          {' '}and{' '}
          <a href="#" className="text-teal-600 hover:underline font-semibold">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}