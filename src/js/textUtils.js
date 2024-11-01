export const getEndText = () => {
  const nowDate = new Date();
  const halloweenDate = new Date("Nov 01, 2025 00:00:00");
  const msUntilHalloween = halloweenDate.getTime() - nowDate.getTime();

  const daysUntilHalloween = Math.floor(
    msUntilHalloween / (1000 * 60 * 60 * 24)
  );

  const days = Math.max(daysUntilHalloween, 1);

  const countStr = `${
    days === 1 ? "del día" : "los " + days + " días"
  } de vida que te quedan`;

  return `Disfruta ${countStr}`;
};
