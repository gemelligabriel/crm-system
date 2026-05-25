import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async findByPatient(patientId: number) {
    await this.ensurePatientExists(patientId);

    return this.prisma.event.findMany({
      where: { patientId },
      orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
    });
  }

  async create(patientId: number, dto: CreateEventDto) {
    await this.ensurePatientExists(patientId);

    return this.prisma.event.create({
      data: {
        ...dto,
        date: new Date(dto.date),
        patientId,
      },
    });
  }

  private async ensurePatientExists(patientId: number) {
    const patient = await this.prisma.patient.findUnique({ where: { id: patientId } });

    if (!patient) {
      throw new NotFoundException('Paciente nao encontrado.');
    }
  }
}
