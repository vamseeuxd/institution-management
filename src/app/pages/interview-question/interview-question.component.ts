import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {BsModalRef, BsModalService, ModalDirective} from 'ngx-bootstrap/modal';
import {ClientSideRowModelModule} from '@ag-grid-community/client-side-row-model';
import {ColumnApi, GridApi} from 'ag-grid-community';
import {ActionButtonsRendererComponent} from '../../shared/components/action-buttons-renderer/action-buttons-renderer.component';
import {ImageCroppedEvent} from 'ngx-image-cropper';


export class InterviewQuestionDetails {
  public topic = '';
  public question = '';
  public answer = '';
  public exercises = '';
}

@Component({
  selector: 'app-interview-question',
  templateUrl: './interview-question.component.html',
  styleUrls: ['./interview-question.component.scss']
})
export class InterviewQuestionComponent {

  arrowForm: NgForm;
  defaultData: InterviewQuestionDetails;

  constructor(
    public modalService: BsModalService,
  ) {
  }

  activeInterviewQuestionDetails: InterviewQuestionDetails = new InterviewQuestionDetails();
  columns = Object.keys(this.activeInterviewQuestionDetails);
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
    {headerName: 'Course Topic', field: 'topic', sortable: true},
    {headerName: 'Question', field: 'question', sortable: true},
    {headerName: 'Answer', field: 'answer', sortable: true},
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
  rowData: InterviewQuestionDetails[] = [];
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

  addNewInstitution(arrowForm: NgForm): void {
    this.rowData.push(arrowForm.value);
    this.gridApi.setRowData(this.rowData);
    arrowForm.resetForm({});
  }

  arrowFormModalShown(arrowForm: NgForm): void {
    arrowForm.resetForm(this.defaultData ? this.defaultData : {});
    this.activeTab = this.BASIC_INFORMATION_TAB;
  }

}
