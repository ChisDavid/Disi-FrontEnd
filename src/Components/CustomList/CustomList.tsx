import { ActionButton, BaseButton, DetailsList, DetailsListLayoutMode, IDetailsListStyles, Selection, ShimmeredDetailsList, Stack, ThemeProvider } from '@fluentui/react';
import { useState } from "react";
import { DELETE, EDIT } from '../../Utils/constants';
import { IActionButtonProps, ICustomListProps } from "./CustomList.types";
import './CustomList.css';

export const CustomList = <T,>(props: ICustomListProps<T>): JSX.Element => {
    const [selectedItems, setSelectedItems] = useState<Object[] | undefined>([]);
    const [selection] = useState<Selection>(() => new Selection({
        onSelectionChanged: () => {
            setSelectedItems(selection.getSelection());
        }
    }));

    const isButtonDisabled = (button: IActionButtonProps<T>): boolean => {

        return button.disabled ||
               button.requireSelectedItem && selectedItems?.length === 0 ||
               button.requireMultipleSelections && selectedItems?.length < 1 ||
               !button.requireMultipleSelections && button.requireSelectedItem && selectedItems?.length > 1;
    };

    const getActionButton = (button: IActionButtonProps<T>): JSX.Element => {
        return (
            <ActionButton
                key={button.text}
                iconProps={button.iconProps}
                allowDisabledFocus
                onClick={(event: React.MouseEvent<HTMLElement | BaseButton>) => button.onClick(event, selection['_selectedItems'])}
                disabled={isButtonDisabled(button)}
            >
                {button.text}
            </ActionButton>
        );
    }

    const gridStyles: Partial<IDetailsListStyles> = {
        root: {
          selectors: {
            '& [role=grid]': {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              height: '50vh',
            },
          },
        },
        headerWrapper: {
          flex: '0 0 auto',
        },
        contentWrapper: {
          flex: '1 1 auto',
          overflowY: 'auto',
        },
      };

    return (
        <div className='list-container'>
            <Stack tokens={{ childrenGap: 8 }} horizontal>
                {props.buttons.map((button: IActionButtonProps<T>) => getActionButton(button))}
            </Stack>
            <DetailsList
                items={props.items === undefined ? [] : props.items}
                columns={props.columns}
                selectionMode={props.selectionMode}
                layoutMode={DetailsListLayoutMode.fixedColumns}
                selectionPreservedOnEmptyClick={true}
                selection={selection}
                styles={gridStyles}
            />
        </div>
    );
}