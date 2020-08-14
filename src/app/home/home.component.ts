/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ElectronService } from "../core/services/electron/electron.service";
import { DataService } from "../../app/data.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  channelInfo: any;
  channelSubscription: Subscription;
  constructor(
    private router: Router,
    private electron: ElectronService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.channel('Designcourse');
  }

  closeWindow() {
    this.electron.window.close();
  }
  minimizeWindow() {
    this.electron.window.minimize();
  }

  channel(name) {
    if (this.channelSubscription) {
      this.channelSubscription.unsubscribe();
    }
    this.channelSubscription = this.dataService.getStats(name).subscribe((res) => {
      this.channelInfo = res;
      console.log(res);
    } )
  }
}
