import React from "react";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Grid,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";

import calendarStyle from "./Calendar.style";
import demoEvents from "./demo-events.json";

const FullCalendarWrapper = styled.div`
  ${calendarStyle}
`;

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

function EmptyCard() {
  return (
    <Card mb={6}>
      <CardContent p={6}>
        <FullCalendarWrapper>
          <FullCalendar
            initialView="dayGridMonth"
            initialDate="2021-02-14"
            plugins={[dayGridPlugin, interactionPlugin]}
            events={demoEvents}
            editable={true}
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "dayGridDay,dayGridWeek,dayGridMonth",
            }}
          />
        </FullCalendarWrapper>
      </CardContent>
    </Card>
  );
}

function Calendar() {
  return (
    <React.Fragment>
      <Helmet title="Calendar" />
      <Typography variant="h3" gutterBottom display="inline">
        Calendar
      </Typography>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EmptyCard />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Calendar;
