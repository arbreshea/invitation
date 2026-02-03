import dayTwoActivity from "../../assets/bachelorette/dayTwoActivity.png";

export default function BacheloretteDayTwoActivity() {
  return (
    <section className="flex max-h-dvh w-full items-center justify-center  ">
      <img
        src={dayTwoActivity}
        alt="Bachelorette day two activity"
        className="max-h-dvh w-full max-w-md object-contain"
        draggable={false}
      />
    </section>
  );
}
