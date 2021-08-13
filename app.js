
// ************* Initialize ******************

let unknownProfilePic = document.getElementById("unknown-profile-pic");
let profilePicInput = document.getElementById("profile-pic-input");
let namee = document.getElementById("namee");
let emaill = document.getElementById("emaill");
let passwordd = document.getElementById("passwordd");
let phoneNumber = document.getElementById("phoneNumber");
let countryName = document.getElementById("countryName");
let cityName = document.getElementById("city");
let submitBtn = document.getElementById("submitBtn");
let role = document.getElementsByName("UserRole");

let db = firebase.firestore();
let storage = firebase.storage();
let auth = firebase.auth();




// ************** Object for value get ******************

let register = async () => {

   let createUser = await firebase.auth().createUserWithEmailAndPassword(emaill.value, passwordd.value)
    let UID = createUser.user.uid;
    let imgURL = await uploadImageToStorage(UID);

    let userInfoObj = {

        name : namee.value,
        email : emaill.value, 
        phoneNumber : phoneNumber.value, 
        countryName : countryName.value, 
        emacityName : cityName.value, 
        Role : userRole(),
        uid : UID,
        userProfile : imgURL,
    }
    window.location = "./home.html";

    db.collection("users").doc(UID).set(userInfoObj)
    console.log(userInfoObj);
}



let dpChange = () => {
    let profile = profilePicInput.files[0];
    unknownProfilePic.src = `./images/${profile.name}`;
}

 
let userRole = () => {
    let rolecheck;
for(let i = 0; i < role.length; i++){
    if(role[i].checked){
        rolecheck = role[i].value;
        console.log("rolecheck")
    }
}
return rolecheck;
}

let uploadImageToStorage = (UID) => {
    return new Promise(async(resolve, reject) => {
        let image = profilePicInput.files[0];
        storageRef = storage.ref();
        imageRef = storageRef.child(`userProfiles/${UID}/${image.name}`);
        await imageRef.put(image);
        let url = await imageRef.getDownloadURL();
        resolve(url)
    } )

    
}  
auth.onAuthStateChanged((user) => {
    let pageLocArr = window.location.href.split('/');
    let pageName = pageLocArr[pageLocArr.length - 1];
    let authenticatedPages = ['home.html', 'findwork.html', 'myjob.html'];

    // if (user && authenticatedPages.indexOf(pageName) === -1) {
    //     window.location = './findwork.html';
    // }
    // else if (!user && pageName === 'home.html') {
    //     window.location = './index.html';
    // }
});

async function signout() {
    await auth.signOut();
}



async function signinUser() {
    await auth.signInWithEmailAndPassword(emaill.value, passwordd.value);
    window.location = "./home.html";
}







let createNewAccount = () => {
    window.location = "./index.html"
}

let forgatePass = () => {
    firebase.auth().sendPasswordResetEmail(emaill)
  .then(() => {
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
}

let logInPage = () => {
window.location = "loginForm.html"
}