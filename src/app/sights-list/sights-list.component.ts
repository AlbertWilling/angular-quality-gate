import {Component, OnInit} from '@angular/core';
import {SightseeingPoint} from '../models/sightseeing-point';
import {SightsService} from '../services/sights.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sights-list',
  templateUrl: './sights-list.component.html',
  styleUrls: ['./sights-list.component.scss']
})
export class SightsListComponent implements OnInit {

  sights: SightseeingPoint[];

  constructor(private sightsService: SightsService, private router: Router) {
  }

  ngOnInit(): void {
    this.sightsService.getSights().subscribe(sights => {
      this.sights = sights;
    });
  }

  editSightPoint(sight: SightseeingPoint): void {
    this.router.navigateByUrl(`/sight/edit/${sight.longitude}/${sight.latitude}`);
  }

  showSightPointDetails(sight: SightseeingPoint): void {
    this.router.navigateByUrl(`sight/details/${sight.id}`);
  }
}
