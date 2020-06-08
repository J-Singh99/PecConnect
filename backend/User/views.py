from django.shortcuts import render
from .models import *
from django.contrib.auth.decorators import login_required
from .serializers import *
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from knox.auth import TokenAuthentication
from knox.models import AuthToken
from rest_framework.exceptions import APIException
from rest_framework import status

class NotAllowedAPI(APIException):
    status_code = 404
    default_detail = 'You are not allowed to access this url.'
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

class TimeTableAPI(APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class =  TimeTableSerializer
    def get(self, request, format = 'json'):
        profile = Profile.objects.filter(user = request.user)[0]
        timetable = TimeTable.objects.filter(semester = profile.semester, programme = profile.programme, department = profile.department)
        data = []
        for x in timetable:
            data.append(TimeTableSerializer(x).data)
        return Response({"timetable":data})
    
class UpdateAttendanceView(APIView):
    permissions = [
        permissions.IsAuthenticated
    ]
    serializer_class = AttendanceSerializer

    def post(self, request, *args, **kwargs):
        if request.user.profile.user_group !='T':
            return Response({"detail":"You are not authorized to make changes to the database"}, status.HTTP_401_UNAUTHORIZED)
        data = request.data
        attendance_sheet = data['attendance']
        course = data['course']
        semester = data['semester']
        for x in attendance_sheet:
            attendance_obj = Attendance.objects.filter(uid = CourseEnrollment.objects.filter(student = Profile.objects.filter(unique_id = x['sid'])[0],semester = semester, course = Course.objects.filter(code = course)[0])[0])[0]
            attendance_obj.attended += x['attended']
            attendance_obj.missed += x['missed']
            attendance_obj.save()
        return Response({"detail":"Succesfully added the attendance"}, status.HTTP_200_OK)

class SgpaAPI(generics.ListAPIView):
    permissions =[
        permissions.IsAuthenticated
    ]
    serializer_class = SgpaSerializer
    def get_queryset(self):
        queryset = SGPA.objects.filter(student = self.request.user.profile)
        return queryset

