app.directive('typedjs', function() {
  return {
    restrict: 'E',

    scope: {
      strings: '='
    },

    template: '<span id="typed-output"></span>',

    link: function(scope) {

      var options = {
        strings: scope.strings,
        typeSpeed: 6,
        contentType: "html",
        showCursor: true,
        cursorChar: "|"
      };

      $(function() {
        $("#typed-output").typed(options);
      });

    }
  };
});