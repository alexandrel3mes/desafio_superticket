import { UserRole } from 'src/entities/user.entity';

export interface ReqUser {
  user: number;
  email: string;
  role: UserRole;
}
