import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBaseTextComponent } from './components/add-base-text/add-base-text.component';
import { AddTranslationComponent } from './components/add-translation/add-translation.component';
import { MainComponent } from './components/main/main.component';
import { SingleTextComponent } from './components/single-text/single-text.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'add-translation', component: AddTranslationComponent },
  { path: 'add-base-text', component: AddBaseTextComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'single-text/:id', component: SingleTextComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
