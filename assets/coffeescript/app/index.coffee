
class Dream extends Spine.Model
    @configure "dream", "body", "created", "slug", "title"

class DreamItem extends Spine.Controller
    tag: "li"
    
    constructor: ->
        super
        throw "@dream required" unless @dream
        @dream.bind "update", @render
        @dream.bind "destroy", @remove
    
    render: ->
        @html templates.dream()
        @

class DreamList extends Spine.Controller
    tag: "ol"
    constructor: ->
        super
        Dream.bind "refresh", @addAll
        Dream.bind "create", @addOne
    
    addOne: (dream) =>
        dream = new DreamItem(dream: dream)
        @append dream.render()
    
    addAll: =>
        Dream.each @addOne

class App extends Spine.Controller
    events:
        "click .add": "add"
    
    constructor: ->
        super
        @dreamList = new DreamList()
        @append @dreamList
        @log("Initialised")
    
    add: =>
        @log("Add")
        @dreamList.addOne(new Dream(title: "Mooo"))

$ ->
    new App(el: $("#app"))
