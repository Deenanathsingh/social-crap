import { About } from './about-model';

export class RegisterUser {

    private firstName: string;
    private lastName: string;
    private email: string;
    private gender: string;
    private dob: Date;
    private password: string;
    private about: About;

    constructor(firstName: string, lastName: string, email: string, gender: string, dob: Date, password: string, about: About) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.gender = gender;
        this.dob = dob;
        this.password = password;
        this.about = about;
    }
}