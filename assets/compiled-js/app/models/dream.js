(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  App.Dream = (function(_super) {

    __extends(Dream, _super);

    Dream.name = 'Dream';

    function Dream() {
      return Dream.__super__.constructor.apply(this, arguments);
    }

    Dream.configure('dream', 'body', 'created', 'slug', 'title');

    Dream.extend(Spine.Model.Ajax);

    Dream.url = "/api/v1/dream/";

    Dream.fromJSON = function(data) {
      if (!data) {
        return;
      }
      return Dream.__super__.constructor.fromJSON.call(this, data.objects);
    };

    return Dream;

  })(Spine.Model);

}).call(this);
