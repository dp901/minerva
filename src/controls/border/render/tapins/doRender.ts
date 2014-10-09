module minerva.controls.border.render.tapins {
    export function doRender (input: IInput, state: IState, output: IOutput, ctx: core.render.RenderContext, region: Rect, tree: core.IUpdaterTree): boolean {
        if (!state.shouldRender)
            return true;
        ctx.save();

        var borderBrush = input.borderBrush;
        var extents = input.extents;
        var fillExtents = state.fillExtents;
        var raw = ctx.raw;
        if (borderBrush && !Rect.isEmpty(extents)) {
            raw.beginPath();
            ctx.drawRectEx(extents, state.outerCornerRadius);
            ctx.drawRectEx(fillExtents, state.innerCornerRadius);
            ctx.fillEx(borderBrush, extents, FillRule.EvenOdd);
        }
        var background = input.background;
        if (background && !Rect.isEmpty(fillExtents)) {
            raw.beginPath();
            ctx.drawRectEx(fillExtents, state.innerCornerRadius);
            ctx.fillEx(background, fillExtents);
        }

        ctx.restore();
        return true;
    }
}