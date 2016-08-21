import "reflect-metadata";
import { HTTP_PROVIDERS } from "@angular/http";

import { nativeScriptBootstrap } from "nativescript-angular/application";
import { AppComponent } from "./app.component";

nativeScriptBootstrap(AppComponent, [ HTTP_PROVIDERS ]);
