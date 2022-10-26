export type LinksToNavigate = {
  HOME: string;
  LOGIN: string;
  REGISTER: string;
  EDIT_PROFILE: string;
  ADD_SHIFT: string;
  EDIT_SHIFT: string;
  LOGOUT: string;
  MY_SHIFTS: string;
};

export enum NavBar {
  HOME = "home",
  LOGIN = "login",
  REGISTER = "register",
  EDIT_PROFILE = "edit profile",
  ADD_SHIFT = "add shift",
  EDIT_SHIFT = "edit shift",
  LOGOUT = "logout",
  MY_SHIFTS = "my shifts",
}

export enum Routes {
  HOME = "/shifts",
  LOGIN = "/auth/login",
  REGISTER = "/auth/register",
  EDIT_PROFILE = "/user/edit-profile",
  ADD_SHIFT = "/shifts/add-shift",
  EDIT_SHIFT = "/shifts/edit-shift",
  LOGOUT = "/auth",
  MY_SHIFTS = "/shifts/my-shifts",
}

export interface IOption {
  value: string;
  viewValue: string;
}
