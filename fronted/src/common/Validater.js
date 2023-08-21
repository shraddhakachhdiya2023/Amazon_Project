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
        } else if (!(/^[a-zA-Z ]{2,30}$/.test(data.lastName))) {
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
        if (!(data.conformPassword)) {
            err.push({ key: "conformPassword", message: "Required felid conformpassword is Empty" })

        }
        if (!(data.conformPassword === data.password)) {
            err.push({ key: "conformPassword", message: "not match conformpassword" })


        }


    } else if (type === "shipping") {
        if (!(data.fullName)) {
            err.push({ key: "fullName", message: "Required felid FullName is Empty" })
        } else if (!(/^[a-zA-Z ]{2,30}$/.test(data.fullName))) {
            err.push({ key: "fullName", message: "FullName is invaild." })
        }

        if (!(data.address)) {
            err.push({ key: "address", message: "Required felid Address is Empty" })
        } else if (!(/[A-Za-z'\\.\-\s\\,]{5,}$/.test(data.address))) {
            err.push({ key: "address", message: "Address is invaild." })
        }

        if (!(data.phone)) {
            err.push({ key: "phone", message: "Required felid Phone is Empty" })
        } else if (!(/^(\+\d{1,3}[- ]?)?\d{10}$/.test(data.phone))) {
            err.push({ key: "phone", message: "Phone is invaild." })
        }

        if (!(data.pincode)) {
            err.push({ key: "pincode", message: "Required felid Pincode is Empty" })
        } else if (!(/^(\d{4}|\d{6})$/.test(data.pincode))) {
            err.push({ key: "pincode", message: "Pincode is invaild." })
        }

        if (!(data.city)) {
            err.push({ key: "city", message: "Required felid City is Empty" })
        } else if (!(/^[a-zA-Z '.-]{2,10}$/.test(data.city))) {
            err.push({ key: "city", message: "City is invaild." })
        }

        if (!(data.email)) {
            err.push({ key: "email", message: "Required felid Email is Empty" })
        }
        else if (!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(data.email))) {
            err.push({ key: "email", message: "Email is invaild." })
        }


       
    }
    else {

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

