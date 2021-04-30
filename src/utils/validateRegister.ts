import {UsernamePasswordinput} from '../utils/fields'


export const validateRegister = (options : UsernamePasswordinput) => {
    if(!options.email.includes('@')){
            return [{
                    field: 'email',
                    message: 'Email invalide'
            }]            
        }

        if(options.username.length <= 2){
            return[{
                    field: 'username',
                    message: 'Username pas assez long'
                }]
        }

        if(options.username.includes('@')){
            return[{
                    field: 'username',
                    message: 'Ne peut pas contenir d\'@'
                }]
        }

        if(options.password.length <= 2){
            return[{
                    field: 'password',
                    message: 'Mot de passe pas assez long'
                }]
        }

        return null;
}