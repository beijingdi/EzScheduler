import React, { useEffect, useState } from "react";
import Button from "../components/CreateEventButton";
import UpcomingEvents from "../components/Upcoming/UpcomingEvents";
import EventItem from "../components/EventItem/EventItem";
import { Link } from "react-router-dom";
import axios from "axios";

const MainPage = (props) => {
  const [events, setEvents] = useState([]);
  const [showEvents, setShowEvents] = useState(false);
  const [eventChange, setEventChange] = useState(false);
  const userId = props.cookies.user ? props.cookies.user.id : false;

  useEffect(() => {
    if (userId) {
      axios.get(`/event/all/${userId}`).then((d) => {
        setEvents(d.data);
      });
      setShowEvents(true);
      setEventChange(false);
    } else {
      setShowEvents(false);
      setEventChange(false);
    }
  }, [userId, props.cookies.user, eventChange]);

  const upcomingEvents = events
    .filter((event) => event.start_time - Date.now() / 1000 <= 388800)
    .map((event) => (
      <UpcomingEvents
        key={event.event_id}
        eventId={event.event_id}
        title={event.title}
        date={event.start_time}
        address={event.address}
      />
    ));

  const acceptedEventsList = events
    .filter((event) => event.response === "yes")
    .map((event) => (
      <EventItem
        cookies={props.cookies}
        setCookie={props.setCookie}
        removeCookie={props.removeCookie}
        key={event.event_id}
        eventId={event.event_id}
        title={event.title}
        date={event.start_time}
        address={event.address}
        response={event.response}
        setEventChange={setEventChange}
      />
    ));

  const notRespondedEventsList = events
    .filter((event) => event.response === null)
    .map((event) => (
      <EventItem
        cookies={props.cookies}
        setCookie={props.setCookie}
        removeCookie={props.removeCookie}
        key={event.event_id}
        eventId={event.event_id}
        title={event.title}
        date={event.start_time}
        address={event.address}
        response={event.response}
        setEventChange={setEventChange}
      />
    ));

  const maybeEventsList = events
    .filter((event) => event.response === "maybe")
    .map((event) => (
      <EventItem
        cookies={props.cookies}
        setCookie={props.setCookie}
        removeCookie={props.removeCookie}
        key={event.event_id}
        eventId={event.event_id}
        title={event.title}
        date={event.start_time}
        address={event.address}
        response={event.response}
        setEventChange={setEventChange}
      />
    ));

  const rejectedEventsList = events
    .filter((event) => event.response === "no")
    .map((event) => (
      <EventItem
        cookies={props.cookies}
        setCookie={props.setCookie}
        removeCookie={props.removeCookie}
        key={event.event_id}
        eventId={event.event_id}
        title={event.title}
        date={event.start_time}
        address={event.address}
        response={event.response}
        setEventChange={setEventChange}
      />
    ));

  return (
    <>
      {showEvents && (
        <>
          <Link to="/new">
            <Button>Create new event!</Button>
          </Link>
          {upcomingEvents}
          <h3>My Events (Accepted)</h3>
          {acceptedEventsList}
          <h2>Open Invites</h2>
          {notRespondedEventsList}
          {maybeEventsList}
          <h2>Rejected Invites</h2>
          {rejectedEventsList}
        </>
      )}
      {!showEvents && <h3>Please Login to See Your Events</h3>}
    </>
  );
};

export default MainPage;
