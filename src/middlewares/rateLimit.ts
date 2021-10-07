import { redis } from '../index';
import { CustomContext } from 'src/CustomContext';
import { MiddlewareFn } from 'type-graphql';

export const rateLimit: (limit?: number) => MiddlewareFn<CustomContext> =
  (limit = 2) =>
  async ({ context: { req }, info }, next) => {
    const key = `rate-limit:${info.fieldName}:${req.ip}`;

    const current = await redis.incr(key);

    if (current > limit) {
      return {
        errors: [
          {
            field: 'password',
            message: '10 saniye icinde birden fazla giris denemesi yapildi, 10 saniye bekleyiniz.',
          },
        ],
      };
    } else if (current === 1) {
      await redis.expire(key, 10);
    }

    return next();
  };
