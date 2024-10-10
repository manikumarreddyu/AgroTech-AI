'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function memo(callback) {
    let result;
    return () => {
        if (result === undefined)
            result = callback();
        return result;
    };
}

const supportsScrollTimeline = memo(() => window.ScrollTimeline !== undefined);

class GroupPlaybackControls {
    constructor(animations) {
        // Bound to accomodate common `return animation.stop` pattern
        this.stop = () => this.runAll("stop");
        this.animations = animations.filter(Boolean);
    }
    then(onResolve, onReject) {
        return Promise.all(this.animations).then(onResolve).catch(onReject);
    }
    /**
     * TODO: Filter out cancelled or stopped animations before returning
     */
    getAll(propName) {
        return this.animations[0][propName];
    }
    setAll(propName, newValue) {
        for (let i = 0; i < this.animations.length; i++) {
            this.animations[i][propName] = newValue;
        }
    }
    attachTimeline(timeline, fallback) {
        const subscriptions = this.animations.map((animation) => {
            if (supportsScrollTimeline() && animation.attachTimeline) {
                return animation.attachTimeline(timeline);
            }
            else {
                return fallback(animation);
            }
        });
        return () => {
            subscriptions.forEach((cancel, i) => {
                cancel && cancel();
                this.animations[i].stop();
            });
        };
    }
    get time() {
        return this.getAll("time");
    }
    set time(time) {
        this.setAll("time", time);
    }
    get speed() {
        return this.getAll("speed");
    }
    set speed(speed) {
        this.setAll("speed", speed);
    }
    get startTime() {
        return this.getAll("startTime");
    }
    get duration() {
        let max = 0;
        for (let i = 0; i < this.animations.length; i++) {
            max = Math.max(max, this.animations[i].duration);
        }
        return max;
    }
    runAll(methodName) {
        this.animations.forEach((controls) => controls[methodName]());
    }
    play() {
        this.runAll("play");
    }
    pause() {
        this.runAll("pause");
    }
    cancel() {
        this.runAll("cancel");
    }
    complete() {
        this.runAll("complete");
    }
}

const noop = (any) => any;

let invariant = noop;
if (process.env.NODE_ENV !== "production") {
    invariant = (check, message) => {
        if (!check) {
            throw new Error(message);
        }
    };
}

function resolveElements(elements, scope, selectorCache) {
    var _a;
    if (typeof elements === "string") {
        let root = document;
        if (scope) {
            invariant(Boolean(scope.current), "Scope provided, but no element detected.");
            root = scope.current;
        }
        if (selectorCache) {
            (_a = selectorCache[elements]) !== null && _a !== void 0 ? _a : (selectorCache[elements] = root.querySelectorAll(elements));
            elements = selectorCache[elements];
        }
        else {
            elements = root.querySelectorAll(elements);
        }
    }
    else if (elements instanceof Element) {
        elements = [elements];
    }
    /**
     * Return an empty array
     */
    return Array.from(elements || []);
}

/**
 * Converts seconds to milliseconds
 *
 * @param seconds - Time in seconds.
 * @return milliseconds - Converted time in milliseconds.
 */
const secondsToMilliseconds = (seconds) => seconds * 1000;
const millisecondsToSeconds = (milliseconds) => milliseconds / 1000;

function getValueTransition(transition, key) {
    return transition
        ? transition[key] ||
            transition["default"] ||
            transition
        : undefined;
}

const isBezierDefinition = (easing) => Array.isArray(easing) && typeof easing[0] === "number";

/*
  Progress within given range

  Given a lower limit and an upper limit, we return the progress
  (expressed as a number 0-1) represented by the given value, and
  limit that progress to within 0-1.

  @param [number]: Lower limit
  @param [number]: Upper limit
  @param [number]: Value to find progress within given range
  @return [number]: Progress of value within range as expressed 0-1
*/
const progress = (from, to, value) => {
    const toFromDifference = to - from;
    return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};

// Create a linear easing point for every 10 ms
const resolution = 10;
const generateLinearEasing = (easing, duration // as milliseconds
) => {
    let points = "";
    const numPoints = Math.max(Math.round(duration / resolution), 2);
    for (let i = 0; i < numPoints; i++) {
        points += easing(progress(0, numPoints - 1, i)) + ", ";
    }
    return `linear(${points.substring(0, points.length - 2)})`;
};

/**
 * Add the ability for test suites to manually set support flags
 * to better test more environments.
 */
const supportsFlags = {
    linearEasing: undefined,
};

function memoSupports(callback, supportsFlag) {
    const memoized = memo(callback);
    return () => { var _a; return (_a = supportsFlags[supportsFlag]) !== null && _a !== void 0 ? _a : memoized(); };
}

const supportsLinearEasing = /*@__PURE__*/ memoSupports(() => {
    try {
        document
            .createElement("div")
            .animate({ opacity: 0 }, { easing: "linear(0, 1)" });
    }
    catch (e) {
        return false;
    }
    return true;
}, "linearEasing");

const cubicBezierAsString = ([a, b, c, d]) => `cubic-bezier(${a}, ${b}, ${c}, ${d})`;
const supportedWaapiEasing = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: /*@__PURE__*/ cubicBezierAsString([0, 0.65, 0.55, 1]),
    circOut: /*@__PURE__*/ cubicBezierAsString([0.55, 0, 1, 0.45]),
    backIn: /*@__PURE__*/ cubicBezierAsString([0.31, 0.01, 0.66, -0.59]),
    backOut: /*@__PURE__*/ cubicBezierAsString([0.33, 1.53, 0.69, 0.99]),
};
function mapEasingToNativeEasing(easing, duration) {
    if (!easing) {
        return undefined;
    }
    else if (typeof easing === "function" && supportsLinearEasing()) {
        return generateLinearEasing(easing, duration);
    }
    else if (isBezierDefinition(easing)) {
        return cubicBezierAsString(easing);
    }
    else if (Array.isArray(easing)) {
        return easing.map((segmentEasing) => mapEasingToNativeEasing(segmentEasing, duration) ||
            supportedWaapiEasing.easeOut);
    }
    else {
        return supportedWaapiEasing[easing];
    }
}

