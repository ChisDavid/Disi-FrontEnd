import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { CLOSE_DIALOG_MESSAGE } from '../../Utils/constants';
import { MessageType } from '../../Utils/enums';
import { confirm } from '../../Utils/methods';
import { IDialogComponentProps } from "./CustomDialog.types";

export const CustomDialog = (props: IDialogComponentProps): JSX.Element => {
    const [openDialog, setOpenDialog] = useState<boolean>(props.openDialog);

    const closeDialog = (): void => {
        setOpenDialog(false);
        confirm(CLOSE_DIALOG_MESSAGE, MessageType.Warning, () => {
            setOpenDialog(false);
            props?.onCancelDialog(false);
        }, () => setOpenDialog(true));
    };

    const Add = (): void => {
        props.onSubmit();
        setOpenDialog(false);
    };

    return <div>
        {props?.openDialog === undefined && <Button variant="contained" onClick={() => setOpenDialog(true)}>{props.title}</Button>}
        <Dialog open={props.openDialog !== undefined ? props.openDialog : openDialog} onClose={closeDialog} >
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent >
                {props.dialogContent}
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>Cancel</Button>
                <Button onClick={Add}>Ok</Button>
            </DialogActions>
        </Dialog>
    </div>


} 