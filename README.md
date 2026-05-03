# PriceSense

PriceSense is a full-stack web application that predicts housing prices based on various features such as location, number of rooms, and median income. It uses a machine learning model trained on housing data and provides an intuitive user interface to interact with the model.

## Features

- **Machine Learning Model**: Trained to predict housing prices using features like longitude, latitude, housing median age, total rooms, and more.
- **Backend API**: A robust REST API built with FastAPI to serve the machine learning model.
- **Frontend Web App**: A modern, responsive user interface built with Next.js and React for easy interaction with the prediction model.

## Project Structure

- `backend/`: Contains the FastAPI application, the pre-trained machine learning models (`.pkl` files), and API endpoints for predictions.
- `frontend/`: Contains the Next.js web application for the user interface.
- `main.ipynb`: Jupyter notebook containing the data exploration, feature engineering, and model training code.
- `Data/`: Directory containing the datasets used for training the model.

## Tech Stack

### Backend
- **Python**
- **FastAPI**: For building the REST API.
- **Scikit-learn**: For machine learning model training and inference.
- **Pandas & NumPy**: For data manipulation.
- **Joblib**: For model serialization.

### Frontend
- **Next.js**: React framework for the user interface.
- **React**: UI library.
- **TypeScript**: Typed superset of JavaScript.

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- Python 3.8+

### Running the Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend API will be available at `http://localhost:8000`.

### Running the Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`.

## API Endpoints

### `POST /predict`
Accepts housing features and returns the predicted price.

**Request Body Example:**
```json
{
  "longitude": -122.23,
  "latitude": 37.88,
  "housing_median_age": 41.0,
  "total_rooms": 880.0,
  "total_bedrooms": 129.0,
  "population": 322.0,
  "households": 126.0,
  "median_income": 8.3252,
  "ocean_proximity": "NEAR BAY"
}
```

**Response Example:**
```json
{
  "predicted_price": 452600.0,
  "status": "success"
}
```

### `GET /`
Health check endpoint to verify the API is running.

## Model Training

The machine learning model is trained in the `main.ipynb` notebook. The pipeline handles:
- Feature engineering (e.g., calculating rooms per household).
- Scaling numeric features.
- One-hot encoding for categorical features like `ocean_proximity`.

The final trained model and pipeline are exported as `.pkl` files and stored in the `backend/models/` directory for inference.
