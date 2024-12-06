import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/layouts/AdminLayout';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

interface Experience {
  _id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export default function ExperiencePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    } else if (status === 'authenticated') {
      fetchExperiences();
    }
  }, [status]);

  const fetchExperiences = async () => {
    try {
      const response = await fetch('/api/experiences');
      if (response.ok) {
        const data = await response.json();
        setExperiences(data);
      }
    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        const response = await fetch(`/api/experiences/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setExperiences(experiences.filter(exp => exp._id !== id));
        }
      } catch (error) {
        console.error('Error deleting experience:', error);
      }
    }
  };

  if (status === 'loading' || loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Experience Management</h1>
          <button
            onClick={() => router.push('/admin/experience/new')}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FiPlus className="mr-2" />
            Add Experience
          </button>
        </div>

        <div className="grid gap-4">
          {experiences.map((experience) => (
            <div
              key={experience._id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {experience.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">{experience.company}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {experience.startDate} - {experience.current ? 'Present' : experience.endDate}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => router.push(`/admin/experience/${experience._id}`)}
                    className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-full transition-colors"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => handleDelete(experience._id)}
                    className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded-full transition-colors"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                {experience.description}
              </p>
            </div>
          ))}

          {experiences.length === 0 && !loading && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              No experiences found. Click the Add Experience button to create one.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
