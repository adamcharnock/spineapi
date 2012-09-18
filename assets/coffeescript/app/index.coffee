
class Dream extends Spine.Model
    @configure 'dream', 'body', 'created', 'slug', 'title'

class Step extends Spine.Model
    @configure 'created', 'title'

class StepItem extends Spine.Controller
    
    configure: ->
        super
        throw "@step is required" unless @step
        @step.bind 'update', @render
        @step.bind 'destroy', @remove
    
    render: =>
        @replace templates.step.item(step: @step)
        @

class StepList extends Spine.Controller
    
    elements:
        'ul': 'ul'
        '> form': 'form'
        '> form input[name=title]': 'titleField'
    
    events:
        'submit form': 'handleAddStep'
        
    constructor: ->
        super
        @render()
        Step.bind 'refesh', @addAll
        Step.bind 'create', @addOne
    
    render: ->
        @replace templates.step.list()
        @
    
    addAll: =>
        @ul.empty()
        Step.each @addOne
    
    addOne: (step) =>
        step = new StepItem(step: step)
        @ul.prepend step.render().el
    
    handleAddStep: (e) =>
        @log "handleAddStep"
        e.preventDefault()
        step = Step.fromForm(e.target)
        if step.save()
            @titleField.val('').focus()
        else
            alert(step.validate())

class DreamItem extends Spine.Controller
    
    constructor: ->
        super
        throw '@dream required' unless @dream
        @stepList = new StepList()
        @dream.bind 'update', @render
        @dream.bind 'destroy', @remove
    
    render: =>
        @replace templates.dream.item(dream: @dream)
        @append @stepList.render()
        @

class DreamList extends Spine.Controller
    
    elements:
        '> ul': 'ul'
        '> form': 'form'
        '> form input[name=title]': 'titleField'
    
    events:
        'submit > form': 'handleAddDream'
    
    constructor: ->
        super
        @render()
        Dream.bind 'refresh', @addAll
        Dream.bind 'create', @addOne
    
    addOne: (dream) =>
        dream = new DreamItem(dream: dream)
        @ul.prepend dream.render().el
    
    addAll: =>
        @ul.empty()
        Dream.each @addOne
    
    render: ->
        @replace templates.dream.list()
        @
    
    handleAddDream: (e) =>
        e.preventDefault()
        dream = Dream.fromForm(e.target)
        if dream.save()
            @titleField.val('').focus()
        else
            alert(dream.validate())

class App extends Spine.Controller
    
    constructor: ->
        super
        @dreamList = new DreamList()
        @append @dreamList
        @log('Initialised')
    

$ ->
    new App(el: $('#app'))
