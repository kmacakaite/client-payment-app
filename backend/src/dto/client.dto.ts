// https://docs.nestjs.com/controllers#request-payloads
import { IsNotEmpty } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

// Separating logic for creation and updating individual fields
export class CreateClientDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  phoneNumber: string;
  bankAccountNumber?: number;
}

export class UpdateClientDto extends PartialType(CreateClientDto) {}
