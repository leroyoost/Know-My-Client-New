export class Verification {
    title?: string;
    initials?: string;
    surname?: string;
    idNo?: string;
    bank?: string;
    accType?: string;
    accNo?: string;
    branch?: string;
    created_date?: number;
    created_uid?: string;
    created_name?: string;
    status: string;
    files: any[];
    events: any[];
    ref: string;
    notes: any[];
    $key?: string;
    type?: string;
    id?:string;
}

class extendedFile extends File {
    fileType:string;
    fileName:string;
    url:string;
  }
  
  export class Upload {
      $key: string;
      file:extendedFile;
      name:string;
      url:string;
      progress:any;
      createdAt: Date = new Date();
      description: string;
      constructor(file:extendedFile) {
        this.file = file;
      }
    }


