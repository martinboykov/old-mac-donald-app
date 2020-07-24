import { Injectable } from '@angular/core';
import { Animal } from './animal.model';
import { ANIMALS_DB } from '../shared/animals';

@Injectable({
    providedIn: 'root',
})
export class AnimalService {
    constructor() {}
    getAnimals() {
        return ANIMALS_DB.animals;
    }
    addAnimal(animal: Animal) {
        ANIMALS_DB.animals.push(animal);
    }
}
