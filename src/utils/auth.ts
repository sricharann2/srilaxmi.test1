interface User {
  username: string;
  password: string;
}

export const VALID_USERS: User[] = [
  {
    username: 'srilaxmi.vasu',
    password: '9989143166'
  },
  {
    username: 'srilaxmi.krishna',
    password: '9100949909'
  }
];

export const validateCredentials = (username: string, password: string): boolean => {
  return VALID_USERS.some(
    user => user.username === username && user.password === password
  );
};