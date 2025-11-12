import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { User, Bell, Lock, Palette, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner@2.0.3';

interface SettingsPageProps {
  userRole: 'student' | 'mentor';
}

export function SettingsPage({ userRole }: SettingsPageProps) {
  const [name, setName] = useState(userRole === 'student' ? 'John Student' : 'Dr. Jane Mentor');
  const [email, setEmail] = useState(userRole === 'student' ? 'john@student.edu' : 'jane@mentor.edu');
  const [bio, setBio] = useState(userRole === 'student' ? 'Passionate learner focused on STEM' : 'Experienced educator specializing in mathematics');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [taskReminders, setTaskReminders] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);

  const saveProfile = () => {
    toast.success('Profile updated successfully! ✨');
  };

  const handleNotificationToggle = (type: string, value: boolean) => {
    if (type === 'email') setEmailNotifications(value);
    if (type === 'tasks') setTaskReminders(value);
    if (type === 'weekly') setWeeklyReport(value);
    toast.success(`${type} notifications ${value ? 'enabled' : 'disabled'}`);
  };
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account preferences and notifications</p>
      </div>

      {/* Profile Settings */}
      <Card className="p-6 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-gray-800 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg">
            <User className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-white">Profile Settings</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label className="text-gray-300 mb-2 block">Full Name</Label>
            <Input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#1a1a1a] border-gray-700 text-white"
            />
          </div>
          <div>
            <Label className="text-gray-300 mb-2 block">Email</Label>
            <Input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#1a1a1a] border-gray-700 text-white"
            />
          </div>
          <div>
            <Label className="text-gray-300 mb-2 block">Bio</Label>
            <Input 
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="bg-[#1a1a1a] border-gray-700 text-white"
            />
          </div>
          <Button 
            onClick={saveProfile}
            className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white border-0">
            Save Profile
          </Button>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-gray-800 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg">
            <Bell className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-white">Notification Preferences</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-lg border border-gray-800">
            <div>
              <p className="text-white mb-1">Email Notifications</p>
              <p className="text-sm text-gray-400">Receive updates via email</p>
            </div>
            <Switch 
              checked={emailNotifications}
              onCheckedChange={(checked) => handleNotificationToggle('email', checked)}
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-lg border border-gray-800">
            <div>
              <p className="text-white mb-1">Task Reminders</p>
              <p className="text-sm text-gray-400">Get reminded about upcoming deadlines</p>
            </div>
            <Switch 
              checked={taskReminders}
              onCheckedChange={(checked) => handleNotificationToggle('tasks', checked)}
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-[#0f0f0f] rounded-lg border border-gray-800">
            <div>
              <p className="text-white mb-1">Weekly Progress Report</p>
              <p className="text-sm text-gray-400">Receive weekly summary of your progress</p>
            </div>
            <Switch 
              checked={weeklyReport}
              onCheckedChange={(checked) => handleNotificationToggle('weekly', checked)}
            />
          </div>
        </div>
      </Card>

      {/* Privacy & Security */}
      <Card className="p-6 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-gray-800 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-white">Privacy & Security</h3>
        </div>
        
        <div className="space-y-4">
          <Button 
            variant="outline" 
            onClick={() => toast.info('Password change dialog would open here')}
            className="w-full justify-start border-gray-700 bg-transparent text-white hover:bg-gray-800"
          >
            Change Password
          </Button>
          <Button 
            variant="outline" 
            onClick={() => toast.info('Two-factor authentication setup would open here')}
            className="w-full justify-start border-gray-700 bg-transparent text-white hover:bg-gray-800"
          >
            Two-Factor Authentication
          </Button>
          <Button 
            variant="outline" 
            onClick={() => toast.info('Privacy settings dialog would open here')}
            className="w-full justify-start border-gray-700 bg-transparent text-white hover:bg-gray-800"
          >
            Privacy Settings
          </Button>
        </div>
      </Card>
    </div>
  );
}
