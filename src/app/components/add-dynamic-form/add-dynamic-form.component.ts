import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-add-dynamic-form',
  templateUrl: './add-dynamic-form.component.html',
  styleUrls: ['./add-dynamic-form.component.scss']
})
export class AddDynamicFormComponent implements OnInit {

  constructor() {
  }

  readonly TYPE_CONFIG = {
      checkbox: {minMaxType: 'number',      required: true,       min: true,      max: true,      pattern: false,     duplicate: false,     dataProvider: true    },
      select  : {minMaxType: 'number',      required: true,       min: false,     max: false,     pattern: false,     duplicate: true,      dataProvider: true    },
      color   : {minMaxType: 'number',      required: true,       min: false,     max: false,     pattern: false,     duplicate: false,     dataProvider: false   },
      date    : {minMaxType: 'date',        required: true,       min: true,      max: true,      pattern: false,     duplicate: true,      dataProvider: false   },
      datetime: {minMaxType: 'datetime',    required: true,       min: true,      max: true,      pattern: false,     duplicate: true,      dataProvider: false   },
      email   : {minMaxType: 'number',      required: true,       min: false,     max: false,     pattern: false,     duplicate: true,      dataProvider: false   },
      file    : {minMaxType: 'number',      required: true,       min: true,      max: true,      pattern: false,     duplicate: false,     dataProvider: false   },
      image   : {minMaxType: 'number',      required: true,       min: true,      max: true,      pattern: false,     duplicate: false,     dataProvider: false   },
      month   : {minMaxType: 'month',       required: true,       min: true,      max: true,      pattern: false,     duplicate: true,      dataProvider: false   },
      number  : {minMaxType: 'number',      required: true,       min: true,      max: true,      pattern: false,     duplicate: true,      dataProvider: false   },
      password: {minMaxType: 'number',      required: true,       min: true,      max: true,      pattern: true,      duplicate: true,      dataProvider: false   },
      radio   : {minMaxType: 'number',      required: true,       min: false,     max: false,     pattern: false,     duplicate: true,      dataProvider: true    },
      range   : {minMaxType: 'number',      required: true,       min: true,      max: true,      pattern: false,     duplicate: true,      dataProvider: false   },
      search  : {minMaxType: 'number',      required: true,       min: true,      max: true,      pattern: true,      duplicate: false,     dataProvider: false   },
      tel     : {minMaxType: 'number',      required: true,       min: true,      max: true,      pattern: true,      duplicate: true,      dataProvider: false   },
      text    : {minMaxType: 'number',      required: true,       min: true,      max: true,      pattern: true,      duplicate: true,      dataProvider: false   },
      time    : {minMaxType: 'time',        required: true,       min: true,      max: true,      pattern: false,     duplicate: true,      dataProvider: false   },
      url     : {minMaxType: 'number',      required: true,       min: false,     max: false,     pattern: false,     duplicate: true,      dataProvider: false   },
      week    : {minMaxType: 'week',        required: true,       min: true,      max: true,      pattern: false,     duplicate: true,      dataProvider: false   },
  };

  readonly data = {required: true, min: true, max: true, pattern: true, duplicate: true, dataProvider: true};

  ngOnInit(): void {
  }
}
