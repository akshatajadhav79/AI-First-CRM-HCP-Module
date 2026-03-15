import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateField } from "../redux/interactionSlice";

export const InteractionDetails = () => {

  const dispatch = useDispatch();
  const formData = useSelector((state) => state.interaction);
  console.log("formData: ",formData)

  const suggestions = [
    "Schedule follow-up meeting in 2 weeks",
    "Send OncoBoost Phase III PDF",
    "Add Dr. Sharma to advisory board invite list",
  ];

  const handleChange = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  return (
    <div className="card">
      <h3 className="HeadTitle">Interaction Details</h3>

      <div className="cardbody">

        <div className="grid">

          <div>
            <label>HCP Name</label>
            <input
              value={formData.hcp_name}
              onChange={(e)=>handleChange("hcp_name", e.target.value)}
              placeholder="Search or select HCP..."
            />
          </div>

          <div>
            <label>Interaction Type</label>
            <select
              value={formData.interaction_type}
              onChange={(e)=>handleChange("interaction_type", e.target.value)}
            >
              <option>Meeting</option>
              <option>Call</option>
              <option>Email</option>
            </select>
          </div>

          <div>
            <label>Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e)=>handleChange("date", e.target.value)}
            />
          </div>

          <div>
            <label>Time</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e)=>handleChange("time", e.target.value)}
            />
          </div>

        </div>

        <div>
          <label>Attendees</label>
          <input
            value={formData.attendees}
            onChange={(e)=>handleChange("attendees", e.target.value)}
            placeholder="Enter names or search..."
          />
        </div>

        <div>
          <label>Topics Discussed</label>
          <textarea
            value={formData.topics_discussed}
            onChange={(e)=>handleChange("topics_discussed", e.target.value)}
          />
        </div>

        <h3>Observed/Inferred HCP Sentiment</h3>

        <div className="radio">

          <label>
            <input
              type="radio"
              value="positive"
              checked={formData.sentiment}
              onChange={(e)=>handleChange("sentiment", e.target.value)}
            /> Positive
          </label>

          <label>
            <input
              type="radio"
              value="neutral"
              checked={formData.sentiment === "neutral"}
              onChange={(e)=>handleChange("sentiment", e.target.value)}
            /> Neutral
          </label>

          <label>
            <input
              type="radio"
              value="negative"
              checked={formData.sentiment === "negative"}
              onChange={(e)=>handleChange("sentiment", e.target.value)}
            /> Negative
          </label>

        </div>

        <div>
          <label>Outcomes</label>
          <textarea
            value={formData.outcomes}
            onChange={(e)=>handleChange("outcomes", e.target.value)}
          />
        </div>

        <div>
          <label>Follow-up Actions</label>
          <textarea
            value={formData.follow_up}
            onChange={(e)=>handleChange("follow_up", e.target.value)}
          />
        </div>

        <div className="ai-followups">

          <p className="followup-title">AI Suggested Follow-ups:</p>

          <ul className="followup-list">
            {suggestions.map((item, index) => (
              <li
                key={index}
                className="followup-item"
                onClick={()=>handleChange("follow_up", item)}
              >
                + {item}
              </li>
            ))}
          </ul>

        </div>

      </div>
    </div>
  );
};