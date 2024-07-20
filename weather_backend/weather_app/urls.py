from django.urls import path
from .views import get_weather, get_forecast

urlpatterns = [
    path('weather/', get_weather, name='get_weather'),
    path('forecast/', get_forecast, name='get_forecast'),
]