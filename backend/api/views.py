import random
from django.shortcuts import render
from django.http.response import JsonResponse
from django.contrib.postgres.search import SearchVector, SearchQuery, SearchRank
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Post, Reaction, Comment
from .serializers import UserSerializer, PostSerializer, ReactionSerializer, CommentSerializer

def serialize_post(post):
    post_data = PostSerializer(post).data
    reactions = post.reactions.all()
    serialized_reactions = ReactionSerializer(reactions, many=True).data
    comments = post.comments.all()
    serialized_comments = CommentSerializer(comments, many=True).data
    post_data['reactions'] = serialized_reactions
    post_data['comments'] = serialized_comments
    return post_data

# Create your views here.
@api_view(['POST'])
def add_post(request):
    if request.method == 'POST':
        title = request.data['title']
        content = request.data['content']
        created_date = request.data['createdDate']
        author_id = request.data['author']
        category = request.data['category']
        author = User.objects.get(id=author_id)

        saved_post = Post.objects.create(title=title, content=content, created_date=created_date, author=author, category=category)
        return Response({'message': 'Post added successfully'}, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_posts(request):
    if request.method == 'GET':
        posts = Post.objects.all()
        serialized_posts = [serialize_post(post) for post in posts]
        return JsonResponse(serialized_posts, safe=False, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_post(request, id):
    if request.method == 'GET':
        post = Post.objects.get(id=id)
        serialized_post = serialize_post(post)
        return JsonResponse(serialized_post, safe=False, status=status.HTTP_200_OK)

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

@api_view(['POST'])
def add_react(request):
    if request.method == 'POST':
        uid = request.data['uid']
        post_id = request.data['post_id']
        type = request.data['type']
        user = User.objects.get(id=uid)
        post = Post.objects.get(id=post_id)
        try:
            # Try to get an existing reaction for the user and post
            existing_reaction = Reaction.objects.get(user=user, post=post)

            # If the existing reaction is of the same type, delete it (toggle off)
            if existing_reaction.reaction_type == type:
                existing_reaction.delete()
            else:
                # If the existing reaction is of a different type, update it (toggle on)
                existing_reaction.reaction_type = type
                existing_reaction.save()
        except Reaction.DoesNotExist:
            # If no existing reaction, create a new one
            Reaction.objects.create(user=user, post=post, reaction_type=type)
        return Response({'message': 'Reaction created/updated'}, status=status.HTTP_200_OK)

@api_view(['POST'])
def add_comment(request):
    if request.method == 'POST':
        print(request.data)
        uid = request.data['uid']
        post_id = request.data['post_id']
        user = User.objects.get(id=uid)
        post = Post.objects.get(id=post_id)
        content = request.data['content']
        created_date = request.data['created_date']
        Comment.objects.create(user=user, post=post, content=content, created_date=created_date)
        return Response({'message': 'Comment created' }, status = status.HTTP_200_OK)

@api_view(['GET'])
def search(request):
    if request.method == 'GET':
        print(request.GET['query'])
        query = request.GET['query']
        if query:
            vector = SearchVector('title', 'content')
            q = SearchQuery(query)
            posts = Post.objects.annotate(rank=SearchRank(vector, query)).filter(rank__gte=0.001).order_by('-rank')
            serialized_posts = [serialize_post(post) for post in posts]
            return JsonResponse(serialized_posts, safe=False, status = status.HTTP_200_OK)
        posts = Post.objects.all()
        serialized_posts = [serialize_post(post) for post in posts]
        return JsonResponse(serialized_posts, safe=False, status=status.HTTP_200_OK)
