import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import styled from "styled-components";

import Avatar from "components/Avatar";
import SearchUser from "components/SearchUser";
import {
  ScheduleInfo,
  ScheduleRequestBody,
  User,
} from "types";
import {
  datetime2str,
  str2datetime,
  utcDate2kstDate,
} from "utils/utils";
import api from "utils/api";
import Button from "components/Button";
import FormInput from "components/FormInput";
import useLoggedInUser from "hooks/useLoggedInUser";


function Edit() {
  const navigate = useNavigate();
  const { scheduleId } = useParams();
  const [scheduleInfo, setScheduleInfo] = useState<ScheduleInfo>({
    title: "",
    description: "",
    location: "",
    date: "",
    startTime: "",
    endTime: "",
  });
  const startsAt = useMemo(
    () => datetime2str(scheduleInfo.date, scheduleInfo.startTime),
    [scheduleInfo]
  );
  const endsAt = useMemo(
    () => datetime2str(scheduleInfo.date, scheduleInfo.endTime),
    [scheduleInfo]
  );

  const loggedInUser = useLoggedInUser();
  const [participants, setParticipants] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`schedules/${scheduleId}`);
        const { title, description, location, startsAt, endsAt, participants } =
          response.data;

        const { date, time: startTime } = str2datetime(
          utcDate2kstDate(startsAt)
        );
        const { time: endTime } = str2datetime(utcDate2kstDate(endsAt));

        setScheduleInfo({
          title,
          description,
          location,
          date,
          startTime,
          endTime,
        });
        setParticipants(participants);
      } catch (err) {
        if (err instanceof AxiosError)
          console.error(err.response?.data.message);
      }
    })();
  }, [scheduleId]);

  const handleSelect = (user: User) => {
    setParticipants([...participants, user]);
  };

  const handleRemove = (user: User) => {
    setParticipants(participants.filter((cur) => cur._id !== user._id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetProperty = e.target.name as keyof ScheduleInfo;
    setScheduleInfo((prev) => ({ ...prev, [targetProperty]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (async () => {
      try {
        const newSchedule: ScheduleRequestBody = {
          title: scheduleInfo.title,
          description: scheduleInfo.description,
          location: scheduleInfo.location,
          startsAt,
          endsAt,
          participantIds: participants.map((cur) => cur._id),
        };
        const response = await api.put(`schedules/${scheduleId}`, newSchedule);

        navigate(`/detail/${response.data._id}`);
      } catch (err) {
        if (err instanceof AxiosError)
          console.error(err.response?.data.message);
      }
    })();
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Wrapper>
        <FormInput name="title" nameString="제목" onChange={handleChange} value={scheduleInfo.title} required />
      </Wrapper>
      <Wrapper>
        <FormInput name="description" nameString="설명" onChange={handleChange} value={scheduleInfo.description} required />
      </Wrapper>
      <Wrapper>
        <FormInput name="location" nameString="장소" onChange={handleChange} value={scheduleInfo.location} required />
      </Wrapper>
      <Wrapper>
        <FormInput name="date" nameString="날짜" onChange={handleChange} value={scheduleInfo.date} type="date" required />
      </Wrapper>
      <Wrapper>
        <FormInput name="startTime" nameString="시작 시각" onChange={handleChange} value={scheduleInfo.startTime} type="time" required />
      </Wrapper>
      <Wrapper>
        <FormInput name="endTime" nameString="종료 시각" onChange={handleChange} value={scheduleInfo.endTime} type="time" required />
      </Wrapper>
      <Wrapper>
        <InputName>참가자: </InputName>
        <Items>
          {participants.map((user) => (
            <Item>
              <Avatar user={user} onRemove={handleRemove} />
            </Item>
          ))}
          <SearchUser onSelect={handleSelect} excludeList={[loggedInUser.user!, ...participants]} />
        </Items>
      </Wrapper>
      <ButtonWrapper>
        <Button>수정 완료</Button>
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.form`
  width: auto;
  height: 100%;

  display: flex;
  flex-direction: column;

  padding-left: 10%;
  padding-right: 10%;
  padding-top: 3%;
`;

const Wrapper = styled.div`
  height: 40px;

  padding: 5px;
  margin: 1rem 0;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InputName = styled.label`
  width: 160px;
`;

const Items = styled.div`
  display: flex;
  flex-direction: row;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  padding: 5px;

  display: flex;
  flex-direction: row;
  justify-content: right;
  gap: 5px;
`;

export default Edit;