import { sign } from 'jsonwebtoken';

import { User } from '../entity/User';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET!;

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, accessTokenSecret, { expiresIn: '30min' });
};
export const createRefreshToken = (user: User) => {
  return sign({ userId: user.id, tokenVersion: user.tokenVersion }, refreshTokenSecret, {
    expiresIn: '2d',
  });
};
