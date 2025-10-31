type BaseRole = "Admin" | "Lead" | "Member" | "ProjectLead" | "CoLead";

type ActionAnnouncement = "create" | "update" | "delete" | "view" | "pin" | "unpin";
type ActionProject = "create" | "update" | "delete" | "view";
type ActionRequest = "create" | "approverequest" | "rejectrequest" | "view";
type ActionDomainMember = "update" | "delete" | "view";
type ActionProjectMembers = "approve" | "reject" | "view" | "remove";
type ApplyProject = "view" | "apply";

const applyprojectPermission: Record<Extract<BaseRole, "Member">, ApplyProject[]> = {
  Member: ["view", "apply"],
};

// ✅ Announcement Permissions
const announcementPermission: Record<BaseRole, ActionAnnouncement[]> = {
  Admin: ["create", "update", "delete", "view", "pin", "unpin"],
  Lead: ["create", "update", "delete", "view", "pin", "unpin"],
  ProjectLead: ["create", "update", "view"],
  CoLead: ["create", "update", "view"],
  Member: ["view"],
};

// 🔹 Normalize any string to a canonical role
function normalizeRole(role: string | undefined): BaseRole | null {
  if (!role) return null;
  const lower = role.toLowerCase();
  switch (lower) {
    case "admin":
      return "Admin";
    case "lead":
      return "Lead";
    case "member":
      return "Member";
    case "projectlead":
      return "ProjectLead";
    case "colead":
      return "CoLead";
    default:
      return null;
  }
}

// ✅ Announcement Permission Checker
export function can(role: string | undefined, action: ActionAnnouncement): boolean {
  const normalized = normalizeRole(role);
  return !!(normalized && announcementPermission[normalized].includes(action));
}

// ✅ Request Permissions
const requestPermission: Record<BaseRole, ActionRequest[]> = {
  Admin: ["create", "approverequest", "rejectrequest", "view"],
  Lead: ["create", "approverequest", "rejectrequest", "view"],
  ProjectLead: ["create", "view"],
  CoLead: ["create", "view"],
  Member: ["create", "view"],
};

export function canRequest(role: string | undefined, action: ActionRequest): boolean {
  const normalized = normalizeRole(role);
  return !!(normalized && requestPermission[normalized].includes(action));
}

// ✅ Project Permissions
const projectPermission: Record<BaseRole, ActionProject[]> = {
  Admin: ["create", "update", "delete", "view"],
  Lead: ["create", "update", "delete", "view"],
  ProjectLead: ["update", "delete", "view"],
  CoLead: ["update", "delete","view"],
  Member: ["view"],
};

export function canProject(role: string | undefined, action: ActionProject): boolean {
  const normalized = normalizeRole(role);
  return !!(normalized && projectPermission[normalized].includes(action));
}

// ✅ Domain Member Permissions
const domainMemberPermission: Record<BaseRole, ActionDomainMember[]> = {
  Admin: ["update", "delete", "view"],
  Lead: ["update", "delete", "view"],
  ProjectLead: ["view"],
  CoLead: ["view"],
  Member: [],
};

export function canDomainMember(role: string | undefined, action: ActionDomainMember): boolean {
  const normalized = normalizeRole(role);
  return !!(normalized && domainMemberPermission[normalized].includes(action));
}

const projectMemberPermission: Record<BaseRole, ActionProjectMembers[]> = {
  Admin: ["approve", "reject", "view", "remove"],
  Lead: ["approve", "reject", "view", "remove"],
  ProjectLead: ["approve", "reject", "view", "remove"],
  CoLead: ["approve", "reject", "view"],
  Member: [],
};

export function canProjectMember(role: string | undefined, action: ActionProjectMembers): boolean {
  const normalized = normalizeRole(role);
  return !!(normalized && projectMemberPermission[normalized].includes(action));
}
