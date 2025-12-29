import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/app/providers/AuthProvider';
import { registerSchema, RegisterValues } from '@/processes/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

/* ---------------- Role Selector ---------------- */
const RoleSelector = ({
  selectedRole,
  onSelect,
}: {
  selectedRole:  'vendor' | 'delivery';
  onSelect: (role: 'vendor' | 'delivery') => void;
}) => (
  <div className="flex flex-wrap justify-center gap-2 mb-4">
    {(['vendor', 'delivery'] as const).map(role => (
      <Badge
        key={role}
        variant={selectedRole === role ? 'default' : 'outline'}
        className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all
          ${
            selectedRole === role
              ? 'bg-[#3E236E] text-white'
              : 'border-[#3E236E]/30 text-[#3E236E] hover:bg-[#3E236E]/5'
          }`}
        onClick={() => onSelect(role)}
      >
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    ))}
  </div>
);

export const RegisterCard = ({ onSwitch }: { onSwitch: () => void }) => {
  const [selectedRole, setSelectedRole] =
    useState<  'vendor' | 'delivery'>('vendor');
    const{register:registerUser,isLoading,error}=useAuth();

    const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: RegisterValues) => {
     console.log('SUBMIT DATA', data, selectedRole);
    
    await registerUser({
      email: data.email,
      password: data.password,
      role: selectedRole,
      firstName: "string",
      lastName: "string",
      phoneNumber: "string",
      address: {
    street: "string",
    city: "string",
    state: "string",
    postalCode: "string",
    country: "string",
  },
      deviceInfo: "string",
    });
  };

  return (
    <Card className="w-full max-w-md bg-white/85 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold text-[#3E236E]">
          Create account
        </CardTitle>
        <CardDescription>Join Karaa Gift Reminder today</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 🔘 Role Selector */}
        <RoleSelector selectedRole={selectedRole} onSelect={setSelectedRole} />

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

            {error && (
              <div className="text-sm text-destructive">{error}</div>
            )}

            <Button
              type="submit"
              className="w-full bg-[#3E236E] hover:bg-[#3E236E]/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm">
          Already have an account?{' '}
          <button
            onClick={onSwitch}
            className="text-[#3E236E] font-medium hover:underline"
          >
            Sign in
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
