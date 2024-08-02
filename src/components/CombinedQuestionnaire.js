import React, { useState } from 'react';

function CombinedQuestionnaire({ onSubmit }) {
  const [answers, setAnswers] = useState({
    carrier: false,
    serviceProvider: false,
    international: false,
    emergencyServices: false,
    customerEquipment: false,
    regulatoryFramework: false,
    industryCodes: false,
    protectionOfCommunications: false,
    monitoringAndReporting: false,
    ancillaryMatters: false,
    nationalInterest: false,
    industryAssistance: false,
    standardCarrier: false,
    protectionOfSubmarineCables: false,
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [name]: checked
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(answers);
  };

  return (
    <form onSubmit={handleSubmit} className="questionnaire">
      <h3>Business Operations</h3>
      <p>Please answer the following questions to determine your business's telecommunications obligations.</p>
      
      <div className="question-section">
        <label>
          <strong>Network and Service Operations</strong>
        </label>
        <label>
          Do you own any networks or infrastructure that provide phone or internet services?
          <input
            type="checkbox"
            name="carrier"
            checked={answers.carrier}
            onChange={handleChange}
          />
        </label>
        <label>
          Do you offer phone or internet services to customers?
          <input
            type="checkbox"
            name="serviceProvider"
            checked={answers.serviceProvider}
            onChange={handleChange}
          />
        </label>
      </div>
      
      <div className="question-section">
        <label>
          <strong>International and Emergency Operations</strong>
        </label>
        <label>
          Do you have customers outside of Australia?
          <input
            type="checkbox"
            name="international"
            checked={answers.international}
            onChange={handleChange}
          />
        </label>
        <label>
          Do you provide services that connect people to emergency services like 000?
          <input
            type="checkbox"
            name="emergencyServices"
            checked={answers.emergencyServices}
            onChange={handleChange}
          />
        </label>
      </div>
      
      <div className="question-section">
        <label>
          <strong>Customer Equipment</strong>
        </label>
        <label>
          Do you sell or install customer equipment like modems, routers, or cables?
          <input
            type="checkbox"
            name="customerEquipment"
            checked={answers.customerEquipment}
            onChange={handleChange}
          />
        </label>
      </div>
      
      <div className="question-section">
        <label>
          <strong>Regulatory and Compliance</strong>
        </label>
        <label>
          Do you need to follow specific government rules and regulations for your services?
          <input
            type="checkbox"
            name="regulatoryFramework"
            checked={answers.regulatoryFramework}
            onChange={handleChange}
          />
        </label>
        <label>
          Do you follow any industry standards or codes of practice?
          <input
            type="checkbox"
            name="industryCodes"
            checked={answers.industryCodes}
            onChange={handleChange}
          />
        </label>
      </div>
      
      <div className="question-section">
        <label>
          <strong>Privacy and Security</strong>
        </label>
        <label>
          Do you need to keep customer communications private and secure?
          <input
            type="checkbox"
            name="protectionOfCommunications"
            checked={answers.protectionOfCommunications}
            onChange={handleChange}
          />
        </label>
      </div>
      
      <div className="question-section">
        <label>
          <strong>Monitoring and Reporting</strong>
        </label>
        <label>
          Do you have to monitor and report on your services' performance?
          <input
            type="checkbox"
            name="monitoringAndReporting"
            checked={answers.monitoringAndReporting}
            onChange={handleChange}
          />
        </label>
      </div>
      
      <div className="question-section">
        <label>
          <strong>Additional Compliance Obligations</strong>
        </label>
        <label>
          Do you need to comply with additional rules and regulations not mentioned above?
          <input
            type="checkbox"
            name="ancillaryMatters"
            checked={answers.ancillaryMatters}
            onChange={handleChange}
          />
        </label>
      </div>
      
      <div className="question-section">
        <label>
          <strong>National Security and Assistance</strong>
        </label>
        <label>
          Do you have to follow rules related to national security?
          <input
            type="checkbox"
            name="nationalInterest"
            checked={answers.nationalInterest}
            onChange={handleChange}
          />
        </label>
        <label>
          Do you provide technical help to law enforcement or security agencies?
          <input
            type="checkbox"
            name="industryAssistance"
            checked={answers.industryAssistance}
            onChange={handleChange}
          />
        </label>
      </div>
      
      <div className="question-section">
        <label>
          <strong>Licensing and Cable Protection</strong>
        </label>
        <label>
          Do you need to comply with specific conditions for your license?
          <input
            type="checkbox"
            name="standardCarrier"
            checked={answers.standardCarrier}
            onChange={handleChange}
          />
        </label>
        <label>
          Do you work with underwater cables for internet or phone services?
          <input
            type="checkbox"
            name="protectionOfSubmarineCables"
            checked={answers.protectionOfSubmarineCables}
            onChange={handleChange}
          />
        </label>
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
}

export default CombinedQuestionnaire;
