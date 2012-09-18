
class App.Step extends Spine.Model
    @configure 'created', 'title'
    @extend Spine.Model.Ajax
    
    @url: "/api/v1/step/"
