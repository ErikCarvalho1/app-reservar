import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailValidator, FormControl, FormControlDirective, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar , ToastController} from '@ionic/angular/standalone';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ReservaPage implements OnInit {
  
  reservaForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(2)]),
    telefone: new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(11)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    data: new FormControl('', [Validators.required]),
    hora: new FormControl('',[Validators.required]),
    pessoas: new FormControl(2,[Validators.min(1)]), 
    preferencia: new FormControl(''),
    ocasiao: new FormControl(''),
    observacao: new FormControl(''), 
  });

  constructor(private toastCrtl: ToastController) {}
  
  async confirmaReserva(){
    if(this.reservaForm.invalid){
      this.mostrarToast("Preencha todos os campos obrigatórios");
      return;
    }
    const novaReserva ={
...this.reservaForm.value,
criadoEm: new Date().toISOString()
    };

    const reservaSalvas = JSON.parse(localStorage.getItem('reservas') || '[]');
    reservaSalvas.push(novaReserva);

    localStorage.setItem('reservas', JSON.stringify(reservaSalvas) );
    await this.mostrarToast('Reserva registrada com sucesso!');

    this.reservaForm.reset({
      pessoas: 2 
    })
  }
  async mostrarToast(msg: string) {
    const toast = await this.toastCrtl.create({
      message: msg,
      duration: 2000,
      color: 'primary', 
      position: 'middle'
      
    });
    toast.present();
  }

  ngOnInit() {
  }

}
