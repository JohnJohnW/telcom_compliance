import React from 'react';

const sections = [
  'Home',
  'Regulatory Framework',
  'Carrier Licensing and Obligations',
  'Service Provider Rules',
  'Industry Codes and Standards',
  'Protection of Communications',
  'Emergency Services',
  'Monitoring and Reporting',
  'Technical Regulation',
  'International Aspects',
  'Ancillary Matters',
  'National Interest Matters',
  'Industry Assistance',
  'Standard Carrier Licence Conditions',
  'Protection of Submarine Cables',
];

function Sidebar({ selectedSection, setSelectedSection }) {
  return (
    <aside className="sidebar">
      <ul>
        {sections.map(section => (
          <li 
            key={section} 
            onClick={() => setSelectedSection(section)}
            className={selectedSection === section ? 'selected' : ''}
          >
            {section}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
