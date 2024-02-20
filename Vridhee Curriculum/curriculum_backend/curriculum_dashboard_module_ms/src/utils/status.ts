export class Status {
    public status: number;
    public details: Array<string>;
    constructor(status = 200, details = []) {
        this.status = status;
        this.details = details;
    }
}

export class ResponseWithObject {
    public status: number;
    public message: string;
    public data: object;
    constructor(status = 200, message = '', data = {}) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}

export class APIResponse {
    public status: number;
    public message: string;
    constructor(status = 400, message = '') {
        this.status = status;
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

export class APIResponseWithdetails {
    public status: number
    public message: string
    public data: Array<string>
    constructor(status = 200, message = "", data = []) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}