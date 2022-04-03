import datetime as dt
import json
from datetime import timedelta

import pytz
from django.db.models import Sum

from API.models import StatStore, StoreCategories


def date_range(start_date, end_date):
    if int((end_date - start_date).days) == 0:
        hours_delta = timedelta(hours=-23)
        loc_warsaw = pytz.timezone("Europe/Warsaw")
        utc_temp = dt.datetime.now(dt.timezone.utc) + hours_delta
        utc_temp = utc_temp.astimezone(loc_warsaw)

        new_start_date = dt.datetime(
            utc_temp.year,
            utc_temp.month,
            day=utc_temp.day,
            hour=utc_temp.hour,
            minute=0,
            second=0,

        )
        # period in hours
        for i in range(25):
            yield new_start_date + timedelta(hours=i)

    if int((end_date - start_date).days) == 1:
        # period in hours
        new_start_date = start_date
        for i in range(25):
            yield new_start_date + timedelta(hours=i)

    if int((end_date - start_date).days) >= 2:
        # period in days
        for n in range(int((end_date - start_date).days + 1)):
            yield start_date + timedelta(n)


def utc_notz_to_utc_tz(dt):
    return pytz.timezone("Europe/Warsaw").localize(dt, is_dst=None)


def get_day_stats_summary(
        period_begin=utc_notz_to_utc_tz(dt.datetime(year=1900, month=1, day=1)),
        period_end=None,
        id_=None,
):
    loc_warsaw = pytz.timezone("Europe/Warsaw")

    if period_end is None:
        utc_temp = dt.datetime.now(dt.timezone.utc)
        period_end = utc_temp.astimezone(loc_warsaw)

    period_begin = period_begin.astimezone(loc_warsaw)
    period_end = period_end.astimezone(loc_warsaw)

    stats = (
        StatStore.objects.values("category")
            .annotate(count=Sum("product_count"))
            .filter(
            machine=id_, date__gte=period_begin, date__lte=period_end
        )
            .exclude(machine=None)
    )
    return {s["category"]: s["count"] for s in stats}


def get_classes_dict(d_id=None):
    if d_id is not None:
        classes_ = list(StoreCategories.objects.filter(machine=d_id).order_by("id"))
    else:
        classes_ = list(StoreCategories.objects.all().order_by("id"))

    classes = {}
    for c in classes_:
        classes[c.id] = {"name": c.name}
    return classes


def get_date_range(period_begin, period_end, device_id):
    dateset = []
    data_sums = []

    for single_date in date_range(period_begin, period_end):
        if int((period_end - period_begin).days) <= 1:
            hour_delta = timedelta(hours=1)
            fmt = "%d.%m.%Y %H:%M:%S"
            data_sum = get_day_stats_summary(
                single_date, single_date + hour_delta, device_id
            )
            data_sums.append(data_sum)
            dateset.append(single_date.strftime(fmt))
        else:
            day_delta = timedelta(days=1)
            fmt = "%d.%m.%Y"
            data_sum = get_day_stats_summary(
                single_date, single_date + day_delta, device_id
            )
            data_sums.append(data_sum)
            dateset.append(single_date.strftime(fmt))

    return dateset, data_sums


def data_list_timeline(data_sum, classes):
    data = []
    first_id = list(classes.keys())[0]

    for i in range(len(classes)):
        data.append([])

    for sums in data_sum:
        for key in classes.keys():
            if key in sums.keys():
                data[key - first_id].append(sums.get(key))
            else:
                data[key - first_id].append(0)

    return data


def data_list_summary(data_sum, classes):
    data = []
    first_id = list(classes.keys())[0]

    for i in range(len(classes)):
        data.append(0)
    for sums in data_sum:
        for key in classes.keys():
            if key in sums.keys():
                data[key - first_id] += sums.get(key)

    return data


def classes_list(classes):
    class_list = []

    for key in classes.keys():
        class_list.append(classes[key]["name"])

    return class_list


def data_to_json(dateset, classes, data):
    data_dict = {"dates": dateset, "classes": classes, "values": data}

    data_jsoned = json.dumps(data_dict)

    return data_jsoned


def create_timeline(begin, end, device_id):
    dateset, data_sum = get_date_range(begin, end, device_id)

    classes = get_classes_dict(d_id=device_id)

    data = data_list_timeline(data_sum, classes)

    class_list = classes_list(classes)

    jsoned = data_to_json(dateset, class_list, data)

    return jsoned


def create_summary(begin, end, device_id):
    dateset, data_sum = get_date_range(begin, end, device_id)

    classes = get_classes_dict(d_id=device_id)

    data = data_list_summary(data_sum, classes)

    class_list = classes_list(classes)

    jsoned = data_to_json(dateset, class_list, data)

    return jsoned


def get_period_range(_range):
    if _range is not None:
        dt_date = []
        time_range = _range.split(" - ")

        format_str = "%d.%m.%Y"  # The format
        for date_str in time_range:
            datetime_obj = dt.datetime.strptime(date_str, format_str)
            dt_date.append(datetime_obj)

        period_begin = dt_date[0]
        period_end = dt_date[1]
    else:
        # create today
        period_begin = dt.datetime.utcnow()
        period_begin = period_begin.replace(minute=0, second=0)
        period_end = period_begin
    return period_begin, period_end
