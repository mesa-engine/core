import { expect } from "chai";
import "mocha";

import { EntityFactory } from "./entity-factory";
import { Component } from "./Component";
import { Blueprint } from "./blueprint";

describe("Entity factory works", function () {
    it("Can make entity", function () {
        class TestComponent1 implements Component {};

        class TestBlueprint implements Blueprint {
            components: [
                {component: TestComponent1}
            ];
        }

        const factory = new EntityFactory();
        let entity = factory.buildEntity(TestBlueprint);
        expect(entity.hasComponent(TestComponent1)).to.be.true;
    });

    it("Built entity inherits components from other blueprints", function () {
        class TestComponent1 implements Component {}
        class TestComponent2 implements Component {}
        class TestComponent3 implements Component {}
        class TestComponent4 implements Component {}

        class Base implements Blueprint {
            components: [{component: TestComponent1}];
        }

        class Inherits implements Blueprint {
            components: [{component: TestComponent2}, {component: TestComponent3}];
            blueprints: [Base]
        }

        class InheritsTwice implements Blueprint {
            components: [{component: TestComponent4}];
            blueprints: [Inherits]
        }

        const factory = new EntityFactory();
        let entity = factory.buildEntity(InheritsTwice);
        expect(entity.hasComponent(TestComponent1)).to.be.true;
        expect(entity.hasComponent(TestComponent2)).to.be.true;
        expect(entity.hasComponent(TestComponent3)).to.be.true;
        expect(entity.hasComponent(TestComponent4)).to.be.true;
    });

    it("Child blueprint overrides inherited component values", function () {
        class TestComponent1 implements Component { value = 'default'; value2 = 'untouched' }
        class TestComponent2 implements Component { value = 'default'; }
        class TestComponent3 implements Component { value = 'default'; }

        class Base implements Blueprint {
            components: [
                {component: TestComponent1, values: {value: 'baseChanged'}},
                {component: TestComponent2, values: {value: 'baseChanged'}},
                {component: TestComponent3}
            ];
        }

        class Inherits implements Blueprint {
            components: [{ component: TestComponent2, values: { value: 'inheritsChanged' } }];
            blueprints: [Base]
        }

        const factory = new EntityFactory();
        let entity = factory.buildEntity(Inherits);
        expect(entity.getComponent(TestComponent1).value).to.equal('baseChanged');
        expect(entity.getComponent(TestComponent1).value2).to.equal('untouched');
        expect(entity.getComponent(TestComponent2).value).to.equal('inheritsChanged');
        expect(entity.getComponent(TestComponent3).value).to.equal('default');
    });

    it("Blueprint must implement at least one component", function () {
        const factory = new EntityFactory();
        expect(() => factory['getComponentsFromTemplates']([])).to.throw();
    });

    it("Blueprint templates must all implement one or more components", function () {
        class TestComponent1 implements Component {};

        class Same implements Blueprint {
            components: [{ component: TestComponent1 }];
        }

        class Different implements Blueprint {
            components: [];
        }
        
        expect(() => new EntityFactory()).to.throw('All blueprints must implement one or more components.');    
    });
});
