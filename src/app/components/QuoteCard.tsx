import { Heart, Share2, RefreshCw, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface QuoteCardProps {
  quote: string;
  author: string;
  onLike: () => void;
  onShare: () => void;
  onRefresh: () => void;
  isLiked: boolean;
}

export default function QuoteCard({ quote, author, onLike, onShare, onRefresh, isLiked }: QuoteCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      key={quote}
      className="relative bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 pb-28 shadow-2xl w-full h-[80vh] mx-auto border border-purple-100 dark:border-purple-900 flex flex-col"
    >
      <div className="absolute top-4 right-4">
        <Sparkles className="w-5 h-5 text-purple-300" />
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-6"></div>
          <p className="text-gray-800 dark:text-gray-100 text-center mb-6 leading-relaxed text-lg">
            "{quote}"
          </p>
          <p className="text-purple-600 dark:text-purple-400 text-center tracking-wide">
            — {author}
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 px-8">
        <div className="flex justify-around items-center pt-6 border-t border-purple-100 dark:border-purple-900">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onLike}
          className="p-3 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors"
        >
          <Heart
            className={`w-6 h-6 transition-all ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400 dark:text-gray-500'}`}
          />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05, rotate: 180 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRefresh}
          className="p-5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 hover:shadow-xl transition-all shadow-lg"
        >
          <RefreshCw className="w-6 h-6 text-white" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onShare}
          className="p-3 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors"
        >
          <Share2 className="w-6 h-6 text-gray-400 dark:text-gray-500" />
        </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
