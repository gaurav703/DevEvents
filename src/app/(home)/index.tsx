"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Search from "@/components/__component/Search";
import CategoryFilter from "@/components/__component/CategoryFilter";
import EventList from "./_component/EventList";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        "https://devmeets-backend.vercel.app/api/events/"
      );
      console.log("resss", res.data);
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen">
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              Connect, Learn, and Grow with DevEvents!
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Join a community of tech enthusiasts, attend events, and expand
              your knowledge with experts from around the globe.
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#events">Explore Events</Link>
            </Button>
          </div>

          <Image
            src="/assets/images/hero.png"
            alt="Tech Meetup"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>
      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">
          Trusted by <br /> Thousands of Tech Enthusiasts
        </h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

        <EventList
          data={events}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
        />
      </section>
    </div>
  );
}
