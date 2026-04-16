import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

data = pd.read_csv("data.csv")

data = data.drop("Metro station", axis=1)
data = pd.get_dummies(data, columns=["Apartment type", "Region", "Renovation"])
bool_cols = data.select_dtypes(include=['bool']).columns
data[bool_cols] = data[bool_cols].astype(int)
data = data.astype({col: int for col in data.select_dtypes(include=['bool']).columns})

X = data.drop('Price', axis=1)
y = data['Price']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LinearRegression()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
r2 = r2_score(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
print(f"R² (качество модели): {r2:.4f}")  # Чем ближе к 1, тем лучше
print(f"RMSE (ошибка в единицах цены): {rmse:.2f}")

print(data.info())
print(model.coef_)
print(model.intercept_)

print(data["Area"].min())
print(data["Area"].max())