import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useTranslation } from 'next-i18next';

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    imageUrl: string;
    technologies: string[];
    demoUrl?: string;
    githubUrl?: string;
  };
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { t } = useTranslation('projects');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      <div className="relative h-48 w-full">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {project.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex space-x-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            >
              <FaGithub className="w-5 h-5 mr-2" />
              {t('viewCode')}
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            >
              <FaExternalLinkAlt className="w-4 h-4 mr-2" />
              {t('liveDemo')}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;