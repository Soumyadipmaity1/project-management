export const announcementPermission = {
  Admin: ["create", "edit", "delete", "pin", "view"],
  Lead: ["create", "edit", "delete", "pin", "view"],
  Member: ["view"],
} as const;

export type Role = keyof typeof announcementPermission;
export type Action = (typeof announcementPermission)[Role][number];

export function can(role: Role, action: Action): boolean {
  return announcementPermission[role]?.includes(action as any) ?? false;
}
