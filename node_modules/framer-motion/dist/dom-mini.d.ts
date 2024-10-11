type EasingFunction = (v: number) => number;
type BezierDefinition = readonly [number, number, number, number];
type EasingDefinition = BezierDefinition | "linear" | "easeIn" | "easeOut" | "easeInOut" | "circIn" | "circOut" | "circInOut" | "backIn" | "backOut" | "backInOut" | "anticipate";
/**
 * The easing function to use. Set as one of:
 *
 * - The name of an in-built easing function.
 * - An array of four numbers to define a cubic bezier curve.
 * - An easing function, that accepts and returns a progress value between `0` and `1`.
 *
 * @public
 */
type Easing = EasingDefinition | EasingFunction;

/**
 * @public
 */
interface SVGPathProperties {
    pathLength?: number;
    pathOffset?: number;
    pathSpacing?: number;
}

/**
 * An update function. It accepts a timestamp used to advance the animation.
 */
type Update = (timestamp: number) => void;
/**
 * Drivers accept a update function and call it at an interval. This interval
 * could be a synchronous loop, a setInterval, or tied to the device's framerate.
 */
interface DriverControls {
    start: () => void;
    stop: () => void;
    now: () => number;
}
type Driver = (update: Update) => DriverControls;

interface SVGAttributes {
    accentHeight?: number | string | undefined;
    accumulate?: "none" | "sum" | undefined;
    additive?: "replace" | "sum" | undefined;
    alignmentBaseline?: "auto" | "baseline" | "before-edge" | "text-before-edge" | "middle" | "central" | "after-edge" | "text-after-edge" | "ideographic" | "alphabetic" | "hanging" | "mathematical" | "inherit" | undefined;
    allowReorder?: "no" | "yes" | undefined;
    alphabetic?: number | string | undefined;
    amplitude?: number | string | undefined;
    arabicForm?: "initial" | "medial" | "terminal" | "isolated" | undefined;
    ascent?: number | string | undefined;
    attributeName?: string | undefined;
    attributeType?: string | undefined;
    autoReverse?: boolean | undefined;
    azimuth?: number | string | undefined;
    baseFrequency?: number | string | undefined;
    baselineShift?: number | string | undefined;
    baseProfile?: number | string | undefined;
    bbox?: number | string | undefined;
    begin?: number | string | undefined;
    bias?: number | string | undefined;
    by?: number | string | undefined;
    calcMode?: number | string | undefined;
    capHeight?: number | string | undefined;
    clip?: number | string | undefined;
    clipPath?: string | undefined;
    clipPathUnits?: number | string | undefined;
    clipRule?: number | string | undefined;
    colorInterpolation?: number | string | undefined;
    colorInterpolationFilters?: "auto" | "sRGB" | "linearRGB" | "inherit" | undefined;
    colorProfile?: number | string | undefined;
    colorRendering?: number | string | undefined;
    contentScriptType?: number | string | undefined;
    contentStyleType?: number | string | undefined;
    cursor?: number | string | undefined;
    cx?: number | string | undefined;
    cy?: number | string | undefined;
    d?: string | undefined;
    decelerate?: number | string | undefined;
    descent?: number | string | undefined;
    diffuseConstant?: number | string | undefined;
    direction?: number | string | undefined;
    display?: number | string | undefined;
    divisor?: number | string | undefined;
    dominantBaseline?: number | string | undefined;
    dur?: number | string | undefined;
    dx?: number | string | undefined;
    dy?: number | string | undefined;
    edgeMode?: number | string | undefined;
    elevation?: number | string | undefined;
    enableBackground?: number | string | undefined;
    end?: number | string | undefined;
    exponent?: number | string | undefined;
    externalResourcesRequired?: boolean | undefined;
    fill?: string | undefined;
    fillOpacity?: number | string | undefined;
    fillRule?: "nonzero" | "evenodd" | "inherit" | undefined;
    filter?: string | undefined;
    filterRes?: number | string | undefined;
    filterUnits?: number | string | undefined;
    floodColor?: number | string | undefined;
    floodOpacity?: number | string | undefined;
    focusable?: boolean | "auto" | undefined;
    fontFamily?: string | undefined;
    fontSize?: number | string | undefined;
    fontSizeAdjust?: number | string | undefined;
    fontStretch?: number | string | undefined;
    fontStyle?: number | string | undefined;
    fontVariant?: number | string | undefined;
    fontWeight?: number | string | undefined;
    format?: number | string | undefined;
    fr?: number | string | undefined;
    from?: number | string | undefined;
    fx?: number | string | undefined;
    fy?: number | string | undefined;
    g1?: number | string | undefined;
    g2?: number | string | undefined;
    glyphName?: number | string | undefined;
    glyphOrientationHorizontal?: number | string | undefined;
    glyphOrientationVertical?: number | string | undefined;
    glyphRef?: number | string | undefined;
    gradientTransform?: string | undefined;
    gradientUnits?: string | undefined;
    hanging?: number | string | undefined;
    horizAdvX?: number | string | undefined;
    horizOriginX?: number | string | undefined;
    href?: string | undefined;
    ideographic?: number | string | undefined;
    imageRendering?: number | string | undefined;
    in2?: number | string | undefined;
    in?: string | undefined;
    intercept?: number | string | undefined;
    k1?: number | string | undefined;
    k2?: number | string | undefined;
    k3?: number | string | undefined;
    k4?: number | string | undefined;
    k?: number | string | undefined;
    kernelMatrix?: number | string | undefined;
    kernelUnitLength?: number | string | undefined;
    kerning?: number | string | undefined;
    keyPoints?: number | string | undefined;
    keySplines?: number | string | undefined;
    keyTimes?: number | string | undefined;
    lengthAdjust?: number | string | undefined;
    letterSpacing?: number | string | undefined;
    lightingColor?: number | string | undefined;
    limitingConeAngle?: number | string | undefined;
    local?: number | string | undefined;
    markerEnd?: string | undefined;
    markerHeight?: number | string | undefined;
    markerMid?: string | undefined;
    markerStart?: string | undefined;
    markerUnits?: number | string | undefined;
    markerWidth?: number | string | undefined;
    mask?: string | undefined;
    maskContentUnits?: number | string | undefined;
    maskUnits?: number | string | undefined;
    mathematical?: number | string | undefined;
    mode?: number | string | undefined;
    numOctaves?: number | string | undefined;
    offset?: number | string | undefined;
    opacity?: number | string | undefined;
    operator?: number | string | undefined;
    order?: number | string | undefined;
    orient?: number | string | undefined;
    orientation?: number | string | undefined;
    origin?: number | string | undefined;
    overflow?: number | string | undefined;
    overlinePosition?: number | string | undefined;
    overlineThickness?: number | string | undefined;
    paintOrder?: number | string | undefined;
    panose1?: number | string | undefined;
    path?: string | undefined;
    pathLength?: number | string | undefined;
    patternContentUnits?: string | undefined;
    patternTransform?: number | string | undefined;
    patternUnits?: string | undefined;
    pointerEvents?: number | string | undefined;
    points?: string | undefined;
    pointsAtX?: number | string | undefined;
    pointsAtY?: number | string | undefined;
    pointsAtZ?: number | string | undefined;
    preserveAlpha?: boolean | undefined;
    preserveAspectRatio?: string | undefined;
    primitiveUnits?: number | string | undefined;
    r?: number | string | undefined;
    radius?: number | string | undefined;
    refX?: number | string | undefined;
    refY?: number | string | undefined;
    renderingIntent?: number | string | undefined;
    repeatCount?: number | string | undefined;
    repeatDur?: number | string | undefined;
    requiredExtensions?: number | string | undefined;
    requiredFeatures?: number | string | undefined;
    restart?: number | string | undefined;
    result?: string | undefined;
    rotate?: number | string | undefined;
    rx?: number | string | undefined;
    ry?: number | string | undefined;
    scale?: number | string | undefined;
    seed?: number | string | undefined;
    shapeRendering?: number | string | undefined;
    slope?: number | string | undefined;
    spacing?: number | string | undefined;
    specularConstant?: number | string | undefined;
    specularExponent?: number | string | undefined;
    speed?: number | string | undefined;
    spreadMethod?: string | undefined;
    startOffset?: number | string | undefined;
    stdDeviation?: number | string | undefined;
    stemh?: number | string | undefined;
    stemv?: number | string | undefined;
    stitchTiles?: number | string | undefined;
    stopColor?: string | undefined;
    stopOpacity?: number | string | undefined;
    strikethroughPosition?: number | string | undefined;
    strikethroughThickness?: number | string | undefined;
    string?: number | string | undefined;
    stroke?: string | undefined;
    strokeDasharray?: string | number | undefined;
    strokeDashoffset?: string | number | undefined;
    strokeLinecap?: "butt" | "round" | "square" | "inherit" | undefined;
    strokeLinejoin?: "miter" | "round" | "bevel" | "inherit" | undefined;
    strokeMiterlimit?: number | string | undefined;
    strokeOpacity?: number | string | undefined;
    strokeWidth?: number | string | undefined;
    surfaceScale?: number | string | undefined;
    systemLanguage?: number | string | undefined;
    tableValues?: number | string | undefined;
    targetX?: number | string | undefined;
    targetY?: number | string | undefined;
    textAnchor?: string | undefined;
    textDecoration?: number | string | undefined;
    textLength?: number | string | undefined;
    textRendering?: number | string | undefined;
    to?: number | string | undefined;
    transform?: string | undefined;
    u1?: number | string | undefined;
    u2?: number | string | undefined;
    underlinePosition?: number | string | undefined;
    underlineThickness?: number | string | undefined;
    unicode?: number | string | undefined;
    unicodeBidi?: number | string | undefined;
    unicodeRange?: number | string | undefined;
    unitsPerEm?: number | string | undefined;
    vAlphabetic?: number | string | undefined;
    values?: string | undefined;
    vectorEffect?: number | string | undefined;
    version?: string | undefined;
    vertAdvY?: number | string | undefined;
    vertOriginX?: number | string | undefined;
    vertOriginY?: number | string | undefined;
    vHanging?: number | string | undefined;
    vIdeographic?: number | string | undefined;
    viewBox?: string | undefined;
    viewTarget?: number | string | undefined;
    visibility?: number | string | undefined;
    vMathematical?: number | string | undefined;
    widths?: number | string | undefined;
    wordSpacing?: number | string | undefined;
    writingMode?: number | string | undefined;
    x1?: number | string | undefined;
    x2?: number | string | undefined;
    x?: number | string | undefined;
    xChannelSelector?: string | undefined;
    xHeight?: number | string | undefined;
    xlinkActuate?: string | undefined;
    xlinkArcrole?: string | undefined;
    xlinkHref?: string | undefined;
    xlinkRole?: string | undefined;
    xlinkShow?: string | undefined;
    xlinkTitle?: string | undefined;
    xlinkType?: string | undefined;
    xmlBase?: string | undefined;
    xmlLang?: string | undefined;
    xmlns?: string | undefined;
    xmlnsXlink?: string | undefined;
    xmlSpace?: string | undefined;
    y1?: number | string | undefined;
    y2?: number | string | undefined;
    y?: number | string | undefined;
    yChannelSelector?: string | undefined;
    z?: number | string | undefined;
    zoomAndPan?: string | undefined;
}

