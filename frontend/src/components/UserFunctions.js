import axios from 'axios';
export const login = (newUser)=>{
    return axios
    .post(
        'http://127.0.0.1:8000/login',{
            email: newUser.email,
            password: newUser.password,
        }

    )
    .then(res=>{
        localStorage.setItem('react_usertoken', res.data.token)
        console.log(res.data)
        return res.data
    })
    .catch(
        err => console.log(err)
    )
};