import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import connectDB from '@/lib/db';
import Project from '@/models/Project';

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
        const project = await Project.create(req.body);
        return res.status(201).json(project);
      } catch (error: any) {
        console.error('Error creating project:', error);
        return res.status(400).json({
          message: error.message || 'Failed to create project',
        });
      }

    case 'GET':
      try {
        const projects = await Project.find({}).sort({ createdAt: -1 });
        return res.status(200).json(projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
        return res.status(500).json({ message: 'Failed to fetch projects' });
      }

    default:
      res.setHeader('Allow', ['POST', 'GET']);
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
