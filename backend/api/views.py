import random
from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Post
from .serializers import UserSerializer, PostSerializer

# Create your views here.
@api_view(['POST'])
def add_post(request):
    if request.method == 'POST':
        print(request.data)
        title = request.data['title']
        content = request.data['content']
        created_date = request.data['createdDate']
        author_id = request.data['author']
        author = User.objects.get(id=author_id)

        saved_post = Post.objects.create(title=title, content=content, created_date=created_date, author=author)
        return Response({'message': 'Post added successfully'}, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_posts(request):
    if request.method == 'GET':
        posts = Post.objects.select_related('author').all()
        serialized_posts = PostSerializer(posts, many=True).data
        return JsonResponse(serialized_posts, safe=False, status=status.HTTP_200_OK)

@api_view(['POST'])
def add_user(request):
    if request.method == 'POST':
        print(request.data)

        uid = request.data['id']
        email = request.data['email']
        random_number = random.randint(10000, 99999)
        username = f'user-{random_number}'

        user = User.objects.filter(id=uid).first()
        if user:
            serialized_user = UserSerializer(user).data
            print(serialized_user)
            return JsonResponse(serialized_user, safe=False, status=status.HTTP_200_OK)

        saved_user = User.objects.create(id=uid, username=username, email=email)

        print(saved_user)
        return Response({'message': 'User added successfully'}, status=status.HTTP_200_OK)

