import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { CURRENT_USER, EMAIL_REQUIRED_ERROR, VALIDATION_CODE, WRONG_CODE_ERROR } from "../../Utils/constants";
import { DataType, MessageType, Pages, RegisterValues } from "../../Utils/enums";
import { getMessage, isInputValid, isNullEmptyOrUndefined } from "../../Utils/methods";
import { UserRoutes } from "../../Utils/routes";
import './login.scss';
import { IForgotPassword, ILoginData, IRegisterData } from "./LogIn.types";

let email: string;
const defaultLoginData: ILoginData = { email: '', password: '', };
const defaultRegisterData: IRegisterData = { password: '', name: '', email: '', age: -1, isAdmin: false };
const defaultPasswordStae: IForgotPassword = { email: '', password: '', validationCode: -1 }
const LogInTitle: string = 'Log In';
const SignUpTitle: string = 'Sign Up';
const ForgotPasswordTitle: string = 'Forgot Password';
const UpdatePassword: string = 'Update Password';
const LogInMode: string = 'login';
const SignUpMode: string = 'signup';

export const LogIn = (): JSX.Element => {
    const navigate: NavigateFunction = useNavigate();
    const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
    const [isForgotPasswordMode, setIsForgotPasswordMode] = useState<boolean>(false);
    const [loginData, setLoginData] = useState<ILoginData>(defaultLoginData);
    const [forgotPasswordState, setForgotPasswordState] = useState<IForgotPassword>(defaultPasswordStae);
    const [registerData, setRegisterData] = useState<IRegisterData>(defaultRegisterData);

    const onSubmit = async (): Promise<void> => {
        let serverData: AxiosResponse;

        if (!isForgotPasswordMode) {
            if (isLoginMode) {
                serverData = await axios.post(UserRoutes.LogIn, loginData)
            }
            else {
                serverData = await axios.post(UserRoutes.Register, registerData);
            }
        }
        else {
            if (forgotPasswordState.validationCode === Number(loginData.email)) {
                await axios.post(UserRoutes.UpdatePassword, { email: email, password: loginData.password } as ILoginData);
                setIsLoginMode(true);
                setIsForgotPasswordMode(false);
                setLoginData(defaultLoginData);
                setRegisterData(defaultRegisterData);
                setForgotPasswordState(defaultPasswordStae);
            }
            else {
                getMessage(MessageType.Error, WRONG_CODE_ERROR);
            }
        }

        localStorage.setItem(CURRENT_USER, JSON.stringify(serverData.data));
        isForgotPasswordMode
            ? setIsForgotPasswordMode(false)
            : isLoginMode
                ? navigate(Pages.Home)
                : setIsLoginMode(!isLoginMode);
    };

    const getTitle = (): string => {
        return isForgotPasswordMode ? ForgotPasswordTitle : isLoginMode ? LogInTitle : SignUpTitle;
    };

    const getButtonName = (): string => {
        return !isForgotPasswordMode ? getTitle() : UpdatePassword;
    };

    const getMode = (): string => {
        return isLoginMode ? LogInMode : SignUpMode;
    };

    const setData = (event: any): void => {
        const value: any = event.target.value;
        switch (event.target.name) {
            case RegisterValues.Email:
                isLoginMode ? setLoginData({ ...loginData, email: value }) : setRegisterData({ ...registerData, email: value });
                break;
            case RegisterValues.Password:
                isLoginMode ? setLoginData({ ...loginData, password: value }) : setRegisterData({ ...registerData, password: value });
                break;
            case RegisterValues.Name:
                setRegisterData({ ...registerData, name: value });
                break;
            case RegisterValues.Age:
                setRegisterData({ ...registerData, age: value });
                break;
            case RegisterValues.IsAdmin:
                setRegisterData({ ...registerData, isAdmin: value });
                break;
            case VALIDATION_CODE:
                setLoginData({ ...loginData, email: value })
                break;
        };
    };

    const getInputType = (label: string): string => {
        switch (label) {
            case RegisterValues.Password:
                return 'password';
            case RegisterValues.Email:
                return DataType.Email;
            case RegisterValues.Age:
            case VALIDATION_CODE:
                return DataType.Number;
            default: return DataType.Text;
        };
    };

    const logInLabels: string[] = isForgotPasswordMode ?
        [VALIDATION_CODE, RegisterValues.Password] :
        isLoginMode
            ? [RegisterValues.Email, RegisterValues.Password]
            : [RegisterValues.Name, RegisterValues.Email, RegisterValues.Password, RegisterValues.Age];


    const getInput = (label: string, disabled: any): JSX.Element => {
        return <input
            onChange={event => setData(event)}
            name={label}
            className="form-group__input"
            type={getInputType(label)}
            key={label}
            placeholder={label}
            disabled={disabled}
        />;
    };

    const forgotPassword = async (): Promise<void> => {
        if (isForgotPasswordMode) {
            setIsForgotPasswordMode(false);
            setLoginData(defaultLoginData);
            setRegisterData(defaultRegisterData);
            setForgotPasswordState(defaultPasswordStae);
        } else {
            if (isInputValid(DataType.Email, loginData.email)) {
                email = loginData.email;
                const validationCode = await axios.post(UserRoutes.ForgotPassword, loginData.email);
                setLoginData(defaultLoginData);
                !isNullEmptyOrUndefined(validationCode.data) && setForgotPasswordState({ ...forgotPasswordState, validationCode: validationCode.data });
                setIsForgotPasswordMode(true);
            }
            else {
                getMessage(MessageType.Error, EMAIL_REQUIRED_ERROR);
            }
        }
    };

    const getLinkName = (): string => {
        return !isForgotPasswordMode ? `${ForgotPasswordTitle}?` : `Back`;
    };

    return <div className={`app app--is-${getMode()}`}>
        <div>
            <div className={`form-block-wrapper form-block-wrapper--is-${getMode()}`} ></div>
            <section className={`form-block form-block--is-${getMode()}`}>
                <header className="form-block__header">
                    <h1>{getTitle()}</h1>
                    {!isForgotPasswordMode && <div className="form-block__toggle-block">
                        <span>{isLoginMode ? 'Don\'t' : 'Already'} have an account? Click here &#8594;</span>
                        <input id="form-toggler" type="checkbox" onClick={() => setIsLoginMode(!isLoginMode)} />
                        <label htmlFor="form-toggler"></label>
                    </div>}
                </header>

                <div className="form-block__input-wrapper">
                    <div className="form-group form-group--login">
                        {logInLabels.map((label: string) => getInput(label, !isLoginMode))}
                        {isLoginMode && <a
                            onClick={forgotPassword}
                            style={{ position: 'relative', left: !isForgotPasswordMode ? 175 : 260, color: 'rgba(255, 255, 255, 0.65)' }}>
                            {getLinkName()}
                        </a>}

                    </div>
                    <div className="form-group form-group--signup">
                        {logInLabels.map((label: string) => getInput(label, isLoginMode))}
                    </div>
                </div>
                <button className="button button--primary full-width" onClick={onSubmit} type="submit">{getButtonName()}</button>
            </section>
        </div>
    </div>;
};