
import firebase from '../../firebase';

export const signup =  props => {
  const error = {};
  const {
    email,
    storePhone,
    password,
    repeatPassword,
    website,
    firstName,
    lastName,
    storeName,
    street,
    province,
    city,
    postalCode,
    country,
    storeEmail,
    registrationCode

  } = props.restaurant;

  console.log("props validaiton", props.restaurant);
  if(!email) error.email = "Please enter an email.";
  if(!storeEmail) error.storeEmail = "Please enter the store email.";
  if(!storePhone) error.storePhone = "Please enter a phone number.";
  if(!password) error.password = "Please enter a password.";
  if(!repeatPassword) error.repeatPassword = "Please enter a confirmed password.";
  if(!password && !repeatPassword && password !== repeatPassword) error.repeatPassword = "Passwords do not match.";
  if(!website) error.website = "Please enter you store website.";
  if(!firstName) error.firstName = "Please enter your first name.";
  if(!lastName) error.lastName = "Please enter your last name.";
  if(!storeName)  error.storeName = "Please enter the store name.";
  if(!street) error.street = "Please enter the store street address.";
  if(!province) error.province = "Please enter the store province."
  if(!city) error.city = "Please enter the store city.";
  if(!postalCode) error.postalCode = "Please enter the store postal code.";
  if(!country) error.country = "Please enter the store country.";
  // if(!registrationCode) {
  //   error.registrationCode = "Please enter the registration code. Contact us if you do not have one.";
  // }
  // else {
  //   try {
  //     const codeRef = await firebase.firestore().collection('codes').doc(registrationCode);

  //     codeRef.get().then( snapshot => {
  //       if(snapshot.exists) {
  //         codeRef.onSnapshot(doc => {
  //           const status = doc.get('status');
  //           if( status === 'used')
  //             error.registrationCode = "Invalid Code";
  //         })
  //       } else {
  //         error.registrationCode = "Invalid Code";
  //       }
  //     })

  //   } catch ( error ) {
  //     console.log("error checking registration code");
  //   }
  // } 

  return {
    ...error
  }

}
