import { User } from "../Domain/User";

interface UserRepository {
  save(user: User): Promise<void>;
  getById(id: string): Promise<User>;
}
