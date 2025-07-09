from django.urls import path
from .views import list_todos,add_todo,update_todo,delete_todo

urlpatterns = [
    path('todos/', list_todos, name='list_todos'),
    path('todos/add',add_todo, name='add_todo'),
    path('todos/<int:pk>/update',update_todo, name='update_todo'),
    path('todos/<int:pk>/delete',delete_todo, name='delete_todo')

]
