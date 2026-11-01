import type { Role } from "../db/models/enums.js";
import { Role as UserRole } from "../db/models/enums.js";

export type Workspace = "guest" | "house-admin" | "app-admin";

export function getWorkspaceForRole(role: Role): Workspace {
  switch (role) {
    case UserRole.GUEST:
      return "guest";
    case UserRole.HOUSE_ADMIN:
      return "house-admin";
    case UserRole.APP_ADMIN:
      return "app-admin";
  }
}
