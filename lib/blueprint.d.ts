import { Component } from "./component";
export interface Blueprint {
    components: BlueprintComponent[];
    blueprints?: Blueprint[];
}
export interface BlueprintComponent {
    component: Component;
    value?: any;
}
export interface BlueprintClass<T extends Blueprint> {
    new (): T;
}
