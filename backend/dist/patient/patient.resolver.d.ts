import { PatientService } from './patient.service';
export declare class PatientResolver {
    private patientService;
    constructor(patientService: PatientService);
    getAllPatientsHistory(firstDate: string, secondDate: string): Promise<any>;
}
