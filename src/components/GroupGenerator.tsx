import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shuffle } from 'lucide-react';

interface GroupGeneratorProps {
  groupCount: number;
  onGroupCountChange: (count: number) => void;
  onGenerate: () => void;
  peopleCount: number;
}

const GroupGenerator: React.FC<GroupGeneratorProps> = ({
  groupCount,
  onGroupCountChange,
  onGenerate,
  peopleCount
}) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1 space-y-2">
          <Label htmlFor="groupCount">Jumlah Kelompok</Label>
          <Input
            id="groupCount"
            type="number"
            min={2}
            max={peopleCount}
            value={groupCount}
            onChange={(e) => onGroupCountChange(parseInt(e.target.value) || 2)}
            className="w-full sm:w-32"
          />
        </div>
        <Button
          onClick={onGenerate}
          disabled={peopleCount === 0}
          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
        >
          <Shuffle className="h-4 w-4 mr-2" />
          Acak Kelompok
        </Button>
      </div>

      {peopleCount === 0 && (
        <Alert className="mt-4">
          <AlertDescription>
            Tambahkan minimal 2 peserta untuk mulai membuat kelompok.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export { GroupGenerator };