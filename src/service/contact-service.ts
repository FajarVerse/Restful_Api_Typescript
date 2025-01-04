import { Contact, User } from "@prisma/client";
import {
  ContactResponse,
  CreateContactRequest,
  SearchContactRequest,
  toContactResponse,
  UpdateContactRequest,
} from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";
import { PageAble } from "../model/page";

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

  static async checkContactMustExists(
    username: string,
    contactId: number
  ): Promise<Contact> {
    // Pengecekan Usename dan Id contact
    const contact = await prismaClient.contact.findUnique({
      where: {
        id: contactId,
        username: username,
      },
    });

    if (!contact) {
      throw new ResponseError(404, "Conctact Not Found");
    }

    return contact;
  }

  static async get(user: User, id: number): Promise<ContactResponse> {
    const contact = await this.checkContactMustExists(user.username, id);

    return toContactResponse(contact);
  }

  static async update(
    user: User,
    request: UpdateContactRequest
  ): Promise<ContactResponse> {
    const updateRequest = Validation.validate(
      ContactValidation.UPDATE,
      request
    );
    await this.checkContactMustExists(user.username, updateRequest.id);

    // Update Database
    const contact = await prismaClient.contact.update({
      where: {
        id: updateRequest.id,
        username: user.username,
      },
      data: updateRequest,
    });

    // Return Contact Response
    return toContactResponse(contact);
  }

  static async remove(user: User, id: number): Promise<ContactResponse> {
    await this.checkContactMustExists(user.username, id);

    const contact = await prismaClient.contact.delete({
      where: {
        id: id,
        username: user.username,
      },
    });

    return toContactResponse(contact);
  }

  static async search(
    user: User,
    request: SearchContactRequest
  ): Promise<PageAble<ContactResponse>> {
    const searchRequest = Validation.validate(
      ContactValidation.SEARCH,
      request
    );

    const skip = (searchRequest.page - 1) * searchRequest.size;

    const filters = [];
    // Check if name exist
    if (searchRequest.name) {
      filters.push({
        OR: [
          {
            first_name: {
              contains: searchRequest.name,
            },
          },
          {
            last_name: {
              contains: searchRequest.name,
            },
          },
        ],
      });
    }
    // Check if email exist
    if (searchRequest.email) {
      filters.push({
        email: {
          contains: searchRequest.email,
        },
      });
    }
    // Check if phone exist
    if (searchRequest.phone) {
      filters.push({
        phone: {
          contains: searchRequest.phone,
        },
      });
    }

    // Check ke database
    const contacts = await prismaClient.contact.findMany({
      where: {
        username: user.username,
        AND: filters,
      },
      take: searchRequest.size,
      skip: skip,
    });

    logger.debug("Contact" + contacts);

    const total = await prismaClient.contact.count({
      where: {
        username: user.username,
        AND: filters,
      },
    });

    return {
      data: contacts.map((contact) => toContactResponse(contact)),
      paging: {
        current_page: searchRequest.page,
        total_page: Math.ceil(total / searchRequest.size),
        size: searchRequest.size,
      },
    };
  }
}
