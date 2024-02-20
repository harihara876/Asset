export class Status {
    public status: number;
    public message: string;
    constructor(status = 200, message = '') {
        this.status = status;
        this.message = message;
    }
}

export class ResponseWithObject {
    public code: number;
    public message: string;
    public data: object;
    constructor(code = 200, message = '', data = {}) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}

export class APIResponse {
    public code: number;
    public message: string;
    constructor(code = 400, message = '') {
        this.code = code;
        this.message = message;
    }
}
export class details {
    public code: number
    public status: string
    public message: string
    public data: Array<string>
    constructor(code = 200, status = '', message = "", data = []) {
        this.code = code;
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
export class APIResponseWithDetails {
    public code: number;
    public message: string;
    public details: string
    constructor(code = 400, message = '', details = '') {
        this.code = code;
        this.message = message;
        this.details = details;
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