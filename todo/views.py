from django.template import loader
from django.http import HttpResponse
from .models import Todo

# Create your views here.

## index.html views
def index(request):
    todo = Todo.objects.all().values()
    template = loader.get_template('index.html')
    context = {
        'todo': todo,
    }
    return HttpResponse(template.render(context, request))

def add(request):
    
    pass

def check(request):
    pass

def check_update(request):
    pass

def deletion(request):
    todo = Todo.objects.all().values()
    template = loader.get_template('deletion.html')
    context = {
        'todo': todo,
    }
    return HttpResponse(template.render(context, request))

## deletion.html views