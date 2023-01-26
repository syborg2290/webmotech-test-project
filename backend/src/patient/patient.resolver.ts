import { Resolver, Query, Args } from '@nestjs/graphql';
import { UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '../helper/exception.filter';
import { PatientService } from './patient.service';
import { PatientHistoryDTO } from './dto/patient.dto';

@Resolver()
export class PatientResolver {
  constructor(private patientService: PatientService) {}

  @Query(() => [PatientHistoryDTO], { name: 'getPatientHistory' })
  @UseFilters(new HttpExceptionFilter())
  async getAllPatientsHistory(
    @Args('firstDate') firstDate: string,
    @Args('secondDate') secondDate: string,
  ) {
    try {
      const res = await this.patientService.getAllPatientsHistory(
        firstDate,
        secondDate,
      );

      return res.map(async (item) => {
        // Total of al receips amount that related to specific patient
        let totalReceiptssum = 0;
        let first_receipt_date;

        res.filter(function (elReDate) {
          if (elReDate.patient_id === item.external_patient_id) {
            first_receipt_date = elReDate.receipt_date;
            return;
          }
        });

        // Iterate all over the array and get related invoices to the patient
        const newArrayInv = res
          .filter(function (elIn) {
            return elIn.patient_id === item.external_patient_id;
          })
          .map(function (obj) {
            return obj.invoice_no;
          });

        // Iterate all over the array and get related receipts to the patient
        const newArrayRece = res
          .filter(function (elRece) {
            return elRece.patient_id === item.external_patient_id;
          })
          .map(function (obj) {
            return obj.receipt_id;
          });

        // Iterate all over the array and get related receipts' total amount to the patient
        res.filter(function (elRece) {
          if (elRece.patient_id == item.external_patient_id) {
            totalReceiptssum += elRece.amount;
          }
        });

        // Iterate all over the array and set and return using custom DTO
        const obj: PatientHistoryDTO = {
          patient_id: item.external_patient_id,
          first_appointment_id: 0,
          invoice: newArrayInv.toString(),
          total_receipts: totalReceiptssum,
          receipts: newArrayRece.toString(),
          first_receipt_date: new Date(first_receipt_date).toDateString(),
          first_invoice_date: new Date(item.first_invoice_date).toDateString(),
          first_appointment_date: '',
          patient_created_date: new Date(item.created_at).toDateString(),
        };
        return obj;
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
