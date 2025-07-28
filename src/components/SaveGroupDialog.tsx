import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SaveGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (name: string) => void;
}

const SaveGroupDialog: React.FC<SaveGroupDialogProps> = ({ open, onOpenChange, onSave }) => {
  const [groupName, setGroupName] = useState('');

  const handleSave = () => {
    if (!groupName.trim()) return;
    onSave(groupName.trim());
    setGroupName('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Simpan Kelompok</DialogTitle>
          <DialogDescription>
            Berikan nama untuk menyimpan pembagian kelompok ini
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="groupName">Nama Kelompok</Label>
            <Input
              id="groupName"
              placeholder="Contoh: Kelompok Diskusi Sesi 1"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button onClick={handleSave}>Simpan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { SaveGroupDialog };