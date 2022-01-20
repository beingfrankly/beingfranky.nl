import Link from "next/link";
import React, { AnchorHTMLAttributes, useState } from "react";

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children?: React.ReactNode;
};

const AnchorLink: React.FC = ({ href, children }: AnchorProps) => {
  const [ariaLabel, setAriaLabel] = useState(null);
  const [internalLink, setInternalLink] = useState(true);

  // if (href.includes(process.env.DOMAIN || "beingfrankly.nl")) {
  //   setInternalLink(true);
  // } else {
  //   setInternalLink(false);
  // }

  // if (internalLink) {
  //   setAriaLabel(`${children} (internal link)`);
  // } else {
  //   setAriaLabel(`${children} (external link)`);
  // }

  return (
    <a
      className="text-blue-600 hover:text-blue-500"
      href={href}
      aria-label={ariaLabel}
    >
      {children}
      {!internalLink && (
        <svg
          role="img"
          aria-label="external link"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6zm11-3v8h-2V6.413l-7.793 7.794-1.414-1.414L17.585 5H13V3h8z" />
        </svg>
      )}
    </a>
  );
};

export default AnchorLink;
