import Config from 'react-native-config';

module.exports.firebaseConfig = {
    apiKey: Config.FIREBASE_apiKey,
    authDomain: Config.FIREBASE_authDomain,
    databaseURL: Config.FIREBASE_databaseURL,
    projectId: Config.FIREBASE_projectId,
    storageBucket: Config.FIREBASE_storageBucket,
    messagingSenderId: Config.FIREBASE_messagingSenderId,
    appId: Config.FIREBASE_appId
};
