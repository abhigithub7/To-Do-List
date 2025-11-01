from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Todo
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import logout
from .serializers import TodoSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework import authentication,permissions
from .serializers import RegisterSeriallizer
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
# Create your views here.

@csrf_exempt
@api_view(['POST'])
def LoginView(request):
        data = request.data
        email = data.get('email')
        password = data.get('password')
        
        user = User.objects.filter(email = email).first()
        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user)
            return Response({
                "access_token" : str(refresh.access_token),
                "refresh_token":str(refresh),
                "message":"Login success"
            })
        return Response({"message":"Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
 
def ProfileView(request):
        permission_class = [IsAuthenticated]
        user = request.user
        serializer = RegisterSeriallizer(User)
        return Response(serializer.data)

@api_view(['GET'])
def logout_user(request):
    logout(request)   # Clears the session for the logged-in user
    return Response({"message": "User logged out successfully"}, status=200)

@api_view(['POST'])
def RegisterView(request):
    serializer = RegisterSeriallizer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User Registered Successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# getting all tasks
@api_view(['GET'])

def list_todos(request):
    todos = Todo.objects.all()
    serializer = TodoSerializer(todos,many=True)
    return  Response(serializer.data)
   
   
 # add new task  
@api_view(['POST']) 

def add_todo(request):
    serializer = TodoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP._400_BAD_REQUEST)
       
# update existing task
@api_view(['PUT']) 

def update_todo(request,pk):
    try:
        todo = Todo.objects.get(pk=pk)
    except todo.DoesNotExists:
        return Response(status=status.HTTP_404_NOT_FOUND)   
    if 'completed' in request.data:
        todo.completed = request.data['completed']
        todo.save()
        serializer = TodoSerializer(todo)
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP._400_BAD_REQUEST)
       
# delete task

@api_view(['DELETE'])


def delete_todo(request,pk):
    try:
        todo = Todo.objects.get(pk=pk)
    except todo.DoesNotExists:
        return Response(status=status.HTTP_404_NOT_FOUND)    
    todo.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)    


