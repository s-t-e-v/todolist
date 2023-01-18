from django.urls import path
from . import views

urlpatterns = [
    path('', views.index,name='index'),
    path('add/', views.add, name='add'),
    path('todolist/', views.todolist, name='todolist'),
    path('get_task_name/<int:id>', views.get_task_name, name='get_task_name'),
]