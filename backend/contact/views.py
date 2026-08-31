from rest_framework import generics
from .models import ProjectEnquiry
from .serializers import ProjectEnquirySerializer


class ProjectEnquiryCreateView(generics.CreateAPIView):
    queryset = ProjectEnquiry.objects.all()
    serializer_class = ProjectEnquirySerializer