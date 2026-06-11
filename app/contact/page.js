"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import toast, { Toaster } from "react-hot-toast";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
export default function Contact({
  city = "",
}) {
  const [stateName, setStateName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [contactInfo, setContactInfo] = useState([]);
  useEffect(() => {
    const fetchContact = async () => {
      const snap = await getDoc(
        doc(
          db,
          "websites",
          "humanbiomedicalorg",
          "pages",
          "contact"
        )
      );

      if (snap.exists()) {
        setContactInfo(
          snap.data().contactInfo || []
        );
      }
    };

    fetchContact();
  }, []);
  const getValue = (label) => {
    return (
      contactInfo.find(
        (item) =>
          item.label
            ?.toLowerCase()
            .trim() ===
          label.toLowerCase()
      )?.value || ""
    );
  };
  useEffect(() => {
    const fetchDistrict = async () => {
      if (!city) return;

      const snap = await getDoc(
        doc(
          db,
          "websites",
          "humanbiomedicalorg",
          "districts",
          city.toLowerCase()
        )
      );

      if (snap.exists()) {
        setStateName(snap.data().state || "");
      }
    };

    fetchDistrict();
  }, [city]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      phone,
      subject,
      message,
    } = formData;

    if (!name.trim()) {
      return toast.error("Name is required");
    }

    if (!email.trim()) {
      return toast.error("Email is required");
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return toast.error("Invalid email address");
    }

    if (!phone.trim()) {
      return toast.error("Phone number is required");
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return toast.error("Enter valid 10 digit phone number");
    }

    if (!subject.trim()) {
      return toast.error("Subject is required");
    }

    if (!message.trim()) {
      return toast.error("Message is required");
    }

    try {
      setSubmitting(true);

      await addDoc(
        collection(
          db,
          "websitesQueries",
          "humanbiomedicalorg",
          "contactQueries"
        ),
        {
          name,
          email,
          phone,
          subject,
          message,
          createdAt: serverTimestamp(),
        }
      );

      toast.success(
        "Message sent successfully"
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };
  return (

    <main className="bg-[#f5fbff] overflow-hidden">
      <Toaster position="top-right" />
      <Navbar city={city} />

      {/* HERO */}
      <section className="relative px-4 sm:px-6 pt-32 sm:pt-36 pb-24 sm:pb-28 overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50 to-[#eef8ff]"></div>

        {/* Glow */}
        <div className="absolute top-0 left-0 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-blue-200/20 rounded-full blur-3xl"></div>

        <div className="absolute bottom-0 right-0 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-cyan-200/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* TOP */}
          <div className="text-center max-w-5xl mx-auto">

            <span className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-white border border-blue-100 shadow-md text-blue-700 font-medium text-sm sm:text-base">

              <span className="w-2 h-2 rounded-full bg-cyan-500"></span>

              Human Biomedical Contact

            </span>

            <h1 className="mt-6 text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[1] text-gray-900 break-words">

              Let’s Build
              <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent">
                Smarter Healthcare
              </span>

            </h1>

            <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-gray-600 leading-8 sm:leading-9 max-w-4xl mx-auto px-2">

              Connect with Human Biomedical for advanced biomedical analyzers,
              healthcare automation systems, pathology laboratory solutions,
              installation services, and modern diagnostic technology.

            </p>

          </div>

          {/* MAIN CONTAINER */}
          <div className="mt-16 sm:mt-24 relative">

            {/* Outer Glow */}
            <div className="absolute -top-10 -left-10 w-60 h-60 bg-blue-200/20 rounded-full blur-3xl"></div>

            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-cyan-200/20 rounded-full blur-3xl"></div>

            {/* Main Box */}
            <div className="relative bg-white/80 backdrop-blur-2xl border border-white shadow-[0_20px_80px_rgba(0,0,0,0.08)] rounded-[24px] sm:rounded-[35px] md:rounded-[45px] overflow-hidden">

              <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-0">

                {/* LEFT PANEL */}
                <div className="relative bg-gradient-to-br from-[#0f172a] via-[#0b2447] to-[#0ea5e9] p-6 sm:p-10 md:p-14 text-white overflow-hidden">

                  {/* Pattern */}
                  <div className="absolute inset-0 opacity-[0.05]">
                    <div className="h-full w-full bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:80px_80px]"></div>
                  </div>

                  {/* Glow */}
                  <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-300/10 rounded-full blur-3xl"></div>

                  <div className="relative z-10">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-cyan-100 text-sm font-medium">

                      <span className="w-2 h-2 rounded-full bg-cyan-400"></span>

                      Contact Information

                    </div>

                    {/* Heading */}
                    <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-black leading-tight break-words">

                      Future Ready
                      <span className="block text-cyan-300">
                        Healthcare Solutions
                      </span>

                    </h2>

                    <p className="mt-6 text-blue-100 text-base sm:text-lg leading-8">

                      Human Biomedical provides advanced biomedical analyzers,
                      pathology systems, laboratory automation, and smart
                      healthcare technology solutions.

                    </p>

                    {/* Info Cards */}
                    <div className="mt-12 space-y-5">

                      {/* Call */}
                      <div className="flex items-start gap-4 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5 max-w-[280px] sm:max-w-full mx-auto">

                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-2xl flex-shrink-0">
                          📞
                        </div>

                        <div className="min-w-0 flex-1">

                          <h3 className="text-lg sm:text-xl font-black">
                            Call Us
                          </h3>

                          <p className="mt-2 text-blue-100 text-sm sm:text-base">
                            {getValue("Phone")}
                          </p>

                        </div>

                      </div>

                      {/* Email */}
                      <div className="flex items-start gap-4 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5 max-w-[280px] sm:max-w-full mx-auto">

                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-2xl flex-shrink-0">
                          ✉️
                        </div>

                        <div className="min-w-0 flex-1">

                          <h3 className="text-lg sm:text-xl font-black">
                            Email Address
                          </h3>

                          <p className="mt-2 text-blue-100 text-sm sm:text-base break-words">
                            {getValue("Email")}
                          </p>

                        </div>

                      </div>

                      {/* Address */}
                      <div className="flex items-start gap-4 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5 max-w-[280px] sm:max-w-full mx-auto">

                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-2xl flex-shrink-0">
                          📍
                        </div>

                        <div className="min-w-0 flex-1">

                          <h3 className="text-lg sm:text-xl font-black">
                            Office Address
                          </h3>

                          <p className="mt-2 text-blue-100 text-sm sm:text-base">
                            {city
                              ? `${city}, ${stateName}, India`
                              : getValue("Office")}
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* Working Hours */}
                    <div className="mt-10 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 max-w-[280px] sm:max-w-full mx-auto">

                      <p className="uppercase tracking-[3px] text-cyan-200 text-xs sm:text-sm">
                        Working Hours
                      </p>

                      <h3 className="mt-4 text-xl sm:text-3xl font-black leading-tight">
                        Monday - Saturday
                      </h3>

                      <p className="mt-3 text-blue-100 text-base sm:text-lg">
                        {getValue('Hours')}
                      </p>

                    </div>


                  </div>

                </div>

                {/* RIGHT FORM */}
                <div className="relative p-5 sm:p-10 md:p-16">

                  {/* Floating */}
                  <div className="absolute top-10 right-10 w-40 h-40 bg-cyan-100/40 rounded-full blur-3xl"></div>

                  <div className="relative z-10">

                    {/* Heading */}
                    <div>

                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold">

                        <span className="w-2 h-2 rounded-full bg-cyan-500"></span>

                        Send Inquiry

                      </span>

                      <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight break-words">

                        Request A
                        <span className="block text-blue-600">
                          Free Consultation
                        </span>

                      </h2>

                    </div>

                    {/* FORM */}
                    <form
                      onSubmit={handleSubmit}
                      className="mt-10 sm:mt-12 space-y-6"
                    >

                      {/* Grid */}
                      <div className="grid md:grid-cols-2 gap-6">

                        {/* Name */}
                        <div>

                          <label className="block text-gray-700 font-bold mb-3">
                            Full Name
                          </label>

                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                name: e.target.value,
                              })
                            }
                            placeholder="Enter your name"
                            className="w-full h-12 sm:h-14 md:h-16 px-5 sm:px-6 rounded-2xl border border-blue-100 bg-[#f8fbff]"
                          />

                        </div>

                        {/* Phone */}
                        <div>

                          <label className="block text-gray-700 font-bold mb-3">
                            Phone Number
                          </label>

                          <input
                            type="text"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                            placeholder="Enter phone number"
                            className="w-full h-12 sm:h-14 md:h-16 px-5 sm:px-6 rounded-2xl border border-blue-100 bg-[#f8fbff]"
                          />

                        </div>

                      </div>

                      {/* Email */}
                      <div>

                        <label className="block text-gray-700 font-bold mb-3">
                          Email Address
                        </label>

                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              email: e.target.value,
                            })
                          }
                          placeholder="Enter email address"
                          className="w-full h-12 sm:h-14 md:h-16 px-5 sm:px-6 rounded-2xl border border-blue-100 bg-[#f8fbff]"
                        />

                      </div>

                      {/* Subject */}
                      <div>

                        <label className="block text-gray-700 font-bold mb-3">
                          Subject
                        </label>

                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              subject: e.target.value,
                            })
                          }
                          placeholder="Biomedical equipment inquiry"
                          className="w-full h-12 sm:h-14 md:h-16 px-5 sm:px-6 rounded-2xl border border-blue-100 bg-[#f8fbff]"
                        />

                      </div>

                      {/* Message */}
                      <div>

                        <label className="block text-gray-700 font-bold mb-3">
                          Your Message
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          placeholder="Tell us about your healthcare or laboratory requirements..."
                          className="w-full h-40 sm:h-44 p-5 sm:p-6 rounded-2xl border border-blue-100 bg-[#f8fbff]"
                        />

                      </div>

                      {/* Button */}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="group relative w-full h-12 sm:h-14 md:h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-base sm:text-lg font-black shadow-2xl"
                      >
                        {submitting
                          ? "Sending..."
                          : "Send Message"}
                      </button>

                    </form>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      <Footer city={city} />

    </main>
  );
}