// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDJVwDusiOAgBLPX1Q-Jtb1WaHWMhxP0Hw",
    authDomain: "devservices-b3aff.firebaseapp.com",
    projectId: "devservices-b3aff",
    storageBucket: "devservices-b3aff.firebasestorage.app",
    messagingSenderId: "1031603240457",
    appId: "1:1031603240457:web:699925e09e4e1dcda5c2d8",
    measurementId: "G-9DQVDEM5TN"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById('reviewForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const review = document.getElementById('review').value;

    addDoc(collection(db, 'reviews'), {
        name: name,
        review: review,
        timestamp: serverTimestamp()
    }).then(() => {
        console.log('Review submitted!');
        // Optionally clear the form
        document.getElementById('reviewForm').reset();
        // Refresh the reviews list
        loadReviews();
    }).catch((error) => {
        console.error('Error adding review: ', error);
    });
});

// Load and display reviews
function loadReviews() {
    const reviewsQuery = query(collection(db, 'reviews'), orderBy('timestamp', 'desc'));
    getDocs(reviewsQuery).then((querySnapshot) => {
        const reviewList = document.getElementById('reviewList');
        reviewList.innerHTML = ''; // Clear existing reviews
        querySnapshot.forEach((doc) => {
            const reviewData = doc.data();
            const reviewElement = document.createElement('div');
            reviewElement.innerHTML = `<strong>${reviewData.name}</strong>: ${reviewData.review}`;
            reviewList.appendChild(reviewElement);
        });
    }).catch((error) => {
        console.error('Error getting reviews: ', error);
    });
}

// Load reviews on page load
loadReviews(); 