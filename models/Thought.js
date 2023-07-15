const { Schema, model } = require('mongoose');
var mongoose = require('mongoose');

const ReactionsSchema = new Schema(
    {
    // Set custom ID 
    reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
    },
    {
    toJSON: {
        getters: true
    } 
    
});

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionsSchema]
        },
        {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
        
});

 

//virtuals for total number of reactions
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thoughts = model('Thoughts', ThoughtSchema);

module.exports = Thoughts;