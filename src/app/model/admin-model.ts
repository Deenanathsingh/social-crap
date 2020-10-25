import { BaseModel } from './base-model';

export class Admin extends BaseModel {

    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    profilePic: string;
    coverPhoto: string;
    token: string;

    getFirstName() {
        return this.firstName;
    }

    setFirstName(firstName: string) {
        this.firstName = firstName;
    }

    getLastName() {
        return this.lastName;
    }

    setLastName(lastName: string) {
        this.lastName = lastName;
    }

    getEmail() {
        return this.email;
    }

    setEmail(email: string) {
        this.email = email;
    }

    getMobileNumber() {
        return this.mobileNumber;
    }

    setMobileNumber(mobileNumber: string) {
        this.mobileNumber = mobileNumber;
    }

    getProfilePic() {
        return this.profilePic;
    }

    getCoverPhoto() {
        return this.coverPhoto;
    }

    getToken() {
        return this.token;
    }

}