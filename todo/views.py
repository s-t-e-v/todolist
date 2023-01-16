from django.template import loader
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .models import Todo

# Create your views here.

## normal mode
def index(request):
    """Load the App main view"""

    todo = Todo.objects.all()
    return render(request, 'todo/index.html', {'todo': todo})


def add(request):
    """Add an entry to the Todo database"""

    # print("Hello !")

    if request.method == 'POST':
        taskname = request.POST.get("taskname")

        print(taskname)

        todo = Todo.objects.create(taskname=taskname, checkstate=False)

        # print(todo)

        return JsonResponse({'sucess': 'Todo Created'})
    else:
        return JsonResponse({'error': 'Invalid request method'})


def todolist(request):
    """Display the todo list with the current todo model"""

    if request.method == 'GET':
        todo = Todo.objects.all()
        todo_list = [
            {'id': t.id,
             'taskname': t.taskname,
             'checkstate': t.checkstate,
             } for t in todo]

        return JsonResponse(todo_list, safe=False)





def update_entry(request):
    """Update the Todo database"""
    pass

def check_update(request):
    """Update the checked/unchecked state of the Todo database"""
    pass

def deletion_mode(request):
    """Switch to deletion mode.
        Also swtich back to normal mode"""
    pass

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