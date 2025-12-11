from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import TemplateDocument
from .serializers import TemplateDocumentSerializer


class TemplateDocumentViewSet(viewsets.ModelViewSet):
    queryset = TemplateDocument.objects.all()
    serializer_class = TemplateDocumentSerializer
    permission_classes = [permissions.IsAuthenticated]

def counter_view(request):
    count = request.session.get('visit_count', 0)
    count += 1
    request.session['visit_count'] = count
    return render(request, 'counter.html', {'visit_count': count})