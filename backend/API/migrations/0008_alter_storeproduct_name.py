# Generated by Django 4.0.3 on 2022-04-03 04:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0007_alter_storeproduct_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='storeproduct',
            name='name',
            field=models.CharField(max_length=30),
        ),
    ]