"use strict";

(function (window, $) {
  var _uniquId = 0,
      $body = $("body"),
      _types = {
    success: {
      icon: "fa fa-thumbs-up",
      className: "success"
    },
    info: {
      icon: "fa fa-info",
      className: "info"
    },
    warning: {
      icon: "fa fa-warning",
      className: "warning"
    },
    error: {
      icon: "fa fa-times",
      className: "error"
    }
  },
      _formats = {
    toast: {
      key: "toast",
      className: "toast",
      enterAnimation: "fadeInUp",
      exitAnimation: "fadeOutDown"
    },
    barTop: {
      key: "barTop",
      className: "bar-top",
      enterAnimation: "fadeInDown",
      exitAnimation: "fadeOutUp"
    }
  };

  var notice = {
    show: function show(args) {
      var id = ++_uniquId,
          format = args.format || "toast";


      render({
        message: args.message,
        type: _types[args.type],
        format: _formats[format],
        id: id
      });

      if (args.autoRemove === false) {
        return {
          remove: function remove() {
            removeNotice(id, _formats[format]);
          },
          update: function update(newArgs) {
            updateNotice(id, newArgs);
          }
        };
      } else {}
    }
  };

  window.Notice = notice;

  var removeNotice = function (id, format) {
    var $el = findNotice(id);

    $el.removeClass(format.enterAnimation);
    $el.addClass(format.exitAnimation);

    if (format.key.contains("top")) $el.slideUp(250);else $el.slideDown(250);

    setTimeout(function () {
      $el.remove();
    }, 500);
  };

  var updateNotice = function (id, args) {
    var $notice = findNotice(id);

    if (args.message) {
      $notice.find(".notice-message").html(args.message);
    }

    if (args.type) {
      $notice.removeClass("warning info success error").addClass(_types[args.type].className).find(".notice-icon").html("<span class='" + _types[args.type].icon + "'></span>");
    }
  };

  var render = function (notice) {
    var $container = getListContainer(notice.format.className),
        html = "<div class='notice-list-item " + notice.type.className + " animated " + notice.format.enterAnimation + "' data-notice-id='" + notice.id + "'>\n                        <div class='notice-icon'><span class='" + notice.type.icon + "'></span></div>\n                        <div class='notice-message'>" + notice.message + "</div>\n                        <div class='notice-dismiss' data-notice-id='" + notice.id + "' data-notice-format='" + notice.format.key + "'>x</div>\n                    </div>";

    console.log("appending: ", $(html));
    console.log("to: ", $container);
    $container.append(html);
  };

  var findNotice = function (id) {
    return $(".notice-list-item[data-notice-id='" + id + "']");
  };

  var getListContainer = function (format) {
    var test = $(".notice-container." + format);
    if (test.length) return test;

    $body.append("<div class='notice-container " + format + "'></div>");
    return $(".notice-container." + format);
  };

  $(function () {
    $body.on("click", ".notice-dismiss", function () {
      var $sender = $(this),
          id = $sender.data("notice-id"),
          format = _formats[$sender.data("notice-format")];

      removeNotice(id, format);
    });
  });

})(this, jQuery);
//setTimeout( function () {
//    removeNotice( id, _formats[ format ] );
//}, ( format === "toast" ? 2500 : 5000 ) );