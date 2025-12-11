# docx_generate/auth.py
from ninja.security import HttpBearer
from rest_framework_simplejwt.authentication import JWTAuthentication

class JWTAuth(HttpBearer):
    def authenticate(self, request, token):
        user_auth_tuple = JWTAuthentication().authenticate(request)
        if user_auth_tuple:
            return user_auth_tuple[0]