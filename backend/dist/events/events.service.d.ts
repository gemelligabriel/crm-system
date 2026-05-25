import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
export declare class EventsService {
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
    }[]>;
    create(patientId: number, dto: CreateEventDto): Promise<{
        id: number;
        createdAt: Date;
        startTime: string;
        date: Date;
        title: string;
        endTime: string;
        patientId: number;
    }>;
    private ensurePatientExists;
}
