import type { Role, UserStatus } from "../db/models/enums.js";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: Role;
        status: UserStatus;
      };
    }
  }
}

export {};
