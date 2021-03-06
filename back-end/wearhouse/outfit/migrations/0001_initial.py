
# Generated by Django 2.2.6 on 2019-11-16 05:55


from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('item', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Outfit',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image_link', models.CharField(max_length=200)),
                ('date', models.DateField()),
                ('satisfaction', models.IntegerField(verbose_name=range(0, 5))),
                ('items', models.ManyToManyField(related_name='item_list', to='item.Item')),
            ],
        ),
    ]