interface ProgressTimeline {
    currentTime: null | {
        value: number;
    };
    cancel?: VoidFunction;
}

interface AnimationState<V> {
    value: V;
    done: boolean;
}
interface KeyframeGenerator<V> {
    calculatedDuration: null | number;
    next: (t: number) => AnimationState<V>;
}

interface AnimationPlaybackLifecycles<V> {
    onUpdate?: (latest: V) => void;
    onPlay?: () => void;
    onComplete?: () => void;
    onRepeat?: () => void;
    onStop?: () => void;
}
type GeneratorFactory = (options: ValueAnimationOptions<any>) => KeyframeGenerator<any>;
type AnimationGeneratorType = GeneratorFactory | "decay" | "spring" | "keyframes" | "tween" | "inertia";
interface Transition extends AnimationPlaybackOptions, Omit<SpringOptions, "keyframes">, Omit<InertiaOptions, "keyframes">, KeyframeOptions {
    delay?: number;
    elapsed?: number;
    driver?: Driver;
    type?: AnimationGeneratorType;
    duration?: number;
    autoplay?: boolean;
    startTime?: number;
}
interface ValueAnimationTransition<V = any> extends Transition, AnimationPlaybackLifecycles<V> {
}
interface ValueAnimationOptions<V extends string | number = number> extends ValueAnimationTransition {
    keyframes: V[];
    name?: string;
    from?: V;
    isGenerator?: boolean;
}
type StyleTransitions = {
    [K in keyof CSSStyleDeclarationWithTransform]?: Transition;
};
type SVGPathTransitions = {
    [K in keyof SVGPathProperties]: Transition;
};
type SVGTransitions = {
    [K in keyof SVGAttributes]: Transition;
};
type VariableTransitions = {
    [key: `--${string}`]: Transition;
};
type AnimationOptionsWithValueOverrides<V = any> = StyleTransitions & SVGPathTransitions & SVGTransitions & VariableTransitions & ValueAnimationTransition<V>;
interface DynamicAnimationOptions extends Omit<AnimationOptionsWithValueOverrides, "delay"> {
    delay?: number | DynamicOption<number>;
}
type ElementOrSelector = Element | Element[] | NodeListOf<Element> | string;
/**
 * @public
 */
