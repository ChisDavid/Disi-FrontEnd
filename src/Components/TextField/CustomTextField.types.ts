export interface ICustomTextField {
    textFieldLabel: string;
    textContent: string;
    errorMessage?: string;
    textDisabled?: boolean;
    saveButton?: (event: any) => void;
    sectionChanged: (event: any) => void;
}