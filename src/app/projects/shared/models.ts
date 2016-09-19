export class Project {
  id: number;
  name: string;
  tasks: Array<Task>;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}

export class Task {
  id: number;
  name: string;
  done: boolean;
  deadline: Date;
  position: number;
  comments: Array<Comments>;

  constructor(obj: any) {
    Object.assign(this, obj);
    console.log("Task", this);
  }
}

export class Comments {
  id: number;
  name: string;
  // attachments: Array<Attachments>;

  constructor(obj: any) {
    Object.assign(this, obj);
    console.log("Comments", this);
  }
}

// export class Attachments {
//   id: number;
//   text: string;

//   constructor(obj: any) {
//     this.id        = obj && obj.id         || null;
//     this.text      = obj && obj.text       || '';
//   }
// }