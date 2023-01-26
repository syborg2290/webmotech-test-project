import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class PatientService {
  constructor(@InjectEntityManager() private patientManager: EntityManager) {}

  async getAllPatientsHistory(
    firstDate: string,
    secondDate: string,
  ): Promise<any> {
    try {
      if (firstDate && secondDate) {
        return await this.patientManager.query(
          `select * from patients as pt LEFT JOIN appointments as ap ON pt.external_patient_id = ap.patient_id 
            LEFT JOIN invoice as inv ON pt.external_patient_id = inv.patient_id 
            LEFT JOIN receipt as rec ON pt.external_patient_id = rec.patient_id WHERE DATE(pt.timestamp_created) BETWEEN '${this.formatDate(
              firstDate,
            )}' AND '${this.formatDate(secondDate)}' LIMIT 100
            `,
        );
      } else {
        return await this.patientManager.query(
          `select * from patients as pt LEFT JOIN appointments as ap ON pt.external_patient_id = ap.patient_id 
            LEFT JOIN invoice as inv ON pt.external_patient_id = inv.patient_id 
            LEFT JOIN receipt as rec ON pt.external_patient_id = rec.patient_id LIMIT 100
            `,
        );
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  formatDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-') + this.formatTime(date);
  };

  padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  formatTime(date) {
    const dateObj = new Date(date);
    return (
      ' ' +
      [
        this.padTo2Digits(dateObj.getHours()),
        this.padTo2Digits(dateObj.getMinutes()),
        this.padTo2Digits(dateObj.getSeconds()),
      ].join(':')
    );
  }
}
