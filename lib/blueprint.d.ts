import { Component } from "./component";
export interface Blueprint {
    components: BlueprintComponent[];
    blueprints?: Blueprint[];
}
export interface BlueprintComponent {
    component: Component;
    values?: any;
}
export interface BlueprintClass<T extends Blueprint> {
    new (): T;
}
