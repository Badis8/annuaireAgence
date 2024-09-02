from django.urls import path
from .views import ImageTransformView

urlpatterns = [
    path('transform/', ImageTransformView.as_view(), name='image_transform'),
]