import { motion } from "framer-motion";
import { Star, ExternalLink, Tag } from "lucide-react";

const books = [
  {
    id: 1,
    title: "Together With Science Class 10",
    author: "R.S. Aggarwal",
    publisher: "Rachna Sagar",
    rating: 4.8,
    reviews: "2,341",
    originalPrice: "₹499",
    discountPrice: "₹299",
    discount: "40% OFF",
    description: "Complete CBSE Class 10 Science with chapter-wise notes, solved examples, and previous year questions. Best for board exam preparation.",
    tags: ["Science", "Board Exam", "NCERT Based"],
    color: "from-green-500 to-emerald-600",
    emoji: "🔬",
    affiliateLink: "https://amzn.in/d/example1", // 👈 Replace with your Amazon Affiliate link
    badge: "Bestseller",
  },
  {
    id: 2,
    title: "RD Sharma Mathematics Class 10",
    author: "R.D. Sharma",
    publisher: "Dhanpat Rai Publications",
    rating: 4.9,
    reviews: "5,812",
    originalPrice: "₹650",
    discountPrice: "₹389",
    discount: "40% OFF",
    description: "The most trusted Maths book for Class 10. Thousands of solved problems, exercises, and MCQs covering the full CBSE syllabus.",
    tags: ["Mathematics", "Problem Solving", "CBSE"],
    color: "from-blue-500 to-indigo-600",
    emoji: "📐",
    affiliateLink: "https://amzn.in/d/example2", // 👈 Replace with your Amazon Affiliate link
    badge: "Most Popular",
  },
  {
    id: 3,
    title: "Oswaal CBSE Question Bank Class 10",
    author: "Oswaal Editorial Board",
    publisher: "Oswaal Books",
    rating: 4.7,
    reviews: "3,109",
    originalPrice: "₹895",
    discountPrice: "₹549",
    discount: "38% OFF",
    description: "All subjects — includes 10 years of solved papers, mind maps, revision notes, and self-assessment tests for 2025 exams.",
    tags: ["All Subjects", "Question Bank", "2025 Exam"],
    color: "from-purple-500 to-violet-600",
    emoji: "📚",
    affiliateLink: "https://amzn.in/d/example3", // 👈 Replace with your Amazon Affiliate link
    badge: "Editor's Choice",
  },
];

export default function RecommendedBooks() {
  return (
    <div className="container mx-auto px-4 md:px-6 max-w-6xl">
      <div className="py-6 md:py-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-3">
            <Tag size={14} /> Hand-picked for Class 10 Toppers
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-extrabold mb-3">Recommended Books</h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Top reference books trusted by Class 10 CBSE toppers across India — at discounted prices on Amazon!
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {books.map((book, idx) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Cover */}
              <div className={`bg-gradient-to-br ${book.color} p-8 flex flex-col items-center justify-center relative`}>
                <span className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {book.badge}
                </span>
                <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-extrabold px-2.5 py-1 rounded-full shadow-lg">
                  {book.discount}
                </span>
                <div className="text-6xl mb-2">{book.emoji}</div>
                <div className="text-white/80 text-xs font-medium">{book.publisher}</div>
              </div>

              {/* Info */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {book.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{tag}</span>
                  ))}
                </div>

                <h2 className="font-display font-bold text-lg leading-tight mb-1">{book.title}</h2>
                <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} className={i < Math.floor(book.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"} />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">{book.rating}</span>
                  <span className="text-xs text-muted-foreground">({book.reviews})</span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{book.description}</p>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-extrabold text-foreground">{book.discountPrice}</span>
                  <span className="text-sm text-muted-foreground line-through">{book.originalPrice}</span>
                  <span className="text-xs font-bold text-orange-500 bg-orange-100 dark:bg-orange-900/30 px-2 py-0.5 rounded-full">{book.discount}</span>
                </div>

                {/* Amazon Button — Orange */}
                <a
                  href={book.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#FF9900] hover:bg-[#e88c00] text-white font-bold text-sm transition-colors shadow-lg shadow-orange-400/30"
                >
                  🛒 Check Discount Price on Amazon
                  <ExternalLink size={13} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-muted-foreground mt-8"
        >
          * Clicking the button may earn us a small commission at no extra cost to you. This helps keep Class 10 Hub 100% free!
        </motion.p>
      </div>
    </div>
  );
}
