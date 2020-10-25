export class StorageUtil {

    static restore(key: KEY) {
        return sessionStorage.getItem(key);
    }

    static store(key: KEY, value: any) {
        sessionStorage.setItem(key, value);
    }

    static storeToken(token: string) {
        sessionStorage.setItem(KEY.TOKEN, token);
    }

    static getToken() {
        return sessionStorage.getItem(KEY.TOKEN);
    }

    static logout(){
        this.removeAll();
    }

    static removeAll(){
        sessionStorage.clear();
        localStorage.clear();
    }

    static getOffset(){
        return 1;
    }

    static getLimit(){
        return 15;
    }

}

export enum KEY {
    TOKEN = 'token',
    USER = 'user',
    USER_ID = 'userId',
    DATA = 'data'
}