import { ServerService } from './../server.service';
import { RouterModule } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, Routes } from '@angular/router';
declare var Pusher, $
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  notification: Array<string>= []
  chaineNoti: any
  constructor(public navCtrl: NavController, public router: Router, private service: ServerService) { }

  ngOnInit() {
    this.chaineNoti = this.service.utilisateur.data.chaine_notif
    this.service.getNotification().then((e: any)=> {
      this.service.notifSubscriber.subscribe((res: [])=> {
        this.notification = res
        console.log('les notifs ', this.notification)
      })
      this.service.getNotif()
  })
  }
  ngAfterViewInit() {
    
  }
  gohome() {
    this.navCtrl.navigateBack(['accueil'])
  }
  goTonotif() {
    this.navCtrl.navigateForward(['notification'],{queryParams: {'url': 'accueil'}})
  }
  go() {
   // this.navCtrl.navigateForward(['mypage'])
   this.navCtrl.navigateForward(['mypage'], {queryParams: {'url': 'accueil'}})
  }
}
