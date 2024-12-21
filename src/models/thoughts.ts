import { Schema, model, type Document } from 'mongoose';

interface IThoughts extends Document {
    name: string,
    inPerson: boolean,
    start: Date,
    end: Date,
    students: Schema.Types.ObjectId[]
}

const thoughtsSchema = new Schema<IThoughts>(
    {
        name: {
            type: String,
            required: true,
        },
        inPerson: {
            type: Boolean,
            default: true,
        },
        start: {
            type: Date,
            default: Date.now(),
        },
        end: {
            type: Date,
            // Sets a default value of 12 weeks from now
            default: () => new Date(+new Date() + 84 * 24 * 60 * 60 * 1000),
        },
        students: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        timestamps: true
    },
);

const Thoughts = model<IThoughts>('Thoughts', thoughtsSchema);

export default Thoughts;