import {Component, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService, ModalDirective} from 'ngx-bootstrap/modal';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {ClientSideRowModelModule} from '@ag-grid-community/client-side-row-model';
import {ActionButtonsRendererComponent} from '../../shared/components/action-buttons-renderer/action-buttons-renderer.component';
import {ColumnApi, GridApi} from 'ag-grid-community';
import {GeoService} from '../../shared/services/geo.service';
import {NgForm} from '@angular/forms';

export class InstitutionDetails {
  public name = '';
  public moto = '';
  public about = '';
  public logo = '';
  public image = '';
  public contactPerson = '';
  public continent = '';
  public country = '';
  public state = '';
  public district = '';
  public city = '';
  public address = '';
  public pin = '';
  public email = '';
  public mobile = '';
  public alternateMobile = '';
  public landline = '';
  public fax = '';
}

@Component({
  selector: 'app-manage-institutions',
  templateUrl: './manage-institutions.component.html',
  styleUrls: ['./manage-institutions.component.scss'],
  providers: [GeoService]
})
export class ManageInstitutionsComponent {
  arrowForm: NgForm;
  defaultData: InstitutionDetails;
  @ViewChild('arrowFormModal') arrowFormModal: ModalDirective;

  constructor(
    public modalService: BsModalService,
    public geo: GeoService
  ) {
  }

  activeInstitutionDetails: InstitutionDetails = new InstitutionDetails();
  columns = Object.keys(this.activeInstitutionDetails);
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
    {headerName: 'Institution Name', field: 'name', sortable: true},
    {headerName: 'Contact Person', field: 'contactPerson', sortable: true},
    {headerName: 'City', field: 'city', sortable: true},
    {headerName: 'Email', field: 'email', sortable: true},
    {headerName: 'Mobile', field: 'mobile', sortable: true},
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
  rowData: InstitutionDetails[] = [];
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
        this.geo.setSelectedContinent(this.defaultData.continent);
        this.geo.setSelectedCountry(this.defaultData.country);
        this.geo.setSelectedState(this.defaultData.state);
        this.geo.setSelectedDistrict(this.defaultData.district);
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
