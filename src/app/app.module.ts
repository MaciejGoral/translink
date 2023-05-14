import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainComponent } from './components/main/main.component';
import { AddTranslationComponent } from './components/add-translation/add-translation.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AddBaseTextComponent } from './components/add-base-text/add-base-text.component';
import { SingleTextComponent } from './components/single-text/single-text.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AddTranslationComponent,
    UserProfileComponent,
    AddBaseTextComponent,
    SingleTextComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    NgbTooltipModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
