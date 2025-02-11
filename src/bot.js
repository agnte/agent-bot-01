// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, MessageFactory } = require('@microsoft/agents-bot-hosting');
const {name, version} = require('@microsoft/agents-bot-hosting/package.json');

class EchoBot extends ActivityHandler {
    constructor() {
        super();

        this.onMembersAdded(async (context, next) => {
            await context.sendActivity(MessageFactory.text(`EchoBot running on ${name} version ${version}`));
            await next();
        });

        this.onMessage(async (context, next) => {
            const text = context.activity.text;

            await context.sendActivities([
                MessageFactory.text(`You said: ${ text }`, text),
                MessageFactory.text(`echo: ${ text }`, text),
            ])
            await next();
        });
    }
}

module.exports.EchoBot = EchoBot;