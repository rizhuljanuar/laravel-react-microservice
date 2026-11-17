import { User } from '@/app/types';

export const fullName = (user: User): string =>
  `${user.first_name} ${user.last_name}`;
