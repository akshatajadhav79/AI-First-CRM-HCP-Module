import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hcp_name: "",
  interaction_type: "Meeting",
  date: "",
  time: "",
  attendees: "",
  topics_discussed: "",
  sentiment: "",
  outcomes: "",
  follow_up: "",
};

const interactionSlice = createSlice({
  name: "interaction",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },

    setFields: (state, action) => {
      const fields = action.payload;

      if (fields.appointment_date) {
        let dateString = fields.appointment_date;

        // handle "Today"
        if (dateString.toLowerCase().includes("today")) {
          const now = new Date();

          const timeMatch = dateString.match(/(\d+)(am|pm)/i);

          if (timeMatch) {
            let hours = parseInt(timeMatch[1]);
            const period = timeMatch[2].toLowerCase();

            if (period === "pm" && hours < 12) hours += 12;

            now.setHours(hours, 0, 0);
          }

          state.date = now.toISOString().split("T")[0];
          state.time = now.toTimeString().slice(0, 5);
        }
      }
      Object.assign(state, fields);
    },
  },
});

export const { updateField, setFields } = interactionSlice.actions;

export default interactionSlice.reducer;
