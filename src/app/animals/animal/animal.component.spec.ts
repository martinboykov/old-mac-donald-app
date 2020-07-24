import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalComponent } from './animal.component';
import { By } from '@angular/platform-browser';
import { Animal } from '../shared/animal.model';

describe('AnimalComponent', () => {
    let component: AnimalComponent;
    let fixture: ComponentFixture<AnimalComponent>;
    let animalCardTitleEl: HTMLElement;
    let animalCardTextEl: HTMLElement;
    let expectedAnimal: Animal;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [AnimalComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AnimalComponent);
        component = fixture.componentInstance;
        const animalCardTitle = fixture.debugElement.query(
            By.css('.card-title')
        );
        animalCardTitleEl = animalCardTitle.nativeElement;
        const animalCardText = fixture.debugElement.query(By.css('.card-text'));
        animalCardTextEl = animalCardText.nativeElement;
        expectedAnimal = {
            name: 'dog',
            sound: 'bau',
        } as Animal;
        component.animal = expectedAnimal;
        fixture.detectChanges();
    });

    it('should instantiate the component', () => {
        expect(component).toBeTruthy();
    });

    it('should render name of the anminal', () => {
        expect(animalCardTitleEl.textContent).toContain('dog');
    });
    it('should render the verse width the name of the animal', () => {
        expect(animalCardTextEl.textContent).toContain('dog');
    });
    it('should render the verse width the sound of the animal', () => {
        expect(animalCardTextEl.textContent).toContain('bau');
    });
});
