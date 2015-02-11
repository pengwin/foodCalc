/**
 * Created by ikruchkov on 09.02.2015.
 */

angular.module('meal_calc.services').service('mealsService', ['nutrientsService', function(nutrientsService){

    var service = {};

    service.calculate = function (foodList, roundPortions){
        service.resultMeals = [];
        service.total = new Nutrients();

        function calcForParam(paramName){
            var amountOnOneMeal = nutrientsService.nutrientsPerDay[paramName] / foodList[paramName].length;
            angular.forEach(foodList[paramName], function (item){
                var finalPortionsNumber =  amountOnOneMeal / item[paramName];
                if (roundPortions){
                    var finalWeight = item.weight * finalPortionsNumber;
                    var rounderPortions = Math.ceil(finalWeight / 100);
                    var diff = rounderPortions*100 - finalWeight;
                    if (diff >= 60){
                        rounderPortions = Math.floor(finalWeight / 100);
                    }
                    finalPortionsNumber = rounderPortions;
                }
                var resultMeal = Food.multiple(item, finalPortionsNumber);
                service.resultMeals.push(resultMeal);
            });
        }

        calcForParam('proteins');
        calcForParam('fats');
        calcForParam('carbohydrates');

        angular.forEach(service.resultMeals, function (item){
            service.total.add(item);
        });
    };

    return service;

}]);
