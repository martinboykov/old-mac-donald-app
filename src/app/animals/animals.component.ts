import { Component, OnInit } from '@angular/core';
import { Animal } from './shared/animal.model';
import { AnimalService } from './shared/animal.service';

@Component({
    selector: 'app-animals',
    templateUrl: './animals.component.html',
    styleUrls: ['./animals.component.scss'],
})
export class AnimalsComponent implements OnInit {
    animals: Animal[];
    constructor(private animalService: AnimalService) {}

    ngOnInit(): void {
        this.animals = this.animalService.getAnimals();
    }
}
