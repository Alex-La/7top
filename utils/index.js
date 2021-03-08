const glob = require("glob");
const config = require("config");
const path = require("path");

module.exports.paginateResults = ({
  after: cursor,
  pageSize = 20,
  results,
  getCursor = () => null,
}) => {
  if (pageSize < 1) return [];

  if (!cursor) return results.slice(0, pageSize);
  const cursorIndex = results.findIndex((item) => {
    // if an item has a `cursor` on it, use that, otherwise try to generate one
    let itemCursor = item._id ? item._id : getCursor(item);

    // if there's still not a cursor, return false by

    return itemCursor ? cursor == itemCursor : false;
  });

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1 // don't let us overflow
      ? []
      : results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + pageSize)
        )
    : results.slice(0, pageSize);
};

module.exports.addAvatarPaths = ({ results }) => {
  const folderPath = path.resolve("avatars", "");
  return results.map(({ _doc }) => {
    const files = glob.sync(folderPath + `/${_doc._id}.*`);
    if (files.length > 0) {
      return {
        ..._doc,
        avatar: "/static" + files[0].substring(config.get("slicePath")),
      };
    } else {
      const defaultImgPath = path.resolve("avatars", "", "noavatar.jpg");
      return {
        ..._doc,
        avatar: "/static" + defaultImgPath.substring(config.get("slicePath")),
      };
    }
  });
};
