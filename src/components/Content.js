import React from 'react';
import Section from './Section';

const content = {
  Overview: "The Telecommunications Act 1997 establishes the regulatory framework for telecommunications in Australia. It aims to promote the long-term interests of end-users, ensure efficient and competitive service provision, and provide adequate community safeguards. This comprehensive guideline consolidates the compliance requirements from all three volumes of the Act.",
  "Regulatory Framework": {
    "Objectives of the Act": [
      "Promote the long-term interests of end-users.",
      "Ensure efficiency and international competitiveness.",
      "Ensure accessible and affordable services.",
      "Promote diverse and innovative services.",
      "Ensure community safeguards."
    ],
    "Key Regulatory Bodies": [
      "Australian Communications and Media Authority (ACMA): Monitors and enforces compliance.",
      "Australian Competition and Consumer Commission (ACCC): Ensures competition and consumer protection."
    ]
  },
  "Carrier Licensing and Obligations": {
    "Carrier Licences": [
      "Requirement: Owners of network units used to supply carriage services to the public must hold a carrier licence.",
      "Application Process: Submit an application to ACMA with the prescribed fee.",
      "Conditions: Compliance with the conditions set out in the Act and any additional conditions imposed by ACMA."
    ],
    "Obligations of Carriers": [
      "Network Units: Ensure network units meet definitions and requirements under the Act.",
      "Service Provision: Provide services that promote long-term interests of end-users.",
      "Consumer Protection: Adhere to consumer protection standards and requirements."
    ]
  },
  "Service Provider Rules": {
    "Types of Service Providers": [
      "Carriage Service Providers (CSPs): Supply carriage services.",
      "Content Service Providers (CSPs): Supply content services."
    ],
    "Obligations": [
      "Compliance with Service Provider Rules: All service providers must comply with ACMA's rules.",
      "Registration and Reporting: Ensure proper registration with ACMA and regular compliance status reporting."
    ]
  },
  "Industry Codes and Standards": {
    "Development and Registration": [
      "Industry Codes: Developed by industry bodies and registered with ACMA.",
      "Industry Standards: Established by ACMA when industry codes are insufficient."
    ],
    "Compliance": [
      "Voluntary Compliance: Industry codes are voluntary unless directed by ACMA.",
      "Mandatory Compliance: Industry standards are mandatory."
    ]
  },
  "Protection of Communications": {
    "Confidentiality": [
      "Carriers and CSPs: Must protect the confidentiality of communications.",
      "Disclosure: Permitted only under specific circumstances outlined in the Act."
    ],
    "Unauthorized Access": [
      "Prevention Measures: Implement measures to prevent unauthorized access and interference with telecommunications networks and facilities."
    ]
  },
  "Emergency Services": {
    "Access to Emergency Services": [
      "Emergency Call Services: Ensure that users have access to emergency call services."
    ],
    "Recognized Persons": [
      "Operation: Only recognized persons specified by ACMA may operate emergency call services."
    ]
  },
  "Monitoring and Reporting": {
    "Performance Monitoring": [
      "Annual Reports: Carriers and CSPs must report performance annually to ACMA.",
      "Additional Reports: Submit additional reports as required by ACMA."
    ],
    "Compliance Monitoring": [
      "Investigations: ACMA may investigate compliance with the Act.",
      "Enforcement: ACMA can enforce compliance through remedial directions, formal warnings, and other measures."
    ]
  },
  "Technical Regulation": {
    "Customer Equipment and Cabling": [
      "Standards: Ensure customer equipment and cabling comply with ACMA's technical standards.",
      "Approval: Obtain necessary approvals for customer equipment and cabling."
    ],
    "Numbering": [
      "Administration: Adhere to the numbering scheme managed by ACMA or a designated numbering scheme manager."
    ]
  },
  "International Aspects": {
    "International Conventions": [
      "Compliance: Carriers and CSPs must comply with international conventions as required by the Act.",
      "Rules of Conduct: Follow Rules of Conduct for dealings with international telecommunications operators set by the Minister."
    ]
  },
  "Ancillary Matters": {
    "Information Gathering": [
      "Powers: ACMA and ACCC can gather information necessary for monitoring compliance."
    ],
    "Search and Seizure": [
      "Powers: Authorized officers can search premises and seize documents or equipment related to telecommunications services."
    ],
    "Review of Decisions": [
      "Rights: Carriers and CSPs can seek review of certain decisions made by ACMA or ACCC."
    ],
    "Injunctions": [
      "Court Orders: ACMA or ACCC can seek injunctions to prevent contraventions of the Act."
    ]
  },
  "National Interest Matters": {
    "Security Obligations": [
      "ACMA, carriers, and CSPs must protect telecommunications networks from unauthorized access and use.",
      "Carriage service providers may suspend services in emergencies as requested by authorities."
    ],
    "Obligations": [
      "ACMA's duties include preventing the use of networks for criminal activities and providing necessary assistance to law enforcement and national security.",
      "Carriers and CSPs must protect networks from unauthorized interference and provide necessary assistance to law enforcement and national security."
    ]
  },
  "Industry Assistance": {
    "Voluntary Technical Assistance": [
      "Carriers and CSPs may voluntarily provide technical assistance to intelligence and law enforcement agencies."
    ],
    "Technical Assistance Notices": [
      "Authorities may issue notices requiring technical assistance from carriers and CSPs."
    ],
    "Technical Capability Notices": [
      "Carriers and CSPs may be required to build capabilities to assist intelligence and law enforcement agencies."
    ]
  },
  "Standard Carrier Licence Conditions": {
    "Compliance with the Act": [
      "Carriers must comply with the Telecommunications Act 1997, the Telecommunications (Consumer Protection and Service Standards) Act 1999, and relevant parts of the Telecommunications (Interception and Access) Act 1979."
    ],
    "Access to Supplementary Facilities": [
      "Carriers must provide access to their facilities to other carriers to enable competitive services or the establishment of their own facilities."
    ],
    "Access to Network Information": [
      "Carriers must provide access to operations support systems, traffic flow information, database information, network planning information, and quality of service information upon request."
    ],
    "Security Procedures": [
      "Carriers must have agreed-upon security procedures to protect the confidentiality of shared information."
    ],
    "Terms and Conditions of Access": [
      "Access must be provided on agreed terms or determined by arbitration."
    ],
    "Industry Cooperation": [
      "Carriers must cooperate with other carriers to share sites and underground facilities."
    ],
    "Inspection of Facilities": [
      "Carriers must keep records and regularly inspect their facilities to ensure safety."
    ],
    "Remedial Action": [
      "Carriers must take necessary remedial actions following inspections or investigations."
    ]
  },
  "Protection of Submarine Cables": {
    "Protection Zones": [
      "ACMA can declare protection zones for submarine cables, specifying prohibited and restricted activities."
    ],
    "Permits for Installation": [
      "Obtain permits for installing submarine cables in protection and non-protection zones."
    ],
    "Conditions for Installation": [
      "Meet conditions and standards for the installation of submarine cables."
    ],
    "Offences": [
      "Offences include installing submarine cables without a permit and breaching permit conditions."
    ]
  },
  Conclusion: "Compliance with the Telecommunications Act 1997 is essential for maintaining a competitive, efficient, and secure telecommunications industry in Australia. Carriers, service providers, and stakeholders must adhere to the detailed requirements outlined in this comprehensive guideline to ensure regulatory compliance and promote the long-term interests of end-users."
};

function Content({ selectedSection }) {
  return (
    <div className="content">
      <Section title={selectedSection} content={content[selectedSection]} />
    </div>
  );
}

export default Content;
