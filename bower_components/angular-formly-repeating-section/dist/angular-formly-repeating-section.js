(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _repeatingSection = require('./repeating-section');

var _repeatingSection2 = _interopRequireDefault(_repeatingSection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ngModuleName = 'formlyRepeatingSection';
var angular = window.angular;
var ngModule = angular.module(ngModuleName, ['formly']);

(0, _repeatingSection2.default)(ngModule);

exports.default = ngModuleName;

},{"./repeating-section":3}],2:[function(require,module,exports){
module.exports = "<!--loop through each element in model array-->\n<div class=\"{{hideRepeat}}\">\n  <div class=\"repeatsection\" ng-repeat=\"element in model[options.key]\" ng-init=\"fields = copyFields(to.fields)\">\n    <formly-form fields=\"fields\"\n                 model=\"element\"\n                 form=\"form\">\n    </formly-form>\n    <div class=\"remove-button-container\" style=\"\">\n      <button type=\"button\" class=\"btn btn-sm btn-danger remove-button\" ng-click=\"model[options.key].splice($index, 1)\">\n        Remove\n      </button>\n    </div>\n</div>\n<p class=\"AddNewButton\">\n      <button type=\"button\" class=\"btn btn-primary\" ng-click=\"addNew()\" >{{to.btnText}}</button>\n</p>\n";

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (ngModule) {

  ngModule.config(['formlyConfigProvider', function (formlyConfigProvider) {

    var unique = 1;

    formlyConfigProvider.setType({
      name: 'repeatSection',
      template: require('./repeating-section.html'),
      controller: ['$scope', function ($scope) {

        $scope.formOptions = { formState: $scope.formState };

        $scope.addNew = addNew;

        $scope.copyFields = copyFields;

        function copyFields(fields) {
          fields = angular.copy(fields);
          addRandomIds(fields);
          return fields;
        }

        function addNew() {
          $scope.model[$scope.options.key] = $scope.model[$scope.options.key] || [];
          var repeatsection = $scope.model[$scope.options.key];
          var lastSection = repeatsection[repeatsection.length - 1];
          var newsection = {};
          if (lastSection) {
            // console.log(lastSection);
            // newsection = angular.copy(repeatsection);
            newsection = angular.copy(lastSection);
            for (var key in newsection) {
              if (newsection[key] !== "$$hashKey") {
                newsection[key] = "";
              }
            }
          }
          repeatsection.push(newsection);
        }

        function addRandomIds(fields) {
          unique++;
          angular.forEach(fields, function (field, index) {
            if (field.fieldGroup) {
              addRandomIds(field.fieldGroup);
              return; // fieldGroups don't need an ID
            }

            if (field.templateOptions && field.templateOptions.fields) {
              addRandomIds(field.templateOptions.fields);
            }

            field.id = field.id || field.key + '_' + index + '_' + unique + getRandomInt(0, 9999);
          });
        }

        function getRandomInt(min, max) {
          return Math.floor(Math.random() * (max - min)) + min;
        }
      }]

    });
  }]);
};

},{"./repeating-section.html":2}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvcmVwZWF0aW5nLXNlY3Rpb24uaHRtbCIsInNyYy9yZXBlYXRpbmctc2VjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0lBOzs7Ozs7QUFKQSxJQUFNLGVBQWUsd0JBQXJCO0FBQ0EsSUFBTSxVQUFVLE9BQU8sT0FBdkI7QUFDQSxJQUFNLFdBQVcsUUFBUSxNQUFSLENBQWUsWUFBZixFQUE2QixDQUFFLFFBQUYsQ0FBN0IsQ0FBakI7O0FBR0EsZ0NBQWlCLFFBQWpCOztrQkFFZSxZOzs7QUNQZjtBQUNBOzs7Ozs7OztrQkNEZSxvQkFBWTs7QUFFekIsV0FBUyxNQUFULENBQWdCLENBQUUsc0JBQUYsRUFBMEIsZ0NBQXdCOztBQUVoRSxRQUFJLFNBQVMsQ0FBYjs7QUFFQSx5QkFBcUIsT0FBckIsQ0FBNkI7QUFDM0IsWUFBTSxlQURxQjtBQUUzQixnQkFBVSxRQUFRLDBCQUFSLENBRmlCO0FBRzNCLGtCQUFZLENBQUUsUUFBRixFQUFZLFVBQVMsTUFBVCxFQUFpQjs7QUFFdkMsZUFBTyxXQUFQLEdBQXFCLEVBQUMsV0FBVyxPQUFPLFNBQW5CLEVBQXJCOztBQUVBLGVBQU8sTUFBUCxHQUFnQixNQUFoQjs7QUFFQSxlQUFPLFVBQVAsR0FBb0IsVUFBcEI7O0FBR0EsaUJBQVMsVUFBVCxDQUFvQixNQUFwQixFQUE0QjtBQUMxQixtQkFBUyxRQUFRLElBQVIsQ0FBYSxNQUFiLENBQVQ7QUFDQSx1QkFBYSxNQUFiO0FBQ0EsaUJBQU8sTUFBUDtBQUNEOztBQUVELGlCQUFTLE1BQVQsR0FBa0I7QUFDaEIsaUJBQU8sS0FBUCxDQUFhLE9BQU8sT0FBUCxDQUFlLEdBQTVCLElBQW1DLE9BQU8sS0FBUCxDQUFhLE9BQU8sT0FBUCxDQUFlLEdBQTVCLEtBQW9DLEVBQXZFO0FBQ0EsY0FBSSxnQkFBZ0IsT0FBTyxLQUFQLENBQWEsT0FBTyxPQUFQLENBQWUsR0FBNUIsQ0FBcEI7QUFDQSxjQUFJLGNBQWMsY0FBYyxjQUFjLE1BQWQsR0FBdUIsQ0FBckMsQ0FBbEI7QUFDQSxjQUFJLGFBQWEsRUFBakI7QUFDQSxjQUFJLFdBQUosRUFBaUI7QUFDZjtBQUNBO0FBQ0EseUJBQWEsUUFBUSxJQUFSLENBQWEsV0FBYixDQUFiO0FBQ0EsaUJBQUssSUFBSSxHQUFULElBQWdCLFVBQWhCLEVBQTRCO0FBQzFCLGtCQUFJLFdBQVcsR0FBWCxNQUFvQixXQUF4QixFQUFxQztBQUNuQywyQkFBVyxHQUFYLElBQWtCLEVBQWxCO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Qsd0JBQWMsSUFBZCxDQUFtQixVQUFuQjtBQUNEOztBQUVELGlCQUFTLFlBQVQsQ0FBc0IsTUFBdEIsRUFBOEI7QUFDNUI7QUFDQSxrQkFBUSxPQUFSLENBQWdCLE1BQWhCLEVBQXdCLFVBQVMsS0FBVCxFQUFnQixLQUFoQixFQUF1QjtBQUM3QyxnQkFBSSxNQUFNLFVBQVYsRUFBc0I7QUFDcEIsMkJBQWEsTUFBTSxVQUFuQjtBQUNBLHFCQUZvQixDQUVaO0FBQ1Q7O0FBRUQsZ0JBQUksTUFBTSxlQUFOLElBQXlCLE1BQU0sZUFBTixDQUFzQixNQUFuRCxFQUEyRDtBQUN6RCwyQkFBYSxNQUFNLGVBQU4sQ0FBc0IsTUFBbkM7QUFDRDs7QUFFRCxrQkFBTSxFQUFOLEdBQVcsTUFBTSxFQUFOLElBQWEsTUFBTSxHQUFOLEdBQVksR0FBWixHQUFrQixLQUFsQixHQUEwQixHQUExQixHQUFnQyxNQUFoQyxHQUF5QyxhQUFhLENBQWIsRUFBZ0IsSUFBaEIsQ0FBakU7QUFDRCxXQVhEO0FBWUQ7O0FBRUQsaUJBQVMsWUFBVCxDQUFzQixHQUF0QixFQUEyQixHQUEzQixFQUFnQztBQUM5QixpQkFBTyxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsTUFBaUIsTUFBTSxHQUF2QixDQUFYLElBQTBDLEdBQWpEO0FBQ0Q7QUFFRixPQXJEVzs7QUFIZSxLQUE3QjtBQTRERCxHQWhFZSxDQUFoQjtBQWtFRCxDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNvbnN0IG5nTW9kdWxlTmFtZSA9ICdmb3JtbHlSZXBlYXRpbmdTZWN0aW9uJztcbmNvbnN0IGFuZ3VsYXIgPSB3aW5kb3cuYW5ndWxhcjtcbmNvbnN0IG5nTW9kdWxlID0gYW5ndWxhci5tb2R1bGUobmdNb2R1bGVOYW1lLCBbICdmb3JtbHknIF0pO1xuXG5pbXBvcnQgcmVwZWF0aW5nU2VjdGlvbiBmcm9tICcuL3JlcGVhdGluZy1zZWN0aW9uJztcbnJlcGVhdGluZ1NlY3Rpb24obmdNb2R1bGUpO1xuXG5leHBvcnQgZGVmYXVsdCBuZ01vZHVsZU5hbWU7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPCEtLWxvb3AgdGhyb3VnaCBlYWNoIGVsZW1lbnQgaW4gbW9kZWwgYXJyYXktLT5cXG48ZGl2IGNsYXNzPVxcXCJ7e2hpZGVSZXBlYXR9fVxcXCI+XFxuICA8ZGl2IGNsYXNzPVxcXCJyZXBlYXRzZWN0aW9uXFxcIiBuZy1yZXBlYXQ9XFxcImVsZW1lbnQgaW4gbW9kZWxbb3B0aW9ucy5rZXldXFxcIiBuZy1pbml0PVxcXCJmaWVsZHMgPSBjb3B5RmllbGRzKHRvLmZpZWxkcylcXFwiPlxcbiAgICA8Zm9ybWx5LWZvcm0gZmllbGRzPVxcXCJmaWVsZHNcXFwiXFxuICAgICAgICAgICAgICAgICBtb2RlbD1cXFwiZWxlbWVudFxcXCJcXG4gICAgICAgICAgICAgICAgIGZvcm09XFxcImZvcm1cXFwiPlxcbiAgICA8L2Zvcm1seS1mb3JtPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJyZW1vdmUtYnV0dG9uLWNvbnRhaW5lclxcXCIgc3R5bGU9XFxcIlxcXCI+XFxuICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXNtIGJ0bi1kYW5nZXIgcmVtb3ZlLWJ1dHRvblxcXCIgbmctY2xpY2s9XFxcIm1vZGVsW29wdGlvbnMua2V5XS5zcGxpY2UoJGluZGV4LCAxKVxcXCI+XFxuICAgICAgICBSZW1vdmVcXG4gICAgICA8L2J1dHRvbj5cXG4gICAgPC9kaXY+XFxuPC9kaXY+XFxuPHAgY2xhc3M9XFxcIkFkZE5ld0J1dHRvblxcXCI+XFxuICAgICAgPGJ1dHRvbiB0eXBlPVxcXCJidXR0b25cXFwiIGNsYXNzPVxcXCJidG4gYnRuLXByaW1hcnlcXFwiIG5nLWNsaWNrPVxcXCJhZGROZXcoKVxcXCIgPnt7dG8uYnRuVGV4dH19PC9idXR0b24+XFxuPC9wPlxcblwiO1xuIiwiZXhwb3J0IGRlZmF1bHQgbmdNb2R1bGUgPT4ge1xuXG4gIG5nTW9kdWxlLmNvbmZpZyhbICdmb3JtbHlDb25maWdQcm92aWRlcicsIGZvcm1seUNvbmZpZ1Byb3ZpZGVyID0+IHtcblxuICAgIHZhciB1bmlxdWUgPSAxO1xuXG4gICAgZm9ybWx5Q29uZmlnUHJvdmlkZXIuc2V0VHlwZSh7XG4gICAgICBuYW1lOiAncmVwZWF0U2VjdGlvbicsXG4gICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9yZXBlYXRpbmctc2VjdGlvbi5odG1sJyksXG4gICAgICBjb250cm9sbGVyOiBbICckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcblxuICAgICAgICAkc2NvcGUuZm9ybU9wdGlvbnMgPSB7Zm9ybVN0YXRlOiAkc2NvcGUuZm9ybVN0YXRlfTtcblxuICAgICAgICAkc2NvcGUuYWRkTmV3ID0gYWRkTmV3O1xuXG4gICAgICAgICRzY29wZS5jb3B5RmllbGRzID0gY29weUZpZWxkcztcblxuXG4gICAgICAgIGZ1bmN0aW9uIGNvcHlGaWVsZHMoZmllbGRzKSB7XG4gICAgICAgICAgZmllbGRzID0gYW5ndWxhci5jb3B5KGZpZWxkcyk7XG4gICAgICAgICAgYWRkUmFuZG9tSWRzKGZpZWxkcyk7XG4gICAgICAgICAgcmV0dXJuIGZpZWxkcztcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGFkZE5ldygpIHtcbiAgICAgICAgICAkc2NvcGUubW9kZWxbJHNjb3BlLm9wdGlvbnMua2V5XSA9ICRzY29wZS5tb2RlbFskc2NvcGUub3B0aW9ucy5rZXldIHx8IFtdO1xuICAgICAgICAgIHZhciByZXBlYXRzZWN0aW9uID0gJHNjb3BlLm1vZGVsWyRzY29wZS5vcHRpb25zLmtleV07XG4gICAgICAgICAgdmFyIGxhc3RTZWN0aW9uID0gcmVwZWF0c2VjdGlvbltyZXBlYXRzZWN0aW9uLmxlbmd0aCAtIDFdO1xuICAgICAgICAgIHZhciBuZXdzZWN0aW9uID0ge307XG4gICAgICAgICAgaWYgKGxhc3RTZWN0aW9uKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhsYXN0U2VjdGlvbik7XG4gICAgICAgICAgICAvLyBuZXdzZWN0aW9uID0gYW5ndWxhci5jb3B5KHJlcGVhdHNlY3Rpb24pO1xuICAgICAgICAgICAgbmV3c2VjdGlvbiA9IGFuZ3VsYXIuY29weShsYXN0U2VjdGlvbik7XG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gbmV3c2VjdGlvbikge1xuICAgICAgICAgICAgICBpZiAobmV3c2VjdGlvbltrZXldICE9PSBcIiQkaGFzaEtleVwiKSB7XG4gICAgICAgICAgICAgICAgbmV3c2VjdGlvbltrZXldID0gXCJcIjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXBlYXRzZWN0aW9uLnB1c2gobmV3c2VjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBhZGRSYW5kb21JZHMoZmllbGRzKSB7XG4gICAgICAgICAgdW5pcXVlKys7XG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGZpZWxkcywgZnVuY3Rpb24oZmllbGQsIGluZGV4KSB7XG4gICAgICAgICAgICBpZiAoZmllbGQuZmllbGRHcm91cCkge1xuICAgICAgICAgICAgICBhZGRSYW5kb21JZHMoZmllbGQuZmllbGRHcm91cCk7XG4gICAgICAgICAgICAgIHJldHVybjsgLy8gZmllbGRHcm91cHMgZG9uJ3QgbmVlZCBhbiBJRFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZmllbGQudGVtcGxhdGVPcHRpb25zICYmIGZpZWxkLnRlbXBsYXRlT3B0aW9ucy5maWVsZHMpIHtcbiAgICAgICAgICAgICAgYWRkUmFuZG9tSWRzKGZpZWxkLnRlbXBsYXRlT3B0aW9ucy5maWVsZHMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmaWVsZC5pZCA9IGZpZWxkLmlkIHx8IChmaWVsZC5rZXkgKyAnXycgKyBpbmRleCArICdfJyArIHVuaXF1ZSArIGdldFJhbmRvbUludCgwLCA5OTk5KSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRSYW5kb21JbnQobWluLCBtYXgpIHtcbiAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluO1xuICAgICAgICB9XG5cbiAgICAgIH1dXG5cbiAgICB9KTtcblxuICB9XSk7XG5cbn1cbiJdfQ==
