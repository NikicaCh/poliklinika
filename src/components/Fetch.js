import firebase from 'firebase'


export const queryCompaniesByName = (db, value, setCompanies) => {
    ///////////////IMPLEMENT SEARCH ONLY WHEN VALUE IS 1 CHARACTER, AFTER THAT USE THE SAME RESULTS
    let compRef = db.collection('companies');
    let query = compRef
    .where('name', '==', value).get()
    .then(snapshot => {
        if (snapshot.empty) {
        console.log('No matching documents.');
        return;
        }
        let values = []
        snapshot.forEach(doc => {
            if(doc.data().name.indexOf(value) == 0) {
                console.log(doc.id)
                let object = doc.data();
                object.id = doc.id
                values.push(object)
            }
        });
        setCompanies(values)
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });
}

export const queryEmployeesByName = () => {
    
}

export const queryEmployeesById = () => {
    
}


export const createEmployee = (db, id, data) => {
    //validation first
    let docRef = db.collection("employees").doc(id);
    let message = docRef.get().then(function(doc) {
        if (doc.exists) {
            return new Error("Вработен со тој ЕМБГ веќе постои во системот")
        } else {
            db.collection('employees').doc(id).set(data);
            return "good job" 
        }   
    })
    console.log(message)
}

export const getEmployee = (db, id, callback) => {
    let employeeRef = db.collection('employees').doc(id);
    let getDoc = employeeRef.get()
    .then(doc => {
        if (!doc.exists) {
        console.log('No such document!');
        } else {
        callback(id, doc.data())
        }
    })
    .catch(err => {
        console.log('Error getting document', err);
    });
}

export const findCompanyEmployees = (db, array) => {
    let newArray = array.map((emp) => {
        let employee = getEmployee(db, emp.id)
        return employee
    })
    return newArray
}

export const createTest = (db, data, employeeId, setAlert, setAlertMessage, setOpen) => {
    db.collection('tests').doc(data.id).set(data);
    let employee = db.collection("employees").doc(employeeId)
        employee.update({
        tests: firebase.firestore.FieldValue.arrayUnion(data.id)
        })
    setAlertMessage("Успешно креиравте нов преглед.")
    setAlert("success")
}



export const addTestArrangement = (db, id,  data, setAlert, setAlertMessage) => {
    let docRef = db.collection("testArrangements").doc(id)
    docRef.get().then((doc) => {
        if(doc.exists) {
            return
        } else {
            db.collection('testArrangements').doc(id).set(data);
            setAlert("success")
            setAlertMessage("Успешно закажавте систематски преглед.")
        }
    })

}

export const createCompany = (db, id, data, setAlert, setAlertMessage) => {

    let docRef = db.collection("companies").doc(id)
    docRef.get().then((doc) => {
        if(doc.exists) {
            setAlert("error")
            setAlertMessage("Фирма со тој ИД веќе постои во системот.")
            return
        } else {
            db.collection('companies').doc(id).set(data);
            setAlert("success")
            setAlertMessage("Успешно креиравте фирма.")
        }
    })
}

export const deleteCompany = (db, id) => {
    db.collection("companies").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

export const deleteEmployee = (db, id) => {
    db.collection("employees").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

export const deleteTest = (db, id) => {
    db.collection("tests").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}