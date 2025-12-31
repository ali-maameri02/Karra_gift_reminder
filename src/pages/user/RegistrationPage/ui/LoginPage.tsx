'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// import { loginSchema, type LoginValues } from '../model/loginSchema';
import { useAuth } from '@/app/providers/AuthProvider';
import { RoutePath } from '@/app/routing/routes'; // ✅ Import routes
import { loginSchema, type LoginValues } from '@/processes/auth';

// 🔹 Role selector (same as in RegisterCard)
const RoleSelector = ({ 
  selectedRole, 
  onSelect 
}: { 
  selectedRole: 'admin' | 'vendor' | 'delivery'; 
  onSelect: (role: 'admin' | 'vendor' | 'delivery') => void; 
}) => (
  <div className="flex flex-wrap justify-center gap-2 mb-4">
    {(['admin', 'vendor', 'delivery'] as const).map(role => (
      <button
        key={role}
        type="button"
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors
          ${selectedRole === role 
            ? 'bg-[#3E236E] text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        onClick={() => onSelect(role)}
      >
        {role === 'vendor' ? '🎁 Vendor' : 
         role === 'delivery' ? '🚚 Delivery' : '👑 Admin'}
      </button>
    ))}
  </div>
);

export const LoginCard = ({ onSwitch }: { onSwitch: () => void }) => {
  const navigate = useNavigate();
  const { login, error, isLoading } = useAuth(); // ✅ destructured 'login'
  
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<'admin' | 'vendor' | 'delivery'>('vendor'); // ✅ add state

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginValues) => {
    await login({
      email: data.email,
      password: data.password,
    });

    const redirectPath =
      selectedRole === 'admin'
        ? RoutePath.admin.dashboard
        : selectedRole === 'delivery'
        ? '/delivery'
        : '/vendor';

    navigate(redirectPath, { replace: true });
  };

  return (
    <Card className="w-full max-w-md bg-white/85 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold text-[#3E236E]">
          Welcome back
        </CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>

      <CardContent>
        {/* 🔹 Role Selector */}
        <RoleSelector 
          selectedRole={selectedRole} 
          onSelect={setSelectedRole} 
        />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {(submitError || error) && (
              <div className="text-sm text-destructive">
                {submitError || error}
              </div>
            )}

            <Button className="w-full bg-[#3E236E] hover:bg-[#3E236E]/90 text-white" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          Don’t have an account?{' '}
          <button
            onClick={onSwitch}
            className="text-[#3E236E] font-medium hover:underline"
          >
            Sign up
          </button>
        </div>
      </CardContent>
    </Card>
  );
};