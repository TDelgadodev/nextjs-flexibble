import mongoose, { Schema, Document } from 'mongoose';

interface IProject extends Document {
    title: string;
    description: string;
    image: string;
    liveSiteUrl: string;
    githubUrl: string;
    category: string;
    createdBy: mongoose.Types.ObjectId; 
}

const ProjectSchema: Schema = new Schema({
    title: { type: String, required: true, minlength: 3 },
    description: { type: String, required: true },
    image: { type: String, required: true },
    liveSiteUrl: { type: String, required: true },
    githubUrl: { type: String, required: true },
    category: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Project = mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
