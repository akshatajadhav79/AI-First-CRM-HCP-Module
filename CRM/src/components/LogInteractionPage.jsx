import React, { useState } from "react";
import { InteractionDetails } from "./InteractionDetails";
import AIAssistant from "./AIAssistant";

function LogInteractionPage() {
  const [formData, setFormData] = useState({
    hcp_name: "",
    interaction_type: "Meeting",
    date: "",
    time: "",
    attendees: "",
    topics_discussed: "",
    outcomes: "",
    follow_up: "",
    sentiment: "",
  });

  return (
    <>
      <div className="container">
        <div className="left">
          <h2>Log HCP Interaction</h2>
          <InteractionDetails formData={formData} setFormData={setFormData} />
        </div>
        <div className="right">
          <AIAssistant setFormData={setFormData} />
        </div>
      </div>
    </>
  );
}

export default LogInteractionPage;
