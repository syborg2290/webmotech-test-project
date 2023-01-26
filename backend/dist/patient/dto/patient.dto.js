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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientHistoryDTO = void 0;
const graphql_1 = require("@nestjs/graphql");
let PatientHistoryDTO = class PatientHistoryDTO {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PatientHistoryDTO.prototype, "patient_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PatientHistoryDTO.prototype, "first_appointment_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PatientHistoryDTO.prototype, "invoice", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], PatientHistoryDTO.prototype, "total_receipts", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PatientHistoryDTO.prototype, "receipts", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PatientHistoryDTO.prototype, "first_receipt_date", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PatientHistoryDTO.prototype, "first_invoice_date", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PatientHistoryDTO.prototype, "first_appointment_date", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PatientHistoryDTO.prototype, "patient_created_date", void 0);
PatientHistoryDTO = __decorate([
    (0, graphql_1.ObjectType)()
], PatientHistoryDTO);
exports.PatientHistoryDTO = PatientHistoryDTO;
//# sourceMappingURL=patient.dto.js.map