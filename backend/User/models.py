from django.db import models
from django.contrib.auth.models import User
import json
class Department(models.Model):
    dept_id = models.IntegerField()
    name = models.CharField(max_length = 100)
    hod = models.OneToOneField(User, on_delete = models.SET_NULL, null = True)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete = models.CASCADE)
    firstname = models.CharField(max_length = 20)
    lastname = models.CharField(max_length = 20)
    date_of_birth = models.DateTimeField(null = True)
    gender = models.CharField(max_length = 1, choices = [('M','Male'),('F', 'Female'),('N','Weird')])
    unique_id = models.IntegerField()
    programme = models.CharField(max_length = 2, choices = [('B','B.Tech'),('M','M.Tech'),('P','PhD'),('NA','Not Applicable')], default = 'NA')
    department = models.ForeignKey(Department, on_delete = models.CASCADE)
    semester = models.IntegerField(null = True)
    user_group = models.CharField(max_length = 1, choices = [('S','Student'),('T','Teacher'),('A','Administration')])

class Course(models.Model):
    name = models.CharField(max_length = 100)
    credits = models.IntegerField()
    lectures = models.IntegerField()
    tutorials = models.IntegerField()
    practicals = models.IntegerField()


class CourseEnrollment(models.Model):
    student = models.ForeignKey(Profile, on_delete= models.CASCADE, related_name = 'student')
    course = models.ForeignKey(Course, on_delete = models.CASCADE)
    semester = models.IntegerField(null = True)
    teacher = models.ForeignKey(Profile, on_delete = models.SET_NULL, null = True, related_name = "teacher")

class Attendance(models.Model):
    uid = models.OneToOneField(CourseEnrollment,on_delete = models.CASCADE)
    attended = models.IntegerField(null = True)
    missed = models.IntegerField(null = True)
    p_attended = models.IntegerField(null = True)
    p_missed = models.IntegerField(null = True)

class Assessment(models.Model):
    uid = models.ForeignKey(CourseEnrollment, on_delete = models.CASCADE)
    name = models.TextField()
    weightage = models.DecimalField(max_digits = 3, decimal_places = 3)
    marks_obtained = models.DecimalField(max_digits = 3, decimal_places = 3)
    max_marks = models.DecimalField(max_digits = 3, decimal_places = 3)

class Grades(models.Model):
    uid = models.OneToOneField(CourseEnrollment, on_delete = models.CASCADE)
    current_grade = models.CharField(max_length = 3)
    
class TimeTable(models.Model):
    semester = models.IntegerField()
    department = models.ForeignKey(Department, on_delete = models.CASCADE)
    programme = models.CharField(max_length = 2, choices = [('B','B.Tech'),('M','M.Tech'),('P','PhD'),('NA','Not Applicable')], default = 'NA')
    day = models.CharField(max_length = 10, null = True)
    subject_1 = models.CharField(max_length = 20,null = True)
    subject_2 = models.CharField(max_length = 20,null = True)
    subject_3 = models.CharField(max_length = 20,null = True)
    subject_4 = models.CharField(max_length = 20,null = True)
    subject_5 = models.CharField(max_length = 20,null = True)
    subject_6 = models.CharField(max_length = 20,null = True)
    subject_7 = models.CharField(max_length = 20,null = True)
    subject_8 = models.CharField(max_length = 20,null = True)

    