import React from 'react';

function Section({ title, content }) {
  if (!content) {
    return (
      <div>
        <h2>{title}</h2>
        <p>Content not available.</p>
      </div>
    );
  }

  if (typeof content === 'string') {
    return (
      <div>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>{title}</h2>
      {Object.keys(content).map(subtitle => (
        <div key={subtitle}>
          <h3>{subtitle}</h3>
          <ul>
            {content[subtitle].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Section;
