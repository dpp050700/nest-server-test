import { Min, Max, IsInt, IsNotEmpty } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class PagerDto {
  @Min(1)
  @IsInt()
  @Expose()
  @Transform(({ value: val }) => (val ? Number.parseInt(val) : 1), {
    toClassOnly: true,
  })
  page?: number;

  @Min(1)
  @Max(100)
  @IsInt()
  @Expose()
  @Transform(({ value: val }) => (val ? Number.parseInt(val) : 10), {
    toClassOnly: true,
  })
  pageSize?: number;
}
