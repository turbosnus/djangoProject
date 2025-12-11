from rest_framework import serializers
from .models import TemplateDocument


class TemplateDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TemplateDocument
        fields = ['id', 'file', 'uploaded_at']