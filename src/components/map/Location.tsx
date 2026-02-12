type GoogleMapEmbedProps = {
  src: string;
  title?: string;
  height?: number;
  borderColor?: string;
};

export default function GoogleMapEmbed({
  src,
  title = "Google Map",
  height = 320,
  borderColor,
}: GoogleMapEmbedProps) {
  return (
    <div
      style={{
        width: "100%",
        borderTopWidth: 3,
        borderBottomWidth: 3,
        borderColor: borderColor,
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
