export interface GeneralInfoInterface  {
  name: string;
  lastName: string,
  email: string;
  birthday: string,
  country: string,
  genre?: 'male' | 'female' | 'none'
  password: string,
  createdAt: string;
  profileImage?: string,
  isLogged: boolean,
  lastLogin?: string,
  active: boolean;
  authToken?: string
}
