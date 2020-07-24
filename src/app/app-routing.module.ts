import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimalsComponent } from './animals/animals.component';
import { EditAnimalComponent } from './animals/edit-animal/edit-animal.component';

const routes: Routes = [
    { path: '', component: AnimalsComponent },
    { path: 'edit-animal', component: EditAnimalComponent },
    {
        path: '**',
        redirectTo: '',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
