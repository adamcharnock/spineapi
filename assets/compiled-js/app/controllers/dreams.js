(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  App.DreamItem = (function(_super) {

    __extends(DreamItem, _super);

    DreamItem.name = 'DreamItem';

    function DreamItem() {
      this.render = __bind(this.render, this);
      DreamItem.__super__.constructor.apply(this, arguments);
      if (!this.dream) {
        throw '@dream required';
      }
      this.stepList = new App.StepList();
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

  App.DreamList = (function(_super) {

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
      App.Dream.bind('refresh', this.addAll);
      App.Dream.bind('create', this.addOne);
    }

    DreamList.prototype.addOne = function(dream) {
      dream = new App.DreamItem({
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
      dream = App.Dream.fromForm(e.target);
      if (dream.save()) {
        return this.titleField.val('').focus();
      } else {
        return alert(dream.validate());
      }
    };

    return DreamList;

  })(Spine.Controller);

}).call(this);
