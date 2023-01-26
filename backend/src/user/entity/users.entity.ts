import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Users {
  @Field()
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Field()
  @Column({ type: 'int', nullable: false })
  external_user_id: number;
  @Field()
  @Column({ type: 'varchar', nullable: false })
  fname: string;
  @Field()
  @Column({ type: 'varchar', nullable: false })
  lname: string;
  @Field()
  @Column({ type: 'varchar', nullable: false })
  username: string;
  @Field()
  @Column({ type: 'int', nullable: false })
  user_group_id: number;
  @Field()
  @Column({ type: 'int', nullable: false })
  is_practitioner: number;
  @Field()
  @Column({ type: 'varchar' })
  email: string;
  @Field()
  @Column({ type: 'timestamp' })
  email_verified_at: Date;
  @Field()
  @Column({ type: 'varchar' })
  password: string;
  @Field()
  @Column({ type: 'varchar' })
  remember_token: string;
  @Field()
  @Column({ type: 'timestamp' })
  created_at: Date;
  @Field()
  @Column({ type: 'timestamp' })
  updated_at: Date;
  @Field()
  @Column({ type: 'int' })
  clinic_id: number;
  @Field()
  @Column({ type: 'int', nullable: false, default: 1 })
  status: number;
  @Field()
  @Column({ type: 'int', nullable: false, default: 0 })
  is_user: number;
  @Field()
  @Column({ type: 'int', nullable: false, default: 1 })
  is_first_login: number;
  @Field()
  @Column({ type: 'varchar' })
  job_title: string;
  @Field()
  @Column({ type: 'int' })
  job_designations_id: number;
  @Field()
  @Column({ type: 'tinyint', default: 1 })
  filter_col: number;
}
