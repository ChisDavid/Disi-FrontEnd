import { Nav } from "react-bootstrap";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { CURRENT_USER } from "../../Utils/constants";
import { MessageType, Pages } from "../../Utils/enums";
import { confirm } from "../../Utils/methods";
import './Navbar.css';
import { INavItem } from "./Navbar.types";

const MenuItems: INavItem[] = [{ Title: "Home", Url: `${Pages.Home}`, className: "nav-links" }, { Title: "Register", Url: `${Pages.Register}`, className: "nav-links" }, { Title: "My Subscriptions", Url: `${Pages.Subscription}`, className: "nav-links" }];
const LogOutMessage: string = "Do you want to log out?";
export const Navbar = (): JSX.Element => {

    const navigate: NavigateFunction = useNavigate();
    const logOut = (): void => {
        localStorage.setItem(CURRENT_USER, null);
        confirm(LogOutMessage, MessageType.Warning, () => navigate(Pages.LogIn));
    };

    return (
        <Nav className="NavbarItems">
            <h1 className="Navbar-logo">Logo</h1>
            <ul className="Navbar-ul">
                {MenuItems.map((item: INavItem, index: number) => {
                    return (
                        <li key={index}>
                            <a className={item.className} href={item.Url}>
                                {item.Title}
                            </a>
                        </li>
                    );
                })}

                <li className={'logOut'} key={'logout'}>
                    <a className={'logOut'} onClick={logOut}>
                        {'LogOut'}
                    </a>
                </li>
            </ul>
        </Nav>
    );
}