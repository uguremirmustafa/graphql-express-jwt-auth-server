import { Field, Int, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@ObjectType() // this is for graphql types
@Entity('users') // this says this a database table and specify its name
export class User extends BaseEntity {
  @Field(() => Int) // expose this as a graphql type
  @PrimaryGeneratedColumn() // primary key
  id!: number;

  @Field(() => String) // expose this as a graphql type
  @Column('text', { unique: true }) // database column and its type
  email!: string;

  @Field(() => String) // expose this as a graphql type
  @Column('text', { unique: true }) // database column and its type
  username!: string;

  @Field(() => String) // expose this as a graphql type
  @Column('text') // database column and its type
  type: string;

  // @Field(() => String) // we DONT expose this as a graphql type
  @Column('text') // database column and its type
  password!: string;

  @Column('int', { default: 0 }) // database column and its type
  tokenVersion: number;
}
