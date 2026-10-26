import type { Role } from "@prisma/client";

export type Workspace = "guest" | "house-admin" | "app-admin";

export function getWorkspaceForRole(role: Role): Workspace {
  switch (role) {
    case "GUEST":
      return "guest";
    case "HOUSE_ADMIN":
      return "house-admin";
    case "APP_ADMIN":
      return "app-admin";
  }
}
