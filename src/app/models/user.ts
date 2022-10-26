interface IUser {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  age: string;
  isAdmin?: boolean;
}

export class User implements IUser {
  id = "";
  email = "";
  name = "";
  firstName = "";
  lastName = "";
  age = "";
  isAdmin = false;
}
