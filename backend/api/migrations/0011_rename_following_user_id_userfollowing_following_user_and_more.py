# Generated by Django 4.2.7 on 2023-11-29 17:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_userfollowing'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userfollowing',
            old_name='following_user_id',
            new_name='following_user',
        ),
        migrations.RenameField(
            model_name='userfollowing',
            old_name='uid',
            new_name='user',
        ),
    ]