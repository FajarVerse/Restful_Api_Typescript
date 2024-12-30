import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreateUserRequest,
  toUserResponse,
  UserResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";

export class UserService {
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    // Start Validition Data
    const registerRequest = Validation.validate(
      UserValidation.REGISTER,
      request
    );
    // End Validation Data

    // Start Pengecekan Username
    const totalUseWithSameUsername = await prismaClient.user.count({
      where: {
        username: registerRequest.username,
      },
    });

    if (totalUseWithSameUsername != 0) {
      throw new ResponseError(400, "Username already exists");
    }
    // End Pengecekan Username

    // Start Hashing Password (ubah password)
    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);
    // End Hashing Password (ubah password)

    // Start Simpan Request Database
    const user = await prismaClient.user.create({
      data: registerRequest,
    });
    // End Simpan Request Database

    // Return User Response
    return toUserResponse(user);
  }
}
