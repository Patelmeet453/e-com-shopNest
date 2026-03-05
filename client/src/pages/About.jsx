const About = () => {
  return (
    <div className="px-6 md:px-20 py-16 text-white">
      <h1 className="text-4xl font-bold text-emerald-400 text-center mb-6">
        About ShopNest
      </h1>

      <p className="text-gray-300 max-w-4xl mx-auto text-center leading-relaxed">
        ShopNest is a modern AI-enabled e-commerce platform designed to provide
        a smarter, faster, and more intuitive shopping experience. We combine
        traditional online shopping features with AI-powered navigation and an
        intelligent chatbot to make product discovery and support effortless.
      </p>

      <div className="grid md:grid-cols-3 gap-8 mt-16">
        {/* CARD */}
        <div className="bg-gradient-to-br from-[#020617] to-emerald-950 border border-emerald-900/40 rounded-2xl p-6">
          <h3 className="text-xl text-emerald-400 mb-3">Our Mission</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            To simplify online shopping by integrating AI technologies that
            enhance usability, accessibility, and customer satisfaction.
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#020617] to-emerald-950 border border-emerald-900/40 rounded-2xl p-6">
          <h3 className="text-xl text-emerald-400 mb-3">Our Vision</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            To create an intelligent e-commerce ecosystem where users can shop,
            navigate, and get assistance naturally using voice and AI.
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#020617] to-emerald-950 border border-emerald-900/40 rounded-2xl p-6">
          <h3 className="text-xl text-emerald-400 mb-3">Why ShopNest?</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            AI navigation, smart chatbot support, secure payments, modern UI,
            and a scalable MERN architecture make ShopNest stand out.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
