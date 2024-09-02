from django.shortcuts import render
from PIL import Image 
from rembg import remove
 
import numpy as np
from django.http import JsonResponse
from django.views import View
from django.core.files.storage import default_storage
 
import io
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
 
@method_decorator(csrf_exempt, name='dispatch')
class ImageTransformView(View):
    
    def post(self, request):
 
        image_file = request.FILES.get('image')
        new_filename = request.POST.get('filename')
        
        if not image_file:
            return JsonResponse({'error': 'No image provided'}, status=400)
        
        if not new_filename:
            return JsonResponse({'error': 'No filename provided'}, status=400)
        
        image = Image.open(image_file)
        
     
        image_no_bg = remove(image)

 
        output_image = image_no_bg.resize((500, 500))
        
      
        image_io = io.BytesIO()
        output_image.save(image_io, format='PNG')
        image_io.seek(0)

        
        fs = FileSystemStorage()
        filename = f"{new_filename}.png"
        fs.save(filename, image_io)
        print(filename)
        return JsonResponse({'message': 'Image processed successfully'})
        
       