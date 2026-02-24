import type { AssessmentQuestion, WizardStep } from '@/types/compliance';

export const WIZARD_STEPS: WizardStep[] = [
  {
    title: 'Your Business Type',
    description: 'Help us understand your primary role in the telecommunications value chain.',
    questionIds: ['q1_role', 'q1_carrier_licence'],
  },
  {
    title: 'Services You Provide',
    description: 'Tell us about the services your business offers to customers.',
    questionIds: ['q2_services', 'q2_emergency', 'q2_international'],
  },
  {
    title: 'Infrastructure & Equipment',
    description: 'Do you own or operate any physical telecommunications infrastructure?',
    questionIds: ['q3_own_infra', 'q3_equipment', 'q3_submarine'],
  },
  {
    title: 'Data & Privacy',
    description: 'How does your business handle customer communications data?',
    questionIds: ['q4_metadata', 'q4_marketing_messages', 'q4_telemarketing'],
  },
  {
    title: 'Security & Law Enforcement',
    description: 'Security and law enforcement assistance obligations vary by business size and type.',
    questionIds: ['q5_tan_tcn', 'q5_interception', 'q5_revenue'],
  },
];

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // Step 1 — Business Type
  {
    id: 'q1_role',
    stepIndex: 0,
    text: 'What best describes your primary role in telecommunications?',
    helpText:
      'Select the role that most closely matches how your business participates in the Australian telecommunications market.',
    inputType: 'radio',
    options: [
      {
        value: 'network-owner',
        label: 'Network owner / operator — I own physical network infrastructure (exchanges, towers, cables, fibre)',
      },
      {
        value: 'csp-reseller',
        label: 'Carriage service provider / reseller — I resell or wholesale carriage services using a carrier\'s network',
      },
      {
        value: 'isp',
        label: 'Internet service provider (ISP) — I provide internet access services to customers',
      },
      {
        value: 'mvno',
        label: 'Mobile virtual network operator (MVNO) — I provide mobile services using another carrier\'s network',
      },
      {
        value: 'content-provider',
        label: 'Content / application service provider — I provide content or apps over carriage services (not the carriage itself)',
      },
    ],
    answerToBusinessTypes: {
      'network-owner': ['carrier'],
      'csp-reseller': ['carriage-service-provider', 'reseller'],
      'isp': ['isp', 'carriage-service-provider'],
      'mvno': ['mvno', 'carriage-service-provider'],
      'content-provider': ['content-service-provider'],
    },
  },
  {
    id: 'q1_carrier_licence',
    stepIndex: 0,
    text: 'Do you hold or intend to apply for an ACMA Carrier Licence?',
    helpText:
      'A carrier licence is required if you own a "network unit" — physical infrastructure used to supply carriage services to the public (e.g., exchanges, cable systems, radio towers).',
    inputType: 'radio',
    options: [
      { value: 'yes', label: 'Yes — I currently hold or am applying for a carrier licence' },
      { value: 'no', label: 'No — I do not own network infrastructure' },
      { value: 'unsure', label: 'Unsure — I\'m not certain whether my infrastructure requires a licence' },
    ],
    answerToBusinessTypes: {
      'yes': ['carrier'],
      'no': [],
      'unsure': ['carrier'],
    },
  },

  // Step 2 — Services
  {
    id: 'q2_services',
    stepIndex: 1,
    text: 'Which services do you provide to end-users or other providers?',
    helpText: 'Select all that apply to your business.',
    inputType: 'checkbox-group',
    options: [
      { value: 'fixed-voice', label: 'Fixed-line voice (landline phone services)' },
      { value: 'mobile-voice', label: 'Mobile voice (including SMS)' },
      { value: 'broadband', label: 'Fixed broadband internet' },
      { value: 'voip', label: 'VoIP / internet telephony (voice calls over the internet)' },
      { value: 'wholesale', label: 'Wholesale carriage services (to other providers, not directly to end-users)' },
      { value: 'content', label: 'Content or application services (streaming, apps, platforms)' },
      { value: 'sms-messaging', label: 'Bulk SMS or commercial messaging services' },
    ],
    answerToBusinessTypes: {
      'fixed-voice': ['carriage-service-provider'],
      'mobile-voice': ['carriage-service-provider', 'mvno'],
      'broadband': ['isp', 'carriage-service-provider'],
      'voip': ['voip-provider'],
      'wholesale': ['carrier', 'carriage-service-provider'],
      'content': ['content-service-provider'],
      'sms-messaging': ['carriage-service-provider'],
    },
  },
  {
    id: 'q2_emergency',
    stepIndex: 1,
    text: 'Do any of your services allow customers to call 000 (Triple Zero), 106, or 112?',
    helpText:
      'If you provide any voice calling service — including VoIP — your customers may rely on it for emergency calls. This triggers specific obligations around caller identification and location data.',
    inputType: 'radio',
    options: [
      { value: 'yes', label: 'Yes — my customers can call 000, 106, or 112 using my service' },
      { value: 'no', label: 'No — my service does not carry voice calls to emergency numbers' },
      { value: 'voip-only', label: 'Yes, but via VoIP / internet-based voice only' },
    ],
    answerToBusinessTypes: {
      'yes': ['carrier', 'carriage-service-provider'],
      'no': [],
      'voip-only': ['voip-provider'],
    },
  },
  {
    id: 'q2_international',
    stepIndex: 1,
    text: 'Do you supply services to customers or other providers outside Australia?',
    helpText:
      'International services can trigger obligations under Australia\'s telecommunications treaty commitments and the ITU Radio Regulations.',
    inputType: 'radio',
    options: [
      { value: 'yes', label: 'Yes — I supply services internationally or operate cross-border infrastructure' },
      { value: 'no', label: 'No — all services are supplied within Australia only' },
    ],
    answerToBusinessTypes: {
      'yes': ['carrier', 'carriage-service-provider'],
      'no': [],
    },
  },

  // Step 3 — Infrastructure
  {
    id: 'q3_own_infra',
    stepIndex: 2,
    text: 'Do you own or operate any physical network infrastructure?',
    helpText:
      'Examples include: telephone exchanges, mobile base stations (towers), fixed wireless transmitters, fibre or copper cable systems, data centres used to supply carriage services.',
    inputType: 'radio',
    options: [
      { value: 'yes', label: 'Yes — I own or operate physical network infrastructure' },
      { value: 'no', label: 'No — I use another carrier\'s infrastructure entirely' },
    ],
    answerToBusinessTypes: {
      'yes': ['carrier'],
      'no': [],
    },
  },
  {
    id: 'q3_equipment',
    stepIndex: 2,
    text: 'Do you supply, install, or certify customer equipment or inside-premises cabling?',
    helpText:
      'Customer equipment includes modems, routers, handsets, alarm systems, and any device that connects to the telecommunications network. "Inside-premises cabling" is the wiring within a building.',
    inputType: 'radio',
    options: [
      { value: 'yes', label: 'Yes — I supply, install, or maintain customer equipment or cabling' },
      { value: 'no', label: 'No — I do not deal in customer equipment or cabling' },
    ],
    answerToBusinessTypes: {
      'yes': ['equipment-supplier'],
      'no': [],
    },
  },
  {
    id: 'q3_submarine',
    stepIndex: 2,
    text: 'Do you own, operate, or plan to install submarine cable systems landing in Australia?',
    helpText:
      'Submarine cables are undersea cables that carry international telecommunications traffic. Landing points are subject to ACMA Protected Zone restrictions.',
    inputType: 'radio',
    options: [
      { value: 'yes', label: 'Yes — I own, operate, or am planning to install a submarine cable system' },
      { value: 'no', label: 'No — I do not operate submarine cables' },
    ],
    answerToBusinessTypes: {
      'yes': ['carrier'],
      'no': [],
    },
  },

  // Step 4 — Data & Privacy
  {
    id: 'q4_metadata',
    stepIndex: 3,
    text: 'Does your business generate or hold telecommunications metadata as part of your operations?',
    helpText:
      'Telecommunications metadata includes: subscriber information, source and destination of communications, date/time/duration of calls or sessions, type of communication, location data, and equipment identifiers. If you provide any voice or internet service, you almost certainly generate metadata.',
    inputType: 'radio',
    options: [
      { value: 'yes', label: 'Yes — my service generates or processes telecommunications metadata' },
      { value: 'no', label: 'No — I do not generate or process telecommunications metadata' },
      { value: 'unsure', label: 'Unsure — I\'m not certain what data my systems generate' },
    ],
    answerToBusinessTypes: {
      'yes': ['carrier', 'carriage-service-provider', 'isp'],
      'no': [],
      'unsure': ['carrier', 'carriage-service-provider'],
    },
  },
  {
    id: 'q4_marketing_messages',
    stepIndex: 3,
    text: 'Does your business send commercial emails or commercial SMS messages to customers?',
    helpText:
      'A "commercial electronic message" is one that offers, advertises, or promotes goods or services. This includes promotional emails, marketing SMS messages, and transactional messages with a promotional component.',
    inputType: 'radio',
    options: [
      { value: 'yes', label: 'Yes — I send commercial emails, SMS, or other electronic messages for marketing purposes' },
      { value: 'no', label: 'No — I only send transactional or service messages with no commercial content' },
    ],
    answerToBusinessTypes: {
      'yes': [],
      'no': [],
    },
  },
  {
    id: 'q4_telemarketing',
    stepIndex: 3,
    text: 'Does your business conduct outbound telemarketing — calling customers or prospective customers to promote your services?',
    helpText:
      'Telemarketing includes automated calling (robocalls) and calls made by agents to offer, promote, or sell products or services.',
    inputType: 'radio',
    options: [
      { value: 'yes', label: 'Yes — I conduct outbound telemarketing calls' },
      { value: 'no', label: 'No — I do not make unsolicited outbound calls for commercial purposes' },
    ],
    answerToBusinessTypes: {
      'yes': [],
      'no': [],
    },
  },

  // Step 5 — Security & Law Enforcement
  {
    id: 'q5_tan_tcn',
    stepIndex: 4,
    text: 'Has your business received, or do you expect to receive, a Technical Assistance Notice (TAN) or Technical Capability Notice (TCN) under the TOLA Act?',
    helpText:
      'TANs and TCNs are instruments issued to telecommunications providers requiring them to assist law enforcement and national security agencies. Larger networks and providers in certain sectors are more likely to receive these instruments.',
    inputType: 'radio',
    options: [
      { value: 'yes', label: 'Yes — I have received or anticipate receiving a TAN or TCN' },
      { value: 'no', label: 'No — I have not received any such notices' },
      { value: 'unsure', label: 'Unsure — I\'m not familiar with these instruments' },
    ],
    answerToBusinessTypes: {
      'yes': ['carrier', 'carriage-service-provider'],
      'no': [],
      'unsure': [],
    },
  },
  {
    id: 'q5_interception',
    stepIndex: 4,
    text: 'Do you have existing obligations to assist agencies with lawful interception of communications?',
    helpText:
      'Lawful interception obligations typically apply to carriers and large CSPs under the TIA Act. If you have previously been subject to interception warrants or agency requests, you have such obligations.',
    inputType: 'radio',
    options: [
      { value: 'yes', label: 'Yes — I have existing lawful interception obligations' },
      { value: 'no', label: 'No — I do not have lawful interception obligations' },
      { value: 'unsure', label: 'Unsure — I\'m not certain of my interception obligations' },
    ],
    answerToBusinessTypes: {
      'yes': ['carrier', 'carriage-service-provider'],
      'no': [],
      'unsure': [],
    },
  },
  {
    id: 'q5_revenue',
    stepIndex: 4,
    text: 'What is your business\'s approximate annual revenue from telecommunications services in Australia?',
    helpText:
      'Revenue thresholds affect certain obligations, including Statutory Line of Business Obligations (SLSOs) for carriers and data retention cost recovery entitlements.',
    inputType: 'radio',
    options: [
      { value: 'small', label: 'Under $10 million per year' },
      { value: 'medium', label: '$10 million – $100 million per year' },
      { value: 'large', label: 'Over $100 million per year' },
    ],
    answerToBusinessTypes: {
      'small': [],
      'medium': [],
      'large': ['carrier'],
    },
  },
];
