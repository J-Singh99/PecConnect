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
    user = UserSerializer()
    class Meta:
        model = Profile
        exclude = ['id']
        depth = 1

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        exclude = ['id']

class EnrollmentSerializer(serializers.ModelSerializer):
    course = CourseSerializer()
    class Meta:
        model = CourseEnrollment
        exclude = ['id','student','teacher']
class AttendanceSerializer(serializers.ModelSerializer):
    uid = EnrollmentSerializer()
    class Meta:
        model = Attendance
        exclude = ['id']

class GradeSerializer(serializers.ModelSerializer):
    uid = EnrollmentSerializer()
    class Meta:
        model = Grades
        exclude = ['id']

class TimeTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeTable
        exclude = ['id']

class SgpaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SGPA
        exclude = ['id','student']
        depth = 1