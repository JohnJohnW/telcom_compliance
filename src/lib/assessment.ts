import type {
  AssessmentAnswers,
  AssessmentResult,
  BusinessType,
  PriorityLevel,
  SectionResult,
  SectionSlug,
} from '@/types/compliance';
import { ASSESSMENT_QUESTIONS } from '@/data/assessmentQuestions';
import { COMPLIANCE_SECTIONS } from '@/data/sections';

// Sections that apply universally to all telecommunications participants
const ALWAYS_REQUIRED_SECTIONS: SectionSlug[] = [
  'regulatory-framework',
  'protection-of-communications',
  'monitoring-reporting',
];

// Sections that apply based on specific business types
const BUSINESS_TYPE_SECTION_MAP: Record<BusinessType, SectionSlug[]> = {
  carrier: [
    'carrier-licensing',
    'standard-licence-conditions',
    'national-security',
    'industry-codes',
    'emergency-services',
    'technical-regulation',
  ],
  'carriage-service-provider': [
    'service-provider-rules',
    'industry-codes',
    'consumer-obligations',
    'emergency-services',
    'data-retention',
  ],
  'content-service-provider': [
    'service-provider-rules',
    'industry-codes',
    'spam-do-not-call',
  ],
  'voip-provider': [
    'service-provider-rules',
    'emergency-services',
    'technical-regulation',
    'data-retention',
  ],
  'equipment-supplier': [
    'technical-regulation',
    'industry-codes',
  ],
  reseller: [
    'service-provider-rules',
    'consumer-obligations',
    'industry-codes',
    'spam-do-not-call',
  ],
  isp: [
    'service-provider-rules',
    'data-retention',
    'consumer-obligations',
    'industry-codes',
    'national-security',
  ],
  mvno: [
    'service-provider-rules',
    'data-retention',
    'consumer-obligations',
    'emergency-services',
    'industry-codes',
  ],
};

// Sections triggered by specific question answers (regardless of business type)
interface AnswerTrigger {
  questionId: string;
  answerValue: string | string[];
  sections: SectionSlug[];
  priority: PriorityLevel;
}

const ANSWER_TRIGGERS: AnswerTrigger[] = [
  {
    questionId: 'q2_emergency',
    answerValue: ['yes', 'voip-only'],
    sections: ['emergency-services'],
    priority: 'REQUIRED',
  },
  {
    questionId: 'q2_international',
    answerValue: 'yes',
    sections: ['international-aspects'],
    priority: 'REQUIRED',
  },
  {
    questionId: 'q3_submarine',
    answerValue: 'yes',
    sections: ['submarine-cable-protection'],
    priority: 'REQUIRED',
  },
  {
    questionId: 'q4_metadata',
    answerValue: ['yes', 'unsure'],
    sections: ['data-retention'],
    priority: 'REQUIRED',
  },
  {
    questionId: 'q4_marketing_messages',
    answerValue: 'yes',
    sections: ['spam-do-not-call'],
    priority: 'REQUIRED',
  },
  {
    questionId: 'q4_telemarketing',
    answerValue: 'yes',
    sections: ['spam-do-not-call'],
    priority: 'REQUIRED',
  },
  {
    questionId: 'q5_tan_tcn',
    answerValue: ['yes', 'unsure'],
    sections: ['industry-assistance', 'national-security'],
    priority: 'REQUIRED',
  },
  {
    questionId: 'q5_interception',
    answerValue: ['yes', 'unsure'],
    sections: ['industry-assistance'],
    priority: 'REQUIRED',
  },
  {
    questionId: 'q5_revenue',
    answerValue: 'large',
    sections: ['standard-licence-conditions', 'carrier-licensing'],
    priority: 'REVIEW_RECOMMENDED',
  },
];

function answerMatchesTrigger(
  answer: string | string[] | boolean | undefined,
  triggerValue: string | string[]
): boolean {
  if (answer === undefined || answer === null) return false;
  const triggerValues = Array.isArray(triggerValue) ? triggerValue : [triggerValue];
  if (Array.isArray(answer)) {
    return answer.some((a) => triggerValues.includes(a));
  }
  return triggerValues.includes(String(answer));
}

export function deriveBusinessTypes(answers: AssessmentAnswers): BusinessType[] {
  const types = new Set<BusinessType>();

  for (const question of ASSESSMENT_QUESTIONS) {
    const answer = answers[question.id];
    if (answer === undefined || answer === null) continue;

    const answerValues = Array.isArray(answer) ? answer : [String(answer)];
    for (const val of answerValues) {
      const mappedTypes = question.answerToBusinessTypes[val];
      if (mappedTypes) {
        mappedTypes.forEach((t) => types.add(t));
      }
    }
  }

  return Array.from(types);
}

export function scoreAssessment(answers: AssessmentAnswers): AssessmentResult {
  const businessTypes = deriveBusinessTypes(answers);
  const sectionPriorities = new Map<SectionSlug, PriorityLevel>();

  // 1. Always-required sections
  for (const slug of ALWAYS_REQUIRED_SECTIONS) {
    sectionPriorities.set(slug, 'ALWAYS_REQUIRED');
  }

  // 2. Business-type-driven sections
  for (const businessType of businessTypes) {
    const sections = BUSINESS_TYPE_SECTION_MAP[businessType] ?? [];
    for (const slug of sections) {
      if (!sectionPriorities.has(slug)) {
        sectionPriorities.set(slug, 'REQUIRED');
      }
    }
  }

  // 3. Answer-driven triggers (can promote or add sections)
  for (const trigger of ANSWER_TRIGGERS) {
    const answer = answers[trigger.questionId];
    if (answerMatchesTrigger(answer, trigger.answerValue)) {
      for (const slug of trigger.sections) {
        const existing = sectionPriorities.get(slug);
        if (!existing || priorityRank(trigger.priority) > priorityRank(existing)) {
          sectionPriorities.set(slug, trigger.priority);
        }
      }
    }
  }

  // 4. All remaining sections are NOT_APPLICABLE
  const allSlugs = COMPLIANCE_SECTIONS.map((s) => s.slug);
  const results: SectionResult[] = allSlugs.map((slug) => ({
    slug,
    priority: sectionPriorities.get(slug) ?? 'NOT_APPLICABLE',
  }));

  // Sort: ALWAYS_REQUIRED → REQUIRED → REVIEW_RECOMMENDED → NOT_APPLICABLE
  results.sort((a, b) => priorityRank(b.priority) - priorityRank(a.priority));

  return { businessTypes, sections: results };
}

function priorityRank(p: PriorityLevel): number {
  switch (p) {
    case 'ALWAYS_REQUIRED': return 4;
    case 'REQUIRED': return 3;
    case 'REVIEW_RECOMMENDED': return 2;
    case 'NOT_APPLICABLE': return 1;
  }
}

export function getSectionsByPriority(
  result: AssessmentResult,
  priority: PriorityLevel
): SectionSlug[] {
  return result.sections
    .filter((s) => s.priority === priority)
    .map((s) => s.slug);
}
