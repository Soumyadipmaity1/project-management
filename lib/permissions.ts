type RoleAnnouncement = "Admin" | "Lead" | "Member";
type ActionAnnouncement = "create" | "update" | "delete" | "view" |"pin" | "unpin";

type RoleProject = "Admin" | "Lead" | "Member";
type ActionProject = "create" | "update" | "delete" | "view";

type RoleRequest = "Admin" | "Lead" | "Member";
type ActionRequest = "create" | "update" | "view";

type RoleMember = "Admin" | "Lead" | "Member";
type ActionMember = "create" | "update" | "delete" | "view";

const announcementPermission: Record<RoleAnnouncement, ActionAnnouncement[]> = {
  Admin: ["create", "update", "delete", "view", "pin", "unpin"],
  Lead: ["create", "update", "view","delete" , "pin", "unpin"],
  Member: ["view"],
};

export function can(role: string | undefined, action: ActionAnnouncement): boolean {
  if (!role) return false;

  const normalizedRole =
    role.toLowerCase() === "admin" ? "Admin" :
    role.toLowerCase() === "lead" ? "Lead" :
    role.toLowerCase() === "member" ? "Member" :
    null;

  if (!normalizedRole) return false;

  return announcementPermission[normalizedRole as RoleAnnouncement].includes(action);
}

const projectPermission: Record<RoleProject, ActionProject[]> = {
  Admin: ["create", "update", "delete", "view"],
  Lead: ["create", "update", "view","delete"],
  Member: ["view"],
};

export function canProject(role: string | undefined, action: ActionProject): boolean {
  if (!role) return false;

  const normalizedRole =
    role.toLowerCase() === "admin" ? "Admin" : 
    role.toLowerCase() === "lead" ? "Lead" :
    role.toLowerCase() === "member" ? "Member" :
    null;

  if (!normalizedRole) return false;

  return projectPermission[normalizedRole as RoleProject].includes(action);
}

 const memberPermission: Record<RoleMember, ActionMember[]> = {
  Admin: ["create", "update", "delete", "view"],
  Lead:  ["create", "update", "delete", "view"],
  Member: ["view"],
};

export function canMember(role: string | undefined, action: ActionMember): boolean {
  if (!role) return false;

  const normalizedRole =
    role.toLowerCase() === "admin" ? "Admin" :
    role.toLowerCase() === "lead" ? "Lead" :
    role.toLowerCase() === "member" ? "Member" :
    null;

  if (!normalizedRole) return false;

  return memberPermission[normalizedRole as RoleMember].includes(action);
}
