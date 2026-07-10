import { useEffect, useState } from "react";
import axios from "axios";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function InterviewCalendar() {

    const [events, setEvents] = useState([]);

    useEffect(() => {

        loadInterviews();

    }, []);

    const loadInterviews = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8081/calendar"
            );

            const calendarEvents = response.data.map((item) => ({

                title: `${item.company} - ${item.role}`,

                start: new Date(item.interviewDate),

                end: new Date(item.interviewDate),

                allDay: true

            }));

            setEvents(calendarEvents);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="container mt-4">

            <div className="card shadow p-4">

                <h2 className="text-primary mb-4">

                    📅 Interview Calendar

                </h2>

                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 650 }}
                />

            </div>

        </div>

    );

}

export default InterviewCalendar;