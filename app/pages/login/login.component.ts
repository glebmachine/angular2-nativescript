import { Router } from "@angular/router";

import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { User } from "./../../shared/user/user";
import { UserService } from "./../../shared/user/user.service";

import { Page } from "ui/page";
import { Color } from "color";
import { View } from "ui/core/view";

@Component({
  selector: "my-app",
  templateUrl: "pages/login/login.html",
  providers: [
    UserService,
  ],
  styleUrls: [
    "pages/login/login-common.css",
    "pages/login/login.css"
  ]
})

export class LoginPage implements OnInit {
  user: User;
  isLoggingIn = false;

  @ViewChild("container") container: ElementRef;

  constructor(
    private page: Page,
    private _router: Router,
    private _userService: UserService) {
    this.user = new User();
    this.user.email = "user@nativescript.org";
    this.user.password = "password";
  }

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.page.backgroundImage = "res://bg_login";
  }

  submit() {
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signUp();
    }
  }

  login() {
    this._userService.login(this.user)
      .subscribe(
        () => this._router.navigate(["/list"]),
        (error) => alert("Unfortunately we could not find your account.")
      );
  }

  signUp() {
    this._userService.register(this.user)
      .subscribe(
        () => {
          alert("Your account was successfully created.");
          this.toggleDisplay();
        },
        () => alert("Unfortunately we were unable to create your account.")
      );
  }

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
    let container = <View>this.container.nativeElement;

    container.animate({
      backgroundColor: this.isLoggingIn ? new Color("white") : new Color("#301217"),
      duration: 200
    });
  }
}
