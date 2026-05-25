import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
export declare class PatientsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(search?: string): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        birthDate: Date;
        phone: string | null;
        email: string | null;
        cpf: string | null;
        address: string | null;
        profession: string | null;
        origin: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        events: {
            id: number;
            createdAt: Date;
            startTime: string;
            date: Date;
            title: string;
            endTime: string;
            patientId: number;
        }[];
        evolutions: {
            id: number;
            createdAt: Date;
            startTime: string;
            date: Date;
            title: string;
            endTime: string;
            patientId: number;
            description: string;
        }[];
    } & {
        name: string;
        birthDate: Date;
        phone: string | null;
        email: string | null;
        cpf: string | null;
        address: string | null;
        profession: string | null;
        origin: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(dto: CreatePatientDto): import(".prisma/client").Prisma.Prisma__PatientClient<{
        name: string;
        birthDate: Date;
        phone: string | null;
        email: string | null;
        cpf: string | null;
        address: string | null;
        profession: string | null;
        origin: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, dto: UpdatePatientDto): Promise<{
        name: string;
        birthDate: Date;
        phone: string | null;
        email: string | null;
        cpf: string | null;
        address: string | null;
        profession: string | null;
        origin: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
