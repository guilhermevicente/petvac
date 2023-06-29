import { Pet } from 'src/model/pet';
import { Vacina } from './../../model/vacina';
import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Especie } from 'src/model/especie';
import { Raca } from 'src/model/raca';
import { PetStorageService } from '../pets/pet-storage.service';
import { VacinaStorageService } from './vacina-storage.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-vacinas',
  templateUrl: './vacinas.component.html',
  styleUrls: ['./vacinas.component.css']
})
export class VacinasComponent implements OnInit {
  @ViewChild('petSelect') petSelect!: ElementRef;
  @ViewChild('form') form!: NgForm;

  isShowMessage: boolean = false
  isSuccess!: boolean;
  isSubmitted!: boolean;
  message!: string;
  vacinas?: Vacina[];
  vacina!: Vacina;
  pets?: Pet[];

  constructor(private petService: PetStorageService, private vacinaService: VacinaStorageService) {
    setTimeout(() => {
      M.FormSelect.init(this.petSelect.nativeElement);
    }, 100);
  }

  ngOnInit(): void {
    this.vacina = new Vacina('', '', '', '',new Pet('', '', '', new Raca(0, '', 0), new Especie(0, '')));
    this.obterPets();
    this.obterVacinas();
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

  onSubmit() {
    this.isSubmitted = true;

    if (!this.vacinaService.isExist(this.vacina.id)) {
      this.vacinaService.save(this.vacina).subscribe(
        (data) => {
          this.isShowMessage = true;
          this.isSuccess = true;
          this.message = 'Sucesso ao cadastrar a vacina!';
          this.form.reset();
          this.vacina = new Vacina('', '', '', '',new Pet('', '', '', new Raca(0, '', 0), new Especie(0, '')));
          this.obterVacinas();
        },
        (error) => {
          alert('Não foi possível cadastrar a vacina');
        }
      );
    } else {
      this.vacinaService.update(this.vacina).subscribe(
        (data) => {
          this.isShowMessage = true;
          this.isSuccess = true;
          this.message = 'Sucesso ao atualizar a vacina!';
          this.form.reset();
          this.vacina = new Vacina('', '', '', '',new Pet('', '', '', new Raca(0, '', 0), new Especie(0, '')));
          this.obterVacinas();
        },
        (error) => {
          alert('Não foi possível atualizar a vacina');
        }
      );
    }
  }

  onEdit(vacina: Vacina) {
    let cloneVacina: Vacina = Vacina.clone(vacina);
    this.vacina = cloneVacina;
  }

  onDelete(id: string) {
    this.vacinaService.delete(id).subscribe({
      next: data => {
        this.isShowMessage = true;
        this.isSuccess = true;
        this.message = 'Sucesso ao remover a vacina!';
        this.form.reset();
        this.obterVacinas();
      },
      error: error => {
        console.log('componente');
        console.log(error);
        alert(error.message);
      }
    });
  }

  onChangePet() {}

  comparePets(p1: Pet, p2: Pet) {
    if (p1 != null && p2 != null) {
      return p1.id == p2.id;
    }
    return false;
  }

  obterVacinas() {
    this.vacinaService.buscarVacinas().subscribe(
      (data: Vacina[]) => {
        if (!data || data.length == 0) {
          alert('Vacinas não encontradas!');
        }
        this.vacinas = data;
      },
      (error) => {
        console.log('componente');
        console.log(error);
        alert(error.message);
      }
    );
  }
}
