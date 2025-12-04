export interface ChatData {
  sender:string,
  content:string
}

export interface ChatRespone{
  data:{
    stream:string,
    chats:[]
  }
}