import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { ArchieveComponent } from './archieve/archieve.component';

export const routes : Routes = [
    {
        path:'',
        redirectTo:'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'archieve',
        component: ArchieveComponent
    }
]
