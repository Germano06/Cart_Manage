# Generated by Django 4.2.6 on 2023-10-20 09:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.RenameModel(
            old_name="Admin",
            new_name="Admins",
        ),
    ]
