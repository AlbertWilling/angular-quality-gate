import { Component, OnInit } from '@angular/core';
import {DetailsService} from '../../services/details.service';
import {ActivatedRoute} from '@angular/router';
import {SightseeingPoint} from '../../../models/sightseeing-point';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  id = '';
  sight = new SightseeingPoint();

  constructor(private detailsService: DetailsService, private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(params => this.id = params.id);
  }

  ngOnInit(): void {
    this.detailsService.getSightById(this.id).subscribe(result => this.sight = result);
  }

}
