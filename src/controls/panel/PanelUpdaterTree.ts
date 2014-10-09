module minerva.controls.panel {
    export class PanelUpdaterTree extends core.UpdaterTree {
        children: core.Updater[] = null;
        zSorted: core.Updater[] = null;

        constructor() {
            super();
            this.isContainer = true;
            this.isLayoutContainer = true;
        }

        walk(direction?: WalkDirection): IWalker<core.Updater> {
            if (direction === WalkDirection.ZForward || direction === WalkDirection.ZReverse) {
                this.zSort();
                return walkArray(this.zSorted, direction === WalkDirection.ZReverse);
            }
            return walkArray(this.children, direction === WalkDirection.Reverse);
        }

        zSort() {
            var zs = this.zSorted;
            if (zs) //NOTE: zSorted = null when invalidated
                return;
            zs = this.zSorted = [];
            for (var walker = this.walk(); walker.step();) {
                zs.push(walker.current);
            }
            zs.sort(zIndexComparer);
        }

        onChildAttached(child: core.Updater) {
            this.zSorted = null;
        }

        onChildDetached(child: core.Updater) {
            this.zSorted = null;
        }
    }

    function walkArray<T extends core.Updater>(arr: T[], reverse: boolean): IWalker<core.Updater> {
        var len = arr.length;
        var e = <IWalker<T>>{ step: undefined, current: undefined };
        var index;
        if (reverse) {
            index = len;
            e.step = function () {
                index--;
                if (index < 0) {
                    e.current = undefined;
                    return false;
                }
                e.current = arr[index];
                return true;
            };
        } else {
            index = -1;
            e.step = function () {
                index++;
                if (index >= len) {
                    e.current = undefined;
                    return false;
                }
                e.current = arr[index];
                return true;
            };
        }
        return e;
    }

    function zIndexComparer(upd1: core.Updater, upd2: core.Updater): number {
        var zi1 = upd1.getAttachedValue("Panel.ZIndex");
        var zi2 = upd2.getAttachedValue("Panel.ZIndex");
        return zi1 === zi2 ? 0 : ((zi1 < zi2) ? -1 : 1);
    }
}