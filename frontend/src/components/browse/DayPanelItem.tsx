import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Schedule } from "types";

interface Props {
  schd: Schedule;
}

function DayPanelItem({ schd }: Props) {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`/detail/${schd._id}`);
  };

  return <Container onClick={onClickHandler}>{schd.title}</Container>;
}

const Container = styled.div`
  width: 100%;
  height: 50px;
  padding: 5px;

  color: ${(props) => props.theme.text[0]};

  background-color: ${(props) => props.theme.main[1]};
  &:hover {
    background-color: ${(props) => props.theme.main[2]};
  };
`;

export default DayPanelItem;
