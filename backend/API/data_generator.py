import datetime
from random import randrange

from API.models import StatStore, StatFactory

from calendar import month
import datetime
from unicodedata import category

from API.models import User

from backend.API.models import Heatmap


def build_it():
    # time_zero = datetime.datetime(2022, 3, 27)
    #
    # while str(time_zero) != '2022-04-04 00:00:00':
    #     for i in range(3):
    #         stat = Heatmap()
    #         stat.save()
    #     time_zero += datetime.timedelta(hours=1)

    # u = User(nick='Jan', password_hash="JD", phone_number="471691313", allergies=["gluten", "orzechy"],
    #          card_number=1234567)
    # u.save()
    # u1 = User(nick='Mark', password_hash="JD1", phone_number="784241248", allergies=["jajka"], card_number=1961284)
    # u1.save()
    # u2 = User(nick='Kowalski', password_hash="JD3", phone_number="662145992", allergies=[], card_number=991277)
    # u2.save()
    #
    # from API.models import Heatmap
    #
    # from API.models import Machine
    #
    # start_date = datetime.datetime(2022, 4, 2, 12, 00, 00, 00)
    # m1 = Machine(name="FM01", start_date=start_date,
    #              end_date=datetime.datetime(2022, 4, 2, 8, 00, 00, 00),
    #              service_date=(start_date + datetime.timedelta(weeks=24)))
    # m1.save()
    #
    # start_date = datetime.datetime(2022, 3, 2, 10, 00, 00, 00)
    # m2 = Machine(name="FM02", start_date=start_date,
    #              end_date=datetime.datetime(2022, 3, 2, 8, 00, 00, 00),
    #              service_date=(start_date + datetime.timedelta(weeks=24)))
    # m2.save()
    # start_date = datetime.datetime(2022, 4, 5, 14, 00, 00, 00)
    # m3 = Machine(name="FM03", start_date=start_date,
    #              end_date=datetime.datetime(2022, 4, 5, 10, 00, 00, 00),
    #              service_date=(start_date + datetime.timedelta(weeks=24)))
    # m3.save()
    #
    # from API.models import StoreCategories
    #
    # cat1 = StoreCategories(name="Alkohole")
    # cat1.save()
    # cat2 = StoreCategories(name="Nabial")
    # cat2.save()
    # cat3 = StoreCategories(name="Slodycze")
    # cat3.save()
    # cat4 = StoreCategories(name="Napoje")
    # cat4.save()
    #
    # from API.models import StoreProduct
    #
    # p1 = StoreProduct(name="Snickers", category=cat3, allergens="orzechy", price=3.29)
    # p1.save()
    # p2 = StoreProduct(name="Woda", category=cat4, allergens="", price=1.89)
    # p2.save()
    # p3 = StoreProduct(name="Mleko", category=cat2, allergens="laktoza", price=2.99)
    # p3.save()
    # p4 = StoreProduct(name="Jogurt", category=cat2, allergens="laktoza", price=4.59)
    # p4.save()
    #
    # from API.models import FactoryCategories
    #
    # fc1 = FactoryCategories(name="dobre")
    # fc1.save()
    # fc2 = FactoryCategories(name="zla nakretka")
    # fc2.save()
    # fc3 = FactoryCategories(name="zle")
    # fc3.save()
    # fc4 = FactoryCategories(name="krowa byla bykiem")
    # fc4.save()
    #
    # from API.models import FactoryProduct
    #
    # fp1 = FactoryProduct(name="Mleko", category=fc2)
    # fp1.save()
    # fp2 = FactoryProduct(name="Jogurt", category=fc1)
    # fp2.save()
    # fp3 = FactoryProduct(name="Butelka", category=fc1)
    # fp3.save()
    # fp4 = FactoryProduct(name="Mleko", category=fc4)
    # fp4.save()
    #
    # from API.models import StatStore
    #
    # s_stats1 = StatStore(product_count=12, category=cat3, date=datetime.datetime(2022, 4, 2, 12, 30, 00, 00))
    # s_stats1.save()
    # s_stats2 = StatStore(product_count=3, category=cat1, date=datetime.datetime(2022, 1, 2, 18, 30, 00, 00))
    # s_stats2.save()
    # s_stats3 = StatStore(product_count=80, category=cat4, date=datetime.datetime(2022, 3, 23, 11, 30, 00, 00))
    # s_stats3.save()
    #
    # from API.models import StatFactory
    #
    # f_stats1 = StatFactory(count=3, machine=m2, product=fp2, category=fc3, serial_num=234411,
    #                        date=datetime.datetime(2022, 1, 12, 14, 30, 00, 00))
    # f_stats1.save()
    # f_stats2 = StatFactory(count=12, machine=m1, product=fp4, category=fc1, serial_num=761411,
    #                        date=datetime.datetime(2022, 2, 18, 14, 30, 00, 00))
    # f_stats2.save()
    # f_stats3 = StatFactory(count=9, machine=m3, product=fp3, category=fc2, serial_num=919191,
    #                        date=datetime.datetime(2022, 4, 1, 8, 10, 00, 00))
    # f_stats3.save()
    #
    # time_zero = datetime.datetime(2022, 3, 27)
    #
    # while str(time_zero) != '2022-04-04 00:00:00':
    #     for i in range(3):
    #         stat = StatStore(product_count=randrange(1000), product=StoreProduct.objects.get(id=randrange(5) + 1),
    #                          machine=Machine.objects.get(id=randrange(4) + 1),
    #                          category=StoreCategories.objects.get(id=randrange(5) + 1), date=time_zero)
    #         stat.save()
    #     time_zero += datetime.timedelta(hours=1)
    #
    # time_zero = datetime.datetime(2022, 3, 27)
    #
    # serial = 256
    # while str(time_zero) != '2022-04-04 00:00:00':
    #     for i in range(3):
    #         stat = StatFactory(count=randrange(1000), product=FactoryProduct.objects.get(id=randrange(5) + 1), machine=Machine.objects.get(id=randrange(4) + 1),
    #                            category=FactoryCategories.objects.get(id=randrange(5) + 1), date=time_zero, serial_num=serial)
    #         stat.save()
    #     serial += 1
    #     time_zero += datetime.timedelta(hours=1)
