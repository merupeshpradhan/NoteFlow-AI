import { FaApple, FaGoogle, FaMicrosoft, FaAmazon, FaStar } from "react-icons/fa";

function Feature() {
  const fiveStar = [...Array(5)];

  // List of trusted brands to display dynamically
  const trustedBrands = [
    { name: "Apple", icon: <FaApple /> },
    { name: "Google", icon: <FaGoogle /> },
    { name: "Microsoft", icon: <FaMicrosoft /> },
    { name: "Amazon", icon: <FaAmazon /> },
  ];

  return (
    <section className="w-full bg-zinc-50 py-16 px-6 border-y border-zinc-200 cursor-default">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
        
        {/* Trusted By Section */}
        <div className="flex flex-col items-center gap-6 w-full">
          <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
            Trusted by thinkers and creators at world-class companies
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-zinc-400 text-3xl md:text-4xl">
            {trustedBrands.map((brand, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 hover:text-zinc-800 transition-colors duration-200 cursor-pointer"
                title={brand.name}
              >
                {brand.icon}
                <span className="text-sm font-bold tracking-tight">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials / Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full pt-6">
          
          {/* Testimonial Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200 flex flex-col items-start gap-4 hover:shadow-md transition-shadow">
            <div className="flex gap-1">
              {fiveStar.map((_, index) => (
                <FaStar key={index} className="text-yellow-400 text-base" />
              ))}
            </div>
            <h1 className="text-xl font-bold text-zinc-900">
              &ldquo;Finally, a notes app that makes sense&rdquo;
            </h1>
            <p className="text-sm text-zinc-500">
              "It completely changed how I capture daily thoughts and manage my projects without clutter."
            </p>
          </div>

          {/* Testimonial Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200 flex flex-col items-start gap-4 hover:shadow-md transition-shadow">
            <div className="flex gap-1">
              {fiveStar.map((_, index) => (
                <FaStar key={index} className="text-yellow-400 text-base" />
              ))}
            </div>
            <h1 className="text-xl font-bold text-zinc-900">
              &ldquo;The best workspace for personal knowledge&rdquo;
            </h1>
            <p className="text-sm text-zinc-500">
              "Lightning fast search and clean organization. I can find any idea in less than a second."
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Feature;