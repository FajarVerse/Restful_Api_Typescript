import { Address, User } from "@prisma/client";
import {
  AddressResponse,
  CreateAddressRequest,
  GetAddressRequest,
  toAddressResponse,
  UpdateAddressRequest,
} from "../model/address-model";
import { Validation } from "../validation/validation";
import { AddressValidation } from "../validation/address-validation";
import { ContactService } from "./contact-service";
import { prismaClient } from "../application/database";
import { error } from "winston";
import { ResponseError } from "../error/response-error";

export class AddressService {
  // Create New Address
  static async create(
    user: User,
    request: CreateAddressRequest
  ): Promise<AddressResponse> {
    const createRequest = Validation.validate(
      AddressValidation.CREATE,
      request
    );

    // Pengecekan Contact
    await ContactService.checkContactMustExists(
      user.username,
      request.contact_id
    );

    // Input Requset Ke dalam Database
    const address = await prismaClient.address.create({
      data: createRequest,
    });

    // Return Address Response
    return toAddressResponse(address);
  }

  static async checkAddressMustExists(
    contact_id: number,
    addressId: number
  ): Promise<Address> {
    const address = await prismaClient.address.findFirst({
      where: {
        id: addressId,
        contact_id: contact_id,
      },
    });

    if (!address) {
      throw new ResponseError(404, "Address is not found");
    }

    return address;
  }

  static async get(
    user: User,
    request: GetAddressRequest
  ): Promise<AddressResponse> {
    const getRequest = Validation.validate(AddressValidation.GET, request);

    // Pengecekan Contact
    await ContactService.checkContactMustExists(
      user.username,
      request.contact_id
    );

    // Get Address
    const address = await this.checkAddressMustExists(
      getRequest.contact_id,
      getRequest.id
    );

    // Return Address Response
    return toAddressResponse(address);
  }

  static async update(
    user: User,
    request: UpdateAddressRequest
  ): Promise<AddressResponse> {
    const updateRequest = Validation.validate(
      AddressValidation.UPDATE,
      request
    );

    // Pengecekan Contact
    await ContactService.checkContactMustExists(
      user.username,
      request.contact_id
    );

    await this.checkAddressMustExists(
      updateRequest.contact_id,
      updateRequest.id
    );

    // Pengecekan Address
    const address = await prismaClient.address.update({
      where: {
        id: updateRequest.id,
        contact_id: updateRequest.contact_id,
      },
      data: updateRequest,
    });

    // Return Address Response
    return toAddressResponse(address)
  }
}