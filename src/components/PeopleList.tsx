import React from 'react';
import type { Person } from '@/types';

interface PeopleListProps {
  people: Person[];
  onRemove: (id: string) => void;
}

const PeopleList: React.FC<PeopleListProps> = ({ people, onRemove }) => {
  return (
    <ul className="text-white space-y-2 mt-4">
      {people.map((person) => (
        <li
          key={person.id}
          className="flex justify-between items-center bg-white/10 px-4 py-2 rounded-lg"
        >
          <span>{person.name}</span>
          <button onClick={() => onRemove(person.id)} className="text-red-400 hover:text-red-600">
            Hapus
          </button>
        </li>
      ))}
    </ul>
  );
};

export default PeopleList;
