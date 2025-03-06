import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import styled from "styled-components";

import Avatar from "components/Avatar";
import SearchUser from "components/SearchUser";
import {
  ScheduleInfo,
  ScheduleRequestBody,
  User,
} from "types";
import { datetime2str } from "utils/utils";
import api from "utils/api";
import FormInput from "components/FormInput";
import Button from "components/Button";
import useLoggedInUser from "hooks/useLoggedInUser";

function Create() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scheduleInfo, setScheduleInfo] = useState<ScheduleInfo>({
    title: "",
    description: "",
    location: "",
    date: location.state?.date || "",
    startTime: "",
    endTime: "",
  });
  const startsAt = useMemo(
    () => datetime2str(scheduleInfo.date, scheduleInfo.startTime) + ":00",
    [scheduleInfo]
  );
  const endsAt = useMemo(
    () => datetime2str(scheduleInfo.date, scheduleInfo.endTime) + ":00",
    [scheduleInfo]
  );

  const loggedInUser = useLoggedInUser();
  const [participants, setParticipants] = useState<User[]>([]);

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
        const response = await api.post(`schedules`, newSchedule);

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
        <Button>생성</Button>
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.form`
  width: auto;
  height: 100%;

  padding-left: 10%;
  padding-right: 10%;
  padding-top: 3%;
`;

const Wrapper = styled.div`
  height: 40px;

  padding: 5px;
  margin: 1rem 0;

  display: flex;
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
  padding: 5px;

  display: flex;
  flex-direction: row;
  justify-content: right;
  gap: 5px;
`;

export default Create;