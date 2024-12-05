import { motion } from 'framer-motion';
import Head from 'next/head';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Portfolio - Accueil</title>
        <meta name="description" content="Portfolio professionnel - Développeur Full Stack" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Bienvenue sur mon Portfolio
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Développeur Full Stack passionné par la création d'applications web modernes et performantes
            </p>
            <div className="flex justify-center space-x-4">
              <Button href="/projects" variant="primary" size="lg">
                Voir mes projets
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Me contacter
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px)] bg-[size:14px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Featured content will go here */}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
