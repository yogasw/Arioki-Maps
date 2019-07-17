import Firebase from 'firebase';
exports.createDataUser = (uid,name, email, noPhone) => {
    const db = Firebase.database();
    const usersRef = db.ref("Users");
    usersRef.child(uid).set({
        name: name,
        email: email,
        noPhone: noPhone,
        userProfile:''
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

