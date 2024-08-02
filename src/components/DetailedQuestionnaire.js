import React, { useState } from 'react';

function DetailedQuestionnaire({ onSubmit }) {
  const [answers, setAnswers] = useState({
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
    <form onSubmit={handleSubmit}>
      <h3>Detailed Questionnaire</h3>
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
      <label>
        Do you sell or install customer equipment like modems, routers, or cables?
        <input
          type="checkbox"
          name="customerEquipment"
          checked={answers.customerEquipment}
          onChange={handleChange}
        />
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
      <label>
        Do you need to keep customer communications private and secure?
        <input
          type="checkbox"
          name="protectionOfCommunications"
          checked={answers.protectionOfCommunications}
          onChange={handleChange}
        />
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
      <label>
        Do you need to comply with additional rules and regulations not mentioned above?
        <input
          type="checkbox"
          name="ancillaryMatters"
          checked={answers.ancillaryMatters}
          onChange={handleChange}
        />
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
      <button type="submit">Submit</button>
    </form>
  );
}

export default DetailedQuestionnaire;
