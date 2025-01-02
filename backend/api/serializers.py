from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from .models import Note

class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'
        extra_kwargs = {'author': {'read_only': True}}
    
    def create(self, validated_data) -> Note:
        note = Note.objects.create(**validated_data)
        return note
        
class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {'password': {'write_only': True}, "email": {'write_only': True}}
    
    def create(self, validated_data) -> User:
        user = User.objects.create_user(**validated_data)
        user.set_password(validated_data['password'])
        return user