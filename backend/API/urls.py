from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'heatmaps', views.HeatmapViewSet)
router.register(r'store_products', views.StoreProductViewSet)
router.register(r'factory_products', views.FactoryProductViewSet)
router.register(r'machines', views.MachineViewSet)
router.register(r'store_categories', views.StoreCategoriesViewSet)
router.register(r'factory_categories', views.FactoryCategoriesViewSet)
router.register(r'stat_store', views.StatStoreViewSet)
router.register(r'stat_factory', views.StatFactoryViewSet)
# router.register(r'store_shopping', views.StoreShoppingViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]