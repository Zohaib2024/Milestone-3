// "use client";
// import Head from "next/head";
// import { FormEvent, useState } from "react";

// export default function Contact() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     // Handle form submission logic here (e.g., send data to the server)
//     console.log(formData);
//   };

//   return (
//     <>
//       <Head>
//         <title>Contact Us</title>
//       </Head>
//       <div className="min-h-screen bg-gray-100">
//         <main className="container mx-auto py-12 px-6">
//           <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
//             Contact Us
//           </h2>
//           <p className="text-center text-gray-600 mb-12">
//             We'd love to hear from you! Fill out the form below, and we'll get
//             in touch soon.
//           </p>
//           <form
//             className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6"
//             onSubmit={handleSubmit}
//           >
//             <div className="mb-4">
//               <label
//                 className="block text-gray-700 font-semibold mb-2"
//                 htmlFor="name"
//               >
//                 Your Name
//               </label>
//               <input
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 type="text"
//                 id="name"
//                 name="name"
//                 placeholder="Enter your name"
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="mb-4">
//               <label
//                 className="block text-gray-700 font-semibold mb-2"
//                 htmlFor="email"
//               >
//                 Email Address
//               </label>
//               <input
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 type="email"
//                 id="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="mb-4">
//               <label
//                 className="block text-gray-700 font-semibold mb-2"
//                 htmlFor="message"
//               >
//                 Message
//               </label>
//               <textarea
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 id="message"
//                 name="message"
//                 rows={5}
//                 placeholder="Write your message here"
//                 value={formData.message}
//                 onChange={handleChange}
//               ></textarea>
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
//             >
//               Send Message
//             </button>
//           </form>
//         </main>
//       </div>
//     </>
//   );
// }
import Contact from "@/app/components/Contact";
import React from "react";

const page = () => {
  return <Contact />;
};

export default page;
