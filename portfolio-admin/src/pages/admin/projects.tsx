import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';

interface Project {
  _id: string;
  title: string;
  technologies: string[];
  featured: boolean;
}

export default function ProjectsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    } else {
      fetchProjects();
    }
  }, [status]);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/admin/projects/new')}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            <FiPlus className="mr-2" /> Add Project
          </motion.button>
        </div>

        <div className="bg-[#1E1E1E] rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#252525] text-gray-400 text-sm">
                <th className="px-6 py-4 text-left">TITLE</th>
                <th className="px-6 py-4 text-left">TECHNOLOGIES</th>
                <th className="px-6 py-4 text-left">FEATURED</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr 
                  key={project._id}
                  className="border-t border-[#2A2A2A] hover:bg-[#252525] transition-colors cursor-pointer"
                  onClick={() => router.push(`/admin/projects/${project._id}`)}
                >
                  <td className="px-6 py-4 text-white">{project.title}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-blue-500/10 text-blue-400 text-sm rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {project.featured ? (
                      <span className="px-2 py-1 bg-green-500/10 text-green-400 text-sm rounded">
                        Yes
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-500/10 text-gray-400 text-sm rounded">
                        No
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-400">
                    No projects found. Click the Add Project button to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
