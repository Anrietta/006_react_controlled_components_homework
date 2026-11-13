import { Component } from 'react';
import styles from './index.module.css'
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
        isNameValid: false,
        email: SIGN_UP_FORM_INITIAL_VALUES.email,
        isEmailValid: false,
        pass: SIGN_UP_FORM_INITIAL_VALUES.pass,
        isPassValid: false,
        passConfirmation: SIGN_UP_FORM_INITIAL_VALUES.passConfirmation,
        isPassConfirmationValid: false,
        isChecked: SIGN_UP_FORM_INITIAL_VALUES.isChecked,

      }
    }

    handleInputChange = ({target: {name, type, checked, value}}) => {
        const {pass} = this.state;

        if (type === 'checkbox') {
            this.setState({
                [name]: checked,
            })
            return;
        } else {
            const keyNameGenerator = `is${name.charAt(0).toUpperCase() + name.slice(1)}Valid`;

            {/*passConfirmation немає сенсу порівнювати одночасно на відповідність рег.виразу для pass і звіряти значення value===pass, достатньо лише перевірити щоб value був ідентичним у pass та passConfirmation*/}
            this.setState({
                [name]: value,
                [keyNameGenerator]: name === 'passConfirmation' ? value === pass : SIGN_UP_FORM_REG_EXP[name].test(value),
            });
        }
    }

    handleSubmit = e => {
            e.preventDefault();

            const {isNameValid, isEmailValid, isPassValid, isPassConfirmationValid} = this.state;

            if (!isNameValid || !isEmailValid || !isPassValid || !isPassConfirmationValid) {
                console.log('error on submit');
                return;
            }

            this.setState(SIGN_UP_FORM_INITIAL_VALUES);
    }

    render() {

        const {name, email, pass, passConfirmation, isChecked} = this.state;

        return (
            <div className={styles.formContainer}>
                <div className={styles.formIcon}><PiUserCirclePlus /></div>
                <h1 className={styles.formHeader}>Create your account</h1>
                <form className={styles.signUpForm} onSubmit={this.handleSubmit}>
                    <label className={styles.label}>
                        <span className={styles.inputName}>Name:</span>
                        <input 
                            className={styles.input}
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
                    <label className={styles.label}>
                        <span className={styles.inputName}>Email:</span>
                        <input
                            className={styles.input} 
                            type="email" 
                            name="email" 
                            placeholder="your@email" 
                            value={email} 
                            onChange ={this.handleInputChange} 
                            required
                            autoComplete="email"
                        />
                    </label>
                    <label className={styles.label}>
                        <span className={styles.inputName}>Password:</span>
                        <input
                            className={styles.input} 
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
                    <label className={styles.label}>
                        <span className={styles.inputName}>Confirm password:</span>
                        <input
                            className={styles.input} 
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
