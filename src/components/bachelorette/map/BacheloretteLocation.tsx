type GoogleMapEmbedProps = {
  src: string;
  title?: string;
  height?: number;
};

export default function GoogleMapEmbed({
  src,
  title = "Google Map",
  height = 320,
}: GoogleMapEmbedProps) {
  return (
    <div
      style={{
        width: "100%",
        borderTopWidth: 3,
        borderBottomWidth: 3,
        borderColor: "#264788",
      }}
    >
      <iframe
        title={title}
        src={src}
        width="100%"
        height={height}
        style={{ display: "block" }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
