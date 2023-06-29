import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Exame } from 'src/model/exame';
import { Pet } from 'src/model/pet';
import { ExameStorageService } from './exame-storage.service';
import { NgForm } from '@angular/forms';
import { Raca } from 'src/model/raca';
import { Especie } from 'src/model/especie';
import { PetStorageService } from '../pets/pet-storage.service';

@Component({
  selector: 'app-exames',
  templateUrl: './exames.component.html',
  styleUrls: ['./exames.component.css']
})
export class ExamesComponent {
  @ViewChild('petSelect') petSelect!: ElementRef;
  @ViewChild('form') form!: NgForm;
  isSuccess!: boolean;
  isShowMessage: boolean = false;
  message!: string;
  isSubmitted!: boolean;
  exame!: Exame;
  pets?: Pet[];
  exames?: Exame[];
  idConsulta: string;

  constructor(private route: ActivatedRoute, private exameService: ExameStorageService, private petService: PetStorageService) {
    setTimeout(() => {
      M.FormSelect.init(this.petSelect.nativeElement);
    }, 100);
    this.idConsulta = '';
  }

  ngOnInit(): void {
    this.exame = new Exame('', '', '', new Pet('', '', '', new Raca(0, '', 0), new Especie(0, '')), '');
    this.idConsulta = this.route.snapshot.paramMap.get('idConsulta')!;
    this.obterPets();
    this.obterExames();
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

    if (!this.exameService.isExist(this.exame.id)) {
      this.exame.idConsulta = this.idConsulta;
      this.exameService.save(this.exame).subscribe(
        (data) => {
          this.isShowMessage = true;
          this.isSuccess = true;
          this.message = 'Sucesso ao cadastrar a consulta!';
          this.form.reset();
          this.exame = new Exame('', '', '', new Pet('', '', '', new Raca(0, '', 0), new Especie(0, '')), '');
          this.obterExames();
        },
        (error) => {
          alert('Não foi possível cadastrar o exame');
        }
      );
    } else {
      this.exameService.update(this.exame).subscribe(
        (data) => {
          this.isShowMessage = true;
          this.isSuccess = true;
          this.message = 'Sucesso ao atualizar o exame!';
          this.form.reset();
          this.exame = new Exame('', '', '', new Pet('', '', '', new Raca(0, '', 0), new Especie(0, '')), '');
          this.obterExames();
        },
        (error) => {
          alert('Não foi possível atualizar o exame');
        }
      );
    }
  }

  obterExames() {
    this.exameService.buscarExames().subscribe(
      (data: Exame[]) => {
        if (!data || data.length == 0) {
          console.log('Não há exames para a consulta de id ' + this.idConsulta);
        }
        this.exames = data.filter((obj) => {
          return obj.idConsulta === this.idConsulta;
        });
      },
      (error) => {
        console.log('componente');
        console.log(error);
        alert(error.message);
      }
    );
  }

  onChangePet() {}

  comparePets(p1: Pet, p2: Pet) {
    if (p1 != null && p2 != null) {
      return p1.id == p2.id;
    }
    return false;
  }

  onEdit(exame: Exame) {
    let cloneExame: Exame = Exame.clone(exame);
    this.exame = cloneExame;
  }

  onDelete(id: string) {
    this.exameService.delete(id).subscribe({
      next: data => {
        this.isShowMessage = true;
        this.isSuccess = true;
        this.message = 'Sucesso ao remover o exame!';
        this.form.reset();
        this.obterExames();
      },
      error: error => {
        console.log('componente');
        console.log(error);
        alert(error.message);
      }
    });
  }
}
