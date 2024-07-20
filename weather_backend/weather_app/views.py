import requests
from django.http import JsonResponse

WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather"
FORECAST_API_URL = "https://api.openweathermap.org/data/2.5/forecast"
API_KEY = "a80a9c249de1bc35f50024f94ad1b4a6"

def get_weather(request):
    city = request.GET.get('city')
    units = request.GET.get('units', 'metric')
    if not city:
        return JsonResponse({"error": "City is required"}, status=400)

    try:
        response = requests.get(WEATHER_API_URL, params={
            'q': f'{city},US',
            'appid': API_KEY,
            'units': units
        })
        data = response.json()
        return JsonResponse(data)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

def get_forecast(request):
    city = request.GET.get('city')
    units = request.GET.get('units', 'metric')
    if not city:
        return JsonResponse({"error": "City is required"}, status=400)

    try:
        response = requests.get(FORECAST_API_URL, params={
            'q': f'{city}, US',
            'appid': API_KEY,
            'units': units
        })

        data = response.json()
        return JsonResponse(data)
    
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)