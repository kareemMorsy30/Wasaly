
const isAdmin=()=>{
    const user= JSON.parse(localStorage.getItem('user'));
    return user.role=="admin" && true;
}
const isProductOwner=()=>{
    const user=JSON.parse(localStorage.getItem('user')) ;
    return user?user.role=="productowner"? true: false: false;
}
const isServiceOwner=()=>{
    const user= JSON.parse(localStorage.getItem('user'));
    return user.role? user.role=="serviceowner" ? true : false:false;
}
const isUser=()=>{
    const user= JSON.parse(localStorage.getItem('user'));
    return user&&user.role? user.role=="customer"? true: false : false
}
const isCustomer=()=>{
    const user= JSON.parse(localStorage.getItem('user'));
    return !user ? true:false;
}
const isLoggedIn=()=>{
    const user= JSON.parse(localStorage.getItem('user'));
    return user ? true:false;
}
export {isAdmin, isProductOwner, isServiceOwner, isUser, isCustomer, isLoggedIn}