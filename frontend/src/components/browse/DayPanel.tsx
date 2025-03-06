import styled from "styled-components";
import { Link } from "react-router-dom";

import DayPanelItem from "./DayPanelItem";
import { date2date } from "utils/utils";
import { Schedule } from "types";

interface Props {
  curDay: Date;
  setCurDay: (date: Date) => void;
  schdList: Schedule[];
}

function DayPanel({ curDay, setCurDay, schdList }: Props) {
  const deltaDay = (delta: number) => {
    setCurDay(
      new Date(
        curDay.getFullYear(),
        curDay.getMonth(),
        curDay.getDate() + delta
      )
    );
  };

  return (
    <Container>
      <Header>
        {date2date(curDay)}
        <ControllerButton onClick={() => deltaDay(-1)}>⏪</ControllerButton>
        <ControllerButton onClick={() => deltaDay(1)}>⏩</ControllerButton>
      </Header>
      <Wrapper>
        {schdList
          .filter(
            (cur) =>
              curDay.getFullYear() === cur.startsAt.getFullYear() &&
              curDay.getMonth() === cur.startsAt.getMonth() &&
              curDay.getDate() === cur.startsAt.getDate()
          )
          .map((cur) => (
            <DayPanelItem key={cur._id} schd={cur} />
          ))}
        <NewItemWrapper to="/create" state={{ date: date2date(curDay) }}>
          +
        </NewItemWrapper>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  width: auto;
  height: 100%;

  padding: 5%;

  left: 0;
  top: 0;

  background-color: ${(props) => props.theme.main[0]};
`;

const Header = styled.div`
  width: 80%;

  margin-bottom: 20px;

  display: flex;
  flex-direction: row;
  align-items: center;

  font-size: xx-large;
`;

const ControllerButton = styled.button`
  font-size: x-large;

  background: none;
  border: none;

  border-radius: 5px;

  margin: 5px;

  &:hover {
    background-color: ${(props) => props.theme.main[1]};
  };
`;

const Wrapper = styled.div`
  width: auto;
  height: auto;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 10px;
`;

const NewItemWrapper = styled(Link)`
  width: 100%;

  text-align: center;
  font-size: x-large;
  text-decoration: none;

  color: ${(props) => props.theme.text[3]};
  background-color: ${(props) => props.theme.hl[1]};
  &:hover {
    background-color: ${(props) => props.theme.hl[2]};
  }
`;

export default DayPanel;
