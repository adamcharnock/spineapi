class App.StepItem extends Spine.Controller
    
    configure: ->
        super
        throw "@step is required" unless @step
        @step.bind 'update', @render
        @step.bind 'destroy', @remove
    
    render: =>
        @replace templates.step.item(step: @step)
        @

class App.StepList extends Spine.Controller
    
    elements:
        'ul': 'ul'
        '> form': 'form'
        '> form input[name=title]': 'titleField'
    
    events:
        'submit form': 'handleAddStep'
        
    constructor: ->
        super
        @render()
        App.Step.bind 'refesh', @addAll
        App.Step.bind 'create', @addOne
    
    render: ->
        @replace templates.step.list()
        @
    
    addAll: =>
        @ul.empty()
        Step.each @addOne
    
    addOne: (step) =>
        step = new App.StepItem(step: step)
        @ul.prepend step.render().el
    
    handleAddStep: (e) =>
        @log "handleAddStep"
        e.preventDefault()
        step = App.Step.fromForm(e.target)
        if step.save()
            @titleField.val('').focus()
        else
            alert(step.validate())