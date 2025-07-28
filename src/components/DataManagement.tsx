import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Download, Upload } from 'lucide-react';

interface DataManagementProps {
  onExport: () => void;
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DataManagement: React.FC<DataManagementProps> = ({ onExport, onImport }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={onExport} variant="outline">
        <Download className="h-4 w-4 mr-2" />
        Export Data
      </Button>
      <Label htmlFor="import" className="cursor-pointer">
        <Button asChild variant="outline">
          <span>
            <Upload className="h-4 w-4 mr-2" />
            Import Data
          </span>
        </Button>
      </Label>
      <input
        id="import"
        type="file"
        accept=".json"
        className="hidden"
        onChange={onImport}
      />
    </div>
  );
};

export { DataManagement };
