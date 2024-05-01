import { Component } from '@angular/core';

import {
  ObjectFromServer,
  DataTable,
  OutSelectedColumn,
} from 'src/app/models/tableModels';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  constructor(public tableService: TableService) {}

  public dataTable: DataTable = {
    tableArrows: {
      doubleArrow: 'doubleArrow',
      upArrow: 'upArrow',
      downArrow: 'downArrow',
    },
    showSortButtons: false,
    wholeTable: [],
    imgButtons: [
      {
        imgUrl: 'doubleArrow',
        id: 'imgBtn0',
        column: 'firstName',
      },
      {
        imgUrl: 'doubleArrow',
        id: 'imgBtn1',
        column: 'lastName',
      },
      {
        imgUrl: 'doubleArrow',
        id: 'imgBtn2',
        column: 'sex',
      },
      {
        imgUrl: 'doubleArrow',
        id: 'imgBtn3',
        column: 'age',
      },
      {
        imgUrl: 'doubleArrow',
        id: 'imgBtn4',
        column: 'email',
      },
      {
        imgUrl: 'doubleArrow',
        id: 'imgBtn5',
        column: 'phone',
      },
      {
        imgUrl: 'doubleArrow',
        id: 'imgBtn6',
        column: 'company',
      },
    ],
    ascending: true,
  };

  public showData(data: ObjectFromServer[]): void {
    this.setStartArrows();
    if (data.length) {
      this.dataTable.showSortButtons = true;
      this.dataTable.wholeTable = this.tableService.convertData(data);
      return;
    }
    this.dataTable.showSortButtons = false;
    this.dataTable.wholeTable = this.tableService.convertData(data);
  }

  public setStartArrows(): void {
    this.dataTable.imgButtons.forEach(
      (arrow) => (arrow.imgUrl = this.dataTable.tableArrows.doubleArrow)
    );
  }

  public sortColumn(currentColumn: OutSelectedColumn): void {
    if (this.dataTable.ascending) {
      this.dataTable.wholeTable.sort((a: any, b: any) =>
        a[currentColumn.nameColumn] > b[currentColumn.nameColumn] ? 1 : -1
      );
      this.dataTable.ascending = !this.dataTable.ascending;
      this.dataTable.imgButtons.forEach((img) => {
        if (currentColumn.idColumn === img.id) {
          img.imgUrl = this.dataTable.tableArrows.downArrow;
          return;
        }
        img.imgUrl = this.dataTable.tableArrows.doubleArrow;
      });
      return;
    }

    if (!this.dataTable.ascending) {
      this.dataTable.wholeTable.sort((a: any, b: any) =>
        a[currentColumn.nameColumn] < b[currentColumn.nameColumn] ? 1 : -1
      );
      this.dataTable.ascending = !this.dataTable.ascending;
      this.dataTable.imgButtons.forEach((img) => {
        if (currentColumn.idColumn === img.id) {
          img.imgUrl = this.dataTable.tableArrows.upArrow;
          return;
        }
        img.imgUrl = this.dataTable.tableArrows.doubleArrow;
      });
      return;
    }
  }
}
