// // // import { ActionAnnouncement } from './permissions';
// // // export const announcementPermission = {
// // //   Admin: ["create", "edit", "delete", "pin", "view"],
// // //   Lead: ["create", "edit", "delete", "pin", "view"],
// // //   Member: ["view"],
// // // } as const;

// // // export type RoleAnnouncement = keyof typeof announcementPermission;
// // // export type ActionAnnouncement = (typeof announcementPermission)[RoleAnnouncement][number];

// // // export function can(role: RoleAnnouncement, action: ActionAnnouncement): boolean {
// // //   return (announcementPermission[role] as readonly ActionAnnouncement[]).includes(action);
// // // }

// // export const announcementPermission = {
// //   Admin: ["create", "edit", "delete", "pin", "view"],
// //   Lead: ["create", "edit", "delete", "pin", "view"],
// //   Member: ["view"],
// // } as const;

// // export type RoleAnnouncement = keyof typeof announcementPermission;

// // // ✅ This now gives "create" | "edit" | "delete" | "pin" | "view"
// // export type ActionAnnouncement = (typeof announcementPermission)[keyof typeof announcementPermission][number];

// // export function can(role: RoleAnnouncement, action: ActionAnnouncement): boolean {
// //   return announcementPermission[role].includes(action as any);
// // }




// // export const projectPermission = {
// //   Admin: [ "createproject", "editproject", "deleteproject", "approveproject","approverequest", "rejectrequest" ],
// //   Lead: [ "createproject", "editproject", "deleteproject", "approveproject","approverequest","rejectrequest" ],
// //   Member: ["viewproject", "applyproject"],
// // } as const;

// // export type RoleProject = keyof typeof projectPermission;
// // export type ActionProject = (typeof projectPermission)[RoleProject][number];

// // export function canProject(role: RoleProject, action: ActionProject): boolean {
// //   return (projectPermission[role] as readonly ActionProject[]).includes(action as any);
// // }

// // export const memberPermission = {
// //   Admin: ["viewMember", "addMember", "removeMember"],
// //   Lead: ["viewMember", "addMember", "removeMember"],
// //   Member: ["viewMember"],
// // } as const;

// // export type RoleMember = keyof typeof memberPermission;
// // export type ActionMember = (typeof memberPermission)[RoleMember][number];
// // export function canMember(role: RoleMember, action: ActionMember): boolean {
// //   return (memberPermission[role] as readonly ActionMember[]).includes(action as any);
// // }



// // lib/permissions.ts

// export const announcementPermission = {
//   Admin: ["create", "edit", "delete", "pin", "view"] as const,
//   Lead: ["create", "edit", "delete", "pin", "view"] as const,
//   Member: ["view"] as const,
// };

// export type RoleAnnouncement = keyof typeof announcementPermission;
// export type ActionAnnouncement = typeof announcementPermission[RoleAnnouncement][number];

// export function can(role: RoleAnnouncement, action: ActionAnnouncement): boolean {
//   return (announcementPermission[role] as readonly ActionAnnouncement[]).includes(action);
// }

// // -----------------------------

// export const projectPermission = {
//   Admin: ["createproject", "editproject", "deleteproject", "approveproject", "approverequest", "rejectrequest"] as const,
//   Lead: ["createproject", "editproject", "deleteproject", "approveproject", "approverequest", "rejectrequest"] as const,
//   Member: ["viewproject", "applyproject"] as const,
// };

// export type RoleProject = keyof typeof projectPermission;
// export type ActionProject = typeof projectPermission[RoleProject][number];

// export function canProject(role: RoleProject, action: ActionProject): boolean {
//   return (projectPermission[role] as readonly ActionProject[]).includes(action);
// }

// // -----------------------------

// export const memberPermission = {
//   Admin: ["viewMember", "addMember", "removeMember"] as const,
//   Lead: ["viewMember", "addMember", "removeMember"] as const,
//   Member: ["viewMember"] as const,
// };

// export type RoleMember = keyof typeof memberPermission;
// export type ActionMember = typeof memberPermission[RoleMember][number];

// export function canMember(role: RoleMember, action: ActionMember): boolean {
//   return (memberPermission[role] as readonly ActionMember[]).includes(action);
// }


// lib/permissions.ts

export const announcementPermission = {
  Admin: ["create", "edit", "delete", "pin", "view"] as const,
  Lead: ["create", "edit", "delete", "pin", "view"] as const,
  Member: ["view"] as const,
};

export type RoleAnnouncement = keyof typeof announcementPermission;
export type ActionAnnouncement = typeof announcementPermission[RoleAnnouncement][number];

export function can(role: string, action: ActionAnnouncement): boolean {
  const normalizedRole =
    role === "admin" ? "Admin" :
    role === "lead" ? "Lead" :
    role === "member" ? "Member" :
    role;
  return (announcementPermission[normalizedRole as RoleAnnouncement] as readonly ActionAnnouncement[]).includes(action);
}

// -----------------------------

export const projectPermission = {
  Admin: ["createproject", "editproject", "deleteproject", "approveproject", "approverequest", "rejectrequest"] as const,
  Lead: ["createproject", "editproject", "deleteproject", "approveproject", "approverequest", "rejectrequest"] as const,
  Member: ["viewproject", "applyproject"] as const,
};

export type RoleProject = keyof typeof projectPermission;
export type ActionProject = typeof projectPermission[RoleProject][number];

export function canProject(role: string, action: ActionProject): boolean {
  const normalizedRole =
    role === "admin" ? "Admin" :
    role === "lead" ? "Lead" :
    role === "member" ? "Member" :
    role;
  return (projectPermission[normalizedRole as RoleProject] as readonly ActionProject[]).includes(action);
}

// -----------------------------

export const memberPermission = {
  Admin: ["viewMember", "addMember", "removeMember"] as const,
  Lead: ["viewMember", "addMember", "removeMember"] as const,
  Member: ["viewMember"] as const,
};

export type RoleMember = keyof typeof memberPermission;
export type ActionMember = typeof memberPermission[RoleMember][number];

export function canMember(role: string, action: ActionMember): boolean {
  const normalizedRole =
    role === "admin" ? "Admin" :
    role === "lead" ? "Lead" :
    role === "member" ? "Member" :
    role;
  return (memberPermission[normalizedRole as RoleMember] as readonly ActionMember[]).includes(action);
}
}
