import {useForm} from 'react-hook-form'
//import {registerRequest} from "../api/auth.js"
import { useAuth } from "../context/authContext"

export function Register(){
    const {register,handleSubmit} = useForm()   
    const estilos = obtenerEstilos();
    const {signup,user} = useAuth()
    console.log(user)
    const onSubmit = handleSubmit(async (values) => {console.log(values);signup(values) })
        
    return (
        <div  style={estilos.formContainer}>
            <form style={estilos.inputRow} onSubmit={onSubmit}>
                <input style={estilos.inputField} placeholder='usuario' type="text" {...register("username", {required: true})}/>
                <input style={estilos.inputField} placeholder="correo "type="email" {...register("email", {required: true})}/>
                <input style={estilos.inputField} type="password" {...register("password", {required: true})}/>
                <button type="submit">Register</button>

            </form>


        </div>
    )
}



function obtenerEstilos() {
    return {
        formContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        },
        inputRow: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: '10px'
        },
        inputField: {
            margin: '5px',
            color: "blue"
        }
    };
}




