import { CreateEvolutionDto } from './dto/create-evolution.dto';
import { EvolutionsService } from './evolutions.service';
export declare class EvolutionsController {
    private readonly evolutionsService;
    constructor(evolutionsService: EvolutionsService);
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
}
