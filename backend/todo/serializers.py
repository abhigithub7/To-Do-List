from rest_framework import serializers
from .models import Todo
from django.contrib.auth.models import User

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'

class RegisterSeriallizer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email','password']

    
    def create(self,validated_data):
        user = User.objects.create_user(
            username = validated_data['username'],
            email = validated_data['email'],
            password = validated_data['password']
        )
        return user