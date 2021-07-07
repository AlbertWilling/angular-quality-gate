import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Country} from '../../../models/country';
import {SightseeingPoint} from '../../../models/sightseeing-point';
import {ActivatedRoute} from '@angular/router';
import {DetailsService} from '../../services/details.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form: FormGroup;
  longitude = '';
  latitude = '';
  sight: SightseeingPoint;
  sights: string[] = [];

  // longitudePattern =
  // latidutePattern =

  constructor(private detailsService: DetailsService, private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(params => {
      this.longitude = params.longitude;
      this.latitude = params.latitude;
    });
  }

  ngOnInit(): void {
    if (this.longitude && this.latitude) {
      this.detailsService.getSight(Number(this.longitude), Number(this.latitude)).subscribe((result: SightseeingPoint) => {
        this.sight = result[0];
        this.form.patchValue({
          countryName: this.sight.country.name,
          iataCode: this.sight.country.iata_code, ...this.sight
        });
      });
    }
    this.createForm();
  }

  public createForm(): void {
    this.form = new FormGroup(
      {
        name: new FormControl('', [Validators.required]),
        longitude: new FormControl(null, [Validators.required]),
        latitude: new FormControl(null, [Validators.required]),
        countryName: new FormControl('', [Validators.required]),
        iataCode: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required, Validators.maxLength(256)]),
        color: new FormControl('', Validators.required)
      }
    );
  }

  private createRandomId(): string {
    return Math.random().toString(36).substring(2, 12);
  }

  private generateUniqueString(): string {
    let idArray = [];
    this.detailsService.getIds().subscribe(results => {
      idArray = results;
    });
    let randomString = this.createRandomId();
    do {
      randomString = this.createRandomId();
    }
    while (idArray.includes(randomString));
    return randomString;
  }

  createOrUpdateSight(): void {
    if (this.sight) {
        this.getValuesFromForm(this.sight, this.form);
        this.detailsService.updateSight(this.sight.id, this.sight).subscribe();
        return;
      }
    this.sight = new SightseeingPoint();
    this.sight.id = this.generateUniqueString();
    this.getValuesFromForm(this.sight, this.form);
    this.detailsService.addSight(this.sight).subscribe();
    console.log('BluBlu');
  }

  getValuesFromForm(sight: SightseeingPoint, form: FormGroup): void {
    sight.name = form.value.name;
    sight.longitude = form.value.longitude;
    sight.latitude = form.value.latitude;
    sight.country = {
      name: form.value.countryName,
      iata_code: form.value.iataCode
    };
    sight.description = form.value.description;
    sight.color = Number(form.value.color);
  }
}
