import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this skill.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category for this skill.'],
    enum: ['frontend', 'backend', 'database', 'devops', 'tools', 'other'],
  },
  level: {
    type: Number,
    required: [true, 'Please provide a level for this skill.'],
    min: 1,
    max: 100,
  },
  icon: {
    type: String,
    required: [true, 'Please provide an icon for this skill.'],
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Skill || mongoose.model('Skill', SkillSchema);
