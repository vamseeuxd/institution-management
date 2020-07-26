import {Component} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {BusyIndicatorService} from '../../shared/services/busy-indicator/busy-indicator.service';
import {NgForm} from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap/modal';


export interface FormControlConfig {
  type: string;
  name: string;
  placeholder: string;
  label: string;
  defaultValue: string;
  width: string;
  offset: string;
  dataProvider?: string;
  labelField?: string;
  idField?: string;
  required: boolean;
  allowDuplicate: boolean;
  min?: any;
  max?: any;
  pattern?: string;
}

@Component({
  selector: 'app-uml-diagram',
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.scss']
})
export class DynamicPageComponent {

  formControls: FormControlConfig[] = [];

  controlTypes = [
    'checkbox',
    'select',
    'color',
    'date',
    'datetime-local',
    'email',
    'file',
    'image',
    'month',
    'number',
    'password',
    'radio',
    'range',
    'search',
    'tel',
    'text',
    'time',
    'url',
    'week',
  ];

  dataProviderControls = [
    'checkbox',
    'select',
    'radio',
  ];

  patternControls = [
    'password',
    'search',
    'tel',
    'text',
  ];

  minMaxConfig = {
    checkbox: 'number',
    date: 'date',
    'datetime-local': 'datetime-local',
    file: 'number',
    image: 'number',
    month: 'month',
    number: 'number',
    password: 'number',
    range: 'number',
    tel: 'number',
    text: 'number',
    time: 'time',
    week: 'week',
  };

  existingForms = ['Test 01', 'Test 02'];

  defaultControlValues = {
    type: 'text',
    label: '',
    width: 'col-md-4',
    offset: 'offset-md-0',
    defaultValue: '',
    dataProvider: '',
    id: '',
    name: '',
    placeholder: '',
    minLength: 3,
    maxLength: 20,
    required: true,
    allowDuplicate: true,
  };

  formTitle = 'Add New Form Control';

  constructor(
    public afs: AngularFirestore,
    public busyIndicator: BusyIndicatorService
  ) {
  }

  addNewController(editFormControllerFormModal: any): void {
    editFormControllerFormModal.show();
  }

  onEditFormControllerShown(editFormControllerForm: NgForm): void {
    editFormControllerForm.resetForm(this.defaultControlValues);
  }

  saveNewControllerAndClose(editFormControllerForm: NgForm, editFormControllerFormModal: ModalDirective): void {
    this.formControls.push(editFormControllerForm.value);
    editFormControllerFormModal.hide();
  }

  saveAndAddNew(editFormControllerForm: NgForm): void {
    this.formControls.push(editFormControllerForm.value);
    editFormControllerForm.resetForm(this.defaultControlValues);
  }

  checkForUniqueName(name: string): boolean {
    return this.formControls.map(d => d.name).indexOf(name) < 0;
  }
}
