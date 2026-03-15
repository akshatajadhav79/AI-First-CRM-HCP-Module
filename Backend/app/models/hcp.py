from sqlalchemy import Column, Integer, String
from app.database import Base

class HCP(Base):
    __tablename__ = "hcps"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255))
    specialization = Column(String(255))
    hospital = Column(String(255))
    city = Column(String(255))
    
from pydantic import BaseModel

class HCPBase(BaseModel):
    name: str
    specialization: str
    hospital: str
    city: str


class HCPCreate(HCPBase):
    pass


class HCPResponse(HCPBase):
    id: int

    class Config:
        from_attributes = True