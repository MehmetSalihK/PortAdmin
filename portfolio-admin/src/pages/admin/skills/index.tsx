import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import Head from 'next/head';
import { FiPlus } from 'react-icons/fi';
import * as Icons from 'react-icons/fa';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import AdminLayout from '@/components/admin/Layout';
import DataTable from '@/components/admin/DataTable';
import DeleteConfirmation from '@/components/admin/DeleteConfirmation';
import SkillForm from '@/components/admin/skills/SkillForm';
import connectDB from '@/lib/db';
import Skill from '@/models/Skill';

interface SkillsPageProps {
  initialSkills: any[];
}

export default function SkillsPage({ initialSkills }: SkillsPageProps) {
  const [skills, setSkills] = useState(initialSkills);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState<any>(null);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<any>(null);

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (value: string, skill: any) => (
        <div className="flex items-center">
          {skill.icon && Icons[skill.icon as keyof typeof Icons] ? (
            <span className="mr-2">
              {Icons[skill.icon as keyof typeof Icons]({
                className: 'w-5 h-5 text-gray-500 dark:text-gray-400',
              })}
            </span>
          ) : null}
          <span>{value}</span>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (value: string) => (
        <span className="capitalize">{value}</span>
      ),
    },
    {
      key: 'level',
      label: 'Level',
      render: (value: number) => (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-primary-600 h-2.5 rounded-full"
            style={{ width: `${value}%` }}
          ></div>
        </div>
      ),
    },
    {
      key: 'ordering',
      label: 'Order',
    },
  ];

  const handleEdit = (skill: any) => {
    setEditingSkill(skill);
    setFormModalOpen(true);
  };

  const handleDelete = async () => {
    if (!skillToDelete) return;

    try {
      const response = await fetch(`/api/skills/${skillToDelete._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete skill');
      }

      setSkills((prev) =>
        prev.filter((skill) => skill._id !== skillToDelete._id)
      );
      setDeleteModalOpen(false);
      setSkillToDelete(null);
    } catch (error) {
      console.error('Error deleting skill:', error);
      // Handle error (show toast notification, etc.)
    }
  };

  const handleFormSubmit = async (data: any) => {
    try {
      if (editingSkill) {
        // Update existing skill
        const response = await fetch(`/api/skills/${editingSkill._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Failed to update skill');
        }

        const updatedSkill = await response.json();
        setSkills((prev) =>
          prev.map((s) => (s._id === editingSkill._id ? updatedSkill : s))
        );
      } else {
        // Create new skill
        const response = await fetch('/api/skills', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Failed to create skill');
        }

        const newSkill = await response.json();
        setSkills((prev) => [...prev, newSkill]);
      }

      setFormModalOpen(false);
      setEditingSkill(null);
    } catch (error) {
      console.error('Error saving skill:', error);
      // Handle error (show toast notification, etc.)
    }
  };

  return (
    <AdminLayout>
      <Head>
        <title>Manage Skills - Admin Dashboard</title>
      </Head>

      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Skills
          </h1>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            onClick={() => {
              setEditingSkill(null);
              setFormModalOpen(true);
            }}
          >
            <FiPlus className="-ml-1 mr-2 h-5 w-5" />
            Add Skill
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <DataTable
            columns={columns}
            data={skills}
            onEdit={handleEdit}
            onDelete={(skill) => {
              setSkillToDelete(skill);
              setDeleteModalOpen(true);
            }}
          />
        </div>
      </div>

      <DeleteConfirmation
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSkillToDelete(null);
        }}
        onConfirm={handleDelete}
        title="Delete Skill"
        message={`Are you sure you want to delete "${skillToDelete?.name}"? This action cannot be undone.`}
      />

      <SkillForm
        isOpen={formModalOpen}
        onClose={() => {
          setFormModalOpen(false);
          setEditingSkill(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={editingSkill}
        title={editingSkill ? 'Edit Skill' : 'Add Skill'}
      />
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }

  await connectDB();

  const skills = await Skill.find({}).sort({ category: 1, ordering: 1 }).lean();

  return {
    props: {
      initialSkills: JSON.parse(JSON.stringify(skills)),
    },
  };
};
