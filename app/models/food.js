/**
 * Created by ikruchkov on 09.02.2015.
 */

function Food(name, nutrients){
    Nutrients.call(this, nutrients.proteins, nutrients.fats, nutrients.carbohydrates);

    this.weight = new Weight(100, 'g');
    this.name = name;
}

Food.prototype = Object.create(Nutrients.prototype);

Food.multiple = function (food, portionsCount){
    var result = new Food(food.name, {
        proteins: food.proteins * portionsCount,
        fats: food.fats * portionsCount,
        carbohydrates: food.carbohydrates * portionsCount
    });
    result.weight.g = food.weight * portionsCount;
    return result;
};

