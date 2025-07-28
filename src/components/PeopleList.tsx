import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Trash2 } from 'lucide-react';
import type { Person } from '@/types';

interface PeopleListProps {
  people: Person[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

const PeopleList: React.FC<PeopleListProps> = ({ people, onRemove, onClearAll }) => {
  if (people.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">
          Daftar Peserta ({people.length})
        </Label>
        <Button
          variant="destructive"
          size="sm"
          onClick={onClearAll}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Hapus Semua
        </Button>
      </div>
      <div className="grid gap-2 max-h-60 overflow-y-auto">
        {people.map((person, index) => (
          <div
            key={person.id}
            className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg border"
          >
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="w-8 h-8 rounded-full flex items-center justify-center">
                {index + 1}
              </Badge>
              <span className="font-medium">{person.name}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(person.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export { PeopleList };