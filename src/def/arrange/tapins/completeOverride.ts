module minerva.def.arrange.tapins {
    export var completeOverride: IArrangeTapin = function (input: IInput, state: IState, output: IOutput, finalRect: Rect): boolean {
        input.dirtyFlags &= ~layout.DirtyFlags.Arrange;

        var as = output.arrangedSize;
        if (input.horizontalAlignment === HorizontalAlignment.Stretch)
            as.width = Math.max(as.width, state.framework.width);

        if (input.verticalAlignment === VerticalAlignment.Stretch)
            as.height = Math.max(as.height, state.framework.height);

        if (input.useLayoutRounding) {
            as.width = Math.round(as.width);
            as.height = Math.round(as.height);
        }

        var constrained = state.constrained;
        Size.copyTo(as, constrained);
        helpers.coerceSize(constrained, input);
        constrained.width = Math.min(constrained.width, as.width);
        constrained.height = Math.min(constrained.height, as.height);
        return true;
    };
}