import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterLinkDirectiveStub } from '../testing';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let routerLinks: RouterLinkDirectiveStub[];
    let linkDestination: DebugElement[];
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [HeaderComponent, RouterLinkDirectiveStub],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
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
    it('can get RouterLink from template', () => {
        // const homeRoute = routerLinks.filter((rl) => rl.linkParams === ['/']);
        // expect(routerLinks.length).toBeGreaterThanOrEqual(
        //     1,
        //     'should have 1 routerLink'
        // );
        // expect(homeRoute).toBeDefined();
        expect(routerLinks.length).toBe(1, 'should have 1 routerLink');
        expect(routerLinks[0].linkParams).toEqual(['/']);
    });

    // TODO Cousing: ERROR: 'ERROR', TypeError: Cannot read property 'button' of null
    it('can click button width RouterLink in template', () => {
        const linkDebug = linkDestination[0];
        const linkEl = routerLinks[0];
        expect(linkEl.navigatedTo).toBeNull('should not have navigated yet');
        linkDebug.triggerEventHandler('click', {});
        fixture.detectChanges();
        expect(linkEl.navigatedTo).toEqual(['/']);
    });
});
