(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  App.Step = (function(_super) {

    __extends(Step, _super);

    Step.name = 'Step';

    function Step() {
      return Step.__super__.constructor.apply(this, arguments);
    }

    Step.configure('created', 'title');

    Step.extend(Spine.Model.Ajax);

    Step.url = "/api/v1/step/";

    return Step;

  })(Spine.Model);

}).call(this);
