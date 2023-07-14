const { Schema, model } = require('mongoose');
const moment = require('moment');

const ThoughtSchema = new Schema(
    {
        thoguhtText: {
            type: String,
            required: true,
            minlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Moment
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
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

const ReactionsSchema = new Schema(
    {
    // Set custom ID 
    reactionId: {
        type: Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId()
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
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
    },
    {
    toJSON: {
        getters: true
    } 
    
}); 

//virtuals for total number of reactions
ThoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;