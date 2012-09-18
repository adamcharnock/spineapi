(function() {
  var App, Dream, DreamItem, DreamList, Step, StepItem, StepList,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Dream = (function(_super) {

    __extends(Dream, _super);

    Dream.name = 'Dream';

    function Dream() {
      return Dream.__super__.constructor.apply(this, arguments);
    }

    Dream.configure('dream', 'body', 'created', 'slug', 'title');

    return Dream;

  })(Spine.Model);

  Step = (function(_super) {

    __extends(Step, _super);

    Step.name = 'Step';

    function Step() {
      return Step.__super__.constructor.apply(this, arguments);
    }

    Step.configure('created', 'title');

    return Step;

  })(Spine.Model);

  StepItem = (function(_super) {

    __extends(StepItem, _super);

    StepItem.name = 'StepItem';

    function StepItem() {
      this.render = __bind(this.render, this);
      return StepItem.__super__.constructor.apply(this, arguments);
    }

    StepItem.prototype.configure = function() {
      StepItem.__super__.configure.apply(this, arguments);
      if (!this.step) {
        throw "@step is required";
      }
      this.step.bind('update', this.render);
      return this.step.bind('destroy', this.remove);
    };

    StepItem.prototype.render = function() {
      this.replace(templates.step.item({
        step: this.step
      }));
      return this;
    };

    return StepItem;

  })(Spine.Controller);

  StepList = (function(_super) {

    __extends(StepList, _super);

    StepList.name = 'StepList';

    StepList.prototype.elements = {
      'ul': 'ul',
      '> form': 'form',
      '> form input[name=title]': 'titleField'
    };

    StepList.prototype.events = {
      'submit form': 'handleAddStep'
    };

    function StepList() {
      this.handleAddStep = __bind(this.handleAddStep, this);

      this.addOne = __bind(this.addOne, this);

      this.addAll = __bind(this.addAll, this);
      StepList.__super__.constructor.apply(this, arguments);
      this.render();
      Step.bind('refesh', this.addAll);
      Step.bind('create', this.addOne);
    }

    StepList.prototype.render = function() {
      this.replace(templates.step.list());
      return this;
    };

    StepList.prototype.addAll = function() {
      this.ul.empty();
      return Step.each(this.addOne);
    };

    StepList.prototype.addOne = function(step) {
      step = new StepItem({
        step: step
      });
      return this.ul.prepend(step.render().el);
    };

    StepList.prototype.handleAddStep = function(e) {
      var step;
      this.log("handleAddStep");
      e.preventDefault();
      step = Step.fromForm(e.target);
      if (step.save()) {
        return this.titleField.val('').focus();
      } else {
        return alert(step.validate());
      }
    };

    return StepList;

  })(Spine.Controller);

  DreamItem = (function(_super) {

    __extends(DreamItem, _super);

    DreamItem.name = 'DreamItem';

    function DreamItem() {
      this.render = __bind(this.render, this);
      DreamItem.__super__.constructor.apply(this, arguments);
      if (!this.dream) {
        throw '@dream required';
      }
      this.stepList = new StepList();
      this.dream.bind('update', this.render);
      this.dream.bind('destroy', this.remove);
    }

    DreamItem.prototype.render = function() {
      this.replace(templates.dream.item({
        dream: this.dream
      }));
      this.append(this.stepList.render());
      return this;
    };

    return DreamItem;

  })(Spine.Controller);

  DreamList = (function(_super) {

    __extends(DreamList, _super);

    DreamList.name = 'DreamList';

    DreamList.prototype.elements = {
      '> ul': 'ul',
      '> form': 'form',
      '> form input[name=title]': 'titleField'
    };

    DreamList.prototype.events = {
      'submit > form': 'handleAddDream'
    };

    function DreamList() {
      this.handleAddDream = __bind(this.handleAddDream, this);

      this.addAll = __bind(this.addAll, this);

      this.addOne = __bind(this.addOne, this);
      DreamList.__super__.constructor.apply(this, arguments);
      this.render();
      Dream.bind('refresh', this.addAll);
      Dream.bind('create', this.addOne);
    }

    DreamList.prototype.addOne = function(dream) {
      dream = new DreamItem({
        dream: dream
      });
      return this.ul.prepend(dream.render().el);
    };

    DreamList.prototype.addAll = function() {
      this.ul.empty();
      return Dream.each(this.addOne);
    };

    DreamList.prototype.render = function() {
      this.replace(templates.dream.list());
      return this;
    };

    DreamList.prototype.handleAddDream = function(e) {
      var dream;
      e.preventDefault();
      dream = Dream.fromForm(e.target);
      if (dream.save()) {
        return this.titleField.val('').focus();
      } else {
        return alert(dream.validate());
      }
    };

    return DreamList;

  })(Spine.Controller);

  App = (function(_super) {

    __extends(App, _super);

    App.name = 'App';

    function App() {
      App.__super__.constructor.apply(this, arguments);
      this.dreamList = new DreamList();
      this.append(this.dreamList);
      this.log('Initialised');
    }

    return App;

  })(Spine.Controller);

  $(function() {
    return new App({
      el: $('#app')
    });
  });

}).call(this);
