import {
  JsonController,
  Get,
  Post,
  Body,
  Param,
  NotFoundError,
} from "routing-controllers";
import { Service } from "typedi";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../entities/user.entity";

@Service()
@JsonController("/users")
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  @Get("/:id")
  async getOneUser(@Param("id") id: number): Promise<User> {
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`);
    }
    return user;
  }

  @Post()
  async createUser(@Body() userData: Partial<User>): Promise<User> {
    const user = new User();
    Object.assign(user, userData);
    return this.userRepository.create(user);
  }
}
