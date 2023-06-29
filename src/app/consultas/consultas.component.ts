import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { Consulta } from 'src/model/consulta';
import { Especie } from 'src/model/especie';
import { Pet } from 'src/model/pet';
import { Raca } from 'src/model/raca';
import { PetStorageService } from '../pets/pet-storage.service';
import { ConsultaStorageService } from './consulta-storage.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {
  @ViewChild('petSelect') petSelect!: ElementRef;
  @ViewChild('form') form!: NgForm;

  isSuccess!: boolean;
  isShowMessage: boolean = false;
  message!: string;
  consulta!: Consulta;
  pets?: Pet[];
  consultas?: Consulta[];
  isSubmitted!: boolean;

  constructor(private router: Router, private petService: PetStorageService, private consultaService: ConsultaStorageService) {
    setTimeout(() => {
      M.FormSelect.init(this.petSelect.nativeElement);
    }, 100);
  }

  abrirExames() {
    //var idConsulta = (<HTMLInputElement>document.getElementById('id-consulta')).value;
    this.router.navigate(['/consultas/exames', this.consulta.id]);
  }

  onSubmit() {
    this.isSubmitted = true;

    if (!this.consultaService.isExist(this.consulta.id)) {
      this.consultaService.save(this.consulta).subscribe(
        (data) => {
          this.isShowMessage = true;
          this.isSuccess = true;
          this.message = 'Sucesso ao cadastrar a consulta!';
          this.form.reset();
          this.consulta = new Consulta('', '', new Pet('', '', '', new Raca(0, '', 0), new Especie(0, '')));
          this.obterConsultas();
        },
        (error) => {
          alert('Não foi possível cadastrar a consulta');
        }
      );
    } else {
      this.consultaService.update(this.consulta).subscribe(
        (data) => {
          this.isShowMessage = true;
          this.isSuccess = true;
          this.message = 'Sucesso ao atualizar a consulta!';
          this.form.reset();
          this.consulta = new Consulta('', '', new Pet('', '', '', new Raca(0, '', 0), new Especie(0, '')));
          this.obterConsultas();
        },
        (error) => {
          alert('Não foi possível atualizar a consulta');
        }
      );
    }
  }

  onChangePet() {}

  comparePets(p1: Pet, p2: Pet) {
    if (p1 != null && p2 != null) {
      return p1.id == p2.id;
    }
    return false;
  }

  ngOnInit(): void {
    this.consulta = new Consulta('', '', new Pet('', '', '', new Raca(0, '', 0), new Especie(0, '')));
    this.obterPets();
    this.obterConsultas();
  }

  obterPets() {
    this.petService.buscarPets().subscribe(
      (data: Pet[]) => {
        if (!data || data.length == 0) {
          alert('Pets não encontrados!');
        }
        this.pets = data;
      },
      (error) => {
        console.log('componente');
        console.log(error);
        alert(error.message);
      }
    );
  }

  onEdit(consulta: Consulta) {
    let cloneConsulta: Consulta = Consulta.clone(consulta);
    this.consulta = cloneConsulta;
  }

  onDelete(id: string) {
    this.consultaService.delete(id).subscribe({
      next: data => {
        this.isShowMessage = true;
        this.isSuccess = true;
        this.message = 'Sucesso ao remover a consulta!';
        this.form.reset();
        this.obterConsultas();
      },
      error: error => {
        console.log('componente');
        console.log(error);
        alert(error.message);
      }
    });
  }

  obterConsultas() {
    this.consultaService.buscarConsultas().subscribe(
      (data: Consulta[]) => {
        if (!data || data.length == 0) {
          alert('Consultas não encontradas!');
        }
        this.consultas = data;
      },
      (error) => {
        console.log('componente');
        console.log(error);
        alert(error.message);
      }
    );
  }
}
