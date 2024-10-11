import { startWaapiAnimation } from './index.mjs';
import { createGeneratorEasing } from '../../../easing/utils/create-generator-easing.mjs';
import { browserNumberValueTypes } from '../../../render/dom/value-types/number-browser.mjs';
import { invariant } from '../../../utils/errors.mjs';
import { noop } from '../../../utils/noop.mjs';
import { secondsToMilliseconds, millisecondsToSeconds } from '../../../utils/time-conversion.mjs';
import { isGenerator } from '../../generators/utils/is-generator.mjs';
import { attachTimeline } from './utils/attach-timeline.mjs';
import { getFinalKeyframe } from './utils/get-final-keyframe.mjs';
import { setCSSVar, setStyle } from './utils/style.mjs';
import { supportsLinearEasing } from './utils/supports-linear-easing.mjs';
import { supportsPartialKeyframes } from './utils/supports-partial-keyframes.mjs';
import { supportsWaapi } from './utils/supports-waapi.mjs';

const state = new WeakMap();
function hydrateKeyframes(valueName, keyframes, read) {
    for (let i = 0; i < keyframes.length; i++) {
        if (keyframes[i] === null) {
            keyframes[i] = i === 0 ? read() : keyframes[i - 1];
        }
        if (typeof keyframes[i] === "number" &&
            browserNumberValueTypes[valueName]) {
            keyframes[i] = browserNumberValueTypes[valueName].transform(keyframes[i]);
        }
    }
    if (!supportsPartialKeyframes() && keyframes.length < 2) {
        keyframes.unshift(read());
    }
}
const defaultEasing = "easeOut";
function getElementAnimationState(element) {
    const animationState = state.get(element) || new Map();
    state.set(element, animationState);
    return state.get(element);
}
class NativeAnimation {
    constructor(element, valueName, valueKeyframes, options) {
        const isCSSVar = valueName.startsWith("--");
        this.setValue = isCSSVar ? setCSSVar : setStyle;
        this.options = options;
        this.updateFinishedPromise();
        invariant(typeof options.type !== "string", `animateMini doesn't support "type" as a string. Did you mean to import { spring } from "framer-motion"?`);
        const existingAnimation = getElementAnimationState(element).get(valueName);
        existingAnimation && existingAnimation.stop();
        const readInitialKeyframe = () => {
            return valueName.startsWith("--")
                ? element.style.getPropertyValue(valueName)
                : window.getComputedStyle(element)[valueName];
        };
        if (!Array.isArray(valueKeyframes)) {
            valueKeyframes = [valueKeyframes];
        }
        hydrateKeyframes(valueName, valueKeyframes, readInitialKeyframe);
        if (isGenerator(options.type)) {
            const generatorOptions = createGeneratorEasing(options, 100, options.type);
            options.ease = supportsLinearEasing()
                ? generatorOptions.ease
                : defaultEasing;
            options.duration = secondsToMilliseconds(generatorOptions.duration);
            options.type = "keyframes";
        }
        else {
            options.ease = options.ease || defaultEasing;
        }
        this.removeAnimation = () => { var _a; return (_a = state.get(element)) === null || _a === void 0 ? void 0 : _a.delete(valueName); };
        const onFinish = () => {
            this.setValue(element, valueName, getFinalKeyframe(valueKeyframes, this.options));
            this.cancel();
            this.resolveFinishedPromise();
        };
        if (!supportsWaapi()) {
            onFinish();
        }
        else {
            this.animation = startWaapiAnimation(element, valueName, valueKeyframes, options);
            if (options.autoplay === false) {
                this.animation.pause();
            }
            this.animation.onfinish = onFinish;
            if (this.pendingTimeline) {
                attachTimeline(this.animation, this.pendingTimeline);
            }
            getElementAnimationState(element).set(valueName, this);
        }
    }
    get duration() {
        return millisecondsToSeconds(this.options.duration || 300);
    }
    get time() {
        var _a;
        if (this.animation) {
            return millisecondsToSeconds(((_a = this.animation) === null || _a === void 0 ? void 0 : _a.currentTime) || 0);
        }
        return 0;
    }
    set time(newTime) {
        if (this.animation) {
            this.animation.currentTime = secondsToMilliseconds(newTime);
        }
    }
    get speed() {
        return this.animation ? this.animation.playbackRate : 1;
    }
    set speed(newSpeed) {
        if (this.animation) {
            this.animation.playbackRate = newSpeed;
        }
    }
    get state() {
        return this.animation ? this.animation.playState : "finished";
    }
    get startTime() {
        return this.animation ? this.animation.startTime : null;
    }
    play() {
        if (this.state === "finished") {
            this.updateFinishedPromise();
        }
        this.animation && this.animation.play();
    }
    pause() {
        this.animation && this.animation.pause();
    }
    stop() {
        if (!this.animation ||
            this.state === "idle" ||
            this.state === "finished") {
            return;
        }
        if (this.animation.commitStyles) {
            this.animation.commitStyles();
        }
        this.cancel();
    }
    complete() {
        this.animation && this.animation.finish();
    }
    cancel() {
        this.removeAnimation();
        try {
            this.animation && this.animation.cancel();
        }
        catch (e) { }
    }
    /**
     * Allows the returned animation to be awaited or promise-chained. Currently
     * resolves when the animation finishes at all but in a future update could/should
     * reject if its cancels.
     */
    then(resolve, reject) {
        return this.currentFinishedPromise.then(resolve, reject);
    }
    updateFinishedPromise() {
        this.currentFinishedPromise = new Promise((resolve) => {
            this.resolveFinishedPromise = resolve;
        });
    }
    attachTimeline(timeline) {
        if (!this.animation) {
            this.pendingTimeline = timeline;
        }
        else {
            attachTimeline(this.animation, timeline);
        }
        return noop;
    }
}

export { NativeAnimation };
