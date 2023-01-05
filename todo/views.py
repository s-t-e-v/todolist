from django.template import loader
from django.http import HttpResponse
from .models import Todo

# Create your views here.

## normal mode
def index(request):
    """Load the App main view"""
    todo = Todo.objects.all().values()
    template = loader.get_template('index.html')
    context = {
        'todo': todo,
    }
    return HttpResponse(template.render(context, request))

def add(request):
    """Add an entry to the Todo database"""
    pass

def update_entry(request):
    """Update the Todo database"""
    pass

def check_update(request):
    """Update the checked/unchecked state of the Todo database"""
    pass

def deletion_mode(request):
    """Switch to deletion mode.
        Also swtich back to normal mode"""
    todo = Todo.objects.all().values()
    template = loader.get_template('deletion.html')
    context = {
        'todo': todo,
    }
    return HttpResponse(template.render(context, request))

## deletion mode
def delete_entry(request):
    """Delete the selected entry.
        update_history will be called"""
    pass

def delete_all(request):
    """Delete all tasks.
        update_history will be called"""
    pass

def undo(request):
    """Undo the previous action.
        update_history will be called"""

def update_history(request):
    """Update history
        It uses a model keeping track of actions perform during deletion.
        The model is being added entry like following:
            - when delete_entry is called, the task is registered in the model 
            alongside the code "d" standing for "deleted"
            - when delete_all is called, all the taskds deleted are registered
              together with the code "da" standing for "delete all"
            - when no actions has been done, nothing is added to the history,
              even if the user clicks on the "undo" button
            - when undo is called, we check the last entry in the history model.
              depending on the code, we update the Todo database with by readding
              one ("d") or several ("da") tasks, from the history model. When this
              is done, we delete the last entry in the history model to update it.
    """
    pass