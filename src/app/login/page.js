'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Car, LogOut, Settings } from 'lucide-react';


const PASSWORD = '5032TA30'; 

export default function LoginPage() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem('loggedIn') === 'true') {
      router.push('/');
    }
  }, [router]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (input === PASSWORD) {
      localStorage.setItem('loggedIn', 'true');
      router.push('/');
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Car className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">ParkSmart</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* <Badge variant="secondary" className="text-sm">
                <Clock className="h-4 w-4 mr-1" />
                {currentTime.toLocaleTimeString()}
              </Badge> */}
            </div>
          </div>
        </div>
      </header>
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4">
        <h1 className="text-xl font-bold text-center text-gray-500">Login</h1>
        <div className='space-y-4'>
        <Input
          type="password"
          placeholder="Enter password"
          value={input}
          className="w-full"
          onChange={(e) => setInput(e.target.value)}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button
          type="submit"
          className=" bg-gray-500 text-white hover:bg-gray-600 px-6 mx-auto block"
        >
          Login
        </Button>
        </div>
      </form>
    </main>
    </div>
  );
}
