from django.db import models

# Create your models here.
class User(models.Model):
    id = models.CharField(primary_key=True)
    username = models.CharField(max_length=128)
    email = models.EmailField()

class Post(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=128)
    content = models.TextField()
    created_date = models.DateTimeField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')

