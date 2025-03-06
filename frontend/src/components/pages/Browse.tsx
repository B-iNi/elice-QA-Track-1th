import { useState } from "react";
import styled from "styled-components";

import DayPanel from "../browse/DayPanel";
import CalendarPanel from "../browse/CalendarPanel";
import { Schedule } from "types";

function Browse() {
  const [curDay, setCurDay] = useState<Date>(new Date());
  const [schdList, setSchdList] = useState<Schedule[]>([]);

  return (
    <Container>
      <DayContainer>
        <DayPanel curDay={curDay} setCurDay={setCurDay} schdList={schdList} />
      </DayContainer>
      <CalendarContainer>
        <CalendarPanel
          curDay={curDay}
          setCurDay={setCurDay}
          schdList={schdList}
          setSchdList={setSchdList}
        />
      </CalendarContainer>
    </Container>
  );
}

const Container = styled.div`
  width: auto;
  height: 100%;

  display: flex;
`;

const DayContainer = styled.div`
  width: 30%;
  height: 100%;
`;

const CalendarContainer = styled.div`
  width: 70%;
  height: 100%;
`;

export default Browse;
