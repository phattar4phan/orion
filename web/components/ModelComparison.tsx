import { motion } from 'framer-motion';
import LineChart from './LineChart';

const models = [
  { name: 'VGG-16', accuracy: 92.5, precision: 91.8, recall: 93.2 },
  { name: 'ResNet50', accuracy: 95.2, precision: 94.5, recall: 95.9 },
  { name: 'InceptionV3', accuracy: 94.1, precision: 93.2, recall: 94.8 },
  { name: 'MobileNetV2', accuracy: 91.8, precision: 90.5, recall: 92.5 },
  { name: 'DenseNet121', accuracy: 96.0, precision: 95.8, recall: 96.2 },
];

const ModelComparison = () => {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          Model Comparison
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-4 border-b border-gray-700">Model</th>
                  <th className="p-4 border-b border-gray-700">Accuracy</th>
                  <th className="p-4 border-b border-gray-700">Precision</th>
                  <th className="p-4 border-b border-gray-700">Recall</th>
                </tr>
              </thead>
              <tbody>
                {models.map((model) => (
                  <tr key={model.name}>
                    <td className="p-4 border-b border-gray-800">{model.name}</td>
                    <td className="p-4 border-b border-gray-800">{model.accuracy}%</td>
                    <td className="p-4 border-b border-gray-800">{model.precision}%</td>
                    <td className="p-4 border-b border-gray-800">{model.recall}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-center">Accuracy Over Time (Example)</h3>
          <LineChart />
        </motion.div>
      </div>
    </section>
  );
};

export default ModelComparison;
