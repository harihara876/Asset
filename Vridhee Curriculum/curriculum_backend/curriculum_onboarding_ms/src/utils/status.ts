export class Status {
    public status: number;
    public details: Array<string>;
    constructor(status = 200, details = []) {
        this.status = status;
        this.details = details;
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