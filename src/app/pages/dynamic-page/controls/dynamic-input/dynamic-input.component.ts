import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'app-dynamic-input',
  templateUrl: './dynamic-input.component.html',
  styleUrls: ['./dynamic-input.component.scss']
})
export class DynamicInputComponent implements OnInit {
  @HostBinding('class') cssClass = 'form-group col-md-4 position-relative';
  control = {
    type: 'text',
    label: 'Test',
    width: 'col-md-4',
    offset: 'offset-md-0',
    defaultValue: 'Test',
    dataProvider: 'Test',
    id: 'test',
    name: 'test',
    placeholder: 'test',
    minLength: 3,
    maxLength: 20,
    required: true,
    allowDuplicate: true,
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}

/*
* loansupport@hdfcbank.com
* loansupport@hdfcbank.com
* 04461606161
* */
