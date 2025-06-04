import time
import requests
from collections import defaultdict

API_GET_URL = "http://localhost:5000/api/traffic"
API_POST_URL = "http://localhost:5000/api/congestion"

VEHICLE_THRESHOLD = 3

def group_by_area(gps_data, precision=1):
    area_groups = defaultdict(list)
    for data in gps_data:
        lat = round(data['lat'], precision)
        lng = round(data['lng'], precision)
        key = f"{lat}_{lng}"                  # areaId string
        area_groups[key].append(data)
    return area_groups 

def get_congestion_level(count):
    if count <= 3:
        return "Low"
    elif count <= 6:
        return "Moderate"
    else:
        return "High"

while True:
    try:
        res = requests.get(API_GET_URL)
        gps_data = res.json()

        areas = group_by_area(gps_data)

        for area_id, vehicles in areas.items():
            vehicle_count = len(vehicles)

            total_speed = sum(vehicle.get('speed', 0) for vehicle in vehicles)
            avg_speed = total_speed / vehicle_count if vehicle_count > 0 else 0

            level = get_congestion_level(vehicle_count)

            congestion_entry = {
                "areaId": area_id,
                "vehicleCount": vehicle_count,
                "avgSpeed": round(avg_speed, 2),
                "congestionLevel": level,
                "congestionScore": round(100 - avg_speed, 2)
            }

            post_res = requests.post(API_POST_URL, json=congestion_entry)
            if post_res.status_code == 200:
                print(f" {area_id} → {level} congestion ({vehicle_count} vehicles)")
            else:
                print(f" Failed to post for {area_id}: {post_res.text}")

    except Exception as e:
        print("Error:", e)

    time.sleep(5)
