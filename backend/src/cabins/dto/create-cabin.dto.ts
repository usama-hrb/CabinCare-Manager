import { ApiProperty } from '@nestjs/swagger';

export class CreateCabinDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  description?: string;
}
