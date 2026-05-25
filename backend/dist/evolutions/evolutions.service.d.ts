import { PrismaService } from '../prisma/prisma.service';
import { CreateEvolutionDto } from './dto/create-evolution.dto';
export declare class EvolutionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByPatient(patientId: number): Promise<{
        id: number;
        createdAt: Date;
        startTime: string;
        date: Date;
        title: string;
        endTime: string;
        patientId: number;
        description: string;
    }[]>;
    create(patientId: number, dto: CreateEvolutionDto): Promise<{
        id: number;
        createdAt: Date;
        startTime: string;
        date: Date;
        title: string;
        endTime: string;
        patientId: number;
        description: string;
    }>;
    private ensurePatientExists;
}
