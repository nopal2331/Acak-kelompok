import React from 'react';
import { Button } from './ui/button';

interface DataManagementProps {
  onClearPeople: () => void;
  onClearGroups: () => void;
}

const DataManagement: React.FC<DataManagementProps> = ({ onClearPeople, onClearGroups }) => {
  return (
    <div className="flex gap-4 mt-6">
      <Button variant="destructive" onClick={onClearPeople}>
        Hapus Semua Orang
      </Button>
      <Button variant="destructive" onClick={onClearGroups}>
        Hapus Semua Kelompok
      </Button>
    </div>
  );
};

export default DataManagement;
