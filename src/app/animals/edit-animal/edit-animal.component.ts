import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { AnimalService } from '../shared/animal.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-edit-animal',
    templateUrl: './edit-animal.component.html',
    styleUrls: ['./edit-animal.component.scss'],
})
export class EditAnimalComponent implements OnInit {
    animalForm: FormGroup;
    constructor(
        private fb: FormBuilder,
        private animalService: AnimalService,
        private router: Router
    ) {}
    get animals() {
        return this.animalForm.get('animals') as FormArray;
    }

    ngOnInit(): void {
        this.animalForm = this.fb.group({
            animals: new FormArray([], [Validators.required, validateSize]),
        });
        this.animals.push(this.addFormGroup());
    }
    addAnimalForm() {
        this.animals.push(this.addFormGroup());
    }
    delAnimal(index) {
        this.animals.removeAt(index);
    }
    onSubmit() {
        this.animalForm.value.animals.forEach((animal) => {
            this.animalService.addAnimal(animal);
        });
        this.navigateToMain();
    }
    navigateToMain() {
        this.router.navigate(['/']);
    }
    addFormGroup() {
        return this.fb.group({
            name: [
                '',
                [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(60),
                ],
            ],
            sound: [
                '',
                [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(60),
                ],
            ],
        });
    }
}
function validateSize(arr: FormArray) {
    return arr.length < 0 && arr.length > 3
        ? {
              invalidSize: true,
          }
        : null;
}
