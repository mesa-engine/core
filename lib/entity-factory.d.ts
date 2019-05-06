import { Blueprint, BlueprintClass } from "./blueprint";
import { Entity } from "./entity";
export declare class EntityFactory {
    buildEntity<T extends Blueprint>(blueprint: BlueprintClass<T>): Entity;
    private getEntityFromBlueprint;
    private hasBlueprints;
}
