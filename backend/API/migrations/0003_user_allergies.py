# Generated by Django 4.0.3 on 2022-04-02 18:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0002_heatmap_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='allergies',
            field=models.JSONField(null=True),
        ),
    ]
