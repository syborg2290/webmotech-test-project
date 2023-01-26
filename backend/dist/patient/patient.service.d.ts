import { EntityManager } from 'typeorm';
export declare class PatientService {
    private patientManager;
    constructor(patientManager: EntityManager);
    getAllPatientsHistory(firstDate: string, secondDate: string): Promise<any>;
    formatDate: (date: any) => string;
    padTo2Digits(num: any): any;
    formatTime(date: any): string;
}
