export interface Person {
    id: string;
    name: string;
  }
  
  export interface Group {
    id: number;
    members: Person[];
  }
  
  export interface SavedGroup {
    id: string;
    name: string;
    groups: Group[];
    createdAt: string;
  }
  