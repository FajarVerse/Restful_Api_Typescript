import { User } from "@prisma/client";
import {
  ContactResponse,
  CreateContactRequest,
  toContactResponse,
} from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";

export class ContactService {
  static async create(
    user: User,
    request: CreateContactRequest
  ): Promise<ContactResponse> {
    // Start Validation Data Contact
    const createRequest = Validation.validate(
      ContactValidation.CREATE,
      request
    );
    // End Validation Data Contact

    // Start Mengirim Data Ke Database
    const record = {
      ...createRequest,
      ...{ username: user.username },
    };

    const contact = await prismaClient.contact.create({
      data: record,
    });
    // End Mengirim Data Ke Database

    logger.debug("recod:" + JSON.stringify(contact));
    // Return Contact Response
    return toContactResponse(contact);
  }

  static async get(user: User, id: number): Promise<ContactResponse> {
    // Pengecekan Usename dan Id contact
    const contact = await prismaClient.contact.findUnique({
      where: {
        id: id,
        username: user.username,
      },
    });

    if (!contact) {
      throw new ResponseError(404, "Conctact Not Found");
    }

    return toContactResponse(contact);
  }
}
