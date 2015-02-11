/**
 * Created by ikruchkov on 09.02.2015.
 */

angular.module('meal_calc.services').service('nutrientsService', ['metricsService','coefficients', function(metricsService, coefficients){
    var service  = { nutrientsPerDay : new Nutrients()};

    service.calculate = function (){
        var weight = metricsService.weight;
        service.nutrientsPerDay.fats.setValue(weight.kg * coefficients.fatsAmount, 'g');
        service.nutrientsPerDay.proteins.setValue(weight.kg * coefficients.proteinsAmount, 'g');
        service.nutrientsPerDay.carbohydrates.setValue(weight.kg * coefficients.carbohydratesAmount, 'g');
    };

    return service;
}]);
