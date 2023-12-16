import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Socket } from 'ngx-socket-io';
import { getUserById } from 'src/api/resources/users';
import { getUserId } from 'src/storage/auth';
import { Message } from 'src/types/messages.type';
import { environment as env } from 'src/environments/environment';
import { IonLoading } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  sending: boolean = false
  chatForm: FormGroup;
  messages: Message[] = []
  authUser: any
  loaded: boolean

  @ViewChild('loading') loading: IonLoading;


  constructor(
    public fb: FormBuilder,
    private socket: Socket
  ) {
    this.chatForm = this.fb.group({
      'message': new FormControl('')
    })
    // receive old messages 
    this.socket.on('initialMessages', (res: Message[]) => {
      this.messages = res.reverse()
    })

    // receive any message
    this.socket.on('receiveMessage', (message: Message) => {
      const aux = this.messages
      this.messages = [...aux, message]
    })

    this.loading = null as any

    this.loaded = false;

  }

  async ngOnInit() {
    const id = await getUserId()
    const request = await getUserById(parseInt(<string>id))
    this.authUser = request.data
    // server will emit 'initialMessages' after listening to this event
    this.socket.emit('enterRoom', env.roomId)
  }

  ionViewWillEnter() {
    //this.loaded = false
    this.loading.present()
    // server will emit 'initialMessages' after listening to this event
    this.socket.emit('enterRoom', env.roomId)
    this.loading.dismiss(null, 'cancel')
    //this.loaded = true
  }

  sendMessage() {
    this.sending = true
    const { id, firstName, lastName, isCritic } = this.authUser
    const message = {
      firstName,
      lastName,
      isCritic,
      roomId: env.roomId,
      userId: id,
      content: this.chatForm.controls['message'].value,
      date: new Date().toString()
    }
    this.socket.emit('sendMessage', message)
    this.chatForm.controls['message'].setValue('')
    const aux = this.messages
    this.messages = [...aux, message]
    this.sending = false
  }

  getInitialMessages(data: Message[]) {
    //this.loaded = false
    this.loading.present()
    this.messages = data
    this.loading.dismiss(null, 'cancel')
    //this.loaded = true
  }

  /* setDate(date: string) {
    const year = new Date(date).getFullYear().toString()
    const month = new Date(date).getMonth().toString()
    const day = new Date(date).getDay().toString()
    const hour = new Date(date).getHours().toString()
    const minutes = new Date(date).getMinutes().toString()

    return `${this.zero(hour)}:${this.zero(minutes)} (${month}/${day}/${year})`
  }

  zero(number: string) {
    if (parseInt(number) < 10)
      return '0' + number
    return number
  } */

  formatDate = (timestamp: string) => {
    const formattedDate = new Date(timestamp).toLocaleString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour12: true
    });

    const [time, date] = formattedDate.split(', ');
    return `${date} - ${time}`;
  }
}
