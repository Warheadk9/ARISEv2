// ARISEv2 shared Firebase config + init.
// Every page includes this via <script src="firebase-config.js"></script>,
// placed right after the Firebase SDK <script> tags and before any
// page-specific script. It exposes two globals every page uses: `auth`
// and `db`.

const firebaseConfig = {
  apiKey: "AIzaSyCUrbsJh9jER3Rhl-YX44598OKTcky5Ncw",
  authDomain: "the-awakening-f0aee.firebaseapp.com",
  projectId: "the-awakening-f0aee",
  storageBucket: "the-awakening-f0aee.appspot.com",
  messagingSenderId: "774133878054",
  appId: "1:774133878054:web:d660a991da47df1a3105e7"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
