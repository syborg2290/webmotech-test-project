import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PatientHistoryDTO {
  @Field()
  patient_id: number;
  @Field()
  first_appointment_id: number;
  @Field()
  invoice: string;
  @Field()
  total_receipts: Number;
  @Field()
  receipts: string;
  @Field()
  first_receipt_date: string;
  @Field()
  first_invoice_date: string;
  @Field()
  first_appointment_date: string;
  @Field()
  patient_created_date: string;
}
