from pydantic import BaseModel
from datetime import date,datetime


# Base schema
class InteractionBase(BaseModel):
    hcp_id: int
    rep_id: int
    contact_date: date
    interaction_type: str
    summary: str
    products_discussed: str
    follow_up: str
    samples_given: int


# Create schema
class InteractionCreate(InteractionBase):
    pass


# Response schema
class InteractionResponse(InteractionBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
        
from sqlalchemy import Column, Integer, String, Date, DateTime, ForeignKey
from datetime import datetime
from app.database import Base


class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)

    hcp_id = Column(Integer, ForeignKey("hcps.id"))
    rep_id = Column(Integer)

    contact_date = Column(Date)
    interaction_type = Column(String(255))

    summary = Column(String(500))
    products_discussed = Column(String(500))
    follow_up = Column(String(500))

    samples_given = Column(Integer)

    created_at = Column(DateTime, default=datetime.utcnow)