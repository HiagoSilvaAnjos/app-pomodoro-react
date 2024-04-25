interface ButtonProps {
  handleClickButton?: () => void;
  textButton: string;
  className?: string;
}

export const Button = (props: ButtonProps) => {
  return (
    <button className={props.className} onClick={props.handleClickButton}>
      {props.textButton}
    </button>
  );
};
