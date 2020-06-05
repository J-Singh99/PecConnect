from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','id', 'email']

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self,data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        exclude = ['id']
        depth = 1

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        exclude = ['id']

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        exclude = ['id','uid']