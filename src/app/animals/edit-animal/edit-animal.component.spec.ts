import {
    async,
    ComponentFixture,
    TestBed,
    tick,
    fakeAsync,
} from '@angular/core/testing';
import { EditAnimalComponent } from './edit-animal.component';
import { Router } from '@angular/router';
import { getTestAnimals, animalServiceStub } from '../shared/testing';
import { AnimalService } from '../shared/animal.service';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Animal } from '../shared/animal.model';
import { newEvent, click } from 'src/app/testing';

let component: EditAnimalComponent;
let fixture: ComponentFixture<EditAnimalComponent>;
let page: Page;
const animals: Animal[] = getTestAnimals();

describe('EditAnimalComponent', () => {
    describe('with ReactiveFormsModule setup', formsModuleSetup);
});

function formsModuleSetup() {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, ReactiveFormsModule],
            declarations: [EditAnimalComponent],
            providers: [
                FormBuilder,
                { provide: AnimalService, useValue: animalServiceStub },
            ],
        }).compileComponents();
    }));
    beforeEach(async(() => {
        createComponent();
    }));
    it(`should have save button`, async(() => {
        expect(page.saveBtn).toBeDefined();
    }));
    it(`should have remove button`, async(() => {
        expect(page.removeAnimalBtn).toBeDefined();
    }));
    it(`should have add button`, async(() => {
        expect(page.addAnimalBtn).toBeDefined();
    }));
    it(`should have name input field`, async(() => {
        expect(page.nameInput).toBeDefined();
    }));
    it(`should have sound input field`, async(() => {
        expect(page.soundInput).toBeDefined();
    }));
    it(`save animals button should be disabled initially`, async(() => {
        expect(page.saveBtn.disabled).toBe(true);
    }));

    it(`save animals button should be enabled after valid input`, async(() => {
        page.nameInput.value = 'mock-name';
        page.soundInput.value = 'mock-sound';
        page.nameInput.dispatchEvent(newEvent('input'));
        page.soundInput.dispatchEvent(newEvent('input'));
        fixture.detectChanges();
        expect(page.saveBtn.disabled).toBe(false);
    }));
    it(`onSubmit should have been called after valid form was submitted`, fakeAsync(() => {
        const name = 'mock-name';
        const sound = 'mock-sound';
        page.nameInput.value = name;
        page.soundInput.value = sound;
        page.nameInput.dispatchEvent(newEvent('input'));
        page.soundInput.dispatchEvent(newEvent('input'));
        fixture.detectChanges();
        spyOn(component, 'onSubmit').and.callThrough();
        spyOn(animalServiceStub, 'addAnimal').and.callThrough();
        page.saveBtn.click();
        tick();
        fixture.detectChanges();
        expect(component.onSubmit).toHaveBeenCalled();
        expect(animalServiceStub.addAnimal).toHaveBeenCalled();
        expect(animalServiceStub.addAnimal({ name, sound })).toBe(
            'animal added to db'
        );
    }));
    it(`delAnimal should have been called after delete button was clicked`, fakeAsync(() => {
        spyOn(component, 'delAnimal').and.callThrough();
        const formFiledCountBefore = page.formField.length;
        page.removeAnimalBtn.click();
        tick();
        fixture.detectChanges();
        expect(component.delAnimal).toHaveBeenCalled();
        const formFiledCountAfter = page.formField.length;
        expect(formFiledCountAfter).toBeLessThan(formFiledCountBefore);
    }));
    it(`addAnimalForm should have been called after addAnimal button was clicked`, fakeAsync(() => {
        spyOn(component, 'addAnimalForm').and.callThrough();
        const formFiledCountBefore = page.formField.length;
        page.addAnimalBtn.click();
        tick();
        fixture.detectChanges();
        const formFiledCountAfter = page.formField.length;
        expect(component.addAnimalForm).toHaveBeenCalled();
        expect(formFiledCountAfter).toBeGreaterThan(formFiledCountBefore);
    }));
}
function createComponent() {
    fixture = TestBed.createComponent(EditAnimalComponent);
    component = fixture.componentInstance;
    page = new Page(fixture);
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
        fixture.detectChanges();
    });
}

class Page {
    get saveBtn() {
        return this.query<HTMLButtonElement>('.save-animals');
    }
    get removeAnimalBtn() {
        return this.query<HTMLButtonElement>('.del-animal');
    }
    get addAnimalBtn() {
        return this.query<HTMLButtonElement>('.add-animal');
    }
    get nameInput() {
        return this.query<HTMLInputElement>('#name');
    }
    get soundInput() {
        return this.query<HTMLInputElement>('#sound');
    }
    get formField() {
        return this.queryAll<HTMLElement>('.form-field');
    }
    onSubmitSpy: jasmine.Spy;
    addAnimalForm: jasmine.Spy;
    delAnimal: jasmine.Spy;
    navigateSpy: jasmine.Spy;

    // tslint:disable-next-line: no-shadowed-variable
    constructor(fixture: ComponentFixture<EditAnimalComponent>) {}

    private query<T>(selector: string): T {
        return fixture.nativeElement.querySelector(selector);
    }
    private queryAll<T>(selector: string): T[] {
        return fixture.nativeElement.querySelectorAll(selector);
    }
}
