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

export interface DataTable {
  wholeTable: Array<ObjectForTheTable>;
}

export interface TableVariables {
  doubleArrow: string;
  upArrow: string;
  downArrow: string;
}
