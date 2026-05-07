from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import numpy as np
import joblib
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define paths relative to this script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "xgb_model.pkl")
PIPELINE_PATH = os.path.join(BASE_DIR, "models", "PriceSense.pkl")

# Load models
try:
    pipeline = joblib.load(PIPELINE_PATH)
    model = joblib.load(MODEL_PATH)
except Exception as e:
    print(f"Error loading models: {e}")
    pipeline, model = None, None

class HousingFeatures(BaseModel):
    longitude: float
    latitude: float
    housing_median_age: float
    total_rooms: float
    total_bedrooms: float
    population: float
    households: float
    median_income: float
    ocean_proximity: str

@app.post("/predict")
def predict(features: HousingFeatures):
    if pipeline is None or model is None:
        return {"error": "Models not loaded correctly."}
        
    data = features.model_dump()
    
    # Feature engineering as done in notebook
    rooms_per_household = data["total_rooms"] / data["households"]
    bedrooms_per_room = data["total_bedrooms"] / data["total_rooms"]
    population_per_household = data["population"] / data["households"]
    
    # Define exactly the columns that the pipeline expects
    cols = [
        'longitude', 'latitude', 'housing_median_age', 'total_rooms',
        'total_bedrooms', 'population', 'households', 'median_income',
        'ocean_proximity_<1H OCEAN', 'ocean_proximity_INLAND',
        'ocean_proximity_ISLAND', 'ocean_proximity_NEAR BAY',
        'ocean_proximity_NEAR OCEAN', 'rooms_per_household',
        'bedrooms_per_room', 'population_per_household'
    ]
    
    # Initialize all with 0
    row = {col: 0 for col in cols}
    
    row['longitude'] = data['longitude']
    row['latitude'] = data['latitude']
    row['housing_median_age'] = data['housing_median_age']
    row['total_rooms'] = data['total_rooms']
    row['total_bedrooms'] = data['total_bedrooms']
    row['population'] = data['population']
    row['households'] = data['households']
    row['median_income'] = data['median_income']
    row['rooms_per_household'] = rooms_per_household
    row['bedrooms_per_room'] = bedrooms_per_room
    row['population_per_household'] = population_per_household
    
    # Handle the categorical feature manually
    op = f"ocean_proximity_{data['ocean_proximity']}"
    if op in row:
        row[op] = 1
        
    df = pd.DataFrame([row])
    
    try:
        # Scale features
        scaled_features = pipeline.transform(df)
        
        # Predict
        prediction = model.predict(scaled_features)
        
        return {
            "predicted_price": float(prediction[0]),
            "status": "success"
        }
    except Exception as e:
        return {"error": str(e), "status": "failed"}

@app.get("/")
def read_root():
    return {"message": "PriceSense API is running!"}
