import { Component } from 'react';
import { PiUserCirclePlus } from "react-icons/pi";

const SIGN_UP_FORM_INITIAL_VALUES = {
        name: '',
        email: '',
        pass: '',
        passConfirmation: '',
        isChecked: true,
}

const SIGN_UP_FORM_REG_EXP = {
    name: /^[A-Z][a-z]+([ -][A-Z][a-z]+)*$/,
    email: /^.+@.+$/,
    pass: /^(?=.*[A-Z].*)(?=.*[a-z].*)(?=.*\d.*)(?=.*[!@#$%^&**.].*).{8,20}$/,
}

class SignUpForm extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        name: SIGN_UP_FORM_INITIAL_VALUES.name,
        email: SIGN_UP_FORM_INITIAL_VALUES.email,
        pass: SIGN_UP_FORM_INITIAL_VALUES.pass,
        passConfirmation: SIGN_UP_FORM_INITIAL_VALUES.passConfirmation,
        isChecked: SIGN_UP_FORM_INITIAL_VALUES.isChecked,

      }
    }

    handleInputChange = ({target: {name, type, checked, value}}) => {
        this.setState({
            [name]:  type === 'checkbox' ? checked : value,
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState(SIGN_UP_FORM_INITIAL_VALUES);
    }

    render() {

        const {name, email, pass, passConfirmation, isChecked} = this.state;

        return (
            <div>
                <div><PiUserCirclePlus /></div>
                <h1>Create your account</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <span>Name:</span>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Enter your name" 
                            value={name} 
                            onChange ={this.handleInputChange} 
                            required
                            autoComplete="name"
                            autoFocus
                        />
                    </label>
                    <label>
                        <span>Email:</span>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="your@email" 
                            value={email} 
                            onChange ={this.handleInputChange} 
                            required
                            autoComplete="email"
                        />
                    </label>
                    <label>
                        <span>Password:</span>
                        <input 
                            type="password" 
                            name="pass" 
                            placeholder="Password" 
                            value={pass} 
                            onChange ={this.handleInputChange} 
                            required
                            autoComplete="new-password"
                            minLength='8'
                        />
                    </label>
                    <label>
                        <span>Confirm password:</span>
                        <input 
                            type="password" 
                            name="passConfirmation" 
                            placeholder="Password" 
                            value={passConfirmation} 
                            onChange ={this.handleInputChange} 
                            required
                            autoComplete="new-password"
                            minLength='8' 
                        />
                    </label>
                    <label>
                        {/*У реакт атрибут checked який вказаний статично (сhecked або checked={true}) без привязки до стейта означає що чекбокс завжди ввімкнено
                        тобто реакт буде ігнорити кліки на чекбоксі і не буде знімати пташечку. Щоб все ставилось і знімалось треба звязати атриб checked із
                        стейтом (як в інших інпутах ми робим з value) checkbox={isChecked} тоді його значення автоматично буде змінюватись між true/false при кліку
                        , обробник змінюватиме стейт, і пташечка буде гарно зніматись*/}
                        <input 
                            type="checkbox" 
                            name="isChecked" 
                            onChange={this.handleInputChange} 
                            checked={isChecked} 
                            required
                        />
                        <span>I agree all statements and terms of service</span>
                    </label>
                    <button type='submit'>Sign Up</button>
                </form>
            </div>
        );
    }
}

export default SignUpForm;
