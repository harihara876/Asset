export class Status {
    public sts: any;
    public data: any;
    public msg: any;
    constructor(sts = 200, msg = "", data = [],) {
        this.sts = sts;
        this.data = data;
        this.msg = msg
    }
}

export class ResponseWithObject {
    public code: any;
    public status: any;
    public data: any;
    constructor(code = 200, status = '', data = {}) {
        this.code = code;
        this.status = status;
        this.data = data;
    }
}

export class APIResponse {
    public code: any;
    public message: any;
    constructor(code = 400, message = '') {
        this.code = code;
        this.message = message;
    }
}


export class ResponseWithDataObject {
    public status: any;
    public message: any;
    public data: any;
    constructor(status = 200, message = '', data = {}) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}

export class errStatus {
    public status: any;
    public message: any;
    constructor(status = 200, message = '') {
        this.status = status;
        this.message = message;
    }
}