import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Patients {
  @Field()
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Field()
  @Column({ type: 'int', nullable: false, default: 1 })
  is_active: number;
  @Field()
  @Column({ type: 'int' })
  age: number;
  @Field()
  @Column()
  first_appointment_date: Date;
  @Field()
  @Column({ type: 'datetime' })
  last_appointment_date: Date;
  @Field()
  @Column({ type: 'varchar' })
  appointment_reminder_method: string;
  @Field()
  @Column({ type: 'int' })
  appointment_attended: number;
  @Field()
  @Column({ type: 'int' })
  appointment_booked: number;
  @Field()
  @Column({ type: 'int' })
  appointment_cancelled: number;
  @Field()
  @Column({ type: 'int', nullable: false, default: 0 })
  converted_booking: number;
  @Field()
  @Column({ type: 'int', nullable: false, default: 0 })
  converted_sales: number;
  @Field()
  @Column({ type: 'datetime' })
  date_of_enquiry: Date;
  @Field()
  @Column({ type: 'varchar', nullable: false })
  gender: string;
  @Field()
  @Column({ type: 'int', nullable: false })
  clinic_id: number;
  @Field()
  @Column({ type: 'int' })
  marketing_category_id: number;
  @Field()
  @Column({ type: 'int' })
  marketing_source_id: number;
  @Field()
  @Column({ type: 'int' })
  external_patient_id: number;
  @Field()
  @Column({ type: 'int' })
  user_id: number;
  @Field()
  @Column({})
  first_invoice_date: Date;
  @Field()
  @Column({ type: 'datetime' })
  last_invoice_date: Date;
  @Field()
  @Column({ type: 'varchar' })
  phone_skype: string;
  @Field()
  @Column({ type: 'varchar' })
  phone_mobile: string;
  @Field()
  @Column({ type: 'timestamp' })
  timestamp_created: Date;
  @Field()
  @Column({ type: 'timestamp' })
  created_at: Date;
  @Field()
  @Column({ type: 'timestamp' })
  updated_at: Date;
}
