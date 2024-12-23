import { IsInt, IsBoolean, IsString, IsOptional } from 'class-validator';

export class GetTimetableDto {
  @IsString()
  public start_day_identifier: string;

  @IsOptional()
  @IsInt()
  public days?: number;

  @IsInt()
  public service_duration: number;

  @IsOptional()
  @IsInt()
  public timeslot_interval?: number;

  @IsOptional()
  @IsBoolean()
  public is_ignore_schedule?: boolean;

  @IsOptional()
  @IsBoolean()
  public is_ignore_workhour?: boolean;

  @IsString()
  public timezone_identifier: string;
}