import time
import requests
import random
from faker import Faker
from datetime import datetime, timezone

fake = Faker()

API_URL = "http://localhost:5000/api/gps"

def generate_gps_data():
    if not hasattr(generate_gps_data, "counter"):
        generate_gps_data.counter = 1

    vehicle_id = f"V{generate_gps_data.counter:03d}"

    data = {
        "vehicle_id": vehicle_id,
        "lat": float(fake.latitude()),
        "lng": float(fake.longitude()),
        "speed": random.randint(20, 80),
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

    generate_gps_data.counter += 1
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
        time.sleep(3)

if __name__ == "__main__":
    simulate()
