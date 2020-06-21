
const isAdmin=()=>{
    const user= JSON.parse(localStorage.getItem('user'));
    return user.role=="admin" && true;
}
const isProductOwner=()=>{
    const user=JSON.parse(localStorage.getItem('user')) ;
    return user.role=="productowner"? true: false;
}
const isServiceOwner=()=>{
    const user= JSON.parse(localStorage.getItem('user'));
    return user.role=="serviceowner" ? true : false;
}
const isUser=()=>{
    const user= JSON.parse(localStorage.getItem('user'));
    return user.role?  user.role=="customer"? true: false : false
}
const isCustomer=()=>{
    const user= JSON.parse(localStorage.getItem('user'));
    return !user ? true:false;
}
export {isAdmin, isProductOwner, isServiceOwner, isUser, isCustomer}