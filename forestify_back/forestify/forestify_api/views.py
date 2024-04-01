from django.contrib.auth import login, logout

from rest_framework import generics
from rest_framework import permissions
from rest_framework import status
from rest_framework import views
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from django.contrib.auth import login, logout
from rest_framework import permissions, status
from .validations import validate_email, validate_password, custom_validation
from . import serializers

from earthEngineMap import getMapLink

class RegisterView(views.APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        clean_data = custom_validation(request.data)
        serializer = serializers.RegisterSerializer(data=clean_data)
        serializer.is_valid(raise_exception=True)
        user = serializer.create(self.request.data)
        if user:
            return Response(None, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class LoginView(views.APIView):

    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data
        print(data)
        print("REQUEST DATA HERE:", request.GET)
        print("REQUEST DATA HERE:", request.POST)

        assert validate_email(data)
        assert validate_password(data)
        serializer = serializers.LoginSerializer(data=data)

        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(None, status=status.HTTP_202_ACCEPTED)


class LogoutView(views.APIView):

    def post(self, request, format=None):
        logout(request)
        return Response(None, status=status.HTTP_204_NO_CONTENT)

class ProfileView(generics.RetrieveAPIView):

    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        serializer = serializers.UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)

class MapView(views.APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        print(request.query_params)
        print(request.data)

        analysis = request.GET.get('analysis')
        longitude = request.GET.get('longitude')
        latitude = request.GET.get('latitude')
        startDate = request.GET.get('startDate')
        endDate = request.GET.get('endDate')

        # print(analysis, longitude, latitude, startDate, endDate)
        # serializer = serializers.MapSerializer(data=request.data)
        mapLink = getMapLink(request.query_params['analysis'], float(request.query_params['longitude']), float(request.query_params['latitude']), request.query_params['startDate'], request.query_params['endDate'])
        # mapLink = ""
        return Response({'MapLink': mapLink}, status=status.HTTP_200_OK)

    