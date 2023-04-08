import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus, Gender } from '../dto/create-order.dto';

export class OrderEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  familyName: string;

  @ApiProperty()
  personalName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  gender: Gender;

  @ApiProperty()
  birthday: string;

  @ApiProperty()
  passportDate: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  addressRegistration: string;

  @ApiProperty()
  passportSeries: string;

  @ApiProperty()
  passportNumber: string;

  @ApiProperty()
  passportBranch: string;

  @ApiProperty()
  passportMainPagePhoto: string;

  @ApiProperty()
  passportRegistrationPhoto: string;

  @ApiProperty()
  districtId: string;

  @ApiProperty()
  tariffId: string;

  @ApiProperty()
  status: OrderStatus;
}
