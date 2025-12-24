'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const GeneralSettings = () => {
  const [saving, setSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Preferences */}
      <Card className="border-0 shadow-sm">
        <div className="border-b border-gray-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-gray-900">
            Preferences
          </h2>
          <p className="text-xs text-gray-500">
            Control language, time zone, and notification defaults.
          </p>
        </div>

        <form
          className="space-y-4 px-4 py-4"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <Label>Language</Label>
              <Select defaultValue="en">
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="nl">Nederlands</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label>Time zone</Label>
              <Select defaultValue="europe-amsterdam">
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select time zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="europe-amsterdam">
                    Europe / Amsterdam
                  </SelectItem>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="america-newyork">
                    America / New York
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
              <div>
                <Label className="text-xs font-medium text-gray-800">
                  Email notifications
                </Label>
                <p className="text-[11px] text-gray-500">
                  Receive email updates for important events.
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
              <div>
                <Label className="text-xs font-medium text-gray-800">
                  In-app alerts
                </Label>
                <p className="text-[11px] text-gray-500">
                  Show live alerts in the dashboard header.
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
            >
              Reset
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="rounded-full bg-primary px-4 text-primary-foreground hover:bg-primary/90"
            >
              {saving ? 'Saving...' : 'Save preferences'}
            </Button>
          </div>
        </form>
      </Card>

      {/* Workspace / branding example */}
      <Card className="border-0 shadow-sm">
        <div className="border-b border-gray-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-gray-900">
            Workspace & branding
          </h2>
          <p className="text-xs text-gray-500">
            Customize the name and branding for your admin workspace.
          </p>
        </div>

        <form
          className="space-y-4 px-4 py-4"
          onSubmit={handleSubmit}
        >
          <div className="space-y-1">
            <Label htmlFor="workspace">Workspace name</Label>
            <Input
              id="workspace"
              defaultValue="Karaa Admin"
              className="bg-white"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="supportEmail">Support email</Label>
            <Input
              id="supportEmail"
              type="email"
              defaultValue="support@karaa.app"
              className="bg-white"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="footerNote">Footer note</Label>
            <Textarea
              id="footerNote"
              rows={2}
              placeholder="Short message to show in dashboard footer..."
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="rounded-full bg-primary px-4 text-primary-foreground hover:bg-primary/90"
            >
              {saving ? 'Saving...' : 'Save workspace'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default GeneralSettings;
