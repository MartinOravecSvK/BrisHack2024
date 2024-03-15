import numpy as np
import time
import os
from dotenv import load_dotenv
from statistics import mode
import pandas as pd
import requests
import pycountry

# Import the required library
from geopy.geocoders import Nominatim, GeoNames
# from firebase import Firebase

import asyncio
import aiohttp
import json

load_dotenv()
URL = os.getenv('DATABASE_URL')
USERNAME = "REPLACE ME" # Replace with your GeoNames username

geolocator = Nominatim(user_agent="MyApp")

nation_happiness = pd.read_excel('DataForFigure2.1WHR2023.xls')
nation_happiness = nation_happiness[['Country name', 'Ladder score']]

locationDict = {}
countryCities = {}

# Assuming this mapping exists; adjust as necessary based on actual data
# city_happiness = {
#     "CityA": 0.9,
#     "CityB": 0.2
# }

# Some countries did not have a mapping in pycountry, so we added them manually
custom_country_mappings = {
    "Kosovo": {"alpha_2": "XK", "alpha_3": "XKX", "name": "Kosovo"},
    "Taiwan": {"alpha_2": "TW", "alpha_3": "TWN", "name": "Taiwan"},
    "Venezuela": {"alpha_2": "VE", "alpha_3": "VEN", "name": "Venezuela, Bolivarian Republic of"},
    "Turkey": {"alpha_2": "TR", "alpha_3": "TUR", "name": "Turkey"},
    "South Korea": {"alpha_2": "KR", "alpha_3": "KOR", "name": "South Korea"},
    "Laos": {"alpha_2": "LA", "alpha_3": "LAO", "name": "Laos"},
    "Tanzania": {"alpha_2": "TZ", "alpha_3": "TZA", "name": "Tanzania"},
    "Moldova": {"alpha_2": "MD", "alpha_3": "MDA", "name": "Moldova"},
    "Bolivia": {"alpha_2": "BO", "alpha_3": "BOL", "name": "Bolivia"},
    "Russia": {"alpha_2": "RU", "alpha_3": "RUS", "name": "Russia"},
    "Ivory Coast": {"alpha_2": "CI", "alpha_3": "CIV", "name": "Ivory Coast"},
    "Vietnam": {"alpha_2": "VN", "alpha_3": "VNM", "name": "Vietnam"},
    "Iran": {"alpha_2": "IR", "alpha_3": "IRN", "name": "Iran"},
    "Palestine": {"alpha_2": "PS", "alpha_3": "PSE", "name": "Palestine"},
}

def get_country_codes(country_name):
    country = pycountry.countries.get(name=country_name)
    if country:
        # print(country.alpha_2, country.alpha_3)
        return country.alpha_2, country.alpha_3
    else:
        if country_name in custom_country_mappings:
            # print(custom_country_mappings[country_name]["alpha_2"], custom_country_mappings[country_name]["alpha_3"])
            return custom_country_mappings[country_name]["alpha_2"], custom_country_mappings[country_name]["alpha_3"]
        else:
            return None, None

def get_cities(country):
    if country in countryCities:
        return countryCities[country]
    
    country_code, _ = get_country_codes(country)

    username = USERNAME 
    url = f'http://api.geonames.org/searchJSON?country={country_code}&featureClass=P&maxRows=10&username={username}'
    
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        cities = [item['name'] for item in data['geonames']]
        countryCities[country] = cities[:]
        return cities
    else:
        return "Failed to retrieve data"


def adjust_emotion_probs(happiness_score):
    base_emotion_probs = {"angry": 0.2, "sad": 0.2, "happy": 0.2, "surprise": 0.2, "neutral": 0.2}
    adjusted_probs = base_emotion_probs.copy()
    adjusted_probs["happy"] += happiness_score * 0.2
    adjusted_probs["sad"] -= happiness_score * 0.1
    adjusted_probs["angry"] -= happiness_score * 0.1
    total_prob = sum(adjusted_probs.values())
    adjusted_probs = {emotion: prob / total_prob for emotion, prob in adjusted_probs.items()}
    return adjusted_probs

def simulate_emotion(happiness_score):
    emotion_probs = adjust_emotion_probs(happiness_score)
    emotions, probabilities = zip(*emotion_probs.items())
    emotion = np.random.choice(emotions, p=probabilities)
    return emotion


async def add_map_data(geopoint, user_name, emotion_string):
    url = URL
    data = {
        'geopoint': geopoint,
        'emotion': emotion_string
    }
    async with aiohttp.ClientSession() as session:
        async with session.post(url, data=json.dumps(data), headers={'Content-Type': 'application/json'}) as response:
            if response.status == 200:
                data = await response.json()
                print('Data saved:', data)
            else:
                print('Failed to save data')

count = 0

start_time = time.time()
while True:
    count += 1

    nation = np.random.choice(nation_happiness['Country name'])
    nation_happiness_score = nation_happiness[nation_happiness['Country name'] == nation]['Ladder score'].values[0]

    
    # Time get_cities execution
    # start = time.time()
    # Random City
    cities = get_cities(nation)
    # end = time.time()
    # print(f"Time to get cities for {nation}: {end - start}")

    if (cities == []):
        print(nation, " has no cities")
        continue
    city =  np.random.choice(cities)

    # Time simulate_emotion execution
    # start = time.time()
    # Simulate emotion based on city happiness score
    emotion = simulate_emotion(nation_happiness_score/10)
    # end = time.time()
    # print(f"Time to simulate emotion for {nation}: {end - start}")

    # Time geolocator.geocode execution
    # start = time.time()
    location = city + ", " + nation
    if location not in locationDict:
        locationDict[location] = geolocator.geocode(location)
        location = locationDict[location]
    else:
        location = locationDict[location]
    # end = time.time()
    # print(f"Time to geocode for {nation}: {end - start}")



    # Uncomment the add_map_data line to add data to Firebase
    # Asynchronously add simulated data to Firebase)
    try:
        if location is None:
            continue
        l = geolocator.geocode(location)
        # asyncio.run(add_map_data((l.latitude,l.longitude), 'user', emotion))
        print(f"Location: {location}, Emotion: {emotion}")
        # print(f"latitude: {l.latitude}, longitude: {l.longitude}")
    except Exception as e:
        print(e)



    if count % 100 == 0:
        end_time = time.time()
        print(f"Time to simulate {count} emotions: {end_time - start_time}")
        # print(locationDict)
        start_time = time.time()
