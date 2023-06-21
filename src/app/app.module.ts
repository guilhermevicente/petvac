import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreatePetComponent } from './create-pet/create-pet.component';
import { ListPetComponent } from './list-pet/list-pet.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PetsComponent } from './pets/pets.component';
import { VacinasComponent } from './vacinas/vacinas.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { MedicacaoComponent } from './medicacao/medicacao.component';
import { ServicosComponent } from './servicos/servicos.component';
import { ExamesComponent } from './exames/exames.component';
import { PetSelecionadoComponent } from './pet-selecionado/pet-selecionado.component';
import { FormsModule } from '@angular/forms';
import { RacasComponent } from './racas/racas.component';
import { EspeciesComponent } from './especies/especies.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CreatePetComponent,
    ListPetComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    PetsComponent,
    VacinasComponent,
    ConsultasComponent,
    MedicacaoComponent,
    ServicosComponent,
    ExamesComponent,
    PetSelecionadoComponent,
    RacasComponent,
    EspeciesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
