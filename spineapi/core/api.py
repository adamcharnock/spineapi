from django.conf.urls import url
from django.contrib.auth.models import User

from tastypie import fields
from tastypie.resources import ModelResource
from tastypie.authentication import ApiKeyAuthentication, SessionAuthentication, MultiAuthentication
from tastypie.authorization import Authorization

from spineapi.core.models import Dream, Step

# SessionAuthentication must me listed first
AUTHENTICATION = MultiAuthentication(SessionAuthentication(), ApiKeyAuthentication())

class OwnerAuthorization(Authorization):
    def __init__(self, field=None, *args, **kwargs):
        super(OwnerAuthorization, self).__init__(*args, **kwargs)
        self.field = field
    
    def apply_limits(self, request, object_list):
        if request and hasattr(request, 'user'):
            if not self.field:
                q = {'pk': request.user.pk}
            else:
                q = {self.field: request.user}
            return object_list.filter(**q)
        else:
            return object_list.none()
    

class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        resource_name = 'user'
        detail_uri_name = 'username'
        excludes = ['email', 'password', 'is_active', 'is_staff', 'is_superuser']
        authentication = AUTHENTICATION
        authorization = OwnerAuthorization()
    

class DreamResource(ModelResource):
    user = fields.ForeignKey(UserResource, 'user')
    steps = fields.ToManyField('spineapi.core.api.StepResource', 'step_set', related_name='dream')
    
    class Meta:
        queryset = Dream.objects.all()
        resource_name = 'dream'
        detail_uri_name = 'uuid'
        excludes = ['uuid']
        authentication = AUTHENTICATION
        authorization = OwnerAuthorization(field="user")
    

class StepResource(ModelResource):
    dream = fields.ToOneField(DreamResource, 'dream')
    
    class Meta:
        queryset = Step.objects.all()
        resource_name = 'step'
        detail_uri_name = 'uuid'
        excludes = ['uuid']
        authentication = AUTHENTICATION
        authorization = OwnerAuthorization(field="dream__user")
    

