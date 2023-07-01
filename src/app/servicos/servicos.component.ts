import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Pet } from 'src/model/pet';
import { PetStorageService } from '../pets/pet-storage.service';
import { NgForm } from '@angular/forms';
import { Raca } from 'src/model/raca';
import { Especie } from 'src/model/especie';
import { ServicoStorageService } from './servico-storage.service';
import { Servico } from 'src/model/servico';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})
export class ServicosComponent implements OnInit {
  @ViewChild('petSelect') petSelect!: ElementRef;
  @ViewChild('form') form!: NgForm;

  isShowMessage: boolean = false
  isSuccess!: boolean;
  isSubmitted!: boolean;
  message!: string;
  servicos?: Servico[];
  servico!: Servico;
  pets?: Pet[];

  constructor(private petService: PetStorageService, private servicosService: ServicoStorageService) {
    setTimeout(() => {
      M.FormSelect.init(this.petSelect.nativeElement);
    }, 100);
  }

  ngOnInit(): void {
    this.servico = new Servico('', '', '',new Pet('', '', '', new Raca(0, '', 0), new Especie(0, '')));
    this.obterPets();
    this.obterServicos();
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

    if (!this.servicosService.isExist(this.servico.id)) {
      this.servicosService.save(this.servico).subscribe(
        (data) => {
          this.isShowMessage = true;
          this.isSuccess = true;
          this.message = 'Sucesso ao cadastrar o serviço!';
          this.form.reset();
          this.servico = new Servico('', '', '',new Pet('', '', '', new Raca(0, '', 0), new Especie(0, '')));
          this.obterServicos();
        },
        (error) => {
          alert('Não foi possível cadastrar o serviço!');
        }
      );
    } else {
      this.servicosService.update(this.servico).subscribe(
        (data) => {
          this.isShowMessage = true;
          this.isSuccess = true;
          this.message = 'Sucesso ao atualizar o serviço!';
          this.form.reset();
          this.servico = new Servico('', '', '',new Pet('', '', '', new Raca(0, '', 0), new Especie(0, '')));
          this.obterServicos();
        },
        (error) => {
          alert('Não foi possível atualizar o serviço');
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

  onEdit(servico: Servico) {
    let cloneServico: Servico = Servico.clone(servico);
    this.servico = cloneServico;
  }

  onDelete(id: string) {
    this.servicosService.delete(id).subscribe({
      next: data => {
        this.isShowMessage = true;
        this.isSuccess = true;
        this.message = 'Sucesso ao remover o serviço!';
        this.form.reset();
        this.obterServicos();
      },
      error: error => {
        console.log('componente');
        console.log(error);
        alert(error.message);
      }
    });
  }

  obterServicos() {
    this.servicosService.buscarServicos().subscribe(
      (data: Servico[]) => {
        if (!data || data.length == 0) {
          alert('Serviços não encontradas!');
        }
        this.servicos = data;
      },
      (error) => {
        console.log('componente');
        console.log(error);
        alert(error.message);
      }
    );
  }
}
