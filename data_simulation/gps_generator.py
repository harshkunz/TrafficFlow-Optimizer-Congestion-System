import time
import requests
import random
import string
from faker import Faker
from datetime import datetime, timezone

fake = Faker()

API_URL = "http://localhost:5000/api/traffic"

def generate_vehicle_id():
    letters = ''.join(random.choices(string.ascii_uppercase, k=3))
    digits = ''.join(random.choices(string.digits, k=3))
    return letters + digits

def generate_gps_data():
    lat = round(random.uniform(28.40, 28.90), 3)
    lng = round(random.uniform(76.80, 77.40), 3)

    data = {
        "vehicle_id": generate_vehicle_id(),
        "lat": lat,
        "lng": lng,
        "speed": random.randint(20, 80),
        "timestamp": datetime.now(timezone.utc).isoformat()
    }
    return data

def send_data_to_api(data):
    try:
        response = requests.post(API_URL, json=data)
        print(f"[{response.status_code}] Sent: {data}")
    except Exception as e:
        print(f"Error sending data: {e}")

def simulate():
    while True:
        data = generate_gps_data()
        send_data_to_api(data)
        time.sleep(2)

if __name__ == "__main__":
    simulate()
