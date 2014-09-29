module minerva.layout.render.tapins {
    export var validate: IRenderTapin = function (input: IInput, state: IState, output: IOutput, ctx: RenderContext, region: Rect, tree: layout.IUpdaterTree): boolean {
        if (!input.totalIsRenderVisible)
            return false;
        if ((input.totalOpacity * 255) < 0.5)
            return false;
        return true;
    };
}