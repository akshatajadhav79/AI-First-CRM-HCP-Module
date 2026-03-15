import json
from app.ai.groq_client import ask_llm

def extract_fields(message):

    prompt = f"""
You are a CRM assistant.

If the text contains an HCP interaction, extract the following fields and return JSON.

If the text is casual conversation (like hi, hello), return empty JSON.

Fields:
hcp_name
interaction_type
topics_discussed
sentiment
outcomes
follow_up
appointment_date

Text:
{message}
"""
    response = ask_llm(prompt)
    print("LLM RESPONSE:", response)

    try:
        json_start = response.find("{")
        json_end = response.rfind("}") + 1
        json_str = response[json_start:json_end]

        return json.loads(json_str)
    except Exception as e:
        print("JSON parse error:", e)
        print("LLM response:", response)
        return {}
    