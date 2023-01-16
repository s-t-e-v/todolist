from django.urls import path
from . import views

urlpatterns = [
    path('', views.index,name='index'),
    path('add/', views.add, name='add'),
    path('display_todolist/', views.display_todolist, name='display_todolist'),
]