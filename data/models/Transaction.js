export class Transaction {
    constructor(value, success, error_message, created_at) {
        this.value = parseFloat(value);
        this.success = success;
        this.error_message = error_message;
        this.created_at = created_at;
    }

    toJSON() {
        return {
            value: this.value,
            success: this.success,
            error_message: this.error_message,
            created_at: this.created_at
        };
    }
}