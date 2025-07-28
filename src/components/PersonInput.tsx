import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { v4 as uuidv4 } from 'uuid';

interface PersonInputProps {
  onAdd: (name: string, id: string) => void;
}

const PersonInput: React.FC<PersonInputProps> = ({ onAdd }) => {
  const [name, setName] = useState('');

  const handleAdd = () => {
    if (name.trim()) {
      onAdd(name, uuidv4());
      setName('');
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        type="text"
        placeholder="Masukkan nama orang"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button onClick={handleAdd} variant="default">
        Tambah
      </Button>
    </div>
  );
};

export default PersonInput;
