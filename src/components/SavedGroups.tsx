import React from 'react';
import type { SavedGroup } from '@/types';

interface SavedGroupsProps {
  groups: SavedGroup[];
  onLoad: (group: SavedGroup) => void;
  onDelete: (id: string) => void;
}

const SavedGroups: React.FC<SavedGroupsProps> = ({ groups, onLoad, onDelete }) => {
  return (
    <div className="mt-8 text-white">
      <h3 className="text-lg font-bold mb-4">Kelompok Tersimpan</h3>
      {groups.length === 0 && <p className="text-sm text-gray-300">Belum ada kelompok yang disimpan.</p>}
      <ul className="space-y-3">
        {groups.map((group) => (
          <li key={group.id} className="bg-white/10 p-3 rounded-xl flex justify-between items-center">
            <span>{group.name}</span>
            <div className="space-x-2">
              <button
                onClick={() => onLoad(group)}
                className="text-blue-400 hover:text-blue-600"
              >
                Gunakan
              </button>
              <button
                onClick={() => onDelete(group.id)}
                className="text-red-400 hover:text-red-600"
              >
                Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedGroups;
