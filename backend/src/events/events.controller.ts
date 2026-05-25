import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './events.service';

@Controller('patients/:patientId/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findByPatient(@Param('patientId', ParseIntPipe) patientId: number) {
    return this.eventsService.findByPatient(patientId);
  }

  @Post()
  create(@Param('patientId', ParseIntPipe) patientId: number, @Body() dto: CreateEventDto) {
    return this.eventsService.create(patientId, dto);
  }
}
