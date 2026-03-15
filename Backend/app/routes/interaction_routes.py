# from email import message
# from fastapi import APIRouter, Depends
# from sqlalchemy.orm import Session
# from app.database import SessionLocal
# from app.models.hcp import HCP,HCPCreate, HCPResponse 
# from app.models.interaction import Interaction,InteractionCreate, InteractionResponse
# from app.ai.langgraph_agent import graph

# router = APIRouter()

# @router.get("/")
# def test_route():
#     return {"message": "Interaction API working"}

# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()
        
# @router.post("/hcp", response_model=HCPResponse)
# def create_hcp(hcp: HCPCreate, db: Session = Depends(get_db)):
#     new_hcp = HCP(**hcp.dict())   # convert schema → model
#     db.add(new_hcp)
#     db.commit()
#     db.refresh(new_hcp)
#     return new_hcp


# router = APIRouter()


# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()


# @router.post("/interaction", response_model=InteractionResponse)
# def create_interaction(data: InteractionCreate, db: Session = Depends(get_db)):

#     new_interaction = Interaction(**data.dict())

#     db.add(new_interaction)
#     db.commit()
#     db.refresh(new_interaction)

#     return new_interaction

# @router.post("/ai-log")
# def ai_log_interaction(massage:str):
#     result = graph.invoke({"user_input":message})
#     return {"ai_response": result["output"]}


from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.ai.langgraph_agent import graph
from app.models.interaction import Interaction
from pydantic import BaseModel

router = APIRouter(prefix="/interaction")

class ChatRequest(BaseModel):
    message: str
    
@router.post("/ai-chat")
def ai_chat(data: ChatRequest, db: Session = Depends(get_db)):

    print("Incoming message:", data.message)

    result = graph.invoke({"user_input": data.message})

    print("Graph result:", result)

    fields = result.get("fields", {})

    print("Extracted fields:", fields)

    interaction = Interaction()

    interaction.topics_discussed = fields.get("topics_discussed")
    interaction.follow_up = fields.get("follow_up")
    interaction.sentiment = fields.get("sentiment")

    db.add(interaction)
    db.commit()
    db.refresh(interaction)
     # AI reply logic
    if not fields:
        reply = "Hello! How can I help you log an HCP interaction today?"
    else:
        reply = f"""
            Interaction recorded.

            HCP: {fields.get('hcp_name','Unknown')}
            Topics: {fields.get('topics_discussed','Not specified')}
            Sentiment: {fields.get('sentiment','Not detected')}

            Next Step: {fields.get('follow_up','No follow-up suggested')}
            """

    return {
        "fields": fields,
        "interaction_id": interaction.id,
        "reply": reply
    }