from django.contrib import admin
from django.urls import path, include

admin.site.site_header = "Mr. MUHTASIM Admin Panel"
admin.site.site_title = "MFD.7 Admin Portal"
admin.site.index_title = "Welcome to Portfolio Portal"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
