import React from 'react';
import { motion } from 'framer-motion';
import targetImage from '../assets/target.png';

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const Home: React.FC = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="mx-4"
    >
      <motion.div variants={fadeIn} className="rounded-3xl max-w-6xl mx-auto mt-28  ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          <motion.div variants={fadeIn} className="order-2 md:order-1">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <motion.div variants={fadeIn} className="col-span-2">
                <div className="flex justify-between items-center p-4 bg-slate-100 rounded-xl">
                  <div className='mx-2'>
                    <div className="font-bold text-xl text-slate-900 leading-none">
                      <span>Good day,</span>
                      <br></br>
                      <div className="pt-1">
                        <span className="text-2xl">Koemnak Heat</span>
                      </div>
                    </div>
                    <div className="mt-5">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        className="inline-flex items-center justify-center py-2 px-3 rounded-lg bg-yellow-300 text-gray-800 hover:text-slate-900 text-sm font-semibold transition"
                      >
                        Start tracking
                      </motion.button>
                    </div>
                  </div>
                  <motion.img
                    src={targetImage}
                    className="w-28 md:w-40"
                    alt=""
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
              <motion.div variants={fadeIn} className="col-span-2">
                <h2 className="text-2xl font-bold mb-4 text-slate-300">
                  Stats
                </h2>
                <div className="grid w-full grid-cols-2 gap-4 md:gap-6">
                  <motion.div
                    variants={fadeIn}
                    className="p-4 border bg-slate-800 rounded-xl text-gray-100"
                  >
                    <div className="font-bold text-2xl leading-none">20</div>
                    <div className="mt-2">Tasks finished</div>
                  </motion.div>
                  <motion.div
                    variants={fadeIn}
                    className="p-4 border bg-slate-800 rounded-xl text-gray-100"
                  >
                    <div className="font-bold text-2xl leading-none">5,5</div>
                    <div className="mt-2">Tracked hours</div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          <motion.div variants={fadeIn} className="order-1 md:order-2">
            <h2 className="text-2xl font-bold text-slate-300 mb-4">
              Your tasks today
            </h2>
            <div className="space-y-4">
              {[
                'Blog and social posts',
                'New campaign review',
                'Cross-platform and browser QA',
              ].map((task, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-slate-600/30 border border-slate-600 rounded-xl text-gray-50"
                >
                  <div className="flex justify-between">
                    <a
                      href="#"
                      className="font-bold hover:text-yellow-800 hover:underline"
                    >
                      {task}
                    </a>
                    <div className="text-gray-400 text-xs">
                      {index === 0 ? '4h' : index === 1 ? '7d' : '2h'}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
