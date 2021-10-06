import { Response } from 'express';

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie('anomy', token, {
    httpOnly: true,
    path: '/refresh_token',
  });
};
