import React, { useState } from "react";
import { Navigate, Link } from 'react-router-dom';
import './Login.css'
import Title from "./components/Title/Title";
import Label from "./components/Label/Label";
import Input from "./components/Input/Input";
/* import Button from '../../commons/RegularButton'; */
import ModalError from '../../commons/ModalError'

const Login = () => {
    const [ user, setUser ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ passwordError, setPasswordError ] = useState(false);
    const [ isLogin, setIsLogin ] = useState(false); //usar despues para el login
    const [ hasError, setHasError ] = useState(false);

    function handleChange(name, value) {
        if(name === 'usuario'){
            setUser(value)
        } else{
            if(value.length < 6 ){
                setPasswordError(true)
            } else {
                setPassword(value)
                setPasswordError(false)
            }
        }
    }

    async function handleSubmit() {
        const url = 'http://localhost:3000/login';
        const data = {
            email: user,
            password: password
        };
        const config = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        };

        if(data){
            fetch(url, config)
                .then(response => {
                    if (response.ok) {
                        setIsLogin(true);
                        // setear el usuario que viene en response.json()
                        return response.json();
                    } else {
                        setHasError(true);
                        throw new Error('Something went wrong');
                    }
                })
                .then((responseJson) => {
                    console.log("responseJson::::::::::", responseJson);
                })
                .catch((error) => {
                    setIsLogin(false)
                    setHasError(true);
                    console.log(error)
                });
        }

    }

    return (
        <div className="login-container">
            { isLogin && <Navigate to= '/home' />}
                <Title text='Bienvenido!'/>
                { hasError && 
                <ModalError
                title='Ocurrio un error!'
                text="Usuario o contraseña no existen"
            />
            }
            <Label text='Usuario'/>
            <Input 
            attribute={{
                id:'usuario',
                name: 'usuario',
                type: 'text',
                placeholder: 'Ingrese su usuario'
            }}
            handleChange={handleChange}
            />
            <Label text='Contraseña'/>
            <Input 
            attribute={{
                id:'contraseña',
                name: 'contraseña',
                type: 'password',
                placeholder: 'Ingrese su contraseña'
            }}
            handleChange={handleChange}
            param={passwordError}
            />

            {passwordError &&
            <label className="label-error">
                Contraseña invalida
            </label>
            }

            <button onClick={handleSubmit}>
                Ingresar
            </button>
            <div>
                <Label text='Quieres ser parte de la comunidad Kaizen?'/>
            <Link to='/createUser'>
            <Label text='Registrate aqui' />
            </Link>
            </div>
        </div>
    )
}

export default Login;