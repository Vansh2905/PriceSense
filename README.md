# 🏠 PriceSense – AI-Powered House Price Prediction

PriceSense is a full-stack machine learning application that predicts housing prices based on socioeconomic and geographical features. It integrates a trained ML model with a modern web interface to deliver real-time predictions.

---

## 🎯 Objective

Designed and developed as a hands-on project to strengthen practical machine learning skills by implementing an end-to-end pipeline, including data preprocessing, feature engineering, model selection, evaluation, and deployment.

---

## 🚀 Key Features

* 🤖 **Machine Learning Model**
  Predicts house prices using location, income, and housing-related features

* ⚡ **FastAPI Backend**
  High-performance REST API for serving predictions

* 🌐 **Modern Frontend (Next.js + React)**
  Clean and responsive user interface

* 📊 **End-to-End ML Pipeline**
  Covers preprocessing → feature engineering → training → deployment

---

## 🧠 Machine Learning Highlights

* Handled missing values using **median imputation**
* Applied **One-Hot Encoding** for categorical features
* Performed domain-driven **feature engineering**:

  * rooms_per_household
  * bedrooms_per_room
  * population_per_household
* Used **Stratified Sampling** to maintain data distribution
* Compared multiple regression models:

  * Linear Regression
  * Decision Tree
  * Random Forest (**Best Model**)

### 📈 Performance

* **RMSE:** ~48,433
* **R² Score:** 0.81

---

## 🌐 Live Demo

* 🔗 **Frontend:** https://pricesense-eta.vercel.app/
* 🔗 **Backend API:** https://pricesense-srqi.onrender.com

---

## 🏗️ Project Structure

```bash
PriceSense/
│
├── backend/                     # FastAPI backend service
│   ├── models/                  # Serialized ML models
│   │   ├── PriceSense.pkl       # Preprocessing pipeline
│   │   └── model.pkl            # Trained Random Forest model
│   ├── main.py                  # API endpoints (FastAPI app)
│   └── requirements.txt         # Backend dependencies
│
├── frontend/                    # Next.js frontend application
│   ├── public/                  # Static assets
│   ├── src/
│   │   └── app/                 # App Router (Next.js 13+)
│   │       ├── layout.tsx       # Root layout
│   │       ├── page.tsx         # Main UI page
│   │       ├── page.module.css  # Page-specific styles
│   │       ├── globals.css      # Global styles
│   │       └── favicon.ico
│   ├── .env                     # Environment variables
│   ├── package.json             # Dependencies & scripts
│   ├── tsconfig.json            # TypeScript config
│   └── README.md                # Frontend documentation
│
├── Data/                        # Dataset directory
├── main.ipynb                   # ML training & experimentation
│
├── requirements.txt             # Root-level Python dependencies
├── .gitignore                   # Git ignore rules
└── README.md                    # Main project documentation
```

---

## ⚙️ Tech Stack

### 🔧 Backend

* Python
* FastAPI
* Scikit-learn
* Pandas, NumPy
* Joblib

### 🎨 Frontend

* Next.js
* React
* TypeScript

---

## ▶️ Getting Started

### 📌 Prerequisites

* Node.js (v18+)
* Python 3.8+

---

### 🚀 Run Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

---

### 🌐 Run Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔌 API Endpoints

### 🔹 POST `/predict`

Predict house price based on input features

#### Request Example:

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

#### Response:

```json
{
  "predicted_price": 452600.0,
  "status": "success"
}
```

---

### 🔹 GET `/`

Health check endpoint

---

## 🧪 Model Training

The model is trained in `main.ipynb` and includes:

* Data cleaning & preprocessing
* Feature engineering
* Scaling & encoding pipeline
* Model training & evaluation

The final trained model is exported as `.pkl` files and used for backend inference.

---

## 🚀 Future Improvements

* Hyperparameter tuning (GridSearchCV / RandomizedSearchCV)
* Experiment with Gradient Boosting (XGBoost, LightGBM)
* Enhance UI/UX
* Add authentication & input validation

---

## 💡 Key Learnings

* Handling real-world datasets
* Impact of feature engineering on performance
* Avoiding data leakage
* Model comparison & evaluation
* Building and deploying full-stack ML applications

---

## 👨‍💻 Author

**Vansh Ahluwalia**
