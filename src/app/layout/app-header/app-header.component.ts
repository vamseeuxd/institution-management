import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  @Input() menuOpen = false;
  @Output() menuOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.menuOpenChange.emit(this.menuOpen);
  }
}
