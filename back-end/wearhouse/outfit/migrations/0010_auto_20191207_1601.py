# Generated by Django 2.2.6 on 2019-12-07 07:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('outfit', '0009_auto_20191207_1600'),
    ]

    operations = [
        migrations.AlterField(
            model_name='outfit',
            name='dateWithTime',
            field=models.CharField(default='', max_length=20, null=True),
        ),
    ]
