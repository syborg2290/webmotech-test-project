import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Patients } from './patients.entity';

@Entity()
@ObjectType()
export class Appointments {
  @Field()
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Field()
  @Column({ type: 'varchar', nullable: false })
  appointment_id: string;
  @Field()
  @Column({ type: 'varchar', nullable: false })
  appointment_status_id: string;
  @Field()
  @Column({ type: 'int', nullable: false })
  clinic_id: number;
  @Field()
  @Column({ type: 'int', nullable: false })
  patient_id: number;
  @Field()
  @Column({ type: 'int', nullable: false })
  product_id: number;
  @Field()
  @Column({ type: 'int', nullable: false })
  product_category_id: number;
  @Field()
  @Column({ type: 'int' })
  practitioner_id: number;
  @Field()
  @Column({ type: 'int' })
  user_id: number;
  @Field()
  @Column({ type: 'varchar' })
  appointment_status: string;
  @Field()
  @Column({ type: 'datetime' })
  appointment_date: Date;
  @Field()
  @Column({ type: 'timestamp' })
  created_at: Date;
  @Field()
  @Column({ type: 'timestamp' })
  updated_at: Date;
  @Field()
  @Column({ type: 'datetime' })
  appointment_created_date: Date;
  @Field()
  @Column({ type: 'int' })
  diary_id: number;
  @Field()
  @Column({ type: 'int' })
  diary_day: number;
  @Field()
  @Column({ type: 'int' })
  diary_timeslot: number;
  @Field()
  @Column({ type: 'int' })
  course_id: number;
  @Field()
  @Column({ type: 'time' })
  appointmenttime: Date;
  @Field()
  @Column({ type: 'time' })
  appointment_end_time: Date;
  @Field()
  @Column({ type: 'int' })
  appointment_length: number;
  @Field()
  @Column({ type: 'tinyint', default: 0 })
  stock_deduct: number;
  @Field()
  @Column({ type: 'timestamp' })
  status_cancellation_time: Date;
}
