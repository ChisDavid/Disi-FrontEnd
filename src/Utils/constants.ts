import { IIconProps } from "@fluentui/react";
import { IUser } from "../Models/IUser";

export const CURRENT_USER: string = "CurrentUser";
export const currentUser: IUser = JSON.parse(localStorage.getItem(CURRENT_USER) as string);

export const SUCCESS_STATUS: number = 200;
export const EMPTY_STRING: string = "";

export const ADD: string = "Add";
export const EDIT: string = "Edit";
export const DELETE: string = "Delete";
export const TENNIS_COURT: string = "Tennis Courts";
export const COURT_TARRIFS: string = "Court Tarrifs";
export const VALIDATION_CODE: string = "Validation Code";

export const EMAIL_REQUIRED_ERROR: string = "You have to enter your email";
export const LOGIN_ERROR: string = "There is no user with this this email and this password";
export const WRONG_CODE_ERROR: string = 'The validation code is not correct';

export const INVALID_DATA: string = "Invalid Data";
export const ADD_SUBSCRIPTION: string = "Add new subscription";
export const EDIT_TENNIS_COURTS_TARRIF: string = "Edit Tennis Court Tarrifs";
export const ADD_TENNIS_COURT: string = "Add tennis court";
export const UPDATE_SUCCESSFUL: string= "Update Successfuly";
export const UPDATE_ERROR: string = "You have some invalid data";
export const CLOSE_DIALOG_MESSAGE:string = "You will lose all changes."

export const ERROR_RESERVATION: string = "Will stil be payed";
export const DELETE_CONFIRM: string = 'You won\'t be able to revert this!';

export const ADD_RESERVATION: string = "Add Reservation";
export const EDIT_RESERVATION: string = "Edit Reservation";

export const addIcon: IIconProps = { iconName: 'Add' };
export const editIcon: IIconProps = { iconName: 'Edit' };
export const deleteIcon: IIconProps = { iconName: 'Delete' };
export const moneyIcon: IIconProps = { iconName: 'Money' };
export const tennisCourtsIcon: IIconProps = { iconName: 'Tennis' };