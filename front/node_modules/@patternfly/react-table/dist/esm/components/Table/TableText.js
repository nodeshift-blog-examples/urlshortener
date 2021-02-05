import { __rest } from "tslib";
import * as React from 'react';
import styles from '@patternfly/react-styles/css/components/Table/table';
import { css } from '@patternfly/react-styles';
import { Tooltip } from "@patternfly/react-core/dist/esm/components/Tooltip/Tooltip";
export var TableTextVariant;
(function (TableTextVariant) {
    TableTextVariant["div"] = "div";
    TableTextVariant["nav"] = "nav";
})(TableTextVariant || (TableTextVariant = {}));
export var WrapModifier;
(function (WrapModifier) {
    WrapModifier["wrap"] = "wrap";
    WrapModifier["nowrap"] = "nowrap";
    WrapModifier["truncate"] = "truncate";
    WrapModifier["breakWord"] = "breakWord";
    WrapModifier["fitContent"] = "fitContent";
})(WrapModifier || (WrapModifier = {}));
export const TableText = (_a) => {
    var { children = null, className = '', variant = 'span', wrapModifier = null, tooltip: tooltipProp = '', onMouseEnter: onMouseEnterProp = () => { } } = _a, props = __rest(_a, ["children", "className", "variant", "wrapModifier", "tooltip", "onMouseEnter"]);
    const Component = variant;
    const [tooltip, setTooltip] = React.useState('');
    const onMouseEnter = (event) => {
        if (event.target.offsetWidth < event.target.scrollWidth) {
            setTooltip(tooltipProp || event.target.innerHTML);
        }
        else {
            setTooltip('');
        }
        onMouseEnterProp(event);
    };
    const text = (React.createElement(Component, Object.assign({ onMouseEnter: onMouseEnter, className: css(className, wrapModifier && styles.modifiers[wrapModifier], styles.tableText) }, props), children));
    return tooltip !== '' ? (React.createElement(Tooltip, { content: tooltip, isVisible: true }, text)) : (text);
};
TableText.displayName = 'TableText';
//# sourceMappingURL=TableText.js.map