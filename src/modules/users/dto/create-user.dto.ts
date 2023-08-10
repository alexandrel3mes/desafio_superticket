import { UserRole } from 'src/entities/user.entity';

export class CreateUserDto {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  document: string;
  activity_id?: number;
}
