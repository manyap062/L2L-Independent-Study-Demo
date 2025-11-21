import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { User, Bell, Lock, Palette, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

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
        <h1 className="heading-font text-[#212721] mb-2">Settings</h1>
        <p className="body-font text-[#505759]">Manage your account preferences and notifications</p>
      </div>

      {/* Profile Settings */}
      <Card className="p-6 bg-white border border-[#e0e0e0] rounded-lg shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#F5F6F4] rounded-lg">
            <User className="w-5 h-5 text-[#881c1c]" />
          </div>
          <h3 className="heading-font text-[#212721]">Profile Settings</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label className="body-font text-[#212721] mb-2 block">Full Name</Label>
            <Input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white border-[#e0e0e0] text-[#212721] focus:border-[#881c1c]"
            />
          </div>
          <div>
            <Label className="body-font text-[#212721] mb-2 block">Email</Label>
            <Input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white border-[#e0e0e0] text-[#212721] focus:border-[#881c1c]"
            />
          </div>
          <div>
            <Label className="body-font text-[#212721] mb-2 block">Bio</Label>
            <Input 
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="bg-white border-[#e0e0e0] text-[#212721] focus:border-[#881c1c]"
            />
          </div>
          <Button 
            onClick={saveProfile}
            className="bg-[#881c1c] hover:bg-[#6d1616] text-white border-0">
            Save Profile
          </Button>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6 bg-white border border-[#e0e0e0] rounded-lg shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#F5F6F4] rounded-lg">
            <Bell className="w-5 h-5 text-[#881c1c]" />
          </div>
          <h3 className="heading-font text-[#212721]">Notification Preferences</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#F5F6F4] rounded-lg border border-[#e0e0e0]">
            <div>
              <p className="body-font text-[#212721] mb-1">Email Notifications</p>
              <p className="body-font text-sm text-[#505759]">Receive updates via email</p>
            </div>
            <Switch 
              checked={emailNotifications}
              onCheckedChange={(checked) => handleNotificationToggle('email', checked)}
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-[#F5F6F4] rounded-lg border border-[#e0e0e0]">
            <div>
              <p className="body-font text-[#212721] mb-1">Task Reminders</p>
              <p className="body-font text-sm text-[#505759]">Get reminded about upcoming deadlines</p>
            </div>
            <Switch 
              checked={taskReminders}
              onCheckedChange={(checked) => handleNotificationToggle('tasks', checked)}
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-[#F5F6F4] rounded-lg border border-[#e0e0e0]">
            <div>
              <p className="body-font text-[#212721] mb-1">Weekly Progress Report</p>
              <p className="body-font text-sm text-[#505759]">Receive weekly summary of your progress</p>
            </div>
            <Switch 
              checked={weeklyReport}
              onCheckedChange={(checked) => handleNotificationToggle('weekly', checked)}
            />
          </div>
        </div>
      </Card>

      {/* Privacy & Security */}
      <Card className="p-6 bg-white border border-[#e0e0e0] rounded-lg shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#F5F6F4] rounded-lg">
            <Lock className="w-5 h-5 text-[#881c1c]" />
          </div>
          <h3 className="heading-font text-[#212721]">Privacy & Security</h3>
        </div>
        
        <div className="space-y-4">
          <Button 
            variant="outline" 
            onClick={() => toast.info('Password change dialog would open here')}
            className="w-full justify-start border-[#e0e0e0] bg-transparent text-[#212721] hover:bg-[#F5F6F4] hover:border-[#881c1c]"
          >
            Change Password
          </Button>
          <Button 
            variant="outline" 
            onClick={() => toast.info('Two-factor authentication setup would open here')}
            className="w-full justify-start border-[#e0e0e0] bg-transparent text-[#212721] hover:bg-[#F5F6F4] hover:border-[#881c1c]"
          >
            Two-Factor Authentication
          </Button>
          <Button 
            variant="outline" 
            onClick={() => toast.info('Privacy settings dialog would open here')}
            className="w-full justify-start border-[#e0e0e0] bg-transparent text-[#212721] hover:bg-[#F5F6F4] hover:border-[#881c1c]"
          >
            Privacy Settings
          </Button>
        </div>
      </Card>
    </div>
  );
}
