export interface IDialogComponentProps {
    dialogContent: JSX.Element;
    title: string;
    onSubmit: () => void;
    style?: string;
    onCancelDialog?: (value: boolean) => void;
    openDialog?: boolean;
}