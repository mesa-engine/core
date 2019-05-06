import { Entity } from "./entity";
import { System } from "./system";
import { Blueprint, BlueprintClass } from "./blueprint";
interface EngineEntityListener {
    onEntityAdded(entity: Entity): void;
    onEntityRemoved(entity: Entity): void;
}
declare class Engine {
    private _entities;
    private readonly _entityListeners;
    private readonly _systems;
    private _systemsNeedSorting;
    private _entityFactory;
    buildEntity<T extends Blueprint>(blueprintClass: BlueprintClass<T>): Entity;
    readonly entities: readonly Entity[];
    notifyPriorityChange(system: System): void;
    addEntityListener(listener: EngineEntityListener): this;
    removeEntityListener(listener: EngineEntityListener): this;
    addEntity(entity: Entity): this;
    addEntities(...entities: Entity[]): this;
    removeEntity(entity: Entity): void;
    removeEntities(...entities: Entity[]): this;
    addSystem(system: System): this;
    addSystems(...systems: System[]): void;
    removeSystem(system: System): this;
    removeSystems(...systems: System[]): void;
    update(delta: number): void;
}
export { Engine, EngineEntityListener };
