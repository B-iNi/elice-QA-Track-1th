import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { AxiosError } from "axios";

import Avatar from "../Avatar";
import { date2time } from "utils/utils";
import { Schedule } from "types";
import api from "utils/api";
import useLoggedInUser from "hooks/useLoggedInUser";
import LinkButton from "components/LinkButton";

function Detail() {
  const loggedInUser = useLoggedInUser();
  const [schedule, setSchedule] = useState<Schedule>({
    _id: "",
    title: "",
    description: "",
    location: "",
    startsAt: new Date(),
    endsAt: new Date(),
    owner: {
      _id: "",
      username: "",
      email: "",
    },
    participants: [],
  });
  const { scheduleId } = useParams();

  const loadSchedule = useCallback(async () => {
    try {
      const response = await api.get(`schedules/${scheduleId}`);

      const newSchedule: Schedule = {
        _id: response.data._id,
        title: response.data.title,
        description: response.data.description,
        location: response.data.location,
        owner: response.data.owner,
        participants: response.data.participants,
        startsAt: new Date(response.data.startsAt),
        endsAt: new Date(response.data.endsAt),
      };
      setSchedule(newSchedule);
    } catch (err) {
      if (err instanceof AxiosError) console.error(err.response?.data.message);
    }
  }, [scheduleId]);

  useEffect(() => {
    (async () => await loadSchedule())();
  }, [loadSchedule]);

  return (
    <Container>
      <Wrapper>
        <ItemName>제목: </ItemName>
        <Item>{schedule.title}</Item>
      </Wrapper>
      <Wrapper>
        <ItemName>설명: </ItemName>
        <Item>{schedule.description}</Item>
      </Wrapper>
      <Wrapper>
        <ItemName>장소: </ItemName>
        <Item>{schedule.location}</Item>
      </Wrapper>
      <Wrapper>
        <ItemName>날짜: </ItemName>
        <Item>{schedule.startsAt.toString()}</Item>
      </Wrapper>
      <Wrapper>
        <ItemName>시작 시각: </ItemName>
        <Item>{date2time(schedule.startsAt)}</Item>
      </Wrapper>
      <Wrapper>
        <ItemName>종료 시각: </ItemName>
        <Item>{date2time(schedule.endsAt)}</Item>
      </Wrapper>
      <Wrapper>
        <ItemName>참가자: </ItemName>
        <Item>
          {schedule.participants.map((participant) => (
            <AvatarContainer key={participant._id}>
              <Avatar user={participant} />
            </AvatarContainer>
          ))}
        </Item>
      </Wrapper>
      {/* 내 일정일 때 */}
      {schedule.owner._id === loggedInUser.user?._id && (
        <ButtonWrapper>
          <LinkButton to={`/edit/${scheduleId}`}>수정</LinkButton>
        </ButtonWrapper>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: auto;
  height: 100%;

  padding-left: 10%;
  padding-right: 10%;
  padding-top: 3%;
`;

const Wrapper = styled.div`
  height: 40px;

  padding: 5px;

  display: flex;
  align-items: center;
`;

const ItemName = styled.div`
  width: 80px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const ButtonWrapper = styled.div`
  padding: 5px;

  display: flex;
  flex-direction: row;
  justify-content: right;
  gap: 5px;
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default Detail;