function startWaapiAnimation(element, valueName, keyframes, { delay = 0, duration = 300, repeat = 0, repeatType = "loop", ease, times, } = {}) {
    const keyframeOptions = { [valueName]: keyframes };
    if (times)
        keyframeOptions.offset = times;
    const easing = mapEasingToNativeEasing(ease, duration);
    /**
     * If this is an easing array, apply to keyframes, not animation as a whole
     */
    if (Array.isArray(easing))
        keyframeOptions.easing = easing;
    return element.animate(keyframeOptions, {
        delay,
        duration,
        easing: !Array.isArray(easing) ? easing : "linear",
        fill: "both",
        iterations: repeat + 1,
        direction: repeatType === "reverse" ? "alternate" : "normal",
    });
}

/**
 * Implement a practical max duration for keyframe generation
 * to prevent infinite loops
 */
const maxGeneratorDuration = 20000;
function calcGeneratorDuration(generator) {
    let duration = 0;
    const timeStep = 50;
    let state = generator.next(duration);
    while (!state.done && duration < maxGeneratorDuration) {
        duration += timeStep;
        state = generator.next(duration);
    }
    return duration >= maxGeneratorDuration ? Infinity : duration;
}

/**
 * Create a progress => progress easing function from a generator.
 */
function createGeneratorEasing(options, scale = 100, createGenerator) {
    const generator = createGenerator({ ...options, keyframes: [0, scale] });
    const duration = Math.min(calcGeneratorDuration(generator), maxGeneratorDuration);
    return {
        type: "keyframes",
        ease: (progress) => generator.next(duration * progress).value / scale,
        duration: millisecondsToSeconds(duration),
    };
}

const createUnitType = (unit) => ({
    test: (v) => typeof v === "string" && v.endsWith(unit) && v.split(" ").length === 1,
    parse: parseFloat,
    transform: (v) => `${v}${unit}`,
});
const px = /*@__PURE__*/ createUnitType("px");

const browserNumberValueTypes = {
    // Border props
    borderWidth: px,
    borderTopWidth: px,
    borderRightWidth: px,
    borderBottomWidth: px,
    borderLeftWidth: px,
    borderRadius: px,
    radius: px,
    borderTopLeftRadius: px,
    borderTopRightRadius: px,
    borderBottomRightRadius: px,
    borderBottomLeftRadius: px,
    // Positioning props
    width: px,
    maxWidth: px,
    height: px,
    maxHeight: px,
    top: px,
    right: px,
    bottom: px,
    left: px,
    // Spacing props
    padding: px,
    paddingTop: px,
    paddingRight: px,
    paddingBottom: px,
    paddingLeft: px,
    margin: px,
    marginTop: px,
    marginRight: px,
    marginBottom: px,
    marginLeft: px,
    // Misc
    backgroundPositionX: px,
    backgroundPositionY: px,
};

function isGenerator(type) {
    return typeof type === "function";
}

function attachTimeline(animation, timeline) {
    animation.timeline = timeline;
    animation.onfinish = null;
}

const isNotNull = (value) => value !== null;
function getFinalKeyframe(keyframes, { repeat, repeatType = "loop" }, finalKeyframe) {
    const resolvedKeyframes = keyframes.filter(isNotNull);
    const index = repeat && repeatType !== "loop" && repeat % 2 === 1
        ? 0
        : resolvedKeyframes.length - 1;
    return !index || finalKeyframe === undefined
        ? resolvedKeyframes[index]
        : finalKeyframe;
}

function setCSSVar(element, name, value) {
    element.style.setProperty(`--${name}`, value);
}
function setStyle(element, name, value) {
    element.style[name] = value;
}

const supportsPartialKeyframes = /*@__PURE__*/ memo(() => {
    try {
        document.createElement("div").animate({ opacity: [1] });
    }
    catch (e) {
        return false;
    }
    return true;
});

const supportsWaapi = /*@__PURE__*/ memo(() => Object.hasOwnProperty.call(Element.prototype, "animate"));

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

function animateElements(elementOrSelector, keyframes, options, scope) {
    const elements = resolveElements(elementOrSelector, scope);
    const numElements = elements.length;
    invariant(Boolean(numElements), "No valid element provided.");
    const animations = [];
    for (let i = 0; i < numElements; i++) {
        const element = elements[i];
        const elementTransition = { ...options };
        /**
         * Resolve stagger function if provided.
         */
        if (typeof elementTransition.delay === "function") {
            elementTransition.delay = elementTransition.delay(i, numElements);
        }
        for (const valueName in keyframes) {
            const valueKeyframes = keyframes[valueName];
            const valueOptions = {
                ...getValueTransition(options, valueName),
            };
            valueOptions.duration = valueOptions.duration
                ? secondsToMilliseconds(valueOptions.duration)
                : valueOptions.duration;
            valueOptions.delay = secondsToMilliseconds(valueOptions.delay || 0);
            animations.push(new NativeAnimation(element, valueName, valueKeyframes, valueOptions));
        }
    }
    return animations;
}

const createScopedWaapiAnimate = (scope) => {
    function scopedAnimate(elementOrSelector, keyframes, options) {
        return new GroupPlaybackControls(animateElements(elementOrSelector, keyframes, options, scope));
    }
    return scopedAnimate;
};
const animateMini = /*@__PURE__*/ createScopedWaapiAnimate();

exports.animate = animateMini;
