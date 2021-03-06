# Generated by Django 2.0.1 on 2018-09-27 14:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Document',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sha256', models.CharField(db_index=True, max_length=64)),
                ('data', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='DocumentTag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=256)),
            ],
        ),
        migrations.AddField(
            model_name='document',
            name='tag',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='vsearch.DocumentTag'),
        ),
    ]
