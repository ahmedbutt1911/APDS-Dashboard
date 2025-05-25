import { useEffect, useRef } from "react";

const HtmlPreview = ({ html }) => {
  const iframeRef = useRef();
  console.log(html);
  useEffect(() => {
    const doc =
      iframeRef.current?.contentDocument ||
      iframeRef.current?.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(html || "");
      doc.close();
    }
  }, [html]);

  return (
    <iframe
      ref={iframeRef}
      style={{
        width: "100%",
        border: "none",
        minHeight: "300px",
        background: "white",
      }}
      sandbox="allow-same-origin"
    />
  );
};

export default HtmlPreview;
