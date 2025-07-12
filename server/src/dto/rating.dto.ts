import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  Min,
  Max,
} from 'class-validator';

export class CreateRatingDto {
  @IsString()
  swapId: string;

  @IsString()
  ratedUserId: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
