import { Input as InputAntd, InputProps } from 'antd';

interface Props extends InputProps {}

export const Input = ({ ...rest }: Props) => {
  return <InputAntd {...rest} />;
};
