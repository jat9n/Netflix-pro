export const isValidData = (email,password)=>{
    const emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    if(!emailValidation) return "Enter a valid email.";
    if(!passwordValidation) return "Enter a valid password.";

    return null

}