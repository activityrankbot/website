export interface Session {
  expires_at: number;
  id: string;
  user_id: string;
}

export interface User {
  id: string;
  username: string;
  avatar_hash: string | null;
}

export interface DB {
  session: Session;
  web_user: User;
}
