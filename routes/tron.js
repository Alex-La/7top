const router = require("express").Router();
const TronWeb = require("tronweb");
const TronGrid = require("trongrid");
const User = require("../models/User");
const Ball = require("../models/Ball");
const { paginateResults, getAvatarPath } = require("../utils");

const TRONGRID_API = "https://api.shasta.trongrid.io";
const DEFAULT_ADDRESS = "TBm1ymSid31J4LBbUQ6dnCMem5tTYWc4Fg";

const tronweb = new TronWeb(TRONGRID_API, TRONGRID_API, TRONGRID_API);
tronweb.defaultAddress = {
  hex: tronweb.address.toHex(DEFAULT_ADDRESS),
  base58: DEFAULT_ADDRESS,
};

const trongrid = new TronGrid(tronweb);

const gamesAddress = {
  LimitLottery5: "TRGCoM8ForcJhHXCE3RsWouF14V3rPixSu",
  LimitLottery15: "TArRpQXzAutbdn3rZfPmMQzHx2rn4uRGy5",
  LimitLottery50: "TSmijEjGX7F2MY9nUJbaiB1xqgVbN7bYvX",
  Everyweek5: "TYk1bmKpaASD8MHLXr6QipNYdtUAAHno4f",
  Everyweek50: "TKF9zmQpKHPgA9FxuSVHpogiucTGVRHBWN",
  Month5: "TVGniJKSx13v74zfwZL16pjvGUVf4xQynD",
  EveryYear5: "TBcYVCEM5Y2dXVGg7ojTyN6pHeuWnRThBf",
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

(async () => {
  for (const [key, value] of Object.entries(addresses)) {
    addresses[key] = await tronweb.contract().at(value);
  }
})();

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
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error!" });
  }
});

router.get("/owners/:contract", async (req, res) => {
  try {
    const data = await (await games[req.params.contract])
      .ownersOfTickets()
      .call();
    const wallets = data.map((wallet) => tronweb.address.fromHex(wallet));
    const users = await User.find({ wallet: wallets });

    const result = wallets.map((wallet, index) => {
      const temp = users.filter((user) => wallet === user.wallet)[0];
      if (temp)
        return {
          name: temp.name,
          cursorKey: index,
          avatar: getAvatarPath({ id: temp._id }),
        };
      else
        return {
          name: wallet.substr(0, 6) + "..." + wallet.substr(30, 4),
          cursorKey: index,
          avatar: getAvatarPath({ id: 0 }),
        };
    });

    const pagResult = paginateResults({
      results: result,
      pageSize: 10,
      after: req.query.after,
      cursorKey: "cursorKey",
    });

    res.json({
      total: wallets.length,
      cursor: pagResult.length
        ? pagResult[pagResult.length - 1].cursorKey
        : null,
      hasMore: pagResult.length
        ? pagResult[pagResult.length - 1].cursorKey !==
          result[result.length - 1].cursorKey
        : false,
      owners: pagResult,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error!" });
  }
});

router.get("/balance/:contract", async (req, res) => {
  try {
    const data = await (await games[req.params.contract])
      .getSumOnContract()
      .call();

    const balance = tronweb.toDecimal(data._hex);
    res.json({ balance: Math.floor(balance / 1e12) });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error!" });
  }
});

router.get("/winners/:contract", async (req, res) => {
  try {
    const { contract } = req.params;
    const names = ["firstWinner", "secondWinner"];

    const trxPrice = tronweb.toDecimal(
      (await addresses.SevenTOP.trxPrice().call())._hex
    );
    const data = [];

    for (let i in names) {
      const trans = await trongrid.contract.getEvents(gamesAddress[contract], {
        event_name: names[i],
      });
      if (trans.data[0])
        data.push({
          amount: ((trans.data[0].result.amount * trxPrice) / 1e12).toFixed(2),
          timestapmt: trans.data[0].result.timestapmt,
          user: tronweb.address.fromHex(trans.data[0].result.user),
        });
    }

    const result = [];
    for (let i in data) {
      result.push({
        ...data[i],
        user: (({ _id, name }) => ({
          _id,
          name,
          avatar: getAvatarPath({ id: _id }),
        }))(await User.findOne({ wallet: data[i].user })),
      });
    }

    res.json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error!" });
  }
});

router.get("/friends/:wallet", async (req, res) => {
  try {
    const wallets = (
      await (await addresses.RefStorage).getReferals(req.params.wallet).call()
    ).map((wallet) => tronweb.address.fromHex(wallet));

    const friends = [];
    for (let i in wallets) {
      const user = await User.findOne({ wallet: wallets[i] });
      friends.push({
        cursorKey: i,
        name: user ? user.name : wallets[i],
        avatar: getAvatarPath({ id: user ? user._id : "noavatar" }),
      });
    }

    const pagFriends = paginateResults({
      results: friends,
      pageSize: 10,
      after: req.query.after,
      cursorKey: "cursorKey",
    });

    res.json({
      total: friends.length,
      cursor: pagFriends.length
        ? pagFriends[pagFriends.length - 1].cursorKey
        : null,
      hasMore: pagFriends.length
        ? pagFriends[pagFriends.length - 1].cursorKey !==
          friends[friends.length - 1].cursorKey
        : false,
      friends: pagFriends,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error!" });
  }
});

router.get("/winners", async (_, res) => {
  try {
    const names = ["firstWinner", "secondWinner"];

    const trxPrice = tronweb.toDecimal(
      (await addresses.SevenTOP.trxPrice().call())._hex
    );
    const data = [];

    res.json(names);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error!" });
  }
});

module.exports = router;
