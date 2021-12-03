export class Customer {
     customerId: number;
     fullName: string;
     address: string;
     email: string;
     country: string;
     state: string;
     city: string;
     zipCode: string;
     phone: string;
  }

export class RegisteredUser {
   id: number;
   firstName: string;
   lastName: string;
   email: string;   
   phone: string;
   password: string;
}

export class AuthenticateModel {
   email: string; 
   password: string;
}

 