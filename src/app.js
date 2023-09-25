// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Import the functions you need from the SDKs you need

import {
  getFirestore,
  addDoc,
  getDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDLuQPCCi4PXNQMKiTYjWQd3WNZNu-XHeA',
  authDomain: 'todoapp-cbe94.firebaseapp.com',
  projectId: 'todoapp-cbe94',
  storageBucket: 'todoapp-cbe94.appspot.com',
  messagingSenderId: '166461415447',
  appId: '1:166461415447:web:3114a9424bbc24f66c3c52',
  measurementId: 'G-T7HK00TDHB',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth(app);
// --------------todo form-------------------
let array=[]
let form = document.querySelector('.todo');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  let todo = e.target.todo.value;
  e.target.reset();

  // Adding data with auto id
  const docRef = await addDoc(collection(db, 'todo'), {
    todo: todo,
  });
  console.log('Document written with ID: ', docRef.id);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    let todos = docSnap.data();
    console.log(typeof todos);

   array.push(todos.todo);
    console.log(array);
    let main = document.querySelector('.main');

    let finalData = '';
    array.forEach((x, i) => {
      finalData += `
      <div class="items">
          <p class="cross" >&times;</p>
          <h2> Things To do ${i + 1} :
          </h2>
          <ul>
          <p> ${x} </p>
          </ul>
      </div>
      `;

      main.innerHTML = finalData;
      console.log(array);
    });
  } else {
    console.log('No such document!');
  }
});
