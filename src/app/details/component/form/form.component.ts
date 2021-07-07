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

  // longitudePattern =
  // latidutePattern =

  constructor(private detailsService: DetailsService, private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(params => {
      this.longitude = params.longitude;
      this.latitude = params.latitude;
      // console.log(this.longitude);
      // console.log(this.latitude);
    });
  }

  ngOnInit(): void {
    if (this.longitude && this.latitude) {
      this.detailsService.getSight(Number(this.longitude), Number(this.latitude)).subscribe((result: SightseeingPoint) => {
        this.sight = result[0];
        console.log({...this.sight, ...this.sight.country});
        this.form.patchValue({countryName: this.sight.country.name, iataCode: this.sight.country.iata_code, ...this.sight});
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

  createOrUpdateSight(): void {
    if (this.sight) {
      this.detailsService.updateSight(this.form.value, this.longitude, this.latitude).subscribe();
    }
    this.sight = new SightseeingPoint();
    this.sight.name = this.form.value.name;
    this.sight.longitude = this.form.value.longitude;
    this.latitude = this.form.value.latitude;
    this.sight.country = {
        name: this.form.value.countryName,
        iata_code: this.form.value.iataCode
      };
    this.sight.description = this.form.value.description;
    this.sight.color = this.form.value.color;
    this.detailsService.addSight(this.sight).subscribe();
  }

  createPoint(): void {

  }
}
