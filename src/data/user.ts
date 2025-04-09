export interface User {
  id: string;
  email: string;
  password: string;
}

export const users: User[] = [
  {
    id: '1',
    email: 'lehuutri@gmail.com',
    password: 'lehuutri123'
  },
  {
    id: '2',
    email: 'user@gmail.com',
    password: 'user123'
  }
];
