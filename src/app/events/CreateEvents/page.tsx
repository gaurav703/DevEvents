import { Section } from "lucide-react";
import React from "react";
import { EventForm } from "@/components/__component/EventForm";
import Header from "@/components/__component/Header";

const CreateEvents = () => {
  return (
    <>
      <Header />
      <section className="min-h-screen bg-primary-50">
        <section className=" bg-dotted-pattern bg-cover bg-center md:py-4">
          <h3 className="wrapper h3-bold text-center sm:text-left">
            Create Event
          </h3>
        </section>
        <div className="wrapper">
          <EventForm userId="60d9ff0bf9fd9c34c8dc54ab" type="Create" />
        </div>
      </section>
    </>
  );
};

export default CreateEvents;
