import React from "react";
import EventDate from "../EventDate";

import classes from "./UpcomingEvents.module.css";

const UpcomingEvents = (props) => {
  const date = new Date("09-24-2022");

  return (
    <article className={classes["upcoming-events"]}>
      <section>
        <div className="row">
          <div className="col">
            <header className={classes.title}>
              <h3>Upcoming Events</h3>
            </header>
            <div className={`${classes.content} d-flex`}>
              <h3 className={classes.title__event}>Event Title</h3>
              <section className={classes.weather}>Weather section ⛈</section>
            </div>
          </div>
          <div className={`${classes.date__invitees} col-2`}>
            <EventDate date={date} />
            <p>10 people are going</p>
          </div>
        </div>
      </section>
    </article>
  );
};

export default UpcomingEvents;
