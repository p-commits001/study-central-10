import { motion } from "framer-motion";
import { ExternalLink, BookOpen, Star, Download } from "lucide-react";

interface NcertBook {
  subject: string;
  title: string;
  chapters: string[];
  url: string;
  color: string;
  emoji: string;
}

const books: NcertBook[] = [
  {
    subject: "Mathematics",
    title: "NCERT Mathematics Class 10",
    emoji: "📐",
    color: "from-blue-500 to-blue-700",
    url: "https://ncert.nic.in/textbook.php?jemh1=0-15",
    chapters: [
      "Real Numbers", "Polynomials", "Pair of Linear Equations", "Quadratic Equations",
      "Arithmetic Progressions", "Triangles", "Coordinate Geometry", "Introduction to Trigonometry",
      "Applications of Trigonometry", "Circles", "Areas Related to Circles", "Surface Areas and Volumes",
      "Statistics", "Probability"
    ]
  },
  {
    subject: "Science",
    title: "NCERT Science Class 10",
    emoji: "🔬",
    color: "from-green-500 to-emerald-700",
    url: "https://ncert.nic.in/textbook.php?jesc1=0-16",
    chapters: [
      "Chemical Reactions and Equations", "Acids, Bases and Salts", "Metals and Non-metals",
      "Carbon and its Compounds", "Life Processes", "Control and Coordination",
      "How do Organisms Reproduce?", "Heredity", "Light – Reflection and Refraction",
      "The Human Eye and the Colourful World", "Electricity", "Magnetic Effects of Electric Current",
      "Our Environment"
    ]
  },
  {
    subject: "English",
    title: "NCERT First Flight (Class 10)",
    emoji: "📖",
    color: "from-yellow-500 to-orange-600",
    url: "https://ncert.nic.in/textbook.php?jelo1=0-11",
    chapters: [
      "A Letter to God", "Nelson Mandela: Long Walk to Freedom", "Two Stories About Flying",
      "From the Diary of Anne Frank", "Glimpses of India", "Mijbil the Otter",
      "Madam Rides the Bus", "The Sermon at Benares", "The Proposal",
      "Poem: Dust of Snow", "Poem: Fire and Ice", "Poem: A Tiger in the Zoo",
      "Poem: How to Tell Wild Animals", "Poem: The Ball Poem", "Poem: Amanda",
      "Poem: Animals", "Poem: The Trees", "Poem: Fog", "Poem: The Tale of Custard the Dragon", "Poem: For Anne Gregory"
    ]
  },
  {
    subject: "English (Supplementary)",
    title: "NCERT Footprints Without Feet (Class 10)",
    emoji: "📚",
    color: "from-amber-500 to-yellow-600",
    url: "https://ncert.nic.in/textbook.php?jels1=0-10",
    chapters: [
      "A Triumph of Surgery", "The Thief's Story", "The Midnight Visitor",
      "A Question of Trust", "Footprints Without Feet", "The Making of a Scientist",
      "The Necklace", "The Hack Driver", "Bholi", "The Book That Saved the Earth"
    ]
  },
  {
    subject: "History",
    title: "NCERT India and the Contemporary World - II (Class 10)",
    emoji: "🏛️",
    color: "from-red-500 to-rose-700",
    url: "https://ncert.nic.in/textbook.php?jehs1=0-8",
    chapters: [
      "The Rise of Nationalism in Europe", "Nationalism in India",
      "The Making of a Global World", "The Age of Industrialisation", "Print Culture and the Modern World"
    ]
  },
  {
    subject: "Geography",
    title: "NCERT Contemporary India - II (Class 10)",
    emoji: "🌍",
    color: "from-teal-500 to-cyan-700",
    url: "https://ncert.nic.in/textbook.php?legs1=0-7",
    chapters: [
      "Resources and Development", "Forest and Wildlife Resources",
      "Water Resources", "Agriculture", "Minerals and Energy Resources",
      "Manufacturing Industries", "Lifelines of National Economy"
    ]
  },
  {
    subject: "Political Science (Civics)",
    title: "NCERT Democratic Politics - II (Class 10)",
    emoji: "🗳️",
    color: "from-purple-500 to-violet-700",
    url: "https://ncert.nic.in/textbook.php?jeps1=0-8",
    chapters: [
      "Power Sharing", "Federalism", "Democracy and Diversity",
      "Gender, Religion and Caste", "Popular Struggles and Movements",
      "Political Parties", "Outcomes of Democracy", "Challenges to Democracy"
    ]
  },
  {
    subject: "Economics",
    title: "NCERT Understanding Economic Development (Class 10)",
    emoji: "📊",
    color: "from-indigo-500 to-blue-700",
    url: "https://ncert.nic.in/textbook.php?jeen1=0-5",
    chapters: [
      "Development", "Sectors of the Indian Economy",
      "Money and Credit", "Globalisation and the Indian Economy",
      "Consumer Rights"
    ]
  },
  {
    subject: "Hindi (Kshitij)",
    title: "NCERT Kshitij - 2 (Class 10)",
    emoji: "🕉️",
    color: "from-orange-500 to-red-600",
    url: "https://ncert.nic.in/textbook.php?jhkj1=0-18",
    chapters: [
      "Surdas ke Pad", "Ram Lakshman Parashuram Samvad", "Savaiya aur Kavitt",
      "Aatmakathya", "Utsaah aur At Nahi Rahe", "Yeh Danturit Muskan aur Fasal",
      "Chhaya Mat Chuna", "Kanyadan", "Sangatkar",
      "Netaji ka Chashma", "Balgobin Bhagat", "Lakhnavi Andaaz",
      "Manaviiya Karunam Ki Divya Chamak", "Ek Kahani Yeh Bhi", "Stri Shiksha ke Virodhi",
      "Naukari", "Sanskriti", "Shukar Taara Mann"
    ]
  },
  {
    subject: "Hindi (Kritika)",
    title: "NCERT Kritika - 2 (Class 10)",
    emoji: "📜",
    color: "from-rose-500 to-pink-700",
    url: "https://ncert.nic.in/textbook.php?jhkk1=0-5",
    chapters: [
      "Mata Ka Anchal", "George Pancham Ki Naak",
      "Saana Saana Haath Jodi...", "Ehi Thaiya Jhulni Herani Ho Rama!",
      "Main Kyoon Likhta Hoon?"
    ]
  }
];

