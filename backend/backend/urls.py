"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from User import views
from django.contrib.auth import views as auth_views
from knox import views as knox_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('attendance/',views.AttendanceViewSet.as_view(), name = 'details'),
    path('login/',views.LoginAPI.as_view(), name = "login"),
    path('profile/',views.UserAPI.as_view(), name = "profile"),
    path('logout/',knox_views.LogoutView.as_view(), name='knox_logout'),
    path('grades/',views.GradeAPI.as_view(), name = 'grades'),
]
