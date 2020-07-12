import { Component, OnInit } from '@angular/core';
import {BusyIndicatorService} from '../../shared/services/busy-indicator/busy-indicator.service';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {

  constructor(public busyIndicator: BusyIndicatorService) { }

  ngOnInit(): void {
  }

}
