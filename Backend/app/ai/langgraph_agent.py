from typing import TypedDict
from langgraph.graph import StateGraph
from app.ai.extractor import extract_fields


class AgentState(TypedDict):
    user_input: str
    fields: dict


def extract_node(state: AgentState):

    print("LangGraph received input:", state)

    fields = extract_fields(state["user_input"])
    print("LangGraph received input:", state)


    return {"fields": fields}


builder = StateGraph(AgentState)

builder.add_node("extract", extract_node)

builder.set_entry_point("extract")

graph = builder.compile()