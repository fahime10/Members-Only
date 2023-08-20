#! /usr/bin/env node

const userArgs = process.argv.slice(2);

const User = require('./models/userModel');
const Message = require('./models/messageModel');

const users = [];
const messages = [];

const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log('Debug: About to connect');
    await mongoose.connect(mongoDB);
    console.log('Debug: Should be connected?');
    await createUsers();
    await createMessages();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

async function userCreate(index, firstName, lastName, username, password) {
    const user = new User({ firstName: firstName, lastName: lastName, username: username, password: password });
    await user.save();
    users[index] = user;
    console.log(`Added user: ${username}`);
}

async function messageCreate(index, username, title, text, timestamp) {
    const message = new Message({ username: username, title: title, text: text, timestamp: timestamp });
    await message.save();
    messages[index] = message;
    console.log(`Added user: ${title}`);
}

async function createUsers() {
    console.log('Adding users');
    await Promise.all([
        userCreate(0,
            'James',
            'Smith',
            'jsmith',
            'pass'),
    ]);
}

async function createMessages() {
    console.log('Adding messages');
    await Promise.all([
        messageCreate(0,
            users[0],
            'New user here',
            'Hello members',
            new Date()),
    ]);
}