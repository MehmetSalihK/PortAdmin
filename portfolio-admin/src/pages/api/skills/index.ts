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

  await connectDB();

  switch (req.method) {
    case 'POST':
      try {
        const skill = await Skill.create(req.body);
        return res.status(201).json(skill);
      } catch (error: any) {
        console.error('Error creating skill:', error);
        return res.status(400).json({
          message: error.message || 'Failed to create skill',
        });
      }

    case 'GET':
      try {
        const skills = await Skill.find({}).sort({ category: 1, ordering: 1 });
        return res.status(200).json(skills);
      } catch (error) {
        console.error('Error fetching skills:', error);
        return res.status(500).json({ message: 'Failed to fetch skills' });
      }

    default:
      res.setHeader('Allow', ['POST', 'GET']);
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
