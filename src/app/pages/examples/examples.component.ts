import {Component, TemplateRef, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {BsModalRef, BsModalService, ModalDirective} from 'ngx-bootstrap/modal';
import {ClientSideRowModelModule} from '@ag-grid-community/client-side-row-model';
import {ColumnApi, GridApi} from 'ag-grid-community';
import {ActionButtonsRendererComponent} from '../../shared/components/action-buttons-renderer/action-buttons-renderer.component';
import {ImageCroppedEvent} from 'ngx-image-cropper';

export class CourseDetails {
  public name = '';
  public description = '';
  public duration = '';
}

@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss']
})
export class ExamplesComponent {

  arrowForm: NgForm;
  defaultData: CourseDetails;
  @ViewChild('arrowFormModal') arrowFormModal: ModalDirective;

  constructor(
    public modalService: BsModalService,
  ) {
  }

  activeCourseDetails: CourseDetails = new CourseDetails();
  columns = Object.keys(this.activeCourseDetails);
  readonly BASIC_INFORMATION_TAB = 0;
  readonly CONTACT_INFORMATION_TAB = 1;
  activeTab = this.BASIC_INFORMATION_TAB;
  modalRef: BsModalRef;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  imageToCrop = '';
  logo: any = '';
  image: any = '';

  columnDefs = [
    {headerName: 'Name', field: 'name', sortable: true},
    {headerName: 'Description', field: 'description', sortable: true},
    {headerName: 'Duration', field: 'duration', sortable: true},
    {
      headerName: 'Actions',
      cellRenderer: 'buttonRenderer',
      minWidth: 160,
      cellRendererParams: {
        onClick: params => this.actionButtonClick(params)
      }
    }
  ];
  defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
    headerCheckboxSelection: this.isFirstColumn,
    checkboxSelection: this.isFirstColumn
  };
  rowData: CourseDetails[] = [];
  modules: any[] = [ClientSideRowModelModule];
  gridApi: GridApi;
  gridColumnApi: ColumnApi;
  rowSelection;
  frameworkComponents = {
    buttonRenderer: ActionButtonsRendererComponent
  };

  openModal(template: TemplateRef<any>, $event, imageToCrop): void {
    if ($event.target.files.length > 0) {
      this.imageToCrop = imageToCrop;
      this.fileChangeEvent($event);
      this.modalRef = this.modalService.show(template);
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
  }

  saveImage(): void {
    this[this.imageToCrop] = this.croppedImage;
    this.cancelImage();
  }

  cancelImage(): void {
    this.modalRef.hide();
    this.croppedImage = '';
  }

  onQuickFilterChanged(): void {
    const quickFilterInput: any = document.getElementById('quickFilter');
    this.gridApi.setQuickFilter(quickFilterInput.value);
  }

  actionButtonClick(params): void {
    console.log(params);
    switch (params.action) {
      case 'edit':
        this.defaultData = params.rowData;
        this.arrowFormModal.show();
        break;
      case 'delete':
        break;
    }
  }

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  isFirstColumn(params): boolean {
    const displayedColumns = params.columnApi.getAllDisplayedColumns();
    const thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn;
  }

  addNewInstitution(arrowFormModal: ModalDirective, arrowForm: NgForm): void {
    this.rowData.push(arrowForm.value);
    this.gridApi.setRowData(this.rowData);
    arrowForm.resetForm({});
    arrowFormModal.hide();
  }

  arrowFormModalShown(arrowForm: NgForm): void {
    arrowForm.resetForm(this.defaultData ? this.defaultData : {});
    this.activeTab = this.BASIC_INFORMATION_TAB;
  }

}
