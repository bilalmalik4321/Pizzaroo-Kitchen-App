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
 * createUser - register user with firebase auth and save the user info in the database
 * @param {object} - users information
 * @return {bolean} true/false
 */
export const createUser = async (payload) => {
  try {
    // sign up user with firebase auth
    const signedUpUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password);

    console.log("user sign up", signedUpUser);
    // send verification email TODO
    // signedUpUser.user.sendEmailVerification();

    // delete password to secure
    const userInfo = payload;
    delete userInfo.password;

    // user is created in auth but not in the collection

    await db
      .collection("customers")
      .doc(signedUpUser.user.uid)
      .set({ ...userInfo }, { merge: true });

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
