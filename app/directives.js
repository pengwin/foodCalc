/**
 * Created by ikruchkov on 11.02.2015.
 */

angular.module('meal_calc.directives').directive('diff', function() {
    return {
        restrict: 'E',
        scope: { value: '=', percent: '=' },
        template:
        '<span ng-hide="value == 0" class="diff" ng-class="{positive: value > 0, negative: value < 0}" >' +
        '<span ng-show="value > 0">+</span>' +
        '<span>{{value | units : "g"}} ({{percent | units : "%"}})</span>' +
        '</span>',
        replace: true
    };
})
