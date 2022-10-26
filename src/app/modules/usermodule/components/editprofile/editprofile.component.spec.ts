import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "src/app/core/auth.service";
import { UserService } from "src/app/core/user.service";

import { EditprofileComponent } from "./editprofile.component";

describe("EditprofileComponent", () => {
  let component: EditprofileComponent;
  let fixture: ComponentFixture<EditprofileComponent>;
  let element: HTMLInputElement;
  const mockCurrentUser = {
    id: "12edxasdsa",
    email: "a@a.com",
    firstName: "Ceva",
    lastName: "Altceva",
    age: "22",
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditprofileComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: mockCurrentUser },
        { provide: UserService, useValue: mockCurrentUser },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditprofileComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    if (component.currentUser) {
      expect(component).toBeTruthy();
    }
  });
  it("should render default value for current user", () => {
    const value = element.querySelectorAll(".email");
    expect(value.length).toEqual(1);
  });
  it("should render default value for current user", () => {
    const value = element.querySelectorAll(".last-name");
    expect(value.length).toEqual(1);
  });
  it("should render default value for current user", () => {
    const value = element.querySelectorAll(".first-name");
    expect(value.length).toEqual(1);
  });
  it("should render default value for current user", () => {
    const value = element.querySelectorAll(".age");
    expect(value.length).toEqual(1);
  });
});
