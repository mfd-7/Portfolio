from django.urls import path
from .views import ProjectListCreateView, FeedbackCreateView

urlpatterns = [
    path('projects/', ProjectListCreateView.as_view(), name='project-list'),
    path('feedback/', FeedbackCreateView.as_view(), name='feedback-create'),
]

