/**
 * Created by ikruchkov on 09.02.2015.
 */

angular.module('meal_calc.filters').filter('units', function() {
    return function(value, units) {

        function round(val){
            return val.toFixed(0);
        }

        if (value instanceof Weight){
            switch (units){
                case 'kg':
                    return round(value.kg) + 'кг';
                case '%':
                    return (value.g * 100.0).toFixed(2) + '%';
                case 'g':
                default:
                    return round(value.g)  + 'г';
            }
        }

        value = Number(value);
        switch (units){
            case 'kg':
                return round(value) / 1000 + 'кг';
            case '%':
                return (value * 100.0).toFixed(2) + '%';
            case 'g':
            default:
                return round(value)  + 'г';
        }
    };
});