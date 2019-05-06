"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var entity_1 = require("./entity");
var EntityFactory = (function () {
    function EntityFactory() {
    }
    EntityFactory.prototype.buildEntity = function (blueprint) {
        return this.getEntityFromBlueprint(blueprint, new entity_1.Entity());
    };
    EntityFactory.prototype.getEntityFromBlueprint = function (blueprintClass, entity) {
        var newBlueprint = new blueprintClass();
        if (newBlueprint.blueprints) {
            newBlueprint.blueprints.forEach(function (inheritedBlueprint) {
            });
        }
        newBlueprint.components.forEach(function (x) {
            entity.putComponent(x.component);
            if (x.values) {
                var component_1 = entity.getComponent(x.component);
                Object.getOwnPropertyNames(x.values).forEach(function (value) { return component_1[value] = x.values[value]; });
            }
        });
        return entity;
    };
    EntityFactory.prototype.hasBlueprints = function (blueprintTemplate) {
        return blueprintTemplate.blueprints && blueprintTemplate.blueprints.length > 0;
    };
    return EntityFactory;
}());
exports.EntityFactory = EntityFactory;
//# sourceMappingURL=entity-factory.js.map