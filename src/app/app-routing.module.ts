import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PetsComponent } from './pets/pets.component';
import { VacinasComponent } from './vacinas/vacinas.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { ServicosComponent } from './servicos/servicos.component';
import { ExamesComponent } from './exames/exames.component';
import { MedicacaoComponent } from './medicacao/medicacao.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'pets', component: PetsComponent},
  {path: 'vacinas', component: VacinasComponent},
  {path: 'consultas', component: ConsultasComponent},
  {path: 'medicacao', component: MedicacaoComponent},
  {path: 'servicos', component: ServicosComponent},
  {path: 'consultas/exames/:idConsulta', component: ExamesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