interface AnimationPlaybackControls {
    time: number;
    speed: number;
    startTime: number | null;
    state?: AnimationPlayState;
    duration: number;
    stop: () => void;
    play: () => void;
    pause: () => void;
    complete: () => void;
    cancel: () => void;
    then: (onResolve: VoidFunction, onReject?: VoidFunction) => Promise<void>;
    attachTimeline?: (timeline: ProgressTimeline, fallback?: (animation: AnimationPlaybackControls) => VoidFunction) => VoidFunction;
}
type DynamicOption<T> = (i: number, total: number) => T;
interface CSSStyleDeclarationWithTransform extends Omit<CSSStyleDeclaration, "direction" | "transition" | "x" | "y" | "z"> {
    x: number | string;
    y: number | string;
    z: number | string;
    rotateX: number | string;
    rotateY: number | string;
    rotateZ: number | string;
    scaleX: number;
    scaleY: number;
    scaleZ: number;
    skewX: number | string;
    skewY: number | string;
}
type ValueKeyframe = string | number;
type UnresolvedValueKeyframe = ValueKeyframe | null;
type ValueKeyframesDefinition = ValueKeyframe | ValueKeyframe[] | UnresolvedValueKeyframe[];
type StyleKeyframesDefinition = {
    [K in keyof CSSStyleDeclarationWithTransform]?: ValueKeyframesDefinition;
};
type SVGKeyframesDefinition = {
    [K in keyof SVGAttributes]?: ValueKeyframesDefinition;
};
type VariableKeyframesDefinition = {
    [key: `--${string}`]: ValueKeyframesDefinition;
};
type SVGPathKeyframesDefinition = {
    [K in keyof SVGPathProperties]?: ValueKeyframesDefinition;
};
type DOMKeyframesDefinition = StyleKeyframesDefinition & SVGKeyframesDefinition & SVGPathKeyframesDefinition & VariableKeyframesDefinition;
interface VelocityOptions {
    velocity?: number;
    restSpeed?: number;
    restDelta?: number;
}
type RepeatType = "loop" | "reverse" | "mirror";
interface AnimationPlaybackOptions {
    repeat?: number;
    repeatType?: RepeatType;
    repeatDelay?: number;
}
interface DurationSpringOptions {
    duration?: number;
    bounce?: number;
}
interface SpringOptions extends DurationSpringOptions, VelocityOptions {
    stiffness?: number;
    damping?: number;
    mass?: number;
}
interface DecayOptions extends VelocityOptions {
    keyframes?: number[];
    power?: number;
    timeConstant?: number;
    modifyTarget?: (v: number) => number;
}
interface InertiaOptions extends DecayOptions {
    bounceStiffness?: number;
    bounceDamping?: number;
    min?: number;
    max?: number;
}
interface KeyframeOptions {
    ease?: Easing | Easing[];
    times?: number[];
}

declare class GroupPlaybackControls implements AnimationPlaybackControls {
    animations: AnimationPlaybackControls[];
    constructor(animations: Array<AnimationPlaybackControls | undefined>);
    then(onResolve: VoidFunction, onReject?: VoidFunction): Promise<void>;
    /**
     * TODO: Filter out cancelled or stopped animations before returning
     */
    private getAll;
    private setAll;
    attachTimeline(timeline: any, fallback: (animation: AnimationPlaybackControls) => VoidFunction): () => void;
    get time(): number;
    set time(time: number);
    get speed(): number;
    set speed(speed: number);
    get startTime(): any;
    get duration(): number;
    private runAll;
    play(): void;
    pause(): void;
    stop: () => void;
    cancel(): void;
    complete(): void;
}

declare const animateMini: (elementOrSelector: ElementOrSelector, keyframes: DOMKeyframesDefinition, options?: DynamicAnimationOptions) => GroupPlaybackControls;

export { animateMini as animate };
