export interface User {
  _id: string;
  playerId: string;
  username: string;
  email: string;
  role: string;
}

export interface StoreItem {
  item: {
    id: string;
    name: string;
    description: string;
    img: string;
    teacher: string;
  };
  _id: string;
  pack: string;
  name: string;
  category: {
    id: number;
    name: string;
  };
  price: number;
  status: string;
}

export interface LogsItem {
  _id: string;
  createdAt: string;
  user: string;
  action: string;
  details: number;
  status: string;
  ipAddress: string;
}

// Admin Panels

export interface UserPanelProps {
  users: User[];
}

export interface StorePanelProps {
  store: StoreItem[]
}
export interface LogsPanelProps {
  logs: LogsItem[]
}
