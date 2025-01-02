from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    path('user/', views.CreateUserApi.as_view(), name='user_create'),
    path('notes/', views.NoteApi.as_view(), name='note_list'),
    path('notes/<int:id>/', views.NoteApi.as_view(), name='note_delete'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name="token_refresh")
]