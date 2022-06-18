import React, { useEffect, useState } from "react";
import EventPage from "../components/EventPage/EventPage";
import { useParams } from "react-router-dom";
import axios from "axios";

const EventMainPage = (props) => {
  const [event, setEvent] = useState({});
  const { id } = useParams();
  const user = props.cookies.user.id;

  useEffect(() => {
    axios.get(`/event/${id}`).then((data) => {
      console.log(id);
      console.log(data);
      data.data.forEach((e) => {
        if (e.invitee_id === user) {
          setEvent(e);
        }
      });
    });
  }, [id, user, event.creator]);

  return (
    <>
      {!event.event_id && <>This event does not exist!</>}
      {event.event_id && (
        <>
          <EventPage
            cookies={props.cookies}
            eventId={id}
            title={event.title}
            description={event.description}
            //how to convert long and lat to full address?
            address={event.address}
            date={event.start_time}
            response={event.response}
            lat={event.lat}
            long={event.long}
            creator={event.creator}
          />
        </>
      )}
    </>
  );
};

export default EventMainPage;
