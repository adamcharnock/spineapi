
class App.Dream extends Spine.Model
    @configure 'dream', 'body', 'created', 'slug', 'title'
    @extend Spine.Model.Ajax
    
    @url: "/api/v1/dream/"
    
    @fromJSON: (data) ->
        return unless data
        return super(data.objects)
    
    # toJSON: (json) ->
    #     json = super(json)
    #     delete json.id if json.id?
    #     return json
    