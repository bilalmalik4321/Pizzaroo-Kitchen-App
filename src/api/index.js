import firebase from "../firebase";
import moment from 'moment';
import axios from 'axios';
import apiKey from '../googleAPI';
import geohash from 'ngeohash';
// access the database

// const { firebase , firestore } = all;
// console.log("aall", all);
const db = firebase.firestore();
const timestamp = moment().format('YYYY-MM-DD hh:mm:ss:SS:SSS a');
// timestamp
// const timestamp = firebase.firestore.FieldValue.serverTimestamp();

/**
 * firebase database is like json file using key-value pair
 * each entitiy is called a collection
 * each row is called a document
 * in a document can contain many fields i.e primitive type, and object
 *
 * How to do query for firebase:
 * @ Retrieve a document
 * option1: firebase.database().collection('users).doc('uid-123').get();
 * option2: firebase.database().doc(`users/${uid-123}`).get();
 * Explaination: to retrieve a document: we have specify path in the query
 * path: '/users/uid-123', option 1 is using finding 'users' collection first and then
 * find the 'uid-123' unlike option 2 is using the '/users/uid-123' right away
 */
/**
 * createUser - register user with firebase auth and save the user info in the database
 * @param {object} - users information
 * @return {bolean} true/false
 */
export const createStore = async (payload) => {
  try {
    // TODO checkout registration CODE
    const { registrationCode } = payload;
    // sign up user with firebase auth
    const signedUpStore = await firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password);

    console.log("store signed up", signedUpStore);
    // send verification email TODO
    // signedUpUser.user.sendEmailVerification();

    // delete password to secure
    const storeInfo = payload;
    delete storeInfo.password;

    // user is created in auth but not in the collection

    const  location = await geoCoding(payload.postalCode);
    const { lat, lng } = location;
    const latlon = geohash.encode( lat, lng );
    
    await db
      .collection("stores")
      .doc(signedUpStore.user.uid)
      .set({ 
        ...storeInfo,
        lat,
        lng,
        latlon
      }, { merge: true });

    // return true after success
    return {
      result: true,
      error: "",
    };
  } catch (error) {
    console.log("create user fails", error.message);
    return {
      result: false,
      error: error.message,
    };
  }
};

/**
 * getUser - return user info from the database
 * @param {string} uid - the user id
 * @return {object} the user details
 */

export const getStore = async (uid) => {
  try {
    // get user ref
    const user = await db.collection("stores").doc(uid).get();

    return {
      ...user.data(),
      id: uid,
    };
  } catch (error) {
    console.log("getUser failed", error);
  }
};

export const geoCoding = async(address) => {
  try {
    const key = apiKey;
    const { data } = await axios.get(
      'https://maps.googleapis.com/maps/api/geocode/json',
      {
        params: {
          address,
          key
        }
      }
    );

    const { lat, lng } = data.results[0].geometry.location;
    console.log("lat",lat,'lng',lng )
    return {
        lat,
        lng
    }
  } catch (error ) {
    console.log("error geoCode", error)
  }

}
export function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

export const getOrders = async (callback) => {
	try {

		const userInfo = firebase.auth().currentUser;
		const { uid } = userInfo;
	  // .where('customerId', '==', uid)
		return await db
      .collection('orders')
      .where('status', '==', 'open')
			.onSnapshot( snapshot => {
				const active = [];
				// const completed = [];

				snapshot.forEach( doc => (
					doc.data().status === 'open' && active.push({
						id: doc.id,
						...doc.data()
					})
				))
				// snapshot.forEach( doc => (
				// 	doc.data().status === 'closed' && completed.push({
				// 		id: doc.id,
				// 		...doc.data()
				// 	})
				// ))

			callback(active);

			})

	} catch (error) {
		console.log("getOrders error", error);
	}
}


export const createTodayOrders = async (payload) => {
  try {
    const { uid } = firebase.auth().currentUser;
    const todayDate = moment().format('MMMM-Do-YYYY');
    const pushID = uid+todayDate;

    return await db
      .collection('todayOrders')
      .doc(pushID)
      .set({
        ...payload
      },{
        merge: true
      });
  
  } catch (error) {
    console.log("error createTodayAcceptedOrders")
  }

}


export const getTodayOrders = async () => {
  try {
    const { uid } = firebase.auth().currentUser;
    const todayDate = moment().format('MMMM-Do-YYYY');
    const pushID = uid+todayDate;

    const orders = await db
      .collection('todayOrders')
      .doc(pushID)
      .get();

    return {
      ...orders.data()
    };
  
  } catch (error) {
    console.log("error createTodayAcceptedOrders")
  }
  
}

export const updateOrder = async(pushId, progressStep, status) => {
  try {
    return await db
      .collection('orders')
      .doc(pushId)
      .set({
        progressStep,
        status
      },{
        merge: true
      });

  } catch (error) {
    console.log("error updateOrder", error);
  }
}
