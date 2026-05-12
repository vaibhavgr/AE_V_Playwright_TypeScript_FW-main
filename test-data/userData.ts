import { UniqueGenerator } from "../utils/UniqueGenerator";
export type UserData = {
  userName: string;
  newUserEmailInputBox: string;
  password: string;
  fisrtName: string;
  lastName: string;
  comapanyName: string;
  addressOne: string;
  addressTwo: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
  
  invalidPassword: string;
  unRegisteredEmail: string;
  
};



export const getNewUSerData = ():UserData => {
  return {

    userName: UniqueGenerator.getUniqueName(),
    newUserEmailInputBox: UniqueGenerator.getUniqueEmail(),
    password: 'Test@12345',
    fisrtName: 'Vinod',
    lastName: 'Bhusal',
    comapanyName: 'AE',
    addressOne: 'Delhi',
    addressTwo: 'SJH',
    country: 'Nepal',
    state: 'HRY',
    city: 'GGN',
    zipcode: '12345',
    mobileNumber: '9876543456',
  
    invalidPassword :'qwerty1235',
    unRegisteredEmail: 'April23@1996@gmail.com',
    

  }}

export type invalidUserData = {
  invalidEmail :string;
  password: string;
}
  export const invalidUserEmail = ():invalidUserData => {
  return {
        invalidEmail: 'Testabc@check',
        password: 'qwerty123'
  }
  }


  export type existingUserData = {
  existingEmail :string;
  userName: string;
  existingPassword : string;
}

  export const existingUserEmail = ():existingUserData => {
  return {
        existingEmail: 'existinguser@yopmail.com',
         userName: UniqueGenerator.getUniqueName(),
         existingPassword : 'Test@12345'
       
  }
  }
