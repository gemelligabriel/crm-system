import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PatientsModule } from './patients/patients.module';
import { EventsModule } from './events/events.module';
import { EvolutionsModule } from './evolutions/evolutions.module';

@Module({
  imports: [PrismaModule, PatientsModule, EventsModule, EvolutionsModule],
})
export class AppModule {}
