import React, { useState } from 'react';
import { Button } from './ui/button';

interface GroupControlsProps {
  onGenerate: (groupCount: number) => void;
  disabled: boolean;
}

const GroupControls: React.FC<GroupControlsProps> = ({ onGenerate, disabled }) => {
  const [groupCount, setGroupCount] = useState(2);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupCount(parseInt(e.target.value));
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
      <input
        type="number"
        min={2}
        value={groupCount}
        onChange={handleChange}
        className="w-20 rounded-md text-black px-2 py-1"
      />
      <Button onClick={() => onGenerate(groupCount)} disabled={disabled}>
        Acak Kelompok
      </Button>
    </div>
  );
};

export default GroupControls;
