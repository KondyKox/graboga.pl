export interface User {
  _id: string;
  playerId: string;
  username: string;
  email: string;
  role: string;
}

export interface StoreItem {
  _id: string;
  pack: string;
  name: string;
  category: string;
  cost: number;
  status: string;
}

// Admin Panels

export interface UserPanelProps {
  users: User[];
}

export interface StorePanelProps {
  store: StoreItem[]
}
