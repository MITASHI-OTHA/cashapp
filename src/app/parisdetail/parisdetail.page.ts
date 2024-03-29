import { ServerService } from './../server.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, AlertController, ToastController, ModalController } from '@ionic/angular';
import { Location } from "@angular/common";
import { OpinionPage } from '../opinion/opinion.page';

declare var $, moment
@Component({
  selector: 'app-parisdetail',
  templateUrl: './parisdetail.page.html',
  styleUrls: ['./parisdetail.page.scss'],
})
export class ParisdetailPage implements OnInit {
  pari: any
  par
  enft
  id
  prevUrl
  participation
  perime
  @Input() canMacth: boolean
  @Input() closed: any;
  type: any = ''
  constructor(public route: ActivatedRoute, public service: ServerService, public navCtrl: NavController, public router: Router, private location: Location, private alertController: AlertController, public toastController: ToastController, private modalCtrl: ModalController) { }
  parseDate(date) {
    moment().locale('fr')
    return moment(date).format('DD-MM-YY')
  }
  goback() {
    if(this.route.snapshot.queryParams.type !== undefined) {
        this.type = this.route.snapshot.queryParams.type
    }
    this.navCtrl.navigateBack([this.prevUrl, { animated: true,
      animationDirection: 'back'}], {queryParams: {type: this.type}})
  }
  godesc() {
    this.router.navigate(['parisdetail',this.id, {outlets: {'outlet2': ['description']}}], { queryParams: { id: this.id } })
  }
  gopart() {
    this.router.navigate(['parisdetail',this.id, {outlets: {'outlet2': ['participants']}}], { queryParams: { id: this.id } })
  }
  goinv() {
    this.router.navigate(['parisdetail',this.id, {outlets: {'outlet2': ['invitations']}}], { queryParams: { id: this.id } })
  }
  async parigo() {
    const modal = await this.modalCtrl.create({
      component: OpinionPage,
      cssClass: 'my-custom-modal-opinion',
      componentProps: {
        'idPari': this.id,
        'participation': this.pari.participation,
        'auteur': this.pari.auteur,
        'canMacth': false,
        'token': this.pari.token
      }
    })
    return await modal.present();
  }
  ngOnInit() {
   let id = this.route.snapshot.params.id
   this.prevUrl = this.route.snapshot.queryParams.url
    console.log('prevUrl ', this.prevUrl)
    this.service.canBetSubscription.subscribe((e: any)=> {
        this.canMacth = e
    })
    this.service.getCanBet()
    this.id = id
      this.service.parisSubscription.subscribe((e:any)=> {
        this.pari = e.find((i)=> {
            return i.id_p == this.id
        })
      })
      this.service.getparis()
      var dates = moment(this.pari.fin).format('YYYYMMDD')
      var today= moment().format('YYYYMMDD')
      var a = moment(today, 'YYYYMMDD');
      var b = moment(dates, 'YYYYMMDD');
      var diff = a.diff(b, 'days')
      console.log(' dates', dates, ' a ', a, ' difference ', diff)
      console.log('le pari current ', this.pari)
      if(diff > 0) {
        this.canMacth = true
        this.perime = true
      }
    // console.log('taille de paris ', this.pari.length)
    // if(this.pari.length<=0) {
    //   this.service.getallparis()
    // }
    $(document).ready(function(){
      $('.item-paris ion-col').on('click', function(){
        var par = $('.item-paris').width()
        var enft = Math.floor(par/3)
        var id = $(this).attr('id')
        var swip = $('.col-swip').css('left')
        console.log('id= ', id, 'paent =',par, 'enft=', enft, 'swip =', swip)
        if((id==1 && swip == enft+'px') || (id==2 && swip == enft*2+'px')) return
   				if(id == 1 && (swip =='0px' || swip ==  enft*2+'px')) {
   						$('.col-swip').css('left', enft+'px')
   				} else if(id == 2 && (swip == enft+'px' || swip =='0px')) {
   					$('.col-swip').css('left', enft*2+'px')
   				} else {
   					$('.col-swip').css('left', '0px')
   				}
      })
    })
    var suisje = this.pari.participants.filter(e=> {
      var suisje: any = e.id_part == this.service.utilisateur.data.id
      suisje.length <=0? this.canMacth=false:this.canMacth=true
      })
  }
  parier() {
    var monID = parseInt(this.service.utilisateur.data.id)
    var idAuteurPari = parseInt(this.pari.id_auteur)
    var res = monID == idAuteurPari? true: false
    return {
        canBet: res
    } 
  }
    ionViewWillEnter(){
      let swipsize = $('.item-active').width()
      console.log('item active ', swipsize)
      $('.col-swip').css('width', swipsize)
      var date1 = moment(this.pari.debut)
      var date2 = moment(this.pari.fin)
    }
   
}
