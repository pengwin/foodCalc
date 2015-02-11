/**
 * Created by ikruchkov on 08.02.2015.
 */

function Weight(value, units) {
    var self = this;
    var _weight;
    units = units || 'g';
    value = value || 0.0;
    if (angular.isString(value)){
        value = Number(value);
    }

    this.setValue = function (value, units){
        if (isNaN(value)){
            throw 'value should be a number';
        }
        if (units != 'g' && units != 'kg') {
            throw "Wrong units. Allowed only 'kg', 'g'";
        }
        _weight = units == 'kg' ? value * 1000.0 : value;
    };

    this.getValue = function (units){
        if (units != 'g' && units != 'kg') {
            throw "Wrong units. Allowed only 'kg', 'g'";
        }
        return units == 'kg' ? _weight / 1000.0 : _weight;
    };

    this.setValue(value, units);

    Object.defineProperty(this, 'kg', {
        configurable: true,
        get: function (){ return self.getValue('kg'); },
        set: function (val) { self.setValue(val, 'kg'); }
    });
    Object.defineProperty(this, 'g', {
        configurable: true,
        get: function () { return self.getValue('g'); },
        set: function (val) { self.setValue(val, 'g'); }
    });
}

Weight.prototype.valueOf = function (){
    return this.getValue('g');
};


Weight.prototype.toString = function (){
    return this.getValue('g') + 'g';
};

