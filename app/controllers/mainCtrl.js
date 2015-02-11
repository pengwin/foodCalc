/**
 * Created by ikruchkov on 09.02.2015.
 */

angular.module('meal_calc.controllers').controller('MainCtrl',
    ['$scope', 'nutrientsService', 'metricsService', 'foodRepository', 'mealsService', 'coefficients','settings', '$timeout',
    function($scope, nutrientsService, metricsService, foodRepository, mealsService, coefficients, settingService, $timeout){

        function init(){
            var settings = settingService.load();
            $scope.settings = { roundPortions : settings.roundPortions };
            $scope.weightSetUp = false;
            $scope.mealSelected = false;

            $scope.foodLists = [];
            $scope.foodLists.push({
                name: 'proteins',
                label: 'Белки',
                orderBy: '-proteins',
                hidePredicate: function (meal){
                    return  (meal.selected && meal.selected.carbohydrates) || meal == $scope.editedFood;
                }
            });
            $scope.foodLists.push({
                name: 'carbohydrates',
                label: 'Углеводы',
                orderBy: '-carbohydrates',
                hidePredicate: function (meal){
                    return  (meal.selected && meal.selected.proteins) || meal == $scope.editedFood;
                }
            });

            $scope.nutrients = nutrientsService.nutrientsPerDay;
            $scope.coefficients = coefficients;
            $scope.meals = foodRepository.food;
            $scope.weight = metricsService.weight;
            if ($scope.weight > 0){
                $scope.weightSetUp = true;
            }
            nutrientsService.calculate();
        }

        $scope.weightChanged = function (){
            $scope.weightSetUp = true;
            nutrientsService.calculate();
            $scope.calculateMeals();
        };

        $scope.coefficientsChanged = function (){
            $scope.weightSetUp = true;
            nutrientsService.calculate();
            $scope.calculateMeals();
        };

        $scope.settingsChanged = function (){
            var settings = settingService.load();
            settings.roundPortions =  $scope.settings.roundPortions;
            settingService.save(settings);
            nutrientsService.calculate();
            $scope.calculateMeals();
        };

        var selectFoodTimeout;
        $scope.selectFood = function (meal){
            $scope.selectedFood = meal;
            if (selectFoodTimeout){
                $timeout.cancel(selectFoodTimeout);
            }
            selectFoodTimeout = $timeout(function(){
                $scope.selectedFood = null;
            }, 3000);
        };

        $scope.addFood = function (){
            var name = 'Еда #' + ($scope.meals.length + 1);
            $scope.editedFood = new Food(name, {});
            foodRepository.food.push($scope.editedFood);
        };

        $scope.editFood = function (meal){
            $scope.editedFood = meal;
            $scope.selectedFood = null;
        };

        $scope.saveFood = function (){
            foodRepository.save();
            $scope.editedFood = null;
        };

        $scope.removeFood = function (){
            foodRepository.food.pop($scope.editedFood);
            foodRepository.save();
            $scope.editedFood = null;
        };

        $scope.calculateMeals = function (){
            $scope.mealSelected = false;
            var foodList = { proteins: [], fats: [], carbohydrates: []};

            angular.forEach($scope.meals, function (item){
                if (!item.selected){
                    return;
                }
                if (item.selected.proteins){
                    foodList.proteins.push(item);
                    $scope.mealSelected = true;
                } else if (item.selected.fats){
                    foodList.fats.push(item);
                    $scope.mealSelected = true;
                } else if (item.selected.carbohydrates){
                    foodList.carbohydrates.push(item);
                    $scope.mealSelected = true;
                }
            });

            mealsService.calculate(foodList, $scope.settings.roundPortions);

            $scope.resultMeals = mealsService.resultMeals;
            $scope.total = mealsService.total;

            $scope.diff = Nutrients.diff(mealsService.total, nutrientsService.nutrientsPerDay);
            $scope.percents = Nutrients.percent(nutrientsService.nutrientsPerDay, $scope.diff);
        };

        init();
    }]);
