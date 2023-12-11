import { UserRole } from '@prisma/client';
import { UserJWT } from '~/types';

export const canUpdateOrDeleteEntity = (
  entityUserId: number,
  user: UserJWT,
): boolean => {
  const isCurrentUser = user.id === entityUserId;
  const isModerator = user.role === UserRole.MODERATOR;

  return isCurrentUser || isModerator;
};
