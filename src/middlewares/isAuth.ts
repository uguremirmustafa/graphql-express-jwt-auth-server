import { verify } from 'jsonwebtoken';
import { CustomContext } from 'src/CustomContext';
import { MiddlewareFn } from 'type-graphql';

export const isAuth: MiddlewareFn<CustomContext> = ({ context }, next) => {
  const authorization = context.req.headers['authorization'];

  if (!authorization) {
    throw new Error('Oturum açın!');
  }

  try {
    const token = authorization?.split(' ')[1];

    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);

    context.payload = payload as any;
  } catch (error) {
    // for some reason user couldn't get authenticated, such as bad token
    console.log(error);
    throw new Error('Oturum açın!');
  }

  return next();
};
