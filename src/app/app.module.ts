import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreatePetComponent } from './create-pet/create-pet.component';
import { ListPetComponent } from './list-pet/list-pet.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatePetComponent,
    ListPetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
