from fastapi import FastAPI
from app.database import Base, engine
from app.routes import interaction_routes
from app.routes.interaction_routes import router as interaction_router

# Import models so tables get created
from app.models import interaction
from app.models import hcp
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI CRM HCP Module")

app = FastAPI(debug=True)
app.include_router(interaction_router)

origins = [
    # "https://swasti-ai-alpha.vercel.app",
    "*",
    "http://localhost:5173"
] 
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(
    interaction_routes.router,
    prefix="/interaction",
    tags=["Interaction"]
)

@app.on_event("startup")
def test_connection():
    try:
        connection = engine.connect()
        print("✅ MySQL Connected Successfully")
        connection.close()
    except Exception as e:
        print("❌ Database connection failed:", e)
@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return {}

