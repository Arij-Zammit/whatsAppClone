// Import the functions you need from the SDKs you need
import app  from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
import "firebase/compat/auth";
import "firebase/compat/database";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHSwAaUmvMZ_rATy05_5kpG2TgUhosB0o",
  authDomain: "whatsappclone-d1b86.firebaseapp.com",
  databaseURL: "https://whatsappclone-d1b86-default-rtdb.firebaseio.com",
  projectId: "whatsappclone-d1b86",
  storageBucket: "whatsappclone-d1b86.firebasestorage.app",
  messagingSenderId: "435995370076",
  appId: "1:435995370076:web:e46104096a0fb2234abc99"
};

// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);
export default firebase;


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mxiokykluygabkujsxaf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14aW9reWtsdXlnYWJrdWpzeGFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3MDY3MjIsImV4cCI6MjA0ODI4MjcyMn0.AtrQt145-H5Inw80ykFfDYGVeBZV6MJPOlR29kV_UNE'
const supabase = createClient(supabaseUrl, supabaseKey)
export {supabase};