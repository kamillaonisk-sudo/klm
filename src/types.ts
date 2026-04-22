export type ViewType = 'DASHBOARD' | 'CAMPAIGNS' | 'GUIDELINES' | 'AUDIT' | 'ADMIN_VAULT';

export type UserRole = 'BRAND_DIRECTOR' | 'REGIONAL_MANAGER';

export type WorkflowStage = 'DRAFT' | 'REGIONAL_REVIEW' | 'DIRECTOR_SIGN_OFF' | 'PUBLISHED';

export interface Campaign {
  id: string;
  name: string;
  region: string;
  stage: WorkflowStage;
  owner: string;
  deadline: string;
  violations?: string[];
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  user: string;
  role: UserRole;
  region: string;
  action: string;
  asset: string;
  status: 'SUCCESS' | 'FLAGGED' | 'PENDING';
}

export interface BrandGuideline {
  version: string;
  publishedAt: string;
  mandatory: boolean;
  content: string;
}
