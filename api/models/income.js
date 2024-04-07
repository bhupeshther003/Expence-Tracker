import mongoose, { Schema } from 'mongoose';

const incomeSchema = mongoose.Schema(
    {
        month: {
            type: String,
            required: true
        },
        source: {
            type: String,
            required: true
        },
        amount: {
            type: String,
            required: true,
            unique: true
        },
        investments: {
            type: String,
            required: true,
            unique: true
        },
    },
    {
        timestamps: true
    }
)

export default mongoose.model("income", incomeSchema);