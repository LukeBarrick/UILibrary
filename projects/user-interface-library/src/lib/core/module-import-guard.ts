import { CoreModule } from "./core.module";

export function ThrowIfAlreadyLoaded(parentModule: CoreModule, moduleName: string) {
    if(parentModule) {
        throw new Error(`${moduleName} has already been loaded. Import Core modules in AppModule only once.`)
    }
}