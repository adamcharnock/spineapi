(function() {
  var App, Dream, DreamItem, DreamList,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Dream = (function(_super) {

    __extends(Dream, _super);

    Dream.name = 'Dream';

    function Dream() {
      return Dream.__super__.constructor.apply(this, arguments);
    }

    Dream.configure("dream", "body", "created", "slug", "title");

    return Dream;

  })(Spine.Model);

  DreamItem = (function(_super) {

    __extends(DreamItem, _super);

    DreamItem.name = 'DreamItem';

    DreamItem.prototype.tag = "li";

    function DreamItem() {
      DreamItem.__super__.constructor.apply(this, arguments);
      if (!this.dream) {
        throw "@dream required";
      }
      this.dream.bind("update", this.render);
      this.dream.bind("destroy", this.remove);
    }

    DreamItem.prototype.render = function() {
      this.html(templates.dream());
      return this;
    };

    return DreamItem;

  })(Spine.Controller);

  DreamList = (function(_super) {

    __extends(DreamList, _super);

    DreamList.name = 'DreamList';

    DreamList.prototype.tag = "ol";

    function DreamList() {
      this.addAll = __bind(this.addAll, this);

      this.addOne = __bind(this.addOne, this);
      DreamList.__super__.constructor.apply(this, arguments);
      Dream.bind("refresh", this.addAll);
      Dream.bind("create", this.addOne);
    }

    DreamList.prototype.addOne = function(dream) {
      dream = new DreamItem({
        dream: dream
      });
      return this.append(dream.render());
    };

    DreamList.prototype.addAll = function() {
      return Dream.each(this.addOne);
    };

    return DreamList;

  })(Spine.Controller);

  App = (function(_super) {

    __extends(App, _super);

    App.name = 'App';

    App.prototype.events = {
      "click .add": "add"
    };

    function App() {
      this.add = __bind(this.add, this);
      App.__super__.constructor.apply(this, arguments);
      this.dreamList = new DreamList();
      this.append(this.dreamList);
      this.log("Initialised");
    }

    App.prototype.add = function() {
      this.log("Add");
      return this.dreamList.addOne(new Dream({
        title: "Mooo"
      }));
    };

    return App;

  })(Spine.Controller);

  $(function() {
    return new App({
      el: $("#app")
    });
  });

}).call(this);
