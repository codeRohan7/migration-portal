
export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function validatePassword(password) {
    const lowerCaser = /[a-z]/g;
    const upperCase = /[A-Z]/g;
    const number = /[0-9]/g;
    const specialChar = /[^a-zA-Z\d]/g;
    
    if (password.length=="") {
        return "Password field cannot be empty";
    }
    if (!(lowerCaser.test(password))) {
        return "Password field should contain at least one lowercase";
    }
    if (!(upperCase.test(password))) {
        return "Password field should contain at least one Uppercase";

    }
    if (!(number.test(password))) {
        return "Password field should contain at least one number";
    }
    if (!(specialChar.test(password))) {
        return "Password field should contain at least one special character";
    }
    if (password.length <= 7 || password.length >= 32) {
        return "Password length must be at least 8 characters long but less than 32 characters";

    }
    
    return "";

}

export function validateConfirmPassword(password, confirmpassword) {
    if (password === confirmpassword) {
        return true;
    }
    return false;
}

export function validateUsername(username) {
    //  const name = /^[a-zA-Z]+ [a-zA-Z]+[0-9]$/;
    const name = /^[a-zA-Z0-9-_]+$/;
    if (name.test(username)) {
        return true;
    }
    return false;
}


export function validateUsername1(username) {

    if (username.length >= 4) {
        return true;
    }
    return false;
}