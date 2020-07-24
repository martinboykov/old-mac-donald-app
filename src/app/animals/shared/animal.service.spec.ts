import { TestBed, tick, fakeAsync } from '@angular/core/testing';

import { AnimalService } from './animal.service';
import { Animal } from './animal.model';
import { ANIMALS_DB } from './animals';

describe('AnimalService', () => {
    let animalService: AnimalService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        animalService = new AnimalService();
    });

    it('should be created', () => {
        expect(animalService).toBeTruthy();
    });
    it('#getAnimals length should be bigger than 5', () => {
        expect(animalService.getAnimals().length).toBeGreaterThanOrEqual(5);
    });
    it('#addAnimal should be called', fakeAsync(() => {
        spyOn(animalService, 'addAnimal').and.callThrough();
        const dbLengthBefore = ANIMALS_DB.animals.length;
        animalService.addAnimal({ name: 'dog', sound: 'bau' } as Animal);
        tick();
        const dbLengthAfter = ANIMALS_DB.animals.length;
        expect(animalService.addAnimal).toHaveBeenCalled();
        expect(dbLengthAfter).toBeGreaterThan(dbLengthBefore);
    }));
});
