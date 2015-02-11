/**
 * Created by ikruchkov on 08.02.2015.
 */

angular.module('meal_calc.services').service('metricsService', ['settings', function metricsService(settingService){
    function getWeight(){
        var settings = settingService.load();
        return settings.weight || 0.0;
    }

    function setWeight(value){
        var settings = settingService.load();
        settings.weight = value;
        settingService.save(settings);
    }

    var weight = new UserWeight(getWeight, setWeight);

    return {
        weight: weight
    };
}]);
