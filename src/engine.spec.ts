import { expect } from "chai";
import "mocha";

import { Engine } from "./engine";
import { Blueprint } from "./blueprint";
import { Component } from "./component";

describe("Engine works", function () {
    it("Can make entity", function () {
        class TestComponent1 implements Component {};

        class TestBlueprint implements Blueprint {
            components = [
                {component: TestComponent1}
            ];
        }

        const engine = new Engine();
        let entity = engine.buildEntity(TestBlueprint);
        expect(entity.hasComponent(TestComponent1)).to.be.true;
    });

    it("Built entity inherits components from other blueprints", function () {
        class TestComponent1 implements Component {}
        class TestComponent2 implements Component {}
        class TestComponent3 implements Component {}
        class TestComponent4 implements Component {}

        class Base implements Blueprint {
            components = [{component: TestComponent1}];
        }

        class Inherits implements Blueprint {
            components = [{component: TestComponent2}, {component: TestComponent3}];
            blueprints = [new Base]
        }

        class InheritsTwice implements Blueprint {
            components = [{component: TestComponent4}];
            blueprints = [new Inherits]
        }

        const engine = new Engine();
        let entity = engine.buildEntity(InheritsTwice);
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
            components = [
                {component: TestComponent1, values: {value: 'baseChanged'}},
                {component: TestComponent2, values: {value: 'baseChanged'}},
                {component: TestComponent3}
            ];
        }

        class Inherits implements Blueprint {
            components = [{ component: TestComponent2, values: { value: 'inheritsChanged' } }];
            blueprints = [new Base];
        }

        const engine = new Engine();
        let entity = engine.buildEntity(Inherits);
        expect(entity.getComponent(TestComponent1).value).to.equal('baseChanged');
        expect(entity.getComponent(TestComponent1).value2).to.equal('untouched');
        expect(entity.getComponent(TestComponent2).value).to.equal('inheritsChanged');
        expect(entity.getComponent(TestComponent3).value).to.equal('default');
    });
});