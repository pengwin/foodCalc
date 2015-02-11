/**
 * Created by ikruchkov on 08.02.2015.
 */

angular.module('meal_calc.services').service('coefficients', ['settings', function(settingsService){

    var defaults = {
        fatsAmount: 0.5,  //g/kg
        carbohydratesAmount: 5,
        proteinsAmount: 2
    };

    var values;

    function loadCoefficients(){
        var settings = settingsService.load();
        values = settings.coefficients || defaults;
    }

    function storeCoefficients(){
        var settings = settingsService.load();
        settings.coefficients = values;
        settingsService.save(settings);
    }

    var service = {};

    Object.defineProperty(service, 'fatsAmount', {
        get: function (){ return values.fatsAmount; },
        set: function (val) {
            values.fatsAmount = val;
            storeCoefficients()
        }
    });

    Object.defineProperty(service, 'carbohydratesAmount', {
        get: function (){ return values.carbohydratesAmount; },
        set: function (val) {
            values.carbohydratesAmount = val;
            storeCoefficients()
        }
    });

    Object.defineProperty(service, 'proteinsAmount', {
        get: function (){ return values.proteinsAmount; },
        set: function (val) {
            values.proteinsAmount = val;
            storeCoefficients()
        }
    });

    loadCoefficients();
    return service;
}]);
