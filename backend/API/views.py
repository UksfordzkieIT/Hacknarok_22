from datetime import datetime

from rest_framework import viewsets
from rest_framework.decorators import action
from django.http import JsonResponse, HttpResponse

# import API.chart_data_store
# import API.chart_data_factory

from . import data_generator, chart_data_store, chart_data_factory
from .serializers import HeatmapSerializer, UserSerializer, StoreProductSerializer, FactoryProductSerializer, \
    MachineSerializer, StoreCategoriesSerializer, FactoryCategoriesSerializer, StatStoreSerializer, \
    StatFactorySerializer, StoreShoppingSerializer
from .models import User, Heatmap, Machine, FactoryProduct, StoreProduct, StoreCategories, FactoryCategories, StatStore, \
    StatFactory, StoreShopping

import json


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
        # data_generator.build_it()
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

    @action(
        methods=["get"],
        detail=True,
        url_path="get_machine_data",
        url_name="get-machine-data",
    )
    def get_machine_data(self, request, pk):
        machine = Machine.objects.get(id=pk)

        work_time = datetime.now() - machine.start_date

        product = StatFactory.objects.order_by('date').filter(Machine=pk).latest('product')
        product = FactoryProduct.objects.get(id=product)

        last_date = StatFactory.objects.order_by('date').filter(Machine=pk).latest('date')

        count = StatFactory.objects.filter(date=last_date).count('count')

        minute_rate = count / 60

        return JsonResponse(
            {
                "name": machine.name,
                "product": product,
                "count": count,
                "minute_rate": minute_rate,
                "production_start": machine.start_date,
                "work_time": work_time,
                "service_date": machine.service_date
            },
        )


class StoreCategoriesViewSet(viewsets.ModelViewSet):
    queryset = StoreCategories.objects.all()
    serializer_class = StoreCategoriesSerializer


class FactoryCategoriesViewSet(viewsets.ModelViewSet):
    queryset = FactoryCategories.objects.all()
    serializer_class = FactoryCategoriesSerializer


class StatStoreViewSet(viewsets.ModelViewSet):
    queryset = StatStore.objects.all()
    serializer_class = StatStoreSerializer

    @action(
        methods=["get"],
        detail=True,
        url_path="get_stat_timeline_store",
        url_name="get-stat-timeline-store",
    )
    def get_store_timeline_data(self, request, pk, _range=None):
        # store_stats = StatStore.objects.get(id=pk)

        _range = self.request.query_params.get("params", None)

        period_begin, period_end = chart_data_store.get_period_range(_range)

        data = chart_data_store.create_timeline(period_begin, period_end, pk)

        return HttpResponse(data, content_type='application/json')

    @action(
        methods=["get"],
        detail=True,
        url_path="get_stat_summary_store",
        url_name="get-stat-summary-store",
    )
    def get_store_summary_data(self, request, pk):
        # store_stats = StatStore.objects.get(id=pk)

        _range = self.request.query_params.get("params", None)

        period_begin, period_end = chart_data_store.get_period_range(_range)

        data = chart_data_store.create_summary(period_begin, period_end, pk)

        return HttpResponse(data, content_type='application/json')


class StatFactoryViewSet(viewsets.ModelViewSet):
    queryset = StatFactory.objects.all()
    serializer_class = StatFactorySerializer


    @action(
        methods=["get"],
        detail=True,
        url_path="get_stat_timeline_factory",
        url_name="get-stat-timeline-factory",
    )
    def get_factory_timeline_data(self, request, pk):
        # store_stats = StatStore.objects.get(id=pk)

        _range = self.request.query_params.get("params", None)

        period_begin, period_end = chart_data_factory.get_period_range(_range)

        data = chart_data_factory.create_timeline(period_begin, period_end, pk)

        return HttpResponse(data, content_type='application/json')


    @action(
        methods=["get"],
        detail=True,
        url_path="get_stat_summary_factory",
        url_name="get-stat-summary-factory",
    )
    def get_factory_summary_data(self, request, pk):
        # store_stats = StatStore.objects.get(id=pk)

        _range = self.request.query_params.get("params", None)

        period_begin, period_end = chart_data_factory.get_period_range(_range)

        data = chart_data_factory.create_summary(period_begin, period_end, pk)

        return HttpResponse(data, content_type='application/json')


# class StoreShoppingViewSet(viewsets.ModelViewSet):
#     queryset = StoreShopping.objects.all()
#     serializer_class = StoreShoppingSerializer
