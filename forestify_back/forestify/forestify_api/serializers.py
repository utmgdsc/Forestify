from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator

from rest_framework import serializers

UserModel = get_user_model()

class LoginSerializer(serializers.Serializer):
    
    email = serializers.EmailField()
    password = serializers.CharField()
    def check_user(self, clean_data):
        user = authenticate(username=clean_data['email'], password=clean_data['password'])
        if not user:
            raise serializers.ValidationError('user not found')
        return user

class RegisterSerializer(serializers.ModelSerializer):
        
        class Meta:
            model = UserModel
            fields = '__all__'

        def create(self, validated_data):
            user_obj = UserModel.objects.create_user(email=validated_data['email'], 
                                                    password=validated_data['password'])
            user_obj.username = validated_data['username']
            user_obj.save
            return user_obj

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserModel
        fields = ('email', 'username')
