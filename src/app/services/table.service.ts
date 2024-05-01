import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { ObjectFromServer } from '../models/tableModels';

@Injectable()
export class TableService {
  constructor(public http: HttpClient) {}

  public convertData(arrayData: ObjectFromServer[]) {
    return arrayData.map((elem: any, i: number) => {
      return {
        firstName: arrayData[i].profile.name.split(' ')[0],
        lastName: arrayData[i].profile.name.split(' ')[1],
        sex: ' - ',
        age: new Date().getFullYear() - +arrayData[i].profile.dob.split('-')[0],
        email: arrayData[i].email,
        phone: ' - ',
        company: arrayData[i].profile.company,
      };
    });
  }
}
