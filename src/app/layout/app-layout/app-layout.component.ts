import {Component, OnInit} from '@angular/core';
import {BusyIndicatorService} from '../../shared/services/busy-indicator/busy-indicator.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {

  constructor(
    public router: Router,
    public busyIndicator: BusyIndicatorService
  ) {
  }

  ngOnInit(): void {
  }

}
