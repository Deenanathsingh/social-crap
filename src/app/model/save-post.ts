import { Upload } from './upload-model';
import { UserWrap } from './user-wrap-model';

export class SavePost {

    private userId: number;
    private post: string;
    private upload: Upload;
    private tags: UserWrap[];

    constructor(userId: number, post: string, upload: Upload, tags: UserWrap[]) {
        this.userId = userId;
        this.post = post;
        this.upload = upload;
        this.tags = tags;
    }
}