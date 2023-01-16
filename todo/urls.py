from django.urls import path
from . import views

urlpatterns = [
    path('', views.index,name='index'),
    path('add/', views.add, name='add'),
    path('todolist/', views.todolist, name='todolist'),
    path('deletion_mode/', views.deletion_mode, name='deletion_mode'),
]