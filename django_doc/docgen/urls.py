from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TemplateDocumentViewSet, counter_view

router = DefaultRouter()
router.register(r'templates', TemplateDocumentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('counter/', counter_view, name='counter'),
]