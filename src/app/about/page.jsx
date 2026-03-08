export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 text-gray-800 py-16 md:py-24 px-5 sm:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Main heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-amber-700 mb-10 md:mb-16 text-center leading-tight">
          The Spicy Biryani
        </h1>

        <div className="space-y-10 md:space-y-14 text-lg sm:text-xl leading-relaxed">
          
          <p className="font-medium">
            Welcome to <span className="text-amber-800 font-bold">The Spicy Biryani</span> — 
            where tradition meets bold, unforgettable flavor in every bite.
          </p>

          <p>
            We specialize in authentic biryanis inspired by the rich culinary heritage of Hyderabad, Kolkata, and Dhaka. 
            Using premium Basmati rice, tender meat, and freshly ground spices, every dish is slow-cooked to perfection, 
            allowing the aromas and layers of flavor to develop fully — just the way it’s been done for generations.
          </p>

          <p>
            At The Spicy Biryani, we believe food is more than a meal — it’s a way to bring people together. 
            Whether you’re sharing a hearty family platter, celebrating a special occasion, or simply craving 
            something warm, spicy, and deeply satisfying after a long day, we’re here to make every visit memorable.
          </p>

          <div className="pt-8 border-t border-amber-200/70">
            <p className="text-amber-800 font-semibold text-xl sm:text-2xl mb-4">
              Our Promise
            </p>
            <p>
              We use only the freshest ingredients and time-honored techniques. 
              No shortcuts, no artificial flavors — just pure passion in every pot we cook.
            </p>
          </div>

          <p>
            From the first whiff of saffron and cardamom to the final spoonful of perfectly spiced rice, 
            we want you to leave with a full stomach and a smile — carrying home the memory of a truly great biryani.
          </p>

        </div>

        {/* Closing touch */}
        <div className="mt-16 md:mt-20 text-center">
          <p className="text-amber-700 font-medium text-xl sm:text-2xl italic">
            Come join us — let's celebrate flavor, one aromatic plate at a time!
          </p>
        </div>

      </div>
    </div>
  );
}