from django.db import models

# Create your models here.

class Todo(models.Model):
    taskname = models.CharField(max_length=255)
    checkstate = models.BooleanField(default=False)