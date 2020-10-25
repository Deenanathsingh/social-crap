import { BaseModel } from './base-model';

export class Address extends BaseModel {
    houseNumber: string;
    street: string;
    area: string;
    city: string;
    state: string;
    pinCode: string;
    country: string;

    getHouseNumber() {
        return this.houseNumber;
    }

    setHouseNumber(houseNumber: string) {
        this.houseNumber = houseNumber;
    }

    getStreet() {
        return this.street;
    }

    setStreet(street: string) {
        this.street = street;
    }

    getArea() {
        return this.area;
    }

    setArea(area: string) {
        this.area = area;
    }

    getCity() {
        return this.city;
    }

    setCity(city: string) {
        this.city = city;
    }

    getState() {
        return this.state;
    }

    setState(state: string) {
        this.state = state;
    }

    getPinCode() {
        return this.pinCode;
    }

    setPinCode(pinCode: string) {
        this.pinCode = pinCode;
    }

    getCountry() {
        return this.country;
    }

    setCountry(country: string) {
        this.country = country;
    }
}