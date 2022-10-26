export interface ISessionFromLocalStorage {
  id: string;
  token: string;
  email: string;
}

export class Session {
  constructor(public id: string, public token: string, public email: string) {}
}
