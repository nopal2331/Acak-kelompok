import React, { useState } from 'react';
import { Dialog } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface SaveGroupDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

const SaveGroupDialog: React.FC<SaveGroupDialogProps> = ({ open, onClose, onSave }) => {
  const [groupName, setGroupName] = useState('');

  const handleSave = () => {
    if (groupName.trim()) {
      onSave(groupName);
      setGroupName('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <h2 className="text-lg font-bold mb-4 text-black">Simpan Kelompok</h2>
      <Input
        placeholder="Nama kelompok"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <div className="mt-4 flex justify-end space-x-2">
        <Button variant="ghost" onClick={onClose}>
          Batal
        </Button>
        <Button onClick={handleSave}>Simpan</Button>
      </div>
    </Dialog>
  );
};

export default SaveGroupDialog;
