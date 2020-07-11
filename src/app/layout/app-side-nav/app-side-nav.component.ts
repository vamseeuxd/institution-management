import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './app-side-nav.component.html',
  styleUrls: ['./app-side-nav.component.scss']
})
export class AppSideNavComponent implements OnInit {
  @Input() menuOpen = false;
  constructor() { }

  ngOnInit(): void {
  }

}
