import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './UserResolvers';
import { createConnection, getConnectionOptions } from 'typeorm';
import cookieParser from 'cookie-parser';
import { verify } from 'jsonwebtoken';
import { User } from './entity/User';
import { createAccessToken, createRefreshToken } from './utils/auth';
import { sendRefreshToken } from './utils/sendRefreshToken';
import cors from 'cors';
const port = process.env.PORT || 4000;

(async () => {
  const app = express();
  app.use(
    cors({
      credentials: true,
      origin: process.env.CLIENT_BASE_URL,
    })
  );
  app.use(cookieParser());

  app.post('/refresh_token', async (req, res) => {
    const token = req.cookies.anomy;
    console.log(token);

    if (!token) {
      return res.send({ ok: false, accessToken: '' });
    }
    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (error) {
      console.log(error);
      return res.send({ ok: false, accessToken: '' });
    }
    // at this point we know refresh token is valid, so we can send back access token
    const user = await User.findOne({ id: payload.userId });

    if (!user) {
      return res.send({ ok: false, accessToken: '' });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: '' });
    }
    sendRefreshToken(res, createRefreshToken(user));
    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });
  const options = await getConnectionOptions();
  Object.assign(options, {
    url: process.env.DATABASE_URL,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  });
  await createConnection();
  // User.delete({});
  const apolloServer = new ApolloServer({
    schema: await buildSchema({ resolvers: [UserResolver] }),
    context: ({ req, res }) => ({ req, res }), // this is for getting the req and res objects in apollo resolvers
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });
  app.listen(port, () => console.log(`server listening on ${port}`));
})();
