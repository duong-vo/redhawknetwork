"""
URL configuration for redhawknetwork project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from api import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/post/add', views.add_post),
    path('api/user/add', views.add_user),
    path('api/posts', views.get_posts),
    path('api/posts/<int:id>', views.get_post),
    path('api/reaction/add', views.add_react),
    path('api/comment/add', views.add_comment),
    path('api/search/', views.search),
    path('api/user/<int:id>', views.get_user)
]
