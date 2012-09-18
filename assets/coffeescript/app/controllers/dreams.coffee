class App.DreamItem extends Spine.Controller
    
    constructor: ->
        super
        throw '@dream required' unless @dream
        @stepList = new App.StepList()
        @dream.bind 'update', @render
        @dream.bind 'destroy', @remove
    
    render: =>
        @replace templates.dream.item(dream: @dream)
        @append @stepList.render()
        @

class App.DreamList extends Spine.Controller
    
    elements:
        '> ul': 'ul'
        '> form': 'form'
        '> form input[name=title]': 'titleField'
    
    events:
        'submit > form': 'handleAddDream'
    
    constructor: ->
        super
        @render()
        App.Dream.bind 'refresh', @addAll
        App.Dream.bind 'create', @addOne
        App.Dream.fetch()
    
    addOne: (dream) =>
        @log dream
        dream = new App.DreamItem(dream: dream)
        @ul.prepend dream.render().el
    
    addAll: =>
        @ul.empty()
        App.Dream.each @addOne
    
    render: ->
        @replace templates.dream.list()
        @
    
    handleAddDream: (e) =>
        e.preventDefault()
        dream = App.Dream.fromForm(e.target)
        if dream.save()
            @titleField.val('').focus()
        else
            alert(dream.validate())