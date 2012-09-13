from django.conf.urls import patterns, include, url
from django.views.generic.simple import direct_to_template
from spineapi.core.api import DreamResource, UserResource, StepResource
from tastypie.api import Api

from django.contrib import admin
admin.autodiscover()

v1_api = Api(api_name='v1')
v1_api.register(UserResource())
v1_api.register(DreamResource())
v1_api.register(StepResource())

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'spineapi_project.views.home', name='home'),
    # url(r'^', include('spineapi.core.urls')),
    url(r'^api/', include(v1_api.urls)),
    url(r'^$', direct_to_template, { "template": "home.html" }),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)
