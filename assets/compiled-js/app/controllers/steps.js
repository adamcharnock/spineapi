(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  App.StepItem = (function(_super) {

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

  App.StepList = (function(_super) {

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
      App.Step.bind('refesh', this.addAll);
      App.Step.bind('create', this.addOne);
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
      step = new App.StepItem({
        step: step
      });
      return this.ul.prepend(step.render().el);
    };

    StepList.prototype.handleAddStep = function(e) {
      var step;
      this.log("handleAddStep");
      e.preventDefault();
      step = App.Step.fromForm(e.target);
      if (step.save()) {
        return this.titleField.val('').focus();
      } else {
        return alert(step.validate());
      }
    };

    return StepList;

  })(Spine.Controller);

}).call(this);
