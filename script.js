// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, orderBy, query } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDJVwDusiOAgBLPX1Q-Jtb1WaHWMhxP0Hw",
    authDomain: "devservices-b3aff.firebaseapp.com",
    projectId: "devservices-b3aff",
    storageBucket: "devservices-b3aff.appspot.com",
    messagingSenderId: "1031603240457",
    appId: "1:1031603240457:web:699925e09e4e1dcda5c2d8",
    measurementId: "G-9DQVDEM5TN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById('reviewForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const review = document.getElementById('review').value;
    
    try {
        await addDoc(collection(db, "reviews"), {
            name: name,
            review: review,
            timestamp: new Date()
        });
        console.log("Review added!");
        loadReviews(); // Refresh the review list
    } catch (error) {
        console.error("Error adding review: ", error);
    }

    // Clear the form
    document.getElementById('name').value = '';
    document.getElementById('review').value = '';
});

// Load reviews from Firestore
async function loadReviews() {
    const reviewList = document.getElementById('reviewList');
    reviewList.innerHTML = ''; // Clear existing reviews

    const q = query(collection(db, "reviews"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');
        reviewItem.innerHTML = `<strong>${doc.data().name}</strong><p>${doc.data().review}</p>`;
        reviewList.appendChild(reviewItem);
    });
}

// Initial load of reviews
loadReviews(); 