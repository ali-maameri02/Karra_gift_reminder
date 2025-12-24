'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const mockUser = {
  name: 'Natashia Bunny',
  email: 'natasiabunny@mail.com',
  role: 'Administrator',
  avatar: 'https://i.pravatar.cc/150?img=67',
  bio: 'Gift reminder enthusiast and product lead.',
};

const ProfileSettings = () => {
  const [preview, setPreview] = useState(mockUser.avatar);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
      {/* Left: profile form */}
      <Card className="border-0 shadow-sm">
        <div className="border-b border-gray-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-gray-900">
            Profile
          </h2>
          <p className="text-xs text-gray-500">
            Update your personal information and how others see you.
          </p>
        </div>

        <form
          className="space-y-4 px-4 py-4"
          onSubmit={(e) => {
            e.preventDefault();
            // hook to backend here
          }}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                defaultValue={mockUser.name}
                className="bg-white"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue={mockUser.email}
                className="bg-gray-50"
                disabled
              />
              <p className="text-[11px] text-gray-400">
                Email is used for login and cannot be changed here.
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              defaultValue={mockUser.role}
              className="bg-gray-50"
              disabled
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              rows={3}
              defaultValue={mockUser.bio}
              placeholder="Short description that appears on your profile..."
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-full bg-primary px-4 text-primary-foreground hover:bg-primary/90"
            >
              Save changes
            </Button>
          </div>
        </form>
      </Card>

      {/* Right: avatar + account info */}
      <Card className="border-0 shadow-sm">
        <div className="border-b border-gray-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-gray-900">
            Profile picture
          </h2>
          <p className="text-xs text-gray-500">
            This is how your avatar appears in the dashboard.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 px-4 py-4">
          <div className="relative">
            <img
              src={preview}
              alt={mockUser.name}
              className="h-24 w-24 rounded-full border-4 border-white shadow-md object-cover"
            />
          </div>
          <div className="flex flex-col items-center gap-2 text-xs text-gray-500">
            <label className="cursor-pointer rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200">
              Change photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
            <p>PNG or JPG, max 2 MB.</p>
          </div>

          <div className="mt-3 w-full rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-600">
            <p className="font-medium text-gray-700">Account info</p>
            <p>ID: <span className="font-mono">USR-0001</span></p>
            <p>Member since: 2024-03-12</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileSettings;
