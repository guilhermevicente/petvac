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
    Shared.initializeWebStorage();
    this.pet = new Pet('', '', '', new Raca(0, '', 0), new Especie(0, ''));
    this.obterPets();
    this.listarEspecies();
  }

  listarEspecies() {
    this.especieService.getEspecies().then((esp: Especie[] | undefined) => {
      if (esp !== undefined) {
        this.especies = esp;
      }
    }).catch((e) => {
      console.log('Não foi possível buscar a lista de especies');
    });

    setTimeout(() => {
      M.FormSelect.init(this.especieSelect.nativeElement);
    }, 100);
  }

  onSubmit() {
    this.isSubmitted = true;

    if (!this.petService.isExist(this.pet.id)) {
      this.petService.save(this.pet).then((pts: Pet | undefined) => {
        if (pts !== undefined) {
          console.log('Sucesso ao cadastrar o pet');
        }
      }).catch((e) => {
        console.log('Não foi possível cadastrar o pet');
      });
    } else {
      this.petService.update(this.pet).then((pts: Pet | undefined) => {
        if (pts !== undefined) {
          console.log('Sucesso ao atualizar o pet');
        }
      }).catch((e) => {
        console.log('Não foi possível atualizar o pet');
      });
    }
    this.isShowMessage = true;
    this.isSuccess = true;
    this.message = 'Cadastro realizado com sucesso!';

    this.form.reset();
    this.pet = new Pet('', '', '', new Raca(0, '', 0), new Especie(0, ''));

    this.obterPets();
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
    this.racaService.getRacas().then((r: Raca[] | undefined) => {
      if (r !== undefined) {
        this.racas = r.filter((obj) => {
          return obj.especieId === especie.id;
        });
      }
    }).catch((e) => {
      console.log('Não foi possível buscar a lista de especies');
    });

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

  onDelete(id: string) {
    this.petService.delete(id).then((p: Pet | undefined) => {
      if (p !== undefined) {
        this.obterPets();
      }
    }).catch((e) => {
      console.log('Não foi possível buscar a lista de especies');
    });
  }

  obterPets() {
    this.petService.buscarPets().then((pts: Pet[] | undefined) => {
      if (pts !== undefined) {
        this.pets = pts;
      }
    }).catch((e) => {
      console.log('Não foi possível buscar a lista de pets');
    });
  }
}
