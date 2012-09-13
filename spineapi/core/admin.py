from django.contrib import admin
from spineapi.core.models import Dream, Step

class DreamAdmin(admin.ModelAdmin):
    readonly_fields = ('uuid',)
    # list_display = 
admin.site.register(Dream, DreamAdmin)

class StepAdmin(admin.ModelAdmin):
    readonly_fields = ('uuid',)
    list_display = ('pk', 'title', 'uuid')
admin.site.register(Step, StepAdmin)
