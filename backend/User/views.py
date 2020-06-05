from django.shortcuts import render
from .models import *
from django.contrib.auth.decorators import login_required
from .serializers import *
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from knox.auth import TokenAuthentication
from knox.models import AuthToken
class AttendanceViewSet(APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class =  AttendanceSerializer
    def get(self, request, format = 'json'):
        profile = Profile.objects.filter(user = request.user)[0]
        courses_enrolled = CourseEnrollment.objects.filter(student = profile, semester = profile.semester)
        course_attendances = []
        for x in courses_enrolled:
            course_attendances.append(AttendanceSerializer(Attendance.objects.get(uid = x)).data)
        data = {}
        data['Course and Their Attendances'] = course_attendances
        return Response(data)

class GradeAPI(APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class =  AttendanceSerializer
    def get(self, request, format = 'json'):
        profile = Profile.objects.filter(user = request.user)[0]
        courses_enrolled = CourseEnrollment.objects.filter(student = profile, semester = profile.semester)
        course_attendances = []
        for x in courses_enrolled:
            course_attendances.append(GradeSerializer(Grades.objects.get(uid = x)).data)
        data = {}
        data['Course and Their Grades'] = course_attendances
        return Response(data)

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.validated_data
        return Response({
            "user" :UserSerializer(user, context = self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

class UserAPI(generics.RetrieveAPIView):
  permission_classes = [
    permissions.IsAuthenticated,
  ]
  serializer_class = ProfileSerializer

  def get_object(self):
    profile = Profile.objects.filter(user = self.request.user)[0]
    return profile

    
    

