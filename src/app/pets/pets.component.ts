import { Shared } from './../util/shared';
import { Raca } from './../../model/raca';
import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { NgForm } from '@angular/forms';
import { PetStorageService } from './pet-storage.service';
import { Pet } from 'src/model/pet';
import { Especie } from 'src/model/especie';
import { EspecieStorageService } from '../especies/especie-storage.service';
import { RacaStorageService } from '../racas/raca-storage.service';
import * as M from 'materialize-css';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css'],
  providers: [PetStorageService, EspecieStorageService, RacaStorageService]
})
export class PetsComponent implements OnInit {
  @ViewChild('form') form!: NgForm;
  @ViewChild('especieSelect') especieSelect!: ElementRef;
  @ViewChild('racaSelect') racaSelect!: ElementRef;

  especies?: Especie[];
  racas?: Raca[];

  pet!: Pet;
  pets?: Pet[];

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  constructor(private petService: PetStorageService, private especieService: EspecieStorageService, private racaService: RacaStorageService) {
    setTimeout(() => {
      M.FormSelect.init(this.especieSelect.nativeElement);
    }, 100);
  }

  ngOnInit(): void {

    // Incluído para publicação no GitHub Pages
    Shared.initializeWebStorage();

    this.pet = new Pet('', '', '', new Raca(0, '', 0), new Especie(0, ''));
    this.obterPets();
    this.listarEspecies();
  }

  listarEspecies() {
    this.especieService.getEspecies().subscribe(
      (data: Especie[]) => {
        if (!data || data.length == 0) {
          alert('Especies não encontradas!');
        }
        this.especies = data;
      },
      (error) => {
        console.log('componente');
        console.log(error);
        alert(error.message);
      }
    );

    setTimeout(() => {
      M.FormSelect.init(this.especieSelect.nativeElement);
    }, 100);
  }

  // Comentado para publicação no GitHub Pages
  /*onSubmit() {
    this.isSubmitted = true;

    if (!this.petService.isExist(this.pet.id)) {
      this.petService.save(this.pet).subscribe(
        (data) => {
          this.isShowMessage = true;
          this.isSuccess = true;
          this.message = 'Sucesso ao cadastrar o pet!';
          this.form.reset();
          this.pet = new Pet('', '', '', new Raca(0, '', 0), new Especie(0, ''));
          this.obterPets();
        },
        (error) => {
          alert('Não foi possível cadastrar o pet');
        }
      );
    } else {
      this.petService.update(this.pet).subscribe(
        (data) => {
          this.isShowMessage = true;
          this.isSuccess = true;
          this.message = 'Sucesso ao atualizar o pet!';
          this.form.reset();
          this.pet = new Pet('', '', '', new Raca(0, '', 0), new Especie(0, ''));
          this.obterPets();
        },
        (error) => {
          alert('Não foi possível atualizar o pet');
        }
      );
    }
  }*/

  // Incluído para publicação no GitHub Pages
  onSubmit() {
    this.isSubmitted = true;

    if (!this.petService.isExist(this.pet.id)) {
      this.petService.save(this.pet);
    } else {
      this.petService.update(this.pet);
    }
    this.isShowMessage = true;
    this.isSuccess = true;
    this.message = 'Cadastro realizado com sucesso!';

    this.form.reset();
    this.pet = new Pet('', '', '', new Raca(0, '', 0), new Especie(0, ''));

    this.pets = this.petService.getPets();
  }

  compareEspecies(e1: Especie, e2: Especie) {
    if (e1 != null && e2 != null) {
      return e1.id == e2.id;
    }
    return false;
  }

  compareRacas(r1: Raca, r2: Raca) {
    if (r1 != null && r2 != null) {
      return r1.id == r2.id;
    }
    return false;
  }

  onChangeEspecie() {
    this.listarRacas(this.pet.especie);
  }

  listarRacas(especie: Especie) {
    this.racaService.getRacas().subscribe(
      (data: Raca[]) => {
        if (!data || data.length == 0) {
          alert('Raças não encontradas!');
        }
        this.racas = data.filter((obj) => {
          return obj.especieId === especie.id;
        });
      },
      (error) => {
        console.log('componente');
        console.log(error);
        alert(error.message);
      }
    );

    setTimeout(() => {
      M.FormSelect.init(this.racaSelect.nativeElement);
    }, 100);
  }

  onEdit(pet: Pet) {
    let clonePet: Pet = Pet.clone(pet);
    this.listarRacas(clonePet.especie);
    this.pet = clonePet;

    setTimeout(() => {
      M.FormSelect.init(this.especieSelect.nativeElement);
    }, 100);
    setTimeout(() => {
      M.FormSelect.init(this.racaSelect.nativeElement);
    }, 100);
  }

  // Comentado para publicação no GitHub Pages
  /*onDelete(id: string) {
    this.petService.delete(id).subscribe({
      next: data => {
        this.isShowMessage = true;
        this.isSuccess = true;
        this.message = 'Sucesso ao remover o pet!';
        this.form.reset();
        this.obterPets();
      },
      error: error => {
        console.log('componente');
        console.log(error);
        alert(error.message);
      }
    });
  }*/

  // Incluído para publicação no GitHub Pages
  onDelete(nome: string) {
    this.petService.delete(nome);
    this.pets = this.petService.getPets();
  }

  // Comentado para publicação no GitHub Pages
  /*obterPets() {
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
  }*/

  // Incluído para publicação no GitHub Pages
  obterPets() {
    this.pets = this.petService.getPets();
  }
}
