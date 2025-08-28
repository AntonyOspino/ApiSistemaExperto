const {Engine} = require('json-rules-engine');

const rules = require('../../rules.json');

const engine = new Engine(rules);

class Rules {
    constructor(facts) {
        this.engine = engine
        this.facts = facts
    }

    async run() {
        const results = await this.engine.run(this.facts);
        return results;
    }
}

module.exports = {
    Rules
};
