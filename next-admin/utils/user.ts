import { User } from '@/app/types';

export const fullName = (user: User): string =>
  `${user.first_name} ${user.last_name}`;

export const canView = (user: User, page: string): boolean =>
  user.role.permissions.some(
    (permission) => permission.name === `view_${page}`,
  );

export const canEdit = (user: User, page: string): boolean =>
  user.role.permissions.some(
    (permission) => permission.name === `edit_${page}`,
  );
