export class UserModel {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  image: string;
  personalId: number;
  phone: number;
  gender: string;
  country: string;
  city: string;
  state: string;
  zipCode: string;
  account: number;
  countryCode: string[];
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    image: string,
    personalId: number,
    phone: number,
    gender: string,
    country: string,
    city: string,
    state: string,
    zipCode: string,
    account: number,
    countryCode: string[]
  ) {
    this.id = id;
    this.first_name = firstName;
    this.last_name = lastName;
    this.email = email;
    this.image = image;
    this.personalId = personalId;
    this.phone = phone;
    this.gender = gender;
    this.country = country;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
    this.account = account;
    this.countryCode = countryCode;
  }
}
