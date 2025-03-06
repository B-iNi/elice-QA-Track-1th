import styled from "styled-components";

interface Props {
  name: string;
  nameString: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: any;
  type?: string;
  required?: boolean;
};

function FormInput({ name, nameString, onChange, value, type, required }: Props) {
  return (
    <Container>
      <InputName htmlFor={name}>{nameString}: </InputName>
      <StyledInput
        id={name}
        name={name}
        required={required}
        onChange={onChange}
        type={type}
        value={value}
      />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
`;

const InputName = styled.label`
  width: 160px;
`;

const StyledInput = styled.input<{ type?: string }>`
  height: 30px;
  width: ${(props) => (props.type === 'time' || props.type === 'date') ? 'fit-content' : '90%'};
`;

export default FormInput;