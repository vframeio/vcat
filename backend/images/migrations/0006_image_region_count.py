# Generated by Django 2.0.1 on 2018-03-23 15:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('images', '0005_image_annotated'),
    ]

    operations = [
        migrations.AddField(
            model_name='image',
            name='region_count',
            field=models.IntegerField(default=0),
        ),
    ]
