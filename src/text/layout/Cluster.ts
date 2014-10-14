module minerva.text.layout {
    var isFirefox = /firefox/i.test(navigator.userAgent);

    export class Cluster {
        isSelected: boolean = false;
        text: string = null;
        width: number = 0;

        static render (cluster: Cluster, attrs: ITextAttributes, ctx: core.render.RenderContext) {
            var fontHeight = attrs.font.getHeight();
            var area = new Rect(0, 0, cluster.width, fontHeight);

            var raw = ctx.raw;

            //Background
            var bg = cluster.isSelected ? attrs.selectionBackground : attrs.background;
            if (bg) {
                raw.rect(area.x, area.y, area.width, area.height);
                ctx.fillEx(bg, area);
            }

            //Text
            var fg = cluster.isSelected ? attrs.selectionForeground : attrs.foreground;
            var fg5 = "#000000";
            if (fg) {
                fg.setupBrush(raw, area);
                fg5 = fg.toHtml5Object();
            }
            raw.fillStyle = fg5;
            raw.font = attrs.font.toHtml5Object();
            raw.textAlign = "left";
            if (isFirefox) {
                raw.textBaseline = "bottom";
                raw.fillText(cluster.text, 0, fontHeight);
            } else {
                raw.textBaseline = "top";
                raw.fillText(cluster.text, 0, 0);
            }

            //Underline
            if (attrs.isUnderlined) {
                raw.beginPath();
                raw.moveTo(0, fontHeight);
                raw.lineTo(cluster.width, fontHeight);
                raw.lineWidth = 2;
                raw.strokeStyle = fg5;
                raw.stroke();
            }
        }
    }
}