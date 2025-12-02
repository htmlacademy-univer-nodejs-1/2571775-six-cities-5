import { IsNumber } from 'class-validator';
export class Coordinate {
  @IsNumber()
  public latitude!: number;

  @IsNumber()
  public longitude!: number;
}
