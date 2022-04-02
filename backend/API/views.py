from rest_framework import viewsets
from rest_framework.decorators import action
from django.http import JsonResponse

from .serializers import HeatmapSerializer, UserSerializer, StoreProductSerializer, FactoryProductSerializer, \
    MachineSerializer, StoreCategoriesSerializer, FactoryCategoriesSerializer, StatStoreSerializer, \
    StatFactorySerializer, StoreShoppingSerializer
from .models import User, Heatmap, Machine, FactoryProduct, StoreProduct, StoreCategories, FactoryCategories, StatStore, \
    StatFactory, StoreShopping

import json


# class PersonViewSet(viewsets.ModelViewSet):
#     queryset = Person.objects.all().order_by('first_name')
#     serializer_class = PersonSerializer
#
#     @action(
#         methods=["get"],
#         detail=True,
#         url_path="first_name",
#         url_name="first-name",
#     )
#     def get_first_name(self, request, pk):
#         person = Person.objects.get(id=pk)
#         return JsonResponse(
#             {
#                 "first_name": person.first_name
#             },
#         )


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(
        methods=["get"],
        detail=True,
        url_path="get_user",
        url_name="get-user",
    )
    def get_user(self, request, pk):
        user = User.objects.get(nick=pk)
        return JsonResponse(
            {
                "nick": user.nick,
                "allergies": json.loads(user.allergies),
                "card_number": user.card_number
            },
        )


class HeatmapViewSet(viewsets.ModelViewSet):
    queryset = Heatmap.objects.all()
    serializer_class = HeatmapSerializer

    @action(
        methods=["get"],
        detail=True,
        url_path="get_heat",
        url_name="get-heat",
    )
    def get_heat(self, request, pk):
        heatmap = Heatmap.objects.get(date=pk)
        return JsonResponse(
            {
                "date": heatmap.date,
                "heatmap": json.loads(heatmap.heat_points)
            },
        )


class StoreProductViewSet(viewsets.ModelViewSet):
    queryset = StoreProduct.objects.all()
    serializer_class = StoreProductSerializer


class FactoryProductViewSet(viewsets.ModelViewSet):
    queryset = FactoryProduct.objects.all()
    serializer_class = FactoryProductSerializer


class MachineViewSet(viewsets.ModelViewSet):
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer


class StoreCategoriesViewSet(viewsets.ModelViewSet):
    queryset = StoreCategories.objects.all()
    serializer_class = StoreCategoriesSerializer


class FactoryCategoriesViewSet(viewsets.ModelViewSet):
    queryset = FactoryCategories.objects.all()
    serializer_class = FactoryCategoriesSerializer


class StatStoreViewSet(viewsets.ModelViewSet):
    queryset = StatStore.objects.all()
    serializer_class = StatStoreSerializer


class StatFactoryViewSet(viewsets.ModelViewSet):
    queryset = StatFactory.objects.all()
    serializer_class = StatFactorySerializer


class StoreShoppingViewSet(viewsets.ModelViewSet):
    queryset = StoreShopping.objects.all()
    serializer_class = StoreShoppingSerializer
