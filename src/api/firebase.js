import firebase from 'firebase/app';
import 'firebase/firestore';
export const firebaseInit = () => {
    var firebaseConfig = {
        apiKey: "AIzaSyAMCmpWMmF-M4Fl5d8cdn8g9ie9miydoPE",
        authDomain: "hieupham2k1.firebaseapp.com",
        databaseURL: "https://hieupham2k1-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "hieupham2k1",
        storageBucket: "hieupham2k1.appspot.com",
        messagingSenderId: "97320748876",
        appId: "1:97320748876:web:7100602ec1262e0e36f1e9"
    };
    // Initialize Firebase
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    return firebase.firestore();
}