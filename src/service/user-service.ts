import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreateUserRequest,
  LoginUserRequest,
  toUserResponse,
  UpdateUserRequest,
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

  static async get(user: User): Promise<UserResponse> {
    return toUserResponse(user);
  }

  static async update(
    user: User,
    request: UpdateUserRequest
  ): Promise<UserResponse> {
    // Start User Validation
    const updateRequest = Validation.validate(UserValidation.UPDATE, request);
    // End User Validation

    // Start Pengecekan Username & Password
    if (updateRequest.name) {
      user.name = updateRequest.name;
    }

    if (updateRequest.password) {
      user.password = await bcrypt.hash(updateRequest.password, 10);
    }
    // End Pengecekan Username & Password

    // Start Update Databases
    const result = await prismaClient.user.update({
      where: {
        username: user.username,
      },
      data: user,
    });
    // Start Update Databases

    // Return User Response
    return toUserResponse(result);
  }

  static async logout(user: User): Promise<UserResponse> {
    // Set User Toke to null
    const result = await prismaClient.user.update({
      where: {
        username: user.username,
      },
      data: {
        token: null,
      },
    });

    // Return User Response
    return toUserResponse(result);
  }
}
