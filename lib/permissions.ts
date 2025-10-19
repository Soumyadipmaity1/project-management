type RoleAnnouncement = "Admin" | "Lead" | "Member"| "ProjectLead";
type ActionAnnouncement = "create" | "update" | "delete" | "view" |"pin" | "unpin";

type RoleProject = "Admin" | "Lead" | "Member"| "ProjectLead";
type ActionProject = "create" | "update" | "delete" | "view";

type RoleRequest = "Admin" | "Lead" | "Member" | "ProjectLead" ;
type ActionRequest = "create" | "approverequest" | "rejectrequest" |"view";

type RoleDomainMember = "Admin" | "Lead" | "Member" | "ProjectLead";
type ActionDomainMember = "update" | "delete" | "view";

type RoleProjectMembers =  "Admin" | "Lead" | "Member" | "ProjectLead";
type ActionProjectMembers = "approve" | "reject" | "view" | "remove";

const announcementPermission: Record<RoleAnnouncement, ActionAnnouncement[]> = {
  Admin: ["create", "update", "delete", "view", "pin", "unpin"],
  Lead: ["create", "update", "view","delete" , "pin", "unpin"],
  ProjectLead: ["create", "update", "view"],
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

const requestPermission: Record<RoleRequest, ActionRequest[]> = {
  Admin: ["create", "approverequest", "rejectrequest", "view"],
  Lead: ["create","approverequest", "rejectrequest", "view"],
  ProjectLead: ["create", "view"],
  Member: ["create", "view"],
}

export function canRequest(role: string | undefined, action: ActionRequest): boolean {
  if(!role) return false;

  const normalizedRole = 
  role.toLowerCase() === "admin" ? "Admin" :
  role.toLowerCase() === "lead" ? "Lead":
  role.toLowerCase() === "member" ? "Member":
  null;

  if(!normalizedRole) return false;
  return requestPermission[normalizedRole as RoleRequest].includes(action);

}

const projectPermission: Record<RoleProject, ActionProject[]> = {
  Admin: ["create", "update", "delete", "view"],
  ProjectLead: ["update", "view"],
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

 const DomainmemberPermission: Record<RoleDomainMember, ActionDomainMember[]> = {
  Admin: ["update", "delete", "view"],
  Lead:  ["update", "delete", "view"],
  ProjectLead: [],
  Member: [],
};

export function canDomainMember(role: string | undefined, action: ActionDomainMember): boolean {
  if (!role) return false;

  const normalizedRole =
    role.toLowerCase() === "admin" ? "Admin" :
    role.toLowerCase() === "lead" ? "Lead" :
    role.toLowerCase() === "member" ? "Member" :
    null;

  if (!normalizedRole) return false;

  return DomainmemberPermission[normalizedRole as RoleDomainMember].includes(action);
}

 const ProjectmemberPermission: Record<RoleProjectMembers, ActionProjectMembers[]> = {
  Admin: ["approve" , "reject" , "view" , "remove"],
  Lead:  ["approve" , "reject" , "view" , "remove"],
  ProjectLead: ["approve" , "reject" , "view" , "remove"],
  Member: [],
};

export function canProjectMember(role: string | undefined, action: ActionProjectMembers): boolean {
  if (!role) return false;

  const normalizedRole =
    role.toLowerCase() === "admin" ? "Admin" :
    role.toLowerCase() === "lead" ? "Lead" :
    role.toLowerCase() === "member" ? "Member" :
    null;

  if (!normalizedRole) return false;

  return ProjectmemberPermission[normalizedRole as RoleProjectMembers].includes(action);
}

