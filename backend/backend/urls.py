from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from API import views

router = routers.DefaultRouter()
router.register(r"users", views.UserViewSet)
router.register(r"heatmap", views.HeatmapViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('API.urls')),
]
