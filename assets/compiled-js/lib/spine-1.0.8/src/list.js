(function() {
  var $, Spine,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Spine = this.Spine || require('spine');

  $ = Spine.$;

  Spine.List = (function(_super) {

    __extends(List, _super);

    List.name = 'List';

    List.prototype.events = {
      'click .item': 'click'
    };

    List.prototype.selectFirst = false;

    function List() {
      this.change = __bind(this.change, this);
      List.__super__.constructor.apply(this, arguments);
      this.bind('change', this.change);
    }

    List.prototype.template = function() {
      throw 'Override template';
    };

    List.prototype.change = function(item) {
      this.current = item;
      if (!this.current) {
        this.children().removeClass('active');
        return;
      }
      this.children().removeClass('active');
      return $(this.children().get(this.items.indexOf(this.current))).addClass('active');
    };

    List.prototype.render = function(items) {
      if (items) {
        this.items = items;
      }
      this.html(this.template(this.items));
      this.change(this.current);
      if (this.selectFirst) {
        if (!this.children('.active').length) {
          return this.children(':first').click();
        }
      }
    };

    List.prototype.children = function(sel) {
      return this.el.children(sel);
    };

    List.prototype.click = function(e) {
      var item;
      item = this.items[$(e.currentTarget).index()];
      this.trigger('change', item);
      return true;
    };

    return List;

  })(Spine.Controller);

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Spine.List;
  }

}).call(this);
