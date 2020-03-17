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
        callback(doc.data())
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

export const createTest = (db, data, setAlert, setAlertMessage, setOpen) => {
    let docRef = db.collection("test").doc(data.id);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("EXISTS")
            db.collection('test').doc(data.id).set(data);
            setAlertMessage("Веќе постои преглед со овој број на картон.Ажурирано.")
            setAlert("info")
            setOpen(false)
            setTimeout(() => {
                setAlert("")
            }, 10000)
        }
        else {
            db.collection('test').doc(data.id).set(data);
            setAlertMessage("Успешно креиравте нов преглед.")
            setAlert("success")
            setOpen(false)
            setTimeout(() => {
              setAlert("")
            }, 5000)
        }
    })
}


export const addTestArrangement = (db, id,  data) => {
    let docRef = db.collection("testArrangements").doc(id)
    docRef.get().then((doc) => {
        if(doc.exists) {
            return
        } else {
            db.collection('testArrangements').doc(id).set(data);
        }
    })

}

