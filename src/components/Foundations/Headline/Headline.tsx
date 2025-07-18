'use client';

import React from "react";
import Director from "@/components/Layout/Director";

export type HeadlineProps = {
  level?: "h1" | "h2" | "h3";
  text?: string;
  subText?: string;
  button?: React.ReactNode;
  identity?: string;
  textAlign?: "1" | "2" | "3";
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

function getTextAlign(textAlign?: "1" | "2" | "3") {
  if (textAlign === "2") return "center";
  if (textAlign === "3") return "right";
  return "left";
}

const Headline = React.forwardRef<HTMLDivElement, HeadlineProps>(
  (
    {
      level = "h2",
      text = "",
      subText = undefined,
      button = undefined,
      identity,
      textAlign = "1",
      className = "",
      ...rest
    },
    ref
  ) => {
    const headlineTag = level === "h1" ? "h1" : level;
    const subTag = level === "h2" ? "h3" : level === "h3" ? "h3" : "h3";
    const hasSub = !!subText;
    const hasButton = !!button;
    if (!hasSub && !hasButton) {
      // Nur Headline, kein Director-Container
      return level === "h1"
        ? <h1 ref={ref} className={"visually-hidden"}>{text}</h1>
        : React.createElement(
            headlineTag,
            {
              ref,
              style: { textAlign: getTextAlign(textAlign) },
              ...rest
            },
            text
          );
    }
    // Mit Subtext oder Button: Director als Container mit gapY
    const directorIdentity = identity ? `gapY ${identity}` : "gapY";
    // Button ggf. mit underline-Prop versehen
    let buttonWithUnderline = button;
    if (button && React.isValidElement(button)) {
      const btn = button as React.ReactElement<{ underline?: boolean }>;
      if (btn.props.underline === undefined) {
        buttonWithUnderline = React.cloneElement(btn, { underline: true });
      }
    }
    return (
      <Director
        ref={ref}
        identity={directorIdentity}
        className={className}
        {...rest}
      >
        {level === "h1" ? (
          <h1 className={"visually-hidden"}>{text}</h1>
        ) : (
          React.createElement(
            headlineTag,
            {
              style: { textAlign: getTextAlign(textAlign) },
            },
            text
          )
        )}
        {hasSub &&
          React.createElement(
            subTag,
            {
              style: { textAlign: getTextAlign(textAlign) },
            },
            subText
          )}
        {hasButton && buttonWithUnderline}
      </Director>
    );
  }
);

Headline.displayName = "Headline";

export default Headline; 