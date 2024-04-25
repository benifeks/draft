import { Component } from '@angular/core';

import {
  ObjectFromServer,
  DataTable,
  TableVariables,
} from 'src/app/models/tableModels';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  constructor(public tableService: TableService) {}

  public tableVariables: TableVariables = {
    doubleArrow: `/assets/img/table/doubleArrow.png`,
    upArrow: `/assets/img/table/upArrow.png`,
    downArrow: `/assets/img/table/downArrow.png`,
  };

  public dataTable: DataTable = {
    wholeTable: [],
  };

  public showData(data: ObjectFromServer[]): void {
    this.dataTable.wholeTable = this.tableService.convertData(data);
  }
}
