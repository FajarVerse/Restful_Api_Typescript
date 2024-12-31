import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreateUserRequest,
  LoginUserRequest,
  toUserResponse,
  UserResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

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

  static async login(request: LoginUserRequest): Promise<UserResponse> {
    // Start Validation Data
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);
    // End Validation Data

    // Start Pengecekan Username
    let user = await prismaClient.user.findUnique({
      where: {
        username: loginRequest.username,
      },
    });

    if (!user) {
      throw new ResponseError(401, "Username or password is wrong");
    }
    // End Pengecekan Username

    // Start Pengecekan Password
    const isPasswrodValid = await bcrypt.compare(
      loginRequest.password,
      user.password
    );
    if (!isPasswrodValid) {
      throw new ResponseError(401, "Username or password is wrong");
    }
    // End Pengecekan Password

    // Start Generate Token
    user = await prismaClient.user.update({
      where: {
        username: loginRequest.username,
      },
      data: {
        token: uuid(),
      },
    });
    // End Generate Token

    // Return User Response
    const response = toUserResponse(user);
    response.token = user.token!;
    return response;
  }
}
