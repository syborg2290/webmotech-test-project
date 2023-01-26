import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Invoice {
  @Field()
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Field()
  @Column({ type: 'int', nullable: false })
  invoice_no: number;
  @Field()
  @Column({ type: 'int', nullable: false })
  patient_id: number;
  @Field()
  @Column({ type: 'int', nullable: false })
  practitioner_id: number;
  @Field()
  @Column({ type: 'int', nullable: false })
  external_user_id: number;
  @Field()
  @Column({ type: 'date', nullable: false })
  date: Date;
  @Field()
  @Column({ type: 'double' })
  total_amount: number;
  @Field()
  @Column({ type: 'timestamp' })
  created_at: Date;
  @Field()
  @Column({ type: 'timestamp' })
  updated_at: Date;
  @Field()
  @Column({ type: 'int', nullable: false })
  clinic_id: number;
  @Field()
  @Column({ type: 'int' })
  course_id: number;
  @Field()
  @Column({ type: 'longtext' })
  invoice_display: string;
}
