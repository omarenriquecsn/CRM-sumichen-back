"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(message, status = 500) {
        super(message);
        this.status = status;
    }
}
exports.ApiError = ApiError;
