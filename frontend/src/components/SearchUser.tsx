import styled from "styled-components";
import { useEffect, useState } from "react";
import { User } from "types";
import Avatar from "./Avatar";
import api from "utils/api";
import useDebounce from "hooks/useDebounce";
import { AxiosError } from "axios";

interface Props {
  onSelect: (user: User) => void;
  excludeList?: User[];
  autoFocus?: boolean;
}

function SearchUser({ onSelect, excludeList = [], autoFocus }: Props) {
  const [candidates, setCandidates] = useState<User[]>([]);
  const [searchStr, setSearchStr] = useState<string>("");
  const [isFocused, setIsFocused] = useState(autoFocus);
  const debouncedSearchString = useDebounce(searchStr, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchStr(e.target.value);
  };

  const handleSelect = (user: User) => {
    onSelect(user);
    setSearchStr("");
    setIsFocused(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get<User[]>(
          `users?size=100&page=1&search=${debouncedSearchString}`
        );

        const newCandidates = response.data
          .filter(
            (candUser) =>
              !excludeList.find((partUser) => partUser._id === candUser._id)
          );
        setCandidates(newCandidates);
      } catch (err) {
        if (err instanceof AxiosError)
          console.error(err.response?.data.message);
      }
    })();
  }, [debouncedSearchString, excludeList]);

  return (
    <Container>
      <StyledInput
        autoFocus={autoFocus}
        value={searchStr}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          if (e.relatedTarget !== null) return;
          setIsFocused(false);
        }}
        placeholder="사용자 검색"
      />

      {isFocused && (
        <SearchContainer>
          {candidates.map((user) => (
            <AvatarWrapper key={user._id}>
              <Avatar onClick={() => handleSelect(user)} user={user} />
            </AvatarWrapper>
          ))}
        </SearchContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 150px;
  height: 50px;

  position: relative;
`;

const StyledInput = styled.input`
  width: 95%;
  height: 100%;
`;

const SearchContainer = styled.div`
  position: absolute;
  top: 100%;

  display: flex;
  flex-direction: column;

  width: 150px;
  max-height: 125px;

  overflow-y: auto;
  overflow-x: hidden;

  background-color: ${(props) => props.theme.bg[1]};
`;

const AvatarWrapper = styled.div`
  &:hover {
    background-color: ${(props) => props.theme.bg[2]};
  }
`;

export default SearchUser;
