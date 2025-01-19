import { Schema, model, Types, Document } from 'mongoose';
interface IReaction {
    reactionId: Schema.Types.ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
}
interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: IReaction[]; // Updated to match the nested schema
}
const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            /*get: (timestamp: Date | undefined) => (timestamp ? new Date(timestamp).toLocaleDateString() : ''),*/
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);
const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            /*get: (timestamp: Date | undefined) => (timestamp ? new Date(timestamp).toLocaleDateString() : ''),*/
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
const Thought = model<IThought>('Thought', thoughtSchema);
export { Thought };