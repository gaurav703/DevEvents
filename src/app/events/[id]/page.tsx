"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import EventList from "@/app/(home)/_component/EventList";

const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};
interface Event {
  title: string;
  isFree: boolean;
  price: number;
  category: string;
  organizer: string;
  startDateTime: Date;
  endDateTime: Date;
  location: string;
  description: string;
  url: string;
  imageUrl: string;
}

const EventDetails = ({ params }: { params: { id: string } }) => {
  const [events, setEvents] = useState<Event>();
  const [relatedevents, setRelatedEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        "https://devmeets-backend.vercel.app/api/events/"
      );
      console.log("resss", res.data[1]);
      setEvents(res.data[0]);
      setRelatedEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image
            src={events?.imageUrl ?? "/test.png"}
            alt="heroimage"
            width={1000}
            height={1000}
            className="h-full min-h-[300px] object-cover object-center"
          />

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold">{events?.title}</h2>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                    {events?.isFree ? "FREE" : `$${events?.price}`}
                  </p>
                  <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                    AI
                  </p>
                </div>

                <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                  by <span className="text-primary-500">Gaurav Kamble</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex gap-2 md:gap-3">
                <Image
                  src="/assets/icons/calendar.svg"
                  alt="calendar"
                  width={32}
                  height={32}
                />
                <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                  {events?.startDateTime && (
                    <p>
                      {formatDateTime(events.startDateTime).dateOnly} -{" "}
                      {formatDateTime(events.startDateTime).timeOnly}
                    </p>
                  )}
                  {events?.endDateTime && (
                    <p>
                      {formatDateTime(events.endDateTime).dateOnly} -{" "}
                      {formatDateTime(events.endDateTime).timeOnly}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-regular-20 flex items-center gap-3">
                <Image
                  src="/assets/icons/location.svg"
                  alt="location"
                  width={32}
                  height={32}
                />
                <p className="p-medium-16 lg:p-regular-20">
                  {events?.location}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600">What You&apos;ll Learn:</p>
              <p className="p-medium-16 lg:p-regular-18">
                {events?.description}
              </p>
              <div className="flex p-bold-20 text-grey-600 max-sm:flex-col">
                <p>Website Url: </p>
                <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">
                  {events?.url}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Related Events</h2>

        <EventList
          data={relatedevents}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
        />
      </section>
    </>
  );
};

export default EventDetails;
