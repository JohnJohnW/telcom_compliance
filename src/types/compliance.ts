export type SectionSlug =
  | 'regulatory-framework'
  | 'carrier-licensing'
  | 'service-provider-rules'
  | 'industry-codes'
  | 'protection-of-communications'
  | 'emergency-services'
  | 'monitoring-reporting'
  | 'technical-regulation'
  | 'international-aspects'
  | 'national-security'
  | 'industry-assistance'
  | 'standard-licence-conditions'
  | 'submarine-cable-protection'
  | 'data-retention'
  | 'consumer-obligations'
  | 'spam-do-not-call';

export type SectionCategory =
  | 'Licensing'
  | 'Consumer'
  | 'Security'
  | 'Technical'
  | 'Regulatory'
  | 'International'
  | 'Privacy';

export type BusinessType =
  | 'carrier'
  | 'carriage-service-provider'
  | 'content-service-provider'
  | 'voip-provider'
  | 'equipment-supplier'
  | 'reseller'
  | 'isp'
  | 'mvno';

export interface LegalCitation {
  actShortName: string;
  section: string;
  description: string;
  legislationUrl?: string;
}

export interface SubSection {
  heading: string;
  body: string;
  checklist?: string[];
  citations: LegalCitation[];
}

export interface ComplianceSection {
  slug: SectionSlug;
  title: string;
  shortTitle: string;
  category: SectionCategory;
  summary: string;
  applicableTo: BusinessType[];
  lastUpdated: string;
  keyActs: string[];
  subsections: SubSection[];
}

export type PriorityLevel =
  | 'ALWAYS_REQUIRED'
  | 'REQUIRED'
  | 'REVIEW_RECOMMENDED'
  | 'NOT_APPLICABLE';

export interface AssessmentQuestion {
  id: string;
  stepIndex: number;
  text: string;
  helpText?: string;
  inputType: 'radio' | 'checkbox-group' | 'single-checkbox';
  options?: { value: string; label: string }[];
  answerToBusinessTypes: Record<string, BusinessType[]>;
}

export interface WizardStep {
  title: string;
  description: string;
  questionIds: string[];
}

export interface AssessmentAnswers {
  [questionId: string]: string | string[] | boolean;
}

export interface SectionResult {
  slug: SectionSlug;
  priority: PriorityLevel;
}

export interface AssessmentResult {
  businessTypes: BusinessType[];
  sections: SectionResult[];
}
