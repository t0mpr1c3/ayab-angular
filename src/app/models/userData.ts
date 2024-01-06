import { Settings } from "./settings";

export interface UserData {
  id: number;
  username: string;
  email: string;
  //settings: Settings;
  //bio: string;
  //image: string;
  token: string;
}

export const defaultUserData: UserData = {
  id: 0,
  username: '',
  email: '',
  //settings: defaultSettings,
  //bio: '',
  //image: ''
  token: '',
};
