
class App extends Spine.Controller
    
    constructor: ->
        super
        @dreamList = new App.DreamList()
        @append @dreamList
        @log('Initialised')
    

window.App = App

$ ->
    new App(el: $('#app'))
