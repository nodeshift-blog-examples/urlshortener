import { __rest } from "tslib";
import * as React from 'react';
import { Dropdown } from "@patternfly/react-core/dist/esm/components/Dropdown";
import { KebabToggle } from "@patternfly/react-core/dist/esm/components/Dropdown/KebabToggle";
import { DropdownItem } from "@patternfly/react-core/dist/esm/components/Dropdown/DropdownItem";
import { DropdownSeparator } from "@patternfly/react-core/dist/esm/components/Dropdown/DropdownSeparator";
import { DropdownDirection, DropdownPosition } from "@patternfly/react-core/dist/esm/components/Dropdown/dropdownConstants";
export class ActionsColumn extends React.Component {
    constructor(props) {
        super(props);
        this.onToggle = (isOpen) => {
            this.setState({
                isOpen
            });
        };
        this.onSelect = (event, onClick) => {
            const { rowData, extraData } = this.props;
            // Only prevent default if onClick is provided.  This allows href support.
            if (onClick) {
                event.preventDefault();
                // tslint:disable-next-line:no-unused-expression
                onClick(event, extraData && extraData.rowIndex, rowData, extraData);
            }
            this.setState(prevState => ({
                isOpen: !prevState.isOpen
            }));
        };
        this.state = {
            isOpen: false
        };
    }
    render() {
        const { isOpen } = this.state;
        const { items, children, dropdownPosition, dropdownDirection, isDisabled, rowData } = this.props;
        return (React.createElement(React.Fragment, null,
            React.createElement(Dropdown, Object.assign({ toggle: React.createElement(KebabToggle, { isDisabled: isDisabled, onToggle: this.onToggle }), position: dropdownPosition, direction: dropdownDirection, isOpen: isOpen, dropdownItems: items.map((_a, key) => {
                    var { title, itemKey, onClick, isSeparator } = _a, props = __rest(_a, ["title", "itemKey", "onClick", "isSeparator"]);
                    return isSeparator ? (React.createElement(DropdownSeparator, Object.assign({}, props, { key: itemKey || key, "data-key": itemKey || key }))) : (React.createElement(DropdownItem, Object.assign({ component: "button", onClick: event => this.onSelect(event, onClick) }, props, { key: itemKey || key, "data-key": itemKey || key }), title));
                }), isPlain: true }, (rowData && rowData.actionProps))),
            children));
    }
}
ActionsColumn.displayName = 'ActionsColumn';
ActionsColumn.defaultProps = {
    children: null,
    items: [],
    dropdownPosition: DropdownPosition.right,
    dropdownDirection: DropdownDirection.down,
    rowData: {},
    extraData: {}
};
//# sourceMappingURL=ActionsColumn.js.map