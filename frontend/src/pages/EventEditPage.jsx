import React, { useEffect, useState } from "react";
import EventPage from "../components/EventPage/EventPage";
import CommentSection from "../components/EventPage/CommentSection";
import { useParams } from "react-router-dom";
import EditEventForm from "../components/EditEventForm/EditEventForm";
import axios from "axios";


const EventEditPage = (props) => {
  const [event, setEvent] = useState({});
  const [comments, setComments] = useState([]);
  const [edit, setEdit] = useState(false);
  const { id } = useParams();
  const user = props.cookies.user.id;

  useEffect(() => {
    Promise.all([
      axios.get(`/event/${id}`),
      axios.get(`/event/comments/${id}`),
    ]).then((data) => {
      data[0].data.forEach((e) => {
        if (e.invitee_id === user) {
          setEvent(e);
        }
      });
      setComments(data[1].data);
    });
  }, [id, user, event.creator]);

  return (
    <>
      editpage editing
      {!event.event_id && <>This event does not exist!</>}
      {event.event_id && (
        <>
          < EditEventForm
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
          <CommentSection
            cookies={props.cookies}
            eventId={id}
            comments={comments}
          />
        </>
      )}
    </>
  );
};

export default EventEditPage;
