import { expect } from "chai";
import * as sinon from 'sinon';
import "mocha";

import { Engine } from "./engine";
import { EntityFactory } from "./entity-factory";
import { Blueprint } from "./blueprint";

describe("Engine works", function () {
    it("BuildEntity gets called", function () {
        class Test implements Blueprint { components: []};
        var mockBuildEntity = sinon.fake();
        var mockEntityFactory = {buildEntity: mockBuildEntity};
        let engine = new Engine();
        engine['entityFactory'] = <EntityFactory>mockEntityFactory;
        engine.buildEntity(Test);
        sinon.assert.called(mockBuildEntity);
        sinon.assert.calledWith(mockBuildEntity, 'test')
    });
});