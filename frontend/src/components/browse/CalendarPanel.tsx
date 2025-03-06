import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import {
  Schedule,
  User,
} from "types";
import api from "utils/api";
import { date2date } from "utils/utils";
import SearchUser from "components/SearchUser";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import useLoggedInUser from "hooks/useLoggedInUser";

interface Props {
  curDay: Date;
  setCurDay: (date: Date) => void;
  schdList: Schedule[];
  setSchdList: (list: Schedule[]) => void;
}

function CalendarPanel({ curDay, setCurDay, schdList, setSchdList }: Props) {
  const navigate = useNavigate();
  const loggedInUser = useLoggedInUser();

  const { userId } = useParams();
  const [viewUser, setViewUser] = useState<User>({
    _id: "",
    username: "",
    email: "",
  });

  // 월 단위로 다른 state를 업데이트하기 위한 useMemo
  const curMonth = useMemo(() => curDay.getMonth(), [curDay]);

  const { firstDay, daysInMonth } = useMemo(
    () => ({
      firstDay: (curDay.getDay() - curDay.getDate() + 1 + 35) % 7,
      daysInMonth: new Date(curDay.getFullYear(), curMonth + 1, 0).getDate(),
    }),
    [curMonth]
  );

  const updateSchdList = useCallback(() => {
    // 월 단위로 사용자 일정 get
    if (viewUser) {
      (async () => {
        try {
          const monthStart = new Date(curDay);
          const monthEnd = new Date(curDay);
          monthStart.setDate(1);
          monthEnd.setDate(1);
          monthEnd.setMonth(monthEnd.getMonth() + 1);

          const response = await api.get<Schedule[]>(
            `users/${viewUser._id}/schedules?startDate=${date2date(monthStart)}&endDate=${date2date(monthEnd)}`
          );

          const newList = response.data.map(
            (cur) =>
            ({
              _id: cur._id,
              title: cur.title,
              description: cur.description,
              location: cur.location,
              startsAt: new Date(cur.startsAt),
              endsAt: new Date(cur.endsAt),
              owner: cur.owner,
              participants: cur.participants,
            } as Schedule)
          );
          setSchdList(newList);
        } catch (err) {
          if (err instanceof AxiosError)
            console.error(err.response?.data.message);
        }
      })();
    }
  }, [curMonth, viewUser]);

  useEffect(() => {
    updateSchdList();
  }, [curMonth, viewUser]);

  useEffect(() => {
    if (!userId) {
      // 로그인한 사용자 일정 표시
      if (loggedInUser.user) {
        setViewUser(loggedInUser.user);
      }
      return;
    } else {
      // 다른 사용자 일정 표시
      (async () => {
        try {
          const response = await api.get<User>(`users/${userId}`);
          setViewUser(response.data);
        } catch (err) {
          if (err instanceof AxiosError)
            console.error(err.response?.data.message);
        }
      })();
    }
  }, [userId, loggedInUser]);

  const changeDay = (day: number) => {
    setCurDay(new Date(curDay.getFullYear(), curDay.getMonth(), day));
  };

  const deltaMonth = (delta: number) => {
    const newDay = new Date(
      curDay.getFullYear(),
      curDay.getMonth() + delta + 1,
      0
    );

    if (newDay.getDate() > curDay.getDate()) {
      newDay.setDate(curDay.getDate());
    }

    setCurDay(newDay);
  };

  const handleSelect = (user: User) => {
    navigate(`/browse/${user._id}`);
  };

  return (
    <Container>
      <Header>
        <ControllerContainer>
          <ControllerButton onClick={() => deltaMonth(-1)}>⏪</ControllerButton>
          {curDay.getFullYear()}년 {curDay.getMonth() + 1}월
          <ControllerButton onClick={() => deltaMonth(1)}>⏩</ControllerButton>
        </ControllerContainer>
        <UserContainer>
          <strong>{viewUser.username}</strong>님의 일정
          <SearchUser
            excludeList={[viewUser]}
            onSelect={handleSelect}
          />
        </UserContainer>
      </Header>
      <Calendar>
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <Days key={day}>{day}</Days>
        ))}
        {Array.from({ length: firstDay }).map((_, i) => (
          <FillerCell key={`filler-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => (
          <DayCell
            key={`${curDay.getFullYear()}-${curDay.getMonth()}-${i + 1}`}
            onClick={() => changeDay(i + 1)}
            $isToday={curDay.getDate() === i + 1}
          >
            <DayHeader>{i + 1}</DayHeader>
            {schdList
              .filter(
                (cur) =>
                  curDay.getFullYear() === cur.startsAt.getFullYear() &&
                  curDay.getMonth() === cur.startsAt.getMonth() &&
                  i + 1 === cur.startsAt.getDate()
              )
              .map((cur) => (
                <Preview key={cur._id}>{cur.title}</Preview>
              ))}
          </DayCell>
        ))}
        {Array.from({ length: 6 * 7 - daysInMonth - firstDay }).map((_, i) => (
          <FillerCell key={`filler-${i}`} />
        ))}
      </Calendar>
    </Container>
  );
}

const Container = styled.div`
  width: auto;
  height: 100%;
  padding: 2%;

  display: flex;
  flex-direction: column;

  background-color: ${(props) => props.theme.bg[0]};
`;

const Header = styled.div`
  height: 10%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const UserContainer = styled.div`
  margin-right: 20px;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  & strong {
    font-weight: 900;
  }
`;

const ControllerContainer = styled.div`
  width: auto;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ControllerButton = styled.button`
  font-size: x-large;

  background: none;
  border: none;
  
  border-radius: 5px;

  margin: 5px;

  &:hover {
    background-color: ${(props) => props.theme.bg[2]};
  };
`;

const Calendar = styled.div`
  display: grid;
  height: 100%;

  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: auto repeat(6, 1fr);

  border-bottom: 1px solid;
  border-right: 1px solid;
`;

const Days = styled.div`
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-top: 1px solid;
  border-left: 1px solid;

  color: ${(props) => props.theme.text[0]};
`;

const Cell = styled.div`
  padding-top: 5%;
  padding-left: 5%;
  padding-right: 5%;

  border-top: 1px solid;
  border-left: 1px solid;
`;

const FillerCell = styled(Cell)`
  background-color: none;
`;

const DayCell = styled(Cell)<{ $isToday: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 3px;

  overflow: hidden;

  color: ${(props) => props.theme.text[0]};

  background-color: ${(props) =>
    props.$isToday ? props.theme.hl[0] : props.theme.bg[0]};

  &:hover {
    background-color: ${(props) =>
    props.$isToday ? props.theme.hl[1] : props.theme.bg[1]};
  }
`;

const DayHeader = styled.div``;

const Preview = styled.div`
  width: auto;

  border-radius: 4px;

  font-size: small;

  padding: 4px;
  overflow: hidden;

  color: ${(props) => props.theme.text[3]};

  background-color: ${(props) => props.theme.main[3]};
`;

export default CalendarPanel;
