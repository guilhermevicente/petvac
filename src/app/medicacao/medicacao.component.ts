import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Medicacao } from 'src/model/medicacao';
import { Pet } from 'src/model/pet';
import { PetStorageService } from '../pets/pet-storage.service';
import { MedicacaoStorageService } from './medicacao-storage.service';
import { NgForm } from '@angular/forms';
import { Raca } from 'src/model/raca';
import { Especie } from 'src/model/especie';

@Component({
  selector: 'app-medicacao',
  templateUrl: './medicacao.component.html',
  styleUrls: ['./medicacao.component.css']
})
export class MedicacaoComponent implements OnInit {
  @ViewChild('petSelect') petSelect!: ElementRef;
  @ViewChild('form') form!: NgForm;

  isShowMessage: boolean = false
  isSuccess!: boolean;
  isSubmitted!: boolean;
  message!: string;
  medicacoes?: Medicacao[];
  medicacao!: Medicacao;
  pets?: Pet[];

  constructor(private petService: PetStorageService, private medicacaoService: MedicacaoStorageService) {
    setTimeout(() => {
      M.FormSelect.init(this.petSelect.nativeElement);
    }, 100);
  }

  ngOnInit(): void {
    this.medicacao = new Medicacao('', '', '',new Pet('', '', '', new Raca(0, '', 0), new Especie(0, '')));
    this.obterPets();
    this.obterMedicacoes();
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

    if (!this.medicacaoService.isExist(this.medicacao.id)) {
      this.medicacaoService.save(this.medicacao).subscribe(
        (data) => {
          this.isShowMessage = true;
          this.isSuccess = true;
          this.message = 'Sucesso ao cadastrar a medicação!';
          this.form.reset();
          this.medicacao = new Medicacao('', '', '',new Pet('', '', '', new Raca(0, '', 0), new Especie(0, '')));
          this.obterMedicacoes();
        },
        (error) => {
          alert('Não foi possível cadastrar a medicação');
        }
      );
    } else {
      this.medicacaoService.update(this.medicacao).subscribe(
        (data) => {
          this.isShowMessage = true;
          this.isSuccess = true;
          this.message = 'Sucesso ao atualizar a medicação!';
          this.form.reset();
          this.medicacao = new Medicacao('', '', '',new Pet('', '', '', new Raca(0, '', 0), new Especie(0, '')));
          this.obterMedicacoes();
        },
        (error) => {
          alert('Não foi possível atualizar a medicação');
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

  onEdit(medicacao: Medicacao) {
    let cloneMedicacao: Medicacao = Medicacao.clone(medicacao);
    this.medicacao = cloneMedicacao;
  }

  onDelete(id: string) {
    this.medicacaoService.delete(id).subscribe({
      next: data => {
        this.isShowMessage = true;
        this.isSuccess = true;
        this.message = 'Sucesso ao remover a medicação!';
        this.form.reset();
        this.obterMedicacoes();
      },
      error: error => {
        console.log('componente');
        console.log(error);
        alert(error.message);
      }
    });
  }

  obterMedicacoes() {
    this.medicacaoService.buscarMedicacoes().subscribe(
      (data: Medicacao[]) => {
        if (!data || data.length == 0) {
          alert('Medicações não encontradas!');
        }
        this.medicacoes = data;
      },
      (error) => {
        console.log('componente');
        console.log(error);
        alert(error.message);
      }
    );
  }
}
