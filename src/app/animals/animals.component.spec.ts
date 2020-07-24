import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalsComponent } from './animals.component';
import { AnimalService } from './shared/animal.service';
import { Component, Input, DebugElement } from '@angular/core';
import { Animal } from './shared/animal.model';
import { RouterLinkDirectiveStub } from '../testing';
import { By } from '@angular/platform-browser';
import { animalServiceStub } from './shared/testing';

@Component({ selector: 'app-animal', template: '' })
class AnimalStubComponent {
    @Input() animal: Animal;
}

describe('AnimalsComponent', () => {
    let component: AnimalsComponent;
    let fixture: ComponentFixture<AnimalsComponent>;
    let routerLinks: RouterLinkDirectiveStub[];
    let linkDestination: DebugElement[];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [
                AnimalsComponent,
                AnimalStubComponent,
                RouterLinkDirectiveStub,
            ],
            providers: [
                { provide: AnimalService, useValue: animalServiceStub },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AnimalsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        linkDestination = fixture.debugElement.queryAll(
            By.directive(RouterLinkDirectiveStub)
        );
        routerLinks = linkDestination.map((de) =>
            de.injector.get(RouterLinkDirectiveStub)
        );
    });

    it('can instantiate the component', () => {
        expect(component).not.toBeNull();
    });

    it(`should have an animals object`, () => {
        expect(component.animals).toBeDefined();
    });
    it(`should have an animals array width length 3`, () => {
        expect(component.animals.length).toBe(3);
    });
    it('can get RouterLinks from template', () => {
        expect(routerLinks.length).toBe(1, 'should have 1 routerLink');
        expect(routerLinks[0].linkParams).toEqual(['/edit-animal']);
    });
    it('can click button width RouterLink in template', () => {
        const linkDebug = linkDestination[0];
        const linkEl = routerLinks[0];

        expect(linkEl.navigatedTo).toBeNull('should not have navigated yet');

        linkDebug.triggerEventHandler('click', null);
        fixture.detectChanges();

        expect(linkEl.navigatedTo).toEqual(['/edit-animal']);
    });
});
