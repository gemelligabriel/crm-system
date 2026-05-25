import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEvolutionDto } from './dto/create-evolution.dto';

@Injectable()
export class EvolutionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findByPatient(patientId: number) {
    await this.ensurePatientExists(patientId);

    return this.prisma.evolution.findMany({
      where: { patientId },
      orderBy: [{ date: 'desc' }, { startTime: 'desc' }],
    });
  }

  async create(patientId: number, dto: CreateEvolutionDto) {
    await this.ensurePatientExists(patientId);

    return this.prisma.evolution.create({
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
