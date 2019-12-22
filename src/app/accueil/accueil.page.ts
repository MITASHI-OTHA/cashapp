import { ServerService } from './../server.service';
import { Component, OnInit } from '@angular/core';
declare var $, M: any
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {

  constructor(public service: ServerService) { }

  ngOnInit() {
    var instance = M.Tabs.init('.tabs');
       $('.tabs').tabs();
  }

}
