/**
 * Created by ikruchkov on 20.01.2015.
 */

angular.module('meal_calc.controllers', []);
angular.module('meal_calc.filters', []);
angular.module('meal_calc.services', []);
angular.module('meal_calc.directives', []);

var app = angular.module('meal_calc',
    [   'meal_calc.controllers',
        'meal_calc.services',
        'meal_calc.filters',
        'meal_calc.directives',
        'ui.router']);

