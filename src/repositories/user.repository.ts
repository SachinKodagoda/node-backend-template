import { Service } from "typedi";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../configs/database.config";

@Service()
export class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async find(): Promise<User[]> {
    return this.repository.find();
  }

  async findOneById(id: number): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }

  async create(user: User): Promise<User> {
    return this.repository.save(user);
  }
}
