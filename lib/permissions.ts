export const announcementPermission = {
  Admin: ["create", "edit", "delete", "pin", "view"],
  Lead: ["create", "edit", "delete", "pin", "view"],
  Member: ["view"],
} as const;

export type RoleAnnouncement = keyof typeof announcementPermission;
export type ActionAnnouncement = (typeof announcementPermission)[RoleAnnouncement][number];

export function can(role: RoleAnnouncement, action: ActionAnnouncement): boolean {
  return (announcementPermission[role] as readonly ActionAnnouncement[]).includes(action);
}


export const projectPermission = {
  Admin: ["createProject", "editProject", "deleteProject", "approveProject"],
  Lead: ["createProject", "editProject", "deleteProject", "approveMembers"],
  Member: ["viewProject", "applyProject"],
} as const;

export type RoleProject = keyof typeof projectPermission;
export type ActionProject = (typeof projectPermission)[RoleProject][number];

export function canProject(role: RoleProject, action: ActionProject): boolean {
  return (projectPermission[role] as readonly ActionProject[]).includes(action);
}


export const memberPermission = {
  Admin: ["viewMembers", "addMember", "removeMember"],
  Lead: ["viewMembers", "addMember", "removeMember"],
  Member: ["viewMembers", "addMember", "removeMember"],
} as const;

export type RoleMember = keyof typeof projectPermission;
export type ActionMember = (typeof projectPermission)[RoleProject][number];

export function canMember(role: RoleProject, action: ActionProject): boolean {
  return (projectPermission[role] as readonly ActionProject[]).includes(action);
}

