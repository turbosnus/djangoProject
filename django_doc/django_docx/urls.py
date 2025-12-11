from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from ninja import NinjaAPI
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from docgen.api import api
from docgen.views import counter_view
# from docx_generate.api import router as docx_router

# api.add_router("/", docx_router)

urlpatterns = [
    
    path('admin/', admin.site.urls),
    path('api/', api.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('counter/', counter_view, name='counter'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
