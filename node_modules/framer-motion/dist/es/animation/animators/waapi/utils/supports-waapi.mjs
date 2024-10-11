import { memo } from '../../../../utils/memo.mjs';

const supportsWaapi = /*@__PURE__*/ memo(() => Object.hasOwnProperty.call(Element.prototype, "animate"));

export { supportsWaapi };
