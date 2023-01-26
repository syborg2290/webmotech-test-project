export const getAllPatientHistoryQuery =  `
query getPatientHistory($firstDate:String!,$secondDate:String!){
    getPatientHistory(firstDate: $firstDate,secondDate: $secondDate){
        patient_id
        first_appointment_id
        invoice
        total_receipts
        receipts
        first_receipt_date
        first_invoice_date
        first_appointment_date
        patient_created_date
    }
}`;