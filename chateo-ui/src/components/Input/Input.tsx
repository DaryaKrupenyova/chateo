import React from "react";
import "./Input.css";

interface InputProps {
  onChange: () => void;
  value: string;
  type: string;
  id?: string;
  name?: string;
  placeholder?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = (props) => {
  return <input onChange={props.onChange} value={props.value} type={props.type} id={props.id} name={props.name} placeholder={props.placeholder} className={`input ${props.className}`} />;
};
