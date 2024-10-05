"use client";
import { Section } from "lucide-react";
import React from "react";
import { EventForm } from "@/components/__component/EventForm";
import Header from "@/components/__component/Header";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CreateEvents = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const router = useRouter();

  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Get the token and userId from both localStorage and sessionStorage
    const storedToken =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const storedUserId =
      localStorage.getItem("userId") || sessionStorage.getItem("userId");

    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
      console.log("Token found in storage");
    }

    if (storedUserId) {
      setUserId(JSON.parse(storedUserId));
      setIsLoggedIn(true);
      console.log("UserId found in storage");
    }
  }, []);

  const handleOpenLogin = () => {
    setShowLoginModal(true);
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <Header />
          <section className="min-h-screen bg-primary-50">
            <section className="bg-dotted-pattern bg-cover bg-center md:py-4">
              <h3 className="wrapper h3-bold text-center sm:text-left px-4 sm:px-0">
                Create Event
              </h3>
            </section>
            <div className="wrapper px-4 sm:px-6 lg:px-8">
              <EventForm userId="60d9ff0bf9fd9c34c8dc54ab" type="Create" />
            </div>
          </section>
        </>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <h4 className="text-lg font-bold">Login Required</h4>
            <p className="mb-4">You should log in first to create an event.</p>
            <button
              onClick={() => {
                router.push("/login");
              }}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded w-full"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateEvents;
