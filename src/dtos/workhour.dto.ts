import { IsInt, IsDate, IsBoolean } from 'class-validator';

export class findDateDto {
  @IsDate()
  public start_date: Date;

  @IsInt()
  public days: number;

  @IsBoolean()
  public is_ignore_workhour: boolean;
}