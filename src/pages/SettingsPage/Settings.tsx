'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { User, Settings as SettingsIcon } from 'lucide-react';
import ProfileSettings from '@/widgets/ProfileSettings/ui/ProfileSettings';
import GeneralSettings from '@/widgets/GeneralSettings/ui/GeneralSettings';

const SettingsPage = () => {
  const [tab, setTab] = useState('profile');

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-4 md:px-6 lg:py-6">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Settings
          </h1>
          <p className="text-sm text-gray-500">
            Manage your profile, preferences, and workspace settings.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="mb-4 flex w-full justify-start gap-2 rounded-full bg-gray-100 p-1">
          <TabsTrigger
            value="profile"
            className="flex items-center gap-2 rounded-full px-4 py-1 text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger
            value="general"
            className="flex items-center gap-2 rounded-full px-4 py-1 text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <SettingsIcon className="h-4 w-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-0">
          <ProfileSettings />
        </TabsContent>

        <TabsContent value="general" className="mt-0">
          <GeneralSettings />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default SettingsPage;
