import { getTestAnimals } from './test-animals';
import { Animal } from '../animal.model';

const animals = getTestAnimals();

export const animalServiceStub = {
    getAnimals: () => {
        return animals;
    },
    addAnimal: (newAnimal: Animal) => {
        return 'animal added to db';
    },
};
