import React from 'react';
import type { Group } from '@/types';

interface GroupsDisplayProps {
  groups: Group[];
}

const GroupsDisplay: React.FC<GroupsDisplayProps> = ({ groups }) => {
  return (
    <div className="grid gap-4 mt-6 sm:grid-cols-2 md:grid-cols-3 text-white">
      {groups.map((group) => (
        <div key={group.id} className="bg-white/10 rounded-xl p-4 border border-white/20">
          <h4 className="font-bold mb-2">Kelompok {group.id}</h4>
          <ul className="space-y-1">
            {group.members.map((member) => (
              <li key={member.id}>• {member.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default GroupsDisplay;
