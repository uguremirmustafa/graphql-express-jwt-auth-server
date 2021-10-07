import {
  Arg,
  Ctx,
  Field,
  // FieldResolver,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { User } from './entity/User';
import { compare, hash } from 'bcryptjs';
import { CustomContext } from './CustomContext';
import { createAccessToken, createRefreshToken } from './utils/auth';
import { isAuth } from './middlewares/isAuth';
import { sendRefreshToken } from './utils/sendRefreshToken';
import { getConnection } from 'typeorm';
import { validateRegister } from './utils/validateRegister';
import { CredientialsInput } from './utils/CredientialsInput';
import { checkUserType } from './utils/checkUserType';
import { verify } from 'jsonwebtoken';
import { rateLimit } from './middlewares/rateLimit';

// ObjectType used for returning values
@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}
@ObjectType()
export class LoginResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => String, { nullable: true })
  accessToken?: string;
}
@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  @Query(() => [User], { nullable: true })
  @UseMiddleware(isAuth) // sadece authenticated kullanicilar kullanici listesini alabilir
  async users() {
    return User.find({});
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() context: CustomContext) {
    const authorization = context.req.headers['authorization'];
    if (!authorization) {
      return null;
    }
    try {
      const token = authorization.split(' ')[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      const user = await User.findOne(payload.userId);
      return user;
    } catch (error) {
      return null;
    }
  }

  // tüm kullanıcı refresh tokenlarını destroy et, bütün oturumları sonlandır.
  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(@Arg('userId', () => Int) userId: number) {
    await getConnection().getRepository(User).increment({ id: userId }, 'tokenVersion', 1);
    return true;
  }

  @Mutation(() => UserResponse, { nullable: true })
  async register(@Arg('options') options: CredientialsInput): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }
    const userType = checkUserType(options.email);
    const hashedPassword = await hash(options.password, 12);
    let user;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username: options.username,
          email: options.email,
          password: hashedPassword,
          type: userType,
        })
        .returning('*')
        .execute();

      user = result.raw[0];
    } catch (error) {
      console.log('here : ', error);
      if (error.detail.includes('already exists') && error.detail.includes('email')) {
        return {
          errors: [
            {
              field: 'email',
              message: 'bu email ile kayıtlı başka bir kullanıcı var',
            },
          ],
        };
      }
      if (error.detail.includes('already exists') && error.detail.includes('username')) {
        return {
          errors: [
            {
              field: 'username',
              message: 'kullanıcı adı başkası tarafından kullanılıyor',
            },
          ],
        };
      }
    }
    return {
      user,
    };
  }

  @Mutation(() => LoginResponse)
  @UseMiddleware(rateLimit())
  async login(
    @Arg('email', () => String) email: string,
    @Arg('password', () => String) password: string,
    @Ctx() { res }: CustomContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });
    // TODO: retry logic here

    if (!user) {
      return {
        errors: [
          {
            field: 'email',
            message: 'kullanıcı bulunamadı',
          },
        ],
      };
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'kullanıcı veya şifre hatalı',
          },
        ],
      };
    }

    //successful login

    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
      user,
    };
  }
  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: CustomContext) {
    sendRefreshToken(res, '');
    return true;
  }
}
