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

        <Input placeholder="Email" />
        <Input type="password" placeholder="Password" />

        <Button className="w-full">Create account</Button>

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
