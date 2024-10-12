import { Min, Max, IsInt } from 'class-validator';

export class PagerDto {
  @Min(1)
  @IsInt()
  page: number;

  @Min(1)
  @Max(100)
  @IsInt()
  pageSize: number;
}
