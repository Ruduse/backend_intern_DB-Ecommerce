import { User } from '../schemas/user.schema';
declare global {
  namespace Express {
    interface Request {
      user: User; // Đảm bảo user có thuộc tính role và _id
    }
  }
}
