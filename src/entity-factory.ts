import { BlueprintComponent, Blueprint, BlueprintClass } from "./blueprint";
import { Entity } from "./entity";

export class EntityFactory {
    // TODO - Consider a caching strategy if we've already built an entity;

    /**
     * Creates a component of the specified class and adds it to the entity.
     * @param name The name of blueprint to build the entity from.
     * @returns The newly created entity built from given blueprint.
     */
    public buildEntity<T extends Blueprint>(blueprint: BlueprintClass<T>): Entity { 
        return this.getEntityFromBlueprint(blueprint, new Entity());
    }

    private getEntityFromBlueprint<T extends Blueprint>(blueprintClass: BlueprintClass<T>, entity: Entity): Entity {
        const newBlueprint = new blueprintClass();

        // Recursively add components from inherited blueprints
        if(newBlueprint.blueprints) {
            newBlueprint.blueprints.forEach(inheritedBlueprint => {
                entity = this.getEntityFromBlueprint(inheritedBlueprint, entity);
            });
        }

        newBlueprint.components.forEach(x => {
            entity.putComponent(<any>x.component);

            // Overwrite values of component based off of blueprint;
            if (x.values) {
                let component = entity.getComponent(<any>x.component);
                Object.getOwnPropertyNames(x.values).forEach(value => component[value] = x.values[value]);
            }
        });

        return entity;
    }

    // private getBlueprintFromName(name: string): BlueprintClass {
    //     let blueprint = this.blueprints.find(x => x.name === name);
    //     if (!blueprint) {
    //         throw new Error("Cannot find blueprint by that name.");
    //     }
    //     return blueprint;
    // }

    // private buildBlueprintsFromTemplates(blueprintTemplates: Blueprint[]): BlueprintClass[] {
    //     return blueprintTemplates.map(x =>
    //         new BlueprintClass({
    //             name: x.name,
    //             blueprintComponents: this.getComponentsFromTemplates(x.components),
    //             blueprintNames: this.hasBlueprints(x) ? x.blueprints : []
    //         })
    //     );
    // }

    private hasBlueprints(blueprintTemplate: Blueprint) {
        return blueprintTemplate.blueprints && blueprintTemplate.blueprints.length > 0;
    }

    /**
     * Converts template components to blueprint components.
     * @throws if the list is empty.
     * @param components template array for the blueprints components.
    */
    // private getComponentsFromTemplates(components): BlueprintComponent[] {
    //     if (!components || components.length === 0) {
    //         throw new Error("Blueprint must implement one or more components.");
    //     } else {
    //         return components.map(x => new BlueprintComponent({
    //             component: this.components[x.name], 
    //             values: x.values
    //         }));
    //     }
    // }

    // private validateBlueprints(blueprints: Blueprint[]): boolean {
    //     if(!blueprints || !Array.isArray(blueprints)) {
    //         throw new Error('Must input array of blueprint templates.');
    //     }
    //     if(blueprints.some(b => !b.name || b.name.length < 1)) {
    //         throw new Error('All blueprints must have a name.');
    //     }
    //     if(new Set(blueprints.map(b => b.name.toLowerCase())).size !== blueprints.length) {
    //         throw new Error('All blueprints must have a unique name.');
    //     }
    //     if(blueprints.some(b => !b.components || b.components.length === 0)) {
    //         throw new Error('All blueprints must implement one or more components.');
    //     }
    //     // TODO - All blueprint name references must exist.
    //     // TODO - All component name references must exist.
    //     // TODO - All component values must exist.
    //     // TODO - Log problem blueprint for each of these issues to aid in debugging. 
    //     return true;
    // }
}