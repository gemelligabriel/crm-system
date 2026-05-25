import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './events.service';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
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
}
