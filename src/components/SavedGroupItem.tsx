import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import type { SavedGroup } from '@/types';

interface SavedGroupItemProps {
  savedGroup: SavedGroup;
  onLoad: (savedGroup: SavedGroup) => void;
  onDelete: (id: string) => void;
}

const SavedGroupItem: React.FC<SavedGroupItemProps> = ({ savedGroup, onLoad, onDelete }) => {
  return (
    <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{savedGroup.name}</CardTitle>
            <CardDescription>
              {savedGroup.groups.length} kelompok • Dibuat {new Date(savedGroup.createdAt).toLocaleDateString('id-ID')}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onLoad(savedGroup)}
            >
              Gunakan
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(savedGroup.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {savedGroup.groups.map((group) => (
            <div key={group.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="font-medium mb-2">Kelompok {group.id}</div>
              <div className="text-sm text-muted-foreground">
                {group.members.map(m => m.name).join(', ')}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export { SavedGroupItem };