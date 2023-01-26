export declare class Invoice {
    id: number;
    invoice_no: number;
    patient_id: number;
    practitioner_id: number;
    external_user_id: number;
    date: Date;
    total_amount: number;
    created_at: Date;
    updated_at: Date;
    clinic_id: number;
    course_id: number;
    invoice_display: string;
}
