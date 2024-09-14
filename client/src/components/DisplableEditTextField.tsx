import { TextField, Typography } from "@mui/material";
import { DisplableEditTextFieldProps } from "../types/compoentProps";
import { useEffect, useRef, useState } from "react";
import { IsDomElement } from "../util";

const DisplableEditTextField = (props: DisplableEditTextFieldProps) => {
  const { textFieldProps, typographyProps, shouldExtend = false, ...otherProps } = props;
  const { className: typographyClass, ...otherTypographyProps } =
    typographyProps;
  const { className: textFieldClass, style : textFieldStyle, ...otherTextFieldProps } = textFieldProps;
  const { className: mainElClass, ...otherMainElProps } = otherProps;

  const [isFocused, setIsFocused] = useState(false);
  const mainElRef = useRef<HTMLInputElement>(null);
  const typographyRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (mainElRef.current && typographyRef.current && shouldExtend) {
        const typographyRefBound = typographyRef.current.getBoundingClientRect();
        mainElRef.current.style.width = `${typographyRefBound.width}px`;
      }
    }, [isFocused]);

  return (
    <div
      {...otherMainElProps}
      ref={mainElRef}
      className={`${mainElClass} displable-edit-text-field`}
      tabIndex={-1}
      onFocus={() => setIsFocused(true)}
    >
      <TextField
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        focused={isFocused}
        autoFocus={isFocused}
        className={`${typographyClass} ${
          isFocused ? "" : "displable-edit-text-field-hidden-item"
        }`}
        style={{
            width: '100%',
            ...textFieldStyle
        }}
        {...otherTextFieldProps}
      />
      <Typography
        ref={typographyRef}
        className={`${typographyClass} ${
          !isFocused ? "" : "displable-edit-text-field-hidden-item"
        }`}
        {...otherTypographyProps}
      />
    </div>
  );
};
export default DisplableEditTextField;
