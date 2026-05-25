import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateEvolutionDto } from './dto/create-evolution.dto';
import { EvolutionsService } from './evolutions.service';

@Controller('patients/:patientId/evolutions')
export class EvolutionsController {
  constructor(private readonly evolutionsService: EvolutionsService) {}

  @Get()
  findByPatient(@Param('patientId', ParseIntPipe) patientId: number) {
    return this.evolutionsService.findByPatient(patientId);
  }

  @Post()
  create(@Param('patientId', ParseIntPipe) patientId: number, @Body() dto: CreateEvolutionDto) {
    return this.evolutionsService.create(patientId, dto);
  }
}
