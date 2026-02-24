import type { ComplianceSection } from '@/types/compliance';

export const COMPLIANCE_SECTIONS: ComplianceSection[] = [
  {
    slug: 'regulatory-framework',
    title: 'Regulatory Framework',
    shortTitle: 'Regulatory Framework',
    category: 'Regulatory',
    summary:
      'Understand the statutory objectives of the Telecommunications Act 1997 and the distinct roles of ACMA and the ACCC in regulating Australia\'s telecommunications sector.',
    applicableTo: [
      'carrier',
      'carriage-service-provider',
      'content-service-provider',
      'voip-provider',
      'equipment-supplier',
      'reseller',
      'isp',
      'mvno',
    ],
    lastUpdated: '2026-02-01',
    keyActs: [
      'Telecommunications Act 1997',
      'Australian Communications and Media Authority Act 2005',
      'Competition and Consumer Act 2010',
    ],
    subsections: [
      {
        heading: 'Objectives of the Telecommunications Act 1997',
        body: 'The Telecommunications Act 1997 (Cth) sets out the regulatory framework for telecommunications in Australia. Section 3 of the Act specifies that its primary object is to provide a regulatory framework that promotes the long-term interests of end-users of carriage services or of services provided by means of carriage services. The Act operates alongside a set of related legislation including the Telecommunications (Consumer Protection and Service Standards) Act 1999 (TCPSS Act) and the Telecommunications (Interception and Access) Act 1979 (TIA Act).',
        checklist: [
          'Ensure all business operations are aligned with the Act\'s objective of promoting the long-term interests of end-users.',
          'Understand the distinction between "carriage services" (the conveyance of signals) and "content services" (the provision of material over carriage services).',
          'Stay current with amendments — the Act has been significantly amended since 1997, most recently by the Telecommunications Legislation Amendment (Enhancing Consumer Safeguards) Act 2024.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications Act 1997',
            section: 's 3',
            description: 'Primary object of the Act — promoting the long-term interests of end-users.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A05145',
          },
        ],
      },
      {
        heading: 'Australian Communications and Media Authority (ACMA)',
        body: 'The ACMA is established under the Australian Communications and Media Authority Act 2005 (Cth). It is the primary regulator for telecommunications in Australia, responsible for monitoring and enforcing compliance with the Telecommunications Act 1997, issuing carrier licences, registering industry codes, setting technical standards, managing the radiofrequency spectrum, and administering the Do Not Call Register and Spam Act 2003. The ACMA has broad powers to conduct investigations, issue formal warnings, give remedial directions, accept enforceable undertakings, and apply to the Federal Court for injunctions or civil penalties.',
        checklist: [
          'Maintain familiarity with ACMA\'s current regulatory priorities — published in its annual Statement of Expectations.',
          'Register with ACMA\'s industry notification system to receive compliance alerts.',
          'Respond promptly to any ACMA information-gathering notices — failure to comply with a notice under s 521 of the Act is an offence.',
        ],
        citations: [
          {
            actShortName: 'Australian Communications and Media Authority Act 2005',
            section: 's 7',
            description: 'Establishment and functions of the ACMA.',
            legislationUrl: 'https://www.legislation.gov.au/C2005A00214',
          },
          {
            actShortName: 'Telecommunications Act 1997',
            section: 'ss 505–530',
            description: 'ACMA\'s compliance and enforcement powers including information-gathering.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A05145',
          },
        ],
      },
      {
        heading: 'Australian Competition and Consumer Commission (ACCC)',
        body: 'The ACCC plays a distinct but complementary role in telecommunications regulation. Under Part XIB of the Competition and Consumer Act 2010 (Cth), the ACCC has powers to address anti-competitive conduct in telecommunications markets. Under Part XIC, the ACCC administers the statutory access regime, which requires certain declared services (such as the NBN co-investment product) to be made available to competing service providers on non-discriminatory terms. The ACCC also enforces the Australian Consumer Law in relation to telecommunications consumer protection matters.',
        checklist: [
          'Carriers and carriage service providers must comply with ACCC access determinations for declared services.',
          'Do not engage in anti-competitive conduct — the ACCC can issue competition notices and seek substantial civil penalties.',
          'Wholesale providers must ensure access terms comply with standard access obligations under Part XIC of the Competition and Consumer Act 2010.',
        ],
        citations: [
          {
            actShortName: 'Competition and Consumer Act 2010',
            section: 'Part XIB',
            description: 'ACCC\'s specific powers to address anti-competitive conduct in telecommunications.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A00220',
          },
          {
            actShortName: 'Competition and Consumer Act 2010',
            section: 'Part XIC',
            description: 'Telecommunications access regime — declared services and standard access obligations.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A00220',
          },
        ],
      },
    ],
  },

  {
    slug: 'carrier-licensing',
    title: 'Carrier Licensing and Obligations',
    shortTitle: 'Carrier Licensing',
    category: 'Licensing',
    summary:
      'Owners of network infrastructure used to supply carriage services to the public must hold a carrier licence issued by ACMA under Part 3 of the Telecommunications Act 1997.',
    applicableTo: ['carrier'],
    lastUpdated: '2026-02-01',
    keyActs: [
      'Telecommunications Act 1997',
      'Telecommunications (Carrier Licence Charges) Act 1997',
    ],
    subsections: [
      {
        heading: 'Who Must Hold a Carrier Licence',
        body: 'Under Part 3, Division 2 of the Telecommunications Act 1997, a person who owns a "network unit" that is used to supply a carriage service to the public must hold a carrier licence. A "network unit" is defined in Schedule 1 of the Act as particular kinds of lines, equipment, facilities, or combinations thereof used to supply carriage services. The most common examples are: a line that connects two or more distinct places in Australia; a facility used in connection with a line; and a radiocommunications transmitter used to supply carriage services (e.g., a base station).\n\nIf you own network infrastructure that carries signals for others — whether fixed-line, mobile, or fixed wireless — you almost certainly need a carrier licence. Operating without one is a serious offence under s 47 of the Act.',
        checklist: [
          'Determine whether any infrastructure you own or lease constitutes a "network unit" as defined in Schedule 1 of the Act.',
          'Do not operate a network unit to supply carriage services without a valid carrier licence.',
          'Note: being a carriage service provider (CSP) does not require a carrier licence unless you also own the underlying network unit.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications Act 1997',
            section: 'ss 42–56',
            description: 'Carrier licence requirements, obligations, and prohibitions.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A05145',
          },
          {
            actShortName: 'Telecommunications Act 1997',
            section: 'Schedule 1',
            description: 'Definition of "network unit" for carrier licensing purposes.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A05145',
          },
          {
            actShortName: 'Telecommunications Act 1997',
            section: 's 47',
            description: 'Offence of operating a network unit without a carrier licence.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A05145',
          },
        ],
      },
      {
        heading: 'Applying for a Carrier Licence',
        body: 'A carrier licence is applied for through ACMA. The application process is governed by s 56 of the Telecommunications Act 1997. An applicant must provide a written application to ACMA that includes: the applicant\'s full name and contact details; a description of the network units to be operated; confirmation the applicant is a constitutional corporation or a partnership; and payment of the prescribed application fee.\n\nACMA must grant the licence if the applicant meets the eligibility requirements — the process is not discretionary, but ACMA can impose additional licence conditions. The annual carrier licence charge is levied under the Telecommunications (Carrier Licence Charges) Act 1997. There is a base charge component (currently $10,000 per year) plus an additional charge based on a carrier\'s eligible revenue.',
        checklist: [
          'Confirm your entity is a constitutional corporation or partnership before applying — individuals cannot hold carrier licences.',
          'Lodge the application in writing with ACMA and include all required information under s 56.',
          'Pay the annual carrier licence charge by the due date each year — failure to pay is grounds for ACMA to suspend or cancel the licence.',
          'Budget for both the base charge ($10,000 p.a.) and the eligible revenue levy component.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications Act 1997',
            section: 's 56',
            description: 'Requirements for a carrier licence application.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A05145',
          },
          {
            actShortName: 'Telecommunications (Carrier Licence Charges) Act 1997',
            section: 'ss 3–10',
            description: 'Annual carrier licence charge — base and eligible revenue components.',
            legislationUrl: 'https://www.legislation.gov.au/C1997A00099',
          },
        ],
      },
      {
        heading: 'Standard Carrier Licence Conditions',
        body: 'All carrier licences are subject to the standard conditions set out in Schedule 1 to the Telecommunications Act 1997. These conditions require carriers to, among other things: not engage in conduct that prevents or hinders the supply of carriage services by other carriers or CSPs; provide access to supplementary facilities (e.g., ducts, conduits, towers); maintain records and supply information to ACMA; comply with emergency service obligations; and comply with any applicable industry codes and standards. ACMA may also impose additional conditions specific to an individual carrier\'s licence.',
        checklist: [
          'Review Schedule 1 conditions carefully — they apply automatically to all carrier licences.',
          'Ensure your company does not engage in any conduct that would prevent or hinder competitors\' supply of carriage services.',
          'Provide access to supplementary facilities as required (towers, ducts, conduits) on request from other carriers.',
          'Maintain the records ACMA requires and be prepared to submit them on request.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications Act 1997',
            section: 'Schedule 1',
            description: 'Standard carrier licence conditions applicable to all carriers.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A05145',
          },
        ],
      },
      {
        heading: 'Statutory Line of Business Obligations (SLSO)',
        body: 'Carriers with annual eligible revenue exceeding $25 million are subject to additional Statutory Line of Business Obligations (SLSOs). These are set out in Schedule 1 to the Act and include restrictions on carriers using their control of network infrastructure to cross-subsidise or advantage related content or retail service businesses in anti-competitive ways. The SLSOs are designed to prevent vertically integrated carriers from leveraging their bottleneck infrastructure to foreclose competition in downstream markets.',
        checklist: [
          'Determine whether your eligible revenue exceeds the $25M SLSO threshold.',
          'If subject to SLSOs, implement internal compliance procedures to prevent prohibited cross-subsidisation.',
          'Consult with the ACCC if uncertain whether a proposed commercial arrangement could breach SLSO requirements.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications Act 1997',
            section: 'Schedule 1, clauses 11–20',
            description: 'Statutory line of business obligations for large carriers.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A05145',
          },
        ],
      },
    ],
  },

  {
    slug: 'service-provider-rules',
    title: 'Service Provider Rules',
    shortTitle: 'Service Provider Rules',
    category: 'Licensing',
    summary:
      'Carriage service providers (CSPs), content service providers, and resellers must comply with ACMA\'s Service Provider Rules under Part 4 of the Telecommunications Act 1997.',
    applicableTo: [
      'carriage-service-provider',
      'content-service-provider',
      'voip-provider',
      'reseller',
      'isp',
      'mvno',
    ],
    lastUpdated: '2026-02-01',
    keyActs: ['Telecommunications Act 1997'],
    subsections: [
      {
        heading: 'Who is a Carriage Service Provider (CSP)?',
        body: 'A carriage service provider (CSP) is a person who supplies, or proposes to supply, a carriage service to the public using a carrier\'s network. Unlike carriers, CSPs do not need a licence — but they must comply with the Service Provider Rules set out in Part 4 of the Act and with any applicable registered industry codes. CSPs include internet service providers, mobile virtual network operators (MVNOs), VoIP providers, and any reseller of telecommunications services.\n\nContent service providers supply content (such as streaming video, websites, or apps) by means of a carriage service, but are not themselves providing the carriage service. Different rules apply to content service providers.',
        checklist: [
          'Determine whether your business is a CSP, a content service provider, or both — different obligations attach to each.',
          'CSPs do not require a carrier licence, but must still comply with Part 4 Service Provider Rules.',
          'Notify the Telecommunications Industry Ombudsman (TIO) of your business — all CSPs must be members of the TIO scheme.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications Act 1997',
            section: 'ss 87–99',
            description: 'Service provider rules — obligations of carriage service providers.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A05145',
          },
        ],
      },
      {
        heading: 'Nominated Carrier Declaration',
        body: 'Every CSP must have a "nominated carrier" — a carrier that has accepted responsibility for ensuring the CSP complies with the carrier-level obligations that apply to its supply of carriage services. This arrangement is documented in a nominated carrier declaration (NCD). Under s 22 of the Act, if a CSP does not have a nominated carrier, ACMA can determine one for it. The nominated carrier assumes significant compliance responsibility for the CSP\'s carriage service obligations, creating a commercial incentive for carriers to monitor and manage the compliance of CSPs that use their networks.',
        checklist: [
          'Ensure your business has a valid nominated carrier declaration with your network carrier.',
          'Review the NCD regularly to ensure it covers all carriage services your business supplies.',
          'Understand that your nominated carrier shares compliance responsibility — maintain open communication about regulatory changes.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications Act 1997',
            section: 'ss 20–24',
            description: 'Nominated carrier declarations — requirements and effect.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A05145',
          },
        ],
      },
      {
        heading: 'VoIP Provider Obligations',
        body: 'Providers of voice-over-internet-protocol (VoIP) services that allow users to make or receive voice calls — including calls to the public switched telephone network — are carriage service providers and must comply with the Service Provider Rules. Additionally, ACMA has issued the Telecommunications (Emergency Call Service) Determination 2019, which imposes specific obligations on VoIP CSPs regarding the provision of emergency call access (000), including the requirement to pass calling line identification (CLI/A-number) and, where technically feasible, location information to the emergency call service operator.',
        checklist: [
          'Ensure your VoIP service supports access to 000, 112, and 106 emergency numbers.',
          'Pass calling line identification (CLI) to the emergency call service operator for all 000 calls.',
          'Provide location information to the emergency call service where your service has access to it.',
          'Inform customers clearly about any limitations of your VoIP service for emergency calls.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications (Emergency Call Service) Determination 2019',
            section: 'ss 6–12',
            description: 'Emergency call obligations for VoIP and internet-based voice service providers.',
            legislationUrl: 'https://www.legislation.gov.au/F2019L01220',
          },
        ],
      },
      {
        heading: 'Telecommunications Industry Ombudsman (TIO)',
        body: 'All carriage service providers that supply carriage services or carriage service content to residential or small business customers must be members of the Telecommunications Industry Ombudsman (TIO) scheme. The TIO handles complaints about telecommunications providers, including billing disputes, service faults, and contract issues. Membership in the TIO scheme is mandatory under the Telecommunications (Consumer Protection and Service Standards) Act 1999 and the TIO Constitution. Providers must not prevent customers from lodging complaints with the TIO, and must cooperate with TIO investigations.',
        checklist: [
          'Register your business with the Telecommunications Industry Ombudsman (TIO) if you supply carriage services to consumers or small businesses.',
          'Maintain an effective internal complaint-handling process — the TIO requires providers to attempt internal resolution first.',
          'Cooperate fully with any TIO investigation and implement TIO decisions within required timeframes.',
          'Do not impose fees or conditions that discourage customers from complaining to the TIO.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications (Consumer Protection and Service Standards) Act 1999',
            section: 'Part 6',
            description: 'Telecommunications Industry Ombudsman scheme — membership obligations.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A00098',
          },
        ],
      },
    ],
  },

  {
    slug: 'industry-codes',
    title: 'Industry Codes and Standards',
    shortTitle: 'Industry Codes',
    category: 'Regulatory',
    summary:
      'ACMA registers industry codes developed by industry bodies under Part 6 of the Act. Registered codes are enforceable — ACMA can issue a Direction to comply if a provider breaches a registered code.',
    applicableTo: [
      'carrier',
      'carriage-service-provider',
      'voip-provider',
      'reseller',
      'isp',
      'mvno',
    ],
    lastUpdated: '2026-02-01',
    keyActs: ['Telecommunications Act 1997'],
    subsections: [
      {
        heading: 'Development and Registration of Industry Codes',
        body: 'Part 6, Division 2 of the Telecommunications Act 1997 provides the framework for developing and registering industry codes. Industry codes are developed by "industry bodies or associations" representing carriers and CSPs. Once developed, the body can apply to ACMA to register the code under s 117 of the Act. ACMA must register a code if satisfied that it was developed following a genuine industry consultation process, deals with one or more matters relating to the telecommunications industry, and provides adequate community safeguards.\n\nA key registered code that applies to most telecommunications providers is the Telecommunications Consumer Protections (TCP) Code (C628:2019), which sets out obligations for providers regarding advertising, contracts, billing, financial hardship, and complaint handling.',
        checklist: [
          'Identify all registered industry codes that apply to your business — a list is maintained on the ACMA website.',
          'Obtain and implement the TCP Code (C628:2019) if you supply services to residential or small business customers.',
          'Monitor the ACMA website for new code registrations or updates that may affect your operations.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications Act 1997',
            section: 'ss 109–130',
            description: 'Industry codes — development, registration, and compliance framework.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A05145',
          },
          {
            actShortName: 'Telecommunications Act 1997',
            section: 's 117',
            description: 'ACMA registration of industry codes.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A05145',
          },
        ],
      },
      {
        heading: 'Compliance with Registered Codes and ACMA Directions',
        body: 'Compliance with a registered industry code is voluntary in the first instance — the code operates as an industry standard for best practice. However, if ACMA believes a carrier or CSP has contravened a registered code, it may issue a Direction to Comply under s 125 of the Act. Failure to comply with an ACMA Direction to Comply is a serious contravention that can result in significant civil penalties (currently up to $10 million per contravention for corporations). ACMA can also take action against a carrier by recommending that the Minister suspend or cancel its licence.',
        checklist: [
          'Treat registered industry codes as minimum standards, not aspirational targets.',
          'Respond promptly and constructively to any ACMA inquiry about potential code non-compliance.',
          'If you receive an ACMA Direction to Comply under s 125, comply immediately and seek legal advice.',
          'Implement internal compliance monitoring for all obligations in registered codes that apply to your business.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications Act 1997',
            section: 's 125',
            description: 'ACMA Direction to Comply with a registered industry code.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A05145',
          },
        ],
      },
      {
        heading: 'Industry Standards',
        body: 'Where industry codes are insufficient or where an industry body fails to develop an adequate code within a specified time, ACMA may itself develop and register an industry standard under Part 6, Division 3 of the Act. Industry standards are mandatory — they do not require ACMA to issue a Direction before enforcement can occur. Non-compliance with an industry standard is itself a contravention of the Act carrying civil penalties. The most significant industry standards currently in force include the Integrated Public Number Database (IPND) standard and the Emergency Call Service standard.',
        checklist: [
          'Distinguish between industry codes (enforceable via Direction) and industry standards (directly enforceable).',
          'Identify all industry standards issued by ACMA that apply to your class of provider.',
          'Non-compliance with an industry standard can result in civil penalties without any prior warning or Direction.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications Act 1997',
            section: 'ss 131–134',
            description: 'Industry standards — ACMA power to determine and mandatory compliance.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A05145',
          },
        ],
      },
    ],
  },

  {
    slug: 'protection-of-communications',
    title: 'Protection of Communications',
    shortTitle: 'Communications Privacy',
    category: 'Privacy',
    summary:
      'Part 13 of the Telecommunications Act 1997 imposes strict obligations on carriers and CSPs to protect the confidentiality of communications and prohibits unauthorised disclosure of information.',
    applicableTo: [
      'carrier',
      'carriage-service-provider',
      'content-service-provider',
      'voip-provider',
      'reseller',
      'isp',
      'mvno',
    ],
    lastUpdated: '2026-02-01',
    keyActs: [
      'Telecommunications Act 1997',
      'Telecommunications (Interception and Access) Act 1979',
    ],
    subsections: [
      {
        heading: 'Prohibition on Disclosure of Communications Information',
        body: 'Part 13, Division 2 of the Telecommunications Act 1997 (ss 276–308) contains a detailed regime protecting "communications information" held by carriers and CSPs. Section 276 creates a general prohibition on telecommunications providers (and their employees and contractors) using or disclosing information that comes to their knowledge through the supply of carriage services.\n\n"Communications information" includes the contents or substance of a communication, and telecommunications data (such as metadata about who communicated with whom, when, and for how long). The prohibition is very broad and applies to all current and former employees, contractors, and agents.',
        checklist: [
          'Train all staff and contractors on the Part 13 prohibition against unauthorised disclosure of communications information.',
          'Implement strict data governance controls to limit access to communications information to staff with a genuine operational need.',
          'Never disclose the contents or metadata of customer communications to third parties without legal authority.',
          'Review employment contracts and supplier agreements to include confidentiality obligations consistent with Part 13.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications Act 1997',
            section: 'ss 276–310',
            description: 'Part 13 — Protection of communications. General prohibition on disclosure.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A05145',
          },
          {
            actShortName: 'Telecommunications Act 1997',
            section: 's 276',
            description: 'Core prohibition on use or disclosure of information obtained through supply of carriage services.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A05145',
          },
        ],
      },
      {
        heading: 'Permitted Disclosures',
        body: 'Section 280 of the Act creates a list of circumstances in which disclosure is authorised. Permitted disclosures include: disclosure to ACMA for regulatory purposes; disclosure required by or under a law of the Commonwealth or a State or Territory; disclosure for the purpose of legal proceedings; disclosure to an emergency service or to a police officer for an investigation into a serious offence; and disclosure where the customer has given explicit consent. This list is exhaustive — any disclosure not falling within an authorised category is prohibited.\n\nImportantly, disclosure to law enforcement agencies for access to metadata requires compliance with the Telecommunications (Interception and Access) Act 1979 (TIA Act), particularly the authorisation and warrant regime in Parts 3 and 4-1 of that Act.',
        checklist: [
          'Establish a legal gateway review process for all requests to disclose communications information to third parties.',
          'Only disclose information to law enforcement under a valid TIA Act authorisation, warrant, or other applicable legal authority.',
          'Obtain explicit, informed customer consent before disclosing their communications information for any commercial purpose.',
          'Maintain a register of all disclosures made under the permitted categories.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications Act 1997',
            section: 's 280',
            description: 'Authorised disclosures — exhaustive list of permitted exceptions to the general prohibition.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A05145',
          },
          {
            actShortName: 'Telecommunications (Interception and Access) Act 1979',
            section: 'Parts 3–4-1',
            description: 'Lawful interception and access to stored communications by law enforcement.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A03822',
          },
        ],
      },
    ],
  },

  {
    slug: 'emergency-services',
    title: 'Emergency Services',
    shortTitle: 'Emergency Services',
    category: 'Technical',
    summary:
      'Carriers and CSPs must ensure that customers can access emergency call services (000, 106, 112) at all times, including specific obligations for VoIP providers regarding location data and CLI.',
    applicableTo: ['carrier', 'carriage-service-provider', 'voip-provider', 'mvno', 'isp'],
    lastUpdated: '2026-02-01',
    keyActs: [
      'Telecommunications Act 1997',
      'Telecommunications (Emergency Call Service) Determination 2019',
    ],
    subsections: [
      {
        heading: 'Obligation to Provide Emergency Call Access',
        body: 'Section 147 of the Telecommunications Act 1997 requires carriers and CSPs to allow their customers to access the emergency call service free of charge. This obligation applies to suppliers of standard telephone services and extends to VoIP and internet-based voice services as clarified by ACMA\'s Emergency Call Service Determination.\n\nAustralia has three emergency numbers: 000 (primary), 112 (from mobile phones, routed to 000), and 106 (text-based emergency service for hearing-impaired people using a teletypewriter, TTY/TDD device). Providers must ensure access to all three where technically applicable to their service type.',
        checklist: [
          'Confirm your service supports free, unrestricted access to 000, 112, and 106.',
          'Ensure 000 calls are not routed through services that may introduce latency, quality degradation, or blocking.',
          'For mobile services, ensure 112 calls are routed correctly even without a SIM or when the network is congested.',
          'For TTY/TTD services, test access to 106 periodically.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications Act 1997',
            section: 's 147',
            description: 'Obligation to allow access to emergency call services.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A05145',
          },
        ],
      },
      {
        heading: 'VoIP and Location Data Obligations',
        body: 'The Telecommunications (Emergency Call Service) Determination 2019 (Cth) imposes specific obligations on VoIP carriage service providers. When a customer calls 000 via a VoIP service, the provider must transmit the caller\'s calling line identification (CLI — the A-number) to the emergency call service operator (currently Telstra). Where the VoIP service has access to the customer\'s address or location information (such as a registered address in a customer database), the provider must also transmit that location information to assist emergency services in locating the caller.\n\nFor nomadic VoIP services (where the customer can use the service from any location), providers must take reasonable steps to obtain an updated location from the customer and transmit it with each 000 call.',
        checklist: [
          'Implement CLI pass-through for all 000 calls made via your VoIP platform.',
          'Build or integrate a location-passing mechanism that transmits the customer\'s registered address with each 000 call.',
          'For nomadic VoIP services, present customers with a location update prompt at each login or on a regular basis.',
          'Prominently inform VoIP customers of any limitations on 000 service access (e.g., service-outage scenarios where 000 may be unavailable) in the Critical Information Summary.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications (Emergency Call Service) Determination 2019',
            section: 'ss 6–14',
            description: 'CLI and location obligations for VoIP carriage service providers for 000 calls.',
            legislationUrl: 'https://www.legislation.gov.au/F2019L01220',
          },
        ],
      },
    ],
  },

  {
    slug: 'monitoring-reporting',
    title: 'Monitoring and Reporting',
    shortTitle: 'Monitoring & Reporting',
    category: 'Regulatory',
    summary:
      'ACMA has broad monitoring and enforcement powers under Part 26 of the Act. Carriers must submit annual compliance reports under Schedule 1. The ACCC monitors wholesale market and NBN performance.',
    applicableTo: [
      'carrier',
      'carriage-service-provider',
      'voip-provider',
      'reseller',
      'isp',
      'mvno',
    ],
    lastUpdated: '2026-02-01',
    keyActs: ['Telecommunications Act 1997', 'Competition and Consumer Act 2010'],
    subsections: [
      {
        heading: 'ACMA Monitoring Powers',
        body: 'Part 26 of the Telecommunications Act 1997 grants ACMA wide-ranging compliance monitoring and investigation powers. ACMA inspectors may enter and inspect premises, examine documents, take copies, and require persons to answer questions. ACMA can issue formal information-gathering notices under s 521 requiring carriers and CSPs to produce information or documents relevant to a compliance investigation. Failure to comply with an information-gathering notice, or providing false or misleading information, is a criminal offence.',
        checklist: [
          'Maintain complete and accurate records of all compliance-relevant activities.',
          'Respond promptly and fully to any ACMA information-gathering notice — the deadline in the notice is legally binding.',
          'Do not destroy or conceal documents after receiving (or anticipating) an ACMA notice — this may constitute obstruction.',
          'Seek legal advice if you receive a notice under s 521 before responding.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications Act 1997',
            section: 'ss 510–530 (Part 26)',
            description: 'ACMA compliance and monitoring powers — inspections, information-gathering, enforcement.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A05145',
          },
          {
            actShortName: 'Telecommunications Act 1997',
            section: 's 521',
            description: 'ACMA information-gathering notices — power to require documents and answers.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A05145',
          },
        ],
      },
      {
        heading: 'Annual Compliance Reporting by Carriers',
        body: 'Under Schedule 1 to the Telecommunications Act 1997, all carriers are required to give ACMA an annual compliance report within three months of the end of each financial year. The compliance report must cover the carrier\'s compliance with: the standard carrier licence conditions in Schedule 1; any additional licence conditions imposed by ACMA; applicable registered industry codes and standards; and other provisions of the Act specified by ACMA.\n\nACMA uses these annual compliance reports to identify systemic non-compliance and target its enforcement resources. Carriers should treat the compliance report as a genuine governance document, not a tick-box exercise.',
        checklist: [
          'Diarise the annual compliance report due date (three months after financial year end).',
          'Establish an internal process for gathering compliance evidence throughout the year to support the annual report.',
          'Have a senior officer (e.g., General Counsel or Compliance Manager) sign off on the annual compliance report.',
          'Retain copies of all annual compliance reports for at least seven years.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications Act 1997',
            section: 'Schedule 1, clause 8',
            description: 'Annual compliance report obligation for carriers.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A05145',
          },
        ],
      },
      {
        heading: 'ACCC Record Keeping Rules and Performance Monitoring',
        body: 'The ACCC publishes Record Keeping Rules (RKRs) under Part XIC of the Competition and Consumer Act 2010 that require certain telecommunications providers to maintain and provide data about their networks, services, and pricing. The ACCC uses this data to publish its annual Telecommunications Market Report and to inform access pricing determinations.\n\nSeparately, under NBN-related regulatory arrangements, retail service providers on the NBN must comply with ACCC reporting requirements regarding connection and fault repair timeframes.',
        checklist: [
          'Identify whether any ACCC Record Keeping Rules apply to your business.',
          'Comply with all record-keeping and reporting obligations under applicable RKRs.',
          'Providers using the NBN must maintain and report data on service connection and fault repair performance.',
        ],
        citations: [
          {
            actShortName: 'Competition and Consumer Act 2010',
            section: 'Part XIC, s 151BU',
            description: 'ACCC Record Keeping Rules for telecommunications providers.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A00220',
          },
        ],
      },
    ],
  },

  {
    slug: 'technical-regulation',
    title: 'Technical Regulation',
    shortTitle: 'Technical Regulation',
    category: 'Technical',
    summary:
      'Customer equipment and cabling must meet ACMA technical standards. The Numbering Plan governs telephone number allocation. Cabling installers must be registered cabling providers.',
    applicableTo: ['carrier', 'carriage-service-provider', 'equipment-supplier', 'isp'],
    lastUpdated: '2026-02-01',
    keyActs: [
      'Telecommunications Act 1997',
      'Telecommunications (Customer Equipment and Customer Cabling) Act 2000',
    ],
    subsections: [
      {
        heading: 'Customer Equipment Standards',
        body: 'The Telecommunications (Customer Equipment and Customer Cabling) Act 2000 (Cth) ("CECA") governs the supply and connection of customer equipment (e.g., modems, routers, handsets, IP phones, alarm systems) to the telecommunications network. Under the CECA, customer equipment must comply with applicable ACMA technical standards and must be labelled with the Regulatory Compliance Mark (RCM, formerly A-tick) before it can be supplied in Australia.\n\nACMA develops technical standards for customer equipment under its powers in the Telecommunications Act 1997. Suppliers of non-compliant equipment face civil penalties and ACMA may seize and retain non-compliant equipment.',
        checklist: [
          'Confirm that any customer equipment you supply bears the Regulatory Compliance Mark (RCM) as required.',
          'Verify that the equipment complies with all applicable ACMA technical standards before importing or supplying.',
          'Maintain records of the compliance testing or conformity assessments for all RCM-marked equipment you supply.',
          'Do not connect non-compliant equipment to carrier networks — this can cause interference and attract liability.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications (Customer Equipment and Customer Cabling) Act 2000',
            section: 'ss 11–25',
            description: 'Requirements for labelling and supply of customer equipment.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A00821',
          },
        ],
      },
      {
        heading: 'Cabling Provider Rules',
        body: 'The ACMA Cabling Provider Rules (made under the CECA) regulate who can install or alter customer cabling — the wiring inside premises that connects customer equipment to the network boundary. Only registered cabling providers may install or alter customer cabling in commercial premises, multi-dwelling units, or any premises where cabling connects to a public telecommunications network. Individuals who install cabling must hold a cabling registration issued by a state or territory registrar (typically through a state licensing body for electricians or low-voltage contractors).',
        checklist: [
          'Do not allow unregistered persons to install or alter customer cabling inside customer premises.',
          'If you engage cabling contractors, verify their cabling provider registration before allowing them to commence work.',
          'Maintain records of which registered cabling providers performed work on your customers\' premises.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications (Customer Equipment and Customer Cabling) Act 2000',
            section: 'ss 30–48',
            description: 'Cabling provider registration requirements and rules.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A00821',
          },
        ],
      },
      {
        heading: 'Telecommunications Numbering Plan',
        body: 'The allocation and use of telephone numbers in Australia is governed by the Telecommunications Numbering Plan 2015 (as amended). The plan is made by ACMA under s 455 of the Telecommunications Act 1997 and specifies how different number ranges are allocated (e.g., 02, 03, 04, 1300, 1800 ranges). Carriers and CSPs that wish to use numbers must obtain allocations from ACMA. Numbers are not owned — they are allocated on a use-it-or-lose-it basis and must be returned to ACMA if no longer needed.\n\nNumber portability — the ability for customers to keep their number when switching providers — is also regulated. Carriers and CSPs must support the porting of numbers under the ACMA\'s Number Portability requirements and the relevant registered industry code.',
        checklist: [
          'Apply to ACMA for number allocations as required — do not use numbers without an allocation.',
          'Return unused number allocations to ACMA promptly — ACMA can reclaim numbers that are not in active use.',
          'Implement and support local number portability (LNP) and mobile number portability (MNP) as required.',
          'Comply with the ACMA Number Portability regime — do not delay or obstruct customer porting requests.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications Act 1997',
            section: 's 455',
            description: 'ACMA power to make the Telecommunications Numbering Plan.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A05145',
          },
          {
            actShortName: 'Telecommunications Numbering Plan 2015',
            section: 'Parts 1–9',
            description: 'Australian telephone number allocation and usage rules.',
            legislationUrl: 'https://www.legislation.gov.au/F2015L01394',
          },
        ],
      },
    ],
  },

  {
    slug: 'international-aspects',
    title: 'International Aspects',
    shortTitle: 'International',
    category: 'International',
    summary:
      'Carriers and CSPs with international operations must comply with Australia\'s international treaty obligations, ITU regulations, and the Minister\'s Rules of Conduct for international services.',
    applicableTo: ['carrier', 'carriage-service-provider', 'voip-provider'],
    lastUpdated: '2026-02-01',
    keyActs: [
      'Telecommunications Act 1997',
      'Telecommunications (International Conventions) Act 1997',
    ],
    subsections: [
      {
        heading: 'Minister\'s Rules of Conduct',
        body: 'Section 10 of the Telecommunications Act 1997 gives the Minister for Communications the power to make Rules of Conduct that apply to carriers and CSPs in relation to international telecommunications services. These Rules of Conduct give effect to Australia\'s obligations under international instruments, including the International Telecommunication Regulations (ITRs) adopted at the World Conference on International Telecommunications (WCIT). Rules of Conduct are legislative instruments and are binding on all carriers and CSPs to whom they apply.',
        checklist: [
          'Identify whether any current Minister\'s Rules of Conduct apply to your international services.',
          'Monitor the Federal Register of Legislation for new or updated Rules of Conduct.',
          'Ensure your international routing, accounting, and settlement arrangements comply with applicable Rules of Conduct.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications Act 1997',
            section: 's 10',
            description: 'Ministerial power to make Rules of Conduct for international telecommunications.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A05145',
          },
        ],
      },
      {
        heading: 'ITU Obligations and Radiofrequency Spectrum',
        body: 'Australia is a member of the International Telecommunication Union (ITU) and is bound by the Radio Regulations and ITRs adopted at ITU World Radiocommunication Conferences and WCITs. ACMA manages Australia\'s ITU treaty obligations domestically, including administering the Australian frequency coordination process for satellite and cross-border spectrum use.\n\nCarriers operating cross-border or satellite telecommunications services must coordinate their frequency use with ACMA in accordance with the Radiocommunications Act 1992 to ensure compliance with ITU coordination requirements.',
        checklist: [
          'Carriers operating satellite services or cross-border microwave links must file ITU coordination requests through ACMA.',
          'Do not operate in frequency bands allocated to Australia under the ITU Radio Regulations without appropriate ACMA licences.',
          'Be aware that changes to ITU Radio Regulations at World Radiocommunication Conferences can require updates to ACMA frequency licences.',
        ],
        citations: [
          {
            actShortName: 'Radiocommunications Act 1992',
            section: 'ss 27–36',
            description: 'Australian radiofrequency spectrum licensing and ITU coordination.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A04447',
          },
        ],
      },
      {
        heading: 'International Roaming',
        body: 'Australian mobile network operators (MNOs) that provide international roaming services — allowing customers to use their mobile number overseas — are subject to ACMA and ACCC oversight regarding roaming pricing transparency. The TCP Code (C628:2019) requires providers to disclose international roaming charges clearly to customers, including charges per minute, per megabyte of data, and per SMS. Excessive and unexpected international roaming bills are a leading source of TIO complaints.',
        checklist: [
          'Disclose international roaming charges prominently in the Critical Information Summary and at the point of activation.',
          'Consider implementing roaming spend controls or alerts for customers to avoid bill shock.',
          'Where your roaming services depend on international interconnection agreements, ensure billing systems accurately reflect the charges in those agreements.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications Consumer Protections Code (C628:2019)',
            section: 'Clauses 4.3–4.5',
            description: 'TCP Code requirements for disclosure of international roaming charges.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A05145',
          },
        ],
      },
    ],
  },

  {
    slug: 'national-security',
    title: 'National Interest and Security Obligations',
    shortTitle: 'National Security',
    category: 'Security',
    summary:
      'Part 14 of the Act and the Security of Critical Infrastructure Act 2018 impose obligations on carriers to protect their networks and assist national security agencies. Ownership changes must be notified to ACMA.',
    applicableTo: ['carrier', 'carriage-service-provider', 'isp'],
    lastUpdated: '2026-02-01',
    keyActs: [
      'Telecommunications Act 1997',
      'Security of Critical Infrastructure Act 2018',
      'Telecommunications and Other Legislation Amendment (Assistance and Access) Act 2018',
    ],
    subsections: [
      {
        heading: 'Network Protection Obligations under Part 14',
        body: 'Part 14, Division 3 of the Telecommunications Act 1997 imposes a general obligation on carriers and CSPs to protect their networks and facilities from interference and unauthorised access. Section 313(1) requires carriers and CSPs to do their best to prevent their networks being used to commit offences against Commonwealth, State, or Territory laws. This includes blocking malware, preventing misuse of telecommunications for criminal purposes, and cooperating with law enforcement in network security matters.',
        checklist: [
          'Implement technical measures to detect and block malware, spam, and other malicious use of your network.',
          'Establish a process for responding to law enforcement requests for network security cooperation under s 313.',
          'Do not knowingly allow your network to be used to facilitate crime — this could make you liable as an accessory.',
          'Notify ACMA promptly if you become aware of a major security incident affecting your network.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications Act 1997',
            section: 'ss 313–314G (Part 14)',
            description: 'National interest obligations — network protection and law enforcement assistance.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A05145',
          },
        ],
      },
      {
        heading: 'Security of Critical Infrastructure Act 2018',
        body: 'Carriers and CSPs providing critical telecommunications services are designated as "critical infrastructure assets" under the Security of Critical Infrastructure Act 2018 (SOCI Act). This designation imposes obligations including: registration with the Register of Critical Infrastructure Assets; reporting material cyber security incidents to the Australian Cyber Security Centre (ACSC) within 12 hours (for significant incidents) or 72 hours (for other incidents); developing and maintaining a Critical Infrastructure Risk Management Programme; and notifying the Department of Home Affairs of significant changes to ownership and control.\n\nThe SOCI Act was significantly expanded in 2022 to include new sectors and strengthen obligations.',
        checklist: [
          'Determine whether your telecommunications infrastructure is a "critical infrastructure asset" under the SOCI Act.',
          'Register with the Register of Critical Infrastructure Assets if required.',
          'Report significant cyber incidents to the ACSC within 12 hours (critical) or 72 hours (other) as applicable.',
          'Develop and maintain a Critical Infrastructure Risk Management Programme as required by the SOCI Act.',
          'Notify the Department of Home Affairs of any changes in ownership or control of critical infrastructure assets.',
        ],
        citations: [
          {
            actShortName: 'Security of Critical Infrastructure Act 2018',
            section: 'Parts 2A–2C',
            description: 'Critical infrastructure registration, incident reporting, and risk management programme obligations.',
            legislationUrl: 'https://www.legislation.gov.au/C2018A00029',
          },
        ],
      },
      {
        heading: 'Ownership and Control Notification',
        body: 'Part 14A of the Telecommunications Act 1997 requires carriers to notify ACMA of proposed changes to their ownership and control structure that could affect national security. ACMA and the Department of Home Affairs may assess whether the proposed change would create unacceptable national security risks. If ACMA or the Minister is satisfied that a change creates unacceptable risks, the Minister can give a written direction to the carrier requiring it to take or cease specified actions.',
        checklist: [
          'Before completing any transaction that would result in a change of ownership or control of a carrier, notify ACMA as required by Part 14A.',
          'Allow adequate time for ACMA and government review — do not assume approval will be automatic or rapid.',
          'Engage with ACMA early in any acquisition or divestiture process to identify potential national security concerns.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications Act 1997',
            section: 'Part 14A',
            description: 'Ownership and control of carriers — national security notification obligations.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A05145',
          },
        ],
      },
    ],
  },

  {
    slug: 'industry-assistance',
    title: 'Industry Assistance to Law Enforcement',
    shortTitle: 'Industry Assistance',
    category: 'Security',
    summary:
      'The TOLA Act 2018 requires telecommunications providers to assist law enforcement and intelligence agencies through Technical Assistance Requests, Technical Assistance Notices, and Technical Capability Notices.',
    applicableTo: ['carrier', 'carriage-service-provider', 'voip-provider', 'isp', 'mvno'],
    lastUpdated: '2026-02-01',
    keyActs: [
      'Telecommunications and Other Legislation Amendment (Assistance and Access) Act 2018',
      'Telecommunications Act 1997',
    ],
    subsections: [
      {
        heading: 'The Three TOLA Assistance Instruments',
        body: 'The Telecommunications and Other Legislation Amendment (Assistance and Access) Act 2018 (TOLA Act) introduced a three-tier framework requiring telecommunications providers to assist law enforcement and national intelligence agencies:\n\n1. Technical Assistance Requests (TARs) — voluntary requests from agencies for providers to assist with a specific matter. A provider may comply voluntarily without legal compulsion. No penalty for refusal, but providers are incentivised to cooperate.\n\n2. Technical Assistance Notices (TANs) — compulsory notices issued by the Australian Federal Police (AFP), ASIO, or other specified agencies requiring a provider to give "technical assistance" that the provider is already capable of providing.\n\n3. Technical Capability Notices (TCNs) — issued by the Attorney-General and require a provider to build new capabilities to assist agencies. TCNs are the most intrusive instrument and must satisfy a high threshold of necessity and proportionality.',
        checklist: [
          'Designate a senior officer as the point of contact for all law enforcement assistance requests.',
          'When you receive a TAR, assess whether compliance would require you to introduce systemic weaknesses — you are not required to do so.',
          'When you receive a TAN or TCN, seek immediate legal advice. You may challenge the notice on jurisdictional or proportionality grounds.',
          'Do not disclose the existence of a TAN or TCN to unauthorised persons — disclosure is prohibited and can result in criminal penalties.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications and Other Legislation Amendment (Assistance and Access) Act 2018',
            section: 'Schedule 1 (inserting Part 15 of the Telecommunications Act 1997)',
            description: 'Technical Assistance Requests, Technical Assistance Notices, and Technical Capability Notices.',
            legislationUrl: 'https://www.legislation.gov.au/C2018A00148',
          },
        ],
      },
      {
        heading: 'Prohibited Actions and Systemic Weaknesses',
        body: 'A fundamental protection in the TOLA framework is that no TAN or TCN may require a provider to implement a "systemic weakness" or "systemic vulnerability" in its systems. The Act defines a systemic weakness as one that would affect a whole class of technology rather than a targeted capability directed at a specific device or account. This means agencies cannot use TANs or TCNs to force providers to undermine end-to-end encryption across a platform — though targeted assistance on specific communications may be required.',
        checklist: [
          'Understand the "systemic weakness" prohibition — no notice can require you to undermine the security of your entire platform.',
          'If a TAR, TAN, or TCN appears to require a systemic weakness, raise this concern in writing with the issuing agency immediately.',
          'Engage the Australian Human Rights Commission or the Inspector-General of Intelligence and Security (IGIS) if you believe a notice is unlawful.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications Act 1997',
            section: 'ss 317ZH–317ZN (Part 15)',
            description: 'Prohibitions on requiring systemic weaknesses — key safeguards in the TOLA framework.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A05145',
          },
        ],
      },
      {
        heading: 'Oversight and Penalties',
        body: 'The TOLA framework is subject to oversight by the Independent National Security Legislation Monitor (INSLM), the Parliamentary Joint Committee on Intelligence and Security (PJCIS), the Inspector-General of Intelligence and Security (IGIS), and the Commonwealth Ombudsman. Civil penalties for non-compliance with a TAN or TCN are substantial — up to $10 million per contravention for a body corporate. Criminal penalties apply for disclosure of restricted information about notices.',
        checklist: [
          'Build awareness of the INSLM, PJCIS, and Ombudsman oversight roles — engage these bodies if you have concerns about the proportionality of a notice.',
          'Budget for the cost of compliance with TANs and TCNs — providers can negotiate cost recovery with the relevant agency.',
          'Penalties for non-compliance with TANs and TCNs are substantial. Seek legal advice before refusing or delaying compliance.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications Act 1997',
            section: 'ss 317ZF–317ZH (Part 15)',
            description: 'Civil penalties and criminal offences for non-compliance with TOLA assistance instruments.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A05145',
          },
        ],
      },
    ],
  },

  {
    slug: 'standard-licence-conditions',
    title: 'Standard Carrier Licence Conditions',
    shortTitle: 'Licence Conditions',
    category: 'Licensing',
    summary:
      'Schedule 1 to the Telecommunications Act 1997 sets out the standard conditions that apply to all carrier licences, including access obligations, non-discrimination requirements, and the Facilities Access Code.',
    applicableTo: ['carrier'],
    lastUpdated: '2026-02-01',
    keyActs: ['Telecommunications Act 1997'],
    subsections: [
      {
        heading: 'Access to Supplementary Facilities',
        body: 'Standard carrier licence condition 5 in Schedule 1 requires carriers to provide access to their "supplementary facilities" (physical infrastructure such as ducts, conduits, towers, and exchange space) to other carriers and CSPs on request. This is designed to promote infrastructure sharing and avoid the duplication of costly network assets. The ACMA Facilities Access Code provides detailed guidance on the process for requesting and providing access to supplementary facilities, including dispute resolution procedures if parties cannot agree on terms.',
        checklist: [
          'Maintain an up-to-date register of your supplementary facilities available for access.',
          'Respond to access requests from other carriers in accordance with the Facilities Access Code timeframes.',
          'Negotiate access terms in good faith — unreasonable refusal or delay can constitute a breach of your licence conditions.',
          'Familiarise yourself with the ACMA Facilities Access Code — it governs the procedures for all supplementary facility access disputes.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications Act 1997',
            section: 'Schedule 1, condition 5',
            description: 'Obligation to provide access to supplementary facilities.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A05145',
          },
        ],
      },
      {
        heading: 'Non-Discrimination and Anti-Competitive Conduct',
        body: 'Standard carrier licence condition 11 prohibits carriers from engaging in conduct that prevents or hinders carriage service providers (including competitors) from supplying services that are the same as, or equivalent to, services that the carrier itself supplies. This condition is separate from, and complementary to, the ACCC\'s competition powers under Part XIB of the Competition and Consumer Act 2010. ACMA can take enforcement action for breach of condition 11 independently of any ACCC action.',
        checklist: [
          'Do not engage in conduct that would prevent or hinder a CSP competitor from supplying competing services over your network.',
          'This obligation applies to technical, commercial, and contractual conduct — not just outright refusals to deal.',
          'Review proposed network changes and commercial arrangements for potential anti-competitive effects before implementation.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications Act 1997',
            section: 'Schedule 1, condition 11',
            description: 'Non-discrimination obligation — prohibition on conduct preventing competitor CSP service supply.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A05145',
          },
        ],
      },
      {
        heading: 'Network Information and Transparency',
        body: 'Carriers must supply relevant network information to other carriers and CSPs as required by their standard licence conditions and applicable instruments. This includes providing information about network plans, technical specifications, and planned network changes that might affect CSPs using the carrier\'s network. The obligation promotes transparent, non-discriminatory access to the carrier\'s infrastructure and enables CSPs to plan their service offerings effectively.',
        checklist: [
          'Notify CSPs that use your network of any planned changes that will materially affect their services with reasonable advance notice.',
          'Provide network information to access seekers as required by licence conditions and the ACMA Facilities Access Code.',
          'Do not use information asymmetry between your network division and retail/wholesale arms as a competitive weapon.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications Act 1997',
            section: 'Schedule 1, conditions 8–10',
            description: 'Carrier obligations to provide network information and notify of planned changes.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A05145',
          },
        ],
      },
    ],
  },

  {
    slug: 'submarine-cable-protection',
    title: 'Protection of Submarine Cables',
    shortTitle: 'Submarine Cables',
    category: 'International',
    summary:
      'Part 3.5A of the Telecommunications Act 1997 establishes Protected Zones around submarine cable landing points. Works within these zones require ACMA permits. Unauthorised works attract significant penalties.',
    applicableTo: ['carrier'],
    lastUpdated: '2026-02-01',
    keyActs: ['Telecommunications Act 1997'],
    subsections: [
      {
        heading: 'Protected Zones',
        body: 'Sections 99A to 99H of the Telecommunications Act 1997 (Part 3.5A) establish a regime for protecting Australia\'s international submarine cable systems. ACMA may declare a "Protected Zone" around the area where a submarine cable lands in Australian territory. Within a Protected Zone, certain activities — particularly anchoring, dredging, fishing with certain gear, and other seabed works — are prohibited without an ACMA permit.\n\nSubmarines cables carry the vast majority of Australia\'s international internet and voice traffic. Damage to a landing point or the cable itself can cause significant disruption to communications, which is why the Protected Zone regime exists.',
        checklist: [
          'If you operate vessels in coastal waters, identify the locations of any declared Protected Zones.',
          'Obtain an ACMA permit before conducting any works (anchoring, dredging, fishing with grappling gear) within a Protected Zone.',
          'If you own a submarine cable landing station, familiarise yourself with your obligations under Part 3.5A.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications Act 1997',
            section: 'ss 99A–99H (Part 3.5A)',
            description: 'Protected Zone regime for submarine cable landing areas.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A05145',
          },
        ],
      },
      {
        heading: 'Permit Requirements and Penalties',
        body: 'Activities within a Protected Zone that require a permit are specified in the Telecommunications (Submarine Cable Protection Zone) Regulations. Permits are applied for from ACMA and may be granted subject to conditions (e.g., requiring cable locating surveys before works, maintaining specified clearances from cables, and notifying ACMA of the commencement and completion of works).\n\nUndertaking prohibited activities within a Protected Zone without a permit is a strict liability offence under s 99C of the Act, with substantial civil penalties (up to $10 million for a body corporate) and potential criminal liability where the cable is actually damaged.',
        checklist: [
          'Apply to ACMA for a permit well in advance of any proposed seabed works within a Protected Zone.',
          'Include a cable risk assessment and cable locating survey as part of any offshore construction or engineering project in Australian coastal waters.',
          'Ensure your marine operations and construction insurance covers liability for submarine cable damage.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications Act 1997',
            section: 's 99C',
            description: 'Offence of undertaking prohibited activities in a submarine cable Protected Zone without a permit.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A05145',
          },
        ],
      },
    ],
  },

  {
    slug: 'data-retention',
    title: 'Data Retention Obligations',
    shortTitle: 'Data Retention',
    category: 'Privacy',
    summary:
      'Under the TIA Amendment (Data Retention) Act 2015, carriers and ISPs must retain specified categories of telecommunications metadata for two years and make it available to authorised agencies.',
    applicableTo: ['carrier', 'carriage-service-provider', 'isp', 'mvno', 'voip-provider'],
    lastUpdated: '2026-02-01',
    keyActs: [
      'Telecommunications (Interception and Access) Act 1979',
      'Telecommunications (Interception and Access) Amendment (Data Retention) Act 2015',
    ],
    subsections: [
      {
        heading: 'Who Must Retain Data',
        body: 'Part 5-1A of the Telecommunications (Interception and Access) Act 1979 (TIA Act), inserted by the Telecommunications (Interception and Access) Amendment (Data Retention) Act 2015, requires "service providers" — defined broadly to include carriers, carriage service providers, and internet service providers — to retain specified telecommunications data for a minimum period of two years.\n\nThe data retention obligation applies to any entity that supplies a "relevant service" — essentially any service that enables communication between two or more people using a telecommunications network. This includes fixed-line telephone providers, mobile network operators, ISPs, and potentially VoIP providers who have their own network infrastructure.',
        checklist: [
          'Determine whether your business is a "service provider" for the purposes of Part 5-1A of the TIA Act.',
          'If you are a service provider, identify which categories of "telecommunications data" you generate or hold and are required to retain.',
          'Implement a data retention system that stores required metadata for at least two years from the date the communication occurred.',
          'Implement access controls so that retained data can only be accessed by authorised persons for authorised purposes.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications (Interception and Access) Act 1979',
            section: 'Part 5-1A (ss 187A–187N)',
            description: 'Data retention obligations — who must retain data, what data, and for how long.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A03822',
          },
        ],
      },
      {
        heading: 'What Data Must Be Retained',
        body: 'The data retention obligation covers "telecommunications data" — not the content of communications. The categories of data that must be retained are specified in s 187AA of the TIA Act and include:\n- Subscriber information (name, address, billing details, account status)\n- Source and destination of communications (e.g., phone numbers, IP addresses, email addresses)\n- Date, time, and duration of communications\n- Type of communication (voice call, SMS, email, internet session)\n- Location data (cell tower information for mobile communications)\n- Equipment identifiers (IMEI, IMSI)\n\nCritically, the content of any communication must NOT be retained under the data retention regime — retaining content would itself be an offence under the TIA Act.',
        checklist: [
          'Ensure your systems retain all of the categories specified in s 187AA — this is the minimum set.',
          'Do NOT retain the content of communications under the data retention regime — content retention requires a warrant.',
          'Implement technical controls to segregate retained metadata from content to avoid inadvertent content retention.',
          'Encrypt retained metadata at rest and in transit — the TIA Act requires data security measures.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications (Interception and Access) Act 1979',
            section: 's 187AA',
            description: 'Specified categories of telecommunications data that must be retained.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A03822',
          },
        ],
      },
      {
        heading: 'Access to Retained Data',
        body: 'Retained telecommunications data may only be accessed by "criminal law enforcement agencies" and "enforcement agencies" that are authorised under Part 4-1 of the TIA Act. Agencies must obtain an authorisation from an authorisation officer within their agency (for metadata) or an interception warrant from a judge or AAT member (for content). Importantly, the data retention regime does not permit access by civil litigants, regulatory agencies, or commercial entities — it is strictly limited to criminal and national security law enforcement.',
        checklist: [
          'Only disclose retained data in response to a valid authorisation or warrant under Part 4-1 of the TIA Act.',
          'Establish a legal gateway process for assessing the validity of all access requests for retained data.',
          'Keep a register of all instances of retained data access — the TIA Act requires providers to maintain records of disclosures.',
          'Challenge any access request that does not comply with the formal requirements of Part 4-1.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications (Interception and Access) Act 1979',
            section: 'Part 4-1 (ss 178–180)',
            description: 'Access to retained telecommunications data — authorisation requirements.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A03822',
          },
        ],
      },
      {
        heading: 'Data Security and Implementation Plans',
        body: 'Section 187BA of the TIA Act requires service providers to protect retained data using encryption and other security measures that are adequate given the risks of unauthorised access, modification, use, or disclosure. Providers were required to submit a "data retention implementation plan" to the Attorney-General\'s Department when they first became subject to the data retention regime, setting out how they would comply. If you have not lodged such a plan and believe you are subject to the regime, contact the Department of Home Affairs immediately.',
        checklist: [
          'Encrypt all retained telecommunications data at rest and in transit using current industry-standard encryption.',
          'Conduct an annual review of the adequacy of your data security measures for retained data.',
          'If you have not previously lodged a data retention implementation plan but are a service provider, contact the Department of Home Affairs.',
          'Budget for the cost of data retention — carriers and ISPs can recover the capital cost of implementing compliant systems.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications (Interception and Access) Act 1979',
            section: 's 187BA',
            description: 'Data security obligations for retained telecommunications data.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A03822',
          },
        ],
      },
    ],
  },

  {
    slug: 'consumer-obligations',
    title: 'Consumer Obligations',
    shortTitle: 'Consumer Obligations',
    category: 'Consumer',
    summary:
      'The TCP Code, Customer Service Guarantee Standard, Priority Assistance, and TIO membership obligations protect consumers and small businesses — and apply to all providers supplying consumer-facing services.',
    applicableTo: [
      'carrier',
      'carriage-service-provider',
      'voip-provider',
      'reseller',
      'isp',
      'mvno',
    ],
    lastUpdated: '2026-02-01',
    keyActs: [
      'Telecommunications Consumer Protections Code (C628:2019)',
      'Telecommunications (Consumer Protection and Service Standards) Act 1999',
    ],
    subsections: [
      {
        heading: 'Telecommunications Consumer Protections (TCP) Code',
        body: 'The Telecommunications Consumer Protections Code (C628:2019) is a registered industry code that applies to all carriers and CSPs that supply "regulated telecommunications services" to residential or small business customers. It is one of the most comprehensive consumer protection instruments in the telecommunications sector.\n\nThe TCP Code imposes detailed obligations regarding: Critical Information Summaries (CIS) — a one-page plain-English summary of key service terms that must be provided before a customer enters a contract; contract terms and conditions (maximum contract length, early termination fees, change of terms); financial hardship assistance programmes; complaint handling procedures (including mandatory internal complaint handling timeframes); and credit management (restrictions on credit checks and debt collection practices).',
        checklist: [
          'Publish a compliant Critical Information Summary (CIS) for every regulated telecommunications service you sell.',
          'Do not enter a customer into a contract with a minimum contract term exceeding 24 months without explicit consent.',
          'Implement a documented financial hardship policy and make it publicly available.',
          'Establish and publish a complaint handling process that meets the TCP Code\'s timeframe and escalation requirements.',
          'Do not use a credit listing as a first response to a billing dispute — the TCP Code restricts credit management practices.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications Consumer Protections Code (C628:2019)',
            section: 'Part 4 (Critical Information Summaries)',
            description: 'Requirements for Critical Information Summaries for regulated telecommunications services.',
            legislationUrl: 'https://www.commsalliance.com.au/activities/tcp',
          },
          {
            actShortName: 'Telecommunications Consumer Protections Code (C628:2019)',
            section: 'Part 7 (Financial Hardship)',
            description: 'Financial hardship assistance obligations for telecommunications providers.',
            legislationUrl: 'https://www.commsalliance.com.au/activities/tcp',
          },
        ],
      },
      {
        heading: 'Customer Service Guarantee (CSG) Standard',
        body: 'The Customer Service Guarantee (CSG) Standard is a legislative instrument made under the Telecommunications (Consumer Protection and Service Standards) Act 1999. It sets mandatory timeframes within which carriers must connect new telephone services, repair faults, and keep installation/repair appointments.\n\nKey CSG timeframes include: connection of standard telephone services within 2 business days in metropolitan areas, 5 business days in other urban areas, and up to 15 business days in rural and remote areas; repair of faults within 1 business day in metropolitan areas, up to 3 business days in other areas; and compliance with appointment times (compensation is payable if an appointment is missed).\n\nCarriers must pay CSG compensation to affected customers if they fail to meet these timeframes.',
        checklist: [
          'Track connection and fault repair timeframes for all standard telephone service connections.',
          'Pay CSG compensation automatically to customers who experience missed timeframes — do not require customers to claim.',
          'Maintain records of all CSG events and compensation payments.',
          'Do not attempt to contract out of CSG obligations — any attempt to do so is void.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications (Consumer Protection and Service Standards) Act 1999',
            section: 'Part 5 (CSG Standard)',
            description: 'Customer Service Guarantee Standard — connection, fault repair, and appointment obligations.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A00098',
          },
        ],
      },
      {
        heading: 'Priority Assistance',
        body: 'Priority Assistance is a regime under the Telecommunications (Consumer Protection and Service Standards) Act 1999 and the TCP Code that requires carriers and applicable CSPs to provide expedited service connection and fault repair to customers with a diagnosed life-threatening medical condition (or a household member with such a condition) who have been assessed as requiring a reliable home telephone service for medical safety reasons.\n\nPriority Assistance customers must be given faster connection timeframes and fault repair times than standard CSG obligations require, and their services must be treated as highest priority in all fault management processes.',
        checklist: [
          'Implement a Priority Assistance registration process that is easy to access and free of charge.',
          'Train customer service staff to handle Priority Assistance applications sensitively and urgently.',
          'Ensure your systems can flag Priority Assistance accounts and route them to the front of connection and fault queues.',
          'Do not charge customers for Priority Assistance registration or for the additional services it requires.',
        ],
        citations: [
          {
            actShortName: 'Telecommunications (Consumer Protection and Service Standards) Act 1999',
            section: 'Part 9A (Priority Assistance)',
            description: 'Priority Assistance obligations for customers with life-threatening medical conditions.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A00098',
          },
        ],
      },
    ],
  },

  {
    slug: 'spam-do-not-call',
    title: 'Spam and Do Not Call',
    shortTitle: 'Spam & Do Not Call',
    category: 'Privacy',
    summary:
      'The Spam Act 2003 restricts commercial electronic messages and the Do Not Call Register Act 2006 restricts telemarketing calls to registered numbers. ACMA enforces both with significant penalties.',
    applicableTo: [
      'carrier',
      'carriage-service-provider',
      'content-service-provider',
      'voip-provider',
      'reseller',
      'isp',
      'mvno',
    ],
    lastUpdated: '2026-02-01',
    keyActs: ['Spam Act 2003', 'Do Not Call Register Act 2006', 'Privacy Act 1988'],
    subsections: [
      {
        heading: 'Spam Act 2003 — Three Conditions for Lawful Commercial Messages',
        body: 'The Spam Act 2003 (Cth) prohibits sending commercial electronic messages (including commercial emails and commercial SMS messages) unless three conditions are satisfied:\n\n1. Consent — the message must be sent with the addressee\'s express or inferred consent. Express consent means the recipient has opted in. Inferred consent arises from an existing business relationship or conspicuous publication of an electronic address for commercial purposes.\n\n2. Identification — the message must clearly and accurately identify the sender, including the organisation\'s name and contact details (including a physical address).\n\n3. Unsubscribe facility — every commercial electronic message must contain a functional and clearly visible mechanism for the recipient to unsubscribe from future messages. The unsubscribe mechanism must remain functional for at least 30 days after the message is sent, and providers must process unsubscribe requests within 5 business days.',
        checklist: [
          'Obtain and maintain records of express consent for all commercial electronic messaging.',
          'Include full sender identification (name, physical address) in every commercial email or SMS.',
          'Ensure every commercial email and commercial SMS includes a clear, functional unsubscribe mechanism.',
          'Process all unsubscribe requests within 5 business days and suppress the address from future campaigns.',
          'Do not send commercial SMS messages to mobile numbers outside business hours without express consent for out-of-hours contact.',
        ],
        citations: [
          {
            actShortName: 'Spam Act 2003',
            section: 'ss 16–18',
            description: 'Three conditions for sending lawful commercial electronic messages: consent, identification, unsubscribe.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A01214',
          },
          {
            actShortName: 'Spam Act 2003',
            section: 's 18',
            description: 'Unsubscribe mechanism requirements and the 5-business-day processing obligation.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A01214',
          },
        ],
      },
      {
        heading: 'Spam Act Penalties',
        body: 'The Spam Act 2003 carries substantial civil penalties. For a body corporate, the penalty for sending a single unsolicited commercial electronic message is $222 per contravention, but messages are often sent in bulk — the maximum civil penalty for a body corporate in respect of related contraventions is $2.22 million per day. ACMA has used these powers aggressively, including against telecommunications providers that sent unsolicited commercial SMS messages to their customers. ACMA can also issue formal infringement notices for less serious individual contraventions.',
        checklist: [
          'Treat Spam Act compliance as a board-level risk — penalties for bulk non-compliant messaging are very significant.',
          'Audit your customer messaging systems regularly to verify that consent records, identification, and unsubscribe mechanisms are all functioning correctly.',
          'Do not assume that sending to existing customers eliminates consent requirements — check whether each message is "commercial" and whether consent was obtained for that type of message.',
        ],
        citations: [
          {
            actShortName: 'Spam Act 2003',
            section: 'ss 24–32 and Schedule 3',
            description: 'Civil penalties and infringement notices for Spam Act contraventions.',
            legislationUrl: 'https://www.legislation.gov.au/C2004A01214',
          },
        ],
      },
      {
        heading: 'Do Not Call Register Act 2006',
        body: 'The Do Not Call Register Act 2006 (Cth) establishes the Do Not Call Register, maintained by ACMA, which members of the public can register their personal telephone numbers (fixed and mobile) on to opt out of telemarketing calls. Telemarketers — including organisations making unsolicited commercial calls for their own products and services — must not call numbers on the Register.\n\nKey exemptions include: calls by registered charities; calls by political parties or independent political candidates; calls by educational institutions; calls to existing customers with whom the caller has had a transaction in the previous three months (the "existing business relationship" exemption); and calls where the recipient has given express consent. The exemptions must be applied carefully — broad reliance on the existing business relationship exemption without proper records has been the subject of ACMA enforcement action.',
        checklist: [
          'Wash any telemarketing call lists against the Do Not Call Register before each calling campaign.',
          'Refresh your Do Not Call Register list scrub at least every 30 days — numbers added to the Register after your last scrub must not be called.',
          'Maintain records of the "existing business relationship" exemption where you rely on it.',
          'Train telemarketing staff to immediately stop a call and add the number to your internal suppression list if a recipient objects.',
          'Do not make telemarketing calls to numbers on the Register — even if you believe an exemption applies, document why before calling.',
        ],
        citations: [
          {
            actShortName: 'Do Not Call Register Act 2006',
            section: 'ss 11–17',
            description: 'Prohibition on calling registered numbers, exemptions, and penalties.',
            legislationUrl: 'https://www.legislation.gov.au/C2006A00098',
          },
        ],
      },
    ],
  },
];

export function getSectionBySlug(slug: string): ComplianceSection | undefined {
  return COMPLIANCE_SECTIONS.find((s) => s.slug === slug);
}

export const SECTION_CATEGORIES = [
  'Licensing',
  'Consumer',
  'Security',
  'Technical',
  'Regulatory',
  'International',
  'Privacy',
] as const;
