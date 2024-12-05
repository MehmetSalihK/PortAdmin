import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import connectDB from '@/lib/db';
import Skill from '@/models/Skill';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid skill ID' });
  }

  await connectDB();

  switch (req.method) {
    case 'DELETE':
      try {
        const skill = await Skill.findByIdAndDelete(id);
        
        if (!skill) {
          return res.status(404).json({ message: 'Skill not found' });
        }

        return res.status(200).json({ message: 'Skill deleted successfully' });
      } catch (error) {
        console.error('Error deleting skill:', error);
        return res.status(500).json({ message: 'Failed to delete skill' });
      }

    case 'PUT':
      try {
        const skill = await Skill.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!skill) {
          return res.status(404).json({ message: 'Skill not found' });
        }

        return res.status(200).json(skill);
      } catch (error) {
        console.error('Error updating skill:', error);
        return res.status(500).json({ message: 'Failed to update skill' });
      }

    default:
      res.setHeader('Allow', ['DELETE', 'PUT']);
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
