export default function Valiadation(data, type) {
    let err = []
    // console.log(data);

    if (type === "register") {

        if (!(data.firstName)) {
            err.push({ key: "firstName", message: "Required felid Firstname is Empty" })
        } else if (!(/^[a-zA-Z ]{2,30}$/.test(data.firstName))) {
            err.push({ key: "firstName", message: "Firstname is invaild." })
        }

        if (!(data.lastName)) {
            err.push({ key: "lastName", message: "Required felid Lastname is Empty" })
        } else if (!(/^[a-zA-Z ]{2,30}$/.test(data.firstName))) {
            err.push({ key: "lastName", message: "Lastname is invaild." })
        }

        if (!(data.email)) {
            err.push({ key: "email", message: "Required felid Email is Empty" })
        }
        else if (!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(data.email))) {
            err.push({ key: "email", message: "Email is invaild." })
        }
        if (!(data.password)) {
            err.push({ key: "password", message: "Required felid Password is Empty" })
        } else if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(data.password))) {
            err.push({ key: "password", message: "Password to week please strong password" })
        }

    } else if (type === "adminUser") {
        if (!(data.fullName)) {
            err.push({ key: "fullName", message: "Required felid FullName is Empty" })
        } else if (!(/^[a-zA-Z ]{2,30}$/.test(data.firstName))) {
            err.push({ key: "fullName", message: "FullName is invaild." })
        }



        if (!(data.email)) {
            err.push({ key: "email", message: "Required felid Email is Empty" })
        }
        else if (!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(data.email))) {
            err.push({ key: "email", message: "Email is invaild." })
        }
        if (!(data.password)) {
            err.push({ key: "password", message: "Required felid Password is Empty" })
        } else if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(data.password))) {
            err.push({ key: "password", message: "Password to week please strong password" })
        }
    } else {

        if (!(data.email)) {
            err.push({ key: "email", message: "Required felid Email is Empty" })
        }
        else if (!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(data.email))) {
            err.push({ key: "email", message: "Email is invaild." })
        }
        if (!(data.password)) {
            err.push({ key: "password", message: "Required felid Password is Empty" })
        } else if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(data.password))) {
            err.push({ key: "password", message: "Password to week please strong password" })
        }


    }
    return err
}

