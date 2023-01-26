"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const exception_filter_1 = require("../helper/exception.filter");
const patient_service_1 = require("./patient.service");
const patient_dto_1 = require("./dto/patient.dto");
let PatientResolver = class PatientResolver {
    constructor(patientService) {
        this.patientService = patientService;
    }
    async getAllPatientsHistory(firstDate, secondDate) {
        try {
            const res = await this.patientService.getAllPatientsHistory(firstDate, secondDate);
            return res.map(async (item) => {
                let totalReceiptssum = 0;
                let first_receipt_date;
                res.filter(function (elReDate) {
                    if (elReDate.patient_id === item.external_patient_id) {
                        first_receipt_date = elReDate.receipt_date;
                        return;
                    }
                });
                const newArrayInv = res
                    .filter(function (elIn) {
                    return elIn.patient_id === item.external_patient_id;
                })
                    .map(function (obj) {
                    return obj.invoice_no;
                });
                const newArrayRece = res
                    .filter(function (elRece) {
                    return elRece.patient_id === item.external_patient_id;
                })
                    .map(function (obj) {
                    return obj.receipt_id;
                });
                res.filter(function (elRece) {
                    if (elRece.patient_id == item.external_patient_id) {
                        totalReceiptssum += elRece.amount;
                    }
                });
                const obj = {
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
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
};
__decorate([
    (0, graphql_1.Query)(() => [patient_dto_1.PatientHistoryDTO], { name: 'getPatientHistory' }),
    (0, common_1.UseFilters)(new exception_filter_1.HttpExceptionFilter()),
    __param(0, (0, graphql_1.Args)('firstDate')),
    __param(1, (0, graphql_1.Args)('secondDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PatientResolver.prototype, "getAllPatientsHistory", null);
PatientResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [patient_service_1.PatientService])
], PatientResolver);
exports.PatientResolver = PatientResolver;
//# sourceMappingURL=patient.resolver.js.map