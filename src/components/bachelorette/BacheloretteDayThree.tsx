import headingHome from "../../assets/bachelorette/headingHome.png";

export default function BacheloretteDayThree() {
  return (
    <section className="flex max-h-dvh w-full items-center justify-center  ">
      <img
        src={headingHome}
        alt="Bachelorette day three display"
        className="max-h-dvh w-full max-w-md object-contain"
        draggable={false}
      />
    </section>
  );
}
