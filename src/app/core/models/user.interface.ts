import { ProfileEnum } from '../enums/profile.enum';

export interface User {
  userName: string;
  password: string;
  name: string;
  profile: ProfileEnum;
}
