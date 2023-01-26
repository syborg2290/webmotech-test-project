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
exports.PatientService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let PatientService = class PatientService {
    constructor(patientManager) {
        this.patientManager = patientManager;
        this.formatDate = (date) => {
            var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;
            return [year, month, day].join('-') + this.formatTime(date);
        };
    }
    async getAllPatientsHistory(firstDate, secondDate) {
        try {
            if (firstDate && secondDate) {
                return await this.patientManager.query(`select * from patients as pt LEFT JOIN appointments as ap ON pt.external_patient_id = ap.patient_id 
            LEFT JOIN invoice as inv ON pt.external_patient_id = inv.patient_id 
            LEFT JOIN receipt as rec ON pt.external_patient_id = rec.patient_id WHERE DATE(pt.timestamp_created) BETWEEN '${this.formatDate(firstDate)}' AND '${this.formatDate(secondDate)}' LIMIT 100
            `);
            }
            else {
                return await this.patientManager.query(`select * from patients as pt LEFT JOIN appointments as ap ON pt.external_patient_id = ap.patient_id 
            LEFT JOIN invoice as inv ON pt.external_patient_id = inv.patient_id 
            LEFT JOIN receipt as rec ON pt.external_patient_id = rec.patient_id LIMIT 100
            `);
            }
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }
    formatTime(date) {
        const dateObj = new Date(date);
        return (' ' +
            [
                this.padTo2Digits(dateObj.getHours()),
                this.padTo2Digits(dateObj.getMinutes()),
                this.padTo2Digits(dateObj.getSeconds()),
            ].join(':'));
    }
};
PatientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectEntityManager)()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], PatientService);
exports.PatientService = PatientService;
//# sourceMappingURL=patient.service.js.map