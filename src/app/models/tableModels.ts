export interface ObjectFromServer {
  id: string;
  email: string;
  roles: string[];
  apiKey: string;
  profile: {
    dob: string;
    name: string;
    about: string;
    address: string;
    company: string;
    location: {
      lat: number;
      long: number;
    };
  };
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface ObjectForTheTable {
  firstName: string;
  lastName: string;
  sex: string;
  age: number;
  email: string;
  phone: string;
  company: string;
}

export interface Columns {
  imgUrl: string;
  id: string;
  column: string;
}

export interface DataTable {
  tableArrows: {
    doubleArrow: string;
    upArrow: string;
    downArrow: string;
  };
  showSortButtons: boolean;
  wholeTable: Array<ObjectForTheTable>;
  imgButtons: Array<Columns>;
  ascending: boolean;
}

export interface OutSelectedColumn {
  idColumn: string;
  nameColumn: string;
}
