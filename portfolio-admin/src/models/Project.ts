import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this project.'],
    maxlength: [60, 'Title cannot be more than 60 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for this project.'],
  },
  technologies: [{
    type: String,
    required: [true, 'Please provide at least one technology.'],
  }],
  imageUrl: {
    type: String,
    required: [true, 'Please provide an image URL for this project.'],
  },
  demoUrl: String,
  githubUrl: String,
  featured: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
