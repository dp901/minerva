module minerva.def {
    export interface ITapin {
        (assets: IPipeInput, state: IPipeState, output: IPipeOutput, ...contexts: any[]): boolean;
    }

    export class PipeDef<T extends ITapin, TInput extends IPipeInput, TState extends IPipeState, TOutput extends IPipeOutput> implements IPipeDef<TInput, TState, TOutput> {
        private $$names: string[] = [];
        private $$tapins: T[] = [];

        addTapin (name: string, tapin: T): PipeDef<T, TInput, TState, TOutput> {
            this.$$names.push(name);
            this.$$tapins.push(tapin);
            return this;
        }

        addTapinBefore (name: string, tapin: T, before?: string): PipeDef<T, TInput, TState, TOutput> {
            var names = this.$$names;
            var tapins = this.$$tapins;
            var index = !before ? -1 : names.indexOf(before);
            if (index === -1) {
                names.unshift(name);
                tapins.unshift(tapin);
            } else {
                names.splice(index, 0, name);
                tapins.splice(index, 0, tapin);
            }
            return this;
        }

        addTapinAfter (name: string, tapin: T, after?: string): PipeDef<T, TInput, TState, TOutput> {
            var names = this.$$names;
            var tapins = this.$$tapins;
            var index = !after ? -1 : names.indexOf(after);
            if (index === -1 || index === names.length - 1) {
                names.push(name);
                tapins.push(tapin);
            } else {
                names.splice(index + 1, 0, name);
                tapins.splice(index + 1, 0, tapin);
            }
            return this;
        }

        replaceTapin (name: string, tapin: T): PipeDef<T, TInput, TState, TOutput> {
            var names = this.$$names;
            var tapins = this.$$tapins;
            var index = names.indexOf(name);
            if (index === -1)
                throw new Error("Could not replace pipe tap-in. No pipe tap-in named `" + name + "`.");
            tapins[index] = tapin;
            return this;
        }

        removeTapin (name: string): PipeDef<T, TInput, TState, TOutput> {
            var names = this.$$names;
            var index = names.indexOf(name);
            if (index === -1)
                throw new Error("Could not replace pipe tap-in. No pipe tap-in named `" + name + "`.");
            names.splice(index, 1);
            this.$$tapins.splice(index, 1);
            return this;
        }

        run (input: TInput, state: TState, output: TOutput, ...contexts: any[]): boolean {
            this.prepare(input, state, output);

            contexts.unshift(output);
            contexts.unshift(state);
            contexts.unshift(input);
            var flag = true;
            for (var i = 0, tapins = this.$$tapins, len = tapins.length; i < len; i++) {
                if (!tapins[i].apply(this, contexts)) {
                    flag = false;
                    break;
                }
            }

            this.flush(input, state, output);

            return flag;
        }

        createState (): TState {
            return null;
        }

        createOutput (): TOutput {
            return null;
        }

        prepare (input: TInput, state: TState, output: TOutput) {

        }

        flush (input: TInput, state: TState, output: TOutput) {

        }
    }
}