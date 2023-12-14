import { Component, Input, OnInit } from '@angular/core';
import { getUserById } from 'src/api/resources/users';
import { deleteComment } from 'src/api/resources/comments';

@Component({
  selector: 'app-replies',
  templateUrl: './replies.component.html',
  styleUrls: ['./replies.component.scss'],
})
export class RepliesComponent implements OnInit {
  @Input() data: any
  user: any
  exists: boolean

  constructor() {
    this.exists = true
  }

  async ngOnInit() {
    const request = await getUserById(this.data.userId)
    this.user = request.data
  }

  setDate(date: string){
    const year = new Date(date).getFullYear().toString()
    const month = new Date(date).getMonth().toString()
    const day = new Date(date).getDay().toString()
    return `${month}/${day}/${year}`
  }

  async removeReply() {
    await deleteComment(this.data.id)
    this.exists = false
  }
}
