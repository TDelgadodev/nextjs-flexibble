import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
    avatarUrl: string;
    description?: string;
    githubUrl?: string;
    linkedinUrl?: string;
    projects?: Array<mongoose.Types.ObjectId>; 
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true, minlength: 2, maxlength: 100 },
    email: { type: String, required: true, unique: true },
    avatarUrl: { type: String, required: true },
    description: { type: String },
    githubUrl: { type: String },
    linkedinUrl: { type: String },
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
