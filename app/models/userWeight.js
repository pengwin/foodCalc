/**
 * Created by ikruchkov on 10.02.2015.
 */

function UserWeight(weightProvider, weightStoreFunc){
    if (!angular.isFunction(weightProvider)){
        throw 'weightProvider should be function';
    }
    if (!angular.isFunction(weightStoreFunc)){
        throw 'weightStoreFunc should be function';
    }

    var startWeight = weightProvider();
    Weight.call(this, startWeight, 'g');

    delete this.kg;
    delete this.g;

    Object.defineProperty(this, 'kg', {
        get: function (){ return this.getValue('kg'); },
        set: function (val) {
            this.setValue(val, 'kg');
            weightStoreFunc(this.getValue('g'));
        }
    });
    Object.defineProperty(this, 'g', {
        get: function () {  return this.getValue('g'); },
        set: function (val) {
            this.setValue(val, 'g');
            weightStoreFunc(this.weight.g);
        }
    });
}

UserWeight.prototype = Object.create(Weight.prototype);

