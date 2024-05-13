import { Component } from '@angular/core';

import { BjrxjsService } from 'src/app/services/bjrxjs.service';

@Component({
  selector: 'app-bjfield',
  templateUrl: './bjfield.component.html',
  styleUrls: ['./bjfield.component.css'],
})
export class BjfieldComponent {
  public constructor(public bjrxjs: BjrxjsService) {}
}
