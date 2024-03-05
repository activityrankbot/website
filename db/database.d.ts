export interface Session {
  expires_at: number;
  id: string;
  user_id: string;
}

export interface User {
  discord_id: string;
  discord_username: string;
  icon_hash: string | null;
  id: string;
}

export interface DB {
  session: Session;
  user: User;
}
