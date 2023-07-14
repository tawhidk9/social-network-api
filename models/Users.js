const { Schema, model } = require('mongoose');

const Users = model('Users', UserSchema)

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }]
        },
        {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
        
    }
)

//friendCount virtual
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

module.exports = Users;