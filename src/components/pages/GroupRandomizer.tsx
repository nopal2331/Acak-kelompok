import React, { useState } from 'react';
import type { Person, Group, SavedGroup } from '@/types';
import { shuffleArray } from '@/utils/shuffle';
import { PersonInput } from '../PersonInput';
import { PeopleList } from '../PeopleList';
import { GroupControls } from '@/components/GroupControls';
import { GroupsDisplay } from '@/components/GroupsDisplay';
import { SaveGroupDialog } from '@/components/SaveGroupDialog';
import { SavedGroups } from '@/components/SavedGroups';
import { DataManagement } from '@/components/DataManagement';

const GroupRandomizer: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [groupCount, setGroupCount] = useState<number>(2);
  const [groups, setGroups] = useState<Group[]>([]);
  const [savedGroups, setSavedGroups] = useState<SavedGroup[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addPerson = (name: string) => {
    const newPerson: Person = { id: Date.now().toString(), name };
    setPeople(prev => [...prev, newPerson]);
  };

  const removePerson = (id: string) => {
    setPeople(prev => prev.filter(p => p.id !== id));
  };

  const generateGroups = () => {
    const shuffled = shuffleArray(people);
    const tempGroups: Group[] = Array.from({ length: groupCount }, (_, i) => ({
      id: i + 1,
      members: []
    }));

    shuffled.forEach((person, index) => {
      const groupIndex = index % groupCount;
      tempGroups[groupIndex].members.push(person);
    });

    setGroups(tempGroups);
  };

  const saveGroups = (groupName: string) => {
    const newSaved: SavedGroup = {
      id: Date.now().toString(),
      name: groupName,
      groups,
      createdAt: new Date().toISOString()
    };
    setSavedGroups(prev => [...prev, newSaved]);
    setIsDialogOpen(false);
  };

  const deleteSavedGroup = (id: string) => {
    setSavedGroups(prev => prev.filter(g => g.id !== id));
  };

  const clearAllData = () => {
    setPeople([]);
    setGroups([]);
    setSavedGroups([]);
  };

  return (
    <div className="container mx-auto p-4 space-y-6 text-white">
      <h1 className="text-3xl font-bold text-center">🎲 Group Randomizer</h1>

      <PersonInput onAdd={addPerson} />
      <PeopleList people={people} onRemove={removePerson} />

      <GroupControls
        groupCount={groupCount}
        setGroupCount={setGroupCount}
        onGenerate={generateGroups}
        disabled={people.length === 0}
      />

      <GroupsDisplay groups={groups} onSave={() => setIsDialogOpen(true)} />

      <SaveGroupDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={saveGroups}
      />

      <SavedGroups savedGroups={savedGroups} onDelete={deleteSavedGroup} />
      <DataManagement onClear={clearAllData} />
    </div>
  );
};

export default GroupRandomizer;
