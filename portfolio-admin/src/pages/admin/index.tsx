import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import Head from 'next/head';
import { authOptions } from '../api/auth/[...nextauth]';
import AdminLayout from '@/components/admin/Layout';
import connectDB from '@/lib/db';
import Project from '@/models/Project';
import Skill from '@/models/Skill';
import Experience from '@/models/Experience';
import Contact from '@/models/Contact';
import { useState, useEffect } from 'react';
import StatsCards from '@/components/admin/StatsCards';
import RecentActivity from '@/components/admin/RecentActivity';

interface DashboardProps {
  stats: {
    projects: number;
    skills: number;
    experience: number;
    unreadMessages: number;
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    unreadMessages: 0,
    totalProjects: 0,
    totalSkills: 0,
    totalExperiences: 0,
  });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsResponse, activitiesResponse] = await Promise.all([
          fetch('/api/dashboard/stats'),
          fetch('/api/dashboard/activity'),
        ]);

        if (!statsResponse.ok || !activitiesResponse.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const [statsData, activitiesData] = await Promise.all([
          statsResponse.json(),
          activitiesResponse.json(),
        ]);

        setStats(statsData);
        setActivities(activitiesData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Handle error (show toast notification, etc.)
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Head>
        <title>Dashboard - Admin Panel</title>
      </Head>

      <div className="py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Dashboard
          </h1>
        </div>

        <div className="space-y-6">
          {/* Stats Cards */}
          <StatsCards stats={stats} />

          {/* Recent Activity */}
          <RecentActivity activities={activities} />
        </div>
      </div>
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

  // Fetch statistics
  const [
    projectCount,
    skillCount,
    experienceCount,
    unreadMessageCount,
  ] = await Promise.all([
    Project.countDocuments(),
    Skill.countDocuments(),
    Experience.countDocuments(),
    Contact.countDocuments({ status: 'new' }),
  ]);

  return {
    props: {
      stats: {
        projects: projectCount,
        skills: skillCount,
        experience: experienceCount,
        unreadMessages: unreadMessageCount,
      },
    },
  };
};
