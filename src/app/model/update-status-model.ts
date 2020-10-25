export class UpdateStatus {
    remark: string;
    status: string;
    userId: number;
    referenceId: number;

    constructor(remark: string, status: string, userId: number, referenceId: number) {
        this.remark = remark;
        this.status = status;
        this.userId = userId;
        this.referenceId = referenceId;
    }
}