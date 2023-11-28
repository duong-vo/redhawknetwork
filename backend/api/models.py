from django.db import models

# Create your models here.
class User(models.Model):
    id = models.CharField(primary_key=True)
    username = models.CharField(max_length=128)
    email = models.EmailField()

class UserFollowing(models.Model):
    uid = models.ForeignKey(User, on_delete=models.CASCADE, related_name="following")
    following_user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="followers")

class Post(models.Model):
    GAMING = 'GAMING'
    CAREER = 'CAREER'
    SCHOOL = 'SCHOOL'
    STUDENT_ORGS = 'STUDENT ORGANIZATIONS'
    OTHER = 'OTHER'

    CHOICES = [
        (GAMING, 'GAMING'),
        (CAREER, 'CAREER'),
        (SCHOOL, 'SCHOOL'),
        (STUDENT_ORGS, 'STUDENT ORGANIZATIONS'),
    ]

    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=128)
    content = models.TextField()
    created_date = models.DateTimeField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    category = models.CharField(max_length=25, choices=CHOICES, default=OTHER)

class Reaction(models.Model):
    LIKE = 'like'
    DISLIKE = 'dislike'

    REACTION_CHOICES = [
        (LIKE, 'Like'),
        (DISLIKE, 'Dislike'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='reactions')
    reaction_type = models.CharField(max_length=10, choices=REACTION_CHOICES)

class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    created_date = models.DateTimeField()
