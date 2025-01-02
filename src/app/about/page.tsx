import Head from "next/head";

const About: React.FC = () => {
  return (
    <>
      <Head>
        <title>About Us</title>
      </Head>
      <div className="min-h-screen bg-gray-100">
        <main className="container mx-auto py-12 px-6">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
            About Us
          </h2>
          <div className="text-gray-600 space-y-6">
            <p className="text-lg">
              Welcome to{" "}
              <span className="font-semibold text-blue-600">
                Governor house IT Course management
              </span>
              . We are dedicated to delivering the best solutions for our
              customers.
            </p>
            <p className="text-lg">
              Established in <span className="font-semibold">2024</span>, we
              have grown from a small team of passionate individuals to a
              reputable organization. Our mission is to innovate, inspire, and
              improve lives through technology.
            </p>
            <p className="text-lg">
              Our team believes in <span className="italic">hard work</span>,{" "}
              <span className="italic">creativity</span>, and
              <span className="italic">customer satisfaction</span>. We strive
              to exceed expectations and build lasting relationships with our
              clients.
            </p>
          </div>
        </main>
      </div>
    </>
  );
};

export default About;
