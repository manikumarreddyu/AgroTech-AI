import { isWillChangeMotionValue } from './is.mjs';
import { getWillChangeName } from './get-will-change-name.mjs';

function addValueToWillChange(visualElement, key) {
    var _a;
    if (!visualElement.applyWillChange)
        return;
    const willChange = visualElement.getValue("willChange");
    if (isWillChangeMotionValue(willChange)) {
        return willChange.add(key);
    }
    else if (!((_a = visualElement.props.style) === null || _a === void 0 ? void 0 : _a.willChange) &&
        getWillChangeName(key)) {
        visualElement.setStaticValue("willChange", "transform");
    }
}

export { addValueToWillChange };
