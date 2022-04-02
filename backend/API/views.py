from rest_framework import viewsets
from rest_framework.decorators import action
from django.http import JsonResponse

from .serializers import HeatmapSerializer, UserSerializer, StoreProductSerializer, FactoryProductSerializer, \
    MachineSerializer
from .models import User, Heatmap, Machine, FactoryProduct, StoreProduct

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
        url_path="nick",
        url_name="nick",
    )
    def get_nick(self, request, pk):
        user = User.objects.get(nick=pk)
        return JsonResponse(
            {
                "nick": user.nick,
                "allergies": json.loads(user.allergies)
            },
        )


class HeatmapViewSet(viewsets.ModelViewSet):
    queryset = Heatmap.objects.all()
    serializer_class = HeatmapSerializer


class StoreProductViewSet(viewsets.ModelViewSet):
    queryset = StoreProduct.objects.all()
    serializer_class = StoreProductSerializer


class FactoryProductViewSet(viewsets.ModelViewSet):
    queryset = FactoryProduct.objects.all()
    serializer_class = FactoryProductSerializer


class MachineViewSet(viewsets.ModelViewSet):
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer
