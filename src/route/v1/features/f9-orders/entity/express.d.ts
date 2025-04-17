import { User } from '@your-app/models/user'; // Đảm bảo nhập đúng kiểu User của bạn

declare global {
  namespace Express {
    interface Request {
      user: User; // Đảm bảo user có thuộc tính role và _id
    }
  }
}