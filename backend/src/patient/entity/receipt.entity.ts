import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Receipt {
  @Field()
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Field()
  @Column({ type: 'int', nullable: false })
  receipt_id: number;
  @Field()
  @Column({ type: 'int', nullable: false })
  patient_id: number;
  @Field()
  @Column({ type: 'int', nullable: false })
  user_id: number;
  @Field()
  @Column({ type: 'int', nullable: false })
  clinic_id: number;
  @Field()
  @Column({ type: 'date', nullable: false })
  receipt_date: Date;
  @Field()
  @Column({ type: 'double' })
  amount: number;
  @Field()
  @Column({ type: 'double' })
  allocation: number;
  @Field()
  @Column({ type: 'timestamp' })
  created_at: Date;
  @Field()
  @Column({ type: 'timestamp' })
  updated_at: Date;
  @Field()
  @Column({ type: 'timestamp' })
  receipt_created_date: Date;
}
