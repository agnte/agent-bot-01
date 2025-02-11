// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, MessageFactory, ActionTypes } = require('@microsoft/agents-bot-hosting');

class EchoBot extends ActivityHandler {
    constructor() {
        super();

        this.onMembersAdded(async (context, next) => {
            await context.sendActivity(MessageFactory.text('Hello and welcome!'));

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMessage(async (context, next) => {
            const text = context.activity.text;

            context.sendActivities([
                MessageFactory.text(`You said: ${ text }`, text),
                MessageFactory.text(`echo: ${ text }`, text),
            ])
            await next();
        });
    }
}

module.exports.EchoBot = EchoBot;