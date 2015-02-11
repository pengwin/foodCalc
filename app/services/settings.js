/**
 * Created by ikruchkov on 10.02.2015.
 */

angular.module('meal_calc.services').service('settings', ['$window', function($window) {
    var settingsKey = 'settings';
    return {
        load: function (){
            var strValue = $window.localStorage.getItem(settingsKey);
            if (!strValue){
                return {};
            }
            return angular.fromJson(strValue);
        },
        save: function (value){
            var strValue = angular.toJson(value);
            $window.localStorage.setItem(settingsKey, strValue);
        }
    }
}]);