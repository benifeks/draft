import { Component, Input } from '@angular/core';
import { DataTable, TableVariables } from 'src/app/models/tableModels';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css'],
})
export class FieldComponent {
  @Input() public dataTable: DataTable;
  @Input() public tableVariables: TableVariables;
}
