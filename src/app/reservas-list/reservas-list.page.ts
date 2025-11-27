import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, AlertController, IonLabel, IonItem } from '@ionic/angular/standalone';
import { Route, Router} from '@angular/router';


@Component({
  selector: 'app-reservas-list',
  templateUrl: './reservas-list.page.html',
  styleUrls: ['./reservas-list.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, IonItem]
})
export class ReservasListPage implements OnInit { // <-- nome corrigido

  reservas: any[]=[];

  constructor(private router: Router, private alertCtrl: AlertController) { }

  ionViewWillEnter(){ // hook de ciclo de vida do Ionic = evento no C# (load)
    this.loadReservas();
  }

  loadReservas(){
    const dados = localStorage.getItem('reservas'); // obter item
    this.reservas = dados ? JSON.parse(dados) : []; 
  }

  editar(id: number){
    this.router.navigate(['/editar-reserva', id]) // $_GET[]
  }

  async excluir(id : number){
    const alert = await this.alertCtrl.create({
      header: "Excluir Reserva",
      message: "deseja realmente excluir a reserva?",
      buttons: [
        {text: 'Cancelar', role:'cancelar'},
        {
          text: 'Excluir',
          handler: () => {
            this.reservas = this.reservas.filter(r => r.index !== id)
            localStorage.setItem('reservas', JSON.stringify(this.reservas))
          }
        }
      ]
    });
    await alert.present();
    
  }
  ngOnInit() { //hook = evento 
  }

}
