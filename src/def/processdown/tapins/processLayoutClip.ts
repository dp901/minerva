module minerva.def.processdown.tapins {
    import DirtyFlags = layout.DirtyFlags;
    //NOTE: Canvas+UserControl doesn't do this
    export var processLayoutClip: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput, vpoutput: IOutput): boolean {
        if (output.dirtyFlags & DirtyFlags.LayoutClip === 0)
            return true;
        output.dirtyFlags &= ~DirtyFlags.LayoutClip;

        var composite = output.compositeLayoutClip;
        var vpc = vpinput ? vpinput.compositeLayoutClip : null;
        if (!Rect.isEmpty(input.layoutClip)) {
            Rect.copyTo(input.layoutClip, composite);
            if (vpc)
                Rect.intersection(composite, vpc);
        } else {
            if (vpc)
                Rect.copyTo(vpc, composite);
            else
                composite.x = composite.y = composite.width = composite.height = 0;
        }

        return true;
    };
}