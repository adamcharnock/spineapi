from uuid import uuid4

from django.db import models
from django.contrib.auth.models import User
from django.template.defaultfilters import slugify

from tastypie.models import create_api_key

class UuidMixin(models.Model):
    uuid = models.CharField(max_length=32, default=lambda: uuid4().hex, unique=True)
    
    class Meta:
        abstract = True

class Dream(UuidMixin, models.Model):
    user = models.ForeignKey(User)
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100)
    slug = models.SlugField()
    body = models.TextField()
    
    def __unicode__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        # For automatic slug generation.
        if not self.slug:
            self.slug = slugify(self.title)[:50]
        
        return super(Dream, self).save(*args, **kwargs)
    

class Step(UuidMixin, models.Model):
    dream = models.ForeignKey(Dream)
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100)

models.signals.post_save.connect(create_api_key, sender=User)