(function() {
  var App,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  App = (function(_super) {

    __extends(App, _super);

    App.name = 'App';

    function App() {
      App.__super__.constructor.apply(this, arguments);
      this.dreamList = new App.DreamList();
      this.append(this.dreamList);
      this.log('Initialised');
    }

    return App;

  })(Spine.Controller);

  window.App = App;

  $(function() {
    return new App({
      el: $('#app')
    });
  });

}).call(this);
