import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this skill.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  isVisible: {
    type: Boolean,
    default: true, 
  },
}, {
  timestamps: true,
});

export default mongoose.models.Skill || mongoose.model('Skill', SkillSchema);
