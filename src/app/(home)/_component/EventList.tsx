import Link from "next/link";
import React from "react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTransition } from "react";
import { usePathname } from "next/navigation";

type EventProp = {
  data: any;
  emptyTitle: string;
  emptyStateSubtext: string;
  collectionType?: "Events_Organized" | "My_Tickets" | "All_Events";
};

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

const EventList = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  collectionType,
}: EventProp) => {
  console.log(data);
  console.log(data.length);
  const isEventCreator = true;
  let [isPending, startTransition] = useTransition();

  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((event: any) => {
              const hasOrderLink = collectionType === "Events_Organized";
              const hidePrice = collectionType === "My_Tickets";

              return (
                <li key={event._id} className="flex justify-center">
                  <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
                    <Link
                      href={`/events/${event._id}`}
                      //   style={{
                      //     backgroundImage:
                      //       "uri(https://res.cloudinary.com/dqki29mbg/image/upload/v1705678275/cld-sample-3.jpg)",
                      //   }}
                      className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
                    >
                      <Image
                        src={event?.imageUrl}
                        height={200}
                        width={400}
                        alt="event"
                        className="object-cover w-[400px] h-[200px]"
                      />
                    </Link>

                    {isEventCreator && !hidePrice && (
                      <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
                        <Link href={`/events/${event._id}/update`}>
                          <Image
                            src="/assets/icons/edit.svg"
                            alt="edit"
                            width={20}
                            height={20}
                          />
                        </Link>

                        {/* <DeleteConfirmation eventId={event._id} /> */}
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <Image
                              src="/assets/icons/delete.svg"
                              alt="edit"
                              width={20}
                              height={20}
                            />
                          </AlertDialogTrigger>

                          <AlertDialogContent className="bg-white">
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you sure you want to delete?
                              </AlertDialogTitle>
                              <AlertDialogDescription className="p-regular-16 text-grey-600">
                                This will permanently delete this event
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>

                              <AlertDialogAction>
                                {isPending ? "Deleting..." : "Delete"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    )}

                    <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
                      {!hidePrice && (
                        <div className="flex gap-2">
                          <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
                            {event.isFree ? "FREE" : `$${event.price}`}
                          </span>
                          <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
                            AI
                          </p>
                        </div>
                      )}

                      <p className="p-medium-16 p-medium-18 text-grey-500">
                        {formatDateTime(event.startDateTime).dateTime}
                      </p>

                      <Link href={`/events/${event._id}`}>
                        <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
                          {event.title}
                        </p>
                      </Link>

                      <div className="flex-between w-full">
                        <p className="p-medium-14 md:p-medium-16 text-grey-600">
                          {/* {event.organizer.firstName} {event.organizer.lastName} */}
                          Gaurav Kamble
                        </p>

                        {hasOrderLink && (
                          <Link
                            href={`/orders?eventId=${event._id}`}
                            className="flex gap-2"
                          >
                            <p className="text-primary-500">Order Details</p>
                            <Image
                              src="/assets/icons/arrow.svg"
                              alt="search"
                              width={10}
                              height={10}
                            />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default EventList;
