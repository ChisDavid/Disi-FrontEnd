import { Fragment } from "react";
import { Navbar } from "../../Components/Navbar/Navbar";
import { currentUser } from "../../Utils/constants";
import { AdminPage } from "../AdminPage/AdminPage";
import { UserPage } from "../UserPage/UserPage";

export const Home = (): JSX.Element => {
    return (
        <Fragment>
            <Navbar />
            {currentUser?.isAdmin ? <AdminPage /> : <UserPage />}
        </Fragment>
    );
}