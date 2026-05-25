import { IsDateString, IsString, MinLength } from 'class-validator';

export class CreateEvolutionDto {
  @IsString()
  @MinLength(2)
  title: string;

  @IsDateString()
  date: string;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;

  @IsString()
  @MinLength(5)
  description: string;
}
