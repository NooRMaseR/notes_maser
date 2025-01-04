from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import status
from django.contrib import auth

from .serializers import NoteSerializer, UserSerializer
from .models import Note
# Create your views here.


class NoteApi(APIView):
    authentication_classes = [JWTAuthentication]
    
    def get(self, request: Request) -> Response:
        notes = Note.objects.filter(author=request.user)
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)
    
    def post(self, request: Request) -> Response:
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request: Request, id: int) -> Response:
        print(request.data)
        note = Note.objects.get(author=request.user, id=id)
        serializer = NoteSerializer(note, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request: Request, id: int) -> Response:
        Note.objects.get(author=request.user, id=id).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# class NoteApi(generics.ListCreateAPIView):
#     serializer_class = NoteSerializer
    
#     def get_queryset(self):
#         print(self.request.headers)
#         print(self.request.user)
#         return Note.objects.filter(author=self.request.user)
    
#     def perform_create(self, serializer):
#         if serializer.is_valid():
#             serializer.save(author=self.request.user)
        


class CreateUserApi(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    
    def get_token(self, user: User) -> dict:
        token = RefreshToken.for_user(user)
        return {
            "refresh": str(token),
            "access": str(token.access_token) # type: ignore
        }
    
    def post(self, request: Request) -> Response:
        "perform user login"
        username = request.data.get('username') # type: ignore
        password = request.data.get('password') # type: ignore
        user = auth.authenticate(username=username, password=password)
        if user is None:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
        
        auth.login(request._request, user)
        serializer = UserSerializer(user)
        tokens = self.get_token(user) # type: ignore
        data = serializer.data
        data["refresh"] = tokens['refresh'] # type: ignore
        data["access"] = tokens['access'] # type: ignore
        return Response(data, status=status.HTTP_200_OK)
    
    def put(self, request: Request) -> Response:
        "perform user creation"
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(username=serializer.data['username']) # type: ignore
            auth.login(request._request, user)
            
            tokens = self.get_token(user) # type: ignore
            data = serializer.data
            data["refresh"] = tokens['refresh'] # type: ignore
            data["access"] = tokens['access'] # type: ignore
            
            return Response(data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

