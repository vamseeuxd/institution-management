import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';

@Component({
  selector: 'app-action-buttons-renderer',
  templateUrl: './action-buttons-renderer.component.html',
  styleUrls: ['./action-buttons-renderer.component.scss']
})
export class ActionButtonsRendererComponent
  implements ICellRendererAngularComp {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  }

  btnClick($event, action): void {
    if (this.params.onClick instanceof Function) {
      const params = {
        event: $event,
        action,
        rowData: this.params.node.data
      };
      this.params.onClick(params);
    }
  }
}
