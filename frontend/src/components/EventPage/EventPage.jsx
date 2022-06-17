import React, { useEffect, useState } from "react";
import Map from "../Map";
import EventDate from "../EventDate";
import classes from "./EventPage.module.css";
import axios from "axios";

import {
  acceptInvite,
  maybeInvite,
  rejectInvite,
} from "../../helpers/inviteResponse";
import Weather from "../Weather";
import { Link } from "react-router-dom";

const EventPage = (props) => {
  const [invite, setInvite] = useState(props.response);
  const [confirmation, setConfirmation] = useState(false);
  const [inviteesList, setInviteesList] = useState([]);
  const [creator, setCreator] = useState("");
  const isCreator = props.cookies.user.id === props.creator;

  const deleteEvent = () => {
    // Axios Delete request
    axios.delete(`/event/${props.eventId}`);
  };

  const acceptResponse = () => {
    acceptInvite(setInvite, props);
    setInvite("yes");
  };

  const maybeResponse = () => {
    maybeInvite(setInvite, props);
    setInvite("maybe");
  };

  const declineResponse = () => {
    rejectInvite(setInvite, props);
    setInvite("no");
  };

  axios
    .get(`/users/name/${String(props.creator)}`)
    .then((res) => setCreator(res.data.data));

  useEffect(() => {
    axios
      .get(`/event/invitees/${props.eventId}`)
      .then((res) => setInviteesList(res.data));
  }, [props.eventId]);

  const showList = inviteesList.map((invitee) => (
    <p key={invitee.user_id}>{invitee.user_id}</p>
  ));

  const date = new Date(props.date * 1000);
  return (
    <article className={classes.container}>
      <h3 className={`${classes.title} row`}>
        {props.title}{" "}
       {isCreator &&
        <Link
          style={{ width: "fit-content" }}
          to={`/events/${props.eventId}/edit`}
        >
          <button>EDIT</button>
        </Link>
       }
        
        <p>Created by {creator}</p>
      </h3>
      <div className="row">
        <div className="col">
          {!isCreator && (
            <>
              <button
                onClick={acceptResponse}
                className={`${classes.btn} ${classes.accept}`}
              >
                Accept
              </button>
              <button
                onClick={maybeResponse}
                className={`${classes.btn} ${classes.maybe}`}
              >
                Maybe
              </button>
              <button
                onClick={declineResponse}
                className={`${classes.btn} ${classes.decline}`}
              >
                Decline
              </button>
            </>
          )}
          {isCreator && !confirmation && (
            <>
              <button
                onClick={() => setConfirmation(true)}
                className={`${classes.btn} ${classes.decline}`}
              >
                CANCEL EVENT
              </button>
            </>
          )}
          {confirmation && (
            <>
              <button
                onClick={() => setConfirmation(false)}
                className={`${classes.btn} ${classes.accept}`}
              >
                CANCEL
              </button>
              <Link to="/">
                <button
                  onClick={deleteEvent}
                  className={`${classes.btn} ${classes.decline}`}
                >
                  CONFIRM DELETION
                </button>
              </Link>
            </>
          )}
        </div>
        <div className={`${classes.date} col`}>
          <EventDate date={date} />
        </div>
      </div>
      <div className="row">
        {invite === "yes" && (
          <p>
            Responded with: <strong>Accepted</strong>
          </p>
        )}
        {invite === "no" && (
          <p>
            Responded with: <strong>Declined</strong>
          </p>
        )}
        {invite === "maybe" && (
          <p>
            Responded with: <strong>Maybe</strong>
          </p>
        )}
        <p>
          Description: <strong>{props.description}</strong>
        </p>
        <p>
          Address: <strong>{props.address}</strong>
        </p>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          Invitees:
          <div className={classes.invitees}>
            {showList}
            {isCreator && <i className={`${classes.add} bi bi-plus-lg`}></i>}
          </div>
        </div>
        <div className="col">
          Weather Information:
          <div className={classes.weather}>
            <Weather lat={props.lat} long={props.long} date={props.date} />
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <Map lat={props.lat} lng={props.long} height={"400px"} zoom={15} />
      </div>
    </article>
  );
};

export default EventPage;
