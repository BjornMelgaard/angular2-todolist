class Base {
  editing: boolean;
  errors: Array<string>;
}

export class Project extends Base {
  id: number;
  name: string;
  tasks: Array<Task>;

  constructor(obj?: any) {
    super();
    Object.assign(this, obj);
  }
}

export class Task extends Base {
  id: number;
  name: string;
  done: boolean;
  deadline: Date;
  position: number;
  comments: Array<Comment>;

  active: boolean = false;

  constructor(obj?: any) {
    super();
    Object.assign(this, obj);
  }
}

export class Comment {
  id: number;
  name: string;
  attachments: Array<Attachment>;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}

export class Attachment {
  id: number;
  file: {url: string, name: string, size: string};

  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}