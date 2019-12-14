# Generated by Django 2.2.6 on 2019-12-12 20:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('outfit', '0012_auto_20191212_1955'),
    ]

    operations = [
        migrations.AddField(
            model_name='outfit',
            name='dateWithTime',
            field=models.CharField(default='', max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='outfit',
            name='date',
            field=models.DateField(null=True),
        ),
        migrations.AlterField(
            model_name='outfit',
            name='tempAvg',
            field=models.IntegerField(default=100, null=True),
        ),
    ]
