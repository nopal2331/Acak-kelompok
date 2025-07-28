import React, { useState } from 'react';
import type { Person, Group, SavedGroup } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Users, UserPlus, Shuffle, Save, Trash2, Download, Sparkles } from 'lucide-react';
import { PersonInput } from '@/components/PersonInput';
import { PeopleList } from '@/components/PeopleList';
import { GroupGenerator } from '@/components/GroupGenerator';
import { SaveGroupDialog } from '@/components/SaveGroupDialog';
import { DataManagement } from '@/components/DataManagement';
import { GroupCard } from '@/components/GroupCard';
import { SavedGroupItem } from '@/components/SavedGroupItem';
import { shuffleArray } from '@/utils/shuffle';

const GroupRandomizer = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [savedGroups, setSavedGroups] = useState<SavedGroup[]>([]);
  const [groupCount, setGroupCount] = useState(2);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  const addPerson = (name: string) => {
    const newPerson: Person = {
      id: Date.now().toString(),
      name
    };
    setPeople(prev => [...prev, newPerson]);
  };

  const removePerson = (id: string) => {
    setPeople(prev => prev.filter(p => p.id !== id));
  };

  const clearAllPeople = () => {
    setPeople([]);
  };

  const generateGroups = () => {
    if (people.length === 0) return;
    
    const shuffled = shuffleArray(people);
    const tempGroups: Group[] = Array.from({ length: groupCount }, (_, i) => ({
      id: i + 1,
      members: []
    }));

    shuffled.forEach((person: Person, index: number) => {
      const groupIndex = index % groupCount;
      tempGroups[groupIndex].members.push(person);
    });

    setGroups(tempGroups);
  };

  const saveGroups = (name: string) => {
    if (groups.length === 0) return;
    
    const newSaved: SavedGroup = {
      id: Date.now().toString(),
      name,
      groups,
      createdAt: new Date().toISOString()
    };
    setSavedGroups(prev => [...prev, newSaved]);
    setSaveDialogOpen(false);
  };

  const loadSavedGroup = (savedGroup: SavedGroup) => {
    setGroups(savedGroup.groups);
    const allPeople = savedGroup.groups.flatMap((g: Group) => g.members);
    setPeople(allPeople);
  };

  const deleteSavedGroup = (id: string) => {
    setSavedGroups(prev => prev.filter(g => g.id !== id));
  };

  const exportData = () => {
    const data = {
      people,
      groups,
      savedGroups,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'group-randomizer-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.people) setPeople(data.people);
        if (data.groups) setGroups(data.groups);
        if (data.savedGroups) setSavedGroups(data.savedGroups);
      } catch (error) {
        console.error('Error importing data:', error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Group Randomizer
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Buat kelompok acak dengan mudah dan cepat
          </p>
        </div>

        <Tabs defaultValue="create" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px] lg:mx-auto">
            <TabsTrigger value="create" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Buat Kelompok
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Hasil ({groups.length})
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Tersimpan ({savedGroups.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-6">
            {/* Add Person Card */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-blue-500" />
                  Tambah Peserta
                </CardTitle>
                <CardDescription>
                  Masukkan nama-nama peserta yang akan dibagi ke dalam kelompok
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PersonInput onAdd={addPerson} />
                <PeopleList 
                  people={people} 
                  onRemove={removePerson} 
                  onClearAll={clearAllPeople} 
                />
              </CardContent>
            </Card>

            {/* Generate Groups Card */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shuffle className="h-5 w-5 text-green-500" />
                  Generate Kelompok
                </CardTitle>
                <CardDescription>
                  Tentukan jumlah kelompok dan buat pembagian acak
                </CardDescription>
              </CardHeader>
              <CardContent>
                <GroupGenerator
                  groupCount={groupCount}
                  onGroupCountChange={setGroupCount}
                  onGenerate={generateGroups}
                  peopleCount={people.length}
                />
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-purple-500" />
                  Kelola Data
                </CardTitle>
                <CardDescription>
                  Export dan import data untuk backup
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataManagement onExport={exportData} onImport={importData} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            {groups.length === 0 ? (
              <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                <CardContent className="text-center py-12">
                  <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Belum Ada Kelompok</h3>
                  <p className="text-muted-foreground mb-4">
                    Buat kelompok terlebih dahulu di tab "Buat Kelompok"
                  </p>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Hasil Pembagian Kelompok</h2>
                  <div className="flex gap-2">
                    <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                          <Save className="h-4 w-4 mr-2" />
                          Simpan Kelompok
                        </Button>
                      </DialogTrigger>
                      <SaveGroupDialog 
                        open={saveDialogOpen}
                        onOpenChange={setSaveDialogOpen}
                        onSave={saveGroups}
                      />
                    </Dialog>
                    <Button
                      variant="destructive"
                      onClick={() => setGroups([])}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Hapus Hasil
                    </Button>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {groups.map((group) => (
                    <GroupCard key={group.id} group={group} />
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="saved" className="space-y-6">
            {savedGroups.length === 0 ? (
              <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                <CardContent className="text-center py-12">
                  <Save className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Belum Ada Kelompok Tersimpan</h3>
                  <p className="text-muted-foreground">
                    Simpan pembagian kelompok untuk dapat digunakan kembali nanti
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {savedGroups.map((savedGroup) => (
                  <SavedGroupItem
                    key={savedGroup.id}
                    savedGroup={savedGroup}
                    onLoad={loadSavedGroup}
                    onDelete={deleteSavedGroup}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GroupRandomizer;