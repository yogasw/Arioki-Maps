import Firebase from 'firebase';
import firebase from '../Screens/Home';
exports.createDataUser = (uid,name, email, noPhone, location) => {
    const db = Firebase.database();
    const usersRef = db.ref("Users");
    usersRef.child(uid).set({
        uid:uid,
        name: name,
        email: email,
        noPhone: noPhone,
        userProfile:'https://namtrungsafety.com/wp-content/themes/namtrung/images/customer.png',
        location:location,
        lastOnline:Firebase.database.ServerValue.TIMESTAMP
    })
    return db;
};

exports.getDataUser = (uid) =>{
    const db = Firebase.database();
    const usersRef = db.ref("Users");
    usersRef.on('value', snapshot =>{
        let data = snapshot.val();
        let item =  Object.values(data);
        console.log(item);
        return item[0];
    })

    return '';
}

exports.DB = () =>{
}

