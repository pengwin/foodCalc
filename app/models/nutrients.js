/**
 * Created by ikruchkov on 09.02.2015.
 */


function Nutrients(proteins, fats, carbohydrates) {
    var _carbohydrates = new Weight();
    var _proteins = new Weight();
    var _fats = new Weight();

    Object.defineProperty(this, 'proteins', {
        writable : false,
        value: _proteins
    });

    Object.defineProperty(this, 'carbohydrates', {
        writable : false,
        value: _carbohydrates
    });

    Object.defineProperty(this, 'fats', {
        writable : false,
        value: _fats
    });

    if (proteins){
        this.proteins.g = proteins;
    }
    if (fats) {
        this.fats.g = fats;
    }
    if (carbohydrates){
        this.carbohydrates.g = carbohydrates;
    }
}

Nutrients.prototype.add = function (nutrients){
     if (nutrients instanceof  Nutrients){
         this.fats.g += nutrients.fats;
         this.carbohydrates.g += nutrients.carbohydrates;
         this.proteins.g += nutrients.proteins;
     } else {
         throw 'Wrong argument';
     }
};

Nutrients.diff = function (nutrientsA, nutrientsB){
    if (nutrientsA instanceof  Nutrients && nutrientsB instanceof  Nutrients){
        return new Nutrients(
            nutrientsA.proteins - nutrientsB.proteins,
            nutrientsA.fats - nutrientsB.fats,
            nutrientsA.carbohydrates - nutrientsB.carbohydrates);
    } else {
        throw 'Wrong argument';
    }
};

Nutrients.percent = function (nutrientsA, nutrientsB){
    if (nutrientsA instanceof  Nutrients && nutrientsB instanceof  Nutrients){
        return new Nutrients(
            nutrientsB.proteins / nutrientsA.proteins,
            nutrientsB.fats / nutrientsA.fats,
            nutrientsB.carbohydrates / nutrientsA.carbohydrates);
    } else {
        throw 'Wrong argument';
    }
};
