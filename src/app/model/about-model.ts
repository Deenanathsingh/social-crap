import { BaseModel } from './base-model';

export class About extends BaseModel {
    bio: string;
    gender: string;
    relationShip: string;
    dob: string;

    public setBio(bio: string) {
        this.bio = bio;
    }

    public getBio() {
        return this.bio;
    }

    public setGender(gender: string) {
        this.gender = gender;
    }

    public getGender() {
        return this.gender;
    }

    public setRelationShip(relationShip: string) {
        this.relationShip = relationShip;
    }

    public getRelationShip() {
        return this.relationShip;
    }

    public setDob(dob: string) {
        this.dob = dob;
    }

    public getDob() {
        return this.dob;
    }

}