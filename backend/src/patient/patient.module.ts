import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patients } from './entity/patients.entity';
import { PatientResolver } from './patient.resolver';
import { PatientService } from './patient.service';

@Module({
  imports: [TypeOrmModule.forFeature([Patients])],
  providers: [PatientService, PatientResolver],
  exports: [PatientService],
})
export class PatientModule {}
