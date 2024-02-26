import numpy as np
import time
from statistics import mode
import pandas as pd
import requests
# Import the required library
from geopy.geocoders import Nominatim, GeoNames
# from firebase import Firebase

import asyncio
import aiohttp
import json

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

def get_cities(country):
    if country in countryCities:
        return countryCities[country]
    

    username = 'martinoravec'  # Replace with your GeoNames username
    url = f'http://api.geonames.org/searchJSON?country={country}&featureClass=P&maxRows=10&username={username}'
    
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        cities = [item['name'] for item in data['geonames']]
        countryCities[country] = cities
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
    url = 'https://brishack-f6111-default-rtdb.europe-west1.firebasedatabase.app/users.json'
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

while True:
    count += 1

    nation = np.random.choice(nation_happiness['Country name'])
    nation_happiness_score = nation_happiness[nation_happiness['Country name'] == nation]['Ladder score'].values[0]

    # Random City
    cities = get_cities(nation)
    print(cities)
    city =  np.random.choice(cities)

    emotion = simulate_emotion(nation_happiness_score/10)

    # location = np.random.choice(list(city_happiness.keys()))
    # emotion = simulate_emotion(city_happiness[location])
    # print(f"Simulated emotion in {location}: {emotion}")
    if location not in locationDict:
        locationDict[location] = geolocator.geocode(location)
    else:
        location = locationDict[location]
    # location = geolocator.geocode(location)
    # add_map_data({'latitude': 0, 'longitude': 0}, 'user', emotion)
    time.sleep(1e-3)
    if count % 100 == 0:
        print(f"Simulated {count} emotions")
    

print("The latitude of the location is: ", location.latitude)
print("The longitude of the location is: ", location.longitude)

# Simulate emotion based on city happiness score
# For demonstration, using a static value. Replace with actual happiness score retrieval
happiness_score = city_happiness.get(user_input, 0.5)  # Fallback to a neutral score if city is unknown
simulated_emotion = simulate_emotion(happiness_score)

# Asynchronously add simulated data to Firebase
geopoint = {'latitude': location.latitude, 'longitude': location.longitude}
emotion_string = simulated_emotion

# Call the existing asynchronous function to add data to Firebase
import asyncio
asyncio.run(add_map_data(geopoint, 'user', emotion_string))
