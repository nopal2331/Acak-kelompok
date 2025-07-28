import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Copy, Check } from 'lucide-react';
import type { Group } from '@/types';

interface GroupCardProps {
  group: Group;
}

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    const text = `Kelompok ${group.id}:\n${group.members.map(m => `• ${m.name}`).join('\n')}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <Users className="h-4 w-4 text-white" />
            </div>
            Kelompok {group.id}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-8 w-8 p-0"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <CardDescription>
          {group.members.length} anggota
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {group.members.map((member, index) => (
            <div
              key={member.id}
              className="flex items-center gap-3 p-2 bg-white/50 dark:bg-gray-700/50 rounded-lg"
            >
              <Badge variant="outline" className="w-6 h-6 rounded-full flex items-center justify-center text-xs">
                {index + 1}
              </Badge>
              <span className="font-medium">{member.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export { GroupCard };