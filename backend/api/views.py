from rest_framework import generics, status
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import Project, Feedback
from .serializers import ProjectSerializer, FeedbackSerializer

class ProjectListCreateView(generics.ListCreateAPIView):
    queryset = Project.objects.all().order_by('-created_at')
    serializer_class = ProjectSerializer

class FeedbackCreateView(generics.CreateAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        if response.status_code == status.HTTP_201_CREATED:
            feedback_data = request.data
            
            # Send Email
            subject = f"New Portfolio Feedback from {feedback_data.get('name')}"
            message = (
                f"Name: {feedback_data.get('name')}\n"
                f"Email: {feedback_data.get('email')}\n"
                f"Rating: {feedback_data.get('rating')}/5\n\n"
                f"Message:\n{feedback_data.get('message')}"
            )
            
            try:
                # We catch exceptions so that if email config is missing, it doesn't crash the API
                send_mail(
                    subject,
                    message,
                    settings.DEFAULT_FROM_EMAIL if hasattr(settings, 'DEFAULT_FROM_EMAIL') else 'no-reply@portfolio.local',
                    ['muhtasimfuad3570@gmail.com'],
                    fail_silently=True,
                )
            except Exception as e:
                print(f"Failed to send email: {e}")
                
        return response
