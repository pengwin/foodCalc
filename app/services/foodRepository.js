/**
 * Created by ikruchkov on 09.02.2015.
 */

angular.module('meal_calc.services').service('foodRepository', ['settings', function(settingsService){
    var defaults = [
        new Food(
            'Куриная грудка отварная',
            { proteins: 29.8, fats: 1.8 }
    ),
    new Food(
            'Творог 0.2%',
            {proteins: 18, fats: 0.2, carbohydrates: 3.3}
    ),
    new Food(
            'Овсяные хлопья',
            {proteins: 12, fats: 5, carbohydrates: 70}
    ),
    new Food(
            'Рис для плова',
            {proteins: 6.5, fats: 9, carbohydrates: 79}
    ),
    new Food(
            'Молоко обезжиренное	',
            {proteins: 3, fats: 0.2, carbohydrates: 4.7}
    )];

    var meals = [];

    function loadFood(){
        var settings = settingsService.load();
        var list = settings.food;
        if (!list){
            meals = defaults;
            return;
        }
        angular.forEach(list, function (item){
            var meal = new Food(item.name, {proteins: item.proteins, fats: item.fats, carbohydrates: item.carbohydrates} );
            meals.push(meal);
        });
    }

    function saveFood(){
        var settings = settingsService.load();
        var list = [];
        angular.forEach(meals, function(meal){
            var item = { name: meal.name, proteins: meal.proteins.g, fats: meal.fats.g, carbohydrates: meal.carbohydrates.g};
            list.push(item);
        });
        settings.food = list;
        settingsService.save(settings);
    }

    loadFood();
    return { food: meals, save: saveFood };
}]);
