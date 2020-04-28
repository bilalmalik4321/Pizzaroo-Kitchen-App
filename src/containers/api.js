import firebase from "../firebase";

// access the database

// const { firebase , firestore } = all;
// console.log("aall", all);
const db = firebase.firestore();
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
 * getUser - return user info from the database
 * @param {string} uid - the user id
 * @return {object} the user details
 */
export const getUser = async (uid) => {
  try {
    // get user ref
    const user = await db.collection("customers").doc(uid).get();
    return {
      ...user.data(),
      id: uid,
    };
  } catch (error) {
    console.log("getUser failed", error);
  }
};
