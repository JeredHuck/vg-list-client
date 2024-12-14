export class User {
  id: number = 0;
  username: string;
  profile!: Profile;

  constructor(user: any) {
    this.id = user.id || 0;
    this.username = user.username || '';
  }
}

export interface Profile {
  id: number;
  favoriteGame: string;
  pfp: any;
}