export default function Books() {
  return (
    <div className="container mx-auto px-4 md:px-6 max-w-7xl">
      <div className="py-6 md:py-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-3">
            <BookOpen size={14} /> Official NCERT Books
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-extrabold mb-3">
            NCERT Books Class 10
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Download or read all official NCERT textbooks for CBSE Class 10 directly from <strong>ncert.nic.in</strong>.
            Free, official, and 100% accurate.
          </p>
        </motion.div>

        {/* Info banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-primary/5 border border-primary/20 rounded-2xl px-5 py-4 mb-8 flex items-start gap-3"
        >
          <Star size={18} className="text-primary mt-0.5 shrink-0" />
          <p className="text-sm text-muted-foreground">
            All books link to the official <strong className="text-foreground">NCERT website (ncert.nic.in)</strong>. 
            You can read online, download chapters as PDFs, or download the entire book. 
            These are the same books used in CBSE exams — always study from NCERT first!
          </p>
        </motion.div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {books.map((book, idx) => (
            <motion.div
              key={book.subject}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Card header */}
              <div className={`bg-gradient-to-r ${book.color} p-5 text-white`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-3xl mb-2 block">{book.emoji}</span>
                    <div className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-1">{book.subject}</div>
                    <h2 className="font-display font-bold text-base leading-tight">{book.title}</h2>
                  </div>
                  <span className="shrink-0 bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-semibold whitespace-nowrap">
                    {book.chapters.length} Chapters
                  </span>
                </div>
              </div>

              {/* Chapters */}
              <div className="flex-1 p-4">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Chapters</h3>
                <div className="space-y-1.5">
                  {book.chapters.slice(0, 6).map((ch, i) => (
                    <div key={ch} className="flex items-start gap-2 text-sm">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-semibold mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-foreground/80 line-clamp-1">{ch}</span>
                    </div>
                  ))}
                  {book.chapters.length > 6 && (
                    <div className="text-xs text-muted-foreground pl-7 pt-1">
                      +{book.chapters.length - 6} more chapters...
                    </div>
                  )}
                </div>
              </div>

              {/* CTA */}
              <div className="p-4 pt-0 flex gap-2">
                <a
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  <BookOpen size={15} /> Read Online
                </a>
                <a
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-secondary transition-colors"
                  title="Download PDF"
                >
                  <Download size={15} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10 text-sm text-muted-foreground"
        >
          All books are sourced from the official NCERT portal.{" "}
          <a href="https://ncert.nic.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
            Visit ncert.nic.in <ExternalLink size={12} />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
