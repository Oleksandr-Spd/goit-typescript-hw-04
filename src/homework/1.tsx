import React, { useEffect, useRef } from "react";

type Props = {
  onContentEndVisible: () => void;
  children: React.ReactNode;
};

class Options {
  threshold: number;
  root: Element | null;
  rootMargin?: string;

  constructor(threshold: number, root: Element | null, rootMargin?: string) {
    this.rootMargin = rootMargin;
    this.threshold = threshold;
    this.root = root;
  }
}

export function Observer({ children, onContentEndVisible }: Props) {
  const endContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = new Options(1.0, null, "0px");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return ():void => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
}
