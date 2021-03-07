const router = require("express").Router();
const TronWeb = require("tronweb");

const TRONGRID_API = "https://api.shasta.trongrid.io";
const DEFAULT_ADDRESS = "TBm1ymSid31J4LBbUQ6dnCMem5tTYWc4Fg";

const tronweb = new TronWeb(TRONGRID_API, TRONGRID_API, TRONGRID_API);
tronweb.defaultAddress = {
  hex: tronweb.address.toHex(DEFAULT_ADDRESS),
  base58: DEFAULT_ADDRESS,
};

const games = {
  LimitLottery5: "TRGCoM8ForcJhHXCE3RsWouF14V3rPixSu",
  LimitLottery15: "TArRpQXzAutbdn3rZfPmMQzHx2rn4uRGy5",
  LimitLottery50: "TSmijEjGX7F2MY9nUJbaiB1xqgVbN7bYvX",
  Everyweek5: "TYk1bmKpaASD8MHLXr6QipNYdtUAAHno4f",
  Everyweek50: "TKF9zmQpKHPgA9FxuSVHpogiucTGVRHBWN",
  Month5: "TVGniJKSx13v74zfwZL16pjvGUVf4xQynD",
  EveryYear5: "TBcYVCEM5Y2dXVGg7ojTyN6pHeuWnRThBf",
};

const addresses = {
  RefStorage: "TA2kGcLfZJhW8Mf6nBEjAQL2HLS8KwToE6",
  SevenTOP: "TQUWfMQmhuGGqYXfa3LNWXKAtoc1RZcgMV",
};

(async () => {
  for (const [key, value] of Object.entries(games)) {
    games[key] = await tronweb.contract().at(value);
  }
})();

//-------------Timer-----------------------------------
let weekTime = 0;
let monthTime = 0;
let yearTime = 0;

function diffSubtract(date1, date2) {
  return date2 - date1;
}

const end_date_month = {
  full_year: "2021", // Год
  month: "02", // Номер месяца
  day: "13", // День
  hours: "07", // Час
  minutes: "00", // Минуты
  seconds: "00", // Секунды
};
const end_date_str_month = `${end_date_month.full_year}-${end_date_month.month}-${end_date_month.day}T${end_date_month.hours}:${end_date_month.minutes}:${end_date_month.seconds}`;

const funcaMonth = (date, timer) => {
  let now = new Date();
  //new Date(end_date_str_week);
  let ms_left = diffSubtract(now, date);
  if (ms_left <= 0) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 28);
    clearInterval(timer);
    timer = setInterval(() => funcaMonth(newDate, timer), 1000);
  } else monthTime = ms_left;
};

const monthtimer = setInterval(
  () => funcaMonth(new Date(end_date_str_month), monthtimer),
  1000
);

const end_date_week = {
  full_year: "2021", // Год
  month: "02", // Номер месяца
  day: "13", // День
  hours: "07", // Час
  minutes: "00", // Минуты
  seconds: "00", // Секунды
};
const end_date_str_week = `${end_date_week.full_year}-${end_date_week.month}-${end_date_week.day}T${end_date_week.hours}:${end_date_week.minutes}:${end_date_week.seconds}`;

const funcaWeek = (date, timer) => {
  let now = new Date();
  //new Date(end_date_str_week);
  let ms_left = diffSubtract(now, date);
  if (ms_left <= 0) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 7);
    clearInterval(timer);
    timer = setInterval(() => funcaWeek(newDate, timer), 1000);
  } else weekTime = ms_left;
};

const weektimer = setInterval(
  () => funcaWeek(new Date(end_date_str_week), weektimer),
  1000
);

const end_date = {
  full_year: "2022", // Год
  month: "01", // Номер месяца
  day: "01", // День
  hours: "07", // Час
  minutes: "00", // Минуты
  seconds: "00", // Секунды
};
const end_date_str = `${end_date.full_year}-${end_date.month}-${end_date.day}T${end_date.hours}:${end_date.minutes}:${end_date.seconds}`;

const funcaYear = (date, timer) => {
  let now = new Date();
  //new Date(end_date_str_week);
  let ms_left = diffSubtract(now, date);
  if (ms_left <= 0) {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + 1);
    clearInterval(timer);
    timer = setInterval(() => funcaYear(newDate, timer), 1000);
  } else yearTime = ms_left;
};

const yeartimer = setInterval(
  () => funcaYear(new Date(end_date_str), yeartimer),
  1000
);
//-----------------------------------------------------------

router.get("/allgames", async (_, res) => {
  try {
    const data = [];
    for (const [_, value] of Object.entries(games)) {
      const obj = {
        sum: Math.floor(
          tronweb.toDecimal((await value.getSumOnContract().call())._hex) / 1e12
        ),
        ticketsLength: tronweb.toDecimal(
          (await value.getTicketsLength().call())._hex
        ),
      };
      data.push(obj);
    }
    res.json([...data, { weekTime, monthTime, yearTime }]);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error!" });
  }
});

module.exports = router;
