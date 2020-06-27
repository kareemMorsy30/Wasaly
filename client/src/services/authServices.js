import Push from 'push.js';
import io from 'socket.io-client';

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

const getEmail = () => isLoggedIn() && JSON.parse(localStorage.getItem("user")).email;

export const subscribe = () => {
    const socket = io(`${process.env.REACT_APP_BACKEND_DOMAIN}`);
    socket.emit("subscribe", { room: getEmail() });

    socket.on("pushNotification", function(data) {
        console.log(data.body);
        Push.create(data.title, {
            body: data.message, //this should print Msg of owner
            icon: 'icon.png',
            timeout: 6000,
            requireInteraction: true,
            onClick: function () {
                window.focus();
                window.location.href = data.link;
                this.close();
            }
        });
    });
}

export {isAdmin, isProductOwner, isServiceOwner, isUser, isCustomer, isLoggedIn, getEmail}