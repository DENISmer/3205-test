import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { JobsService } from './jobs.service';
import type {
  CreateJobDto,
  CreateJobResponseDto,
  JobDetailsDto,
  JobSummaryDto,
} from '../types';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(@Body() dto: CreateJobDto): CreateJobResponseDto {
    return this.jobsService.create(dto);
  }

  @Get()
  findAll(): JobSummaryDto[] {
    return this.jobsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): JobDetailsDto {
    return this.jobsService.findOne(id);
  }

  @Delete(':id')
  cancel(@Param('id') id: string): JobDetailsDto {
    return this.jobsService.cancel(id);
  }
}
